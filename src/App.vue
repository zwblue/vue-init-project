<template>
  <div id="app" :style=style>
    <router-view/>
  </div>
</template>
<script>
import "./index.css";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    style() {
      return this.$route.meta;
    }
  },
  mounted() {
    console.log(1111, this.$route);
    console.log(1111, this.$route);
  }
};
</script>

<style lang="scss">
body,
html {
  position: relative;
  height: 100vh;
  width: 100%;
}
#app {
  min-width: 1400px;
  .page-box{
    padding-top:15px;
  }
  .title {
    color: #17233d ;
    font-weight: bold ;
  }
  .page .text {
    color: #515a6e;
  }
  .page .wxtip {
    color: #808695;
  }
  .disabled {
    color: #c5c8ce ;
  }
  .page .bg {
    background: #e8eaec;
  }
  .page .bdcolor {
    border-color: #f8f8f9;
  }
  .page .my-table {
    font-size: 14px;
  }
  .primary {
    color: #2d8cf0 ;
  }
  .success {
    color: #19be6b ;
  }
  .error {
    color: #ed4014 ;
  }
  .warning {
    color: #ff9900 ;
  }
  .primary-bg {
    background: #2d8cf0 ;
  }
  .light-bg {
    background: #5cadff ;
  }
  .success-bg {
    background: #19be6b ;
  }
  .error-bg {
    background: #ed4014 ;
  }
  .warning-bg {
    background: #ff9900 ;
  }
}
</style>

<style lang="scss" scoped>
#app {
  height: 100vh;
  font-family: "FangSong_GB2312", Times, serif;
}
</style>
