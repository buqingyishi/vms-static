
// 自定义工具栏函数
import ajax from './app/ajax'
import box from './app/box'
import date from './app/date'
import img from './app/img'
import storage from './app/storage'
import text from './app/text'
import tool from './app/tool'

// 路由配置
import $router from '@/router'
import $ajax from './$ajax'

// console.log('$leftNav.length = ',7+首页home=8)



const $app = {
  /**
   * 全系统只需要改一个地方，即可在正式服/测试服之间切换
   * true正式服/false测试服
   **/
  apiWhere: true,//目前已经废掉 保留日后有需要再用
  mPageMode:true,// 多页签模式 
  baseUrl: 'http://192.168.1.46:8090/mng/', // 公共基础路径
  rootUrl:'',
  timeout: 10000, // 网络超时设置
  pageLimit: 10, // 上拉加载分页
  showLoading: true, // ajax请求显示转转，全局设置
  winHeight: window.innerHeight, // 获取屏幕高度
  winWidth: window.innerWidth, // 获取屏幕高度
  isMinScreen(){//是否小屏电脑 以 1540为判断标准
    let out='';
    if($app.winWidth<1540){
      out=true;
    }else{
      out=false;
    }
    return out;
  },
  loginDay: 1, // 设置登陆的有效范围，单位为天
  exTime () {
    return 86400 * 1000 * $app.loginDay
  },
  foreverTime () {
    // 登录期限10950天 约等于30年
    return 86400 * 1000 * 10950
  },

  // 列表分页配置
  pageAll: {
    pageSize: 15,
    pageSizeOpts: [15, 30, 60]
  },

  // 后台返回数据名称,以下内容请和后台商量好
  xhrCode: 'code', // 码判断
  xhrJudge: 200, // 1成功,0失败
  xhrData: 'data', // 对象值
  xhrMsg: 'msg', // 提示语
  xhrPage: {
    page: 0, // 请求页码
    now: 'page', // 当前页
    limit: 'total_pages', // 总 页数
    all: 'total_items_count'// 总 条数
  },
  
  // 无需token就可以请求的url
  noToken: [],
  //后台返回code 为500的时候，需要聚焦input 的接口
  needFocusApi:[],
  // code报500，需要聚焦
  code500needFocus (url, callBack1, callBack2) {
    let arr = $app.needFocusApi;

    let judge = false;
    arr.forEach((val, i) => {
      (url == val) && (judge = true);
    })
    if (!!judge) { // 满足，$Message+需聚焦
      callBack1()
    } else { // 不满足，仅alert
      callBack2()
    }
  },

  // 用户权限菜单
  leftNavRoot(){
    let {
      options:{
        routes
      }
    }=$router;
    let leftNav=[];
    routes.forEach((val,i)=>{
      if($app.judgeData(val.meta) && $app.judgeData(val.meta.oneNav)){
        let children=[];
        let obj={};
        if((val.children).length>1){//2个以上，证明有子菜单
          obj={
            title:val.meta.title,
            type:''
          };
          (val.children).forEach((jar,r)=>{
            children.push({
              title: jar.meta.title,
              type:jar.name,
              children: [],
            });
          });
        }else{//1个儿子，直接把儿子当做一级菜单
          obj={
            title:val.children[0].meta.title,
            type:val.children[0].name
          };
        }

        obj.children=children;
        leftNav.push(obj);
        
        
      }
    });

    // 没有儿子，父级type有值，children:[]
    // 有儿子，父级type为空，children有数据
    // 父亲儿子都有title

    return leftNav;
  },

  //小屏自动折叠函数
	minScreenColl(that){
		
		let oldName='';
		setTimeout(()=>{
			oldName=that.$route.name;
		},1000);
		
		setTimeout(()=>{
			
			if(that.$route.name !='login' && that.$route.name == oldName){//登录页不判断
				$app.judgeVue($root=>{
					$root.upData_collapsed($app.isMinScreen());
				});
				if($app.isMinScreen()){
					that.$Notice.info({
						title: '导航自动折叠',
						desc:'当前为小屏幕，可点击左上角展开导航。'
					});
				}
			}
		},2000);
	},


  //权限编辑初始化菜单
  initLeftNav(list){
    let nav=$app.getSession('leftNav');
    // console.log('权限nav',nav)
    

    list.forEach((val,i)=>{
      let {
        children,
        meta:{
          oneNav
        }
      }=val;
      let youR=false;
      if($app.judgeData(children) && $app.judgeData(oneNav)){
        children.forEach((jar,r)=>{
          if($app.judgeData(nav)){
            // 权限判断
            let leftNav= JSON.stringify(nav);
            let xuH=leftNav.indexOf(jar.name);
            if(xuH>0){
              jar.meta.hideInMenu=false;
              youR=true;
            }
          }else{
            jar.meta.hideInMenu=false;
            youR=true;
          }
        });
      }

      if(youR ){
        //有儿子
        val.meta.hideInMenu=false;
      }else{
        // val.meta.hideInMenu=true;
      }
    });
    return list;
  },

  
  //权限判断
  jdDomR2(resData){
    let {
      is_admin,
      menu_list,
      partner_id,
      menu_not
    }=resData;

    // let navOld=$app.getSession('leftNav');

    if(is_admin || partner_id == 0 ){//主账号
      $app.removeSession('leftNav');// 清空 权限数据，得到所有权限
      // console.log('恭喜你是主账号，获得所有权限');
    }else{//子账号
      menu_list.push('personInfo');
      $app.setSession(menu_list,'leftNav');// 存数据 权限数据
    }
  },


  
}

// 对象合并
Object.assign($app, ajax, box, date, img, storage, text, tool)

// 返回在vue模板中的调用接口
export default $app
