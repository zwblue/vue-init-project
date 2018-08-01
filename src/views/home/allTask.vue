<template>
<div class="page">
  <Modal v-model="modelShow.allTaskShow"  width="1000" :fullscreen='ifFullScreen' transfer>
        <p slot="header">我的任务<Button @click="ifFullScreen=!ifFullScreen" icon="md-qr-scanner" size='small' type='text' shape="circle"></Button></p>
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
import {Modal,Page,Icon} from 'iview'
export default {
   props:{
     modelShow:{
      type:Object,
      default: function() {
        return {
          allTaskShow: false
        };
      }
    }
  },
  components:{
    Modal,MyTask,Page,Icon
  },
  data () {
    return {
       ifFullScreen:false
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
