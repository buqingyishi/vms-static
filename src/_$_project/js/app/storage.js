

export default {
    /**
	 * sessionStorage 存
	 **/
    setSession (settings, name) {
        let settingA = settings || {};
        window.sessionStorage.setItem(name, JSON.stringify(settingA));
    },

	/**
	 * sessionStorage 读
	 **/
    getSession (name) {
        let settingsText = window.sessionStorage.getItem(name);
        return JSON.parse(settingsText);
    },
	/**
	 * sessionStorage 删
	 **/
    removeSession (name) {
        window.sessionStorage.removeItem(name);
    },
	/**
	 * HTML5本地存储 设置应用本地配置
	 * settings:保存数据
	 * name:保存数据名
	 **/
    setLocal (settings, name) {
        let settingA = settings || {};
        window.localStorage.setItem(name, JSON.stringify(settingA));
    },
	/**
	 * 获取HTML5本地存储的数据
	 * 获取数据：localStorage.getItem(key)
	 * 获取全部数据：localStorage.valueOf()
	 * 删除数据：localStorage.removeItem(key) 
	 * 清空全部数据：localStorage.clear();
	 * 获取本地存储数据数量：localStorage.length
	 * 获取第 N 个数据的 key 键值：localStorage.key(N)
	 **/
    getLocal (name) {

		if(name!='token'){

			let settingsText = window.localStorage.getItem(name);
			return JSON.parse(settingsText);
		}else{//读取token单独判断

			let settingsText = window.localStorage.getItem(name);
			let obj=JSON.parse(settingsText);

			if ($app.judgeData(obj)) {
				let { time, token } = obj;
				let now = new Date().getTime();//获取现在的时间
				if (now > time) {//已经超出了登录期限

					//清空所有
					$app.loginOutClear(()=>{
						$app.toast('登录超时 或 token过期', false);
					});
					return false;

				} else {
					return obj;
				}
			} else {
				//清空所有
				$app.loginOutClear();
				return false;
			}
		}

		
    },
	/**
	 * 删除应用本地配置
	 **/
    removeLocal (name) {
        window.localStorage.removeItem(name);
    }

}; 