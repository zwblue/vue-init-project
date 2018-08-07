<template>
  <div class="page">
    <Modal v-model="modelShow.allProjectShow" width="1200" :fullscreen='ifFullScreen' transfer>
      <p slot="header">项目概况
        <Button @click="ifFullScreen=!ifFullScreen" icon="md-qr-scanner" size='small' type='text' shape="circle"></Button>
      </p>
      <div>
        <project-survey :loading='loading' :dataList="dataList"></project-survey>
      </div>
      <div slot="footer">
        <Page :total="100" show-sizer show-total transfer @on-change='changeCurrent' @on-page-size-change='changePageSize'/>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getProInfoByIndexApi,
} from "api/home.js";
import { Modal, Page, Icon } from 'iview';
import ProjectSurvey from './projectSurvey.vue';
export default {
  props: {
    modelShow: {
      type: Object,
      default: function() {
        return {
          allProjectShow: false
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
  components: {
    Modal,
    Page,
    ProjectSurvey,
    Icon
  },
  data() {
    return {
      ifFullScreen: false,
      
    };
  },
  methods:{
    changePageSize(val){
      this.$emit('changePageSize',val,'pro')
    }
    ,changeCurrent(val){
      this.$emit('changeCurrent',val,'pro')
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
}
</style>
