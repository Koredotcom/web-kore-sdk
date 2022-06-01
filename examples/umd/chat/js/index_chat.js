

var chatConfig=KoreChatSDK.chatConfig;
var chatWindow=KoreChatSDK.chatWindow;

var KorePickersPlugin=KorePickersPluginSDK.KorePickersPlugin;
var GraphTemplatesPlugin=KoreGraphTemplatesPluginSDK.GraphTemplatesPlugin;
var SpeechToTextPlugin=SpeechToTextPluginSDK.SpeechToTextPlugin;
var TtsSpeechPlugin=TtsSpeechPluginSDK.TtsSpeechPlugin;

var chatWindowInstance = new chatWindow();

var botOptions=chatConfig.botOptions;

botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
// chatWindow.prototype.show=function(){
//     console.log('overridedn')
// }

chatWindowInstance.installPlugin(new KorePickersPlugin());
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
chatWindowInstance.installPlugin(new SpeechToTextPlugin());
chatWindowInstance.installPlugin(new TtsSpeechPlugin());

chatConfig.JWTAsertion=function(commitJWT){
    chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
        chatWindowInstance.setJWT(res.jwt);
        commitJWT();
    },function(errRes){
        console.log(errRes);
    });
 };
 chatWindowInstance.show(chatConfig);
