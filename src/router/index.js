import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ViewUI from 'view-design';
import { setTitle } from '@/libs/util';
import $app from '@$@/js/$app';
import $ajax from '@$@/js/$ajax';


// 解决路由跳转相同页面报错的问题 Uncaught (in promise) NavigationDuplicated
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'  //默认值为 hash 地址栏带 #；history 地址栏不带 #
})

//总钩子函数
router.beforeEach((to, from, next) => {
  //console.log('from = ',from,'to = ',to)
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
     next();
    }
    else {
     next({
      path: '/login',
      // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
     })
    }
   }
   else {
    ViewUI.LoadingBar.start();//显示进度条
    next();
   }
  

  // next();

  
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish();//结束进度条
  window.scrollTo(0, 0)
})

export default router;
