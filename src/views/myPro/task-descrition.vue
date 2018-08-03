<template>
<div class="page">
  <h3 class="title center"> <Divider :style='{fontWeight:"bold"}'>{{taskDetails.taskName||''}}</Divider> </h3>
  <div class="header" :style='{margin:"10px 0"}'>
    <div>
       <Tooltip content="修改任务" placement="bottom-start">
       <Icon class="icon-edit_s iconfont primary click-btn"></Icon>
    </Tooltip>
    <Tooltip content="删除任务">
       <Icon type="md-trash" class="primary click-btn" />
    </Tooltip> 
    <Tooltip content="提醒任务人">
       <Icon type="md-notifications" class="primary click-btn" />
    </Tooltip>

    </div>
    <div class="center">
      所属项目：<span class="primary">{{proName}}</span>
    </div>
  </div>
  <div :style='{margin:"30px 0"}'>
    <Table border :columns="taskColumns" :data="tableData">
    </Table>
    <div :style='{margin:"20px 0"}'>
      <!-- <Row>
        <Col span='12'> <Divider orientation="left"><Button type="text">子任务列表</Button></Divider></Col>
        <Col span='12'> <Divider orientation="right"> <Button type='primary' ghost icon='md-add' >添加子任务</Button></Divider></Col>
      </Row> -->
          <Tabs value="name1" type="card">
            <TabPane label="子任务列表" name="name1">
              <Table border :columns="zitaskColumns" :data="taskDetails.subtaskList"></Table>
            </TabPane>
            <Button type='primary'  icon='md-add' size='small' slot="extra">添加子任务</Button>
          </Tabs>
    </div>
    <Tabs value="name1" type="card">
      <TabPane label="开发日志" name="name1">
        <Table height='370' :columns="devColumns" :data="taskDetails.subtaskDevelopLogByTask"></Table>
      </TabPane>
      <TabPane label="操作日志" name="name2">
        <Table  height='370' :columns="handColumns" :data="taskDetails.taskLogRecords"></Table>
      </TabPane>
    </Tabs>
  </div>
</div>
</template>
<script>
import {
  getTaskState,
  getProjectType,
  getDevlogType,getHandlogType
} from 'utils/common.js';
import {
  Alert,
  Tabs,
  TabPane,Icon,Tooltip,Divider,Row,Col
} from 'iview';
import ProGress from 'components/proGress/proGress.vue'
export default {
  components: {
    ProGress,Tooltip,Divider,Row,Col,
    Alert,
    Tabs,
    TabPane,Icon
  },
  props: {
    taskDetails: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    proName:{
      type:String,
      default:''
    }
  },
  computed: {
    tableData() {
      return [{ ...this.taskDetails
      }]
    }
  },
  data() {
    return {
      zitaskColumns: [{
        title:'子任务名称',
        align:'center',
        key:'subtaskName'
      },  {
          title: "开始时间",
          align: 'center',
          key: "sDate",
        },
        {
          title: "结束时间",
          align: 'center',
          key: "eDate",
          render: (h, params) => {
            return h('div', params.row.planEDate || '--')
          }
        },  {
          title: "预期工期（天）",
          align: 'center',
          key:'workDate'
        },{
          title: "子任务状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                class: {
                  error: params.row.subtaskState == 5 
                }
              }, getTaskState(params.row.subtaskState)
            )
          }
        }, {
          title: "子任务进度",
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.subtaskProgress),
                planProgress: Number(params.row.subtaskTheoryProgress)
              }
            });
          }
        },
      
       {
          title: "处理人",
          align: 'center',
          key:'subtaskHandler'
        },{
          title: "操作",
          align: "center",
          width: 130,
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
            return h('div', params.row.proProgress  + '%')
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
        },{
          title: '附件',
          align: 'center',
           render: (h, params) => {
          const row = params.row;
          const fileurl = row.filePath;
          if (fileurl) {
            return h(
              "a", {
                domProps: {
                  target: "_blank",
                  href: fileurl
                }
              },
              "点击下载"
            );
          } else {
            return h("div", {}, "无附件");
          }
        }
        }
      ],
      taskColumns: [{
          title: "任务状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                class: {
                  error: params.row.taskState == 5 
                }
              }, getTaskState(params.row.taskState)
            )
          }
        }, {
          title: "任务数进度",
          align: "center",
          render: function(h, params) {
            return h('div', {}, params.row.finiashSubtaskNum + ' / ' + params.row.allSubtaskNum)
          }
        }, {
          title: "任务进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.taskProgress),
                planProgress: Number(params.row.taskTheoryProgress)
              }
            });
          }
        },
        {
          title: "开始时间",
          align: 'center',
          key: "sDate",
        },
        {
          title: "结束时间",
          align: 'center',
          key: "eDate",
          render: (h, params) => {
            return h('div', params.row.planEDate || '--')
          }
        },
        {
          title: "预期工期（天）",
          align: 'center',
          key:'workDate'
        }
      ],
    }
  },
  mounted() {},
  methods:{ remindClick(val) {
      console.log('remind', val);
    },
    eidtClick(val) {
      console.log('eidt', val);
    },
    delClick(val) {
      console.log('del', val);
    }}
  
}
</script>
<style lang="scss" scoped>
.page {}
.click-btn{
  padding:5px 5px;
  margin:0 5px;
  cursor: pointer;
  font-size: 18px;
}
.click-btn:hover{
  color:#5cadff!important;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
