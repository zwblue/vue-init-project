<template>
<div class="page">
  <Row :gutter='16'>
    <Col span="8">
    <Card>
      <div class="project">
        <div class="pro-title between">
          <div class="title">{{proDetails.proName||''}}</div>
          <div style='min-width:200px;'>
            <pro-gress :currentProgress='Number(proDetails.proProgress||0)' :planProgress='Number(proDetails.theoryProProgress||0)'></pro-gress>
          </div>
        </div>
        <div class="pro-time between">
          <div class="time">{{proDetails.planSDate||''}}</div>
          <div class="pro-state"><span :class="addClass(proDetails.proState)">{{getProjectState(proDetails.proState)}}</span></div>
        </div>
      </div>
      <Button icon='md-add' type='primary' long> 添加参与部门</Button>
      <Collapse v-model="openPanelIndex" class="pro-details-panel">
        <Panel :name="String(index)" v-for='(task,index) in taskList' :key='index'>
          <div class="task-intr">
            <div class="pro-title between">
              <div class="primary">{{task.taskName}}</div>
              <div style='min-width:200px;'>
                <pro-gress :currentProgress='task.taskProgress'></pro-gress>
              </div>
            </div>
            <div class="pro-time between">
              <div class="time">{{task.sDate}} - {{task.eDate}} </div>
              <div class="pro-state">{{getTaskState(task.taskState)}}</div>
            </div>
          </div>
          <div slot="content">
            <p class="center" v-if='task.subtaskList.length===0'>暂未分配子任务</p>
            <div v-if='task.subtaskList.length!==0' class="zi-task-intr" v-for='(subtask,index) in task.subtaskList' :key='index'>
              <div class="pro-title between">
                <div>{{subtask.subtaskName}}</div>
                <div style='min-width:200px;'>
                  <pro-gress :currentProgress='subtask.subtaskProgress' :planProgress='subtask.subtaskTheoryProgress'></pro-gress>
                </div>
              </div>
              <div class="pro-time between">
                <div class="time">{{subtask.sDate}} - {{subtask.eDate}}</div>
                <div class="pro-state">{{getTaskState(subtask.subtaskState)}}</div>
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
        <Tabs value="name1" >
          <TabPane label="项目详情" name="name1">
            <pro-descrition :projectDetails='proDetails'></pro-descrition>
          </TabPane>
          <TabPane label="甘特图" name="name2">
            <pro-playTable></pro-playTable>
          </TabPane>
        </Tabs>
      </div>
    </Card>
    </Col>
  </Row>
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
import ProGress from 'components/proGress/proGress.vue'
import ProDescrition from './pro-descrition.vue'
import ProPlayTable from './pro-playTable.vue'
import {
  getLogDetailInfoApi,
  getTaskListByProIdApi
} from 'api/myproject.js'
import {
  getProjectState,
  addClass,getTaskState 
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
    ProPlayTable
  },
  data() {
    return {
      openPanelIndex: '1',
      proDetails: {},
      taskList: []
    };
  },
  computed: {

  },
  mounted() {
    this.getLogDetailInfoData();
    this.getTaskListByProIdData();
  },
  methods: {
    getTaskState(state) {
     return getTaskState(state)
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
    getLogDetailInfoData() {
      getLogDetailInfoApi({
        proId: this.$route.params.id,
        type: '1'
      }).then(
        res => {
          console.log('project', res.data);
          if (res.data.code === 200) {
            this.proDetails = res.data.data;
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
    },
  }
};
</script>
<style lang='scss'>
.pro-details-panel>.ivu-collapse-item>.ivu-collapse-header {
  height: auto;
  line-height: normal;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pro-details-panel>.ivu-collapse-item>.ivu-collapse-header>i {
  float: left;
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
  padding: 5px 0;
  width: 90%;
  .between {
    padding: 3px 0;
  }
}

.zi-task-intr {
  padding: 5px 0;
  font-size: 12px;
  padding-left:10%;
  .between {
    padding: 2px 0;
  }
}

.zi-task-intr:not(:first-child) {
  border-top: 1px solid #efefef;
}

.page {}
</style>
