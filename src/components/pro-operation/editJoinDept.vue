<template>
<div class="page">
  <Modal v-model="model.editTask" title="修改参与部门" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="110">
      <FormItem prop="SquadName" label="参与部门：">
        <query-dept :deptId.sync='partInData.squadId' :deptName.sync='partInData.SquadName'></query-dept>
      </FormItem>
      <FormItem prop="sDate" label="开始时间：">
        <date-time selectType='start' :maxTime='proDetails.planSDate' :value='partInData.sDate' :options="addStartPartOptions" @changeDate='sdateChange'></date-time>
      </FormItem>
      <FormItem prop="eDate" label="结束时间：">
        <date-time selectType='end' :maxTime='proDetails.planSDate' :minTime='partInData.sDate' :value='partInData.eDate' :options="addEtartPartOptions" @changeDate='edateChange' :eDateshow='edateshow'></date-time>
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
import DateTime from 'components/dateTime/dateTime.vue'
import QueryDept from 'components/queryDept/queryDept.vue'
import {
  newGroupHandleApi
} from 'api/myproject.js'
import {
  spliceWeekDay,
} from 'utils/common.js'
import {
  Input,
  Cascader,
  Modal,
  Form,
  FormItem
} from 'iview';
export default {
  props: {
    taskDetails: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
          editTask: false
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
    DateTime
  },
  computed: {
    timeStepArray() {
      return timeSteps
    },
    edateshow() {
      return this.partInData.sDate ? false : true;
    }
  },
  data() {
    return {
      modalloading: false,
      partInData: {
        proId: this.taskDetails.proId || '',
        type: '2',
        squadId: this.taskDetails.squadId,
        SquadName: '',
        sDate: this.taskDetails.sDate,
        idd: this.taskDetails.idd || '',
        eDate: this.taskDetails.eDate,
        workDate: this.taskDetails.workDate,
        taskId: this.taskDetails.taskId
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
        sDate: [{
          required: true,
          type: "string",
          message: "请填开始时间",
          trigger: "blur"
        }],
        eDate: [{
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
          let sDate = '';
          if (this.proDetails.delayDate) {
            sDate = new Date(this.proDetails.delayDate);
            return (
              (date && date.valueOf() > sDate.getTime() - 1) ||
              date.valueOf() < Date.now() - 86400000
            );
          } else {
            sDate = new Date(this.proDetails.planSDate);
            return (
              (date && date.valueOf() > sDate.getTime() - 1) ||
              date.valueOf() < Date.now() - 86400000
            );
          }
        }
      },
      addEtartPartOptions: {
        disabledDate: date => {
          const partsDate = new Date(this.partInData.sDate);
          const plansDate = new Date(this.proDetails.planSDate);
          const delaydate = new Date(this.proDetails.delayDate);
          if (this.proDetails.delayDate) {
            return (
              (date && date.valueOf() < partsDate.getTime() - 86399999) ||
              date && date.valueOf() > delaydate.getTime() - 1
            );
          } else {
            return ((date && date.valueOf() < partsDate.getTime() - 86399999) ||
              (date && date.valueOf() > plansDate.getTime() - 1))
          }
        }
      }
    };
  },
  mounted() {
    console.log('taskDetails', this.taskDetails);
    console.log('proDetails', this.proDetails);
  },
  methods: {
    submitClick(name) {
      console.log(this.partInData, this.selectDept);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.partInData.sDate === this.partInData.eDate) {
            this.$Message.error("开始时间不能与结束时间相同");
            return;
          }
          newGroupHandleApi(this.partInData).then(
            res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                this.$emit('editJoinDept');
                this.model.editTask = !this.model.editTask;
              } else {
                this.$Message.warning(res.data.msg);
              }
            }
          ).catch(error => {
            this.$Message.error('接口故障：/newGroupHandle')
          })
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    },
    cancel(name) {
      this.model.editTask = false;
      this.$refs[name].resetFields();
    },
    sdateChange(val) {
      // 工作日期的变化
      this.partInData.sDate = val;
      if (this.partInData.eDate && this.partInData.sDate) {
        this.partInData.workDate =
          (new Date(this.partInData.eDate).getTime() -
            new Date(this.partInData.sDate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = spliceWeekDay(this.partInData.sDate, this.partInData.workDate)
      }
    },
    edateChange(val) {
      // 工作日期的变化
      this.partInData.eDate = val;
      if (this.partInData.eDate && this.partInData.sDate) {
        this.partInData.workDate =
          (new Date(this.partInData.eDate).getTime() -
            new Date(this.partInData.sDate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = spliceWeekDay(this.partInData.sDate, this.partInData.workDate)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
