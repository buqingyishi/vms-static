import $app from "../$app";
import $router from "@/router";

export default {
  ajax({ url, data, success, fail, type }) {
    if (url == "partner/info" || url == "partner/userInfo") {
      // 个人信息 和 公司信息，不产生遮罩层
      // 很多个地方都有这个请求，时时刻刻更新钱
    } else {
      $app.loadingTran(); //显示 透明遮罩
    }

    !!$app.showLoading && $app.loading(); //用showLoading控制，显示 转转
    //获取 token
    $app.ajaxNeedToken(url, (token, nowTime) => {
      // console.log('当前token = ',token)

      //get请求就一定是一个参数, post请求可能是1个参数可能是2个参数,
      let getText = "";
      if (type == "GET") {
        let keyArr = $app.objToArray(1, data);
        let valArr = $app.objToArray(2, data);
        // keyArr.forEach((val, i) => {
        //   if (i == 0) {
        //     getText += "?";
        //   } else {
        //     getText += "&";
        //   }
        //   getText += val + "=" + valArr[i];
        // });
        getText ='/'+data
      }
      

      //这个鬼东西已经设置成全局
      $axios({
        method: type,
        url: `${$app.baseUrl}${url}` + getText,
        // transformRequest(obj) {
        //   //把对象转为数组
        //   let keys = $app.objToArray(1, obj); //取键
        //   let vals = $app.objToArray(2, obj); //取值

        //   // Axios 不能直接传对象 需new FormData()
        //   let axiosData = new FormData();
        //   keys.forEach((val, i) => {
        //     if (
        //       vals[i] == "undefined" ||
        //       vals[i] == undefined ||
        //       vals[i] == null
        //     ) {
        //       //毛都不做
        //     } else {
        //       axiosData.append(val, vals[i]);
        //     }
        //   });

        //   return axiosData;
        // },
        data: data,
        

        //这个参数，只有线上环境才认（测试服，正式服），
        //本地电脑node环境，不认！！超时不限制。
        timeout: $app.timeout, //网络超时,

        withCredentials: true, //能否跨域
        headers: {
          "content-type": "application/json",
          "X-Auth-Token": token,
          test: "loveSuper" //自定义头部
        }
      })
        .then(function(rel) {
          //请求成功
          $app.initAjaxBase(); //初始化ajax timeout
          // console.log('rel = ',rel);
          let res = rel.data;
          if (rel.status == 200) {
            let code = res[$app.xhrCode];
            if (code == $app.xhrJudge) {
              $app.ajaxSuccess(res, success);
            } else {
              $app.ajaxFail(url, res, fail);
            }
          } else {
            
            $app.ajaxError(res);
          }
        })
        .catch(function(res) {
          //请求失败
          $app.ajaxError(res);
        });
    });
  },

  //判断那些接口需要 token（仅少部分不用，比如：注册）
  ajaxNeedToken(url, callBack) {
    let nowTime = new Date().getTime(); //获取现在的时间
    let token = localStorage.getItem('token')
    callBack(token, nowTime);

    // let judge = true;
    // $app.noToken.forEach((val, i) => {
    //   url == val && (judge = false);
    // });

    // if (judge) {
    //   $app.getTokenFun(callBack);
    // } else {
    //   let nowTime = new Date().getTime(); //获取现在的时间
    //   callBack("", nowTime);
    // }
  },

  //ajax成功回调 通过后台code判断状态
  ajaxSuccess(res, callBack) {
    callBack(res);
  },

  //ajax请求成功，状态失败
  ajaxFail(url, res, callBack) {
    //哪些接口 code==500 需要聚焦
    $app.ajaxFailFinal(res, callBack);
  },
  //错误提示最终处理
  ajaxFailFinal(res, callBack) {
    if(res.code == '1001'){
      $app.alert(res[$app.xhrMsg], "提 示" + res[$app.xhrCode], function() {
        // callBack instanceof Function && callBack(res);
        $router.replace({ name: "login" });
      });
    }else{
      $app.alert(res[$app.xhrMsg], "提 示" + res[$app.xhrCode], function() {
        callBack instanceof Function && callBack(res);
      });
    }
    
  },

  //错误处理
  ajaxError(res, url) {
    $app.initAjaxBase(() => {
      if (res.XHRcode) {
        console.log("XHRcode = ", res.XHRcode);
        let text = res.XHRcode == 9999 ? res : res + "<br/>API: " + url;
        let title =
          res.XHRcode == 9999 ? "温馨提示" : "XHR错误码: " + res.XHRcode;
        $app.confirm(text, title, {
          yesFun: () => {
            $router.replace({ name: "home" });
          },
          yesText: "返回首页",
          noText: "留在当前"
        });
      } else {
        console.log("55555555")
        console.log("拦截 = ", res);
      }
    }); //初始化ajax timeout
  },

  //初始化ajax timeout
  initAjaxBase(callBack) {
    setTimeout(function() {
      //延迟体验更优秀
      $app.loading("hide");
    }, 200);
    $app.timeout = 10000;
    $app.showLoading = true;
    callBack instanceof Function && callBack();
  },

  //post请求
  postAjax(url, data, success, fail) {
    $app.ajax({
      url,
      data,
      success,
      fail,
      type: "POST"
    });
  },

  //get请求
  getAjax(url, data, success, fail) {
    $app.ajax({
      url,
      data,
      success,
      fail,
      type: "GET"
    });
  },

  //浏览器层级，打开新窗口
  openWindow(name) {
    window.open(name, "_blank");
  }
};
