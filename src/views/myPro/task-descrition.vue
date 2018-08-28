<template>
<div class="page">
  <h3 class="title center">
    <Divider :style='{fontWeight:"bold"}'>{{taskDetails.taskName||''}}</Divider>
  </h3>
  <div class="header" :style='{margin:"10px 0"}'>
    <div v-if='ifHasButton&&operationProButton'>
      <Tooltip content="提醒任务人" placement="bottom-start">
        <Icon type="md-notifications" class="primary click-btn" @click="remindTaskClick" />
      </Tooltip>
      <Tooltip content="修改任务">
        <Icon class="icon-edit_s iconfont primary click-btn" @click="model.editTask=!model.editTask"></Icon>
      </Tooltip>
      <Tooltip content="删除任务">
        <Icon type="md-trash" class="primary click-btn" @click="delTaskClick" />
      </Tooltip>
    </div>
    <div class="center">
      所属项目：<span class="primary">{{proName}}</span>
    </div>
  </div>
  <div :style='{margin:"30px 0"}'>
    <Table border :columns="taskColumns" :data="tableData">
    </Table>
    <div :style='{margin:"20px 0"}'>

      <Tabs value="name1" type="card">
        <TabPane label="子任务列表" name="name1">
          <Table border :columns="zitaskColumns" :data="taskDetails.subtaskList"></Table>
        </TabPane>
        <Button type='primary' icon='md-add' size='small' slot="extra" :disabled='!ifHasButton||!operationTaskButton' @click="model.addZitask=!model.addZitask">添加子任务</Button>
      </Tabs>
    </div>
    <Tabs value="name1" type="card">
      <TabPane label="开发日志" name="name1">
        <Table height='370' :columns="devColumns" :data="taskDetails.subtaskDevelopLogByTask"></Table>
      </TabPane>
      <TabPane label="操作日志" name="name2">
        <Table height='370' :columns="handColumns" :data="taskDetails.taskLogRecords"></Table>
      </TabPane>
    </Tabs>
  </div>
  <add-zitask :taskDetails='taskDetails' @resetAllZitaskList='resetZitaskList' v-if='model.addZitask' :model='model'></add-zitask>
  <edit-zitask :taskDetails='taskDetails' :zitaskDetails='zitaskDetails' @resetAllZitaskList='resetZitaskList' v-if='model.editZitask&&zitaskDetails' :model='model'></edit-zitask>
  <edit-joinDept :taskDetails='taskDetails' :proDetails='proDetails' v-if='model.editTask' @editJoinDept='resetZitaskList' :model='model'></edit-joinDept>
</div>
</template>
<script>
import {
  getButtonBySubtaskApi
} from 'api/getbutton.js'
import {
  newGroupHandleApi,
  updSubtaskhandleApi,
  getHomePageRemindingApi,
  getHandlerPowerByProAndTaskApi
} from 'api/myproject.js';
import {
  getDevlogType,
  getHandlogType,
  getNoButtonProjectState
} from 'utils/common.js';
import {
  Alert,
  Tabs,
  TabPane,
  Icon,
  Tooltip,
  Divider,
  Row,
  Col
} from 'iview';
import ProGress from 'components/proGress/proGress.vue'
import EditJoinDept from 'components/pro-operation/editJoinDept.vue'
import EditZitask from 'components/pro-operation/editZitask.vue'
import AddZitask from 'components/pro-operation/addZitask.vue'
export default {
  components: {
    ProGress,
    Tooltip,
    Divider,
    Row,
    Col,
    Alert,
    Tabs,
    TabPane,
    Icon,
    EditJoinDept,
    EditZitask,
    AddZitask
  },
  props: {
    taskDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    proDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    operationProButton: {
      type: Boolean,
      default: false
    },
    proName: {
      type: String,
      default: ''
    }
  },

  computed: {
    tableData() {
      return [{ ...this.taskDetails
      }]
    },
    ifHasButton() {
      return getNoButtonProjectState(this.$route.query.proState)
    }
  },
  watch: {
    'taskDetails.taskId' (newval, val) {
      console.log(newval)
      this.initTaskButton();
    }
  },
  data() {
    return {
      operationTaskButton: false,
      zitaskDetails: null,
      model: {
        editTask: false,
        editZitask: false,
        addZitask: false
      },
      zitaskColumns: [{
          title: '子任务名称',
          align: 'center',
          key: 'subtaskName'
        }, {
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
        }, {
          title: "预期工期（天）",
          align: 'center',
          key: 'workDate'
        }, {
          title: "子任务状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div',  {
                directives: [{
                  name: 'state',
                  value: {
                    state: params.row.subtaskState,
                    day: params.row.overdueDays,
                    type: 'task'
                  }
                }]
              }
            )
          }
        }, {
          title: "子任务进度",
          align: 'center',
          width: 200,
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
          title: "处理人",
          align: 'center',
          key: 'subtaskHandler'
        }, {
          title: "操作",
          align: "center",
          width: 130,
          render: (h, params) => {
            if (!this.ifHasButton) {
              return null
            }
            if (!this.operationTaskButton) {
              return null
            }
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display: params.row.subtaskProgress == '100' ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.remindClick(params.row);
                    }
                  }
                },
                "提醒"
              ),
              h(
                "Button", {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    // display: !edit ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.editClick(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    // display: !del ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.delClick(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
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
          return h('div', params.row.progress + '%')
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
      taskColumns: [{
          title: "任务状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', 
             {
                directives: [{
                  name: 'state',
                  value: {
                    state: params.row.taskState,
                    day: params.row.overdueDays,
                    type: 'task'
                  }
                }]
              }
            )
          }
        }, {
          title: "任务数进度",
          align: "center",
          render: function(h, params) {
            return h('div', {}, params.row.finiashSubtaskNum + ' / ' + params.row.allSubtaskNum)
          }
        }, {
          title: "任务进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.taskProgress),
                planProgress: Number(params.row.taskTheoryProgress)
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
        }
      ],
    }
  },
  mounted() {
    this.initTaskButton();
  },
  methods: {
    initTaskButton() {
      console.log('init', this.taskDetails)
      getHandlerPowerByProAndTaskApi({
        type: 2,
        proId: this.$route.params.id,
        taskId: this.taskDetails.taskId
      }).then(
        res => {
          if (res.data.code === 200) {
            this.operationTaskButton = res.data.data;
          }
        }
      ).catch(error => {
        this.$Message.error('接口故障：/getHandlerPowerByProAndTask')
      })
    },
    resetZitaskList() {
      this.$emit('getTaskListByProIdData');
      this.$emit('openTask', this.taskDetails.taskId);
    },
    remindTaskClick() {
      const remindingParams = {
        taskId: this.taskDetails.taskId,
        subtaskId: "",
        type: '2'
      }
      if (this.taskDetails.taskState === '1') {
        remindingParams.type = '1'
      }
      this.$Modal.confirm({
        title: "提醒对话框",
        content: "<p>确认提醒该任务负责人尽快完成此任务？</p>",
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
    delTaskClick() {
      console.log('del', this.taskDetails)
      this.$Modal.confirm({
        title: "删除任务",
        content: "<p>是否确认删除任务？</p>",
        onOk: () => {
          newGroupHandleApi({
              taskId: this.taskDetails.taskId,
              proId: this.taskDetails.proId,
              type: 3
            })
            .then(res => {
              let data = res.data;
              if (data.code == 200) {
                this.$Message.success(data.msg);
                this.$emit('getTaskListByProIdData');
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
    },
    editClick(row) {
      this.zitaskDetails = { ...row,
        squadId: this.taskDetails.squadId
      };
      this.model.editZitask = !this.model.editZitask;
    },
    remindClick(row) {
      const remindingParams = {
        taskId: row.taskId,
        subtaskId: row.subtaskId,
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
              subtaskId: obj.subtaskId,
              subtaskName: obj.subtaskName,
              type: 3
            })
            .then(res => {
              let data = res.data;
              if (data.code == 200) {
                this.$Message.success(data.msg);
                this.resetZitaskList();
                setTimeout(() => {
                  this.resetZitaskList();
                }, 200)
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
