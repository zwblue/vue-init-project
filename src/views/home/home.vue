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
            <div class="pointer primary">
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
            <div class="pointer primary">
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
          <Divider class="title"> 我的任务
            <span class="error">（共6个）</span>
          </Divider>
          </Col>
        </Row>
        <member-task></member-task>
      </Row>
    </div>
  </div>
</template>

<script>
import ProjectSurvey from "./projectSurvey.vue";
import MyTask from "./myTask.vue";
import MemberTask from "./memberTask.vue";
import StylePush from "./stylePush.vue";
import { Divider ,Icon} from "iview";
export default {
  components: {
    ProjectSurvey,
    Divider,
    StylePush,
    MyTask,
    MemberTask,
    Icon
  },
  data() {
    return {
      projectShow: false
    };
  },
  mounted() {
    this.projectShow = !this.projectShow;
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
  vertical-align: -4px;
}
</style>
