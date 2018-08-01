<template>
  <div class="page">
    <Form ref="formInline" :model="formInline" inline :label-width='100'>
      <FormItem prop="originator" label="项目发起方">
        <Input type="text" v-model="formInline.originator" placeholder="请输入人名或部门名">
        </Input>
      </FormItem>
      <FormItem  label="项目发起时间">
        <DatePicker type="daterange" placement="bottom-end" @on-change='selectTime' split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem prop="proType" label="项目类型">
        <Select v-model="formInline.proType" style="width: 150px">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem prop="prostate" label="项目状态">
        <Select v-model="formInline.proState" style="width: 150px">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem prop="proName" label="项目名称">
        <Input type="text" v-model="formInline.proName" placeholder="请输入项目名称">
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Table border class="my-table" :columns="columns1" size='default' :data="data1">
    </Table>
    <div class="page-box clearfix">
      <Page class="rt" :total="100" show-sizer  show-total transfer/>
    </div>
  </div>
</template>
<script>
import ProGress from 'components/proGress/proGress';
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
      columns1: [
        {
          title: "项目名称",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: params.row.age >= 20 ? "" : "md-bookmark"
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
                params.row.name
              )
            ]);
          }
        },
        {
          title: "上线时间",
          align: "center",
          key: "age"
        },
        {
          title: "项目状态",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  error: params.row.age > 25
                }
              },
              this.dealWith(params.row.address)
            );
          }
        },
        {
          title: "任务数进度",
          align: "center",
          key: "age"
        },
        {
          title: "项目进度（实际进度/预期进度）",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h(ProGress, {
              props: {
                currentProgress: Number(params.row.currentjd),
                planProgress: Number(params.row.planjd)
              }
            });
          }
        },

        {
          title: "发起人",
          align: "center",
          key: "address"
        }
      ],
      data1: [
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
  mounted(){
    this.getAllMyProjectListData();
  },
  methods: {
    getAllMyProjectListData(){
      getAllMyProjectListApi().then(res=>{
        console.log(res);
      }).catch(
        error=>{
          this.$Message.error('接口故障（/getAllMyProjectList）')
        }
      )
    },
    dealWith(val) {
      switch (val) {
        case "1":
          return "上线待审批";
        case "2":
          return "逾期";
        case "3":
          return "延期待审批";
        case "4":
          return "开发中";
        case "5":
          return "立项待审批";
        default:
          return "其他";
      }
    },
    selectTime(time) {
      console.log(time);
      this.formInline.createDateStart = time[0];
      this.formInline.createDateEnd = time[1];
    },
    handleSubmit(name) {
      console.log("查询入参", this.formInline);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 10px 0;
}
</style>


