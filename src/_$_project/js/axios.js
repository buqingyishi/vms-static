
import axios from 'axios';

// 设置axios的返回拦截
axios.interceptors.response.use(
  //请求成功
  res => res,
  err => {
    if (err && err.response) {
      switch (parseInt(err.response.status)) {
        case 400:
          err.XHRcode=400;
          err.message = '请求错误';
          break;
  
        case 401:
          err.XHRcode=401;
          err.message = '未授权';
          break;
  
        case 403:
          err.XHRcode=403;
          err.message = '拒绝访问';
          break;
  
        case 404:
          err.XHRcode=404;
          err.message = '请求地址出错';
          break;
  
        case 408:
          err.XHRcode=408;
          err.message = '请求超时';
          break
  
        case 500:
          err.XHRcode=500;
          err.message = '服务器内部错误';
          break
  
        case 501:
          err.XHRcode=501;
          err.message = '服务未实现';
          break
  
        case 502:
          err.XHRcode=502;
          err.message = '网关错误';
          break;
  
        case 503:
          err.XHRcode=503;
          err.message = '服务不可用'
          break;
  
        case 504:
          err.XHRcode=504;
          err.message = '网关超时';
          break;
  
        case 505:
          err.XHRcode=505;
          err.message = 'HTTP版本不受支持';
          break;
      }
    }else{
      err.XHRcode=9999;//自定义： 4个9 网络超时
      err.message = '网络超时';
    }
    return Promise.reject(err);
  }

);


export default axios;

