!function(){function e(e,t){var n="",o=new Array;for(var i in e)e[i]=void 0===e[i]?"":e[i],o.push(i);var r=o.sort();for(i=0;i<r.length;i++)n+=r[i]+"="+e[r[i]]+"&";var a=config.platformKey,s=md5(n+a);return md5(s.substring(0,s.length-1)+"q")}function t(e){this.options=e||{},this.timeout=15e3,this.cache=!0,this.defaultListTmpl="rby-list-tmpl",this.defaultListEle="#rby-list",this.defaultDetailTmpl="rby-detail-tmpl",this.defaultDetailEle="#rby-detail",this.isLoading=!1,this.hasNext=!0,this.queue={},this.tempPage={},this.onEnd=function(){}}function n(e,t,n,i){if($("#"+t).length>0&&n){"undefined"!=typeof n.length&&(n={list:n});var r=o(t,n);i?$(e).append(r):$(e).html(r)}}function o(e,t){return template.render(e,t)}function i(e,t,n){log("["+e+"] "+t+":"+n,2)}function r(e){var t=!0;for(var n in e){t=!1;break}return t}function a(e,t){var n,o=[];for(var i in e)o.push(e[i]),t==i&&(n=e[i]);return 0==o.length?e[t]=1:n?n:(o=o.sort(),e[t]=o[o.length-1]+1)}function s(e,t){if(e){var n={current_page:e.current,per_page:e.size,total:e.count};n.current_page=parseInt(n.current_page),n.total=parseInt(n.total),n.per_page=parseInt(n.per_page),n.total=Math.ceil(n.total/n.per_page),n.prev_page=1==n.current_page?1:n.current_page-1,n.next_page=n.current_page==n.total?n.current_page:n.current_page+1;var o=n.current_page-2,i=n.current_page+2;n.total<=5?(o=1,i=n.total):(o<1&&(o=1,i=o+4),i>n.total&&(i=n.total,o=n.total-4));var r="";r+="<dl><dt"+(1==n.prev_page?' class="disabled"':"")+'><a href="#'+n.prev_page+'"><img src="images/arrow_left.gif"></a></dt><dd>';for(var a=o;a<=i;a++)r+='<a href="#'+a+'"'+(n.current_page==a?' class="active"':"")+">"+a+"</a>";r+='</dd><dt class="ari'+(n.next_page>=n.total?" disabled":"")+'"><a href="#'+n.next_page+'"><img src="images/arrow_left.gif"></a></dt></dl>',$(t).html(r).show()}}function l(e,t){e=e||{};for(var n in t)e[n]="undefined"==typeof e[n]?t[n]:e[n]}function p(e){return"object"==typeof e&&void 0!=typeof e.length}var u='<div class="nodata">暂无数据。</div>',c='<div class="nodata">没有更多数据。</div>',d='<div class="nodata">服务器异常。</div>',f='<div class="nodata">数据错误。</div>',g=$("#rby-loading");t.prototype._init=function(){this.spinnings;return this},t.prototype.paging=function(e,t,n){var o=this,i=1==e.data.page,r={renderFor:this.defaultListTmpl,renderEle:this.defaultListEle,pagingDom:".pagination",pagingMode:"next",timeKey:"createAt",key:"body",showLoading:!0,logtype:"paging"};if(l(e,r),"number"==e.pagingMode)$(e.renderEle).html("正在加载中..."),$(e.pagingDom).hide();else if("next"==e.pagingMode){var p=a(o.tempPage,e.url),g=$("#np-"+p),h='<div id="np-'+p+'" class="nextpage">正在加载中...</div>';0==g.length&&($(e.renderEle).after(h),g=$("#np-"+p)),g.html("正在加载中...").addClass("disabled"),i&&$(e.renderEle).html("")}o.ajaxSend(e,function(n,r,a){var l=n;return"-1"==e.key&&(l=n),o.isSusPagingData(l)?("number"==e.pagingMode?(l&&0!=l.length?o.render(e.renderEle,e.renderFor,l):i&&$(e.renderEle).html(u),s(n.pageInfo,e.pagingDom)):"next"==e.pagingMode&&(0==l.length?i&&(g.hide(),$(e.renderEle).html(u)):(o.hasNext=l.length==e.data.page_size,g.show(),o.render(e.renderEle,e.renderFor,l,!i),o.hasNext?g.html("正在加载更多").removeClass("disabled"):g.html(c))),void("function"==typeof t&&t(n))):void $(e.renderEle).html(f)},function(t,o){$(e.renderEle).html(d),g.hide(),"function"==typeof n&&n(t,o)})},t.prototype.detail=function(e,t,o){var i=this,r={renderFor:this.defaultDetailTmpl,renderEle:this.defaultDetailEle,key:"",showLoading:!0,logtype:"detail"};l(e,r),e.showLoading&&$(e.renderEle).html('<div class="loading">加载中...</div>'),i.ajaxSend(e,function(o,i,r){if(o.error)return void $(e.renderEle).html(o.error);var a=o||{};a&&n(e.renderEle,e.renderFor,a),"function"==typeof t&&t(o)},o)},t.prototype.submit=function(e,t,n){var o,i,r=this,a=!!e.data.length,s={type:"POST",showLoading:!0,logtype:"submit"};l(e,s),a?(o=e.data.serializeArray(),i=e.data.find('[type="submit"]'),i.attr("disabled",!0)):o=e.data,e.data=o,r.ajaxSend(e,function(e,n,o){a&&i.removeAttr("disabled"),"function"==typeof t&&t(e)},function(e,t,o){a&&i.removeAttr("disabled"),"function"==typeof n&&n(e,t,o)})},t.prototype.custom=function(e,t,n){var o=this,i={logtype:"custom"};l(e,i),o.ajaxSend(e,t,n)},t.prototype.ajaxSend=function(t,n,o){var a=this;a.isLoading=!0,a.queue[t.url]=!0,t.showLoading&&g.show(),t=t||{},void 0==typeof t.contentType&&(t.contentType="application/json"),void 0==typeof t.processData&&(t.processData=!0),$.ajax({url:t.url,data:t.data,type:t.type||"GET",beforeSend:function(n){n.setRequestHeader("token",Cookie.get("token")),n.setRequestHeader("platform","wap"),n.setRequestHeader("sign",e(t.data))},dataType:"json",timeout:a.timeout,cache:a.cache,contentType:t.contentType,processData:t.processData,success:function(e,o,i){Tools.alert("success data:"+JSON.stringify(e).substring(0,200)),a.isLoading=!1,delete a.queue[t.url],"function"==typeof n&&n(e),r(a.queue)&&"function"==typeof a.onEnd&&a.onEnd.call(this)},error:function(e,n,s){Tools.alert("error data: "+JSON.stringify(e.response)),a.isLoading=!1,delete a.queue[t.url];var l;return e.responseText&&(l=JSON.parse(e.responseText)),401==e.status||"401"==e.status?void common.login():(i(t.logtype,n,t.url),"function"==typeof o&&o(l,{}),void(r(a.queue)&&"function"==typeof a.onEnd&&a.onEnd.call(this)))},complete:function(e,n){setTimeout(function(){g.hide()},100),$(t.renderEle).show()}})},t.prototype.render=n,t.prototype.logged=i,t.prototype.isSusPagingData=p,window.Ajax=new t}();var log=function(e){"undefined"!=typeof console&&console.log(e)};!function(){var e={get:function(e){var t="(?:;)?"+e+"=([^;]*);?",n=new RegExp(t);if(!n.test(document.cookie))return null;try{return unescape(RegExp.$1)}catch(o){return null}},_set:function(e,t,n,o,i,r){var a=null;a="number"==typeof n&&"number"==typeof o&&"number"==typeof i&&"number"==typeof r?0==n&&0==o&&0==i&&0==r?null:this.getExpDate(n,o,i,r):n||this.getExpDate(7,0,0,0),document.cookie=e+"="+escape(t)+(null==a?"":";expires="+a)+"; path=/"},set:function(e,t,n){null==n?this._set(e,t,7,0,0,0):this._set(e,t,n,0,0,0)},remove:function(e){this.set(e,"",-1)},getExpDate:function(e,t,n,o){var i=new Date;if("number"==typeof e&&"number"==typeof t&&"number"==typeof n&&"number"==typeof o)return i.setDate(i.getDate()+parseInt(e)),i.setHours(i.getHours()+parseInt(t)),i.setMinutes(i.getMinutes()+parseInt(n)),i.setSeconds(i.getSeconds()+parseInt(o)),i.toGMTString()}};window.Cookie=e}(),function(){String.prototype.isSpaces=function(){for(var e=0;e<this.length;e+=1){var t=this.charAt(e);if(" "!=t&&"\n"!=t&&"\t"!=t&&"\r"!=t)return!1}return!0},String.prototype.isValidMail=function(){return new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this)},String.prototype.isPhone=function(){return new RegExp(/^1\d{10}?$/).test(this)},String.prototype.isEmpty=function(){return/^\s*$/.test(this)},String.prototype.isValidPwd=function(){return new RegExp(/^([_]|[a-zA-Z0-9@]){6,16}$/).test(this)},String.prototype.isPostCode=function(){return new RegExp(/^\d{6}?$/).test(this)}}(),function(e){var t=0,n=function(e){var t=this;if("object"==typeof e)for(var n in e)t[n]=e[n];else"string"==typeof e&&(t.targetPage=$(e));t.coverDom=t.coverDom||$("#sidebar-bg"),t.coverDom.click(function(e){e.preventDefault(),t.closeSidebar()})};n.prototype={targetPage:void 0,coverDom:void 0,beforeOpen:function(){},afterClose:function(){},openSidebar:function(n){var o=$(e),i=o.width(),r=(o.height(),this.targetPage.height(),this);r.coverDom.show(),r.targetPage.show().css({width:i}),setTimeout(function(){r.targetPage.addClass("open")},100),t++,$("body").hasClass("move")||$("body").addClass("move").css({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,overflow:"hidden"}),n&&n(),r.beforeOpen&&r.beforeOpen()},closeSidebar:function(e){var n=this;this.targetPage.removeClass("open"),t--,setTimeout(function(){n.coverDom.hide(),n.targetPage.hide(),hasOpend=!1,t<=0&&$("body").removeClass("move").css({width:"auto",height:"auto",overflow:"inherit"}),e&&e(),n.afterClose&&n.afterClose()},220)}},e.SecondPage=n}(window),function(){var e={AUTH:"FLV-AUTH",ACCOUNT:"FLV-ACCOUNT",REMEMBER:"FLV-REMEMBER",LOGIN_HISTORY:"LH",AREA:"FLV-AREA",get:function(e,t){if(this.isLocalStorage()){var n=this.getStorage(t).getItem(e);return n?JSON.parse(n):void 0}},set:function(e,t,n){this.isLocalStorage()&&(t=JSON.stringify(t),this.getStorage(n).setItem(e,t))},remove:function(e,t){this.isLocalStorage()&&this.getStorage(t).removeItem(e)},getStorage:function(e){return e?sessionStorage:localStorage},isLocalStorage:function(){try{return!!window.localStorage||(log("不支持本地存储"),!1)}catch(e){return log("本地存储已关闭"),!1}}};window.Storage=e}(),function(e){e&&(e.openTag="<!--[",e.closeTag="]-->",e.helper("$absImg",function(e,t){return Tools.absImg(e,t)}),e.helper("$formatDate",function(e,t,n){return Tools.formatDate(e,t,n||"--")}),e.helper("$encodeUrl",function(e){return encodeURIComponent(e)}),e.helper("$formatCurrency",function(e,t,n){return Tools.formatCurrency(e,t,n)}),e.helper("$convertRN",function(e){return e?e.replace(/\r\n/gi,"<br/>"):"--"}),e.helper("$addClassByIdx",function(e,t,n){if(e==t)return n||""}),e.helper("$ellipsis",function(e,t){var n=e.replace(/[^\x00-\xff]/g,"__").length;return n/2>t?e.substring(0,t)+"...":e}),e.helper("$getDateFromStr",function(e){if(e&&0!=e.length){var t=e.length>10?10:e.length;return e.substring(0,t)}}),e.helper("$rbyFormatCurrency",function(e){return Tools.rbyFormatCurrency(e)}),e.helper("$addClassByCondition",function(e,t,n){return e?t||"":n||""}),e.helper("$getOrderStatus",function(e,t){return config.ORDER_STATUS[e]||"--"}),e.helper("$addClassForGoods",function(e,t,n){return!e||isNaN(e.limitNum)||isNaN(e.store)||isNaN(e.quantity)?"":(e.limitNum=parseInt(e.limitNum),e.store=parseInt(e.store),e.quantity=parseInt(e.quantity),e.quantity>=Math.min(e.limitNum,e.store)?t||"":n||"")}),e.helper("$getCountDown",function(e,t){return"object"==typeof e?Tools.getRunTime(e.serverTime,e.endTime):Tools.getRunTime(e,t)}),e.helper("$absWechatIcon",function(e){if(!e||0!=e.indexOf("http://"))return"../content/images/common/headicon.png";var t=e.split("/");return t[t.length-1]="96",t.join("/")}))}(window.template),function(){function e(e,t){var n=e,o={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),S:n.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in o)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?o[i]:("00"+o[i]).substr((""+o[i]).length)));return t}var t,n,o,r,a,s=0,l=function(e,t){var n=this;n.panel=e||$("#rby-panel"),n.panelBg=o||$("#rby-panel-bg"),n.panelTitle=n.panel.find(".panel-title"),n.panelTips=n.panel.find(".panel-tips"),n.btnOk=n.panel.find(".btn-primary"),n.btnCancel=n.panel.find(".btn-default"),n.panelText=n.panel.find(".panel-text"),n.panelTick=n.panel.find(".panel-tick"),n.panelImg=n.panel.find(".panel-img"),n.options={type:"error",tick:0,okText:"确定",cancelText:"取消",showTitle:!1,showTips:!1},n.panel.on("click",".btn-primary",function(e){e.preventDefault(),n.hide(!0)}),n.panel.on("click",".btn-default",function(e){e.preventDefault(),n.hide()}),n.panel.on("click",".panel-tips",function(e){e.preventDefault(),n.hide(!0)})};l.prototype={delay:void 0,count:0,setOptions:function(e){var t=this;for(i in e)t.options[i]=e[i];t.options.showTitle?t.panelTitle.show():t.panelTitle.hide(),t.options.showTips?(t.panelTips.show(),t.btnOk.hide()):t.panelTips.hide(),t.options.okText&&t.btnOk.text(t.options.okText),t.options.cancelText&&t.btnCancel.text(t.options.cancelText),t.options.tipsText&&t.panelTips.html(t.options.tipsText),t.options.titleText&&t.panelTitle.text(t.options.titleText),t.options.panelImg&&t.panelImg.attr("src",t.options.panelImg),"confirm"==t.options.type?(t.btnOk.show(),t.btnCancel.show()):t.options.cancelText?t.btnCancel.show():t.btnCancel.hide(),t.panelText.html(t.options.message),t.panel.css("margin-top",-(t.panel.height()/2)).show(),t.panelBg.show(),t.options.tick>1e3?(t.panelTick.text(t.options.tick/1e3),t.delay=setInterval(function(){t.count<t.options.tick-1e3?(t.count=s+1e3,t.panelTick.text((t.options.tick-s)/1e3)):(t._end(),t.count=0,clearInterval(t.delay))},1e3)):t.options.tick<=1e3&&t.options.tick>0&&(t.delay=setTimeout(function(){t._end()},t.options.tick))},_end:function(){var e=this;e.panel.hide(),e.panelBg.hide(),"function"==typeof e.options.tipsCallback?(e.options.tipsCallback(),e.options.tipsCallback=void 0):"function"==typeof e.options.yesCallback&&(e.options.yesCallback(),e.options.yesCallback=void 0),"function"==typeof e.options.noCallback&&e.options.noCallback()},show:function(){},hide:function(e){var t=this;t.delay&&clearTimeout(t.delay),t.panel&&(t.panel.hide(),t.panelBg.hide(),e?("function"==typeof t.options.yesCallback&&t.options.yesCallback(),"function"==typeof t.options.tipsCallback&&t.options.tipsCallback()):"function"==typeof t.options.noCallback&&t.options.noCallback(),t.options.yesCallback=void 0,t.options.noCallback=void 0,t.options.tipsCallback=void 0)}};var p={absImg:function(e,t){return e?e&&0==e.indexOf("http")?e:config.HOST_IMAGE+e:t||config.DEF_IMG_URL},formatDate:function(t,n,o){var i=n||"yyyy-MM-dd hh:mm";if(isNaN(t)||null==t)return o||t;if("object"==typeof t){var r=dd.getFullYear(),a=dd.getMonth()+1,s=dd.getDate();a<10&&(a="0"+a);var l=r+"-"+a+"-"+s,p=l.match(/(\d+)/g),u=new Date(p[0],p[1]-1,p[2]);return e(u,i)}10==t.length&&(t+="000");var u=new Date(parseInt(t));return e(u,i)},formatCurrency:function(e,t,n){if(!e)return t||"--";e+="";var o,i,r=e.indexOf(".");r>0?(o=e.substring(0,r),i=e.substring(r,e.length)):(o=e,i="");var a=o.toString().length%3,s="";return 1==a?s="00":2==a&&(s="0"),o=s+o,o=o.replace(/(\d{3})/g,"$1,"),o=o.substring(0,o.length-1),s.length>0&&(o=o.replace(s,"")),i&&(2==i.length?i+="0":1==i.length&&(i+="00"),i=i.substring(0,3)),o+i},strToDate:function(e){var t=e.split(" "),n=t[0].split("-"),o=parseInt(n[0],10),i=parseInt(n[1],10)-1,r=parseInt(n[2],10),a=t[1].split(":"),s=parseInt(a[0],10),l=parseInt(a[1],10)-1,p=parseInt(a[2],10),u=new Date(o,i,r,s,l,p);return u},getRunTime2:function(e,t){if(!e||isNaN(e)||!t||isNaN(t))return"数据错误";var n=parseInt(t)-parseInt(e);if(n<=0)return"已结束";var o=Math.floor(n/86400),i=Math.floor(n/3600)%24,r=Math.floor(n/60)%60,a=Math.floor(n)%60;return o+"天"+p.checkTime(i)+"小时"+p.checkTime(r)+"分钟"+p.checkTime(a)+"秒"},getRunTime:function(e,t){if(!e||isNaN(e)||!t||isNaN(t))return"数据错误";var n=parseInt(t)-parseInt(e);if(n<=0)return"已结束";var o=Math.floor(n/86400),i=Math.floor(n/3600)%24,r=Math.floor(n/60)%60,a=Math.floor(n)%60;return"剩余 <span><em>"+p.checkTime(o)+"</em>天<em>"+p.checkTime(i)+"</em>时<em>"+p.checkTime(r)+"</em>分<em>"+p.checkTime(a)+"</em>秒</span> 结束"},checkTime:function(e){return e<10&&(e="0"+e),e},getQueryValue:function(e){var t=location.search,n=new Array;if(t.length>1){var o=t.indexOf("?");t=t.substring(o+1,t.length)}else t=null;if(t)for(var i=0;i<t.split("&").length;i++)n[i]=t.split("&")[i];for(var r=0;r<n.length;r++)if(n[r].split("=")[0]==e)return decodeURI(n[r].split("=")[1]);return""},getWindow:function(){return{width:window.innerWidth,height:window.innerHeight}},getDocument:function(){var e=document.documentElement||document.body;return{width:e.clientWidth,height:e.clientHeight}},getScreen:function(){return{width:screen.width,height:screen.height}},showOrHideScrollBar:function(e){t=t||function(e){e.preventDefault()},(document.documentElement||document.body).style.overflow=e?"auto":"hidden",e?document.removeEventListener("touchmove",t,!1):document.addEventListener("touchmove",t,!1)},showDialog:function(){},showOverlay:function(){},showConfirm:function(e,t,o){var i={};"object"==typeof e?i=e:(i.message=e,i.yesCallback=t,i.noCallback=o),i.type="confirm",i.showTitle=!0,i.showTip=!1,i.titleText="提示",n=n||new l,n.setOptions(i)},showAlert:function(e,t,o){var i={};i="object"==typeof e?e:{showTips:!0,tipsText:"我知道了",showTitle:!0,message:e,titleText:"提示",cancelText:!1,panelImg:"img/tip.png",tipsCallback:o,tick:t},n=n||new l,n.setOptions(i)},showLoading:function(){$("#rby-loading").show()},hideLoading:function(){$("#rby-loading").hide()},hidePanel:function(e){n&&n.hide(e)},showToast:function(e,t){a=a||$("#rby-toast"),t=t||1e3,r&&clearTimeout(r),a.find("span").text(e),a.show(),r=setTimeout(function(){a.hide()},t)},isIPad:function(){return/iPad/gi.test(navigator.appVersion)},isIos:function(){return/iphone|iPad/gi.test(navigator.appVersion)},isAndroid:function(){return/android/gi.test(navigator.appVersion)},isWeChatBrowser:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)},isRbyAppBrowser:function(){var e=navigator.userAgent.toLowerCase();return"rbyapp"==e.match(/rbyapp/i)},isAlipayBrowser:function(){var e=navigator.userAgent.toLowerCase();return"alipay"==e.match(/Alipay/i)},isFDBrowser:function(){var e=navigator.userAgent.toLowerCase();return"fd"==e.match(/FD/i)},returnUserAgent:function(){return this.isAlipayBrowser()?"alipay":this.isWeChatBrowser()?"wechat":this.isFDBrowser()?"fruitday-app":this.isGatApp()?"gat":this.isCmbApp()?"cmb":"fruitday-web"},isFruitdayAppBrowser:function(){var e=navigator.userAgent;return"FD_iPhone"==e.match(/FD_iPhone/i)||"FD_Android"==e.match(/FD_Android/i)},isFruitdayAndroidBrowser:function(){var e=navigator.userAgent;return"FD_Android"==e.match(/FD_Android/i)},isFruitdayiOSBrowser:function(){var e=navigator.userAgent;return"FD_iPhone"==e.match(/FD_iPhone/i)},isGatApp:function(){var e=navigator.userAgent;return"GatApp"==e.match(/GatApp/i)},isCmbApp:function(){var e=navigator.userAgent;return"MPBank"==e.match(/MPBank/i)},formJson:function(e){var t={},n=$(e).serializeArray();return $.each(n,function(){void 0!==t[this.name]?(t[this.name].push||(t[this.name]=[t[this.name]]),t[this.name].push(this.value||"")):t[this.name]=this.value||""}),t},alert:function(e){1==Cookie.get("DevDebug")?alert(e):console.log(e)},_GET:function(){var e=location.search,t={};if(""===e||void 0===e)return t;e=e.substr(1).split("&");for(var n in e){var o=e[n].split("=");t[o[0]]=o[1]}return t.from&&delete t.code,t},removeParamFromUrl:function(e){var t=p._GET();for(var n in e)delete t[e[n]];return location.pathname+p.buildUrlParamString(t)},buildUrlParamString:function(e){var t="";for(var n in e)t+=n+"="+e[n]+"&";t=t.slice(0,t.length-1);var o=""===t||void 0===t;return o?"":"?"+t},rbyFormatCurrency:function(e){if(!e||isNaN(e))return e;var t=parseFloat(e),n=t.toFixed(2);return n.indexOf(".00")>=0&&(n=parseFloat(e).toFixed(0)),n}};window.Tools=p}();