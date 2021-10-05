

import {chatConfig,chatWindow} from '../../../dist/kore-web-sdk.esm.browser.js';
var $ =chatWindow.$;
debugger
//var chatConfig=KoreSDK2.chatConfig;

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
            options.handleError = chatWindowInstance.showError;
            options.chatHistory = chatWindowInstance.chatHistory;
            options.botDetails = chatWindowInstance.botDetails;
            callback(null, options);
            setTimeout(function () {
                if (chatWindowInstance && chatWindowInstance.initToken) {
                    chatWindowInstance.initToken(options);
                }
            }, 2000);
        },
        error: function (err) {
            chatWindowInstance.showError(err.responseText);
        }
    });
}
// var chatConfig=window.KoreSDK.chatConfig;
chatConfig.botOptions.assertionFn=assertion;



var chatWindowInstance = new chatWindow(chatConfig);

chatWindow.prototype.show=function(){
    console.log('overridedn')
}
chatWindowInstance.show(chatConfig);
