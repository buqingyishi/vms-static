import Main from '_c/main';

const loginPages=[{
  path: '/login',
  name: 'login',
  meta: {
    title: '管理员登录',
    hideInMenu: true
  },
  component: () => import('@$@/view/login/login')
}];

export default loginPages; 