

var chatConfig=KoreSDK.chatConfig;
var chatWindow=KoreSDK.chatWindow;


var chatWindowInstance = new chatWindow(chatConfig);

// chatWindow.prototype.show=function(){
//     console.log('overridedn')
// }

//chatWindowInstance.installPlugin(Korei18nPlugin);
chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
    chatWindowInstance.setJWT(res.jwt);
    chatWindowInstance.show();

},function(errRes){

});
