import SolutionCarouselTemplate from '../templatemanager/templates/v3/solutionTemplates/solutionCarausal/solutionCarausal';
import ItemSelectionList from '../templatemanager/templates/v3/solutionTemplates/itemSelection/itemSelection';
import KoreHelpers from '../utils/helpers';


// const bot = requireKr('/KoreBot.js').instance();

// declare const document:any;
// const $:any = j$.default ;
// declare const callListener:any;


declare const window: any;
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
  helpers: any;
  constructor(config: any) {
    const me = this;
    this.config = { ...this.config, ...config }
    this.helpers = KoreHelpers.helpers;

  }

  onHostCreate() {
    let me = this;
    let cwInstance = me.hostInstance;
    const identifier = cwInstance.messageData?.message?.[0]?.component?.payload?.identifier;

    
    // Add event listener for viewInit
    cwInstance.on("viewInit", (chatWindowEle: any) => {
      me.onInit();
      me.onViewInit();
      me.appendCustomThings();
    });
    // Add event listener for beforeWSSendMessage
    cwInstance.on("beforeWSSendMessage", (chatWindowEle: any) => {
      cwInstance?.chatEle?.querySelector('.quick-replies')?.remove();
    });
    // Add event listener for beforeRenderMessage
    cwInstance.on("beforeRenderMessage", (e: any) => {
      if ((e?.msgData?.type === "currentUser") && cwInstance?.isMaskingEnabled && (e.messageHtml).querySelector('.bubble-msg')) {
        let innerTextContent = (e.messageHtml).querySelector('.bubble-msg').innerText;
        innerTextContent = innerTextContent.replace(/./g, '*');
        (e.messageHtml).querySelector('.bubble-msg').innerText = innerTextContent;
        cwInstance.isMaskingEnabled = false;
      }
    });

    let welcomeMessageKey: string | null = null;
    // Add event listener for onWSMessage
    cwInstance.on("onWSMessage", (e: any) => {
      if (e?.messageData?.type === "bot_response" && e?.messageData?.message?.[0]?.component?.payload?.masking) {
        cwInstance.isMaskingEnabled = true;
      }
      
      const getIdentifier = e?.messageData?.message?.[0]?.component?.payload?.identifier;
    });
    cwInstance.on("onWSOpen", (e: any) => {
      
      console.log(e,'e2 messages')
      const getWelcomeMessageKey = localStorage.getItem('identifierKey');
      if (getWelcomeMessageKey) {
        this.searchQreryParams();
      }
    });  
    cwInstance.on("afterRenderMessage", (e: any) => {
      if (e?.msgData?.type === "bot_response" && e?.msgData?.message?.[0]?.component?.payload?.identifier === "retailWelcomeMessage") {
        localStorage.setItem("identifierKey", e?.msgData?.message?.[0]?.component?.payload?.identifier);
        localStorage.setItem("identifierKey", e?.msgData?.message?.[0]?.component?.payload?.identifier);
          this.searchQreryParams();
      }
    });
  }

  searchQreryParams() {
    let me = this;
    let cwInstance = me.hostInstance;
    // Extracting query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    let stringWithoutQuotes = query?.replace(/"/g, '');
    // Creating message object
    let clientMessageId = new Date().getTime();
    let messageToBot: any = {
      clientMessageId: clientMessageId,
      resourceid: '/bot.message',
    };
    messageToBot["message"] = {
      body: stringWithoutQuotes
    }
    // cwInstance.bot.sendMessage(messageToBot);
    cwInstance.sendMessageToBot(stringWithoutQuotes);
  }
  onViewInit() {
    this.handleQueryParams(new URL(window.location.href));
    window.addEventListener('popstate', this.handleURLChange.bind(this));
  }

  handleQueryParams(url: URL) {
    const queryParams = url.searchParams;
    const query = queryParams.get('query');

    if (query !== null) {
      const cleanedQuery = query.replace(/['"]+/g, ''); // Remove quotes from the query
      console.log('Query parameter:', cleanedQuery);
    } else {
      console.log('Query parameter is missing');
    }
  }

  handleURLChange() {
    // Call handleQueryParams with the updated URL
    this.handleQueryParams(new URL(window.location.href));
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
    $('head').append('<link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">\<link rel="preconnect" href="https://rsms.me/">\<link rel="stylesheet" href="https://rsms.me/inter/inter.css">');
  }

  retailCustomization() {
    let me = this;
    let $ = me.hostInstance.$;
    $(me.hostInstance.chatEle).find('.avatar-variations-footer #helojohn').empty('');
    $(me.hostInstance.chatEle).find('.avatar-variations-footer #helojohn').html('Hello 😊')
    $(me.hostInstance.chatEle).find('.avatar-variations-footer .help-text-content').html(this.helpers.convertMDtoHTML('I am your Virtual Shopping Assistant.\n How can I help you?', "bot"));
  }

  appendCustomThings() {
    let me = this;
    let hostInstance = me.hostInstance;
    let $ = hostInstance.$;
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
      hostInstance.chatEle.querySelector('.avatar-variations-footer').click();
    })

  }
}
export default RetailAssistTemplatePlugin;