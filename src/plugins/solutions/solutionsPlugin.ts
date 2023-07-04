import QuickRepliesWelcome from './templates/quickRepliesWelcomeTemplate/quick-replies-welcome';
import searchResultsTemplate from './templates/SearchResultsTemplate/searchResults'

/**
 *  Solutions template plugin class
 *
 * @decorator Class
 */
class SolutionsTemplatesPlugin {

    name = 'SolutionsTemplatesPlugin';
    config = {};
    hostInstance: any;
    constructor(config: any) {
        config = config || {};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
        cwInstance.on("onWSMessage", (chatWindowEle: any) => {
            let messageData=chatWindowEle?.messageData;
            if(messageData && messageData.message && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.payload && messageData.message[0].component.payload.payload.template_type  === 'button') {
                messageData.message[0].component.payload.payload.template_type = 'quick_replies_welcome';
            }
            
        });

    }

    onInit() {
        let me = this;
        let $ = me.hostInstance.$;
        me.installPickerTemplates();
        $('.kore-chat-window').addClass('solutions');

    }
    
    /**
     * To install the solutions templates
     */

    installPickerTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new QuickRepliesWelcome());
        templateManager.installTemplate(new searchResultsTemplate());
    }
}
export default SolutionsTemplatesPlugin;