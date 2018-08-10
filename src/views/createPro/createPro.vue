<template>
  <div class="page">
    <Form ref="formInline" :model="formInline" inline :label-width='100'>
      <FormItem  label="项目发起方">
        <Input type="text" v-model="formInline.creater" placeholder="请输入人名或部门名">
        </Input>
      </FormItem>
      <FormItem  label="预计上线时间">
        <DatePicker type="daterange" placement="bottom-end" @on-change='selectTime' split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="项目类型">
        <Select v-model="formInline.proType" style="width: 150px">
          <Option v-for='item in projectTypeArray' :key='item.index' :value="item.index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="项目名称">
        <Input type="text" v-model="formInline.proName" placeholder="请输入项目名称">
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
     <Table border class="my-table" :columns="deferColumns" :data="projectList" @on-row-click='gotoDetails'></Table>
    <div class="clearfix bottom-fixed-page" >
      <Page class="rt" :current='page.current' :pageSize='page.pageSize'  :total="page.total" show-sizer @on-change='changeCurrent' @on-page-size-change='changePageSize'  show-total  transfer/>
    </div>
  </div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import {projectTypeArray} from 'utils/common.js';
import { FormItem, Form, Select, Option, Input, DatePicker, Icon,Page,Alert } from 'iview';
import {projectApprovalApi} from 'api/myproject'
export default {
  components: {
    FormItem,
    Form,Page,
    Select,
    Option,
    Input,
    DatePicker,
    Icon,
    ProGress,Alert
  },
  data() {
    return {
      page:{
        current:1,
        pageSize:10,
        page:1
      },
      formInline: {
        creater: "",
        proName: "",
        type:'1',
        date1: "",
        date2: "",
        proState: "1",
        proType: "",
        current:1,
        pageSize:10
      },
          deferColumns: [
        {
          title: '项目名称',
          align:'center',
           render: (h, params) => {
            return h("div", 
                {
                  class: {
                    primary: true
                  }
                },
                params.row.proName
              )
          }
        }, {
          title: '上线时间',
          align:'center',
          key: 'planSDate'
        },
         {
          title: '项目状态',
          align:'center',
          key: 'prostate'
        },
         {
          title: '发起人',
          align:'center',
          key: 'creater'
        },
         {
          title: '创建时间',
          align:'center',
          key: 'createDate'
        },
        {
          title: '操作',
          align:'center',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.operation('pass', row.proid)
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.operation('reject', row.proid)
                  }
                }
              }, '驳回')
            ]);
          }
        }
      ],
      projectList: [
      ]
    };
  },
  computed:{
    projectStateArray(){
      return projectStateArray
    },
    projectTypeArray(){
      return projectTypeArray
    }
  },
  mounted(){
    this.getDelayProjectListData();
  },
  methods: {
    operation(style, id) {
      let title = '';
      if (style === 'pass') {
        this.passParams.proId = id;
        title = '请输入通过原因...'
      } else {
        this.refuseParams.proId = id;
        title = '请输入驳回原因...';
      };
      this.$Modal.confirm({
        onOk: () => {
          if (style === 'pass') {
            PassProStateToDelay(this.passParams).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('延期通过');
                this.initDeferList();
              }
            }).catch(error => {
              this.$Message.error('网络故障，请重试！');
            })
          } else {
            PassProStateToDelay(this.refuseParams).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('延期驳回');
                this.initDeferList();
              }
            }).catch(error => {
              this.$Message.error('网络故障，请重试！');
            })
          }
        },
        onCancel: () => {
          this.$Message.warning('你取消了此操作！');
        },
        render: (h) => {
          return h('Input', {
            style: {
              marginBottom: '-10px'
            },
            props: {
              type: "textarea",
              value: this.value,
              rows: 5,
              autofocus: true,
              placeholder: title
            },
            on: {
              input: (val) => {
                if (style === 'pass') {
                  this.passParams.explain = val;
                } else {
                  this.refuseParams.explain = val;
                }
              }
            }
          })
        }
      })
    },
    gotoDetails(row){
      this.$router.push('proDetails/'+row.proId)
    },
    getDelayProjectListData(){
      projectApprovalApi(this.formInline).then(res=>{
        console.log(res);
        if(res.data.code===200){
          this.projectList=res.data.data;
          this.page=res.data.page;
        }else{
          this.$Message.error(res.data.msg);
        }
      }).catch(
        error=>{
          this.$Message.error('接口故障（/getAllMyProjectList）')
        }
      )
    },
    selectTime(time) {
      this.formInline.date1 = time[0];
      this.formInline.date2 = time[1];
    },
    handleSubmit(name) {
      console.log(this.formInline)
      this.getDelayProjectListData();
    },
    changeCurrent(current){
      this.formInline.current=current;
      this.getDelayProjectListData();
    },
    changePageSize(pageSize){
      this.formInline.pageSize=pageSize;
      this.getDelayProjectListData();
    },
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 10px 0;
}
.bottom-fixed-page {
  margin-top:15px;
}

.wx-tip {
  font-size: 14px;
}
.icon {
  font-size: 18px;
  margin: 0 2px;
  vertical-align: -3px;
}
</style>


