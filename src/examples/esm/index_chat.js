

import {chatConfig,chatWindow} from '../../../dist/kore-web-sdk.esm.browser.js';
import {Korei18nPlugin} from '../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow(chatConfig);

// chatWindow.prototype.show=function(){
//     console.log('overridedn')
// }


// function stockTemplate(){
// }
// stockTemplate.prototype.renderMessage=function(){
//     return "<h1>a</h1>"
// }
// chatWindowInstance.customTemplateObj.installTemplate(new stockTemplate());



//chatWindowInstance.installPlugin(Korei18nPlugin);
chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
    chatWindowInstance.setJWT(res.jwt);
    chatWindowInstance.show();

},function(errRes){

});
