import $app from '../$app';//公共方法
const $ajax = {
    // 菜单管理界面
	// 获取所有权限
	getAlljurisdiction(obj,success,fail) {
		$app.getAjax('user/functions/get',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加权限
	addJurisdiction(obj,success,fail) {
		$app.postAjax('user/functions/add',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除权限
	deleteJurisdiction(obj,success,fail) {
		$app.getAjax('user/functions/delete',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑权限
	updateJurisdiction(obj,success,fail) {
		$app.postAjax('user/functions/update',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},

// 角色管理界面
	// 分页查询角色列表
	queyrRolesList(obj,success,fail) {
		$app.postAjax('user/role/queyrRolesList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增角色信息
	addRoleInfo(obj,success,fail) {
		$app.postAjax('user/role/addRole',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除角色信息
	deleteRoleInfo(obj,success,fail) {
		$app.getAjax('user/role/deleteRole',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑角色信息
	modifyRoleInfo(obj,success,fail) {
		$app.postAjax('user/role/modifyRole',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查看角色信息
	queryRoleInfo(obj,success,fail) {
		$app.getAjax('user/role/queryRoleInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据角色查询菜单列表
	queyrFunIdByRoleId(obj,success,fail) {
		$app.getAjax('user/role/queyrFunIdByRoleId',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 获取角色所有权限并勾选
	queyrFunIdByRoleId(obj,success,fail) {
		$app.getAjax('user/functions/getRoleFunc',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 角色赋值权限
	functionForRole(obj,success,fail) {
		$app.postAjax('user/role/functionForRole',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


//账户管理
	// 获取账户列表
	accountList(obj,success,fail) {
		$app.postAjax('user/manager/get',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加管理员
	addAdministrator(obj,success,fail) {
		$app.postAjax('user/manager/add',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除管理员
	deleteAdministrator(obj,success,fail) {
		$app.getAjax('user/manager/delete',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 禁用管理员
	disableAdministrator(obj,success,fail) {
		$app.getAjax('user/manager/disable',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 启用管理员
	enableAdministrator(obj,success,fail) {
		$app.getAjax('user/manager/enable',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据ID查询管理员信息
	getIdQueryAdministrator(obj,success,fail) {
		$app.getAjax('user/manager/get',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据用户名查询管理员信息
	getNameQueryAdministrator(obj,success,fail) {
		$app.getAjax('user/manager/get',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 更新管理员
	updateAdministrator(obj,success,fail) {
		$app.postAjax('user/manager/update',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
}
// 返回在vue模板中的调用接口
export default $ajax 