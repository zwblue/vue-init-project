<template>
<div class="page">
  <Row>
    <Col span='24'>
    <Card :style='{margin:"0 3px"}'>
      <div class="header">
        <div class="title">
          项目总体情况
        </div>
        <Form :label-width="100" inline>
          <FormItem label="项目发起时间" class="form-item">
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="请选择时间区间" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary' @click="queryStatisticsOverallList">查询</Button>
          </FormItem>
        </Form>
      </div>
      <Row :gutter='32' :style='{margin:"20px 3px"}'>
        <Col :span='3'  >
          <Card >
            <div class="pro-total" :style='{height:"300px"}'>
              <div>
                  <div class="total primary bold">{{proTotal.proTotalNum}}</div>
              <div class="text">{{proTotal.proTotalText}}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col :span='7'>
        <Card>
          <div class="rela">
           <myPie :title='developmentData.name' v-if='topIfShow' v-show='developmentData'  :count='developmentData.totalCount' :seriesData='developmentData.developmentData'></myPie>
            <div class="wxtip" v-if='!topIfShow'  :style="{height:'300px',textAlign:'center',lineHeight:'300px',fontSize:'24px'}">
            暂无数据
       </div>
          </div>
        </Card>
        </Col>
        <Col :span='7'>
        <Card>
          <div class="rela">
        <myPie :title='overDueData.name' v-if='topIfShow' :count='overDueData.totalCount' :seriesData='overDueData.overDueData'></myPie>
            <div class="wxtip" v-if='!topIfShow'  :style="{height:'300px',textAlign:'center',lineHeight:'300px',fontSize:'24px'}">
            暂无数据
       </div>
          </div>
        </Card>
        </Col>
        <Col :span='7'>
        <Card>
          <div class="rela">
        <myPie :title='accomplishData.name' v-if='topIfShow' :count='accomplishData.totalCount' :seriesData='accomplishData.accomplishData'></myPie>
        <div class="wxtip" v-if='!topIfShow'  :style="{height:'300px',textAlign:'center',lineHeight:'300px',fontSize:'24px'}">
            暂无数据
       </div>
          </div>
        </Card>
        </Col>
      </Row>
    </Card>
    </Col>
    <Col :span='24'>
    </Col>
  </Row>
  <Row :style='{marginTop:"15px"}' :gutter='16'>
    <Col span='12'>
    <Card :style='{margin:"3px"}'>
         <div class="header">
        <div class="title">
          项目分布情况
        </div>
        <Form :label-width="100" inline>
          <FormItem label="项目发起时间" class="form-item">
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="请选择时间区间" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary' @click="queryStatisticsDistributedList">查询</Button>
          </FormItem>
        </Form>
      </div>
     <div class="rela">
       <myBar :yAxis='yAxisBar' :title='barTitle' v-if='leftIfShow' :seriesData='seriesBar' :seriesData2='seriesBar2'></myBar>
       <div class="wxtip" v-if='!leftIfShow'  :style="{height:'500px',textAlign:'center',lineHeight:'500px',fontSize:'24px'}">
            暂无数据
       </div>
      </div>
    </Card>
    </Col>
    <Col span='12'>
    <Card :style='{margin:"3px"}'>
       <div class="header">
        <div class="title">
          项目完成情况
        </div>
        <Form :label-width="100" inline>
          <FormItem label="项目发起时间" class="form-item">
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="请选择时间区间" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary' @click="queryAccomplishList">查询</Button>
          </FormItem>
        </Form>
      </div>
     <div class="rela">
        <finished-pie :title='accomplishData.name' v-if='rightIfShow' :count='finished.total' :seriesData='finished.data'></finished-pie>
        <div class="wxtip" v-if='!rightIfShow' :style="{height:'500px',fontSize:'24px',textAlign:'center',lineHeight:'500px'}">
            暂无数据
        </div>
        <div class="finish-desc" v-if='rightIfShow'>
          <div :style='{margin:"0 10px"}'>
            {{finished.data[0].name}}：{{finished.data[0].value}}（{{finished.data[0].rpercent}}）
          </div>
           <div :style='{margin:"0 10px"}'>
            {{finished.data[1].name}}：{{finished.data[1].value}}（{{finished.data[1].rpercent}}）
          </div>
           <div :style='{margin:"0 10px"}'>
            {{finished.data[2].name}}：{{finished.data[2].value}}（{{finished.data[2].rpercent}}）
          </div>
        </div>
     </div>

    </Card>
    </Col>
  </Row>
</div>
</template>

<script>
import {
  Card,
  FormItem,
  DatePicker,
  Form,
  Circle
} from 'iview'
import myPie from "components/echarts/pie";
import myBar from "components/echarts/bar";
import finishedPie from "components/echarts/finishedPie";
import {projectStatisticsAccomplishApi,projectStatisticsOverallApi,projectStatisticsDistributedApi} from 'api/procount.js'
export default {
  components: {
    Card,
    FormItem,
    DatePicker,
    Form,
    myPie,
    Circle,myBar,finishedPie
  },
  data() {
    return {
      topIfShow:false,
      leftIfShow:false,
      rightIfShow:false,
      barTitle:'',
      finished:{
        total:'',
        data:[]
        },
      yAxisBar:[],
      seriesBar:[],
      seriesBar2:[],
      proTotal:{
        proTotalNum:0,
        proTotalText:''
      },
      developmentData:{
        name:'',
        totalCount:0,
        developmentData:[]
      },
      overDueData:{
        name:'',
        totalCount:0,
        overDueData:[] 
      },
      accomplishData:{
        name:'',
        totalCount:0,
        accomplishData:[] 
      },
      procountParams: {
        createDateStart: '',
        createDateEnd:''
      }
    }
  },
  mounted(){
    this.projectStatisticsAccomplishList();
    this.projectStatisticsOverallList();
    this.projectStatisticsDistributedList();
  },
  methods: {
    queryAccomplishList(){
      this.projectStatisticsAccomplishList()
    },
        queryStatisticsOverallList(){
      this.projectStatisticsOverallList()
    },
        queryStatisticsDistributedList(){
      this.projectStatisticsDistributedList()
    },

    // 项目完成情况
    projectStatisticsAccomplishList(){
      projectStatisticsAccomplishApi(this.procountParams).then(res=>{
        if(res.data.code===200){
          if(!res.data.data){
            this.rightIfShow=false;
            return;
          }
          this.rightIfShow=true;
          console.log('项目完成情况',res.data);
          this.finished.total=Number(res.data.data[3].value);
          this.finished.data=res.data.data.slice(0,3);
        }
      }).catch(error=>{
        this.$Message.error('接口故障:/NewProReport/projectStatisticsAccomplish')
      })
    },
    // 项目总体情况
    projectStatisticsOverallList(){
      projectStatisticsOverallApi(this.procountParams).then(res=>{
        if(res.data.code===200){
          if(!res.data.data){
            this.topIfShow=false;
            return;
          }
          this.topIfShow=true;
          console.log('项目总体情况',res.data);
          this.proTotal.proTotalNum=res.data.data[0].value
          this.proTotal.proTotalText=res.data.data[0].name
          this.developmentData=res.data.data[1];
          this.overDueData=res.data.data[2];
          this.accomplishData=res.data.data[3];
        }
      }).catch(error=>{
        this.$Message.error('接口故障:/NewProReport/projectStatisticsOverall')
      })
    },
    // 项目分布情况
    projectStatisticsDistributedList(){
      projectStatisticsDistributedApi(this.procountParams).then(res=>{
        if(res.data.code===200){
            if(!res.data.data){
            this.leftIfShow=false;
            return;
          }
          this.leftIfShow=true;
          console.log('项目分布情况',res.data);
          this.yAxisBar=res.data.data.data;
          this.barTitle=res.data.data.series[0].name
          this.seriesBar=res.data.data.series[0].value;
          this.seriesBar2=res.data.data.series[0].rpercent;
          console.log(this.seriesBar);
        }
      }).catch(error=>{
        this.$Message.error('接口故障:/NewProReport/projectStatisticsDistributed')
      })
    },
    selectTime(time) {
      this.procountParams.createDateStart = time[0];
      this.procountParams.createDateEnd = time[1];
    },
  }
}
</script>

<style lang="scss" scoped>
.page {}
.pro-total{
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
   align-items: center;
  .total{
    font-size: 32px;
  }
  .text{
    font-size: 22px;
  }
}
.finish-desc{
  margin:10px 0;
  display:flex;
  justify-content: center;
}
.rela{
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .form-item {
    margin-bottom: 0;
  }
}
</style>
