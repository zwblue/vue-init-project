<template>
  <div class="page">
    <Form ref="formInline" :model="formInline" inline :label-width='100'>
      <FormItem  label="项目发起方">
        <Input type="text" v-model="formInline.originator" placeholder="请输入人名或部门名">
        </Input>
      </FormItem>
      <FormItem  label="项目发起时间">
        <DatePicker type="daterange" placement="bottom-end" @on-change='selectTime' split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="项目类型">
        <Select v-model="formInline.proType" style="width: 150px">
          <Option v-for='item in projectTypeArray' :key='item.index' :value="item.index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="项目状态">
        <Select v-model="formInline.proState" style="width: 150px">
          <Option v-for='item in projectStateArray' :key='item.index' :value="item.index">{{item.name}}</Option>
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
    <Table border class="my-table" :columns="prjectColumns" size='default' :data="projectList">
    </Table>
    <div class="page-box clearfix">
      <Page class="rt" :current='page.current' :pageSize='page.pageSize'  :total="page.total" show-sizer @on-change='changeCurrent' @on-page-size-change='changePageSize'  show-total  transfer/>
    </div>
  </div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import {getProjectState,projectStateArray,projectTypeArray} from 'utils/common.js';
import { FormItem, Form, Select, Option, Input, DatePicker, Icon,Page } from 'iview';
import {getAllMyProjectListApi} from 'api/myproject'
export default {
  components: {
    FormItem,
    Form,Page,
    Select,
    Option,
    Input,
    DatePicker,
    Icon,
    ProGress
  },
  data() {
    return {
      page:{
        current:1,
        pageSize:10,
        page:1
      },
      formInline: {
        originator: "",
        proName: "",
        createDateStart: "",
        createDateEnd: "",
        proState: "",
        proType: "",
        current:1,
        pageSize:10
      },
      prjectColumns: [
        {
          title: "项目名称",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: params.row.overdueDays ? "" : "md-bookmark"
                },
                style: {
                  marginRight: "10px",
                  fontSize: "18px"
                },
                class: {
                  warning: true,
                  warningIcon: true
                }
              }),
              h(
                "span",
                {
                  class: {
                    primary: true
                  }
                },
                params.row.proName
              )
            ]);
          }
        },
        {
          title: "上线时间",
          align: "center",
          key: "planSDate"
        },
        {
          title: "项目状态",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  error: params.row.proState == 7||params.row.proState == 8
                }
              },
              getProjectState(params.row.proState)
            );
          }
        },
        {
          title: "任务数进度",
          align: "center",
          render:function(h,params){
            return h('div',{},params.row.finishTaskNum+' / '+params.row.allTaskNum)
          }
        },
        {
          title: "项目进度（实际进度/预期进度）",
          align: "center",
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
          title: "发起人",
          align: "center",
          key: "creater"
        }
      ],
      projectList: [
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
        },
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
  computed:{
    projectStateArray(){
      return projectStateArray
    },
    projectTypeArray(){
      return projectTypeArray
    }
  },
  mounted(){
    this.getAllMyProjectListData();
    console.log(getProjectState(1),projectStateArray)
  
  },
  methods: {
    getAllMyProjectListData(){
      getAllMyProjectListApi(this.formInline).then(res=>{
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
      this.formInline.createDateStart = time[0];
      this.formInline.createDateEnd = time[1];
    },
    handleSubmit(name) {
      console.log(this.formInline)
      this.getAllMyProjectListData();
    },
    changeCurrent(current){
      this.formInline.current=current;
      this.getAllMyProjectListData();
    },
    changePageSize(pageSize){
      this.formInline.pageSize=pageSize;
      this.getAllMyProjectListData();
    },
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 10px 0;
}
</style>


