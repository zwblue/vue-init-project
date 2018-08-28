<template>
<div class="page">
  <Modal v-model="model.applydept" title="添加参与部门" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="110">
      <FormItem prop="SquadName" label="参与部门：">
        <query-dept :deptId.sync='partInData.squadId' v-if='ifLoadDept' :deptName.sync='partInData.SquadName' :deptArray='deptArray'></query-dept>
      </FormItem>
      <FormItem prop="sdate" label="开始时间：">
        <date-time selectType='start' :value='partInData.sdate'  :maxTime='applyData.planSDate' :options="addStartPartOptions" @changeDate='sdateChange'></date-time>
      </FormItem>
      <FormItem prop="edate" label="结束时间：">
        <date-time selectType='end' :value='partInData.edate'  :minTime='partInData.sdate' :maxTime='applyData.planSDate'   :options="addEtartPartOptions" @changeDate='edateChange' :eDateshow='edateshow'></date-time>
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
import dateTime from 'components/dateTime/dateTime.vue'
import QueryDept from 'components/queryDept/queryDept.vue'
import {
  spliceWeekDay,
} from 'utils/common.js'
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
    applyData: {
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
    },
    groupData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    editIndex: {
      type: [String, Number],
      default: ''
    }
  },
  components: {
    QueryDept,
    Input,
    Cascader,
    Modal,
    Form,
    FormItem,
    DatePicker,dateTime
  },
  computed: {
    edateshow() {
      return this.partInData.sdate ? false : true;
    },
    timeStepArray() {
      return timeSteps
    },
  },
  data() {
    return {
      ifLoadDept: false,
      deptArray: {
        array: []
      },
      modalloading: false,
      partInData: {
        squadId: "",
        SquadName: "",
        sdate: "",
        edate: "",
        workDate: 0
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
          const sdate = new Date(this.applyData.planSDate);
          return (
            (date && date.valueOf() > sdate.getTime() - 1) ||
            date.valueOf() < Date.now() - 86400000
          );
        }
      },
      addEtartPartOptions: {
        disabledDate: date => {
          const partsdate = new Date(this.partInData.sdate);
          const plansdate = new Date(this.applyData.planSDate);
          return (
            (date && date.valueOf() < partsdate.getTime() - 86399999) ||
            (date && date.valueOf() > plansdate.getTime() - 1)
          );
        }
      }
    };
  },
  mounted() {
    this.initData();
    this.ifLoadDept = true;
  },
  methods: {
    initData() {
      if (this.editIndex || this.editIndex === 0) {
        this.partInData.squadId = this.groupData[this.editIndex].squadId
        this.partInData.SquadName = this.groupData[this.editIndex].SquadName
        this.partInData.sdate = this.groupData[this.editIndex].sdate
        this.partInData.edate = this.groupData[this.editIndex].edate
        this.partInData.workDate = this.groupData[this.editIndex].workDate
      }
      this.getWorkDate();
    },
    submitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.partInData.sdate === this.partInData.edate) {
            this.$Message.error("开始时间不能与结束时间相同");
            return;
          }
          if (this.editIndex || this.editIndex === 0) {
            this.groupData.splice(this.editIndex, 1, this.partInData);
          } else {
            this.groupData.push(this.partInData);
          }
          this.model.applydept = !this.model.applydept;
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    },
    cancel(name) {
      this.$refs[name].resetFields();
    },
    getWorkDate() {
      console.log(11111)
      if (this.partInData.edate && this.partInData.sdate) {
        this.partInData.workDate =
          (new Date(this.partInData.edate).getTime() -
            new Date(this.partInData.sdate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = spliceWeekDay(this.partInData.sdate, this.partInData.workDate)
      }
    },
    sdateChange(val) {
      // 工作日期的变化
      this.partInData.sdate = val;
      this.getWorkDate();
    },
    edateChange(val) {
      // 工作日期的变化
      this.partInData.edate = val;
      this.getWorkDate();
    },
    replayUploadBefore() {
      this.formValidate.fileName = "";
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
.page {}
</style>
