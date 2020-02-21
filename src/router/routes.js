

import error from './pages/error'// 404报错跳转
import login from './pages/login'// 登录页
import home from './pages/home'// 首页
import children from './pages/children'// 第三级 子页面

import leftNav from './leftNav'// 左侧菜单 权限目录


// 总路由配置
let routeOut = [...home,...leftNav, ...login, ...children, ...error];

export default routeOut;
