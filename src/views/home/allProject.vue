<template>
<div class="page">
  <Modal v-model="modal2"  width="1000" transfer>
        <p slot="header">项目概况</p>
        <div>
             <project-survey></project-survey>
        </div>
        <div slot="footer">
           <Page :total="100" show-sizer  show-total transfer/>
        </div>
    </Modal>
</div>
</template>

<script>
import {Modal,Page} from 'iview'
import ProjectSurvey from './projectSurvey.vue'
export default {
   components:{
    Modal,Page,ProjectSurvey
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
