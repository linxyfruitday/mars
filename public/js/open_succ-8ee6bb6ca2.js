function check_status(){console.log("flag = "+flag),Ajax.custom({url:config.API_FD_BOX_STATUS,data:{device_id:deviceId},type:"GET",showLoading:!1},function(e){console.log(e),"stock"==e.status?($("#rby-loading1").show(),flag=!1):"pay_succ"==e.status?0==flag?(flag=!0,clearInterval(timer),location.href="buy_succ.html?order_name="+e.order_name+"&deviceId="+deviceId):(flag=!0,clearInterval(timer),alert("不跳转了")):"free"==e.status&&(location.href="index.html")},function(e){})}var deviceId=Cookie.get("deviceId"),timer,flag=!1;!function(){function e(){var e={title:"",url:"#"};window.history.pushState(e,"","#")}function t(){timer=setInterval("check_status()",3e3)}clearInterval(timer),document.addEventListener("resume",function(e){AlipayJSBridge.call("closeWebview")}),document.addEventListener("pause",function(e){AlipayJSBridge.call("closeWebview")},!1),e(),window.addEventListener("popstate",function(t){e();var i=navigator.userAgent.toLowerCase();"micromessenger"==i.match(/MicroMessenger/i)?WeixinJSBridge.call("closeWindow"):i.indexOf("alipay")!=-1?AlipayJSBridge.call("closeWebview"):window.close()},!1),common.checkLoginStatus(function(){t()})}();