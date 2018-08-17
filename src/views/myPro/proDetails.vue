<template>
<div class="page">
  <Row :gutter='16'>
    <Col span="8">
    <Card>
      <div class="project">
        <div class="pro-title between" @click="openProject(proDetails.proId)">
          <div class="title" :style='activeId==proDetails.proId?{color:"#2d8cf0"}:null'>{{proDetails.proName||''}}</div>
          <div style='min-width:200px;'>
            <pro-gress :currentProgress='Number(proDetails.proProgress||0)' :planProgress='Number(proDetails.theoryProProgress||0)'></pro-gress>
          </div>
        </div>
        <div class="pro-time between">
          <div class="time">{{proDetails.planSDate||''}}</div>
          <div class="pro-state"><span :class="addClass(proDetails.proState)">{{getProjectState(proDetails.proState)}}</span></div>
        </div>
      </div>
      <Button icon='md-add' type='primary' :disabled='!ifHasButton&&operationProButton' long @click="model.applydept=!model.applydept"> 添加参与部门</Button>
      <Collapse v-model="openPanelIndex" accordion class="pro-details-panel" @on-change='openPanel'>
        <Panel :name="String(index)" v-for='(task,index) in taskList' :key='index' >
          <div class="task-intr" @click.stop="openTask(task.taskId)">
            <div class="pro-title between">
              <div :style='activeId==task.taskId?{color:"#2d8cf0",fontWeight:"bold"}:null' class="no-wrap" >{{task.taskName}}</div>
              <div style='min-width:200px;'>
                <pro-gress :currentProgress='task.taskProgress'></pro-gress>
              </div>
            </div>
            <div class="pro-time between">
              <div class="time">{{task.sDate}} - {{task.eDate}} </div>
              <div class="pro-state">{{getTaskState(task.taskState,task.overdueDays)}}</div>
            </div>
          </div>
          <div slot="content">
            <p class="center" v-if='task.subtaskList.length===0' style='line-height:60px;'>暂未分配子任务</p>
            <div v-if='task.subtaskList.length!==0' class="zi-task-intr" v-for='(subtask,index) in task.subtaskList' :key='index' @click.stop="openziTask(subtask.subtaskId)">
              <div class="pro-title between">
                <div :style='activeId==subtask.subtaskId?{color:"#2d8cf0",fontWeight:"bold"}:null'>{{subtask.subtaskName}}</div>
                <div style='min-width:200px;'>
                  <pro-gress :currentProgress='subtask.subtaskProgress' :planProgress='subtask.subtaskTheoryProgress'></pro-gress>
                </div>
              </div>
              <div class="pro-time between">
                <div class="time">{{subtask.sDate}} - {{subtask.eDate}}</div>
                <div class="pro-state">{{getTaskState(subtask.subtaskState,subtask.overdueDays)}}</div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>
    </Col>
    <Col span="16">
    <Card>
      <div class="pro-details">
        <Tabs value="name1">
          <TabPane :label="detailsName" name="name1">
            <pro-descrition v-show='detailsType==1' :operationProButton='operationProButton' @openProject='openProject' :projectDetails='proDetails'  @getTaskListByProIdData='getTaskListByProIdData'></pro-descrition>
            <task-descrition v-show='detailsType==2' :operationProButton='operationProButton' @openTask='openTask' @openProject='openProject' @getTaskListByProIdData='getTaskListByProIdData' v-if='taskDetails.taskId' :taskDetails='taskDetails' :proDetails='proDetails' :proName='proDetails.proName'></task-descrition>
            <zitask-descrition v-show='detailsType==3' @openProject='openProject' :deptId='taskDetails.squadId' @openziTask='openziTask' :zitaskDetails='zitaskDetails' v-if='zitaskDetails.subtaskId' @getTaskListByProIdData='getTaskListByProIdData' :proName='proDetails.proName'></zitask-descrition>
          </TabPane>
          <TabPane label="甘特图" name="name2">
            <pro-ganteTable :activeSubTaskList='activeSubTaskList' :activeOpenPanpelIndex='activeOpenPanpelIndex'></pro-ganteTable>
          </TabPane>
        </Tabs>
      </div>
    </Card>
    </Col>
  </Row>
  <!-- 添加参与组的组件 -->
  <add-joinDept v-if='model.applydept' @addJoinDept="getTaskListByProIdData" :proDetails='proDetails' :model='model'></add-joinDept>
</div>
</template>
<script>
import {
  Card,
  Tabs,
  TabPane,
  Collapse,
  Panel
} from 'iview'
import AddJoinDept from 'components/pro-operation/addJoinDept.vue'
import ProGress from 'components/proGress/proGress.vue'
import ProDescrition from './pro-descrition.vue'
import TaskDescrition from './task-descrition.vue'
import ZitaskDescrition from './zitask-descrition.vue'
import ProGanteTable from './pro-ganteTable.vue'
import {
  getLogDetailInfoApi,
  getTaskListByProIdApi,getHandlerPowerByProAndTaskApi
} from 'api/myproject.js'

import {
  getProjectState,
  addClass,
  getTaskState,
  getNoButtonProjectState
} from 'utils/common.js'
export default {
  components: {
    Card,
    Tabs,
    TabPane,
    ProGress,
    Collapse,
    Panel,
    ProDescrition,
    ProGanteTable,
    TaskDescrition,
    ZitaskDescrition,
    AddJoinDept
  },
  data() {
    return {
      activeSubTaskList:[],
      // 项目基本信息
      operationProButton:true,
      activeTaskId: '',
      activeOpenPanpelIndex:-1,
      activeSubtaskId: '',
      openPanelIndex: '0',
      proDetails: {},
      taskDetails: {},
      zitaskDetails: {},
      taskList: [],
      detailsType: 1,
      activeId: 0,

      // 各种弹框的显示
      model: {
        applydept: false
      }
    };
  },
  computed: {
    detailsName() {
      if (this.detailsType == 1) {
        return '项目详情'
      } else if (this.detailsType == 2) {
        return '任务详情'
      } else {
        return '子任务详情'
      }
    },
    ifHasButton() {
      return getNoButtonProjectState(this.$route.query.proState)
    }
  },
  mounted() {
    this.openProject(this.$route.params.id, 1);
    this.getTaskListByProIdData();
    this.initProButton();
  },
  methods: {
    openPanel(val){
      if(val[0]||val[0]==0){
        this.activeOpenPanpelIndex=val[0];
        this.activeSubTaskList=this.taskList[Number(val[0])].subtaskList
      }else{
        this.activeOpenPanpelIndex=-1;
      }
    },
    initProButton(){
      getHandlerPowerByProAndTaskApi({type:1,proId:this.$route.params.id,taskId:''}).then(
        res=>{
          if(res.data.code===200){
            this.operationProButton=res.data.data;
          }
        }
      ).catch(error=>{
        this.$Message.error('接口故障：/getHandlerPowerByProAndTask')
      })
    },
    // 项目，任务，子任务切换的接口
    openProject(id) {
      this.detailsType = 1;
      this.activeId = id;
      this.getLogDetailInfoData({
        proId: id,
        type: this.detailsType
      });
    },
    openTask(id) {
      if (id) {
        this.activeTaskId = id;
      }
      this.detailsType = 2;
      this.activeId = id;
      this.getLogDetailInfoData({
        taskId: this.activeTaskId,
        type: this.detailsType
      });
    },
    openziTask(id) {
      if (id) {
        this.activeSubtaskId = id;
      }
      this.detailsType = 3;
      this.activeId = id;
      this.getLogDetailInfoData({
        subtaskId: this.activeSubtaskId,
        type: this.detailsType
      });
    },
    getTaskState(state,days) {
      return getTaskState(state,days)
    },
    getTaskListByProIdData() {
      getTaskListByProIdApi({
        proId: Number(this.$route.params.id),
      }).then(
        res => {
          console.log('tasklist', res.data);
          if (res.data.code === 200) {
            this.taskList = res.data.data.taskList;
          } else {
            this.$Message.error('/getTaskListByProId接口：' + res.data.msg)
          }
        }
      ).catch(err => {
        this.$Message.error('网络故障（/getTaskListByProId')
      })
    },
    getLogDetailInfoData(params) {
      getLogDetailInfoApi(params).then(
        res => {
          if (res.data.code === 200) {
            if (params.type == 1) {
              this.proDetails = res.data.data;
              this.$router.replace({
                query: {
                  proState: this.proDetails.proState
                }
              })
            } else if (params.type == 2) {
              console.log('task', res.data.data)
              this.taskDetails = res.data.data;
            } else {
              this.zitaskDetails = res.data.data;
            }
          } else {
            this.$Message.error('/getLogDetailInfo接口：' + res.data.msg)
          }
        }
      ).catch(err => {
        this.$Message.error('网络故障（/getLogDetailInfo）')
      })
    },
    getProjectState(num) {
      return getProjectState(num);
    },
    addClass(num) {
      return addClass(num);
    }
  }
};
</script>
<style lang='scss'>
.ivu-collapse.pro-details-panel>.ivu-collapse-item>.ivu-collapse-header {
  height: auto;
  line-height: normal;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ivu-collapse.pro-details-panel>.ivu-collapse-item>.ivu-collapse-header>i {
  float: left;
}
.ivu-collapse.pro-details-panel .ivu-collapse-content>.ivu-collapse-content-box{
  padding:0;
}
</style>
<style lang="scss" scoped>
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.pro-state {
  padding-right: 12px;
}

.project {
  padding: 10px 0;
}

.pro-details-panel {
  margin: 20px 0;
}

.task-intr {
  padding: 10px 0;
  width: 90%;
  .between {
    padding: 3px 0;
  }
}

.zi-task-intr {
  box-sizing:border-box;
  padding: 11.5px 0;
  font-size: 12px;
  padding-left: 10%;
  .between {
    padding: 2px 0;
  }
}

.task-intr,
.zi-task-intr,
.project {
  cursor: pointer;
}

.zi-task-intr:not(:first-child) {
  border-top: 1px solid #efefef;
  
}

.page {}
</style>
