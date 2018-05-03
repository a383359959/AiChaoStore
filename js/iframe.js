mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	
	var option = {
		top : '50px',
		bottom : '0px',
		position : 'dock',
		dock : 'bottom',
		bounce : 'vertical'
	};
	
	var embed = plus.webview.create(webview.url,'embed',option);
	
	webview.append(embed);
		
	embed.addEventListener('loaded',function(){
		$('header span').text(embed.getTitle());
		plus.nativeUI.closeWaiting();
	},false);
	
	embed.addEventListener('loading',function(){
		plus.nativeUI.showWaiting();
	},false);
	
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