<template>
<div>
  <Table border :loading='loading' class="my-table" :columns="columns1" size='default' :data="dataList">
  </Table>
  <update-zitask :zitaskDetails='zitaskDetails' @updateZitask='updateZitask' v-if='model.updateZitask' :model="model">
  </update-zitask>
</div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import UpdateZitask from 'components/pro-operation/updateZitask';
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
    ProGress,
    UpdateZitask
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
      model: {
        updateZitask: false
      },
      zitaskDetails:null,
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
          width: 100,
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
                      this.updateMytask(params.row);
                    }
                  }
                },
                "更新"
              )
            ])
          }
        }
      ]
    }

  },
  methods: {
    updateMytask(val) {
      console.log('updateMytask', val);
      this.zitaskDetails=val;
      this.model.updateZitask=!this.model.updateZitask;
    },
    updateZitask(){
      this.$emit('updateZitask')
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
