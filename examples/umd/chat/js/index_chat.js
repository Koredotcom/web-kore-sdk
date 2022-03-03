

var chatConfig=KoreChatSDK.chatConfig;
var chatWindow=KoreChatSDK.chatWindow;

var KorePickersPlugin=KorePickersPluginSDK.KorePickersPlugin;
var GraphTemplatesPlugin=KoreGraphTemplatesPluginSDK.GraphTemplatesPlugin;


var chatWindowInstance = new chatWindow();

var botOptions=chatConfig.botOptions;

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
botOptions.botInfo = { name: "SDKBot", "_id": "st-b9889c46-218c-58f7-838f-73ae9203488c" }; // bot name is case sensitive
botOptions.clientId = "cs-1e845b00-81ad-5757-a1e7-d0f6fea227e9";
botOptions.clientSecret = "5OcBSQtH/k6Q/S6A3bseYfOee02YjjLLTNoT1qZDBso=";
// chatWindow.prototype.show=function(){
//     console.log('overridedn')
// }

chatWindowInstance.installPlugin(new KorePickersPlugin());
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());

chatConfig.JWTAsertion=function(commitJWT){
    chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
        chatWindowInstance.setJWT(res.jwt);
        commitJWT();
    },function(errRes){
        console.log(errRes);
    });
 };
 chatWindowInstance.show(chatConfig);
