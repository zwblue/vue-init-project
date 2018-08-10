<template>
<div>
  <Table border class="my-table" height="280" @on-row-click='rowClick' :columns="columns1" size='default' :data="dataList">
  </Table>
  <transition name="slide-fade">
    <right-model v-show='rightModel.ifShow' :rightModel='rightModel' v-if='tableData' :tableData='tableData'>
    </right-model>
  </transition>
</div>
</template>
<script>
import {
  Table
} from 'iview';
import RightModel from './rightModel.vue';
export default {
  components: {
    Table,
    RightModel
  },
  props: {
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      tableData: null,
      rightModel: {
        ifShow: false
      },
      columns1: [{
          title: "组员姓名",
          align: "center",
          render: (h, params) => {
            return h(
              "div", {
                class: {
                  primary: true
                }
              },
              params.row.subtaskHandler
            );
          }
        },
        {
          title: "开发中的任务",
          align: "center",
          key: "kfz"
        },
        {
          title: "未开始的任务",
          align: "center",
          key: "wks"
        },
        {
          title: "负责任务最后结束时间",
          align: "center",
          key: "maxdate"
        },
        {
          title: "已归档任务数",
          align: "center",
          key: "ygd"
        },
        {
          title: "逾期任务数",
          align: "center",
          key: "ywc"
        },
        {
          title: "完成准时率",
          align: "center",
          key: "wcrate",
          render: (h, params) => {
            return h("div", params.row.wcrate + "%");
          }
        }
      ]
    };
  },
  methods: {
    rowClick(row) {
        this.rightModel.ifShow = true;
        this.tableData = row;
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.page {}
</style>
