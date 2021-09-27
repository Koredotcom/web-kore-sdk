declare global {
    interface Window {
        KoreSDK:any;
    }
}
import $ from 'jquery'; 
console.log("index.js");
import '../UI/libs/kore-no-conflict-start';
// import requireKr from '../kore-bot-sdk-client'
// import '../UI/libs/jquery'
// import '../UI/libs/jquery.tmpl.min.js';
// import '../UI/libs/jquery-ui.min';
// import '../UI/../libs/lodash.min.js';
// import '../UI/../libs/d3.v4.min.js';
// import '../UI/../libs/KoreGraphAdapter.js';
// import '../UI/../libs/anonymousassertion.js';
// import '../kore-bot-sdk-client.js';
// import '../UI/../libs/perfect-scrollbar.js';
// import '../UI/../libs/emoji.js';
// import '../UI/../libs/purejscarousel.js';
//import chatWindow from "imports-loader?imports=window!../UI/chatWindow.js";
import koreBotChat from '../UI/chatWindow.js';
// import '../UI/custom/customTemplate.js';
// import '../UI/../libs/ie11CustomProperties.js';
// import '../UI/../libs/recorder.js';
// import '../UI/../libs/recorderWorker.js';
// import '../UI/../libs/speech/app.js';
// import '../UI/../libs/speech/key.js';
// import '../UI/../libs/client_api.js';
import '../UI/kore-config.js';
// import '../UI/kore-main.js';
// import '../UI/libs/kore-no-conflict-end.js';

function assertion(options:any, callback:any) {
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
        success: function (data:any) {
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
        error: function (err:any) {
            koreBot.showError(err.responseText);
        }
    });
}
var chatConfig=window.KoreSDK.chatConfig;
chatConfig.botOptions.assertionFn=assertion;

var koreBot:any = new koreBotChat(chatConfig);
koreBotChat.prototype.show=function(){
    console.log('overridedn')
}
koreBot.show(chatConfig);