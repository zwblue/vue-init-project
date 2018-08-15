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
    <Table border class="my-table" :columns="prjectColumns" size='default' @on-row-click='gotoDetails' :data="projectList">
    </Table>
    <div class="clearfix" :style='{marginTop:"20px"}'>
      <Page class="rt" :current='page.current' :pageSize='page.pageSize'  :total="page.total" show-sizer @on-change='changeCurrent' @on-page-size-change='changePageSize'  show-total  transfer/>
    </div>
  </div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
import {getProjectState,projectStateArray,projectTypeArray,getProjectType} from 'utils/common.js';
import { FormItem, Form, Select, Option, Input, DatePicker, Icon,Page } from 'iview';
import {newSelectRecPro} from 'api/myproject'
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
                  type: params.row.overdueDays===null ? "md-bookmark" : "" 
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
          title: "创建时间",
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
          title: "项目类型",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              getProjectType(params.row.proType)
            );
          }
        },
        {
          title: "创建人",
          align: "center",
          key: "creater"
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
    this.getAllMyProjectListData();
  },
  methods: {
    gotoDetails(row){
      console.log(row);
      this.$router.push('proDetails/'+row.proId)
    },
    getAllMyProjectListData(){
      newSelectRecPro(this.formInline).then(res=>{
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


