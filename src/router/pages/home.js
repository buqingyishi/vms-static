import Main from "_c/main";

// 项目里面无论如何都要存在一个，home的首页

const homePages = [
  {
    path: "/",
    name: "homeIndex",
    redirect: "/home", // 域名 重定向
    component: Main,
    meta: {
      oneNav: true,
      notCache: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "工作台",
          notCache: false,
          icon: "_shouye-",
          requireAuth: true, // 判断是否需要登录
        },
        component: () => import("@$@/view/index/home"),
      }
    ]
  }
];

export default homePages;
