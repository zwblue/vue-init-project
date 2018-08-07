<template>
<div class="page">
  <Modal v-model="model.applydept" title="添加参与部门" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="110">
      <FormItem prop="SquadName" label="参与部门：">
        <Cascader :data="deptList" v-model="selectDept" filterable></Cascader>
      </FormItem>
      <FormItem prop="sdate" label="开始时间：">
        <DatePicker type="datetime" :options="addStartPartOptions" @on-change="sdateChange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间"></DatePicker>
      </FormItem>
      <FormItem prop="edate" label="结束时间：">
        <DatePicker type="datetime" :options="addEtartPartOptions" :disabled="edateshow" @on-change="edateChange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间"></DatePicker>
      </FormItem>
      <FormItem label="总工时(天)：" prop="workDate">
        <Input v-model="partInData.workDate" disabled style='width:50px'></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="submitClick('partInData')" :loading="modalloading">提交</Button>
      <Button type="default" @click="cancel('partInData')">取消</Button>
    </div>
  </Modal>
</div>
</template>
<script>
import {
  getAllDepartmentInfoApi
} from 'api/dept.js'
import {
  newGroupHandleApi
} from 'api/myproject.js'
import {
  Input,
  Cascader,
  Modal,
  Form,
  FormItem,
  DatePicker
} from 'iview'
export default {
  name: 'ApplyDept',
  props: {
    applyData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    model: {
      type: Object,
      default: function() {
        return {
          applydept: false
        }
      }
    },
    groupData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    Input,
    Cascader,
    Modal,
    Form,
    FormItem,
    DatePicker
  },
  watch: {
    // 部门的变化
    selectDept(newval, val) {
      let str = newval[newval.length - 1];
      let index = str.indexOf('-');
      this.partInData.squadId = str.slice(0, index);
      this.partInData.SquadName = str.slice(index + 1);
    }
  },
  computed: {
    edateshow() {
      return this.partInData.sdate ? false : true
    }
  },
  data() {
    return {
      modalloading: false,
      partInData: {
        squadId: '',
        SquadName: '',
        sdate: "",
        edate: "",
        workDate: 0
      },
      selectDept: [],
      deptList: [],
      partrules: {
        SquadName: [{
          required: true,
          type: 'string',
          message: "请选择参与部门",
          trigger: "change"
        }],
        sdate: [{
          required: true,
          type: "string",
          message: "请填开始时间",
          trigger: "blur"
        }],
        edate: [{
          required: true,
          type: "string",
          message: "请填结束时间",
          trigger: "blur"
        }],
        workDate: [{
          required: true,
          message: "请填写总工时",
          trigger: "change"
        }]
      },
      addStartPartOptions: {
        disabledDate: (date) => {
          const sdate = new Date(this.applyData.planSDate);
          return date && date.valueOf() > sdate.getTime() || date.valueOf() < Date.now() - 86400000;
        }
      },
      addEtartPartOptions: {
        disabledDate: (date) => {
          const partsdate = new Date(this.partInData.sdate);
          const plansdate = new Date(this.applyData.planSDate);
          return (
            (date && date.valueOf() < partsdate.getTime() - 86399999) ||
            (date && date.valueOf() > plansdate.getTime() - 1)
          )
        }
      },
    }
  },

  mounted() {
    this.deptList = [{
      value: 'beijing',
      label: '北京',
      children: [{
          value: 'gugong',
          label: '故宫'
        },
        {
          value: 'tiantan',
          label: '天坛'
        },
        {
          value: 'wangfujing',
          label: '王府井'
        }
      ]
    }, {
      value: '30-jiangsu',
      label: '江苏',
      children: [{
          value: '11-nanjing',
          label: '南京',
          children: [{
            value: '23-fuzimiao',
            label: '夫子庙',
          }]
        },
        {
          value: '22-suzhou',
          label: '苏州',
          children: [{
              value: '18-zhuozhengyuan',
              label: '拙政园',
            },
            {
              value: '87-shizilin',
              label: '狮子林',
            }
          ]
        }
      ],
    }]
    this.initDept();
  },
  methods: {
    submitClick(name) {
      console.log(this.partInData, this.selectDept)
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.partInData.sdate === this.partInData.edate) {
            this.$Message.error('开始时间不能与结束时间相同');
            return;
          }
          // let data=this.partInData.concat();
          this.groupData.push(this.partInData);
          this.model.applydept = !this.model.applydept;
          this.$Message.success('添加参与组成功！')
        } else {
          this.$Message.error('表单验证失败！')
        }
      });
    },
    cancel(name) {
      this.$refs[name].resetFields();
    },
    initDept() {
      getAllDepartmentInfoApi().then(
        res => {
          console.log(res.data.data)
          if (res.data.code === 200) {
            this.deptList = res.data.data;
          } else {
            this.$Message.error(res.data.msg)
          }
        }
      ).catch(err => {
        this.$Message.error('/getAllDepartmentInfo-接口异常')
      })
    },
    sdateChange(val) {
      // 工作日期的变化
      this.partInData.sdate = val;
      if (this.partInData.edate && this.partInData.sdate) {
        this.partInData.workDate = (new Date(this.partInData.edate).getTime() - new Date(this.partInData.sdate).getTime()) / (24 * 60 * 60 * 1000);
        this.partInData.workDate = this.partInData.workDate.toFixed(1)
      }
    },
    edateChange(val) {
      // 工作日期的变化
      this.partInData.edate = val;
      if (this.partInData.edate && this.partInData.sdate) {
        this.partInData.workDate = (new Date(this.partInData.edate).getTime() - new Date(this.partInData.sdate).getTime()) / (24 * 60 * 60 * 1000);
        this.partInData.workDate = this.partInData.workDate.toFixed(1)
      }
    },
    replayUploadBefore() {
      this.formValidate.fileName = "";
      this.$refs.upload.clearFiles();
    }
  },
}
</script>

<style lang="scss" scoped>
.page {}
</style>
