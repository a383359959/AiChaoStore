mui.plusReady(function(){
	var store_info = new Vue({
		el : '#main',
		data : {
			store_id : cache('store_id'),
			logo : 'images/dianpu.png',
			store_name : '',
			address : '',
			store_phone : '',
			desc : '',
			type_id : 0,
			time_period : '',
			uploader : null
		},
		mounted : function(){
			this.loadData();
			this.upload();
		},
		methods : {
			loadData : function(){
				var obj = this;
				var option = {
					store_id : this.store_id,
					field : 'logo,store_name,address,store_phone,desc,type_id,time_period'
				}
				loading(0);
				sendAjax('User/store_info',option,function(result){
					if(result.logo != '') obj.logo = imgurl + result.logo;
					obj.store_name = result.store_name;
					obj.address = result.address;
					obj.store_phone = result.store_phone;
					obj.desc = result.desc;
					obj.type_id = result.type_id;
					obj.time_period = result.time_period;
					loading(1);
				},false);
			},
			submit : function(){
				if(this.store_name == ''){
					plus.nativeUI.alert('名称不能为空！',null,'提示','是');
				}else if(this.address == ''){
					plus.nativeUI.alert('地址不能为空！',null,'提示','是');
				}else if(this.store_phone == ''){
					plus.nativeUI.alert('电话不能为空！',null,'提示','是');
				}else if(this.time_period == ''){
					plus.nativeUI.alert('请设置营业时间！',null,'提示','是');
				}else{
					var option = {
						store_id : this.store_id,
						logo : this.logo.replace(imgurl,''),
						store_name : this.store_name,
						address : this.address,
						type_id : this.type_id,
						store_phone : this.store_phone,
					}
					sendAjax('User/setInfo',option,function(result){
						if(result.status == 'success'){
							var store_webview = plus.webview.getWebviewById('store_webview.html');
							if(store_webview != null) mui.fire(store_webview,'reload');
							plus.webview.currentWebview().close();
						}
					});
				}
			},
			jump : function(url){
				openWindow(url);
			},
			upload : function(){
				var obj = this;
				this.uploader = new plupload.Uploader({
					runtimes : 'silverlight,html4',
					browse_button : 'upload',
					url : ip + '/index.php/Api/User/uploadImg',
					chunk_size : '10mb',
					unique_names : true,
					resize : {
						width : 100,
						height : 100,
						quality : 90
					},
					filters : {
			    		max_file_size : '10mb',
			    		mime_types: []
					},
					flash_swf_url : 'plupload/Moxie.swf',
					silverlight_xap_url : 'plupload/Moxie.xap',
					init : {
						FilesAdded : function(up,files){	// 选择文件后开始上传
							plus.nativeUI.showWaiting();
							up.start();
						},
						FileUploaded : function(up,file,info){	// 上传完成后
							var json = eval('(' + info.response + ')');
							var img = imgurl + json.path;
							plus.nativeUI.closeWaiting();
							obj.logo = img;
						}
					}
				});
				this.uploader.init();
			}
		}
	});
	document.addEventListener('selectCategory',function(e){
		store_info.type_id = e.detail.id;
	});
	document.addEventListener('reload',function(){
		store_info.loadData();
	});
});