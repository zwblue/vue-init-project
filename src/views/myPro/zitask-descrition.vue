<template>
<div class="page">
  <h3 class="title center">
    <Divider :style='{fontWeight:"bold"}'>{{zitaskDetails.subtaskName||''}}</Divider>
  </h3>
  <div class="header" :style='{margin:"10px 0"}'>
    <div v-if='ifHasButton'>
      <Tooltip content="修改子任务" placement="bottom-start" >
        <Icon class="icon-edit_s iconfont primary click-btn" @click="editClick"></Icon>
      </Tooltip>
      <Tooltip content="删除子任务">
        <Icon type="md-trash" class="primary click-btn"  @click="delClick" />
      </Tooltip>
      <Tooltip content="提醒负责人">
        <Icon type="md-notifications" class="primary click-btn"  @click="remindClick" />
      </Tooltip>
    </div>
    <div class="center">
      所属项目：<span class="primary">{{proName}}</span>
    </div>
  </div>
  <div :style='{margin:"30px 0"}'>
    <Table border :columns="zitaskColumns" :data="tableData">
    </Table>
    <Tabs value="name1" size='small' type="card" :style='{margin:"20px 0"}'>
      <TabPane label="开发日志" name="name1">
        <Table height='470' :columns="devColumns" :data="zitaskDetails.subtaskDevelopLogBySubtask"></Table>
      </TabPane>
      <TabPane label="操作日志" name="name2">
        <Table height='470' :columns="handColumns" :data="zitaskDetails.subtaskLogRecords"></Table>
      </TabPane>
      <Button :disabled='!ifHasButton' type='primary' size='small' slot="extra" @click="model.updateZitask=!model.updateZitask">更新日志</Button>
    </Tabs>
  </div>
  <edit-zitask :zitaskDetails='zitaskDetails' @resetAllZitaskList='resetZitaskList' v-if='model.editZitask' :model='model'></edit-zitask>
  <update-zitask :zitaskDetails='zitaskDetails' @updateZitask='openziTask' :model="model"  v-if='model.updateZitask'></update-zitask>
</div>
</template>

<script>
import {
  getTaskState,
  getProjectType,
  getDevlogType,
  getHandlogType
} from 'utils/common.js';
import {
  updSubtaskhandleApi,
  getHomePageRemindingApi
} from 'api/myproject.js';
import {
  Alert,
  Tabs,
  TabPane,
  Icon,
  Divider,
  Tooltip
} from 'iview';
import ProGress from 'components/proGress/proGress.vue'
import UpdateZitask from 'components/pro-operation/updateZitask.vue'
import EditZitask from 'components/pro-operation/editZitask.vue'
export default {
  components: {
    ProGress,
    Alert,
    Tabs,
    TabPane,
    Icon,
    Divider,
    Tooltip,
    UpdateZitask,EditZitask
  },
  props: {
    deptId:{
      type: [String,Number],
      default: ''
    },
    zitaskDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    proName: {
      type: String,
      default: ''
    }
  },
  computed: {
    tableData() {
      return [{ ...this.zitaskDetails
      }]
    },ifHasButton() {
      sessionStorage.getItem('url') === '/finishedPro' &&
        sessionStorage.getItem('url') === '/recyclePro' ? false : true
    }
  },
  data() {
    return {
      model: {
        updateZitask: false,
        editZitask:false
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
        key: 'filePath',
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
      zitaskColumns: [{
          title: "子任务状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                class: {
                  error: params.row.subtaskState == 5
                }
              }, getTaskState(params.row.subtaskState)
            )
          }
        }, {
          title: "子任务进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.subtaskProgress),
                planProgress: Number(params.row.subtaskTheoryProgress)
              }
            });
          }
        },
        {
          title: "开始时间",
          align: 'center',
          key: "sDate",
        },
        {
          title: "结束时间",
          align: 'center',
          key: "eDate",
          render: (h, params) => {
            return h('div', params.row.eDate || '--')
          }
        },
        {
          title: "预期工期（天）",
          align: 'center',
          key: 'workDate'
        }, {
          title: "处理人",
          align: 'center',
          key: 'subtaskHandler'
        }
      ],
    }
  },
  mounted() {},
  methods: {
     resetZitaskList() {
      this.$emit('getTaskListByProIdData');
      this.$emit('openziTask', this.zitaskDetails.subtaskId);
    },
    openziTask(){
      this.$emit('openziTask', this.zitaskDetails.subtaskId);
    },
    editClick(row) {
      this.model.editZitask = !this.model.editZitask;
    },
    remindClick(row) {
      const remindingParams = {
        taskId: this.zitaskDetails.taskId,
        subtaskId: this.zitaskDetails.subtaskId,
        type: '3'
      }
      this.$Modal.confirm({
        title: "提醒对话框",
        content: "<p>确认提醒该任务负责人尽快完成此子任务？</p>",
        onOk: () => {
          getHomePageRemindingApi(remindingParams)
            .then(res => {
              if (res.data.code == 200) {
                this.$Message.success("提醒成功！");
              } else {
                this.$Message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$Message.error("系统异常！");
            });
        },
        onCancel: () => {
          this.$Message.info("你取消了提醒用户！");
        }
      });
    },
    delClick(obj) {
      this.$Modal.confirm({
        title: "删除对话框",
        content: "<p>是否确认删除子任务？</p>",
        onOk: () => {
          updSubtaskhandleApi({
              subtaskId: this.zitaskDetails.subtaskId,
              subtaskName: this.zitaskDetails.subtaskName,
              type: 3
            })
            .then(res => {
              let data = res.data;
              if (data.code == 200) {
                this.$Message.success(data.msg);
                this.$emit('openProject',this.$route.params.id);
              } else {
                this.$Message.error(data.msg);
              }
            })
            .catch(err => {
              this.$Message.error("接口故障：/updSubtaskhandle");
              return false;
            });
        },
        onCancel: () => {
          this.$Message.info("你取消了删除操作！");
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.page {}

.click-btn {
  padding: 5px 5px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 18px;
}

.click-btn:hover {
  color: #5cadff!important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
