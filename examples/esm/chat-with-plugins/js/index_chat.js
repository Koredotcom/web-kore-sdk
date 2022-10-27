import { chatConfig, chatWindow } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { KoreFileUploaderPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { GraphTemplatesPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { WebKitSTT } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { BrowserTTS } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { AgentDesktopPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';


let chatWindowInstance = new chatWindow();


chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());
chatWindowInstance.installPlugin(new KorePickersPlugin({}));
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
chatWindowInstance.installPlugin(new WebKitSTT());
chatWindowInstance.installPlugin(new BrowserTTS());
chatWindowInstance.installPlugin(new AgentDesktopPlugin());




//OPTION #1
let botOptions = chatConfig.botOptions;

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'santhoshvishal.veerannapet@kore.com';// Provide users email id here
botOptions.botInfo = { name: "Instance03", "_id": "st-b42e4f0d-3807-5866-90a3-57ed98505fe9" }; // bot name is case sensitive
botOptions.clientId = "cs-394f098f-3914-5822-9d34-4bbafe081593";
botOptions.clientSecret = "jBUKsjR/kVqmb5ovSMAvprT1ED7p8zob5Ya/4G4WlOY=";

/*
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/


// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = {
// name: "PLEASE_ENTER_BOT_NAME",
// _id: "PLEASE_ENTER_BOT_ID"
// };
// chatConfig.botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
// chatConfig.JWTAsertion=function(commitJWT){
// chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
// chatWindowInstance.setJWT(res.jwt);
// commitJWT();
// },function(errRes){
// console.log(errRes);
// });
// };
// chatWindowInstance.show(chatConfig);



// class customTemplateComponent{
// renderMessage(msgData){
// if(msgData?.message[0]?.component?.payload?.template_type==='custom_weather_template'){
// return '<h2>My Template HTML</h2>';
// }else{
// return false;
// }
// }
// }

// chatWindowInstance.templateManager.installTemplate(new customTemplateComponent())


chatWindowInstance.show(chatConfig);