//plus.navigator.setStatusBarBackground("#ff6600");
var subpages = ['order_webview.html', 'store_webview.html'];
var subpage_style = {
	top: '0',
	bottom: '58px'
};
var aniShow = {};
mui.plusReady(function() {
	var defaultTab = document.getElementById('defaultTab');
	mui.trigger(defaultTab, 'tap');
	var self = plus.webview.currentWebview();
	for(var i = 0; i < subpages.length; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = 'true';
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
	var activeTab = subpages[0];
	mui('.mui-bar-tab').on('tap', 'a', function() {
		var targetTab = $(this).attr('href');
		var data_active_img = $(this).attr('data_active_img');
		if(targetTab == activeTab) return;
		// 选中状态
		$('footer a').each(function(){
			var href = $(this).attr('href');
			var data_img = $(this).attr('data_img');
			$(this).find('img').attr('src',data_img);
			$(this).find('span').css('color','#d6d6d6');
		});
		$(this).find('img').attr('src',data_active_img);
		$(this).find('span').css('color','#ff6600');
		plus.webview.show(targetTab);
		plus.webview.hide(activeTab);
		activeTab = targetTab;
	});
	document.addEventListener('logout',function(){
		var main = plus.webview.getLaunchWebview();
		if(main != '') mui.fire(main,'logout');
		plus.webview.currentWebview().close();
	});
	/*
	*	关闭后退 
	*/
	mui.back = function(){};
	var webview = plus.webview.currentWebview();
	webview.setStyle({
		'popGesture' : 'none'
	});
});