export default {
	//上传图片函数 file文件；num上传给后台的图片类型：
	selectFileImage(fileIn, num, callBack,fail) {


		//如果有图片
		if (!!fileIn) {

			if(typeof fileIn === "string"){//单张base64 图片上传
				//大逻辑统一处理
				$app.allImgDo(num, {name:'裁切头像'}, fileIn, callBack,fail);
			}else{
				if ($app.judgeData(fileIn.size)) {//单文件 上传

					$app.sFileImg(fileIn, num, callBack,fail);
	
				} else {//多文件上传
	
					for (let i in fileIn) {
						let val = fileIn[i];
						if ($app.judgeData(val.size)) {
							$app.sFileImg(val, num, callBack,fail);
						}else{
							// console.log('没有循环出文件，不给你上传')
						}
					}
	
				};
			}
		}else{
			console.log('没有选择文件，不给你上传')
		}
	},
	//图片上传 go on
	sFileImg(file, num, callBack,fail) {

		$app.loading('正在上传');
		
		//创建实例
		var reader = new FileReader();
		//异步读取文件内容
		reader.readAsDataURL(file);

		//读取操作成功完成
		reader.onload = function (e) {
			//console.log(e)
			//输出图片 图片/图片设置宽度 px/输出图片函数
			$app.getImgData(e.target.result, 1500, function (data) {
				//$app.loading('hide');

				//这里可以使用校正后的图片data了
				// console.log('Base64图片 = ', data);

				if (num == 0) {
					callBack(data);
					fail instanceof Function && fail();
				} else {
					//大逻辑统一处理
					$app.allImgDo(num, file, data, callBack,fail);
				}
			});
		}
	},
	
	//图片压缩
	getImgData: function (img, setSize, callBack) {
		var image = new Image(); //创建图片对象
		image.src = img; //初始化图片赋值

		//读取操作成功完成
		image.onload = function () {
			var degree = 0,
				drawWidth, drawHeight, width, height;
			drawWidth = this.naturalWidth;
			drawHeight = this.naturalHeight;
			//以下改变一下图片大小
			var maxSide = Math.max(drawWidth, drawHeight);

			// 压缩处理
			// if (maxSide > setSize) {
			var minSide = Math.min(drawWidth, drawHeight);
			minSide = minSide / maxSide * setSize;
			maxSide = setSize;
			if (drawWidth > drawHeight) {
				drawWidth = maxSide;
				drawHeight = minSide;
			} else {
				drawWidth = minSide;
				drawHeight = maxSide;
			}
			// }

			var canvas = document.createElement('canvas');
			canvas.width = width = drawWidth;
			canvas.height = height = drawHeight;
			var context = canvas.getContext('2d');


			//使用canvas旋转校正
			context.rotate(degree * Math.PI / 180);
			context.drawImage(this, 0, 0, drawWidth, drawHeight);
			//返回校正图片   jpg图片格式/压缩质量0~1,
			callBack(canvas.toDataURL("image/jpeg", 0.85));

		}

	},
	img404(imgurl,callBack) {
		let img = new Image(); //判断图片是否存在  
		img.src = imgurl;
		img.onload = function () {
			callBack(true);
		};
		img.onerror = function () {
			callBack(false);
		};
	}


}; 