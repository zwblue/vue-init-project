<template>
<div class="page">
    <Modal v-model="addziTaskModel" :title="addmodaltitle" @on-cancel="cancel('subTaskParams')">
    <Form ref="subTaskParams" :model="subTaskParams" :rules="subTaskRules" :label-width="100">
      <FormItem prop="subtaskName" label="任务名称：">
        <Input placeholder="请输入任务名称" v-model="subTaskParams.subtaskName"></Input>
      </FormItem>
      <FormItem prop="subtaskHandler" label="处理人：">
        <Select v-model="subTaskParams.subtaskHandler" style="width:200px">
            <Option v-for="item in handleUserList" :value="item.UserName" :key="item.id">{{item.UserName}}</Option>
          </Select>
      </FormItem>
      <FormItem prop="sdate" label="开始时间：">
        <DatePicker type="datetime" v-model="subTaskParams.sdate" @on-change="tasksdateChange" :options="ziTaskdateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间"></DatePicker>
      </FormItem>
      <FormItem prop="edate" label="结束时间：">
        <DatePicker type="datetime" v-model="subTaskParams.edate" @on-change="taskedateChange" :options="ziTaskdateEndOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间"></DatePicker>
      </FormItem>
      <FormItem label="总工时(天)：" prop="workDate"> -->
        <!-- 删除precision="1" -->
      <InputNumber v-model="subTaskParams.workDate" :min="0" placeholder="请手动计算工时"></InputNumber>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="sureSubmit('subTaskParams')">提交</Button>
      <Button type="default" @click="cancel('subTaskParams')">取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
