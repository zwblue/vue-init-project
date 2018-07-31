<template>
<div>
    <Table border class="my-table" :columns="columns1" size='default' :data="data1">
    </Table>
</div>
</template>
<script>
import {
  Table
} from 'iview'
export default {
  components: {
    Table
  },
  data() {
    return {
      currentProgress: 40,
      planProgress: 80,
      columns1: [{
          title: "组员姓名",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                'class': {
                  primary: true
                }
              }, params.row.name)
          }
        },
        {
          title: "开发中的任务",
          align: 'center',
          key: "age",
        },{
          title: "未开始的任务",
          align: 'center',
          key: "age",
        },{
          title: "负责任务最后结束时间",
          align: 'center',
          key: "age",
        },
        {
          title: "已归档任务数",
          align: 'center',
          key: "age",
        },
        {
          title: "逾期任务数",
          align: 'center',
          key: "age",
        },
        {
          title: "完成准时率",
          align: 'center',
          key: "age",
          render:(h,params)=>{
            return h('div',params.row.age+'%')
          }
        }
      ],
      data1: [{
          name: "项目管理",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          currentjd: '30',
          planjd: '70'
        },
        {
          name: "项目管理",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          currentjd: '50',
          planjd: '50'
        },
        {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: '80',
          planjd: '50'
        }, {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: '80',
          planjd: '50'
        },
        {
          name: "项目管理",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          currentjd: '100',
          planjd: '100'
        }
      ]
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
