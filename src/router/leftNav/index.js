
import Main from '_c/main'// 主 组件模板

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  requireAuth:布尔值,设为true,则该页面需要登录才能访问,false则不用
 *  hideInBread: 布尔值 ，本项目已经废除，不认这个参数
 *  hideInMenu: 自定义，根据项目逻辑已经修改，默认全部为true，根据后台回来的权限，在设置成false
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: 此项目已经作废 没有这个参数，不用管
 *  icon: 项目需求，老板爱好，二级子icon，不认了。
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  oneNav:一级菜单
 * }
 */
// 左侧菜单
const leftNav = [
  // 数据中心
  {
    path: '/data',
    name: 'data',
    meta: {
      icon: '_shuju',
      title: '数据',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/dataCenter',
        name: 'dataCenter',
        meta: {
          icon: '_shuju',
          title: '数据中心',
          notCache: true,//不缓存
          hideInMenu:true,
        },
        component: () => import('@$@/view/dataCenter/dataCenter'),
      }
    ]
  },
  // 调度排班
  {
    path: '/dispatchComposing',
    name: 'dispatchComposing',
    meta: {
      icon: '_shuju1',
      title: '调度排班',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/dispatch',
        name: 'dispatch',
        meta: {
          title: '调度',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/dispatch/dispatch'),
      },
      {
        path: '/composing',
        name: 'composing',
        meta: {
          title: '排班',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/dispatch/composing')
      },
      {
        path: '/approval',
        name: 'approval',
        meta: {
          title: '审批',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/dispatch/approval')
      },
      {
        path: '/statement',
        name: 'statement',
        meta: {
          title: '报表',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/dispatch/statement')
      },
      {
        path: '/set',
        name: 'set',
        meta: {
          title: '设置',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/dispatch/set')
      },
    ]
  },
  // 定位监控
  {
    path: '/position',
    name: 'position',
    meta: {
      icon: '_dingwei',
      title: '定位监控',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/positionInfo',
        name: 'positionInfo',
        meta: {
          icon: '_xuanze',
          title: '定位监控',
          notCache: true,//不缓存
          hideInMenu:true,
        },
        component: () => import('@$@/view/locationInfo/positionInfo')
      },
      {
        path: '/electronicFence',
        name: 'electronicFence',
        meta: {
          icon: '_xuanze',
          title: '电子围栏',
          notCache: true,//不缓存
          hideInMenu:true,
        },
        component: () => import('@$@/view/locationInfo/electronicFence')
      },
      {
        path: '/history',
        name: 'history',
        meta: {
          icon: '_xuanze',
          title: '历史记录',
          notCache: true,//不缓存
          hideInMenu:true,
        },
        component: () => import('@$@/view/locationInfo/history')
      },
    ]
  },
  // 财务结算
  {
    path: '/finance',
    name: 'finance',
    meta: {
      icon: '_icon-',
      title: '财务结算',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/financeSettlement',
        name: 'financeSettlement',
        meta: {
          title: '财务结算',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/finance/settlement'),
      },
      {
        path: '/costType',
        name: 'costType',
        meta: {
          title: '费用类型',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/finance/costType'),
      },
      {
        path: '/costApply',
        name: 'costApply',
        meta: {
          title: '费用审批',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/finance/costApply'),
      },
      {
        path: '/financeStatement',
        name: 'financeStatement',
        meta: {
          title: '财务报表',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/finance/financeStatement'),
      },
    ]
  },
  // 基础信息
  {
    path: '/basicInfo',
    name: 'basicInfo',
    meta: {
      icon: '_fabubiaoshu',
      title: '基础信息',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/useCarMan',
        name: 'useCarMan',
        meta: {
          title: '用车人',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/basicInfo/useCarMan')
      },
      {
        path: '/remind',
        name: 'remind',
        meta: {
          title: '提醒',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/basicInfo/remind')
      },
      {
        path: '/message',
        name: 'message',
        meta: {
          title: '消息',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/basicInfo/message')
      },
      {
        path: '/root',
        name: 'root',
        meta: {
          title: '权限',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/basicInfo/root')
      },
    ]
  },
  // 企业管理
  {
    path: '/businessManage',
    name: 'businessManage',
    meta: {
      icon: '_quanxianpeizhi',
      title: '企业管理',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/companyInfo',
        name: 'companyInfo',
        meta: {
          title: '企业信息',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/companyManage/companyInfo'),
      },
      {
        path: '/userManage',
        name: 'userManage',
        meta: {
          title: '员工管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/companyManage/userManage'),
      },
      {
        path: '/departmentManage',
        name: 'departmentManage',
        meta: {
          title: '部门管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/companyManage/departmentManage'),
      },
      {
        path: '/driverManage',
        name: 'driverManage',
        meta: {
          title: '司机管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
          requireAuth: true, // 判断是否需要登录
        },
        component: () => import('@$@/view/companyManage/driverManage/driverManage')
      },
      {
        path: '/carManage',
        name: 'carManage',
        meta: {
          title: '车辆管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/companyManage/carManage/carManage'),
      },
      {
        path: '/carTeamManage',
        name: 'carTeamManage',
        meta: {
          title: '车队管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
          requireAuth: true, // 判断是否需要登录
        },
        component: () => import('@$@/view/companyManage/carTeamManage')
      },
      {
        path: '/evaluateManage',
        name: 'evaluateManage',
        meta: {
          title: '评价管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/companyManage/evaluateManage'),
      },
    ]
  },
  // 权限管理
  {
    path: '/management',
    name: 'management',
    meta: {
      icon: '_quanxianpeizhi',
      title: '权限管理',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/roleManage',
        name: 'roleManage',
        meta: {
          title: '角色管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/jurisdictionManagement/roleManage'),
      },
      {
        path: '/memu',
        name: 'memu',
        meta: {
          title: '菜单管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/jurisdictionManagement/menuManage'),
      },
      {
        path: '/accountManage',
        name: 'accountManage',
        meta: {
          title: '账号管理',
          notCache: true,
          hideInMenu:true,
          icon: '_xuanze',
        },
        component: () => import('@$@/view/jurisdictionManagement/accountManage'),
      },
    ]
  },
  // 帮助中心
  {
    path: '/help',
    name: 'help',
    meta: {
      icon: '_Group-',
      title: '帮助中心',
      oneNav:true,
      hideInMenu:true,
    },
    component: Main,
    children: [
      {
        path: '/helpCenter',
        name: 'helpCenter',
        meta: {
          icon: '_Group-',
          title: '帮助中心',
          notCache: true,//不缓存
          hideInMenu:true,
        },
        component: () => import('@$@/view/helpCenter/helpCenter'),
      }
    ]
  },
];


export default leftNav;
