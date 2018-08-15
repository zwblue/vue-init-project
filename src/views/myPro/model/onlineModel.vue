
<template>
<div class="page">
  <!-- 提交上线审批MODAL -->
  <Modal v-model="model.online" title="上线审批" @on-ok="okApproval(formApprovalCustom)" @on-cancel="cancel">
    <Form :model="formApprovalCustom" label-position="left" :label-width="100">
      <FormItem label="上线审批" prop="explain" v-if='projectDetails.proState!=7'>
        <Input type="textarea" :rows="4" placeholder="请输入上线意见.." v-model="formApprovalCustom.explain"></Input>
      </FormItem>
      <FormItem label="逾期上线(必填)" v-if='projectDetails.proState==7' prop="overdueExplain">
        <Input type="textarea" :rows="4" :maxlength="255" placeholder="请输入逾期上线原因" v-model="formApprovalCustom.explain"></Input>
      </FormItem>
      <FormItem label-position="rightr">
        <Upload :action="uploadUrl" :on-success="addApprovalSuccess">
          <Button type="primary" ghost icon="ios-cloud-upload-outline">上传附件</Button>
        </Upload>
      </FormItem>
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
      formApprovalCustom: {
        proId: this.$route.params.id,
        type: '1',
        filePath: '',
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
    addApprovalSuccess(response, file) {
      //上传附件
      if (response.code == 200) {
        this.formApprovalCustom.filePath = response.data.uploadPath;
      } else {
        this.$Message.error("上传失败，请重新上传");
      }
    },
    okApproval(formApprovalCustom) {
      if (formApprovalCustom.reason !== "") {
        updApplyHandleByProApi(formApprovalCustom)
          .then(res => {
            const data = res.data;
            if (data.code == 200) {
              this.$Message.success(res.data.msg);
              this.$router.push({
                name: "我的项目"
              });
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
