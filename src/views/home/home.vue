<template>
  <div class="page">
    <div>
      <!-- 类型推送 -->
      <style-push>
      </style-push>
      <!-- 项目概况 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="12">
          <Divider class="title">项目概况
            <span class="error">（共{{projectSurveyData.sum}}个）</span>
          </Divider>
          </Col>
          <Col span="12">
          <Divider orientation="right">
            <div class="pointer primary" @click="queryAllProject">
              <span style='font-size:16px;'>查看全部
                <Icon type="ios-more" class="more-icon" />
              </span>
            </div>
          </Divider>
          </Col>
        </Row>
        <project-survey v-if='projectShow' :dataList='projectSurveyData.dataList'></project-survey>
        <Alert :style='{margin:"10px 0"}'>
          <div class="wxtip wx-tip">温馨提示：
            <Icon type="md-bookmark" class="icon warning" />表示该项目暂未分配子任务</div>
        </Alert>
      </Row>
      <!-- 我的任务 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="12">
          <Divider class="title">我的任务
            <span class="error">（共{{myTaskData.sum}}个）</span>
          </Divider>
          </Col>
          <Col span="12">
          <Divider orientation="right">
            <div class="pointer primary" @click="queryMyAllTask">
              <span style='font-size:16px;'>查看全部
                <Icon type="ios-more" class="more-icon" />
              </span>
            </div>
          </Divider>
          </Col>
        </Row>
        <my-task :dataList='myTaskData.dataList'></my-task>
      </Row>
      <!-- 组员任务 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="24">
          <Divider class="title">组员任务
            <span class="error">（共{{myMemberData.sum}}个）</span>
          </Divider>
          </Col>
        </Row>
        <member-task :dataList='myMemberData.dataList'></member-task>
      </Row>
    </div>
    <all-project :modelShow='modelShow' :loading='proloading' :page='page' :dataList='allProjectData' @changeCurrent='changeCurrent' @changePageSize='changePageSize'></all-project>
    <all-task :modelShow='modelShow' :dataList='allTaskData' :page='page' :loading='taskloading' @changePageSize='changePageSize' @changeCurrent='changeCurrent'></all-task>
  </div>
</template>

<script>
import ProjectSurvey from "./projectSurvey.vue";
import AllProject from "./allProject.vue";
import AllTask from "./allTask.vue";
import MyTask from "./myTask.vue";
import MemberTask from "./memberTask.vue";
import StylePush from "./stylePush.vue";
import { Divider, Icon, Alert } from "iview";
import {
  getProInfoByIndexApi,
  getMyTaskInfoByIndexApi,
  getMyMemberSubtaskCountByIndexApi,newFindRoleMenuApi
} from "api/home.js";
import allProjectVue from "./allProject.vue";
export default {
  components: {
    ProjectSurvey,
    Divider,
    StylePush,
    MyTask,
    MemberTask,
    Icon,
    AllProject,
    AllTask,
    Alert
  },
  data() {
    return {
      projectShow: false,
      proloading:false,
      taskloading:false,
      modelShow: {
        allProjectShow: false,
        allTaskShow: false
      },
      page:{
        pageSize:10,
        current:1,
        total:0
      },
      projectSurveyParams: {
        current: "1",
        pageSize: "5"
      },
      myTaskParams: {
        current: "1",
        pageSize: "5"
      },
      myMemberParams:{
        current: "1",
        pageSize: "10000"
      },
      projectSurveyData: {
        sum: 0,
        dataList: []
      },
      myTaskData: {
        sum: 0,
        dataList: []
      },
      myMemberData: {
        sum: 0,
        dataList: []
      },
      allProjectData: [],
      allTaskData: []
    };
  },
  mounted() {
    this.projectShow = !this.projectShow;
    this.getProInfoByIndexList();
    this.getMyTaskInfoByIndexList();
    this.getMyMemberSubtaskCountByIndexList();
  },
  methods: {
    getMyMemberSubtaskCountByIndexList() {
      getMyMemberSubtaskCountByIndexApi(this.myMemberParams)
        .then(res => {
          if (res.data.code === 200) {
            console.log("组员任务", res.data);
            this.myMemberData.dataList = res.data.data;
              this.myMemberData.sum = res.data.page.total;
          }
        })
        .catch(error => {
          this.$Message.error("接口故障--/getProInfoByIndex");
        });
    },
    getMyTaskInfoByIndexList(type = "") {
      getMyTaskInfoByIndexApi(this.myTaskParams)
        .then(res => {
          if (res.data.code === 200) {
            console.log("我的任务", res.data);
            if (type === "all") {
              this.allTaskData = res.data.data;
              this.page=res.data.page;
            } else {
              this.myTaskData.sum = res.data.page.total;
              this.myTaskData.dataList = res.data.data;
            }
          }
        })
        .catch(error => {
          this.$Message.error("接口故障--/getProInfoByIndex");
        });
    },
    getProInfoByIndexList(type = "") {
      getProInfoByIndexApi(this.projectSurveyParams)
        .then(res => {
          if (res.data.code === 200) {
            console.log("项目概况", res.data);
            if (type === "all") {
              this.allProjectData = res.data.data;
              this.page=res.data.page;
            } else {
              this.projectSurveyData.sum = res.data.page.total;
              this.projectSurveyData.dataList = res.data.data;
            }
          }
        })
        .catch(error => {
          this.$Message.error("接口故障--/getProInfoByIndex");
        });
    },
    queryMyAllTask() {
      this.modelShow.allTaskShow = !this.modelShow.allTaskShow;
      this.myTaskParams.pageSize = "10";
      this.myTaskParams.current = "1";
      this.getMyTaskInfoByIndexList("all");
    },
    queryAllProject() {
      this.modelShow.allProjectShow = !this.modelShow.allProjectShow;
      this.projectSurveyParams.pageSize = "10";
      this.projectSurveyParams.current = "1";
      this.getProInfoByIndexList("all");
    },
    changeCurrent(val, type) {
      console.log(val, type);
      if (type === "pro") {
        this.projectSurveyParams.current = val;
        this.getProInfoByIndexList("all");
      } else if (type === "task") {
        this.myTaskParams.current = val;
        this.getMyTaskInfoByIndexList("all");
      }
    },
    changePageSize(val, type) {
      console.log(val, type);
      if (type === "pro") {
        this.projectSurveyParams.pageSize = val;
        this.getProInfoByIndexList("all");
      } else if (type === "task") {
        this.myTaskParams.pageSize = val;
        this.getMyTaskInfoByIndexList("all");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
}

.more-icon {
  font-size: 20px;
  margin: 0 2px;
}

.wx-tip {
  font-size: 14px;
}

.icon {
  font-size: 18px;
  margin: 0 2px;
  vertical-align: -3px;
}
</style>
