<template>
<div class="page1" style='overflow:auto;'>
  <div class="table-box" :style='{height:tableHeight+"px"}'>
    <div class="weeks">
      <div class="week" v-for='(item,index) in weekArray' :key='index' :style='{
      background:item!==6&&item!==0?"#fff":"#eee",width:oneDayWidth+"px"
    }'>
      </div>
    </div>
    <div class="days">
      <div class="day" :style='{width:oneDayWidth}' v-for='(item,index) in daysArray' :key='index'>
        {{item.slice(8,10)}}
      </div>
    </div>
    <div class="show-area">
      <div class="first-line" v-for='(item,index) in howManyWeeks' :key='index' :style='{height:tableHeight+"px",left:(weekIndex0+(item-1)*7)*oneDayWidth-1+"px",width:5*oneDayWidth+"px"}'>
        <div class="time-show">
          {{daysArray[(weekIndex0+(item-1)*7)]}}
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="hide-area">
      <div class="hide-data" v-for='(item,index) in howManyWeeks' :key='index' :style='{top:tableHeaderHegiht+"px",height:(tableHeight-tableHeaderHegiht)+"px",left:((weekIndex0+(item-1)*7)*oneDayWidth-1)-(2*oneDayWidth)+"px",width:2*oneDayWidth+"px"}'>
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
        <Tooltip :placement="index!==positionArray.length-1?'bottom-start':'top-start'" class="box">
          <div :class="{'box':true,'success-bd':item.state==4,'error-bd':item.state==5,'primary-bd':item.state==2,'gray-bd':item.state==1}">
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
</template>
<script>
import {
  getGTChartByProApi
} from 'api/myproject.js'
import {Tooltip} from 'iview';
export default {
   components:{
    Tooltip
  },
  data() {
    return {
      tableHeight: '450',
      tableHeaderHegiht: '78',
      oneBoxHeight: '50',
      listData: [],
      tableSdate: '',
      oneDayWidth: '40',
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
  props: {
    activeSubTaskList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    this.getGTChartList();
  },
  watch: {
    activeSubTaskList() {
      this.getGTChartList();
    }
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
      var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let onetimes = 1000 * 60 * 60 * 24; //一天的时间
      // console.log('oneday', onetimes);
      this.howManyDays = (new Date(this.tableEdate) - new Date(this.tableSdate)) / onetimes; //开始到结尾一共多少天
      this.howManyDays = Math.ceil(this.howManyDays); //取整
      this.lastWeek = new Date(this.tableSdate).getDay(); //起始是星期几
      this.nextWeek = new Date(this.tableEdate).getDay(); //结束是星期几
      console.log(111, this.lastWeek, this.nextWeek)
      console.log(this.howManyDays);
      // 可以向前增加的box数
      let canAddLastBoxNum = parseInt((27 - this.howManyDays) / 2);
      // 可以向后增加的数
      let canAddNextBoxNum = (27 - this.howManyDays) - canAddLastBoxNum;
      console.log(canAddLastBoxNum, canAddNextBoxNum)

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
      console.log('nextWeek', this.nextWeek)
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
      // 总的天数列表
      this.daysArray = addLastDaysArray.concat(this.daysArray, addNextDaysArray);
      // 总的星期数
      this.weekArray = this.daysArray.map((val, index) => {
        return new Date(val).getDay()
      })
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
      console.log('start')
      console.log('ganteData11', this.ganteData)
      let onetimes = 1000 * 60 * 60 * 24; //一天的时间
      let [x, y, width] = [0, 0, 0]
      let index = 0;
      this.positionArray = [];
      for (let val of this.ganteData) {
        console.log(val)
        y = index;
        x = (new Date(val.sDate) - new Date(this.daysArray[0])) / onetimes
        width = (new Date(val.eDate) - new Date(val.sDate)) / onetimes
        let name = val.subtaskName;
        let state = val.subtaskState;
         let progress=val.taskProgress;
        let startDate=val.sDate;
        let endDate=val.eDate;
        this.positionArray.push({
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
      console.log(this.positionArray);
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

    getGTChartList() {
      this.howManyWeeks = [];
      this.daysArray = [];
      this.weekArray = [];
      this.ganteData = this.coppyArray(this.activeSubTaskList);
      console.log(this.activeSubTaskList)
      this.tableSdate = this.activeSubTaskList[0].sDate;
      this.tableEdate = this.activeSubTaskList[this.activeSubTaskList.length - 1].eDate;
      this.initDaysArray();
      this.tableHeight = this.activeSubTaskList.length * 50 + 78 + 20
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
}
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
  width: 40px;
  height: 40px;
  display: inline-block;
  background: #eee;
  text-align: center;
  line-height: 40px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.item-box {
  position: absolute;
  display: flex;
  align-items: center;
  .box {
    width: 100%;
    border-radius: 3px;
    height: 30px;
  }
  .inner-box{
    left:0;
    top:0;
    border-radius:2px;
    bottom:0;
    position:absolute;
  } 
}

.text-box {
  line-height: 50px;
  position: absolute;
}

.table-box {
  display: inline-block;
  border: 1px solid #ccc;
  height: 450px;
  position: relative;
  overflow: hidden;
}

.first-line {
  position: absolute;
  top: 0;
  height: 100%;
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
  white-space: nowrap;
}

.days {
  white-space: nowrap;
  margin: 0;
  margin-top: -6px;
  padding: 0;
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

.day:not(:first-child),
.week:not(:first-child) {
  border-left: none;
}
</style>
