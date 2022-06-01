

import {chatConfig,chatWindow} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {Korei18nPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KoreFileUploaderPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {GraphTemplatesPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {SpeechToTextPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {TtsSpeechPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {AgentDesktopPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
let chatWindowInstance = new chatWindow();

// chatWindowInstance.installPlugin(Korei18nPlugin);
chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());

chatWindowInstance.installPlugin(new KorePickersPlugin({}));
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
chatWindowInstance.installPlugin(new SpeechToTextPlugin());
chatWindowInstance.installPlugin(new TtsSpeechPlugin());
chatWindowInstance.installPlugin(new AgentDesktopPlugin());






//OPTION #1 with APIKEY
// chatConfig.botOptions.API_KEY_CONFIG.KEY="YOUR_API_KEY";
// chatWindowInstance.show(chatConfig);

// chatConfig.botOptions.koreAPIUrl = "https://qa-bots.kore.ai/api/";//temporary
// chatConfig.botOptions.API_KEY_CONFIG.KEY="YOUR_API_KEY";
// chatConfig.botOptions.API_KEY_CONFIG.bootstrapURL="https://qa-bots.kore.ai/api/platform/websdk";//temporary
// chatConfig.botOptions.brandingAPIUrl = chatConfig.botOptions.koreAPIUrl +'websdkthemes/:appId/activetheme';
// chatWindowInstance.show(chatConfig);



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
 



//OPTION #3(not for production only for quick demo) with generic JWT Service pasing clientId and clientSecret etc,.
 let botOptions=chatConfig.botOptions;

 botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
 botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
 botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
 botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
 botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";



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

