var chatConfig=KoreSDK.chatConfig;
var chatWindow=KoreSDK.chatWindow;

var widgetsConfig=KoreSDK.widgetsConfig;
var KoreWidgetSDK=KoreSDK.KoreWidgetSDK;


var wizSelector = {
    menu: ".kr-wiz-menu-chat",
    content: ".kr-wiz-content-chat"
}
var wSdk = new KoreWidgetSDK(widgetsConfig);

chatConfig.widgetSDKInstace=wSdk;
var chatWindowInstance = new chatWindow(chatConfig);




chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
    chatWindowInstance.setJWT(res.jwt);
    chatWindowInstance.show();

    wSdk.setJWT(res.jwt);
    wSdk.show(widgetsConfig, wizSelector);

},function(errRes){

});


           