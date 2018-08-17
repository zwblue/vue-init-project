
<template>
<div class="page">
  <!-- 提交上线审批MODAL -->
  <Modal v-model="model.online" title="上线审批">
    <Form :model="onlineParams" ref="onlineParams" :rules="onlineRules" label-position="left" :label-width="100">
      <FormItem label="上线审批" :label-width="80" prop="reason" v-if='projectDetails.proState!=7'>
        <Input type="textarea" :rows="4" placeholder="请输入上线意见.." v-model="onlineParams.reason"></Input>
      </FormItem>
      <FormItem label="逾期上线(必填)" :label-width="100" v-if='projectDetails.proState==7' prop="reason">
        <Input type="textarea" :rows="4" :maxlength="255" placeholder="请输入逾期上线原因" v-model="onlineParams.reason"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="default" @click="cancel('deferApplyParams')">取消</Button>
      <Button type="primary" @click="onlineSubmit('onlineParams')">确定</Button>
    </div>
  </Modal>
</div>
</template>
<script>
import {
  getUploadUrl
} from 'utils/geturl.js'
import {
  Upload,
  FormItem,
  Form,
  Modal,
  Input
} from 'iview'
import {
  updApplyHandleByProApi
} from 'api/myproject'
export default {
  components: {
    Upload,
    FormItem,
    Form,
    Modal,
    Input
  },
  props: {
    model: {
      type: Object,
      default: function() {
        return {
          online: false
        };
      }
    },
    projectDetails: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data() {
    return {
      onlineParams: {
        proId: this.$route.params.id,
        type: '1',
        reason: "", //提交审批
      },
      onlineRules: {
        reason: [{
          required: true,
          message: "原因是必须的",
          trigger: "blur"
        }],
      }
    }
  },
  computed: {
    uploadUrl() {
      return getUploadUrl();
    }
  },
  methods: {
    onlineSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          updApplyHandleByProApi(this.onlineParams)
            .then(res => {
              const data = res.data;
              if (data.code == 200) {
                this.$emit('openProject')
                this.$Message.success(data.msg);
                this.model.online = false;
              } else {
                this.$Message.error(data.msg);
                this.model.online = false;
              }
            })
            .catch(err => {
              this.$Message.error("系统异常！");
            });
        } else {
          if (this.projectDetails.proState == 7) {
            this.$Message.error("请输入逾期上线原因");
          } else {
            this.$Message.error("请输入上线意见");
          }
        }
      })
    },
    cancel() {
      this.$Message.info('你取消了此操作');
      this.model.online = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
