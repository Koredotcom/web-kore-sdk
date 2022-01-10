

import {chatConfig,chatWindow} from '../../../dist/kore-web-sdk.esm.browser.js';
import {Korei18nPlugin} from '../../../dist/kore-web-sdk.esm.browser.js';
import {KoreFileUploaderPlugin} from '../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow(chatConfig);

// chatWindowInstance.installPlugin(Korei18nPlugin);
chatWindowInstance.installPlugin(KoreFileUploaderPlugin);

chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
    chatWindowInstance.setJWT(res.jwt);
    chatWindowInstance.show();

},function(errRes){
    console.log(errRes);
});
