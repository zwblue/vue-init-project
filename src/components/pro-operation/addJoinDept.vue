<template>
<div class="page">
  <Modal v-model="model.applydept" title="添加参与部门" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="110">
      <FormItem prop="SquadName" label="参与部门：">
        <query-dept :deptId.sync='partInData.squadId' :deptName.sync='partInData.SquadName' ></query-dept>
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
import QueryDept from 'components/queryDept/queryDept.vue'
import {newGroupHandleApi} from 'api/myproject.js'
import {
  Input,
  Cascader,
  Modal,
  Form,
  FormItem,
  DatePicker
} from 'iview';
export default {
  name: "ApplyDept",
  props: {
    proDetails: {
      type: Object,
      default: () => {
        return {};
      }
    },
    model: {
      type: Object,
      default: function() {
        return {
          applydept: false
        };
      }
    }
  },
  components: {
    QueryDept,
    Input,
    Cascader,
    Modal,
    Form,
    FormItem,
    DatePicker
  },
  computed: {
    edateshow() {
      return this.partInData.sdate ? false : true;
    }
  },
  data() {
    return {
      modalloading: false,
      partInData: {
        proId:this.proDetails.proId,
        type:'1',
        squadId: "",
        SquadName: "",
        sDate: "",
        idd:0,
        eDate: "",
        workDate: 0,
        taskId:''
      },
      selectDept: [],
      deptList: [],
      partrules: {
        SquadName: [{
          required: true,
          type: "string",
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
        disabledDate: date => {
          const sdate = new Date(this.proDetails.planSDate);
          return (
            (date && date.valueOf() > sdate.getTime()-1) ||
            date.valueOf() < Date.now() - 86400000
          );
        }
      },
      addEtartPartOptions: {
        disabledDate: date => {
          const partsdate = new Date(this.partInData.sdate);
          const plansdate = new Date(this.proDetails.planSDate);
          return (
            (date && date.valueOf() < partsdate.getTime() - 86399999) ||
            (date && date.valueOf() > plansdate.getTime() - 1)
          );
        }
      }
    };
  },

  mounted() {
  },
  methods: {
    submitClick(name) {
      console.log(this.partInData, this.selectDept);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.partInData.sdate === this.partInData.edate) {
            this.$Message.error("开始时间不能与结束时间相同");
            return;
          }
          newGroupHandleApi(this.partInData).then(
            res=>{
              if(res.data.code===200){
                  this.$Message.success(res.data.msg);
                  this.$emit('getTaskListByProIdData')
              }
            }
          ).catch(error=>{
            this.$Message.error('接口故障：/newGroupHandle')
          })
          this.model.applydept = !this.model.applydept;
          this.$Message.success("添加参与组成功！");
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    },
    cancel(name) {
      this.model.applydept=false;
      this.$refs[name].resetFields();
    },
    sdateChange(val) {
      // 工作日期的变化
      this.partInData.sdate = val;
      if (this.partInData.edate && this.partInData.sdate) {
        this.partInData.workDate =
          (new Date(this.partInData.edate).getTime() -
            new Date(this.partInData.sdate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = this.partInData.workDate.toFixed(1);
      }
    },
    edateChange(val) {
      // 工作日期的变化
      this.partInData.edate = val;
      if (this.partInData.edate && this.partInData.sdate) {
        this.partInData.workDate =
          (new Date(this.partInData.edate).getTime() -
            new Date(this.partInData.sdate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = this.partInData.workDate.toFixed(1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
