mui.plusReady(function(){
	
	var login = new Vue({
		el : '.login',
		data : {
			username : '',
			password : '',
			store_id : cache('store_id')
		},
		mounted : function(){
			if(this.store_id != null) this.index();
		},
		methods : {
			submit : function(){
				var obj = this;
				if(this.username == ''){
					plus.nativeUI.alert('请输入用户名！',null,'提示','确定');
				}else if(this.password == ''){
					plus.nativeUI.alert('请输入密码！',null,'提示','确定');
				}else{
					var info = plus.push.getClientInfo();
					var option = {
						username : this.username,
						password : this.password,
						token : info.token,
						clientid : info.clientid,
						appid : info.appid,
						appkey : info.appkey
					}
					sendAjax('User/login',option,function(result){
						if(result.status == 'success'){
							obj.username = '';
							obj.password = '';
							plus.storage.setItem('store_id',result.store_id);
							obj.index();
						}else{
							plus.nativeUI.alert(result.msg,'','提示','确定');
						}
					});
				}
			},
			index : function(){
				openWindow('index.html');
			},
			forget : function(){
				openWindow('forget.html');
			}
		}
	});
	
	document.addEventListener('logout',function(){
		plus.storage.removeItem('store_id');
		login.store_id = null;
	});

});