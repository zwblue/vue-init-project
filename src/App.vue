<template>
<div id="app" :style=style>
  <router-view/>
</div>
</template>
<script>
import './index.css'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  computed:{
    style(){
      return this.$route.meta;
    }
  } ,
  mounted(){
     console.log(1111,this.$route)
     console.log(1111,this.$route)
  }
}
</script>

<style>
body,
html {
  position: relative;
  height: 100vh;
  width: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  height: 100vh;
  font-family: 'FangSong_GB2312', Times, serif;
}
</style>
