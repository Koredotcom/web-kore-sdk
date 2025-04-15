import {chatConfig,chatWindow,AgentDesktopPlugin,BrowserTTS} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {WebKitSTT} from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//OPTION #1
let botOptions=chatConfig.botOptions;

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "image answering doing desing time changes", "_id": "st-bfd0024e-bddd-583c-86a1-58112b120cc1" }; // bot name is case sensitive
botOptions.clientId = "cs-b8230a17-5262-501a-9fbe-5e7350bed141";
botOptions.clientSecret = "l7TuPkwsEa+Li0Y47eX19tQhxxtcnJhfJCBKT+/6AZs=";


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
chatWindowInstance.installPlugin(new BrowserTTS());
chatWindowInstance.installPlugin(new AgentDesktopPlugin());
chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));

chatWindowInstance.show(chatConfig);
