<template>
<div class="page">
  <Modal v-model="addUpdateViewShow" title="更新" @on-cancel="cancel('addDevLogList')">
    <Form ref="addDevLogList" :model="addDevLogList" :rules="devLogRules" :label-width="100">
      <FormItem label="子任务：" prop="subtaskId">
        <Select v-model="addDevLogList.subtaskId" v-if='ziTaskList.length!==0' placeholder='请选择子任务'>
          <Option v-for="item in ziTaskList" :value="item.taskid+','+item.subtaskid" :key="item.subtaskid">{{ item.subtaskname }}</Option>
        </Select>
      </FormItem>
      <FormItem label="日志类型：">
        <Select v-model="addDevLogList.type" placeholder="请选择日志类型">
            <Option value="4">更新</Option>
          </Select>
      </FormItem>
      <FormItem prop="progress" label="项目进度：">
        <InputNumber :max="100" :min="0" v-model="addDevLogList.progress"></InputNumber>
      </FormItem>
      <FormItem prop="explain" label="备注：">
        <Input type="textarea" :rows="3" placeholder="请输入内容" v-model="addDevLogList.explain"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="sureSubmit('addDevLogList')">提交</Button>
      <Button type="default" @click="cancel('addDevLogList')">取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
export default {
  data () {
    return {
       addDevLogList: {
        taskId: '',
        proId: '',
        subtaskId: "",
        subtaskProgress: 0,
        remark: "",
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
