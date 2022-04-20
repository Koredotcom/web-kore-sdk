var chatConfig=KoreChatSDK.chatConfig;
var chatWindow=KoreChatSDK.chatWindow;

var widgetsConfig=KoreWidgetsSDK.widgetsConfig;
var KoreWidgetSDK=KoreWidgetsSDK.KoreWidgetSDK;

chatConfig.botOptions.koreAPIUrl = "https://qa-bots.kore.ai/api/";//temporary
widgetsConfig.botOptions.koreAPIUrl = "https://qa-bots.kore.ai";//temporary

var wSdk = new KoreWidgetSDK(widgetsConfig);
chatConfig.widgetSDKInstace=wSdk;
var chatWindowInstance = new chatWindow(chatConfig);
chatConfig.botOptions.API_KEY_CONFIG.KEY="57ea0771ed7a49f9b1c47c64bbc59914dbf9a236d09d4272a7526645199219f1st0f";
chatWindowInstance.on("jwtSuccess", (res,event) => {
    wSdk.setJWT(res.jwt);
    wSdk.show(widgetsConfig);
});

chatWindowInstance.show();

           