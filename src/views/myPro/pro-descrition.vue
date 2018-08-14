<template>
<div class="page">
  <div class="header" :style='{margin:"10px 0"}'>
    <h3 class="title">{{projectDetails.proName||''}}</h3>
    <div class="center" v-if='ifHasButton'>
      <div style='display:inline-block' v-if='operationProButton'>
        <Button type='warning' v-if='!ifApprovalUrl&&projectDetails.proState==7' ghost  @click="model.delay=!model.delay">延期申请</Button>
        <Button type='warning' ghost v-if='projectDetails.proState==8&&!ifApprovalUrl' disabled>延期申请中</Button>
        <Button type='success' v-if='!ifApprovalUrl' ghost :disabled='projectDetails.proProgress!=100' @click="model.online=!model.online">上线审批</Button>
        <Button type='success' ghost v-if='projectDetails.proState==3&&!ifApprovalUrl'>上线审批中</Button>
        <Button type='error' v-if='!ifApprovalUrl' ghost @click='giveUpPro'>作废项目</Button>
      </div>
      <div style='display:inline-block'>
        <Button type='success' v-if='ifApprovalUrl' ghost @click='operation("pass")'>同意</Button>
        <Button type='warning' v-if='ifApprovalUrl' ghost @click='operation("reject")'>驳回</Button>
      </div>
    </div>
  </div>
  <div :style='{margin:"30px 0"}'>
    <Table border :columns="proColumns" :data="tableData">
    </Table>
    <Alert :style='{margin:"10px 0 20px"}'>{{projectDetails.proDeclare}}</Alert>
    <Tabs value="name1" type="card">
      <TabPane label="开发日志" name="name1">
        <Table height='470' :columns="devColumns" :data="projectDetails.subtaskDevelopLogByPro"></Table>
      </TabPane>
      <TabPane label="操作日志" name="name2">
        <Table height='470' :columns="handColumns" :data="projectDetails.proLogRecords"></Table>
      </TabPane>
      <Button :disabled='!ifHasButton' type='primary' size='small' slot="extra" @click="model.updateZitask=!model.updateZitask">更新日志</Button>
    </Tabs>
  </div>
  <delay-model :projectDetails='projectDetails' :model='model' v-if='model.delay'></delay-model>
  <online-model :model='model' v-if='model.online'></online-model>
  <update-allZitask :model='model' v-if='model.updateZitask'></update-allZitask>
</div>
</template>
<script>
import {
  getProjectState,
  getProjectType,
  getDevlogType,
  getHandlogType,
  getNoButtonProjectState
} from 'utils/common.js';
import {
  updSetProToPassOrRejectApi,
  updDelayProToPassOrRejectApi,
  updOnlineProToPassOrRejectApi,
  updApplyHandleByProApi
} from 'api/myproject.js'
import {
  Alert,
  Tabs,
  TabPane,
  Input
} from 'iview';
import ProGress from 'components/proGress/proGress.vue'
import DelayModel from './model/delayModel.vue'
import OnlineModel from './model/onlineModel.vue'
import UpdateAllZitask from './model/updateAllZitask.vue'
export default {
  components: {
    ProGress,
    Alert,
    Tabs,
    TabPane,
    Input,
    UpdateAllZitask,
    OnlineModel,
    DelayModel
  },
  props: {
    projectDetails: {
      type: Object,
      default: () => {
        return {

        }
      }
    },
    operationProButton:{
      type: Boolean,
      default: false
    },
  },
  computed: {
    tableData() {
      return [{ ...this.projectDetails
      }]
    },
    ifHasButton() {
      return getNoButtonProjectState(this.$route.query.proState)
    },
    ifApprovalUrl() {
      return sessionStorage.getItem('url') === '/onlinePro' &&
        sessionStorage.getItem('url') === '/createPro' &&
        sessionStorage.getItem('url') === '/delayPro' ? true : false
    }
  },
  data() {
    return {
      model: {
        delay: false,
        online: false,
        updateZitask: false
      },
      devColumns: [{
        title: '类型',
        align: 'center',
        render(h, params) {
          return h('div', getDevlogType(params.row.type))
        }
      }, {
        title: '时间',
        align: 'center',
        key: 'Date',
      }, {
        title: '操作人',
        align: 'center',
        key: 'Emp',
      }, {
        title: '说明',
        align: 'center',
        key: 'explain',
      }, {
        title: '任务进度',
        align: 'center',
        key: 'explain',
        render: (h, params) => {
          return h('div', params.row.taskProgress + '%')
        }
      }, {
        title: '项目进度',
        align: 'center',
        key: 'explain',
        render: (h, params) => {
          return h('div', params.row.proProgress + '%')
        }
      }],
      handColumns: [{
        title: '类型',
        align: 'center',
        render(h, params) {
          return h('div', getHandlogType(params.row.type))
        }
      }, {
        title: '时间',
        align: 'center',
        key: 'Date',
      }, {
        title: '操作人',
        align: 'center',
        key: 'Emp',
      }, {
        title: '说明',
        align: 'center',
        key: 'explain',
      }, {
        title: '附件',
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const fileurl = row.filePath;
          if (fileurl) {
            return h(
              "a", {
                domProps: {
                  target: "_blank",
                  href: fileurl
                }
              },
              "点击下载"
            );
          } else {
            return h("div", {}, "无附件");
          }
        }
      }],
      proColumns: [{
          title: "项目状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                class: {
                  error: params.row.proState == 7 || params.row.proState == 8
                }
              }, getProjectState(params.row.proState)
            )
          }
        }, {
          title: "任务数进度",
          align: "center",
          render: function(h, params) {
            return h('div', {}, params.row.finishTaskNum + ' / ' + params.row.allTaskNum)
          }
        }, {
          title: "项目进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.proProgress),
                planProgress: Number(params.row.theoryProProgress)
              }
            });
          }
        },
        {
          title: "预计上线时间",
          align: 'center',
          key: "planSDate",
        },
        {
          title: "预计下线时间",
          align: 'center',
          key: "planEDate",
          render: (h, params) => {
            return h('div', params.row.planEDate || '--')
          }
        },
        {
          title: "类型",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', getProjectType(params.row.proType)
            )
          }
        }, {
          title: "负责人",
          align: 'center',
          key: "creater"
        },
      ],
      passParams: {
        proId: '',
        type: '1',
        reason: ''
      },
    }
  },
  mounted() {},
  methods: {
    // 项目作废
    giveUpPro() {
      let params = {
        proId: this.$route.params.id,
        type:'3',
        reason:''
      };
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              type: "textarea",
              rows: 4,
              placeholder: "请输入作废原因..."
            },
            on: {
              input: val => {
                params.reason = val;
              }
            }
          });
        },
        loading: true,
        onOk: () => {
          if (params.reason !== "") {
            updApplyHandleByProApi(params)
              .then(res => {
                const data = res.data;
                if (data.code == 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push('/myPro');
                } else {
                  this.$Message.error(res.data.msg);
                }
              })
              .catch(err => {
                this.$Message.error("系统异常！");
              });
            this.$Modal.remove();
          } else {
            this.$Message.error("请输入作废原因！");
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          this.$Message.info('取消此次操作')
        }
      });
    },
    operation(style) {
      let title = '';
      this.passParams.proId = this.$route.params.id;
      if (style === 'pass') {
        this.passParams.type = 1;
        title = '请输入通过原因...'
      } else {
        this.passParams.type = 2;
        title = '请输入驳回原因...';
      };
      this.$Modal.confirm({
        onOk: () => {
          if (
            sessionStorage.getItem('url') === '/onlinePro'
          ) {
            updOnlineProToPassOrRejectApi(this.passParams).then(res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.getDelayProjectListData();
              }
            }).catch(error => {
              this.$Message.error('网络故障，请重试！');
            })
          } else if (sessionStorage.getItem('url') === '/delayPro') {
            updDelayProToPassOrRejectApi(this.passParams).then(res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.getDelayProjectListData();
              }
            }).catch(error => {
              this.$Message.error('网络故障，请重试！');
            })
          } else if (sessionStorage.getItem('url') === '/createPro') {
            updSetProToPassOrRejectApi(this.passParams).then(res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.getDelayProjectListData();
              }
            }).catch(error => {
              this.$Message.error('网络故障，请重试！');
            })
          }
        },
        onCancel: () => {
          this.$Message.warning('你取消了此操作！');
        },
        render: (h) => {
          return h('Input', {
            style: {
              marginBottom: '-10px'
            },
            props: {
              type: "textarea",
              rows: 5,
              autofocus: true,
              placeholder: title
            },
            on: {
              input: (val) => {
                this.passParams.reason = val;
              }
            }
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.page {}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
