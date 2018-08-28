<template>
<div class="page">
  <Modal v-model="model.applydept" title="添加参与部门" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="110">
      <FormItem prop="squadId" label="参与部门：">
        <query-dept :deptId.sync='partInData.squadId'></query-dept>
      </FormItem>
      <FormItem prop="sDate" label="开始时间：">
        <date-time selectType='start' :value='partInData.sdate' :maxTime='proDetails.planSDate' :options="addStartPartOptions" @changeDate='sDateChange'></date-time>
      </FormItem>
      <FormItem prop="eDate" label="结束时间：">
        <date-time selectType='end' :value='partInData.edate' :minTime='partInData.sdate' :maxTime='proDetails.planSDate' :options="addEtartPartOptions" @changeDate='eDateChange' :eDateshow='eDateshow'></date-time>
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
    DateTime
  },
  computed: {
    timeStepArray() {
      return timeSteps
    },
    eDateshow() {
      return this.partInData.sDate ? false : true;
    }
  },
  data() {
    return {
      modalloading: false,
      partInData: {
        proId: this.proDetails.proId,
        type: '1',
        squadId: "",
        sDate: "",
        idd: 0,
        eDate: "",
        workDate: 0,
        taskId: ''
      },
      selectDept: [],
      deptList: [],
      partrules: {
        squadId: [{
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
            return ( 
              (date && date.valueOf() < partsDate.getTime() - 86399999) ||
            (date && date.valueOf() > plansDate.getTime() - 1))
          }
        }
      }
    };
  },

  mounted() {
    this.getWordDate();
  },
  methods: {
    submitClick(name) {
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
                this.$emit('addJoinDept')
                console.log('刷新task列表')
                this.model.applydept = !this.model.applydept;
              }
            }
          ).catch(error => {
            this.model.applydept = !this.model.applydept;
            this.$Message.error('接口故障：/newGroupHandle')
          })
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    },
    cancel(name) {
      this.model.applydept = false;
      this.$refs[name].resetFields();
    },
    getWordDate() {
      if (this.partInData.eDate && this.partInData.sDate) {
        this.partInData.workDate =
          (new Date(this.partInData.eDate).getTime() -
            new Date(this.partInData.sDate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = spliceWeekDay(this.partInData.sDate, this.partInData.workDate)
      }
    },
    sDateChange(val) {
      // 工作日期的变化
      this.partInData.sDate = val;
      this.getWordDate();
    },
    eDateChange(val) {
      // 工作日期的变化
      this.partInData.eDate = val;
      this.getWordDate();
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
