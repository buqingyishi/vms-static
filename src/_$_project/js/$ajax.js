
import $app from './$app';//公共方法

// import common from './ajax/common';
import companyManage from './api/companyManage';//企业管理接口
import dispatch from './api/dispatch';//调度排班接口
import permissionManage from './api/permissionManage';//权限管理接口
// import common from './ajax/common';

const $ajax = {

// 登录接口界面
	// 登录
	login(obj,success,fail) {
		$app.postAjax('login',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 退出登录
	logout(obj,success,fail) {
		$app.postAjax('logout',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


// 文件上传
	// 分页查询车辆列表
	uploadImage(obj,success,fail) {
		$app.postAjax('system/fileupload/uploadImage',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
};


// 对象合并
Object.assign($ajax, companyManage,dispatch,permissionManage);

// 返回在vue模板中的调用接口
export default $ajax 
