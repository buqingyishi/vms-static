import $app from '../$app';//公共方法
const $ajax = {
    // 部门管理界面
	// 查询企业部门信息，树形结构
	getDepartments(obj,success,fail) {
		$app.postAjax('user/department/getDepartments',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加部门
	addDepartments(obj,success,fail) {
		$app.postAjax('user/department/add',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加部门
	updateDepartments(obj,success,fail) {
		$app.postAjax('user/department/update',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除部门
	deleteDepartments(obj,success,fail) {
		$app.getAjax('user/department/delete',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据关键字获取企业部门列表
	getDepartmentByKey(obj,success,fail) {
		$app.postAjax('user/department/getDepartmentByKey',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


// 用户管理界面
	// 员工信息列表
	queryUserInfoList(obj,success,fail) {
		$app.postAjax('user/user/queryUserInfoList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑员工信息
	updateUserInfo(obj,success,fail) {
		$app.postAjax('user/user/modifyUserInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增员工信息
	addUserInfo(obj,success,fail) {
		$app.postAjax('user/user/addUserInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除员工信息
	deleteUserInfo(obj,success,fail) {
		$app.getAjax('user/user/deleteUserInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑员工状态
	updateUserStatus(obj,success,fail) {
		$app.showLoading = false;
		$app.postAjax('user/user/modifyUserStatus',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


//评价管理
	// 查询评价列表
	queryPageEvaluateList(obj,success,fail) {
		$app.postAjax('user/evaluate/queryPageEvaluateList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 审核评价
	auditEvaluate(obj,success,fail) {
		$app.postAjax('user/evaluate/auditEvaluate',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


//企业信息
	// 企业信息列表
	queryComanyInfoList(obj,success,fail) {
		$app.postAjax('user/companyInfo/queryComanyInfoList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增企业信息
	addComanyInfo(obj,success,fail) {
		$app.postAjax('user/companyInfo/addComanyInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除企业信息
	deleteComanyInfo(obj,success,fail) {
		$app.getAjax('user/companyInfo/deleteComanyInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑企业信息
	modifyComanyInfo(obj,success,fail) {
		$app.postAjax('user/companyInfo/modifyComanyInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询企业信息
	queryComanyInfo(obj,success,fail) {
		$app.getAjax('user/companyInfo/queryComanyInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 公司赋值权限
	functionForCompany(obj,success,fail) {
		$app.postAjax('user/companyInfo/functionForCompany',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 获取公司所有权限并勾选
	queryComanyInfo(obj,success,fail) {
		$app.getAjax('user/functions/getCompanyFunc',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据名称查询企业列表信息
	queryComanyInfoList(obj,success,fail) {
		$app.postAjax('user/companyInfo/queryComanyInfoList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据公司id查询所有子公司列表信息
	queryComanyInfoListById(obj,success,fail) {
		$app.postAjax('user/companyInfo/queryComanyInfoListById',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},





// 司机管理
	// 查询司机列表
	queryPageDriverList(obj,success,fail) {
		$app.postAjax('user/driver/queryPageDriverList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增司机信息
	addDriverInfo(obj,success,fail) {
		$app.postAjax('user/driver/addDriverInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除司机信息
	deleteDriverInfo(obj,success,fail) {
		$app.getAjax('user/driver/deleteDriverInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑司机信息
	modifyDriverInfo(obj,success,fail) {
		$app.postAjax('user/driver/modifyDriverInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询司机信息
	queryDriverInfo(obj,success,fail) {
		$app.getAjax('user/driver/queryDriverInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 绑定司机信息
	bindCar(obj,success,fail) {
		$app.postAjax('user/driver/bindCar',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 获取可用司机
	getAvailableDriver(obj,success,fail) {
		$app.postAjax('user/driver/getAvailableDriverPage',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


//	车队管理
	// 查询车队信息列表
	queryCarTeamList(obj,success,fail) {
		$app.postAjax('user/carTeam/queryCarTeamList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增车队信息
	addCarTeam(obj,success,fail) {
		$app.postAjax('user/carTeam/addCarTeam',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除车队信息
	deleteCarTeam(obj,success,fail) {
		$app.getAjax('user/carTeam/deleteCarTeam',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑车队信息
	modifyCarTeam(obj,success,fail) {
		$app.postAjax('user/carTeam/modifyCarTeam',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询公司下所有的车队信息列表
	queryAllCarTeamList(obj,success,fail) {
		$app.postAjax('user/carTeam/queryAllCarTeamList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询车队下所有的司机
	queryTeamAndDriver(obj,success,fail) {
		$app.getAjax('user/carTeam/queryTeamAndDriver',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询车队下所有的车辆
	queryTeamAndCar(obj,success,fail) {
		$app.getAjax('user/carTeam/queryTeamAndCar',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},


//车辆管理
	// 分页查询车辆列表
	getCarBaseInfoPage(obj,success,fail) {
		$app.postAjax('vehicle/car/getCarBaseInfoPage',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据id车辆列表信息
	getBaseInfo(obj,success,fail) {
		$app.getAjax('vehicle/car/getBaseInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 根据id查询车辆扩展信息
	getExtInfo(obj,success,fail) {
		$app.getAjax('vehicle/car/getExtInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 分页查询车辆保险记录
	getInsuranceRecordPage(obj,success,fail) {
		$app.postAjax('vehicle/car/getInsuranceRecordPage',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 分页查询车辆年审记录
	getExaminedRecordPage(obj,success,fail) {
		$app.postAjax('vehicle/car/getExaminedRecordPage',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加车辆基本信息
	addCarBaseInfo(obj,success,fail) {
		$app.postAjax('vehicle/car/addCarBaseInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加车辆附加信息
	addCarExtInfo(obj,success,fail) {
		$app.postAjax('vehicle/car/addCarExtInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加车辆车辆保险记录
	addCarInsuranceRecord(obj,success,fail) {
		$app.postAjax('vehicle/car/addCarInsuranceRecord',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 添加车辆车辆年险记录
	addExaminedRecord(obj,success,fail) {
		$app.postAjax('vehicle/car/addExaminedRecord',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 更新车辆信息
	updateCarInfo(obj,success,fail) {
		$app.postAjax('vehicle/car/updateCarInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 删除车辆
	deleteCar(obj,success,fail) {
		$app.getAjax('vehicle/car/delete',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 获取可用车辆
	getAvailableCars(obj,success,fail) {
		$app.postAjax('vehicle/car/getAvailableCars',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
}

// 对象合并
// Object.assign($ajax, common);

// 返回在vue模板中的调用接口
export default $ajax 