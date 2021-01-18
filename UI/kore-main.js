(function ($) {

    var _hash = (location.href.split("#")[1] || "");
    // var _hash = "eyJqd3QiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTVRBME16RTJNRGswTmpjc0ltVjRjQ0k2TVRZeE1EUXpNVFkyT1RRMk55d2lZWFZrSWpvaUlpd2lhWE56SWpvaVkzTXROMkUyTkdZelpUVXRZelkxTXkwMVpXUTNMVGt4T1RjdE9EUmpNR1UzTjJOak1qRmxJaXdpYzNWaUlqb2lZMkV5T1RJNFltSmxNV1kxTVRCaE9ERXhaRFU0Wm1Gak9XTXhZalprTmpNME1pSXNJbWx6UVc1dmJubHRiM1Z6SWpwbVlXeHpaWDAuOGRib3JwTEhWTm9BUE5OSVhzN1VhQ2hqNF9yS1o3bU1fRFdQTUxxa0txcyIsImJvdEluZm8iOnsibmFtZSI6IkJhbmtpbmcgQXNzaXN0IiwiX2lkIjoic3QtY2RlZmNlMGYtOWVlZC01NGM1LWIzZDctM2MxYjJmODNiOGVjIn0sImtvcmVBUElVcmwiOiJodHRwczovL2Jhbmtpbmdhc3Npc3RhbnQtcWEua29yZS5haTo0NDMvIiwiY2hhbm5lbCI6InJ0bSJ9"
    var hashObj = {};

    if (_hash) {
        try {
            _hash = _hash.substr(0, _hash.length);
            hashObj = atob(_hash);
            //parses the JSON string to object
            hashObj = JSON.parse(hashObj);
        } catch (error) {
            alert("Something went wrong. Please try again.." + error);
        }

    }

    $(document).ready(function () {

        function koreGenerateUUID() {
            console.info("generating UUID");
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        function getQueryStringValue(key) {
            return window.location.search.replace(new RegExp("^(?:.*[&\\?]" + key.replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
        }

        function assertion(options, callback) {
            //console.log(options.botInfo.customData.tenantId);
            if (hashObj && hashObj.jwt) {
                options.assertion = hashObj.jwt;
                options.handleError = koreBot.showError;
                options.chatHistory = koreBot.chatHistory;
                options.botDetails = koreBot.botDetails;
                callback(null, options);
            } else if(chatConfig.isFromFinastra){
                var jsonData = {
                    "tenantId": "mlz-b2c-vader" || options.botInfo.customData.tenantId,
                    "uniqueUserId": "luke_~#$$#~_mlz-b2c-vader" || options.botInfo.customData.uniqueUserId,
                };
                $.ajax({
                    url: options.JWTUrl,
                    type: 'post',
                    data: jsonData,
                    dataType: 'json',
                    success: function (data) {
                        options.botInfo.chatBot = data.botInfo.name;
                        chatConfig.botOptions.botInfo.name = data.botInfo.name;
                        options.botInfo.taskBotId = data.botInfo._id;
                        chatConfig.botOptions.botInfo._id = data.botInfo._id;
                        options.koreAPIUrl = data.koreAPIUrl;
                        options.brandingAPIUrl = data.koreAPIUrl + 'workbench/sdkData?objectId=hamburgermenu&objectId=brandingwidgetdesktop';
                        options.assertion = data.jwt;
                        options.uniqueUserId = data.uniqueUserId;
                        options.handleError = koreBot.showError;
                        options.chatHistory = koreBot.chatHistory;
                        // options.botDetails = koreBot.botDetails(data);
                        callback(null, options);
                        setTimeout(function () {
                            CheckRefreshToken(options);
                        }, 2000);
                        
                    },
                    error: function (err) {
                        koreBot.showError(err.responseText);
                    }
                });
            } else {
                var jsonData = {
                    "clientId": options.clientId,
                    "clientSecret": options.clientSecret,
                    "identity": uuid,
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
                        callback(null, options);
                    },
                    error: function (err) {
                        koreBot.showError(err.responseText);
                    }
                });
            }
        }

        function getBrandingInformation(options) {
            $.ajax({
                url: this.brandingAPIUrl,
                headers: {
                    'tenantId': chatConfig.botOptions.accountId,
                    'Authorization': "bearer " + options.authorization.accessToken,
                    'Accept-Language': 'en_US',
                    'Accepts-version': '1',
                    'botId': chatConfig.botOptions.botInfo._id,
                    'state': 'published'
                },
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    options.botDetails = koreBot.botDetails(data[1].brandingwidgetdesktop);
                    chatConfig.botOptions.hamburgermenuData = data[0].hamburgermenu;
                    if (koreBot && koreBot.initToken) {
                        koreBot.initToken(options);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

        function CheckRefreshToken(options){
            debugger
            var jsonData = {
                "userId": window.jwtDetails.userInfo.userId,
                "uniqueUserId": options.uniqueUserId
            };
            $.ajax({
                url: "https://staging-bankassist.korebots.com/finastra-wrapper/uniqueUser",
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                    if (koreBot && koreBot.initToken) {
                        koreBot.initToken(options);
                    }
                }
            });
        }
        
        var korecookie = localStorage.getItem("korecom");
        var uuid = getQueryStringValue('uid');
        if (uuid) {
            console.log(uuid);
        } else {
            uuid = koreGenerateUUID();
        }
        localStorage.setItem("korecom", uuid);
        var chatConfig = window.KoreSDK.chatConfig;
        chatConfig.botOptions.assertionFn = assertion;
        chatConfig.botOptions.jwtgrantSuccessCB = getBrandingInformation;

        if (hashObj && hashObj.botInfo) {
            chatConfig.botOptions.botInfo = hashObj.botInfo;
        }

        if (hashObj.koreAPIUrl) {
            chatConfig.botOptions.koreAPIUrl = hashObj.koreAPIUrl + '/api/';
        }

        // if (hashObj.brand && hashObj.brand.headerTitle) {
        //     chatConfig.chatTitleOverride = hashObj.brand.headerTitle;
        // }

        var koreBot = koreBotChat();
        koreBot.show(chatConfig);
        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));