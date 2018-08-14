<template>
<div class="page" style='height:100%;'>
  <div class="table-box">
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
      <div class="first-line" v-for='(item,index) in howManyWeeks' :key='index' :style='{left:(weekIndex0+(item-1)*7)*oneDayWidth-1+"px",width:5*oneDayWidth+"px"}'>
        <div class="time-show">
          {{daysArray[(weekIndex0+(item-1)*7)]}}
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="hide-area">
      <div class="hide-data" v-for='(item,index) in howManyWeeks' :key='index' :style='{left:((weekIndex0+(item-1)*7)*oneDayWidth-1)-(2*oneDayWidth)+"px",width:2*oneDayWidth+"px"}'>
        <div class="time-show">
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="item-area" >
      <div  class="item-box"  v-for='(item,index) in positionArray' :key='index' :style='{
        left:item.x*oneDayWidth+"px",top:item.y*oneBoxHeight+"px",width:item.width*oneDayWidth+"px",height:oneBoxHeight+"px"
      }'>
      <div :class="{'box':true,'success-bg':item.state==4,'error-bg':item.state==5,'primary-bg':item.state==2,'gray-bg':item.state==1}">
      </div>
    </div>
    </div>
    <div class="text-area" >
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
export default {
  data() {
    return {
      oneBoxHeight:'67',
      listData: [],
      tableSdate: '',
      oneDayWidth: '50',
      tableEdate: '',
      howManyDays: '',
      howManyWeeks: [],
      daysArray: [],
      weekArray: [],
      lastWeek: '',
      nextWeek: '',
      weekIndex0: '',
      positionArray: [],
      ganteData:[],
    }
  },
  props:{
    activeSubTaskList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    activeOpenPanpelIndex:{
      type:[Number,String],
      default:''
    }
  },
  watch: {
    activeOpenPanpelIndex(){
      if(this.activeOpenPanpelIndex>=0){
        console.log(this.activeOpenPanpelIndex,this.activeSubTaskList)
         this.ganteData=this.coppyArray(this.listData);
         console.log('gante',this.ganteData)
         console.log('list',this.listData)
         this.$set(this.ganteData[this.activeOpenPanpelIndex],'children',this.activeSubTaskList);
          this.getDataPositon();
          console.log('gante',this.ganteData)
      }else{ 
        console.log('close');
        this.ganteData=this.coppyArray(this.listData);
        console.log('list',this.listData)
        console.log('gante',this.ganteData);
        this.getDataPositon();
        console.log('gante',this.ganteData)
      }
    }
  },
  mounted() {
    this.getGTChartByProList();
  },

  methods: {
   coppyArray(arr){
   return arr.map((e)=>{
        if(typeof e==='object'){
           return Object.assign({},e);
         }else{
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
      // 加前面的天数
      let addLastDaysArray = [];
      if (this.lastWeek <= 5) { //小于星期五要补全这周
        if (this.lastWeek == 0) {
          // 星期天把星期六补全
          let lastDay = new Date(this.tableSdate).getTime() - (onetimes * 1); //
          addLastDaysArray.push(this.noHoursTimeToString(lastDay))
        } else {
          for (let index = 0; index < this.lastWeek - 1; index++) { //5=》加4次=》1，2，3，4前四天   2=》加1天=》提前1天
            let day = new Date(this.tableSdate).getTime() - (onetimes * (index + 1)); //
            addLastDaysArray.unshift(this.noHoursTimeToString(day));
          }
        }
      }
      // 加后面的天数
      let addNextDaysArray = [];
      if (this.nextWeek >= 0) { //小于星期五要补全这周
        if (this.nextWeek == 6) {
          // 星期六把星期天补全
          let nextDay = new Date(this.tableSdate).getTime() + (onetimes * (this.howManyDays + 1)); //
          addNextDaysArray.push(this.noHoursTimeToString(lastDay))
        } else {
          for (let index = 0; index < 4 - this.lastWeek; index++) { //1=》加4次=》2，3，4，5后四天   2=》加3天=》3，4，5天
            let day = new Date(this.tableSdate).getTime() + (onetimes * (this.howManyDays + index + 1)); //
            addNextDaysArray.push(this.noHoursTimeToString(day));
          }
        }
      }
      // 期间的数组
      for (let i = 0; i <= this.howManyDays; i++) {
        this.daysArray.push(
          this.noHoursTimeToString(
            new Date(this.tableSdate).getTime() + (i * onetimes)
          )
        );
      }
      console.log(222,addLastDaysArray,this.daysArray,addNextDaysArray)
      // 总的天数
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
      // console.log('0index', this.weekIndex0);
      // console.log('weekArry', this.weekArray)
      // console.log('howManyWeeks111', this.howManyWeeks)
      // console.log('nDays', this.lastWeek, this.howManyDays, this.daysArray)
    },
    getDataPositon() {
      console.log('start')
      console.log('ganteData11',this.ganteData)
      let onetimes = 1000 * 60 * 60 * 24; //一天的时间
      let [x, y, width] = [0, 0, 0]
      let index=0;
      this.positionArray=[];
      for (let val of this.ganteData) {
        console.log(val)
        y=index;
        x = (new Date(val.sDate) - new Date(this.daysArray[0])) / onetimes
        width = (new Date(val.eDate) - new Date(val.sDate)) / onetimes
        let name=val.taskName;
        let state=val.taskState;
        console.log(x, width)
        this.positionArray.push({
          x,
          y,
          width,
          name,
          state
        });
        index++;
        if(val.children&&val.children.length!==0){
          for(let item of val.children){
             y=index;
             x = (new Date(item.sDate) - new Date(this.daysArray[0])) / onetimes
             width = (new Date(item.eDate) - new Date(item.sDate)) / onetimes
            let name=item.subtaskName;
            let state=item.subtaskState;
              this.positionArray.push({
                  x,
                  y,
                  width,
                  name,
                  state
              });
            index++;
          }
        }
      }
      console.log(this.positionArray);
    },
    noHoursTimeToString(time){
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
            this.tableSdate = data[0].sDate;
            this.tableEdate = data[data.length - 1].eDate;
            this.listData = data;
            this.ganteData=this.coppyArray(this.listData);
            this.initDaysArray();
          }
        }
      ).catch(error => {
        this.$Message.error('接口故障：/getGTChartByPro')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
}

.time-show {
  text-align: center;
  line-height: 42px;
}
.text{
  position: absolute;
  z-index: 9999;
}
.item-area,.text-area{
  position: absolute;
  top: 82px;
  z-index: 8;
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
}
.item-box{
  position: absolute;
  display:flex;
  align-items: center;
  z-index: 9;
  .box{
     background: red;
     width: 100%;
     border-radius:4px;
     height: 30px;
  }
}
.text-box{
  line-height: 67px;
  position: absolute;
  z-index: 10000;
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
  border-left: 1px solid #ccc;
}

.hide-data {
  position: absolute;
  background: #bbb;
  opacity: 0.8;
  z-index: 999;
  top: 78px;
  height: 100%;
  border-left: 1px solid #ccc;
}

.weeks {
  padding: 0;
  margin: 0;
  display: inline-block;
  height: 40px;
}

.days {
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
