<template>
<div class="page">
  <Modal v-model="model.updateZitask" title="更新子任务" @on-cancel="cancel('partInData')">
    <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="100">
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
  updSubtaskProgressApi
} from 'api/myproject.js'
import {
  Input,
  Select,
  Option,
  Modal,
  Form,
  FormItem,InputNumber
} from 'iview'
export default {
  components: {
    Input,
    Select,
    Option,
    Modal,
    Form,
    FormItem,InputNumber
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
        subtaskProgress: [{
          required: true,
          type: "number",
          trigger: "blur"
        }]
      }
    }
  },
  mounted() {},
  methods: {
    sureSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.partInData.proId=this.zitaskDetails.proId;
          this.partInData.taskId=this.zitaskDetails.taskId;
          this.partInData.subtaskId=this.zitaskDetails.subtaskId;
          updSubtaskProgressApi(this.partInData).then(
            res => {
              if (res.data.code === 200) {
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
