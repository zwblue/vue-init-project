<template>
<div class="page">
  <Row :gutter='32'>
    <Col span="12">
    <Divider><span class="title">产品推送</span></Divider>
    <Row :gutter='16' class="text">
      <Col span="6" v-for='(item,index) in list' :key='index'>
      <div class='pro-box'>
        <div class='pro-title'>{{item.title}}</div>
        <div class='pro-num'>{{item.num}}</div>
      </div>
      </Col>
    </Row>
    </Col>
    <Col span="12">
    <Divider><span class="title">活动推送</span></Divider>
    <Row :gutter='16' class="text">
      <Col span="6" v-for='(item,index) in list' :key='index'>
      <div class='pro-box'>
        <div class='pro-title'>{{item.title}}</div>
        <div class='pro-num'>{{item.num}}</div>
      </div>
      </Col>
    </Row>
    </Col>
  </Row>
</div>
</template>
<script>
import {
  Divider,
  Icon
} from 'iview'
export default {
  components: {
    Divider,
    Icon
  },
  data() {
    return {
      list: [{
        title: '开发中的项目',
        num: 1
      }, {
        title: '开发项目',
        num: 3
      }, {
        title: '未开始的项目',
        num: 14
      }, {
        title: '归档的项目',
        num: 8
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {}
$gray:#dcdee2;
.pro-box {
  border: 1px solid $gray;
  border-radius: 5px;
  .pro-title {
    text-align: center;
    border-bottom: 1px solid $gray;
    line-height: 40px;
    height: 40px;
  }
  .pro-num {
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-weight: bold;
  }
}
</style>
