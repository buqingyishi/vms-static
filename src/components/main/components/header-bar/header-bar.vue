<template>
  <div class="header-bar">
    <sider-trigger icon="md-menu" class="pullLeft cCCC marginR10" ></sider-trigger>
    <div class="pullLeft">
      <span class="f_18 f_bold c333" style="letter-spacing:3px;">{{userInfo.companyName}}</span>
    </div>
    
    <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    <div class="custom-content-con"> 
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  data () {
    return {
      userInfo:{}
    }
  },
  components: {
    siderTrigger,
    customBreadCrumb
  },
  
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
  },
  created (){
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
    this.userInfo = userInfo
    
  }
}
</script>
