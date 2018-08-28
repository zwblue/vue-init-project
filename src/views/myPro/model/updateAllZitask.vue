<template>
<div class="page">
  <Modal v-model="model.updateZitask" title="更新子任务" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="100">
      <FormItem label="子任务：" prop="subtaskId">
        <Select v-model="partInData.subtaskId" placeholder='请选择子任务'>
          <Option v-for="item in ziTaskList" :value="item.taskid+','+item.subtaskid" :key="item.subtaskid">{{ item.subtaskname }}</Option>
        </Select>
      </FormItem>
      <FormItem label="日志类型：">
        <Select value="4" placeholder="请选择日志类型">
            <Option value="4">更新</Option>
          </Select>
      </FormItem>
      <FormItem prop="subtaskProgress" label="项目进度：">
        <InputNumber :max="100" :min="0" v-model="partInData.subtaskProgress"></InputNumber>
      </FormItem>
      <FormItem prop="remark" label="备注：">
        <Input type="textarea" :rows="3" placeholder="请输入内容" v-model="partInData.remark"></Input>
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
import {
  updSubtaskProgressApi,getUpdSubtaskSelect
} from 'api/myproject.js'
import {
  Input,
  Select,
  Option,
  Modal,
  Form,
  FormItem,
  InputNumber
} from 'iview'
export default {
  components: {
    Input,
    Select,
    Option,
    Modal,
    Form,
    FormItem,
    InputNumber
  },
  props: {
    zitaskDetails: {
      type: Object,
      default: () => {
        return {};
      }
    },
    model: {
      type: Object,
      default: function() {
        return {
          updateZitask: false
        };
      }
    }
  },
  data() {
    return {
      ziTaskList: [],
      partInData: {
        subtaskId: '',
        taskId: '',
        proId: '',
        subtaskProgress: 0,
        remark: ''
      },
      partrules: {
        remark: [{
          required: true,
          type: "string",
          message: "请输入备注",
          trigger: "blur"
        }],
        subtaskId:[{
          required: true,
          type:"string",
          message: "请选择某个子任务",
          trigger:'change'

        }],
        subtaskProgress: [{
          required: true,
          type: "number",
          trigger: "blur"
        }]
      }
    }
  },
  mounted() {
    this.getUpdSubtaskSelect();
  },
  methods: {
    getUpdSubtaskSelect() {
      getUpdSubtaskSelect({
        proId: this.$route.params.id
      }).then(res => {
        if (res.data.code === 200) {
          if(res.data.data.length){
            this.ziTaskList = res.data.data;
          }else{
            // this.$Message.error('没有你可操作的子任务！')
            this.ziTaskList = [];
          }
        }
      }).catch(error => {
      })
    },
    sureSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.partInData.proId = this.$route.params.id;
          this.partInData.taskId = this.partInData.subtaskId.split(',')[0];
          this.partInData.subtaskId = this.partInData.subtaskId.split(',')[1];
          updSubtaskProgressApi(this.partInData).then(
            res => {
              if (res.data.code === 200) {
                this.$emit('getTaskListByProIdData');
                this.$emit('openProject');
                this.$Message.success(res.data.msg)
                this.model.updateZitask = !this.model.updateZitask;
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
      this.model.updateZitask = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.page {}
</style>
