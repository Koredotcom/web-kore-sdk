

import {chatConfig,chatWindow} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {Korei18nPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KoreFileUploaderPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

// chatWindowInstance.installPlugin(Korei18nPlugin);
//chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());
let pickerConfig = {};
chatWindowInstance.installPlugin(new KorePickersPlugin(pickerConfig));







// //OPTION #1 with APIKEY
// chatConfig.API_KEY_CONFIG.KEY="xyz";
// chatWindowInstance.show(chatConfig);





// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = { 
//     name: "PLEASE_ENTER_BOT_NAME",
//     _id: "PLEASE_ENTER_BOT_ID" 
// };
// chatConfig.botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
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

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
botOptions.botInfo = { name: "SDKBot", "_id": "st-b9889c46-218c-58f7-838f-73ae9203488c" }; // bot name is case sensitive
botOptions.clientId = "cs-1e845b00-81ad-5757-a1e7-d0f6fea227e9";
botOptions.clientSecret = "5OcBSQtH/k6Q/S6A3bseYfOee02YjjLLTNoT1qZDBso=";

chatWindowInstance.show(chatConfig);

