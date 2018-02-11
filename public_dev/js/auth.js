(function() {
    var container = $('#index-content');
    var deviceId = Tools._GET().deviceId || 0;
    if(deviceId)
    {
        Cookie.set("deviceId", deviceId, null);
        Tools.alert('auth'+Cookie.get("deviceId"));
    }
    var type = "";
    if(Tools.isAlipayBrowser()){
        type = "alipay";
    }else if(Tools.isWeChatBrowser()){
        type = "wechat";
    }

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


    function open(){
        history.replaceState(null,null,'index.html');//修改history.back
        Ajax.custom({
            url: config.API_OPEN_DOOR,
            data:{
                device_id: deviceId,
                type:type
            },
            type: 'POST',
            showLoading: false
        }, function(response) {
            if(response['status'] == 'error' && response['url']){
                location.href = response['url'];
                return false;
            }else if(response['status'] == 'limit_open_refer'){
                //限制开门方式
                if(response.message){
                    var opt = {
                        showTips:true,
                        tipsText:"我知道了",
                        showTitle:true,
                        message: response.message || '网络不太好，稍后重试',
                        titleText:"开门失败",
                        cancelText:false,
                        panelImg:'img/Openning_close@2x.png',
                        tipsCallback:function () {
                            if(response['redirect_url']){
                                location.href = response['redirect_url']
                            }else{
                                location.href = 'index.html?deviceId='+deviceId;
                            }
                        },
                    }
                    Tools.showAlert(opt);
                }
                return false;
            }else{
                location.href='open_succ.html?from=auth&deviceId='+deviceId;
            }
        }, function(e) {
            if (e.message.substring(0, 4) == "您有未支") {
                var opt = {
                    showTitle:true,
                    message: '有未支付订单，需先完成支付，才能继续开门购物',
                    titleText:"您有未支付订单",
                    cancelText:"取消",
                    okText:"去支付",
                    panelImg:'img/Openning_list@2x.png',
                    yesCallback:function () {
                        location.href='orders.html?status=0';
                    },
                    noCallback:function () {
                        location.href = 'index.html?deviceId='+deviceId;
                    }
                }
                Tools.showAlert(opt);
                return;
            }else{
                var opt = {
                    showTips:true,
                    tipsText:"我知道了",
                    showTitle:true,
                    message: e.message || '网络不太好，稍后重试',
                    titleText:"开门失败",
                    cancelText:false,
                    panelImg:'img/Openning_close@2x.png',
                    tipsCallback:function () {
                        location.href = 'index.html?deviceId='+deviceId;
                    },
                }
                Tools.showAlert(opt);
            }
        })
    }


    container.on('click', '.empty-page-tip', function() {
        open();//再次开门
    });
    common.checkLoginStatus(function() {
        // container.html('<div class="empty-page-tip">请求开门中，请稍后...</div>');
        open();
    })
})()


