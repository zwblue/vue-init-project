<template>
<div class="page">
  <Row :gutter='32'>
    <Col span="12">
    <Divider :orientation="isAllShow?'center':'left'"><span class="title">产品推送</span></Divider>
    <Row :gutter='16' class="text">
      <Col  span="6" v-for='(item,index) in sendTypeList.slice(0,4)' v-if='isAllShow||index===0' :key='index'>
      <div class='pro-box'>
        <div class='pro-title'>{{item.name}}</div>
        <div class='pro-num'>{{item.num}}</div>
      </div>
      </Col>
    </Row>
    </Col>
    <Col span="12">
    <Divider :orientation="isAllShow?'center':'left'"><span class="title">活动推送</span></Divider>
    <Row :gutter='16' class="text">
      <Col span="6" v-for='(item,index) in sendTypeList.slice(-4)' v-if='isAllShow||index===0' :key='index'>
      <div class='pro-box'>
        <div class='pro-title'>{{item.name}}</div>
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
import {
  getProCountByCPAndHDApi
} from 'api/home.js'
import {
  getSendType,
  sendType
} from 'utils/common.js'
export default {
  components: {
    Divider,
    Icon
  },
  data() {
    return {
      // 产品活动推送的类型
      sendTypeList: [{
          index: 'cp_kf',
          name: "开发中的项目",
          num: 0
        },
        {
          index: 'cp_lx',
          name: "立项待审批",
          num: 0
        },
        {
          index: 'cp_sx',
          name: "上线待审批",
          num: 0
        },
        {
          index: 'cp_yq',
          name: "延期待审批",
          num: 0
        },
        {
          index: 'hd_kf',
          name: "开发中的项目",
          num: 0
        },
        {
          index: 'hd_lx',
          name: "立项待审批",
          num: 0
        },
        {
          index: 'hd_sx',
          name: "上线待审批",
          num: 0
        },
        {
          index: 'hd_yq',
          name: "延期待审批",
          num: 0
        }
      ]
    }
  },
  computed: {
    isAllShow() {
      return this.$store.state.user.userPower === 4
    }
  },
  mounted() {
    this.getProCountByCPAndHDList();
  },
  methods: {
    getProCountByCPAndHDList() {
      getProCountByCPAndHDApi().then(res => {
        if (res.data.code === 200) {
          const data = res.data.data;
          for (let type of this.sendTypeList) {
            for (let val in data) {
              if (type.index == val) {
                type.num = data[val];
                break;
              }
            }
          }
        }
      }).catch(error => {
        this.$Message.error('网络故障--/getProCountByCPAndHD')
      })
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

.title {
  line-height: 24px;
  font-size: 16px;
  margin: 0 18px;
}
</style>
