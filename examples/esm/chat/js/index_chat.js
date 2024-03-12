import {chatConfig,chatWindow,AgentDesktopPlugin,ProactiveWebCampaignPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {WebKitSTT} from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//OPTION #1
let botOptions=chatConfig.botOptions;

/* botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE"; 
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET"; */
botOptions.koreAPIUrl = "https://sit-xo.kore.ai/api/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'sridharsitkore@mailinator.com';// Provide users email id here
botOptions.botInfo = { name: "SriSitXo", "_id": "st-5207571c-4081-5ee3-8e97-3f445d7c58f0" }
botOptions.clientId = "cs-c393e8e7-30ac-5d55-a8a4-1347bc8cd79c";
botOptions.clientSecret = "DPKPJxLosQcfl0UNtAVenMTeVkreTsY+p+qmlDFh+7U=";


/* 
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/



// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = { 
//     name: "PLEASE_ENTER_BOT_NAME",
//     _id: "PLEASE_ENTER_BOT_ID" 
// };
// chatConfig.botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };
//  chatWindowInstance.show(chatConfig);
 


//  class customTemplateComponent{
//     renderMessage(msgData){
//         if(msgData?.message[0]?.component?.payload?.template_type==='custom_weather_template'){
//             return '<h2>My Template HTML</h2>';      
//         }else{
//             return false;
//         }
//     } 
//   }
  
//   chatWindowInstance.templateManager.installTemplate(new customTemplateComponent())
// chatWindowInstance.installPlugin(new AgentDesktopPlugin());
var agentDesktopPluginInstance=new AgentDesktopPlugin();

// agentDesktopPluginInstance.setConversationInProgress
chatWindowInstance.installPlugin(agentDesktopPluginInstance);

var proactiveConfig={
    dependentPlugins: {
        AgentDesktopPlugin:agentDesktopPluginInstance
    }
}
chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin(proactiveConfig), new AgentDesktopPlugin);
chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));

chatWindowInstance.show(chatConfig);
