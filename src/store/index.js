import Vue from 'vue'
import Vuex from 'vuex'


import app from './module/app'//框架逻辑
import F_cat from './module/F_cat'//项目逻辑
// 声明使用vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    F_cat
  }
})
