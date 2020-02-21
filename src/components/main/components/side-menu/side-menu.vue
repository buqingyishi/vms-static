<template>
  <div class="side-menu-wrapper" id="side-menu-wrapper">

    <!-- logo -->
    <slot></slot>

    <!-- 展开 大的导航 -->
    <Menu
      ref="menu"
      v-show="!$store.state.F_cat.collapsed" 
      :active-name="activeName"
      :open-names="$route.meta.openedNames || openedNames"
      :accordion="accordion"
      width="auto"
      @on-select="handleSelect"
      :theme="theme"
    >
      <template v-for="item in menuList">
        
        <!-- 只有一级nav -->
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`" :data-root-id="item.children[0].name">
            <common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>

        <!-- 有两级的nav -->
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/>
            <span>{{showTitle(item) }}</span>
          </menu-item>
        </template>

      </template>
    </Menu>

    <!-- 折叠 小的导航 -->
    <div class="menu-collapsed" v-show="$store.state.F_cat.collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/></a>
        </Tooltip>
      </template>
    </div>
    
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: [],
      //一直打开这些菜单，不进行缩展，纯粹老板个人喜好
      alwaysOpen:['markTool','patentGz','bigService','accountBig']
    }
  },
  methods: {
    //缩起+展开 菜单触发
    oChange(name){
      console.log('左侧菜单伸缩 = ',name)
    },
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
@import './side-menu.less';
.ivu-menu-dark{
  background-color: #2c2c2c!important;

}
// .ivu-menu-item-selected{
//   background-color:#393939 !important; 
// }
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
  color: #fff !important;
}
.ivu-menu-opened{
  background-color: #2c2c2c !important
}
.side-menu-wrapper .ivu-menu-opened .ivu-menu-submenu-title{
  border-left: 3px solid #018EF5;
}
.ivu-menu-submenu{
  // background-color: #393939 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background-color: #393939 !important;
}
.icon-xuanze{
  font-size: 13px !important;
}
.ivu-menu-submenu .ivu-menu-item{
  // padding: 14px 24px !important;
  padding-top: 10px !important;
  padding-bottom: 8px !important;
}
</style>
<style>
.ivu-menu-submenu .ivu-menu-item:first-child{
  padding-top: 15px !important;
}
.ivu-menu-submenu .ivu-menu-item:last-child{
  margin-bottom: 15px !important;
}
.ivu-menu-vertical{
  padding-top: 20px !important;
}
.side-menu-wrapper .ivu-menu-item-selected{
  border-left: 3px solid #018EF5;
}
.ivu-menu-dark>.ivu-menu-item:first-child{
  padding-top: 15px !important;
}
.ivu-menu-dark>.ivu-menu-item:nth-child(2){
  
  /* padding-bottom: 30px !important; */
}
.ivu-menu-dark>li:nth-child(3){
  margin-top: 22px !important;
  border-top: 1px solid rgba(66,68,70,1);
}
.ivu-menu-dark>li:nth-child(5){
  padding-bottom: 22px !important;
  border-bottom: 1px solid rgba(66,68,70,1);
}
.ivu-menu-dark>li:nth-child(3)>.ivu-menu-submenu-title{
  margin-top: 23px;
}
</style>
