import {chatConfig,chatWindow,AgentDesktopPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {WebKitSTT} from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//My Local
let botOptions=chatConfig.botOptions;
// botOptions.koreAPIUrl = "http://localhost/api/";
// botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
// botOptions.userIdentity = 'uxotest@test.com';// Provide users email id here
// botOptions.botInfo = { name: "MyTestApp", "_id": "st-956b18bf-a2f0-543c-a4b7-6aece25fa9af" }; // bot name is case sensitive
// botOptions.clientId = "cs-4c5a1111-75bd-5c55-9a19-1719ce2b425f";
// botOptions.clientSecret = "stvCQQGI+X6d5g4QSz24qEJaBz0h09AHENW0EjfhxL4=";


//SIT XO Laxmi

    botOptions.koreAPIUrl = "https://sit-xo.kore.ai/api/";
    botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
    botOptions.userIdentity = 'uxo_camptesting01@mailinator.com';// Provide users email id here
    botOptions.botInfo = { name: "Camp testing", "_id": "st-f7438a9b-4eda-5903-be9c-2cc661a0c2ae" }
    botOptions.clientId = "cs-34b679dc-6d75-5da5-aaac-45b7e9a438eb";
    botOptions.clientSecret = "zGJ5iFLFQFxzyTBtD6yFukKbfrgAAz4PLRTTUjci8CU=";

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
chatWindowInstance.installPlugin(new AgentDesktopPlugin());
chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));

chatWindowInstance.show(chatConfig);
