import SolutionCarouselTemplate from '../templatemanager/templates/v3/solutionTemplates/solutionCarausal/solutionCarausal';
import ItemSelectionList from '../templatemanager/templates/v3/solutionTemplates/itemSelection/itemSelection';
import KoreHelpers from '../utils/helpers';

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
  helpers:any;
  constructor(config: any) {
    const me = this;
    this.config = { ...this.config, ...config }
    this.helpers = KoreHelpers.helpers;
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
    me.retailCustomization();
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
    $('head').append("<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>");
  }

  retailCustomization(){
    let me = this;
    let $ = me.hostInstance.$;
    $(me.hostInstance.chatEle).find('.avatar-variations-footer #helojohn').empty('');
    $(me.hostInstance.chatEle).find('.avatar-variations-footer #helojohn').html('Hello 😊')
    $(me.hostInstance.chatEle).find('.avatar-variations-footer .help-text-content').html(this.helpers.convertMDtoHTML('I am your Virtual Shopping Assistant.\n How can I help you?',"bot"));
  }
}
export default RetailAssistTemplatePlugin;