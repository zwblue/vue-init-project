<template>
<div>
    <Table :loading="loading" border class="my-table" :columns="columns1" size='default' :data="dataList">
    </Table>
</div>
</template>
<script>
import ProGress from 'components/proGress/proGress'
import {getProjectType,getProjectState} from 'utils/common.js'
import {
  Table,
  Icon
} from 'iview'
export default {
  components: {
    Table,
    Icon,
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
      columns1: [{
          title: "项目名称",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', [h('Icon', {
                 props: {
                  type: params.row.isAllotSubtask===null ? "md-bookmark" : "" 
                },
                style: {
                  marginRight: '10px',
                  fontSize: '18px',
                },
                'class': {
                  warning: true,
                  warningIcon: true
                }
              }), h('span', {
                'class': {
                  primary: true
                }
              }, params.row.proName)])
          }
        },
        {
          title: "预计完成时间",
          align: 'center',
          key: "planSDate",
        },
        {
          title: "项目进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(
              ProGress, {
                props: {
                  currentProgress: Number(params.row.proProgress),
                  planProgress: Number(params.row.theoryProProgress)
                }
              }
            )
          }
        },
        {
          title: "状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                'class': {
                  error: params.row.age > 25
                }
              }, getProjectState(params.row.proState)
            )
          }
        },
        {
          title: "负责人",
          align: 'center',
          key: "creater"
        },
        {
          title: "类型",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', getProjectType(params.row.proType)
            )
          }
        }
      ]
    };
  },
  methods: {
  }
};
</script>
<style>
.warningIcon {
  font-size: 18px;
  margin: 0 2px;
  vertical-align: -3px;
}
</style>
<style lang="scss" scoped>
.page {}

</style>
