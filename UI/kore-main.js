(function ($) {

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

        var koreBot = koreBotChat();
        koreBot.show(chatConfig);
        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));