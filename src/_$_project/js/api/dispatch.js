import $app from '../$app';//公共方法
const $ajax = {
// 调度排班
	// 查询任务信息列表
	queryTaskList(obj,success,fail) {
		$app.postAjax('order/dispatchTask/queryTaskList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 查询单个任务信息
	queryTaskInfo(obj,success,fail) {
		$app.getAjax('order/dispatchTask/queryTaskInfo',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 编辑任务信息
	modifyTask(obj,success,fail) {
		$app.postAjax('order/dispatchTask/modifyTask',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 新增任务信息
	addTask(obj,success,fail) {
		$app.postAjax('order/dispatchTask/addTask',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
	// 取消任务
	cancelTask(obj,success,fail) {
		$app.getAjax('order/dispatchTask/cancelTask',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},

// 用车申请
	// 新增任务信息
	queryApplyList(obj,success,fail) {
		$app.postAjax('order/carApply/queryApplyList',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},

// 排班
	// 新增任务信息
	getScheduling(obj,success,fail) {
		$app.postAjax('order/schedule/getScheduling',obj, data => {
			success instanceof Function && success(data);
		},fail);
	},
}

// 返回在vue模板中的调用接口
export default $ajax 