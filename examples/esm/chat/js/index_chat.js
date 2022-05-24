

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
// chatConfig.botOptions.API_KEY_CONFIG.KEY="kx0f5u6hbh5hcaybo8j";
// chatWindowInstance.show(chatConfig);

// chatConfig.botOptions.koreAPIUrl = "https://qa-bots.kore.ai/api/";//temporary
// chatConfig.botOptions.API_KEY_CONFIG.KEY="57ea0771ed7a49f9b1c47c64bbc59914dbf9a236d09d4272a7526645199219f1st0f";
// chatConfig.botOptions.API_KEY_CONFIG.bootstrapURL="https://qa-bots.kore.ai/api/platform/websdk";
// chatConfig.botOptions.brandingAPIUrl = chatConfig.botOptions.koreAPIUrl +'websdkthemes/:appId/activetheme';
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
 
function koreGenerateUUID() {
    console.info("generating UUID");
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'u-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


//OPTION #3(not for production only for quick demo) with generic JWT Service pasing clientId and clientSecret etc,.
 let botOptions=chatConfig.botOptions;

// botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
// botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
// botOptions.botInfo = { name: "SDKBot", "_id": "st-b9889c46-218c-58f7-838f-73ae9203488c" }; // bot name is case sensitive
// botOptions.clientId = "cs-1e845b00-81ad-5757-a1e7-d0f6fea227e9";
// botOptions.clientSecret = "5OcBSQtH/k6Q/S6A3bseYfOee02YjjLLTNoT1qZDBso=";
botOptions.koreAPIUrl = "https://uat.kore.ai/api/1.1";
botOptions.JWTUrl = "https://demo.kore.net/users/sts";
botOptions.userIdentity = koreGenerateUUID();// Provide users email id here
botOptions.botInfo = { name: "Master Inc", "_id": "st-1ccf8020-f8e4-5f38-99ec-3404420f3e1c" }; // bot name is case sensitive
botOptions.clientId = "cs-956c4db1-2910-5795-bd97-2e0dd1fb0499";
botOptions.clientSecret = "9MtOMn8KBcJvL6nRUhadf6erfRonjdsXXEn2Oazsh8I=";
chatWindowInstance.show(chatConfig);

