import $app from "../$app";

//工具类
export default {

	//删除素组里，指定的东西
	arrayDelOne: (arr, num) => arr.filter((obj, i) => i != num),



	//判断 苹果/安卓
	isApple() {
		let judge;
		//true苹果/false安卓
		(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) ? judge = true : judge = false;
		return judge;
	},

	// 判断数据是否存在：空对象，null，undefined，空数组，字符串，数字，0 全兼容
	judgeData(data) {
		let judge;
		let $app = this;
		if (typeof data === 'number') {
			judge = !!data;
		} else if (typeof data === 'boolean') {
			judge = data;
		} else if (typeof data === 'object') {
			//转成数组再判断
			if (data instanceof File) {
				judge = true;
			} else {
				(!!$app.objToArray(1, data).length) ? judge = true : judge = false;
			}
		} else {
			(data && data.length) ? judge = true : judge = false;
		}
		return judge;
	},

	//对象转数组 num：1键/2值
	objToArray(num, data) {
		let out = '';
		if (!!data) {
			if (num == 1) { //取键
				out = Object.keys(data);
			} else if (num == 2) { //取值
				out = Object.values(data);
			}
		} else {
			out = []
		}
		return out;
	},

	//获取随机数
	getRandomNum(Min, Max) {
		let Range = Max - Min;
		let Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	},

	//强制性转成JSON对象
	anyToJSON(obj) {
		if (typeof obj === 'object') {
			return obj;
		} else if (typeof obj === 'string') {
			return JSON.parse(obj);
		}
	},
	//数组 转 字符串
	arrayToStr(arr) {
		let $app = this;
		if ($app.judgeData(arr)) {
			return arr.join(',');
		} else {
			return false;
		}
	},
	/**
	   * 数组 最小值 计算
	   **/
	arrayMin(team) {
		return Math.min.apply(Math, team);
	},

	/**
	 * 数组 最大值 计算
	 **/
	arrayMax(team) {
		return Math.max.apply(Math, team);
	},
	/**
	 * 正整数 正则验证 最好和 type="number" 配合使用
	 **/
	numPlus(num) {
		let judge = false;
		let str=num.toString();
		if ((str.slice(0,1)!=0) && parseInt(num) != 0) {
			judge = /^\d+$/.test(num);
		}
		
		return judge;
	},
	/**
	 * 身份证 正则验证
	 **/
	idCardCheck(num) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(num);
	},
	/**
	 * 邮箱 正则验证
	 **/
	mailCheck(num) {
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(num);
	},
	/**
	 * 固话 正则验证 010-22223333
	 **/
	homeTelCheck(num) {
		return /^\d{3}-\d{8}|\d{3}-\d{7}|\d{4}-\d{7}|\d{4}-\d{8}/.test(num);
	},
	
	/**
	 * 手机 正则验证
	 **/
	telCheck(num) {
		return /^1[1234567890]\d{9}$/.test(parseInt(num));
	},
	/**
	 * 银行卡 正则验证
	 **/
	bankcardCheck(num) {
		return /^([1-9]{1})(\d{15}|\d{18})$/.test(parseInt(num));
	},
	/**
	 * 车牌号 正则验证
	 **/
	carNumCheck(num) {
		return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}/.test(num);
	},
	/**
	 * qq号 正则验证
	 **/
	qqCheck(num) {
		return /^[1-9][0-9]{4,9}$/gim.test(num);
	},
	/**
	 * mac地址 正则验证
	 **/
	macCheck(num) {
		return /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/.test(num);
	},

	//取文件后缀名
	toLower(name){
		let xu = name.lastIndexOf("\.");
		let out='';

		if(xu>-1){//有
			out=(name.slice(xu+1)).toLowerCase();//去掉尾巴的后缀名，转成小写
		}else{//没有
			out=name;
		}
	  
		return out;
	},

	//去除文件名后缀
	deleJHz(name){
		let xu=name.lastIndexOf('\.');
		let out='';
		if(xu>-1){//有
		  out=name.slice(0,xu);
		}else{//没有
		  out=name;
		}
	
		return out;
	},

	//检查文件后缀名格式
	suffix:{
		//图片格式检测
		//doIt,用于多图循环判断的时候使用，单图默认不填，多图填true；
		img(e,file,callBack,doIt) {
			let string=$app.toLower(file.name);//取文件后后缀名

			let jud = /(jpeg|png|image|gif|bmp|jpg)$/i.test(string);

			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.jpg 或 .png格式文件',false);
			}
			
			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		//压缩包
		zipRar(e,file,callBack,doIt){
			let string=$app.toLower(file.name);//取文件后后缀名
			
			let jud = /(zip|rar)$/i.test(string);
			
			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.zip 或 .rar格式文件',false);
			}

			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		//word文件
		word(e,file,callBack,doIt){
			let string=$app.toLower(file.name);//取文件后后缀名
			
			let jud = /(docx|doc)$/i.test(string);
			
			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.docx 或 .doc格式文件',false);
			}

			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		//word文件+pdf
		wp(e,file,callBack,doIt){
			let string=$app.toLower(file.name);//取文件后后缀名
			
			let jud = /(docx|doc|pdf)$/i.test(string);
			
			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.docx .doc 或 .pdf格式文件',false);
			}

			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		//pdf
		pdf(e,file,callBack,doIt){
			let string=$app.toLower(file.name);//取文件后后缀名
			
			let jud = /(pdf)$/i.test(string);
			
			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.pdf格式文件',false);
			}

			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		//excel文件
		excel(e,file,callBack,doIt){
			let string=$app.toLower(file.name);//取文件后后缀名
			
			let jud = /(xlsx|xls)$/i.test(string);
			
			if(jud){
				callBack instanceof Function && callBack();
			}else{
				$app.toast('请选择.xlsx 或 .xls格式文件',false);
			}

			//清空input file的值
			(!doIt)&&(e.target.value='');
		},
		
		
	},

	//多文件后缀名循环
	suffixEach(e,callBack){
		//批量文件上传 数组
		let files = e.target.files;//选中的文件

		let zS = parseInt(files.length);
  
		for (let i in files) {
		  let file = files[i];
  
		  if ($app.judgeData(file.size)) {
			
			callBack(file);
  
			//循环结束，到了最后的尾巴
			if(zS==(parseInt(i)+1)){
			  // console.log('到了尾巴')
			  e.target.value='';//清空input file的值
			}
		  }
		};
	},

	// 字符串截取，因为后台返回的字段 可能为空，空字符串使用slice会直接报错
	superSlice(str,a,b){
		let out='';
		let aNum=parseInt(a);
		if($app.judgeData(str)){
			let ok=str.toString();//再一次转字符串

			if($app.judgeData(b)){
				let bNum=parseInt(b);
				out=ok.slice(aNum,bNum)
			}else{
				out=ok.slice(aNum);
			}
			
		}
		return out;
	}
	

}; 