(function($){

    var _hash =(location.href.split("#")[1] || ""); //window.location.hash;//ewogICJKV1RVcmwiOiAiaHR0cHM6Ly9tazJyMnJtajIxLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2Rldi91c2Vycy9zdHMiLAogICJ1c2VySWRlbnRpdHkiOiAicmFqYXNla2hhci5iYWxsYUBrb3JlLmNvbSIsCiAgImJvdEluZm8iOiB7CiAgICAibmFtZSI6ICJTREtCb3QiLAogICAgIl9pZCI6ICJzdC1iOTg4OWM0Ni0yMThjLTU4ZjctODM4Zi03M2FlOTIwMzQ4OGMiCiAgfSwKICAiY2xpZW50SWQiOiAiY3MtMWU4NDViMDAtODFhZC01NzU3LWExZTctZDBmNmZlYTIyN2U5IiwKICAiY2xpZW50U2VjcmV0IjogIjVPY0JTUXRIL2s2US9TNkEzYnNlWWZPZWUwMllqakxMVE5vVDFxWkRCc289Igp9
    //ewogICJqd3QiOiAiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMU9EVTRNVEEzTmpnNE5EUXNJbVY0Y0NJNk1UVTROVGc1TnpFMk9EZzBOQ3dpWVhWa0lqb2lhSFIwY0hNNkx5OXBaSEJ5YjNoNUxtdHZjbVV1WTI5dEwyRjFkR2h2Y21sNlpTSXNJbWx6Y3lJNkltTnpMVEZsT0RRMVlqQXdMVGd4WVdRdE5UYzFOeTFoTVdVM0xXUXdaalptWldFeU1qZGxPU0lzSW5OMVlpSTZJbkpoYW1GelpXdG9ZWEl1WW1Gc2JHRkFhMjl5WlM1amIyMGlMQ0pwYzBGdWIyNTViVzkxY3lJNkltWmhiSE5sSW4wLlJIUXBoRWw1ZjVJWURDNUdWOGtvYXpPajNNWWN1V2Vfd1ZqX2FramxzRjAiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiU0RLQm90IiwKICAgICJfaWQiOiAic3QtYjk4ODljNDYtMjE4Yy01OGY3LTgzOGYtNzNhZTkyMDM0ODhjIgogIH0KfQ==
    //unblu: https://9a17d4decf63.ngrok.io/chat/#ewogICJqd3QiOiAiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBZWFFpT2pFMU9URTNNRGN5TWpnNE16SXNJbVY0Y0NJNk1UVTVNVGN3TnpJNE9EZ3pNaXdpWVhWa0lqb2lJaXdpYVhOeklqb2lZM010TXpObVpEVXdNVFV0WWpabU9TMDFOalF6TFRoaU1qRXRPRGd5TldSbU4yTmxPV1ZqSWl3aWMzVmlJam9pUkRFMU9URTNNRGN5TWpnNE16SWlMQ0pwYzBGdWIyNTViVzkxY3lJNlptRnNjMlY5LkdNV3VZZGpFZkVyWnkybmFYMFhSQ0NzUzd0Sm9ENE5KVjQweURwVG9pb0kiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiQmFua2luZyBTb2x1dGlvbiAyLjAgSVZSIiwKICAgICJfaWQiOiAiWHN0LTEzM2JiNWQ2LTAzZGMtNWZhOS05NmUyLTM5NDVmZmY3M2RmYyIKICB9LAogICJrb3JlQVBJVXJsIjogImh0dHBzOi8vYm90cy5rb3JlLmFpLyIsCiAgInRhc2t0b3RyaWdnZXIiOiAid3JpdGUgdG8gdXMiLAogICJjaGFubmVsIjogInVuYmx1IiwKICAidW5ibHUiOiB7CiAgICAic3ViIjogIkQxNTk1ODMxMTg3MzAwIiwKICAgICJpc0Fub255bW91cyI6IGZhbHNlLAogICAgIm5hbWVkQXJlYU5hbWVzIjogIm1ldGF0YWdpZCIsCiAgICAidW5ibHVIb3N0VXJsIjogImh0dHBzOi8va29yZS5kZXYudW5ibHUtdGVzdC5jb20iLAogICAgImFwaWtleSI6ICJNWnN5NXNGRVNZcVU3TWF3WFpnUl93IgogIH0KfQ==
    var hashObj = {};

    if (_hash) {
        try {
            _hash = _hash.substr(0, _hash.length);
            
            // remove fragment as much as it can go without adding an entry in browser history:
            //window.location.replace("#");

            // slice off the remaining '#' in HTML5:    
            //if (typeof window.history.replaceState == 'function') {
            //    history.replaceState({}, '', window.location.href.slice(0, -1));
            //}
            //decode the hash in base64

            hashObj = atob(_hash);

            //parses the JSON string to object
            hashObj = JSON.parse(hashObj);

            // if (hashObj && hashObj.botInfo && hashObj.botInfo._id) {
            //     var REDIRECT_CONFIG = [
            //         {
            //             botId: "st-133bb5d6-03dc-5fa9-96e2-3945fff73dfc",
            //             redirectUrl: "http://demo.kore.net/BankingSolutionIVR/bot/"
            //         }, {
            //             botId: "st-13202efd-b6fe-593c-882f-78234643eed3",
            //             redirectUrl: "https://demo.kore.ai/bankingv1/bot/"
            //         }, {
            //             botId: "st-f5d88710-55be-5e57-be79-6be4e60a20b7",
            //             redirectUrl: "https://demo.kore.ai/beta_bankingv1/bot/"
            //         }, {
            //             botId: "st-c6ea2967-8e9e-510d-9f30-4841f9f8d8f1",
            //             redirectUrl: "https://demo.kore.ai/bankingv1/bot/"
            //         }
            //     ];
            //     var _redirectConfigIndex = REDIRECT_CONFIG.map(function (o) { return o.botId; }).indexOf(hashObj.botInfo._id);
            //     if (_redirectConfigIndex > -1) {
            //         window.location.href = REDIRECT_CONFIG[_redirectConfigIndex].redirectUrl + '#' + _hash;
            //     }
            // }

            
        } catch (error) {
            alert("Something went wrong. Please try again.."+error);
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
            if(hashObj && hashObj.jwt){
                options.assertion = hashObj.jwt;
                options.handleError = koreBot.showError;
                options.chatHistory = koreBot.chatHistory;
                options.botDetails = koreBot.botDetails;
                callback(null, options);
                setTimeout(function () {
                    if (koreBot && koreBot.initToken) {
                        koreBot.initToken(options);
                    }
                }, 2000);
            } else {
                var jsonData = {
                    "tenantId": "mmbdemo-uat" || options.botInfo.customData.tenantId
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
                        options.assertion = data.jwt;
                        options.uniqueUserId = data.uniqueUserId;
                        options.handleError = koreBot.showError;
                        options.chatHistory = koreBot.chatHistory;
                        options.botDetails = koreBot.botDetails(data);
                        callback(null, options);
                        setTimeout(function () {
                            CheckRefreshToken(options);
                        }, 2000);
                    },
                    error: function (err) {
                        koreBot.showError(err.responseText);
                    }
                });
            }
        }
        function CheckRefreshToken(options){
            var jsonData = {
                "userId":window.jwtDetails.userId,
                "uniqueUserId":options.uniqueUserId
            };
            $.ajax({
                url: "https://demodpd.kore.ai/finastraLoginDEMO/uniqueUser",
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
        var chatConfig=window.KoreSDK.chatConfig;
        chatConfig.botOptions.assertionFn=assertion;

        if(hashObj&& hashObj.botInfo){
            chatConfig.botOptions.botInfo=hashObj.botInfo;
        }
        
        if(hashObj.koreAPIUrl){
            chatConfig.botOptions.koreAPIUrl=hashObj.koreAPIUrl+'/api/';
        }
        
        if(hashObj.brand && hashObj.brand.headerTitle){
            chatConfig.chatTitleOverride=hashObj.brand.headerTitle;
        }

        //chatConfig.tasktotrigger="Write To Us";    
        // if (hashObj.tasktotrigger) {
        //     chatConfig.tasktotrigger= hashObj.tasktotrigger;
        // }

        var koreBot = koreBotChat();
        koreBot.show(chatConfig);
        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));