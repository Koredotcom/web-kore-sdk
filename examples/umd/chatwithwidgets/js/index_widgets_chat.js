var chatConfig=KoreChatSDK.chatConfig;
var chatWindow=KoreChatSDK.chatWindow;

var widgetsConfig=KoreWidgetsSDK.widgetsConfig;
var KoreWidgetSDK=KoreWidgetsSDK.KoreWidgetSDK;


var wSdk = new KoreWidgetSDK(widgetsConfig);

chatConfig.widgetSDKInstace=wSdk;
var chatWindowInstance = new chatWindow(chatConfig);





chatWindowInstance.on("jwtSuccess", (res,event) => {
    wSdk.setJWT(res.jwt);
    wSdk.show(widgetsConfig);
});

 chatWindowInstance.show();

           