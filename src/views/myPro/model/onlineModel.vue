
<template>
<div class="page">
  <!-- 提交上线审批MODAL -->
  <Modal v-model="model.online" title="上线审批" @on-ok="onlineSubmit(onlineParams)" @on-cancel="cancel">
    <Form :model="onlineParams" label-position="left" :label-width="100" >
      <FormItem label="上线审批" prop="reason" v-if='projectDetails.proState!=7'>
        <Input type="textarea" :rows="4" placeholder="请输入上线意见.." v-model="onlineParams.reason"></Input>
      </FormItem>
      <FormItem label="逾期上线(必填)" v-if='projectDetails.proState==7' prop="reason">
        <Input type="textarea" :rows="4" :maxlength="255" placeholder="请输入逾期上线原因" v-model="onlineParams.reason"></Input>
      </FormItem>
    </Form>
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
      }
    }
  },
  computed: {
    uploadUrl() {
      return getUploadUrl();
    }
  },
  methods: {
    onlineSubmit() {
      if (this.onlineParams.reason !== "") {
        updApplyHandleByProApi(this.onlineParams)
          .then(res => {
            const data = res.data;
            if (data.code == 200) {
              this.$router.push('/myPro');
                this.$emit('openProject')
              this.model.online = false;
              this.$Message.success(res.data.msg);
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$Message.error("系统异常！");
          });
        this.$Modal.remove();
      } else {
        if(this.projectDetails.proState==7){
          this.$Message.error("请输入逾期上线原因");
        }else{
          this.$Message.error("请输入上线意见");
        }
        this.$Modal.remove();
      }
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
