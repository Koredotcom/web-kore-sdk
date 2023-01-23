

import {chatConfig,chatWindow} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KoreFileUploaderPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {GraphTemplatesPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {WebKitSTT, SpeakTextWithAWSPolly} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {SearchSuggestionsPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';

import {BrowserTTS,AzureSTTConfig,WebKitSTTConfig, AzureTTS, KoreDesktopNotificationPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {AgentDesktopPlugin, GoogleSTT, GoogleSTTConfig, AzureSTT, GoogleTTS} from '../../../../../dist/kore-web-sdk.esm.browser.js';


let chatWindowInstance = new chatWindow();


chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());
chatWindowInstance.installPlugin(new KorePickersPlugin({}));
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
chatWindowInstance.installPlugin(new SpeakTextWithAWSPolly({
  region:'REGION',
  identityCredentials : {
    IdentityPoolId: 'IDENTITY-POOL-ID'
  }

}));
// chatWindowInstance.installPlugin(new SearchSuggestionsPlugin({
//   botOptions:{
//     koreAPIUrl:'PROVIDE_SEARCHASSIST_BASE_URL',
//     API_KEY:"PROVIDE_API_KEY"
//   }
// }));


// chatWindowInstance.installPlugin(new GoogleTTS({key:'API_KEY', voice:{
//   "languageCode": "en-US",
//   "name": "en-US-Neural2-J",
//   "ssmlGender": "MALE"
// },
// audioConfig:{ "audioEncoding": "MP3" }}));

//chatWindowInstance.installPlugin(new GoogleSTT({key:'API_KEY',languageCode: 'en'}));
chatWindowInstance.installPlugin(new AzureSTT(
  {
    key:'API_KEY',
    region:'eastus'
  }
));
chatWindowInstance.installPlugin(new AzureTTS(
  {
    key:'API_KEY',
    region:'eastus'
  }
));
// chatWindowInstance.installPlugin(new BrowserTTS());
chatWindowInstance.installPlugin(new AgentDesktopPlugin());
chatWindowInstance.installPlugin(new KoreDesktopNotificationPlugin());




//OPTION #1
let botOptions=chatConfig.botOptions;

botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

botOptions.koreAPIUrl = 'https://uat.kore.ai/api/1.1';
botOptions.JWTUrl = 'https://demo.kore.net/users/sts';
botOptions.userIdentity = '12341241445'; // Provide users email id here
botOptions.botInfo = {
  name: 'Master Inc',
  _id: 'st-1ccf8020-f8e4-5f38-99ec-3404420f3e1c',
}; // bot name is case sensitive
botOptions.clientId = 'cs-956c4db1-2910-5795-bd97-2e0dd1fb0499';
botOptions.clientSecret = '9MtOMn8KBcJvL6nRUhadf6erfRonjdsXXEn2Oazsh8I=';   

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

