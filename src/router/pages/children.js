import Main from '_c/main';

/**
 * 公共页面模块 第三级页
 * 聪修改 新增独立页面，非左侧nav栏内部的页面
 * 控制谁高亮，该方法适用于，二级菜单以下的项目：
 * meta{
 *  openedNames: ['bigService']//哪个一级菜单展开？
 *  navActive:'patentDo'//哪个菜单高亮？
 * }
 * **/
const childrenPages=[{
  path: '/commonPages',
  name: 'commonPages',
  meta: {
    oneNav:false,//这个菜单永远隐藏
    title: '公共模块',
    hideInMenu: true// 栏位隐藏了，面包屑已经没用，hideInBread不认
  },
  component: Main,
  children: [
    {
      path: '/carManageDetail',
      name: 'carManageDetail',
      meta: {
        title: '车辆详情',
        openedNames: ['businessManage'],
        navActive: 'carManage',
        notCache:true
      },
      component: () => import('@$@/view/companyManage/carManage/carManageDetail')
    },
    {
      path: '/carManageAdd',
      name: 'carManageAdd',
      meta: {
        title: '添加车辆',
        openedNames: ['businessManage'],
        navActive: 'carManage',
        notCache:true
      },
      component: () => import('@$@/view/companyManage/carManage/carManageAdd')
    },
    {
      path: '/driverManageDetail',
      name: 'driverManageDetail',
      meta: {
        title: '司机详情',
        openedNames: ['businessManage'],
        navActive: 'driverManage',
        notCache:true
      },
      component: () => import('@$@/view/companyManage/driverManage/driverManageDetail')
    },
    {
      path: '/addOrUpdateDriver',
      name: 'addOrUpdateDriver',
      meta: {
        // title: '添加司机',
        openedNames: ['businessManage'],
        navActive: 'driverManage',
        notCache:true
      },
      component: () => import('@$@/view/companyManage/driverManage/addOrUpdateDriver')
    },
    {
      path: '/addRail',
      name: 'addRail',
      meta: {
        title: '电子围栏',
        openedNames: ['position'],
        navActive: 'positionInfo',
        notCache:true
      },
      component: () => import('@$@/components/electronicFence/map')
    },
    {
      path: '/test4',
      name: 'test4',
      meta: {
        icon: 'md-flower',
        title: '第4级',
        openedNames: ['dispatchComposing'],
        navActive: 'listA',
        notCache:true
      },
      component: () => import('@$@/_test/test4')
    },
    {
      path: '/testM',
      name: 'testM',
      meta: {
        icon: 'md-flower',
        title: '多页签',
        openedNames: ['dispatchComposing'],
        navActive: 'listA',
        notCache:true
      },
      component: () => import('@$@/_testM/testM')
    },
    {
      path: '/urgencyTask',
      name: 'urgencyTask',
      meta: {
        icon: 'md-flower',
        title: '紧急调派',
        // openedNames: ['home'],
        navActive: 'home',
        notCache:true
      },
      component: () => import('@$@/view/index/urgencyTask')
    },
    {
      path: '/noSentOrder',
      name: 'noSentOrder',
      meta: {
        icon: 'md-flower',
        title: '未派订单',
        // openedNames: ['home'],
        navActive: 'home',
        notCache:true
      },
      component: () => import('@$@/view/index/noSentOrder')
    },
    // 首页的查看订单
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta: {
        icon: 'md-flower',
        title: '订单状态',
        // openedNames: ['home'],
        // navActive: 'home',
        notCache:true
      },
      component: () => import('@$@/view/index/orderDetail')
    },
  ]
}];

export default childrenPages; 
