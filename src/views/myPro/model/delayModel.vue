
<template>
<div class="page">
  <!-- 延期申请model -->
  <Modal v-model="model.delay" title="延期申请" @on-ok="sureSubmit('deferApplyParams')">
    <Form :model="deferApplyParams" label-position="left" :label-width="100" ref="deferApplyParams" :rules="deferApplyRules">
      <FormItem label="延期上线时间" prop="delayDate">
        <DatePicker type="datetime" :options="deferOptions" @on-change='selDeferApplyTime' placeholder="选择日期" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="延期原因" prop="reason">
        <Input type="textarea" :rows="5" :maxlength="255" placeholder="请输入项目延期原因" v-model="deferApplyParams.reason"></Input>
      </FormItem>
       <FormItem label="上传附件" >
        <Upload ref="upload" :on-remove='removeFilePath' :on-success='uploadSuccess' :action="uploadUrl" :before-upload='beforeUploadClick' :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :format="['doc','docx','txt','png','PNG','jpg','JPG','jpeg','JPEG','xls','xlsx','pdf','zip','rar']">
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        <span>{{deferApplyParams.filePath}}</span>
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
        type:'2',
        reason: '',
        filePath: ''
      },
      deferApplyRules: {
        delayDate: [{
          required: true,
          message: "请填写延期时间",
          trigger: "change"
        }],
        reason: [{
          required: true,
          message: "请填写延期原因",
          trigger: "change"
        }],
      },
      deferOptions: {
        disabledDate: (date) => {
          let projectOnlinsDate = new Date(this.projectDetails.planSDate);
          return date && date.valueOf() < projectOnlinsDate.getTime()||date.valueOf()<new Date();
        }
      }
    }
  },
  methods: {
    removeFilePath() {
      this.formValidate.filePath = '';
    },
      //上传附件
    uploadSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.deferApplyParams.filePath = res.data.uploadPath;
        this.$Message.success(res.msg)
      } else {
        this.$Message.error(res.msg)
      }
    },
    beforeUploadClick() {
      if (this.formValidate.filePath) {
        this.$Message.warning({
          content: '只能上传一个文件，请删除你之前上传的文件',
          duration: 3
        })
        return false;
      }
    },handleFormatError(file) {
      this.$Message.error({
        content: file.name + '：此文件格式出错',
        duration: 3
      })
    },
    handleMaxSize(file) {
      this.$Message.error({
        content: file.name + '：此文件大小不能超过2M',
        duration: 3
      })
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
              this.$emit('openProject')
              this.$Message.success(res.data.msg);
              this.model.delay = false;
              this.deferLoading = false;
            }else{
              this.$Message.success(res.data.msg);
              this.model.delay = false;
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
