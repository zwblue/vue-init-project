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
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="Select date" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary'>查询</Button>
          </FormItem>
        </Form>
      </div>
      <Row :gutter='32' :style='{margin:"20px 3px"}'>
        <Col :span='3'  >
          <Card >
            <div class="pro-total" :style='{height:"300px"}'>
              <div>
                  <div class="total">{{proTotal.proTotalNum}}</div>
              <div class="text">{{proTotal.proTotalText}}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col :span='7'>
        <Card>
        <myPie :title='developmentData.name' :count='developmentData.totalCount' :seriesData='developmentData.developmentData'></myPie>
        </Card>
        </Col>
        <Col :span='7'>
        <Card>
        <myPie :title='overDueData.name' :count='overDueData.totalCount' :seriesData='overDueData.overDueData'></myPie>
        </Card>
        </Col>
        <Col :span='7'>
        <Card>
        <myPie :title='accomplishData.name' :count='accomplishData.totalCount' :seriesData='accomplishData.accomplishData'></myPie>
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
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="Select date" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary'>查询</Button>
          </FormItem>
        </Form>
      </div>
    <myBar :yAxis='yAxisBar' :title='barTitle' :seriesData='seriesBar'></myBar>
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
            <DatePicker placement='bottom-end' type="daterange" @on-change='selectTime' placeholder="Select date" ></DatePicker>
          </FormItem>
          <FormItem class="form-item" :label-width="50">
            <Button type='primary'>查询</Button>
          </FormItem>
        </Form>
      </div>
        <myPie :title='accomplishData.name' :count='accomplishData.totalCount' :seriesData='accomplishData.accomplishData'></myPie>
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
import {projectStatisticsAccomplishApi,projectStatisticsOverallApi,projectStatisticsDistributedApi} from 'api/procount.js'
export default {
  components: {
    Card,
    FormItem,
    DatePicker,
    Form,
    myPie,
    Circle,myBar
  },
  data() {
    return {
      barTitle:'',
      yAxisBar:[],
      seriesBar:[],
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
      formItem: {
        createDate1: '',
        createDate2:''
      }
    }
  },
  mounted(){
    this.projectStatisticsAccomplishList();
    this.projectStatisticsOverallList();
    this.projectStatisticsDistributedList();
  },
  methods: {
    // 项目完成情况
    projectStatisticsAccomplishList(){
      projectStatisticsAccomplishApi().then(res=>{
        if(res.data.code===200){
          console.log('项目完成情况',res.data);
        }
      }).catch(error=>{
        this.$Message.error('接口故障:/NewProReport/projectStatisticsAccomplish')
      })
    },
    // 项目分布情况
    projectStatisticsOverallList(){
      projectStatisticsOverallApi().then(res=>{
        if(res.data.code===200){
          console.log('项目分布情况',res.data);
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
    // 项目总体情况
    projectStatisticsDistributedList(){
      projectStatisticsDistributedApi().then(res=>{
        if(res.data.code===200){
          console.log('项目总体情况',res.data);
          this.yAxisBar=res.data.data.data;
          this.barTitle=res.data.data.series[0].name
          this.seriesBar=res.data.data.series[0].value;
          console.log(this.seriesBar);
        }
      }).catch(error=>{
        this.$Message.error('接口故障:/NewProReport/projectStatisticsDistributed')
      })
    },
    selectTime(time) {
      this.formInline.createDateStart = time[0];
      this.formInline.createDateEnd = time[1];
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .form-item {
    margin-bottom: 0;
  }
}
</style>
