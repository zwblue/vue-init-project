
<template>
<div class="page">
  <!-- 延期申请model -->
  <Modal v-model="model.delay" title="延期申请" @on-ok="sureSubmit('deferApplyParams')">
    <Form :model="deferApplyParams" label-position="left" :label-width="100" ref="deferApplyParams" :rules="deferApplyRules">
      <FormItem label="延期上线时间" prop="delayDate">
        <DatePicker type="datetime" :options="deferOptions" @on-change='selDeferApplyTime' placeholder="选择日期" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="延期原因" prop="delayExplain">
        <Input type="textarea" :rows="5" :maxlength="255" placeholder="请输入项目延期原因" v-model="deferApplyParams.delayExplain"></Input>
      </FormItem>
      <FormItem label-position="right">
        <Upload :action="uploadUrl" :on-success="addApprovalSuccess">
          <Button ghost icon="ios-cloud-upload-outline" type='primary'>上传附件</Button>
        </Upload>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading='deferLoading' type="primary" @click="sureSubmit('deferApplyParams')">{{deferLoading?'延期申请中...':'提交'}}</Button>
      <Button type="default" @click="cancel('deferApplyParams')">取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import {
  getUploadUrl
} from 'utils/geturl.js'
import {
  updApplyHandleByProApi
} from 'api/myproject.js'
import {
  DatePicker,
  FormItem,
  Form,
  Modal,
  Upload
} from 'iview'
export default {
  components: {
    DatePicker,
    FormItem,
    Form,
    Modal,
    Upload
  },
  props: {
    model: {
      type: Object,
      default: function() {
        return {
          delay: false
        };
      }
    },
    projectDetails: {
      type: Object,
      default: function() {
        return {
          delay: false
        };
      }
    }
  },
  computed: {
    uploadUrl() {
      return getUploadUrl();
    }
  },
  data() {
    return {
      deferLoading: false,
      deferApplyParams: {
        proId: this.$route.params.id,
        delayDate: '',
        delayExplain: '',
        delayFilePath: ''
      },
      deferApplyRules: {
        delayDate: [{
          required: true,
          message: "请填写延期时间",
          trigger: "change"
        }],
        delayExplain: [{
          required: true,
          message: "请填写延期原因",
          trigger: "change"
        }],
      },
      deferOptions: {
        disabledDate: (date) => {
          let projectOnlinsDate = new Date(this.projectDetails.planSDate);
          return date && date.valueOf() < projectOnlinsDate.getTime();
        }
      }
    }
  },
  methods: {
    addApprovalSuccess(response, file) {
      //上传附件
      if (response.code == 200) {
        this.deferApplyParams.delayFilePath = response.data.uploadPath;
      } else {
        this.$Message.error("上传失败，请重新上传");
      }
    },
    selDeferApplyTime(time) {
      if (time) {
        this.deferApplyParams.delayDate = time;
      }
    },
    cancel() {
      this.$Message.error("你取消了此操作");
      this.model.delay = false;
    },
    sureSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.deferLoading = true;
          updApplyHandleByProApi(this.deferApplyParams).then(res => {
            if (res.data.code == 200) {
              this.$Message.success('已成功提交延期申请！');
              this.model.delay = false;
              this.deferLoading = false;
            }
          }).catch(error => {
            this.$Message.error('网络故障，请重试！')
            this.deferLoading = false;
          })
        } else {
          this.deferLoading = false;
          this.$Message.error("表单验证失败，请填写完整的信息！");
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
