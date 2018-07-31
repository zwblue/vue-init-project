<template>
<div class="page">
  <Modal v-model="modal2"  width="1000" transfer>
        <p slot="header">我的任务</p>
        <div>
            <my-task></my-task>
        </div>
        <div slot="footer">
            <Page :total="100" show-sizer  show-total transfer/>
        </div>
    </Modal>
</div>
</template>

<script>
import MyTask from './myTask.vue'
import {Modal,Page} from 'iview'
export default {
  components:{
    Modal,MyTask,Page
  },
  data () {
    return {
      modal2:true
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
