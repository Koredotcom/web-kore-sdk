

import {
    chatConfig,
    chatWindow,
    widgetsConfig,
    KoreWidgetSDK

} from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();
let wSdk = new KoreWidgetSDK(widgetsConfig);

chatConfig.widgetSDKInstace=wSdk;



// chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//     chatWindowInstance.setJWT(res.jwt);
//     chatWindowInstance.show();

//     wSdk.setJWT(res.jwt);
//     wSdk.show(widgetsConfig);

// },function(errRes){

// });


// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         wSdk.setJWT(res.jwt);
//         wSdk.show(widgetsConfig);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };


// chatWindowInstance.on("jwtSuccess", (res,event) => {
//     wSdk.setJWT(res.jwt);
//     wSdk.show(widgetsConfig);
// });
// chatWindowInstance.show();




//todo:raj:identity needs to be passed
//jwt retry needs discussion
chatConfig.API_KEY_CONFIG.KEY="xyz";
chatWindowInstance.on("jwtSuccess", (res,event) => {
    wSdk.setJWT(res.jwt);
    wSdk.show(widgetsConfig);
});
chatWindowInstance.show(chatConfig);           