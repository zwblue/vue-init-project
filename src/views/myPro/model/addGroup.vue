<template>
<div class="page">
  <Modal v-model="modelShow.addGroupShow" title="添加参与组" @on-cancel="cancel('partInParams')">
    <Form ref="partInParams" :model="partInParams" :rules="partInRules" :label-width="100">
      <FormItem prop="taskName" label="任务名称：">
        <Input placeholder="请输入任务名称" v-model="partInParams.taskName"></Input>
      </FormItem>
      <FormItem prop="SquadName" label="参与组：">
        <Cascader :data="deptData" @on-change="deptChange" :clearable="false" v-model="partInParams.SquadName"></Cascader>
        </Input>
      </FormItem>
      <FormItem prop="sdate" label="开始时间：">
        <DatePicker type="datetime" v-model="partInParams.sDate" @on-change="sdateChange" :options="dateStartOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间"></DatePicker>
      </FormItem>
      <FormItem prop="edate" label="结束时间：">
        <DatePicker type="datetime" v-model="partInParams.eDate" @on-change="edateChange" :options="dateEndOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间"></DatePicker>
      </FormItem>
      <FormItem label="总工时(天)：" prop="workDate">
        <InputNumber v-model="partInParams.workDate" :min="0" placeholder="请手动计算工时"></InputNumber>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="sureSubmit('partInParams')">提交</Button>
      <Button type="default" @click="cancel('partInParams')">取消</Button>
    </div>
  </Modal>

</div>
</template>

<script>
import {
  DatePicker,
  FormItem,
  Cascader,
  Modal,
  Form,
  InputNumber,
  Input
} from 'iview'
import {
  getAllDepartmentInfoApi
} from 'api/dept.js'
export default {
  props: {
    modelShow: {
      type: Object,
      default:function(){
        return {
          addGroupShow: false
        }
      }
    },
    proDetails: {
      type: Object,
      default:function(){
        return {
          
        }
      }
    }
  },
  components: {
    DatePicker,
    FormItem,
    Cascader,
    Modal,
    Form,
    InputNumber,
    Input
  },
  data() {
    return {
      deptData: [],
      partInParams: {
        taskName: '',
        proId: this.$route.query.proId,
        type: 0,
        sDate: "",
        eDate: "",
        handler: sessionStorage.getItem("userName"),
        squadId: "",
        workDate: 0,
        idd: 0,
        taskId: 0
      },
      partInRules: {
        taskName: [{
          required: true,
          message: "请填写任务名称",
          trigger: "blur"
        }],
        SquadName: [{
          required: true,
          type: "array",
          message: "请填写参与部门",
          trigger: "change"
        }],
        sdate: [{
          required: true,
          type: "date",
          message: "请填开始时间",
          trigger: "change"
        }],
        edate: [{
          required: true,
          type: "date",
          message: "请填结束时间",
          trigger: "change"
        }],
        workDate: [{
          required: true,
          type: "number",
          message: "请填写总工时",
          trigger: "change"
        }]
      },
      dateStartOptions: {
        disabledDate:(date)=>{
          let projectOnlinsDate = new Date(this.proDetails.planSDate);
          let projectOnlineDate = new Date(this.proDetails.planEdate);
          const protype = this.proDetails.proType;
          if (protype == "1") {
            return date && date.valueOf() > projectOnlinsDate.getTime();
          } else {
            return date && date.valueOf() > projectOnlineDate.getTime();
          }
        }
      },
      dateEndOptions: {
        disabledDate:(date)=> {
          let projectOnlinsDate = new Date(this.proDetails.plansdate);
          let projectOnlineDate = new Date(this.proDetails.planedate);
          let partinsDate = new Date(this.partInParams.sDate);
          const protype = this.proDetails.proType;
          if (protype == "1") {
            return (
              (date && date.valueOf() < partinsDate.getTime() - 86399999) ||
              (date && date.valueOf() > projectOnlinsDate.getTime())
            );
          } else {
            return (
              (date && date.valueOf() < partinsDate.getTime() - 86399999) ||
              (date && date.valueOf() > projectOnlineDate.getTime())
            );
          }
        }
      }
    }
  },
  mounted() {
    this.getAllDepartmentInfoData();
  },
  methods: {
    edateChange(date) {
      this.partInParams.eDate = date;
    },
    sdateChange(date) {
      this.partInParams.sDate = date;
    },
    deptChange(value, selectedData) {
      this.partInParams.squadId = value[value.length - 1];
      this.initCreaterData();
    },
    getAllDepartmentInfoData() {
      getAllDepartmentInfoApi().then(res => {
        console.log('部门信息', res)
        this.deptData = res.data.data;
      });
    },
    cancel(name = '') {
      if (name) {
        this.$refs[name].resetFields();
      }
    },


  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
