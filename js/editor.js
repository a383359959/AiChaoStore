mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	
	var option = {
		top : '50px',
		bottom : '0px',
		position : 'dock',
		dock : 'bottom',
		bounce : 'vertical'
	};
	console.log(webview.url);
	var embed = plus.webview.create(webview.url,webview.id,option);
	
	webview.append(embed);
	
	embed.addEventListener('loaded',function(){
		$('header span').text(embed.getTitle());
		plus.nativeUI.closeWaiting();
	},false);
	
	embed.addEventListener('loading',function(){
		plus.nativeUI.showWaiting();
	},false);
	
	mui(document).on('tap','.h_left',function(){
		plus.nativeUI.confirm('您确定要退出编辑？',function(e){
			if(e.index == 0) mui.back();
		},'提示',['是','否']);
	});
	
	mui(document).on('tap','.h_right',function(){
		embed.evalJS('form_submit()');
	});
	
	document.addEventListener('setOption',function(event){
		embed.evalJS(event.detail.func);
		plus.webview.getWebviewById(event.detail.close).close();
	});
	
	document.addEventListener('open',function(event){
		if(event.detail.page == undefined){
			var page = 'iframe.html';
		}else{
			var page = event.detail.page;
		}
		openWindow(page,event.detail.id,{
			url : ip + event.detail.url
		});
	});
	
});