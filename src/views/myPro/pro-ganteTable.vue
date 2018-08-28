<template>
<div :style='{overflow:"auto"}'>
  <div :style='{position:"relative",width:"1050px"}' v-show='listData.length'>
    <div class="right-box">
      <Button type="error" size='small'>逾期</Button>
      <br>
      <Button class="gray-bg" style='color:#fff' size='small'>未开始</Button>
      <br>
      <Button type='primary' size='small'>开发中</Button>
      <br>
      <Button type='success' size='small'>已完成</Button>
      <br>
    </div>
    <div class="page" :style='{overflow:"auto",height:tableHeight+45+"px",width:"980px"}'>

      <div class="table-box" :style='{height:tableHeight+10+"px"}'>
        <div class="weeks">
          <div class="week" v-for='(item,index) in weekArray' :key='index' :style='{
      background:item!==6&&item!==0?"#fff":"#eee",width:oneDayWidth+"px"
    }'>
          </div>
        </div>
        <div class="days">
          <div class="day" :style='{width:oneDayWidth+"px"}' v-for='(item,index) in daysArray' :key='index'>
            {{item.slice(8,10)}}
          </div>
        </div>
        <div class="show-area">
          <div class="first-line" v-for='(item,index) in howManyWeeks' :key='index' :style='{height:tableHeight+10+"px",left:(weekIndex0+(item-1)*7)*oneDayWidth-1+"px",width:5*oneDayWidth+1+"px"}'>
            <div class="time-show">
              {{daysArray[(weekIndex0+(item-1)*7)]}}
            </div>
            <div>
            </div>
          </div>
        </div>
        <div class="hide-area">
          <div class="hide-data" v-for='(item,index) in howManyWeeks' :key='index' :style='{height:tableHeight+"px",top:headerHeight+"px",left:((weekIndex0+(item-1)*7)*oneDayWidth-1)-(2*oneDayWidth)+"px",width:2*oneDayWidth+1+"px"}'>
            <div class="time-show">
            </div>
            <div>
            </div>
          </div>
        </div>
        <div class="item-area">
          <div class="item-box" v-for='(item,index) in positionArray' :key='index' :style='{
        left:item.x*oneDayWidth+"px",top:item.y*oneBoxHeight+"px",width:item.width*oneDayWidth+"px",height:oneBoxHeight+"px"
      }'>
            <Tooltip :placement="index!==positionArray.length-1?'bottom-start':'top-start'" :class="{'box':true,'small-box':item.type==='zitask'?true:false}">
              <div :class="{'box':true,'small-inner-box':item.type==='zitask'?true:false,'success-bd':item.state==4,'error-bd':item.state==5,'primary-bd':item.state==2,'gray-bd':item.state==1}">
                <div :style='{width:item.progress+"%"}' :class="{'inner-box':true,'success-bg':item.state==4,'error-bg':item.state==5,'primary-bg':item.state==2,'gray-bg':item.state==1}">

                </div>
              </div>
              <div slot="content" style='zIndex:9'>
                <p>当前进度：{{item.progress}}%</p>
                <p>开始：{{item.startDate}}</p>
                <p>结束：{{item.endDate}}</p>
              </div>
            </Tooltip>
          </div>
        </div>
        <div class="text-area">
          <div :class="{'text-box':true,'success':item.state==4,'error':item.state==5,'primary':item.state==2,'text':item.state==1}" v-for='(item,index) in positionArray' :key='index' :style='{
        left:(item.x+item.width)*oneDayWidth+5+"px",top:item.y*oneBoxHeight+"px",height:oneBoxHeight+"px",width:"100px",
      }'>
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="no-data" v-show='!listData.length'>
    暂无数据
  </div>
</div>
</template>
<script>
import {
  getGTChartByProApi
} from 'api/myproject.js'
import {
  Tooltip
} from 'iview';
export default {
  components: {
    Tooltip
  },
  data() {
    return {
      headerHeight: 78,
      oneBoxHeight: 67,
      listData: [],
      tableSdate: '',
      oneDayWidth: 40,
      tableEdate: '',
      howManyDays: '',
      howManyWeeks: [],
      daysArray: [],
      weekArray: [],
      lastWeek: '',
      nextWeek: '',
      weekIndex0: '',
      positionArray: [],
      ganteData: [],
    }
  },
  computed: {
    tableHeight() {
      return this.positionArray.length * this.oneBoxHeight + this.headerHeight
    }
  },
  props: {
    activeSubTaskList: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeOpenPanpelIndex: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    activeOpenPanpelIndex() {
      if (this.activeOpenPanpelIndex >= 0) {
        console.log('当前展开的子任务信息', this.activeOpenPanpelIndex, this.activeSubTaskList)
        this.ganteData = this.coppyArray(this.listData);
        this.$set(this.ganteData[this.activeOpenPanpelIndex], 'children', this.activeSubTaskList);
        this.getDataPositon();
      } else {
        this.ganteData = this.coppyArray(this.listData);
        this.getDataPositon();
      }
    }
  },
  mounted() {
    this.getGTChartByProList();
  },

  methods: {
    coppyArray(arr) {
      return arr.map((e) => {
        if (typeof e === 'object') {
          return Object.assign({}, e);
        } else {
          return e;
        }
      })
    },
    initDaysArray() {
      this.daysArray = [];
      var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let onetimes = 1000 * 60 * 60 * 24; //一天的时间
      this.howManyDays = (new Date(this.tableEdate) - new Date(this.tableSdate)) / onetimes; //开始到结尾一共多少天
      this.howManyDays = Math.ceil(this.howManyDays); //取整
      this.lastWeek = new Date(this.tableSdate).getDay(); //起始是星期几
      this.nextWeek = new Date(this.tableEdate).getDay(); //结束是星期几
      console.log('头和尾', this.tableSdate, this.tableEdate, this.lastWeek, this.nextWeek)
      let canAddLastBoxNum = this.lastWeek - 1;
      if (canAddLastBoxNum < 0) {
        canAddLastBoxNum = 2
      }
      // 可以向后增加的数
      let canAddNextBoxNum = (23 - this.howManyDays) - canAddLastBoxNum;
      console.log('可以向前加，向后加的天数', canAddLastBoxNum, canAddNextBoxNum)

      if (canAddNextBoxNum <= 0) {
        canAddNextBoxNum = 2;
      }
      // 加前面的天数
      let addLastDaysArray = [];

      for (let index = 0; index < canAddLastBoxNum; index++) { //1 5=》加4次=》1，2，3，4前四天   2=》加1天=》提前1天
        let day = new Date(this.tableSdate).getTime() - (onetimes * (index + 1)); //
        addLastDaysArray.unshift(this.noHoursTimeToString(day));
      }
      // 加后面的天数
      let addNextDaysArray = [];
      for (let index = 0; index < canAddNextBoxNum; index++) { //4 1=》加4次=》2，3，4，5后四天   2=》加3天=》3，4，5天
        let day = new Date(this.tableSdate).getTime() + (onetimes * (this.howManyDays + index + 1)); //
        addNextDaysArray.push(this.noHoursTimeToString(day));
      }
      // 期间的数组
      for (let i = 0; i <= this.howManyDays; i++) {
        this.daysArray.push(
          this.noHoursTimeToString(
            new Date(this.tableSdate).getTime() + (i * onetimes)
          )
        );
      }
      console.log('daysArray', this.daysArray)
      // 总的天数
      this.daysArray = addLastDaysArray.concat(this.daysArray, addNextDaysArray);
      // 总的星期数
      this.weekArray = this.daysArray.map((val, index) => {
        return new Date(val).getDay()
      })
      console.log('weekday', this.weekArray, this.daysArray)
      // 多少周来找出多少个竖线多少个区域
      let howmanyweek = 0;
      this.weekArray.forEach((val) => {
        if (val === 1) {
          howmanyweek++;
          this.howManyWeeks.push(howmanyweek);
        }
      })
      this.weekIndex0 = this.weekArray.indexOf(1);
      this.getDataPositon();
    },
    getDataPositon() {
      let onetimes = 1000 * 60 * 60 * 24; //一天的时间
      let [x, y, width] = [0, 0, 0]
      let index = 0;
      this.positionArray = [];
      for (let val of this.ganteData) {
        y = index;
        x = (new Date(val.sDate) - new Date(this.daysArray[0])) / onetimes
        width = (new Date(val.eDate) - new Date(val.sDate)) / onetimes
        let name = val.taskName;
        let state = val.taskState;
        let type = 'task';
        let progress = val.taskProgress;
        let startDate = val.sDate;
        let endDate = val.eDate;
        this.positionArray.push({
          type,
          x,
          y,
          width,
          name,
          state,
          progress,
          startDate,
          endDate
        });
        index++;
        if (val.children && val.children.length !== 0) {
          for (let item of val.children) {
            y = index;
            x = (new Date(item.sDate) - new Date(this.daysArray[0])) / onetimes
            width = (new Date(item.eDate) - new Date(item.sDate)) / onetimes
            let name = item.subtaskName;
            let state = item.subtaskState;
            let type = 'zitask';
            let progress = item.subtaskProgress;
            let startDate = item.sDate;
            let endDate = item.eDate;
            this.positionArray.push({
              type,
              x,
              y,
              width,
              name,
              state,
              progress,
              startDate,
              endDate
            });
            index++;
          }
        }
      }
    },
    noHoursTimeToString(time) {
      let date = new Date(time);
      let yy = date.getFullYear(); //年
      let mm = date.getMonth() + 1; //月
      let dd = date.getDate(); //日
      let hh = 0 //时
      let ii = 0; //分
      let ss = 0; //秒
      let clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (ii < 10) clock += '0';
      clock += ii + ":";
      if (ss < 10) clock += '0';
      clock += ss;
      return clock
    },
    timesToString(time) {
      let date = new Date(time);
      let yy = date.getFullYear(); //年
      let mm = date.getMonth() + 1; //月
      let dd = date.getDate(); //日
      let hh = date.getHours(); //时
      let ii = date.getMinutes(); //分
      let ss = date.getSeconds(); //秒
      let clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (ii < 10) clock += '0';
      clock += ii + ":";
      if (ss < 10) clock += '0';
      clock += ss;
      return clock
    },

    getGTChartByProList() {
      getGTChartByProApi({
        proId: this.$route.params.id
      }).then(
        res => {
          if (res.data.code === 200) {
            console.log('甘特图', res);
            const data = res.data.data;
            if (data.length) {
              this.tableSdate = data[0].sDate;
              this.tableEdate = data[data.length - 1].eDate;
              this.listData = data;
              this.ganteData = this.coppyArray(this.listData);
              this.initDaysArray();
            } else {
              this.listData = data;
            }
          }
        }
      ).catch(error => {
        this.$Message.error('接口故障：/getGTChartByPro')
      })
    },
  }
}
</script>
<style>
.right-box button {
  margin: 3px 0;
}
</style>
<style lang="scss" scoped>
.error-bd {
  border: 1px solid #ed4014;
}

.success-bd {
  border: 1px solid #19be6b;
}

.primary-bd {
  border: 1px solid #5cadff;
}

.gray-bd {
  border: 1px solid #aaa;
}

.page {
  margin-top: 4px;
  position: relative;
  .right-box {
    text-align: right;
    position: absolute;
    z-index: 99;
    opacity: 0.8;
    right: 0px;
    top: 0px;
  }
}

.time-show {
  text-align: center;
  line-height: 42px;
}

.text {
  position: absolute;
  z-index: 3;
}

.item-area {
  position: absolute;
  top: 82px;
  z-index: 3;
}

.text-area {
  position: absolute;
  top: 82px;
}

.day {
  width: 50px;
  height: 40px;
  display: inline-block;
  background: #eee;
  text-align: center;
  line-height: 40px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-left: none;
}

.item-box {
  position: absolute;
  display: flex;
  align-items: center;
  .box {
    width: 100%;
    border-radius: 3px;
    height: 30px;
    position: relative;
  }
  .inner-box {
    border-radius: 2px;
    left: 0;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .box.small-box {
    height: 18px;
  }
  .box.small-inner-box {
    height: 18px;
    opacity: 0.7;
  }
}

.text-box {
  line-height: 67px;
  position: absolute;
}

.table-box {
  display: inline-block;
  border: 1px solid #ccc;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.first-line {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 2;
}

.hide-data {
  position: absolute;
  background: #eee;
  opacity: 0.8;
  top: 78px;
  height: 100%;
}

.weeks {
  padding: 0;
  margin: 0;
  display: inline-block;
  height: 40px;
  border-left: none;
  white-space: nowrap;
}

.days {
  margin: 0;
  margin-top: -6px;
  padding: 0;
  white-space: nowrap;
}

.week {
  word-break: keep-all;
  /* 不换行 */
  white-space: nowrap;
  box-sizing: border-box;
  width: 50px;
  height: 38px;
  display: inline-block;
  background: #bbb;
  text-align: center;
}

.no-data {
  border: 1px solid #eee;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 22px;
}

.day:last-child {
  border-right: none;
}
</style>
