<template>
<div class="page">
  <Modal v-model="model.addZitask" title="修改子任务" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="100">
      <FormItem prop="subtaskName" label="任务名称：">
        <Input placeholder="请输入任务名称" v-model="partInData.subtaskName"></Input>
      </FormItem>
      <FormItem prop="handler" label="处理人：">
        <Select v-model="partInData.handler" style="width:200px">
            <Option v-for="item in handleUserList" :value="item.UserName" :key="item.id">{{item.UserName}}</Option>
          </Select>
      </FormItem>
      <FormItem prop="sDate" label="开始时间：">
        <date-time selectType='start' :maxTime='taskDetails.eDate' :minTime='taskDetails.sDate' :value='partInData.sDate' :options="ziTaskdateStartOptions" @changeDate='sDateChange'></date-time>
      </FormItem>
      <FormItem prop="eDate" label="结束时间：">
        <date-time selectType='end'  :maxTime='taskDetails.eDate' :minTime='partInData.sDate' :value='partInData.eDate'  :options="ziTaskdateEndOptions" @changeDate='eDateChange' :eDateshow='edateshow'></date-time>
      </FormItem>
      <FormItem label="总工时(天)：" prop="workDate">
        <Input v-model="partInData.workDate" disabled style='width:50px'></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="sureSubmit('partInData')">提交</Button>
      <Button type="default" @click="cancel('partInData')">取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import DateTime from 'components/dateTime/dateTime.vue'
import {
  updSubtaskhandleApi,
  getMembersBySquadId
} from 'api/myproject.js'
import {
  spliceWeekDay,
} from 'utils/common.js'
import {
  Input,
  Select,
  Option,
  Modal,
  Form,
  FormItem
} from 'iview'
export default {
  components: {
    Input,
    Select,
    Option,
    Modal,
    Form,
    FormItem,
    DateTime
  },
  props: {
    taskDetails: {
      type: Object,
      default: () => {
        return {};
      }
    },
    model: {
      type: Object,
      default: function() {
        return {
          addZitask: false
        };
      }
    }
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
      partInData: {
        squadId: this.taskDetails.squadId,
        subtaskId: '',
        type: 1,
        taskId: this.taskDetails.taskId,
        handler: '',
        subtaskName: '',
        sDate: '',
        eDate: '',
        workDate: '',
      },
      handleUserList: [],
      partrules: {
        subtaskName: [{
          required: true,
          type: "string",
          message: "请填写任务名称",
          trigger: "blur"
        }],
        handler: [{
          required: true,
          type: "string",
          message: "请选择处理人",
          trigger: "change"
        }],
        sDate: [{
          required: true,
          message: "请填开始时间",
          trigger: "blur"
        }],
        eDate: [{
          required: true,
          message: "请填结束时间",
          trigger: "blur"
        }],
        workDate: [{
          required: true,
          message: "请填写总工时",
          trigger: "change"
        }]
      },
      ziTaskdateStartOptions: {
        disabledDate: date => {
          const sDate = new Date(this.taskDetails.sDate);
          const eDate = new Date(this.taskDetails.eDate);
          return (
            (date && date.valueOf() < sDate.getTime() - 86399999) || (date.valueOf() > eDate.getTime() - 1)
            // ||date.valueOf() < Date.now() - 86400000
          );
        }
      },
      ziTaskdateEndOptions: {
        disabledDate: date => {
          const partsDate = new Date(this.partInData.sDate);
          const eDate = new Date(this.taskDetails.eDate);
          return (
            (date && date.valueOf() < partsDate.getTime() - 86399999) ||
            (date && date.valueOf() > eDate.getTime() - 1)
            // ||date.valueOf() < Date.now() - 86400000
          );
        }
      }
    }
  },
  mounted() {
    this.getWorkDate();
    this.initZiProjectUserData();
  },
  methods: {
    sDateChange(val) {
      // 工作日期的变化
      this.partInData.sDate = val;
      this.getWorkDate();
    },
    eDateChange(val) {
      // 工作日期的变化
      this.partInData.eDate = val;
      this.getWorkDate();
    },
    getWorkDate() {
      if (this.partInData.eDate && this.partInData.sDate) {
        this.partInData.workDate =
          (new Date(this.partInData.eDate).getTime() -
            new Date(this.partInData.sDate).getTime()) /
          (24 * 60 * 60 * 1000);
        this.partInData.workDate = spliceWeekDay(this.partInData.sDate, this.partInData.workDate);
      }
    },
    sureSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          updSubtaskhandleApi(this.partInData).then(
            res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                this.$emit('resetAllZitaskList')
                this.model.addZitask = !this.model.addZitask;
              }
            }
          ).catch(error => {
            this.$Message.error('接口故障：/updSubtaskhandle')
          })
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    cancel(name = '') {
      this.$Message.info('你取消了此操作！')
      this.model.addZitask = false;
    },
    initZiProjectUserData() {
      const params = {
        squadId: this.taskDetails.squadId
      };
      getMembersBySquadId(params).then(res => {
        this.handleUserList = res.data.data;
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.page {}
</style>
