<template>
<div class="page">
  <Row>
    <Col>
    <Form :label-width="100" inline>
      <FormItem label="项目发起时间">
        <DatePicker type="daterange" @on-change='selectTime' placeholder="请选择时间区间"></DatePicker>
      </FormItem>
      <FormItem class="form-item" :label-width="50">
        <Button type='primary' @click="queryClick">查询</Button>
      </FormItem>
    </Form>
    <Table class="task-table" :columns="columns10" :data="data9"></Table>
    </Col>
  </Row>
</div>
</template>

<script>
import expandRow from './table-expand.vue';
import {
  selectonTaskApi
} from 'api/procount';
import {
  Form,
  FormItem,
  DatePicker
} from 'iview'
export default {
  components: {
    Form,
    FormItem,
    DatePicker,
    expandRow
  },
  data() {
    return {
      formInline: {
        createDateStart: '',
        createDateEnd: ''
      },
      columns10: [{
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
          align:'center',
          key: 'deptno',
          render:(h,params)=>{
            return h('div',{class:{
              primary:true,
              bold:true
            }},params.row.deptno)
          }
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
      ],
      data9: [
      ]

    }
  },
  mounted() {
    this.selectonTaskList();
  },
  methods: {
    queryClick(){
        this.selectonTaskList();
    },
    selectonTaskList() {
      selectonTaskApi(this.formInline).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.data9=res.data.data;
        }
      }).catch(error => {
        this.$Message.error('接口故障：/NewProReport/selectonTask')
      })
    },
    selectTime(time) {
      this.formInline.createDateStart = time[0];
      this.formInline.createDateEnd = time[1];
    },
  }
}
</script>
<style>
  .task-table td.ivu-table-expanded-cell{
      padding:0;
      border-bottom:none;
  }
</style>
<style lang="scss" scoped>
.page {}
</style>
