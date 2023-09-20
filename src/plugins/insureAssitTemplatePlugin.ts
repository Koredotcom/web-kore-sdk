import insureAssistCardTemplate from '../templatemanager/templates/v3/insureAssistTemplates/insureAssistCardTemplate/insureAssistCardTemplate';
/**
 * KorePicker plugin classs
 *
 * @decorator Class
 */
class InsureAssistTemplatePlugin {
    name = 'InsureAssistTemplatePlugin';

    /**
     * KorePicker configuration
     */
    config = {};
    pickerHTML: any;
    hostInstance: any;
    constructor(config: any) {
        let me = this;
        // me.extend(this.config,pickerConfig);
        this.config = { ...this.config, ...config }
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });

    }
    onInit() {
        let me = this;
        me.installinsureAssistTemplates();
        me.appendClassInBody();
    }
    installinsureAssistTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new insureAssistCardTemplate())
    }

    //class Append in body tag
    appendClassInBody() {
        let me = this;
        let $ = me.hostInstance.$;
            $(me.hostInstance.chatEle).addClass('insure-assist-theme');
    }
}
export default InsureAssistTemplatePlugin;