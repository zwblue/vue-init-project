<template>
<div class="page">
  <Row :gutter='16'>
    <Col span="8">
    <Card>
      <div class="project">
        <div class="pro-title between">
          <div class="title">项目名称</div>
          <div style='min-width:200px;'>
            <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
          </div>
        </div>
        <div class="pro-time between">
          <div class="time">2013 12/3/12</div>
          <div class="pro-state">{{getProjectState}}</div>
        </div>
      </div>
      <Button icon='md-add' type='primary' long> 添加参与部门</Button>
      <Collapse v-model="openPanelIndex" class="pro-details-panel">
        <Panel name="1">
          <div class="task-intr">
            <div class="pro-title between">
              <div class="primary">项目名称</div>
              <div style='min-width:200px;'>
                <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
              </div>
            </div>
            <div class="pro-time between">
              <div class="time">2013 12/3/12</div>
              <div class="pro-state">{{getProjectState}}</div>
            </div>
          </div>
          <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
        <Panel name="2">
          <div class="task-intr">
            <div class="pro-title between">
              <div class="primary">项目名称</div>
              <div style='min-width:200px;'>
                <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
              </div>
            </div>
            <div class="pro-time between">
              <div class="time">2013 12/3/12</div>
              <div class="pro-state">{{getProjectState}}</div>
            </div>
          </div>
          <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
        </Panel>
        <Panel name="3">
          <div class="task-intr">
            <div class="pro-title between">
              <div class="primary">项目名称</div>
              <div style='min-width:200px;'>
                <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
              </div>
            </div>
            <div class="pro-time between">
              <div class="time">2013 12/3/12</div>
              <div class="pro-state">{{getProjectState}}</div>
            </div>
          </div>
          <div slot="content">
            <div class="zi-task-intr">
              <div class="pro-title between">
                <div>项目名称</div>
                <div style='min-width:200px;'>
                  <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
                </div>
              </div>
              <div class="pro-time between">
                <div class="time">2013 12/3/12</div>
                <div class="pro-state">{{getProjectState}}</div>
              </div>
            </div>
            <div class="zi-task-intr">
              <div class="pro-title between">
                <div>项目名称</div>
                <div style='min-width:200px;'>
                  <pro-gress :currentProgress='50' :planProgress='70'></pro-gress>
                </div>
              </div>
              <div class="pro-time between">
                <div class="time">2013 12/3/12</div>
                <div class="pro-state">{{getProjectState}}</div>
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
          <TabPane label="项目详情" name="name1"></TabPane>
          <TabPane label="甘特图" name="name2"></TabPane>
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
import {getLogDetailInfoApi} from 'api/myproject.js'
import {
  getProjectState
} from 'utils/common.js'
export default {
  components: {
    Card,
    Tabs,
    TabPane,
    ProGress,
    Collapse,
    Panel
  },
  data() {
    return {
      openPanelIndex: '1',
    };
  },
  computed: {
    getProjectState() {
      return getProjectState(7);
    }
  },
  mounted(){
    getLogDetailInfoApi({proId:this.$route.params.id,type:'1'}).then(
      res=>{
        console.log(res);
      }
    ).catch(err=>{
      this.$Message.error('网络故障（/getLogDetailInfo）')
    })
  },
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
  .between {
    padding: 2px 0;
  }
}

.zi-task-intr:not(:first-child) {
  border-top: 1px solid #efefef;
}

.page {}
</style>
