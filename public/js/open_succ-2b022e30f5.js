function ajax_wx_pay_status(){}var deviceId=Cookie.get("deviceId"),timer,flag=!1;!function(){function e(){var e={title:"",url:"#"};window.history.pushState(e,"","#")}function i(){timer=setInterval(function(){1!=flag&&(flag=!0,Ajax.custom({url:config.API_FD_BOX_STATUS,data:{device_id:deviceId},type:"GET",showLoading:!1},function(e){console.log(e),"stock"==e.status?$("#rby-loading1").show():"pay_succ"==e.status?(clearInterval(timer),location.href="buy_succ.html?order_name="+e.order_name+"&deviceId="+deviceId):"free"==e.status&&(location.href="index.html"),flag=!1},function(e){flag=!1}))},3e3)}clearInterval(timer),document.addEventListener("resume",function(e){AlipayJSBridge.call("closeWebview")}),document.addEventListener("pause",function(e){AlipayJSBridge.call("closeWebview")},!1),e(),window.addEventListener("popstate",function(i){e();var t=navigator.userAgent.toLowerCase();"micromessenger"==t.match(/MicroMessenger/i)?WeixinJSBridge.call("closeWindow"):t.indexOf("alipay")!=-1?AlipayJSBridge.call("closeWebview"):window.close()},!1),common.checkLoginStatus(function(){i()})}();