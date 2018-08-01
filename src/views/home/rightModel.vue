<template>
  <div class="page" :style='rightModelstyle'>
    <Icon type="md-close" class="close primary" @click="rightModel.ifShow=false" />
    <div class="title name">{{tableData.length!==0?tableData[0].name:''}}</div>
    <Table border :columns="columns1" :data="tableData">
    </Table>
    <Divider class="title"> 全部任务
      <span class="error">（共6个）</span>
    </Divider>
    <my-task></my-task>
  </div>
</template>
<script>
import { Icon,Divider } from 'iview';
import MyTask from './myTask.vue';
export default {
  components: {
    Icon,Divider,MyTask
  },
  props: {
    rightModelstyle: {
      type: Object,
      default: function() {
        return {
          background: "#fafcfe",
          width: "1200px"
        };
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rightModel: {
      type: Object,
      default: function() {
        return {
          ifShow: false
        };
      }
    }
  },
  data() {
    return {
      columns1: [
        {
          title: "开发中的任务",
          align: "center",
          key: "age"
        },
        {
          title: "未开始的任务",
          align: "center",
          key: "age"
        },
        {
          title: "负责任务最后结束时间",
          align: "center",
          key: "age"
        },
        {
          title: "已归档任务数",
          align: "center",
          key: "age"
        },
        {
          title: "逾期任务数",
          align: "center",
          key: "age"
        },
        {
          title: "完成准时率",
          align: "center",
          key: "age",
          render: (h, params) => {
            return h("div", params.row.age + "%");
          }
        }
      ]
    };
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: fixed;
  border-left: 1px solid #ccc;
  padding: 10px 30px;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 6;
}
.close {
  font-size: 24px;
  padding: 3px 10px;
  position: absolute;
  right: 30px;
  top: 10px;
  cursor: pointer;
}
.name {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
