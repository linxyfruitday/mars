function get_order_status(){Ajax.custom({url:config.API_FD_BOX_STATUS,data:{device_id:deviceId},type:"GET",showLoading:!1},function(e){console.log(e),"stock"==e.status?$("#rby-loading1").show():"pay_succ"==e.status?location.href="buy_succ.html?order_name="+e.order_name+"&deviceId="+deviceId:"free"==e.status&&(location.href="index.html")},function(e){})}var deviceId=Cookie.get("deviceId");history.replaceState(null,null,"index.html"),function(){common.checkLoginStatus(function(){})}(),deviceId&&0!=deviceId&&self.setInterval("get_order_status()",2e3);