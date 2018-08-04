<template>
  <Form ref="formValidate"
    :model="formValidate"
    :rules="ruleValidate"
    :label-width="80">
    <Row>
      <Col span="24">
      <div class="primary apply-title">基本信息</div>
      <FormItem label="项目信息"
        prop="name">
        <Input v-model="formValidate.name"
          placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="项目类型"
        prop="gender">
        <RadioGroup v-model="formValidate.gender">
          <Radio label="male">产品</Radio>
          <Radio label="female">活动</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="上线时间"
        prop="date">
        <DatePicker type="date"
          placeholder="Select date"
          v-model="formValidate.date"></DatePicker>
      </FormItem>
      <FormItem label="下线时间"
        prop="date">
        <DatePicker type="date"
          placeholder="Select date"
          v-model="formValidate.date"></DatePicker>
      </FormItem>
      <FormItem label="项目概况"
        prop="desc">
        <Input v-model="formValidate.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."></Input>
      </FormItem>

      <div class="primary apply-title">参与部门</div>
      <div class="apply-title">
        <Button type='primary'
          ghost>添加</Button>
      </div>
      <Table class="apply-title"
        no-data-text='暂无参与部门'
        border
        :columns="columns1"
        :data="data1">
      </Table>
      </Col>
      <FormItem>
        <Button type="primary"
          @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')"
          style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Row>
  </Form>
</template>
<script>
import {
  FormItem,
  Form,
  Radio,
  Input,
  DatePicker,
  RadioGroup,
  Card
} from 'iview';
export default {
  components: {
    FormItem,
    Form,
    Radio,
    Input,
    DatePicker,
    RadioGroup,
    Card
  },
  data() {
    return {
      formValidate: {
        name: "",
        gender: "",
        sdate: "",
        edate: "",
        desc: ""
      },
      columns1: [
        {
          title: "部门名称",
          align: "center",
          key: "name"
        },
        {
          title: "开始时间",
          align: "center",
          key: "age"
        },
        {
          title: "结束时间",
          align: "center",
          key: "address"
        },
        {
          title: "预期工期",
          align: "center",
          key: "address"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                { props: { type: "primary", size: "small" } },
                "修改"
              ),
              h(
                "Button",
                {
                  props: { type: "error", size: "small" },
                  style: {
                    marginLeft: "10px"
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],

        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.apply-title {
  margin-bottom: 15px;
  margin-left: 15px;
  font-weight: bold;
}
</style>
