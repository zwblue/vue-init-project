
<template>
<div class="page">
  <!-- 提交上线审批MODAL -->
  <Modal v-model="model.online" title="上线审批" @on-ok="okApproval(formApprovalCustom)" @on-cancel="cancel">
    <Form :model="formApprovalCustom" label-position="left" :label-width="100">
      <FormItem label="上线审批" prop="explain">
        <Input type="textarea" :rows="4" placeholder="请输入上线意见.." v-model="formApprovalCustom.explain"></Input>
      </FormItem>
      <FormItem label="逾期上线(必填)" prop="overdueExplain">
        <Input type="textarea" :rows="4" :maxlength="255" placeholder="请输入逾期上线原因" v-model="formApprovalCustom.overdueExplain"></Input>
      </FormItem>
      <FormItem label-position="rightr">
        <Upload :action="uploadUrl" :on-success="addApprovalSuccess">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
        </Upload>
      </FormItem>

      </FormItem>
    </Form>
  </Modal>
</div>
</template>

<script>
export default {
  model: {
    type: Object,
    default: function() {
      return {
        online: false
      };
    }
  },
  data() {
    return {
      formApprovalCustom: {
        explain: "", //提交审批
        overdueExplain: "" //逾期提交审批
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
