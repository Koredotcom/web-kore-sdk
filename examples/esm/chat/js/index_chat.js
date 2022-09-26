

import {chatConfig,chatWindow, AgentDesktopPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';


let chatWindowInstance = new chatWindow();

chatWindowInstance.installPlugin(new AgentDesktopPlugin()); 
//OPTION #1
let botOptions=chatConfig.botOptions;

botOptions.koreAPIUrl = "https://bots.kore.ai/api";
botOptions.JWTUrl = "https://demo.kore.net/users/sts"; // "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'User1@mailinator.com';// Provide users email id here
botOptions.botInfo = { name: "instanceBot", "_id": "st-0512508f-d7d9-55b5-8afb-54e12c89483e" }; // bot name is case sensitive
botOptions.clientId = "cs-5b8374a3-57f6-5784-b25e-5a5beb4bc5ac";
botOptions.clientSecret = "aYMaRSyU4QAXvGK0YLE/ITvu1bAqIje+ujktiRounOo=";

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
 
 
chatWindowInstance.show(chatConfig);

