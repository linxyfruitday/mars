!function(){function general_sign(o,e){console.log(o);var t="",n=new Array;for(var i in o)n.push(i);var r=n.sort();for(i=0;i<r.length;i++)t+=r[i]+"="+o[r[i]]+"&";var a=config.platformKey,s=md5(t+a);return md5(s.substring(0,s.length-1)+"q")}function getWeChatJsSdkSignature(o,e,t){var n=$.ajax({url:config.HOST_API+"/account/getjsapisign",data:{noncestr:o,timestamp:e,url:t},beforeSend:function(n){n.setRequestHeader("platform","wap"),n.setRequestHeader("sign",general_sign({noncestr:o,timestamp:e,url:t}))},timeout:3e3,async:!1}).responseText,i=JSON.parse(n);return i.signature}function getShareIdUrl(o){var e=Cookie.get("UserSN"),t=o;return t=t.indexOf("?")<=0?t+"?share_id="+e:t.indexOf("share_id=")<=0?t+"&share_id="+e:changeURLArg(t,"share_id",e)}function changeURLArg(url,arg,arg_val){var pattern=arg+"=([^&]*)",replaceText=arg+"="+arg_val;if(url.match(pattern)){var tmp="/("+arg+"=)([^&]*)/gi";return tmp=url.replace(eval(tmp),replaceText)}return url.match("[?]")?url+"&"+replaceText:url+"?"+replaceText}function wechat_share_config(){var o=config.wechatAppId,e="734618974",t=Math.floor(Date.now()/1e3),n=getWeChatJsSdkSignature(e,t,document.URL,o);wx.config({debug:!1,appId:o,timestamp:t,nonceStr:e,signature:n,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","scanQRCode"]}),wx.error(function(){})}function wechat_share_override(o,e,t){if("undefined"!=typeof wx){wechat_share_config();var n=getShareIdUrl(t);wx.ready(function(){wx.onMenuShareTimeline({title:o.title,link:n,imgUrl:o.imgUrl,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:e.title,desc:e.desc,link:n,imgUrl:e.imgUrl,type:"link",success:function(){},cancel:function(){}})}),common.share.timeline=o,common.share.app=e,common.share.url=t}}function closeResult(){$("#rby-cover-bg").hide(),$("#rby-join").hide()}var common={};common.getId=function(){var o=Cookie.get(Storage.AUTH);return o},common.getOpenId=function(){return Cookie.get(Storage.OPENID)},common.login=function(){if(!Tools.isAlipayBrowser())return void(location.href="../public/err_scan.html");var o=config.alipayAppId,e=Tools.getQueryValue("auth_code");if(!common.isLogining){var t=config.API_ALIPAY_ACCOUNT_AUTOLOGIN;if(common.isLogining=!0,Tools.alert("code: "+e),void 0===e||""==e){var n=location.origin+Tools.removeParamFromUrl(["from","code","share_id","isappinstalled","state","m","c","a","from_wxpay"]),i=config.alipayAuthUrl;i=i.replace("APPID",o).replace("REDIRECT_URI",encodeURIComponent(n)),Tools.alert("url: "+i),location.href=i}else{var r=Tools.removeParamFromUrl(["auth_code"]);Tools.alert("url : "+r);for(var a=0,s=0;s<config.NO_MIANMI.length;s++)if(Tools.alert("no  : "+config.NO_MIANMI[s]),r.indexOf(config.NO_MIANMI[s])>0){a=1;break}Tools.alert("MIANMI : "+a),Cookie.set("hasLoad","",-1),Cookie.remove("BoxToken",-1),Ajax.custom({url:t,type:"POST",showLoading:!0,data:{auth_code:e,device_id:Cookie.get("deviceId"),mianmi:a}},function(o){console.log(o),common.isLogining=!1;var e=o.user;Cookie.remove("token"),Cookie.remove("a_s_token"),Cookie.set("token",o.token,null),e.mobile&&parseInt(e.mobile)>0?Cookie.set("mobile",e.mobile,null):Cookie.set("mobile","",null),Cookie.set("UserSN",e.id,null),Tools.alert("UserSN: "+Cookie.get("UserSN")),Tools.alert("deviceBind: "+o.token+" "+Cookie.get("deviceBind")),location.href=Tools.removeParamFromUrl(["auth_code"]),location.href=Tools.removeParamFromUrl(["code"])},function(o){return"http"==o.message.substring(0,4)?void(location.href=o.message):(location.href=Tools.removeParamFromUrl(["auth_code"]),location.href=Tools.removeParamFromUrl(["code"]),Tools.showToast(o.message||"服务器异常"),void(common.isLogining=!1))})}}},common.checkLoginStatus=function(o){common.init=o;var e=Tools._GET().auth_code||0;Tools.alert(e),Tools.isGatApp()&&e&&e!=Cookie.get("auth_code")&&(Tools.alert(Cookie.get("auth_code")),Cookie.remove("UserSN"));var t=Cookie.get("UserSN");t?(Tools.alert("good token & app id"),o&&o()):(Tools.alert("check login "+Cookie.get("deviceId")),Ajax.custom({url:config.API_GET_CONFIG,data:{device_id:Cookie.get("deviceId")},showLoading:!0},function(o){Cookie.set("alipayAppId",o.app_id,null),Cookie.set("wechatAppId",o.wechat_id,null),common.login()},function(o){common.login()}))};var onlyFirst=!1;common.initCountDown=function(o,e){if(!onlyFirst){onlyFirst=!0;var t=0,o=parseInt(o);setInterval(function(){$(e).each(function(e,n){var i=$(this).attr("data-end");$(this).text(Tools.getRunTime(o+t,i))}),t++},1e3)}},common.lazyload=function(o){function e(){$(o).each(function(o,e){if(!$(this).hasClass("loaded")){var e=$(e).offset();e.top>n&&e.top<n+t&&$(this).attr("src",$(this).attr("data-src")).addClass("loaded")}})}var t=($(document).height(),$(window).height()),n=0;$(window).scroll(function(){n=$(window).scrollTop(),e()}),setTimeout(e,200)},$(document).on("click",".nextpage",function(o){$(this).hasClass("disabled")||(config.page++,common.getList&&common.getList())}),$(window).scroll(function(){if(0!=$(".nextpage").length&&!$(".nextpage").hasClass("disabled")){var o=$(window).scrollTop(),e=$(window).height(),t=$(".nextpage").offset();t.top<o+e&&(config.page++,common.getList&&common.getList())}}),common.wx_scanQRCode=function(o){if("undefined"!=typeof wx){wechat_share_config(),wx.ready(function(){wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){Tools.alert("bar:"+e.resultStr),o(e.resultStr)}})})}},common.aliScan=function(o,e){"undefined"!=typeof Ali&&(Tools.isAlipayBrowser()?Ali.alipayVersion.slice(0,3)>=8.1?Ali.scan({type:"qr"},function(t){Tools.alert(t),t.errorCode?e&&e(t):void 0!==t.barCode?(Tools.alert("条码是："+t.barCode),o(t.barCode)):void 0!==t.qrCode?(Tools.alert("二维码是："+t.qrCode),o(t.qrCode)):void 0!==t.cardNumber?Tools.alert("银行卡号是："+t.cardNumber):Tools.alert(t)}):alert("请在钱包8.1以上版本运行"):Tools.showAlert("请使用支付宝钱包扫一扫"))},common.share={override:function(o,e,t){var n=void 0==t?document.URL:t;wechat_share_override(o,e,n)},default_send:function(){var o={title:Config.C("share_text")["default"].title,imgUrl:"http://assets.yqphh.com/assets/images/logo.jpg"},e={title:MasterConfig.C("shop_name")+"商城",desc:Config.C("share_text")["default"].desc,imgUrl:"http://assets.yqphh.com/assets/images/logo.jpg"};wechat_share_override(o,e,MasterConfig.C("baseMobileUrl"))}},common.getJoiningActivity=function(){0!=$("#rby-join").length&&"1"!=Cookie.get("hasLoad")&&(Cookie.set("hasLoad",1,0),Ajax.custom({url:config.HOST_API+"/index/getPopList"},function(o){var e=o.body;e&&e.length>0&&(Ajax.render("#rby-join-list","rby-join-list-tmpl",e),$("#rby-join").css({height:310,"margin-top":-155}).show(),$("#rby-cover-bg").show())}))},$(".join-close").click(function(o){closeResult()}),$("#rby-cover-bg").click(function(o){closeResult()}),document.getElementById("rby-cover-bg")&&document.getElementById("rby-cover-bg").addEventListener("touchmove",function(o){o.preventDefault()},!0),common.abcLogin=function(o){Ajax.custom({url:config.HOST_API+"/account/test_login",data:{id:o}},function(o){console.log(o),common.isLogining=!1;var e=o.user;Cookie.set("token",o.token,null),Cookie.set("UserSN",e.id,0),Cookie.set("mobile",e.mobile,null),Tools.alert("UserSN: "+Cookie.get("UserSN")),location.href="person.html"},function(o){Tools.showAlert(o.message||"服务器异常"),common.isLogining=!1})},common.alipayPayForIsv=function(o,e,t){AlipayJSBridge.call("tradePay",{tradeNO:o},function(o){"9000"==o.resultCode&&(e?e(o):t&&t(o))})},window.common=common,"FastClick"in window&&FastClick.attach(document.body),Tools.isFruitdayAppBrowser()&&($(".back .icon-morehome").hide().click(function(o){o.preventDefault()}),$(".back .icon-searchhomedel").hide().click(function(o){o.preventDefault()})),Tools.isFruitdayiOSBrowser()&&$("body").addClass("has-app")}();