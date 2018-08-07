<template>
<div class="page">
  <Modal v-model="modelShow.allTaskShow"  width="1200" :fullscreen='ifFullScreen' transfer>
        <p slot="header">我的任务<Button @click="ifFullScreen=!ifFullScreen" icon="md-qr-scanner" size='small' type='text' shape="circle"></Button></p>
        <div>
            <my-task :dataList="dataList" :loading='loading'></my-task>
        </div>
        <div slot="footer">
            <Page :total="100" @on-change='changeCurrent' @on-page-size-change='changePageSize' show-sizer  show-total transfer/>
        </div>
    </Modal>
</div>
</template> 
 
<script>
import {
  getMyTaskInfoByIndexApi
} from "api/home.js";
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
    },
    dataList:{
      type:Array,
      default:function(){
        return []
      }
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  components:{
    Modal,MyTask,Page,Icon
  },
  data () {
    return {
       ifFullScreen:false
    }
  },
  methods:{
      changePageSize(val){
      this.$emit('changePageSize',val,'task')
    }
    ,changeCurrent(val){
      this.$emit('changeCurrent',val,'task')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
