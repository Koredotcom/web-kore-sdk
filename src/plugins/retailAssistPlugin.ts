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
      me.appendCustomThings();
    });
    // if (cwInstance?.config?.branding?.footer?.buttons?.menu?.actions) {
    //   cwInstance.config.branding.footer.buttons.menu.actions = this.hamburgerMenu;
    // }
    cwInstance.on("beforeWSSendMessage", (chatWindowEle: any) => {
      cwInstance?.chatEle?.querySelector('.quick-replies')?.remove();
    });
    cwInstance.on("beforeRenderMessage", (e: any) => {
      if ((e?.msgData?.type === "currentUser") && cwInstance?.isMaskingEnabled && (e.messageHtml).querySelector('.bubble-msg')) {
        let innerTextContent = (e.messageHtml).querySelector('.bubble-msg').innerText;
        innerTextContent = innerTextContent.replace(/./g, '*');
        (e.messageHtml).querySelector('.bubble-msg').innerText = innerTextContent;
        cwInstance.isMaskingEnabled = false;
      }
    });
    cwInstance.on("onWSMessage", (e: any) => {
      if (e?.messageData?.type === "bot_response" && e?.messageData?.message?.[0]?.component?.payload?.masking) {
        cwInstance.isMaskingEnabled = true;
      }
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

  appendCustomThings() {
    let me = this;
    let hostInstance = me.hostInstance;
    let $ = hostInstance.$;

    // // minimize-button 
    // hostInstance.chatEle.querySelector('.btn-action-close').innerHTML = '';
    // hostInstance.chatEle.querySelector('.btn-action-close').setAttribute('title', 'Minimize Bot');
    // hostInstance.chatEle.querySelector('.btn-action-close').innerHTML = '<svg class="icon-minus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8548 10C17.2112 10 17.5 10.2799 17.5 10.625C17.5 10.951 17.2424 11.2187 16.9136 11.2475L16.8548 11.25H3.14516C2.78885 11.25 2.5 10.9702 2.5 10.625C2.5 10.299 2.75765 10.0313 3.08644 10.0026L3.14516 10H16.8548Z" fill="#D0D5DD"/></svg>';


    // hostInstance.eventManager.removeEventListener('.btn-action-close', 'click');
    // Retail Button
    let button = document.createElement('button');
    button.setAttribute('title', 'Minimize Bot');
    button.setAttribute('class', 'btn-action retail-minimize-button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Minimize Bot');
    button.innerHTML = '<svg class="icon-minus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8548 10C17.2112 10 17.5 10.2799 17.5 10.625C17.5 10.951 17.2424 11.2187 16.9136 11.2475L16.8548 11.25H3.14516C2.78885 11.25 2.5 10.9702 2.5 10.625C2.5 10.299 2.75765 10.0313 3.08644 10.0026L3.14516 10H16.8548Z" fill="#D0D5DD"/></svg>';
    // hostInstance.chatEle.querySelector('.actions-info').append(button);
    // $(hostInstance.chatEle).insertBefore(button,'btn-action-close');
    $(button).insertBefore(hostInstance.chatEle.querySelector('.actions-info .btn-action-close'));
    $(hostInstance.chatEle.querySelector('.actions-info .retail-minimize-button')).off('click').on('click', (e: any) => {
      // hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
      // hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
      // if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
      //   hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
      // } else {
      //   hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
      // }
      // hostInstance.chatEle.classList.add('minimize-chat');
      // if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
      //   hostInstance.setLocalStoreItem('kr-cw-state', 'minimized');
      // }
      // hostInstance.destroy();
      // if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
      //   hostInstance.removeLocalStoreItem('kr-cw-state');
      //   hostInstance.removeLocalStoreItem('kr-cw-uid');
      //   hostInstance.config.botOptions.maintainContext = false;
      // }
      // hostInstance.initial = true;
      hostInstance.chatEle.querySelector('.avatar-variations-footer').click();
    })

  }
}
export default RetailAssistTemplatePlugin;