<template>
  <div>
    <Table border :loading='loading' class="my-table" :columns="columns1" size='default' :data="dataList">
    </Table>
  </div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import { Table, Icon, Divider } from 'iview';
import {getTaskState} from 'utils/common.js'
export default {
  components: {
    Table,
    Icon,
    Divider,
    ProGress
  },
   props:{
    dataList:{
      type:Array,
      default:function(){
        return []
      }
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      columns1: [
        {
          title: "任务名称",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
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
              "div",
              {
                class: {
                  error: params.row.proState ==5
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
                "Button",
                {
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
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    display: params.row.age > 20 ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.eidtClick(params.row.subtaskId);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    display: params.row.age === 25 ? "none" : ""
                  },
                  on: {
                    click: () => {
                      this.delClick(params.row.subtaskId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    remindClick(val) {
      console.log('remind', val);
    },
    eidtClick(val) {
      console.log('eidt', val);
    },
    delClick(val) {
      console.log('del', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
}
</style>
