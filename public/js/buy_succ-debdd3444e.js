!function(){function e(){var e={title:"",url:"#"};window.history.pushState(e,"","#")}function o(){Ajax.custom({url:config.API_DEVICE_ORDER_AMOUNT,data:{order_name:t,device_id:i},type:"GET",showLoading:!0},function(e){e.order_goods.length>0&&e.order?a=e.order.money:(e.order.money="0.00",e.order.good_money="0.00"),e.order.total_money=parseFloat(e.order.money)+parseFloat(e.order.yue),e.order.discounted=parseFloat(e.order.discounted_money)+parseFloat(e.order.card_money)+parseFloat(e.order.modou)+parseFloat(e.order.level_money),Ajax.render("#buy-container","buy-content-tmpl",e)},function(e){r.html('<div class="empty-page-tip">'+e.message+"</div>"),Tools.showAlert(e.message||"服务器异常")})}var n=$("body");n.height()-(n.find("nav").height()+1)-n.find(".container>dl").height();document.addEventListener("resume",function(e){AlipayJSBridge.call("closeWebview")}),document.addEventListener("pause",function(e){AlipayJSBridge.call("closeWebview")},!1),e(),window.addEventListener("popstate",function(o){e();var n=navigator.userAgent.toLowerCase();"micromessenger"==n.match(/MicroMessenger/i)?WeixinJSBridge.call("closeWindow"):n.indexOf("alipay")!=-1?AlipayJSBridge.call("closeWebview"):window.close()},!1);var r=$("#buy-container"),t=Tools._GET().order_name||0,i=Tools._GET().deviceId||0;history.replaceState(null,null,"index.html");var a=0;common.checkLoginStatus(function(){o()})}();