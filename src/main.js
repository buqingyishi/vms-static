// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import config from '@/config'

import echarts from 'echarts'//echarts图表
Vue.prototype.$echarts = echarts

import './index.less'
import '@$@/css/iconfont.css'//自定义 字体图标 路径


import VueAMap from 'vue-amap'; // 高德


import VmCollapse from 'vue-multiple-collapse'//折叠面板
Vue.use(VmCollapse)

Vue.use(VueAMap);


VueAMap.initAMapApiLoader({
  key: '4641e566efa4f3480adef856aca6cc55',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4'
});




import '@babel/polyfill';//兼容IE11 的babel转码




// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV === 'production'){
  console.log('build')
}else{
  console.log('dev')
}


//vue剪切板功能
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);



import $axios from '@$@/js/axios';//已经设置了拦截回调
Vue.prototype.$axios = $axios;// 原型上挂载axios,便于全局使用
window.$axios = $axios;//挂载在window 顶层上，更加方便全全局调用


// 引用 自定义JS文件
// 将自定义js方法绑定到全局
// 原型不变，在全局this下console不出来，但是this.$app有效
import $app from '@$@/js/$app';//公共方法
import $ajax from '@$@/js/$ajax';//公共方法
// console.log('$app = ', $app, '\n$ajax = ', $ajax);

// 挂载VUE原型链里
Vue.prototype.$app = $app;
Vue.prototype.$ajax = $ajax;
//挂载在window下
window.$app=$app;
window.$ajax=$ajax;



Vue.use(ViewUI)




/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;


/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;



import { mapMutations } from 'vuex';

/* eslint-disable no-new */
const $root = new Vue({
  el: '#app',
  router,
  store,
  methods:{
    ...mapMutations([
      'closeTag',
      'upData_userImg',
      'upData_toastGlobal',
      'upData_loadGlobal',
      'upData_loadTran',
      'upData_wechatBoxFinal',
      'upData_wechatBox',
      'upData_collapsed'
    ])
  },
  render: h => h(App)
});

// 输出 Vue 大配置
export default $root;
