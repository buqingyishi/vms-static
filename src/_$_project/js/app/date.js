/***************************************
 * 日历 相关
 ***************************************/
export default {
	//本项目最小日期
	timeMin:'2000-01-01',
	/**
	 * 格式化时间戳
	 * type		1年月日时分 / 2年月日 / 3年月  / 4月日 / 5年
	 * time		时间戳
	 **/
	formatTime(type, time) {
		//格式化时间戳
		Date.prototype.Format = function(fmt) { // author: meizz
			var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"h+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			return fmt;
		}

		var out = '';
		switch (parseInt(type)) {
			case 1:
				out = 'yyyy-MM-dd hh:mm';
				break;
			case 2:
				out = 'yyyy-MM-dd';
				break;
			case 3:
				out = 'yyyy-MM';
				break;
			case 4:
				out = 'MM-dd';
				break;
			case 5:
				out = 'yyyy';
				break;
		}

		return new Date(parseInt(time) * 1000).Format(out);
	},
	//时间戳 还原计时器 时:分:秒
	timeWatch(num) {
		// 时分秒 全定义为 0
		var hour, minute, second = 0;
		hour = Math.floor(num / 60 / 60);
		minute = Math.floor(num / 60 % 60);
		second = Math.floor(num % 60);

		hour = (10000 + hour).toString().substring(3, 5);
		minute = (10000 + minute).toString().substring(3, 5);
		second = (10000 + second).toString().substring(3, 5);

		var out = hour + ":" + minute + ":" + second;
		//console.log(hour + ":" + minute + ":" + second);

		return out;
	},
	//获取 今天的时间 是否格式
	today(format) {
		var today = parseInt((new Date().getTime()) / 1000);
		return $app.formatNear(today, format);
	},
	//获取 昨天的时间 是否格式
	yesterday(format) {
		var yesterday = $app.today() - 86400;
		return $app.formatNear(yesterday, format);
	},
	//获取 明天的时间 是否格式
	tomorrow(format) {
		var tomorrow = $app.today() + 86400;
		return $app.formatNear(tomorrow, format);
	},
	//前xx天
	beforeDay(dateNum,format){
		var aa=$app.today()-(86400*dateNum);
		return $app.formatNear(aa,format);
	},
	//后xx天
	afterDay(dateNum,format){
		var aa=$app.today()+(86400*dateNum);
		return $app.formatNear(aa,format)
	},
	// 输出日期 or 时间戳？
	// format true返回2018-09-02 false返回时间戳
	formatNear(date, format) {
		var out = '';
		if (!!format) {
			out = $app.formatTime(2, date);
		} else {
			out = date
		}
		return out;
	},
	//日期 格式转换 
	//输入：2018-07-12 ，输出20180712
	dateTran(date){
		let judge=date.indexOf('\-')==-1;
		let out='';
		if(judge){
			out=date;
		}else{
			out=(date.replace(/\-/g,''));
		}
		return out;
	},
	//两个时间比大小
	vsTime:function(a,b){
		var $app=this;
		var n=$app.judgeData(a)?a:'2000-01-01';
		console.log('输入进来日期比大小 = ',n,b)
		var B = new Date(n);
		var B3=B.getTime()/1000;//当前时间

		
		var D = new Date(b);
		var D3=D.getTime()/1000;//目标时间
		return (B3<=D3);
	}
};
