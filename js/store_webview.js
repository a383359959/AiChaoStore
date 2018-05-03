mui.plusReady(function(){
	var store_webview = new Vue({
		el : '#main',
		data : {
			logo : 'images/dianpu.png',
			store_name : '',
			business_status : '',
			today_price : 0,
			yestoday_price : 0,
			today_order : 0,
			yestoday_order : 0,
			today_balance : 0,
			yestoday_balance : 0
		},
		mounted : function(){
			this.loadData();
		},
		methods : {
			loadData : function(){
				var obj = this;
				var option = {
					store_id : cache('store_id'),
				}
				loading(0);
				sendAjax('User/store_info',option,function(result){
					if(result.logo != '') obj.logo = imgurl + result.logo;
					obj.store_name = result.store_name;
					obj.business_status = result.business_status;
					obj.today_price = result.order_data.today_price;
					obj.yestoday_price = result.order_data.yestoday_price;
					obj.today_order = result.order_data.today_order;
					obj.yestoday_order = result.order_data.yestoday_order;
					obj.today_balance = result.order_data.today_balance;
					obj.yestoday_balance = result.order_data.yestoday_balance;
					obj.real_time_data();
					loading(1);
				},false);
			},
			real_time_data : function(){
				var obj = this;
				var option = {
					store_id : cache('store_id'),
				}
				var time = setInterval(function(){
					sendAjax('User/real_time_data',option,function(result){
						obj.today_price = result.order_data.today_price;
						obj.yestoday_price = result.order_data.yestoday_price;
						obj.today_order = result.order_data.today_order;
						obj.yestoday_order = result.order_data.yestoday_order;
						obj.today_balance = result.order_data.today_balance;
						obj.yestoday_balance = result.order_data.yestoday_balance;
					},false);
				},2000);
			},
			change_business_status : function(){
				var option = {
					store_id : cache('store_id'),
					business_status : this.business_status
				}
				sendAjax('User/business_status',option,null,false);
			},
			links : function(url){
				url = getUrl(url,'store_id=' + cache('store_id'));
				openWindow('iframe.html','iframe',{
					url : url
				});
			},
			store_info : function(){
				openWindow('store_info.html');
			},
			pay : function(){
				openWindow('pay.html');
			},
			logout : function(){
				plus.nativeUI.confirm('确定退出？',function(e){
					if(e.index == 0){
						var index = plus.webview.getWebviewById('index.html');
						if(index != null) mui.fire(index,'logout');
					}
				},['是','否']);
			}
		}
	});
	document.addEventListener('reload',function(){
		store_webview.loadData();
	});
});