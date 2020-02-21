import userImg from "@$@/img/tX.png";

// 服务猫全局的数据
export default {
  state: {
    wechatBoxFinal:false,//false没有显示过，true显示过
    wechatBox:false,// 关照二维码弹框 true 显示，false 隐藏
    collapsed:false,// 左侧菜单是否折叠 true折叠 false展开

    userImg,//用户头像

    // 全局 toast 设置
    toastGlobal:{
      show:false,//显示层
      good:false,//布尔值
      text:''
    },
    

    // 全局 loading 设置
    loadGlobal:{
      show:false,//显示层
      tran:false,//透明层
      text:''
    },
  },
  getters: {
  },
  mutations: {
    upData_userImg(state,img){
      state.userImg=img;
    },
    upData_toastGlobal(state,obj){
      state.toastGlobal=obj;
    },
    upData_loadGlobal(state,{show,text}){
      state.loadGlobal.show=show;
      state.loadGlobal.text=text;
    },
    upData_loadTran(state,buEr){
      state.loadGlobal.tran=buEr;
    },

    upData_wechatBoxFinal(state){
      state.wechatBoxFinal=true;
    },
    upData_wechatBox(state){
      state.wechatBox=!state.wechatBox;
    },
    upData_collapsed(state,buEr){
      state.collapsed=buEr;
    }
  },
  actions: {
  }
}
