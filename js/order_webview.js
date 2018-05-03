mui.plusReady(function(){
	
	new Vue({
		el : '#main',
		data : {
			index : 0,
			list : []
		},
		mounted : function(){
			this.loadData(this.index);
			var obj = this;
			plus.push.addEventListener('click',function(result){
				obj.loadData(obj.index);
			},false);
			document.addEventListener('reload',function(){
				obj.loadData(obj.index);
			});
			plus.push.addEventListener('receive',function(result){
				obj.loadData(obj.index);
			},false);
			document.addEventListener('resume',function(){
				obj.loadData(obj.index);
			});
		},
		methods : {
			item : function(key){
				$('.order_item li').removeClass('active');
				$('.order_item li').eq(key).addClass('active');
				this.index = key;
				this.loadData(this.index);
			},
			show : function(key){
				alert(key);
				var obj = $('.order_webview li').eq(key);
				var css = obj.find('.goods_main').css('display');
				$('.order_goods_title a').text('展开');
				$('.goods_main').hide();
				if(css == 'none'){
					obj.find('.order_goods_title a').text('收缩');
					obj.find('.goods_main').show();
				}else{
					obj.find('.order_goods_title a').text('展开');
					obj.find('.goods_main').hide();
				}
			},
			loadData : function(status){
				var obj = this;
				var page = 0;
				$('.order_webview ul').html('');
				$('.dropload-down').remove();
				$('.order_webview').dropload({
					scrollArea : window,
                	loadDownFn : function(me){
                		page++;
                		var option = {
							store_id : cache('store_id'),
							page : page,
							status : status
						}
                		sendAjax('Order/lists',option,function(result){
                			if(result.list.length > 0){
                				for(var i = 0;i < result.list.length;i++){
                					obj.list.push(result.list[i]);
                				}
                			}else{
                				me.lock();
                                me.noData();
                			}
                			me.resetload();
                		},false);
                	}
				});
			}
		}
	});

});