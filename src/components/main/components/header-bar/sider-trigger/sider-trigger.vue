<template>
  <a 
    @click="poW" 
    type="text"
    :class="['sider-trigger-a', $store.state.F_cat.collapsed ? 'collapsed' : '']"
    :style="'width:'+($store.state.F_cat.collapsed?'50':'40')+'px'"
  >
    <Icon :type="icon" :size="size" v-show="!$store.state.F_cat.collapsed" />
    
    <span class=" relative f_bold f_18 cCCC" style="top:-22px;" v-show="$store.state.F_cat.collapsed">
      展<span class="f_12">开</span>
    </span>
  </a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    poW(){
      let buEr=this.$store.state.F_cat.collapsed;
      // window.console.log(buEr)
      this.$root.upData_collapsed(!buEr);
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
