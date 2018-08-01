<template>
  <div class="page">
    <div>
      <!-- 类型推送 -->
      <style-push></style-push>

      <!-- 项目概况 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="12">
          <Divider class="title"> 项目概况
            <span class="error">（共10个）</span>
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
        <project-survey v-if='projectShow'></project-survey>
        <div class="wxtip wx-tip">温馨提示：
          <Icon type="md-bookmark" class="icon warning" />表示该项目暂未分配子任务</div>
      </Row>

      <!-- 我的任务 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="12">
          <Divider class="title"> 我的任务
            <span class="error">（共6个）</span>
          </Divider>
          </Col>
          <Col span="12">
          <Divider orientation="right">
            <div class="pointer primary" @click="queryMyAllProject">
              <span style='font-size:16px;'>查看全部
                <Icon type="ios-more" class="more-icon" />
              </span>
            </div>
          </Divider>
          </Col>
        </Row>
        <my-task></my-task>
      </Row>
      <!-- 组员任务 -->
      <Row>
        <Row style='margin-top:20px;'>
          <Col span="24">
          <Divider class="title"> 组员任务
            <span class="error">（共6个）</span>
          </Divider>
          </Col>
        </Row>
        <member-task></member-task>
      </Row>
    </div>
    <all-project :modelShow='modelShow'></all-project>
    <all-task :modelShow='modelShow'></all-task>
  </div>
</template>
<script>
import ProjectSurvey from './projectSurvey.vue';
import AllProject from './allProject.vue';
import AllTask from './allTask.vue';
import MyTask from './myTask.vue';
import MemberTask from './memberTask.vue';
import StylePush from './stylePush.vue';
import { Divider, Icon } from 'iview';
export default {
  components: {
    ProjectSurvey,
    Divider,
    StylePush,
    MyTask,
    MemberTask,
    Icon,
    AllProject,
    AllTask
  },
  data() {
    return {
      projectShow: false,
      modelShow:{
        allProjectShow: false,
        allTaskShow: false
      }
    };
  },
  mounted() {
    this.projectShow = !this.projectShow;
  },
  methods: {
    queryMyAllProject() {
      this.modelShow.allTaskShow = !this.modelShow.allTaskShow;
    },
    queryAllProject() {
      this.modelShow.allProjectShow = !this.modelShow.allProjectShow;
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
  margin-top: 10px;
}

.icon {
  font-size: 18px;
  margin: 0 2px;
  vertical-align: -3px;
}
</style>
