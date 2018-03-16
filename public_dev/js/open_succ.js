var deviceId = Cookie.get("deviceId");
(function() {

    function ready(callback) {
        // 如果jsbridge已经注入则直接调用
        if (window.AlipayJSBridge) {
            callback && callback();
        } else {
            // 如果没有注入则监听注入的事件
            document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
    }

    document.addEventListener('resume', function (event) {
        AlipayJSBridge.call('closeWebview');
    });

    document.addEventListener('pause', function (e) {
        AlipayJSBridge.call('closeWebview');
    }, false);

    pushHistory();
    window.addEventListener("popstate", function(e) {
        pushHistory();
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            WeixinJSBridge.call('closeWindow');
        } else if(ua.indexOf("alipay")!=-1){
            AlipayJSBridge.call('closeWebview');
        } else{
            window.close();
        }
    }, false);
    function pushHistory() {
        var state = {
            title: "",
            url: "#"
        };
        window.history.pushState(state, "", "#");
    }

    // history.replaceState(null,null,'index.html');//修改history.back

    common.checkLoginStatus(function() {
        var timer = setInterval(function(){ajax_wx_pay_status(timer)},3000);
    })
})()
function ajax_wx_pay_status(timer) {
    Ajax.custom({
        url: config.API_FD_BOX_STATUS,
        data:{
            device_id: deviceId,
        },
        type: 'GET',
        showLoading: false
    }, function(response) {
        console.log(response);
        if(response.status == "stock"){
            $('#rby-loading1').show();
        }else if(response.status == "pay_succ"){
            clearInterval(timer);
            location.href='buy_succ.html?order_name='+response.order_name+'&deviceId='+deviceId;//只显示关闭按钮
        }else if(response.status == "free"){
            location.href='index.html';
        }
    }, function(e) {
        // Tools.showAlert(e.message || '服务器异常');
    });
}
