<template>
<div class="page">
     <Tabs value="name1" class="center-tab">
        <TabPane label="项目" name="name1" class="111">
          <pro-count></pro-count>
        </TabPane>
        <TabPane label="任务" name="name2">
          <task-count></task-count>
        </TabPane>
    </Tabs>
</div>
</template>

<script>
import {Tabs,TabPane} from 'iview'
import ProCount from './pro-count.vue'
import TaskCount from './task-count.vue'
export default {
  components:{
    Tabs,TabPane,ProCount,TaskCount
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
   
  }
}
</script>
<style>

</style>
<style lang="scss" scoped>
.page {}
</style>
