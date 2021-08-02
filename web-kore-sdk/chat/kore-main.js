(function ($) {

    var _hash = (location.href.split("#")[1] || "");
    // var _hash = "eyJqd3QiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTVRrME16UTFOVFkxTXpnc0ltVjRjQ0k2TVRZeE9UUXpORFUxTnpRek9Dd2lZWFZrSWpvaUlpd2lhWE56SWpvaVkzTXROVFppWW1WaVpUWXRaams1WkMwMU56SXdMV0poTldNdE1EQXdOamN4WmpNNVl6UTBJaXdpYzNWaUlqb2lOalJrTWpGaFpqSXRPVGt3TWkwMFlqY3hMV0psT1RndE5tVmlOak00T1RFd05qZGpJaXdpYVhOQmJtOXVlVzF2ZFhNaU9tWmhiSE5sZlEuaU10bFAwZlpZWGp3dEJabC1UelR6SnJQTl9QRy1OdnItTTYwYm1MWExJdyIsImJvdEluZm8iOnsibmFtZSI6IkJhbmtBc3Npc3QgRGV2IiwiX2lkIjoic3QtZmJkZWQ5MTktMjhjNC01MTYyLWI0ZmEtODgyNWE5OWRhOGZmIn0sImtvcmVBUElVcmwiOiJodHRwczovL2Jhbmtpbmdhc3Npc3RhbnQtcWEtYm90cy5rb3JlLmFpOjQ0My8iLCJjaGFubmVsIjoicnRtIn0="
    // var _hash = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjAxMTI5ODMsImV4cCI6MTYyMDExMzA0MywiYXVkIjoiaHR0cHM6Ly9iYW5raW5nYXNzaXN0YW50LWlkcC1kZXYua29yZS5haS9hdXRob3JpemUiLCJpc3MiOiI1YTM3YmYyNC1mZWEwLTRlNmItYTgxNi1mOTYwMmRiMDgxNDkiLCJzdWIiOiJ3b3JrYmVuY2hkZXZAYWJjLmNvbSJ9.YuK4yJVkIP_IpU4hZ2svbUnvBeFhTvv5QIMlPZCIJqvmXJSUw9iedZ4R7ZKyAVGqq0-W6YOY1Qsh9aqSQdypnXHVqFVaKE9RAI3H8sam7esEMgi_ghLaxjiFO2gzCWILpgClum-4TElBD__11qtmxIOaNa54rXf4UQUVD3E8PBMIP-vxuX-Hc75eTnwrvQfaOZB0FJtzNSnfoB6FHi_A3Fve7Zc47C857RrPEqXGzNK7Rfn5kTQPXQMXjndX9GHQAXOpfFq2NuTlox4wIyDKABWxW5YFvfdQKkrxq66wAdJ1HeUjRMizEwEe7k-NvhJ_owkjJJ2Ce_FiDUdfZsmOYg";
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
            if (hashObj && hashObj.jwt) {
                options.assertion = hashObj.jwt;
                options.handleError = koreBot.showError;
                options.chatHistory = koreBot.chatHistory;
                options.botDetails = koreBot.botDetails;
                options.brandingAPIUrl = options.koreAPIUrl + 'workbench/sdkData?objectId=hamburgermenu&objectId=brandingwidgetdesktop';
                callback(null, options);
            } else if(chatConfig.isFromFinastra){
                var jsonData = {
                    "tenantId": options.botInfo.customData.tenantId,
                    "uniqueUserId": options.botInfo.customData.uniqueUserId,
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
            if(hashObj.koreAPIUrl === 'https://bots.kore.ai'){
                hashObj.koreAPIUrl === 'https://bankassist.kore.ai';
                chatConfig.botOptions.koreAPIUrl = hashObj.koreAPIUrl + 'workbench/api/';
            } else {
                chatConfig.botOptions.koreAPIUrl = hashObj.koreAPIUrl + 'workbench/api/';
            }
        }

        if (hashObj.brand && hashObj.brand.headerTitle) {
            chatConfig.chatTitleOverride = hashObj.brand.headerTitle;
        }

        var koreBot = koreBotChat();
        koreBot.show(chatConfig);
        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));