(function ($) {

    $(document).ready(function () {
        function assertion(options, callback) {
            var jsonData = {
                "clientId": options.clientId,
                "clientSecret": options.clientSecret,
                "identity": options.userIdentity,
                "aud": "",
                "isAnonymous": false
            };
            $.ajax({
                url: options.JWTUrl,
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                    options.assertion = data.jwt;
                    options.handleError = koreBot.showError;
                    options.chatHistory = koreBot.chatHistory;
                    options.botDetails = koreBot.botDetails;
                    callback(null, options);
                    setTimeout(function () {
                        if (koreBot && koreBot.initToken) {
                            koreBot.initToken(options);
                        }
                    }, 2000);
                },
                error: function (err) {
                    koreBot.showError(err.responseText);
                }
            });
        }

        function getJWT(options, callback) {
            var jsonData = {
                "clientId": options.clientId,
                "clientSecret": options.clientSecret,
                "identity": options.userIdentity,
                "aud": "",
                "isAnonymous": false
            };
            return $.ajax({
                url: options.JWTUrl,
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                },
                error: function (err) {
                }
            });
        }
        function getBrandingInformation(options) {
            if (chatConfig.botOptions.enableThemes) {
                var brandingAPIUrl = (chatConfig.botOptions.brandingAPIUrl || '').replace(':appId', chatConfig.botOptions.botInfo._id);
                $.ajax({
                    url: brandingAPIUrl,
                    headers: {
                        'Authorization': "bearer " + options.authorization.accessToken,
                    },
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        if(koreBot && koreBot.applySDKBranding) {
                            koreBot.applySDKBranding(data);
                        }
                        if (koreBot && koreBot.initToken) {
                            koreBot.initToken(options);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }

        }
        function onJWTGrantSuccess(options){
            getBrandingInformation(options);
        }

        var widgetsConfig=window.KoreSDK.widgetsConfig;

        var wizSelector = {
            menu: ".kr-wiz-menu-chat",
            content: ".kr-wiz-content-chat"
        }
        var wSdk = new KoreWidgetSDK(widgetsConfig);

        getJWT(widgetsConfig.botOptions).then(function (res) {
            wSdk.setJWT(res.jwt);
            wSdk.show(widgetsConfig, wizSelector);
        }, function (errRes) {
            console.error("Failed getting JWT " + errRes)
        });

        //chat window 
        var chatConfig = window.KoreSDK.chatConfig;
        chatConfig.botOptions.assertionFn = assertion;
        chatConfig.botOptions.jwtgrantSuccessCB = onJWTGrantSuccess;
        chatConfig.widgetSDKInstace=wSdk;//passing widget sdk instance to chatwindow 

        var koreBot = koreBotChat();
        koreBot.show(chatConfig);

        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });

    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));