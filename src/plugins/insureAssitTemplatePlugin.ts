import insureAssistCardTemplate from '../templatemanager/templates/v3/insureAssistTemplates/insureAssistCardTemplate/insureAssistCardTemplate';
import insureAssistCarouselTemplate from '../templatemanager/templates/v3/insureAssistTemplates/insureAssistCarouselTemplate/insureAssistCarouselTemplate';
import insureAssistPaymentMethod from '../templatemanager/templates/v3/insureAssistTemplates/insureAssistPaymentMethod/insureAssistPaymentMethod';
import insureAssistFormTemplate from '../templatemanager/templates/v3/insureAssistTemplates/insureAsssitFormTemplate/insureAssistFormTemplate';
import InsureAssistInfoForm from '../templatemanager/templates/v3/insureAssistTemplates/insureAsssitFormTemplate/insureAssistFormInfoTemplate';


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
    hamburgerMenu :any =  [
        {
          "type": "postback",
          "title": "Buy Policy",
          "value": "Buy Policy"
        },
        {
          "type": "postback",
          "title": "Renew policy",
          "value": "Renew policy"
        },
        {
          "type": "postback",
          "title": "Raise claim",
          "value": "Raise claim"
        },
        {
          "type": "postback",
          "title": "Claim status",
          "value": "Claim status"
        },
        {
          "type": "postback",
          "title": "Emergency Assistance",
          "value": "Emergency Assistance"
        }
      ]
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
        if(cwInstance?.config?.branding?.footer?.buttons?.menu?.actions){
            cwInstance.config.branding.footer.buttons.menu.actions = this.hamburgerMenu;
        }

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
        templateManager.installTemplate(new insureAssistCarouselTemplate());
        templateManager.installTemplate(new insureAssistPaymentMethod());
        templateManager.installTemplate(new insureAssistFormTemplate());
        templateManager.installTemplate(new InsureAssistInfoForm());
    }

    //class Append in body tag
    appendClassInBody() {
        let me = this;
        let $ = me.hostInstance.$;
            $(me.hostInstance.chatEle).addClass('insure-assist-theme');
    }
}
export default InsureAssistTemplatePlugin;