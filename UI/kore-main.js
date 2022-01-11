

(function ($) {
    //$( document ).ready(function() {

    function getPageTitle() {
        var title = document.title;
        var metaTags = document.getElementsByTagName("meta");
        if (metaTags && metaTags.length > 0) {
            for (var i = 0; i < metaTags.length; i++) {
                if (metaTags[i].name === 'title' || metaTags[i].name === 'og:title') {
                    title = metaTags[i].content;
                } 
            }
        }
        console.log("page title ", title);
        return title;
    }
    function koreGenerateUUID() {
        console.info("generating UUID");
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'u-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    // var _hash = "eyJqd3QiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTURNeU9EazVNREV3TURrc0ltVjRjQ0k2TVRZd016STRPVGsyTVRBd09Td2lZWFZrSWpvaUlpd2lhWE56SWpvaVkzTXROMkUyTkdZelpUVXRZelkxTXkwMVpXUTNMVGt4T1RjdE9EUmpNR1UzTjJOak1qRmxJaXdpYzNWaUlqb2lZMkV5T1RJNFltSmxNV1kxTVRCaE9ERXhaRFU0Wm1Gak9XTXhZalprTmpNME1pSXNJbWx6UVc1dmJubHRiM1Z6SWpwbVlXeHpaWDAucFFVN1Nhc2p3RnJlMlB4RjVFd0hkUWhTWmNVTzBzNHRQLU9GWTFNUnJfMCIsImJvdEluZm8iOnsibmFtZSI6IkJhbmtpbmcgQXNzaXN0IiwiX2lkIjoic3QtY2RlZmNlMGYtOWVlZC01NGM1LWIzZDctM2MxYjJmODNiOGVjIn0sImtvcmVBUElVcmwiOiJodHRwczovL2Jhbmtpbmdhc3Npc3RhbnQtcWEua29yZS5haTo0NDMvIiwiY2hhbm5lbCI6InJ0bSJ9";
    // var _hash = "eyJqd3QiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTURNNU56azVPVGszTkRnc0ltVjRjQ0k2TVRZd016azRNREExT1RjME9Dd2lZWFZrSWpvaUlpd2lhWE56SWpvaVkzTXRZVFF4WW1Wak56Y3ROelpoTWkwMVpqRXpMVGt5TmpndE16azRObUl4TVRFM00yTTBJaXdpYzNWaUlqb2lSREUyTURNNU56azVPVGszTkRnaUxDSnBjMEZ1YjI1NWJXOTFjeUk2Wm1Gc2MyVjkuUlROcU1FX01yZ3lXUGpxRkVWSXM1dE1nTExzWW9HRjRIYnhkSUlqWVpTMCIsImJvdEluZm8iOnsibmFtZSI6IlNtYXJ0QXNzaXN0IEFJIDE2MDM4Nzg1NTgwMDAiLCJfaWQiOiJzdC0xMzhlZTc3MC03MDVlLTU3YTktOGYyMi1iNzRkOGRkODYzYTkifSwia29yZUFQSVVybCI6Imh0dHBzOi8vc3RhZ2luZy1ib3RzLmtvcmVib3RzLmNvbS8iLCJjaGFubmVsIjoicnRtIn0=";
    // var _hash = "eyJqd3QiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTVRBME1qZzNNems1TnpRc0ltVjRjQ0k2TVRZeE1EUXlPRGM1T1RrM05Dd2lZWFZrSWpvaUlpd2lhWE56SWpvaVkzTXRaRFUwTURneU1HWXRObU5oTlMwMU1Ua3hMV0V5TnpVdE16SmhOVFU1Wm1ZMk1tRmhJaXdpYzNWaUlqb2lSREUyTVRBME1qZzNNems1TnpRaUxDSnBjMEZ1YjI1NWJXOTFjeUk2Wm1Gc2MyVjkuaEF0WmNOcHAxaWc1WndRSjBmR2tIdEswT21XdDVRR0VRWWRvbEJ2bEFEVSIsImJvdEluZm8iOnsibmFtZSI6IlNtYXJ0QXNzaXN0IEFJIDE2MTAwMDY5MDkwMzUiLCJfaWQiOiJzdC1kMTVhZWYwNi1jOGM3LTU0NmUtOWFlYi0zOWJjNDU0YzE3OWMifSwia29yZUFQSVVybCI6Imh0dHBzOi8vdWF0LmtvcmUuYWk6NDQzLyIsImNoYW5uZWwiOiJydG0ifQ==";
    var _hash =(location.href.split("#")[1] || ""); //window.location.hash;//ewogICJKV1RVcmwiOiAiaHR0cHM6Ly9tazJyMnJtajIxLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2Rldi91c2Vycy9zdHMiLAogICJ1c2VySWRlbnRpdHkiOiAicmFqYXNla2hhci5iYWxsYUBrb3JlLmNvbSIsCiAgImJvdEluZm8iOiB7CiAgICAibmFtZSI6ICJTREtCb3QiLAogICAgIl9pZCI6ICJzdC1iOTg4OWM0Ni0yMThjLTU4ZjctODM4Zi03M2FlOTIwMzQ4OGMiCiAgfSwKICAiY2xpZW50SWQiOiAiY3MtMWU4NDViMDAtODFhZC01NzU3LWExZTctZDBmNmZlYTIyN2U5IiwKICAiY2xpZW50U2VjcmV0IjogIjVPY0JTUXRIL2s2US9TNkEzYnNlWWZPZWUwMllqakxMVE5vVDFxWkRCc289Igp9
    //ewogICJqd3QiOiAiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMU9EVTRNVEEzTmpnNE5EUXNJbVY0Y0NJNk1UVTROVGc1TnpFMk9EZzBOQ3dpWVhWa0lqb2lhSFIwY0hNNkx5OXBaSEJ5YjNoNUxtdHZjbVV1WTI5dEwyRjFkR2h2Y21sNlpTSXNJbWx6Y3lJNkltTnpMVEZsT0RRMVlqQXdMVGd4WVdRdE5UYzFOeTFoTVdVM0xXUXdaalptWldFeU1qZGxPU0lzSW5OMVlpSTZJbkpoYW1GelpXdG9ZWEl1WW1Gc2JHRkFhMjl5WlM1amIyMGlMQ0pwYzBGdWIyNTViVzkxY3lJNkltWmhiSE5sSW4wLlJIUXBoRWw1ZjVJWURDNUdWOGtvYXpPajNNWWN1V2Vfd1ZqX2FramxzRjAiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiU0RLQm90IiwKICAgICJfaWQiOiAic3QtYjk4ODljNDYtMjE4Yy01OGY3LTgzOGYtNzNhZTkyMDM0ODhjIgogIH0KfQ==
    //unblu: https://9a17d4decf63.ngrok.io/chat/#ewogICJqd3QiOiAiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBZWFFpT2pFMU9URTNNRGN5TWpnNE16SXNJbVY0Y0NJNk1UVTVNVGN3TnpJNE9EZ3pNaXdpWVhWa0lqb2lJaXdpYVhOeklqb2lZM010TXpObVpEVXdNVFV0WWpabU9TMDFOalF6TFRoaU1qRXRPRGd5TldSbU4yTmxPV1ZqSWl3aWMzVmlJam9pUkRFMU9URTNNRGN5TWpnNE16SWlMQ0pwYzBGdWIyNTViVzkxY3lJNlptRnNjMlY5LkdNV3VZZGpFZkVyWnkybmFYMFhSQ0NzUzd0Sm9ENE5KVjQweURwVG9pb0kiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiQmFua2luZyBTb2x1dGlvbiAyLjAgSVZSIiwKICAgICJfaWQiOiAiWHN0LTEzM2JiNWQ2LTAzZGMtNWZhOS05NmUyLTM5NDVmZmY3M2RmYyIKICB9LAogICJrb3JlQVBJVXJsIjogImh0dHBzOi8vYm90cy5rb3JlLmFpLyIsCiAgInRhc2t0b3RyaWdnZXIiOiAid3JpdGUgdG8gdXMiLAogICJjaGFubmVsIjogInVuYmx1IiwKICAidW5ibHUiOiB7CiAgICAic3ViIjogIkQxNTk1ODMxMTg3MzAwIiwKICAgICJpc0Fub255bW91cyI6IGZhbHNlLAogICAgIm5hbWVkQXJlYU5hbWVzIjogIm1ldGF0YWdpZCIsCiAgICAidW5ibHVIb3N0VXJsIjogImh0dHBzOi8va29yZS5kZXYudW5ibHUtdGVzdC5jb20iLAogICAgImFwaWtleSI6ICJNWnN5NXNGRVNZcVU3TWF3WFpnUl93IgogIH0KfQ==
    var hashObj;
    // Reading from window object for embed WebSDK #SAT-706
    if(window.JWT_OBJ){
        hashObj = window.JWT_OBJ; 
    }
    
    if (!hashObj && _hash) {
        try {
            _hash = _hash.substr(0, _hash.length);

            hashObj = atob(_hash);

            //parses the JSON string to object
            hashObj = JSON.parse(hashObj);


        } catch (error) {
            alert("Something went wrong. Please try again.." + error);
        }

    }

    

    function injectScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.addEventListener('load', resolve);
            script.addEventListener('error', function (e) {
                return reject(e.error);
            });
            document.head.appendChild(script);
        });
    }

    function injectMetaTag(unBluConfig) {
        return new Promise(function (resolve, reject) {
            var meta = document.createElement('meta');
            meta.name="unblu:named-area";
            meta.content=unBluConfig.namedAreaNames;
            document.head.appendChild(meta);
        });
    }

    function showAppLoader(){
        $('#appLoadingIndicator').show();
    }
    function hideAppLoader(){
        $('#appLoadingIndicator').hide();
    }

    //$(document).ready(function () {
        // var pageTitle = getPageTitle();
        // var pagesVisited = localStorage.getItem("pagesVisited");
        // var pagesVisitedArray = [];
        // if (!pagesVisited || pagesVisited == '[]') {
        //     pagesVisitedArray = [];
        // } else {
        //     pagesVisitedArray = JSON.parse(pagesVisited);
        //     // calculate time spent on last item
        //     var obj = pagesVisitedArray[0];
        //     var start = moment(obj.timestamp);
        //     console.log("start", start);
        //     var end = moment();
        //     console.log("end ", end);
        //     var duration = moment.duration(end.diff(start));
        //     var seconds = duration.asSeconds();
        //     obj['timespent'] = seconds;
        //     console.log("spent seconds ", seconds);
        // }
        // pagesVisitedArray.push({
        //     page : pageTitle,
        //     timestamp : new moment()
        // })
        // pagesVisitedArray.reverse();
        // localStorage.setItem("pagesVisited", JSON.stringify(pagesVisitedArray));
        // var uuId = localStorage.getItem("kr-cw-uid");
       
        // if (!uuId) {
        //     uuId = koreGenerateUUID();
        //     //localStorage.setItem("uuId", uuId);
        // }
        /*var uuId = localStorage.getItem("uuId");
        if (!uuId) {
            uuId = koreGenerateUUID();
            localStorage.setItem("uuId", uuId);
        }*/
        var uuId=koreGenerateUUID();
        function injectUnBluTags() {
            var unBluConfig = hashObj.unblu
            injectMetaTag(unBluConfig);
            Promise.all(
                [
                    injectScript(unBluConfig.unbluHostUrl + '/js-api/v2/visitor/visitor-api.min.js'),
                    injectScript(unBluConfig.unbluHostUrl + '/visitor.js?x-unblu-apikey=' + unBluConfig.apikey)
                ]
            ).then(function () {
                initUnBlu();
            });
        }
        function initUnBlu() {
            var unBluConfig = hashObj.unblu

            //configs
            var apiKey = unBluConfig.apikey;
            serverUrl = unBluConfig.unbluHostUrl;
            identity = unBluConfig.sub;

            function cbTest(engagementType, visitorData) { return Promise.resolve(JSON.stringify({ identity: identity })); }
            window.unblu.api
                // .configure({
                //     apiKey: apiKey,
                //     serverUrl:serverUrl 
                // })
                .initialize().then(function (api) {
                    console.log("API initialized successfully!");
                    hideAppLoader();
                    api.setNewConversationInterceptor(cbTest);
                    api.ui.openIndividualUi()
                }).catch(e => {
                    console.log("------error : ", e);
                    if (e.type === 'INITIALIZATION_TIMEOUT') {
                        //retry
                    } else if (e.type === 'UNSUPPORTED_BROWSER') {
                        // display unsupported browser dialog
                    } else {
                        // show generic error message
                    }
                });
            console.log("personIfo", window.unbluapi);
        }

        function assertion(options, callback) {
            if (hashObj && hashObj.jwt) {
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
                    "clientId": options.clientId,
                    "clientSecret": options.clientSecret,
                    "identity": uuId,
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

                        if (!(hashObj && hashObj.jwt)) {
                            options.botDetails = koreBot.botDetails;
                            setTimeout(function () {
                                if (koreBot && koreBot.initToken) {
                                    koreBot.initToken(options);
                                }
                            }, 2000);
                        }

                        callback(null, options);
                    },
                    error: function (err) {
                        koreBot.showError(err.responseText);
                    }
                });
            }

        }

        function getBrandingInformation(options) {
            if (hashObj && hashObj.jwt) {
                var brandingAPIUrl = (chatConfig.botOptions.brandingAPIUrl || '').replace(':appId', chatConfig.botOptions.botInfo._id);
                $.ajax({
                    url: brandingAPIUrl,
                    headers: {
                        'tenantId': chatConfig.botOptions.accountId,
                        'Authorization': "bearer " + options.authorization.accessToken,
                        'Accept-Language': 'en_US',
                        'Accepts-version': '1',
                        'state': 'published'
                    },
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        options.botDetails = koreBot.botDetails(data);
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
        var chatConfig = window.KoreSDK.chatConfig;
        chatConfig.botOptions.userIdentity = uuId;
        chatConfig.botOptions.assertionFn = assertion;
        chatConfig.botOptions.jwtgrantSuccessCB = getBrandingInformation;
        if (hashObj && hashObj.botInfo) {
            chatConfig.botOptions.botInfo = hashObj.botInfo;
        }

        if (hashObj.koreAPIUrl) {
            chatConfig.botOptions.koreAPIUrl = hashObj.koreAPIUrl + '/api/';
            chatConfig.botOptions.brandingAPIUrl = chatConfig.botOptions.koreAPIUrl + '1.1/smartassist/apps/:appId/settings/widget';
        }

        if (hashObj.brand && hashObj.brand.headerTitle) {
            chatConfig.chatTitleOverride = hashObj.brand.headerTitle;
        }
        //chatConfig.tasktotrigger="Write To Us";    
        if (hashObj.tasktotrigger) {
            chatConfig.tasktotrigger = hashObj.tasktotrigger;
        }

        debugger
        if(hashObj && hashObj.botInfo && hashObj.botInfo.panelsExists){
            var widgetsConfig=window.KoreSDK.widgetsConfig;
            widgetsConfig.botOptions.botInfo=chatConfig.botOptions.botInfo;
            widgetsConfig.botOptions.koreAPIUrl = hashObj.koreAPIUrl.substr(0,hashObj.koreAPIUrl.length-1);
            widgetsConfig.botOptions.userIdentity=chatConfig.botOptions.userIdentity;
    
            var wizSelector = {
                menu: ".kr-wiz-menu-chat",
                content: ".kr-wiz-content-chat"
            }
            var wSdk = new KoreWidgetSDK(widgetsConfig);
            chatConfig.widgetSDKInstace=wSdk;//passing widget sdk instance to chatwindow 
            wSdk.setJWT(hashObj.jwt);
            wSdk.show(widgetsConfig, wizSelector);
          
        }

        $('html').removeClass('loading');
        if(hashObj && hashObj.errorObj){
          $('html').addClass('error');
          $('.emptyDes').html(hashObj.errorObj.message);
          //window.alert(hashObj.errorObj.message)
        }else{
            if(hashObj && hashObj.channel && hashObj.channel==='unblu'){
                injectUnBluTags();
                showAppLoader();
            }else{
                var koreBot = koreBotChat();
                // koreBot.show(chatConfig);
                // $('.kore-chat-window .minimized').trigger('click');
                // $('.kore-chat-window .minimized').click(function () {
                //     koreBot.show(chatConfig);
                // });
                //var uuId = koreGenerateUUID();
                //AgentDesktop(uuId);
            }
            window.KoreSDK.show=function(chatConfig){
                koreBot.show(chatConfig);
            }           
        }

        
        
    //});

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));