<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<style>
 .task-expand-table.ivu-table-wrapper{
    border:none;
  }
  .task-expand-table .ivu-table-cell-expand i::before{
    content:'';
  }
</style>
<template>
    <div>
         <Table class="task-expand-table" :columns="columns10"  :show-header='false' :data="row.list"></Table>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },data(){
          return{
              columns10: [
                {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '部门',
          key: 'deptno',
          align:'center'
        },
        {
          title: '已完成子任务数',
          align:'center',
          key: 'totalCount'
        },
        {
          title: '逾期任务数',
          align:'center',
          key: 'ovedueCount'
        },{
          title: '准时率',
          align:'center',
          key: 'rate'
        }
      ]
          }
        }
    };
</script>