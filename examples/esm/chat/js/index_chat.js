

import {chatConfig,chatWindow} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {Korei18nPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KoreFileUploaderPlugin} from '../../../../../dist/kore-web-sdk.esm.browser.js';
import {KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow(chatConfig);
let pickerConfig = {};


// chatWindowInstance.installPlugin(Korei18nPlugin);
//chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());
chatWindowInstance.installPlugin(new KorePickersPlugin(pickerConfig));

// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };
//  chatWindowInstance.show();
 
 
chatWindowInstance.on("jwt_success", (message,event) => {console.log(message);});
chatWindowInstance.show();

