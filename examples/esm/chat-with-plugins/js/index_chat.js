

import {chatConfig,chatWindow} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KoreMultiFileUploaderPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {GraphTemplatesPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {WebKitSTT, SpeakTextWithAWSPolly} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {SearchSuggestionsPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {SolutionsTemplatesPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';

import {BrowserTTS,AzureSTTConfig,WebKitSTTConfig, AzureTTS, KoreDesktopNotificationPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {AgentDesktopPlugin, GoogleSTT, GoogleSTTConfig, AzureSTT, GoogleTTS} from '../../../../../dist/kore-web-sdk.esm.browser.js';


let chatWindowInstance = new chatWindow();


// chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());
chatWindowInstance.installPlugin(new KoreMultiFileUploaderPlugin());
// chatWindowInstance.installPlugin(new KorePickersPlugin({}));
// chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
// chatWindowInstance.installPlugin(new SpeakTextWithAWSPolly({
//   region:'REGION',
//   identityCredentials : {
//     IdentityPoolId: 'IDENTITY-POOL-ID'
//   }

// }));
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
// chatWindowInstance.installPlugin(new AzureSTT(
//   {
//     key:'API_KEY',
//     region:'eastus'
//   }
// ));
// chatWindowInstance.installPlugin(new AzureTTS(
//   {
//     key:'API_KEY',
//     region:'eastus'
//   }
// ));
// chatWindowInstance.installPlugin(new BrowserTTS());
chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));
chatWindowInstance.installPlugin(new AgentDesktopPlugin());
// chatWindowInstance.installPlugin(new KoreDesktopNotificationPlugin());
// chatWindowInstance.installPlugin(new SolutionsTemplatesPlugin());



//OPTION #1
let botOptions=chatConfig.botOptions;

//Kore VG
/* botOptions.koreAPIUrl = "https://smartassist-korevg-np.kore.ai/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'korevgdevtest@mailinator.com';// Provide users email id here
botOptions.botInfo = { name: "Test App", "_id": "st-a890965d-d5e7-5ed5-abd0-0b632a845f3d" }; // bot name is case sensitive
botOptions.clientId = "cs-95db0336-6444-5052-8e05-2c8182d8b1d5";
botOptions.clientSecret = "jnYNs/bISQSiJQEirhqpmRP2HnDhT0CW2oP30vfwmyg="; */

// SIT
//SIT XO
/* botOptions.koreAPIUrl = "https://sit-xo.kore.ai/api/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'sridharsitkore@mailinator.com';// Provide users email id here
botOptions.botInfo = { name: "SriSitXo", "_id": "st-5207571c-4081-5ee3-8e97-3f445d7c58f0" }
botOptions.clientId = "cs-c393e8e7-30ac-5d55-a8a4-1347bc8cd79c";
botOptions.clientSecret = "DPKPJxLosQcfl0UNtAVenMTeVkreTsY+p+qmlDFh+7U="; */

// Prod
/* botOptions.koreAPIUrl = "https://smartassist.kore.ai/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
// botOptions.userIdentity = 'sprod30jan@mailinator.com';// Provide users email id here
botOptions.userIdentity = 'test' + (Math.random() + 1).toString(36).substring(7) +'@gamil.com';
botOptions.botInfo = { name: "Kore", "_id": "st-e59a98e2-f59a-5a29-883e-8387a8b52413" }
botOptions.clientId = "cs-25d758e4-014a-53fe-b99b-78ae1113666b";
botOptions.clientSecret = "m5dFziThWqBxCFrIRjORgN2ePDHmfDPhkVb+aSYZPSU="; */


botOptions.koreAPIUrl = "https://smartassist.kore.ai/api/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'test' + (Math.random() + 1).toString(36).substring(7) +'@gamil.com';// Provide users email id here
botOptions.botInfo = { name: "Kore", "_id": "st-e59a98e2-f59a-5a29-883e-8387a8b52413" }; // bot name is case sensitive
botOptions.clientId = "cs-25d758e4-014a-53fe-b99b-78ae1113666b";
botOptions.clientSecret = "m5dFziThWqBxCFrIRjORgN2ePDHmfDPhkVb+aSYZPSU=";

// Prod Swamy
/* botOptions.koreAPIUrl = "https://smartassist.kore.ai/api/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'test' + (Math.random() + 1).toString(36).substring(7) +'@gamil.com';// Provide users email id here
botOptions.botInfo = { name: "Kore", "_id": "st-31326403-12a5-5afe-b2a7-0b5faa24b840" }; // bot name is case sensitive
botOptions.clientId = "cs-3b9da6d6-4bcf-5989-b916-8d788fb7190d";
botOptions.clientSecret = "ZeU5sELwQAXLZXjK+7qk8xmb8eJw5ti25NeCjK821Rw="; */

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

