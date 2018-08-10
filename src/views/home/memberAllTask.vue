<template>
<div>
  <Table border :loading='loading' class="my-table" :columns="columns1" size='default' :data="dataList">
  </Table>
</div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import {
  getButtonBySubtaskApi
} from 'api/getbutton.js'
import {
  Table,
  Icon,
  Divider
} from 'iview';
import {
  getTaskState
} from 'utils/common.js'
export default {
  components: {
    Table,
    Icon,
    Divider,
    ProGress
  },
  props: {
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns1: [{
          title: "任务名称",
          align: "center",
          render: (h, params) => {
            return h(
              "div", {
                class: {
                  primary: true
                }
              },
              params.row.subtaskName
            );
          }
        },
        {
          title: "所属项目",
          align: "center",
          key: "proName"
        },
        {
          title: "开始时间",
          align: "center",
          key: "sDate"
        },
        {
          title: "结束时间",
          align: "center",
          key: "eDate"
        },
        {
          title: "预计工期（天）",
          align: "center",
          key: "workDate"
        },

        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            return h(
              "div", {
                class: {
                  error: params.row.proState == 5
                }
              },
              getTaskState(params.row.subtaskState)
            );
          }
        },
        {
          title: "任务进度（实际进度/预期进度）",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.subtaskProgress),
                planProgress: Number(params.row.theorySubtaskProgress)
              }
            });
          }
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display: params.row.age > 25 ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.remindClick(params.row.subtaskId);
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
                    marginLeft: '5px',
                    display: params.row.age > 25 ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.editClick(params.row.subtaskId);
                    }
                  }
                },
                "修改"
              ), h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: '5px',
                    display: params.row.age > 25 ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.delClick(params.row.subtaskId);
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ]
    }

  },
  methods: {
    delClick(val) {
        this.$Modal.confirm({
          title: "删除对话框",
          content: "<p>是否确认删除子任务？</p>",
          onOk: () => {
            handleSubTaskList(params)
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$Message.success(data.msg);
                  this.initSubTaskData(this.taskParams);
                  this.initDetailsData();
                } else {
                  this.$Message.error(data.msg);
                }
              })
              .catch(err => {
                this.$Message.error("系统异常！");
              });
          },
          onCancel: () => {}
        });
    },
    editClick(val) {
      
    },
    remindClick(row) {
        const remindingParams = {
                        taskId: row.taskId,
                        subtaskId: "",
                        type: '2'
                      }
      this.$Modal.confirm({
        title: "提醒对话框",
        content: "<p>确认提醒该任务负责人尽快完成此任务？</p>",
        onOk: () => {
          getHomePageReminding(remindingParams)
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
          this.$Message.info('你取消了提醒用户！');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
