<template>
  <div>
    <Table border class="my-table" :columns="columns1" size='default' :data="data1">
    </Table>
  </div>
</template>
<script>
import ProGress from "components/proGress/proGress";
import { Table, Icon, Divider } from "iview";
export default {
  components: {
    Table,
    Icon,
    Divider,
    ProGress
  },
  data() {
    return {
      currentProgress: 40,
      planProgress: 80,
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
              params.row.name
            );
          }
        },
        {
          title: "所属项目",
          align: "center",
          key: "age"
        },
        {
          title: "开始时间",
          align: "center",
          key: "age"
        },
        {
          title: "结束时间",
          align: "center",
          key: "age"
        },
        {
          title: "预计工期（天）",
          align: "center",
          key: "age"
        },

        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  error: params.row.age > 25
                }
              },
              this.dealWith(params.row.address)
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
                currentProgress: Number(params.row.currentjd),
                planProgress: Number(params.row.planjd)
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
                      this.remindClick(1);
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
                      this.eidtClick(2);
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
                      this.delClick(3);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "项目管理",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          currentjd: "30",
          planjd: "70"
        },
        {
          name: "项目管理",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          currentjd: "50",
          planjd: "50"
        },
        {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: "80",
          planjd: "50"
        },
        {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: "80",
          planjd: "50"
        },
        {
          name: "项目管理",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          currentjd: "100",
          planjd: "100"
        }
      ]
    };
  },
  methods: {
    dealWith(val) {
      switch (val) {
        case "1":
          return "上线待审批";
        case "2":
          return "逾期";
        case "3":
          return "延期待审批";
        case "4":
          return "开发中";
        case "5":
          return "立项待审批";
        default:
          return "其他";
      }
    },
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
