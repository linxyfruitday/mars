!function(){$(".order").click(function(){Cookie.set("token","",-1),Cookie.set("BoxToken","",-1),Cookie.set("OpenId","",-1),Cookie.set("UserSN","",-1),Cookie.set("hasLoad","",-1),Cookie.remove("mobile"),Cookie.remove("deviceBind"),alert("userSn="+Cookie.get("UserSN"))}),$(".alipay").click(function(){alert(Tools.returnUserAgent()),alert(navigator.userAgent.toLowerCase()),alert(Tools.isAlipayBrowser())}),$(".group").click(function(){common.checkLoginStatus(function(){alert("checkLoginStatus")}),Cookie.set("DevDebug",1),alert(Cookie.get("DevDebug"))}),$(".address").click(function(){Cookie.set("DevDebug",0),alert(Cookie.get("DevDebug"))}),document.addEventListener("AlipayJSBridgeReady",function(){console.log(typeof AlipayJSBridge),AlipayJSBridge.call("hideToolbar"),AlipayJSBridge.call("hideOptionMenu")},!1),document.addEventListener("resume",function(e){alert("页面回退时带过来的内容： "+JSON.stringify(e.data))}),document.addEventListener("pause",function(e){alert("paused")},!1)}();