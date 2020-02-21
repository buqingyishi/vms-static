
import $app from '../$app';//公共方法

export default {
	testA(id,success,fail) {
		$app.showLoading=false;
		$app.getAjax('functions/get/children', {id}, ({data}) => {
			success instanceof Function && success(data);
		},fail);
	}
	
};