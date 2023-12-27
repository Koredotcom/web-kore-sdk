import SolutionCarouselTemplate from '../templatemanager/templates/v3/solutionTemplates/solutionCarausal/solutionCarausal';
import ItemSelectionList from '../templatemanager/templates/v3/solutionTemplates/itemSelection/itemSelection';


/**
 * KorePicker plugin classs
 *
 * @decorator Class
 */
class RetailAssistTemplatePlugin {
  name = 'RetailAssistTemplatePlugin';

  /**
   * KorePicker configuration
   */
  config = {};
  pickerHTML: any;
  hostInstance: any;
  constructor(config: any) {
    const me = this;
    this.config = { ...this.config, ...config }
  }
  onHostCreate() {
    let me = this;
    let cwInstance = me.hostInstance;
    cwInstance.on("viewInit", (chatWindowEle: any) => {
      me.onInit();
    });
    // if (cwInstance?.config?.branding?.footer?.buttons?.menu?.actions) {
    //   cwInstance.config.branding.footer.buttons.menu.actions = this.hamburgerMenu;
    // }
    cwInstance.on("beforeWSSendMessage", (chatWindowEle: any) => {
      cwInstance?.chatEle?.querySelector('.quick-replies')?.remove();
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
    templateManager.installTemplate(new SolutionCarouselTemplate());
    templateManager.installTemplate(new ItemSelectionList());
  }

  //class Append in body tag
  appendClassInBody() {
    let me = this;
    let $ = me.hostInstance.$;
    $(me.hostInstance.chatEle).addClass('retail-assist-theme');
  }
}
export default RetailAssistTemplatePlugin;