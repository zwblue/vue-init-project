<template>
<div>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Row>
      <Col span="24">
      <div class="primary apply-title">基本信息</div>
      <FormItem label="项目名称" prop="proName">
        <Input v-model="formValidate.proName" placeholder="请输入项目名称（最多50字）"></Input>
      </FormItem>
      <FormItem label="项目类型" prop="proType">
        <RadioGroup v-model="formValidate.proType">
          <Radio label="1">产品</Radio>
          <Radio label="2">活动</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="上线时间" prop="planSDate">
        <DatePicker type="datetime" placeholder="选择上线时间" :options="sdateOptions" @on-change='changeSdate'></DatePicker>
      </FormItem>
      <FormItem label="下线时间" prop="planEDate" v-show='ifActivity'>
        <DatePicker type="datetime" placeholder="选择下线时间" @on-change='changeEdate' :options="edateOptions"></DatePicker>
      </FormItem>
      <FormItem label="项目概况" prop="proDeclare">
        <Input v-model="formValidate.proDeclare" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入项目概况"></Input>
      </FormItem>
      <FormItem label="上传附件" style="width:500px;">
        <Upload ref="upload" :on-remove='removeFilePath' :on-success='uploadSuccess' :action="uploadUrl" :before-upload='beforeUploadClick' :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :format="['doc','docx','txt','png','PNG','jpg','JPG','jpeg','JPEG','xls','xlsx','pdf','zip','rar']">
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        <span>{{formValidate.fileName}}</span>
      </FormItem>
      <div class="primary apply-title">参与部门</div>
      <div class="apply-title">
        <Button type='primary' :disabled='ifCanAddDept' ghost long @click="applyDeptJoin">添加</Button>
      </div>
      <Table class="apply-title" no-data-text='暂无参与部门' border :columns="columns1" :data="deptGroupList">
      </Table>
      <div class="apply-title">
        <Button type="primary" size='large' long @click="handleSubmit('formValidate')">提交</Button>
      </div>
      </Col>
    </Row>
  </Form>
  <apply-dept v-if='model.applydept'  :applyData='formValidate' :model='model' :editIndex='activeIndex' :groupData='deptGroupList'></apply-dept>
</div>
</template>
<script>
import {
  getUploadUrl
} from 'utils/geturl.js'
import {
  newApplyProjectApi
} from 'api/myproject.js'

import ApplyDept from './model/applyDept.vue'
import {
  FormItem,
  Form,
  Radio,
  Input,
  DatePicker,
  RadioGroup,
  Card,
  Upload
} from 'iview';
export default {
  components: {
    FormItem,
    Form,
    Radio,
    Input,
    DatePicker,
    RadioGroup,
    Card,
    Upload,
    ApplyDept
  },
  computed: {
    uploadUrl() {
      return getUploadUrl();
    },
    // 是否是活动 活动显示下线时间
    ifActivity() {
      return this.formValidate.proType == 1 ? false : true
    },
    // 是否能添加部门了 没选择上线时间是不允许添加的
    ifCanAddDept() {
      if (this.formValidate.proType == 1) {
        return this.formValidate.planSDate ? false : true
      } else {
        return this.formValidate.planSDate && this.formValidate.planEDate ? false : true
      }
    }
  },
  data() {
    return {
      sdateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      edateOptions: {
        disabledDate: (date) => {
          if (this.formValidate.planSDate) {
            return date && date.valueOf() < new Date(this.formValidate.planSDate).getTime() - 86399999
          }
        }
      },
      model: {
        applydept: false
      },
      formValidate: {
        proName: "",
        proType: "1",
        planSDate: "",
        planEDate: "",
        filePath: '',
        proDeclare: "",
        myDomain: []
      },
      activeIndex:'',
      deptGroupList: [],
      columns1: [{
          title: "部门名称",
          align: "center",
          key: "SquadName"
        },
        {
          title: "开始时间",
          align: "center",
          key: "sdate"
        },
        {
          title: "结束时间",
          align: "center",
          key: "edate"
        },
        {
          title: "预期工期",
          align: "center",
          key: "workDate"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  }, 
                  on: {
                    click: () => {
                     this.editJoinDept(params.row)
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.deptGroupList.splice(params.index, 1)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      ruleValidate: {
        proName: [{
          required: true,
          message: "项目名称不能为空",
          trigger: "blur"
        }],
        planSDate: [{
          required: true,
          type: "string",
          message: "请输入项目开始时间",
          trigger: "blur"
        }],
        proType: [{
          required: true,
          message: "请选择项目类型",
          trigger: "change"
        }],

        proDeclare: [{
          required: true,
          message: "请输入项目概况",
          trigger: "blur"
        }]
      }
    }
  },
  methods: {
    editJoinDept(row){
      this.activeIndex=row._index;
      this.model.applydept=!this.model.applydept;
    },
    applyDeptJoin(){
      this.activeIndex='';
      this.model.applydept=!this.model.applydept
    },
    changeSdate(val) {
      this.formValidate.planSDate = val;
    },
    changeEdate(val) {
      this.formValidate.planEDate = val;
    },
    beforeUploadClick() {
      if (this.formValidate.filePath) {
        this.$Message.warning({
          content: '只能上传一个文件，请删除你之前上传的文件',
          duration: 3
        })
        return false;
      }
    },
    uploadSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.formValidate.filePath = res.data.uploadPath;
        this.$Message.success(res.msg)
      } else {
        this.$Message.error(res.msg)
      }
    },
    removeFilePath() {
      this.formValidate.filePath = '';
    },
    handleFormatError(file) {
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
    handleSubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formValidate.myDomain = JSON.stringify(this.deptGroupList)
          newApplyProjectApi(this.formValidate).then(
            res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                this.$router.push('/myPro')
              } else {
                this.$Message.warning(res.data.msg)
              }
            }
          ).catch(error => {
            this.$Message.error('接口故障--/newApplyProject')
          })
          console.log(this.formValidate)
        } else {
          this.$Message.error("表单验证失败");
        }
      });
    },

  }
};
</script>
<style lang="scss" scoped>
.apply-title {
  margin-bottom: 15px;
  margin-left: 15px;
  font-weight: bold;
}
</style>
