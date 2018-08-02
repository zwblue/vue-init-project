<template>
<div class="page">
  <div class="header" :style='{margin:"10px 0"}'>
    <h3 class="title">{{projectDetails.proName||''}}</h3>
    <div class="center">
      <Button type='warning' ghost>延期申请</Button>
      <Button type='success' ghost>上线审批</Button>
      <Button type='error' ghost>作废项目</Button>
    </div>
  </div>
  <div :style='{margin:"30px 0"}'>
    <Table border :columns="proColumns" :data="tableData">
    </Table>
    <Alert :style='{margin:"10px 0 20px"}'>{{projectDetails.proDeclare}}</Alert>
    <Tabs value="name1" type="card">
      <TabPane label="开发日志" name="name1">
        <Table height='470' :columns="devColumns" :data="projectDetails.subtaskDevelopLogByPro"></Table>
      </TabPane>
      <TabPane label="操作日志" name="name2">
        <Table  height='470' :columns="handColumns" :data="projectDetails.proLogRecords"></Table>
      </TabPane>
    </Tabs>
  </div>
</div>
</template>

<script>
import {
  getProjectState,
  getProjectType,
  getDevlogType,getHandlogType
} from 'utils/common.js';
import {
  Alert,
  Tabs,
  TabPane
} from 'iview';
import ProGress from 'components/proGress/proGress.vue'
export default {
  components: {
    ProGress,
    Alert,
    Tabs,
    TabPane
  },
  props: {
    projectDetails: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  computed: {
    tableData() {
      return [{ ...this.projectDetails
      }]
    }
  },
  data() {
    return {
      devColumns: [{
          title: '类型',
          align: 'center',
          render(h, params) {
            return h('div', getDevlogType(params.row.type))
          }
        }, {
          title: '时间',
          align: 'center',
          key: 'Date',
        }, {
          title: '操作人',
          align: 'center',
          key: 'Emp',
        }, {
          title: '说明',
          align: 'center',
          key: 'explain',
        }, {
          title: '任务进度',
          align: 'center',
          key: 'explain',
          render: (h, params) => {
            return h('div', params.row.taskProgress + '%')
          }
        }, {
          title: '项目进度',
          align: 'center',
          key: 'explain',
          render: (h, params) => {
            return h('div', params.row.projectProgress) + '%'
          }
        }
      ],
       handColumns: [{
          title: '类型',
          align: 'center',
          render(h, params) {
            return h('div', getHandlogType(params.row.type))
          }
        }, {
          title: '时间',
          align: 'center',
          key: 'Date',
        }, {
          title: '操作人',
          align: 'center',
          key: 'Emp',
        }, {
          title: '说明',
          align: 'center',
          key: 'explain',
        }
      ],
      proColumns: [{
          title: "项目状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                class: {
                  error: params.row.proState == 7 || params.row.proState == 8
                }
              }, getProjectState(params.row.proState)
            )
          }
        }, {
          title: "任务数进度",
          align: "center",
          render: function(h, params) {
            return h('div', {}, params.row.finishTaskNum + ' / ' + params.row.allTaskNum)
          }
        }, {
          title: "项目进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.proProgress),
                planProgress: Number(params.row.theoryProProgress)
              }
            });
          }
        },
        {
          title: "预计上线时间",
          align: 'center',
          key: "planSDate",
        },
        {
          title: "预计下线时间",
          align: 'center',
          key: "planEDate",
          render: (h, params) => {
            return h('div', params.row.planEDate || '--')
          }
        },
        {
          title: "类型",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', getProjectType(params.row.proType)
            )
          }
        }, {
          title: "负责人",
          align: 'center',
          key: "creater"
        },
      ],
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.page {}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
