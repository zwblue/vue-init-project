<template>
<div class="page">
  <h1>项目甘特图</h1>
  <div>
    {{tableSdate}}-{{tableEdate}}
  </div>
</div>
</template>

<script>
import {
  getGTChartByProApi
} from 'api/myproject.js'
export default {
  data() {
    return {
      tableSdate:'',
      tableEdate:''
    }
  },
  mounted() {
    this.getGTChartByProList();
  },
  methods: {
    getGTChartByProList() {
      getGTChartByProApi({
        proId: this.$route.params.id
      }).then(
        res => {
          if (res.data.code === 200) {
            console.log('甘特图',res);
            const data=res.data.data;
            this.tableSdate=data[0].sDate;
            this.tableEdate=data[data.length-1].eDate;
          }
        }
      ).catch(error => {
        this.$Message.error('接口故障：/getGTChartByPro')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
