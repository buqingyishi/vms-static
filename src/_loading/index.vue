<template lang="html">
    <div>
        <div class="fullLoading" v-show="$store.state.F_cat.loadGlobal.tran"></div>
        <div class="fullLoading" v-show="$store.state.F_cat.loadGlobal.show">
            <!-- <img src="static/img/zZ01.png" class="catLoad0"/> -->
            <img src="static/img/zZ02.png" class="catLoad1"/>
            <div class="textCenter">{{$store.state.F_cat.loadGlobal.text}}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
/*全屏loading 防止 手快二次点击*/
.fullLoading {
  position: fixed;
  z-index: 99995;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.8;
  background-color: transparent;
  -webkit-animation: comeIn 0.3s linear;
  animation: comeIn 0.3s linear;
}

.fullLoading i,
.fullLoading img,
.fullLoading>div {
  position: fixed;
  z-index: 99996;
  font-size: 100px;
  width: 100px;
  height: 100px;
  line-height: 1;
  display: block;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: -80px;
  bottom: 0;
}
.fullLoading .catLoad0 {
    opacity: 0.6;
  -webkit-animation: infiniteR0 1.1s cubic-bezier(.15, .73, .37, 1.2) infinite;
  animation: infiniteR0 1.1s cubic-bezier(.15, .73, .37, 1.2) infinite;
  color:#5887ef;
}

.fullLoading .catLoad1 {
    opacity: 0.8;
  -webkit-animation: infiniteR1 1.1s cubic-bezier(.15, .73, .37, 1.2) infinite;
  animation: infiniteR1 1.1s cubic-bezier(.15, .73, .37, 1.2) infinite;
  color:#2d8cf0;
}

@keyframes infiniteR1 {
  0% {
    transform: rotate(0deg);
  }

  80% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }

}

@keyframes infiniteR0 {
  0% {
    transform: rotate(0deg);
  }

  80% {
    transform: rotate(-360deg);
  }

  100% {
    transform: rotate(-360deg);
  }

}

/*加载文字*/
.fullLoading>div{
  font-size: 14px;
  line-height: 1;
  height: 150px;
  padding-top: 140px
}
</style>
<script>
    export default {
        data() {
            return {};
        }
    };
</script>
