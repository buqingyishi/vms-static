import $root from '@/main';// 整个项目实例化的 vue 对象，里面有vuex的方法
import $app from '../$app';


//层相关
export default {
	// 判断有没有实例化 vue
	judgeVue(success) {
		if ($app.judgeData($root)) {
			success($root);
		} else {
			console.log('vue还未实例化，需等等，很快就好 ~~~');
			// 做个定时器，看看 vue是否已经实例化，
			let uYz=setInterval(()=>{
				if ($app.judgeData($root)){
					clearInterval(uYz);
					success($root);
				}else{
					console.log('等待中')
				}
			},1);
		}
	},
    /**
	 * loading 显示转转
	 * $app.loading() 显示
	 * $app.loading('hide') 隐藏
	 **/
	loading(text) {
		$app.judgeVue($root => {
			
			if (text == 'hide') { //隐藏
				$root.upData_loadGlobal({
					show: false,
					text: ''
				});
				$root.upData_loadTran(false);
			} else { //显示
				//显示层没有显示，才触发，以免两层重叠
				
				if (!$root.$store.state.F_cat.loadGlobal.show) {
					$root.upData_loadGlobal({
						show: true,
						text: (text || '加载中...')
					});
				}

			}
		});
	},
    /**
	 * loadingTran 透明白底
	 * $app.loadingTran() 显示
	 **/
	loadingTran() {
		$app.judgeVue($root => {
			$root.upData_loadTran(true);
		});
	},

    /**
	 * toast插件
	 * text 提示文字 必填
	 * judge: true 恭喜提示 / false 失败提示
	 * callBack 回调函数 选填
	 * num 时间 选填
	 **/
	toast(text, judge, callBack, num) {
		$app.judgeVue($root => {
			$root.upData_toastGlobal({
				show:true,//显示层
				good:(!!judge),//布尔值
				text:text
			});

			setTimeout(() => {
				// 初始化所有
				$root.upData_toastGlobal({
					show: false,
					good: false,
					text: ''
				});
				callBack instanceof Function && callBack();
			}, (num || 1500));
		});
	},



	/**
	 * alert框
	 * content 提示文字 必填
	 * title 标题 选填
	 * callBack 选填
	 **/
	alert(content, title, callBack) {
		$app.judgeVue($root => {
			$root.$Modal.info({
				title: title || '温馨提示',
				content,
				onOk: () => {
					setTimeout(() => {
						callBack instanceof Function && callBack();
					}, 300);// iview 全局弹窗关闭动画，需要0.3秒
				}
			});
		});

	},

	/**
	 * 二选一 ,确认框
	 * text 提示文字 必填
	 * header 标题 选填
	 * obj 选填 有默认值
	 * obj.yesText;		obj.yesFun;		obj.noText;		obj.noFun;
	 **/
	confirm(text, header, obj) {
		

		let yesText = !!obj ? obj.yesText : '确定';
		let yesFun = () => {
			setTimeout(() => {
				console.log('点击 确定');
				!!obj && obj.yesFun instanceof Function && obj.yesFun();
			}, 300);// iview 全局弹窗关闭动画，需要0.3秒
		};

		let noText = !!obj ? obj.noText : '取消';
		let noFun = () => {
			setTimeout(() => {
				console.log('点击 取消');
				!!obj && obj.noFun instanceof Function && obj.noFun();
			}, 300);// iview 全局弹窗关闭动画，需要0.3秒
		};

		$app.judgeVue($root => {
			$root.$Modal.confirm({
				title: header || '温馨提示',
				content: text,
				okText: yesText,
				onOk: yesFun,
				cancelText: noText,
				onCancel: noFun
			});
		});

		
	},

	// 关闭指定页面
	closeTag(obj) {
		$app.judgeVue($root => {
			$root.closeTag(obj); // 关闭这个页面
		});
	},

	//关闭已有的页面，一路单线程，进入
	routeIn(obj,that){
		$app.judgeVue($root => {

			// 多页面模式
			if($app.mPageMode){
				let $route='';
				if($app.judgeData(that.$route)){
					$route=that.$route;
				}else{
					$route=that;
				}
				$app.closeTag($route);//关闭本页
			}
			
			$root.$router.push(obj);
		});
	},


	// 关闭已有页面
	closeHadPage(name, callBack) {
		$app.HasAsPage(name, (buEr, objArr) => {
			// console.log('objArr = ',objArr)

			if (!!buEr) {
				objArr.forEach((val, i) => {
					$app.closeTag(val); // 关闭这个页面
				});
			}

			//这里要延时 0 秒才能更新数据，原因不详
			setTimeout(() => {
				callBack instanceof Function && callBack(buEr);
			}, 0);
		});
	},

	//配合上者使用 判断是否 有一模一样的页面
	HasAsPage(name, callBack) {
		let tagNaveList = $app.getLocal('tagNaveList')

		let buEr = false;
		let objArr = [];
		tagNaveList.forEach((val, i) => {
			if (val.name == name) {
				let {
					params, query
				} = val;

				buEr = true;
				let objZ = { name, params, query };
				objArr.push(objZ);
			}
		});
		callBack(buEr, objArr);
	},

	//iview-admin 点击左侧栏nav 或者 顶部页签nav 修复
	clickNav(that, name, params, query) {
		//这里要延时 0 秒才能更新数据，原因不详
		setTimeout(() => {
			//获取当前路由做判断
			let {
				$route: {
					name: nA,
					params: pA,
					query: qA
				}
			} = that;
			if (nA == name) {
				console.log('自己点击自己，毛线都不做');
			} else {
				that.$router.push({
					name,
					params,
					query
				});
			}

		}, 0);
	}


}; 
