<template>
  <div id="app">
    <router-view/>
    <Toast />
    <Loading />
  </div>
</template>

<script>

//全局引入toast框，iview的toast框本身存在缺点，没有遮罩层
import Toast from "@/_toast";
//全局引入loading框，iview的loading框本身存在缺点，没有遮罩层
import Loading from "@/_loading";

export default {
  name: 'App',
  components: {Toast,Loading},

  mounted () {
      //小屏自动折叠函数
      $app.minScreenColl(this);
      setTimeout(()=>{
        document.body.removeChild(document.getElementById('appLoading'));//删除loading层
      },200);
  },
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
