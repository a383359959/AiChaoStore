mui.plusReady(function(){
	
	var login = new Vue({
		el : '.login',
		data : {
			store_name : '',
			username : '',
			password : '',
			confirm_password : ''
		},
		methods : {
			submit : function(){
				var obj = this;
				if(this.store_name == ''){
					plus.nativeUI.alert('请输入店铺名称！',null,'提示','确定');
				}else if(this.username == ''){
					plus.nativeUI.alert('请输入账号！',null,'提示','确定');
				}else if(this.password == ''){
					plus.nativeUI.alert('请输入新密码！',null,'提示','确定');
				}else if(this.password != this.confirm_password){
					plus.nativeUI.alert('两次密码输入不一致！',null,'提示','确定');
				}else{
					var option = {
						store_name : this.store_name,
						username : this.username,
						password : this.password,
					}
					sendAjax('User/forget',option,function(result){
						if(result.status == 'success'){
							plus.nativeUI.alert('密码重置成功！',function(){
								plus.webview.currentWebview().close();
							},'提示','确定');
						}else{
							plus.nativeUI.alert(result.msg,'','提示','确定');
						}
					});
				}
			}
		}
	});
	
	document.addEventListener('logout',function(){
		plus.storage.removeItem('store_id');
		login.store_id = null;
	});

});