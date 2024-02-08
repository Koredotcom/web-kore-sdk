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
  helpers: any;
  constructor(config: any) {
    const me = this;
    this.config = { ...this.config, ...config }
    this.helpers = KoreHelpers.helpers;
  }
  onHostCreate() {
    let me = this;
    let cwInstance = me.hostInstance;
    
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
    // Add event listener for onWSMessage
    cwInstance.on("onWSMessage", (e: any) => {
      if (e?.messageData?.type === "bot_response" && e?.messageData?.message?.[0]?.component?.payload?.masking) {
        cwInstance.isMaskingEnabled = true;
      }
    });
    cwInstance.on("onWSOpen", (e: any) => {
      console.log(e,'event')
      const query = e.query;
      cwInstance.bot.sendMessage(query);
      console.log(query, 'query----')
    });
  }


  // onViewInit() {
  //   // Function to handle query parameters
  //   const handleQueryParams = (url: any) => {
  //     // Get the current URL search params
  //     // const url = new URL(window.location.href);
  //     const queryParams = url.searchParams;
  //     const query = queryParams.get('query');

  //     // Check if query exists
  //     if (query !== null) {
  //       // Print the value of the query parameter
  //       console.log('Query parameter:', query);
  //     } else {
  //       console.log('Query parameter is missing');
  //     }
  //   };
  //   const url = new URL('https://retail-assist.s3.amazonaws.com/releases/dev/R2.1/bot/index.html?query=%22show%20me%20washers%22');

  //   // Call the function initially
  //   handleQueryParams(url);

  //   // Add event listener to handle URL changes
  //   // window.onpopstate = function(event) {
  //   //     // Call the function whenever the URL changes
  //   //     handleQueryParams();
  //   // };
  // }
  onViewInit() {
    const cwInstance = this.hostInstance;
    // Function to handle query parameters
    const handleQueryParams = () => {
        // Get the current URL search params
        const url = new URL(window.location.href);
        const queryParams = url.searchParams;
        const query = queryParams.get('query');

        // Check if query exists
        if (query !== null) {
            // Print the value of the query parameter
            console.log('Query parameter:', query);
            // Trigger the onWSOpen event with the query parameter
            const event = { query };
            cwInstance.trigger('onWSOpen', event);
        } else {
            console.log('Query parameter is missing');
        }
    };

    // Call the function initially
    handleQueryParams();

    // Add event listener to handle URL changes
    window.onpopstate = function (event) {
        // Call the function whenever the URL changes
        handleQueryParams();
    };
}




  // onViewInit() {
  //   // Function to handle query parameters
  //   const handleQueryParams = () => {
  //     // Get the current URL search params
  //     const queryParams = new URLSearchParams("http://myTest.net/oapi/reqAd.jsp?adspace=0&apiver=502&cb=5c1ec2fd99bc41ed8a66729a7e26&client=SDK&criteo_uid=1&dimension=xxlarge&dimensionstrict=true&divid=testdiv&fcid=a9ac1a7d-b157-9529-b54d-cd899d4136f7&format=all&formatstrict=false&pb=0&pub=0&sbiframe=0&session=1e52676b-7208-8c30-2a24-875bf8a88479&response=JSON");
  // // const queryParams = "http://myTest.net/oapi/reqAd.jsp?adspace=0&apiver=502&cb=5c1ec2fd99bc41ed8a66729a7e26&client=SDK&criteo_uid=1&dimension=xxlarge&dimensionstrict=true&divid=testdiv&fcid=a9ac1a7d-b157-9529-b54d-cd899d4136f7&format=all&formatstrict=false&pb=0&pub=0&sbiframe=0&session=1e52676b-7208-8c30-2a24-875bf8a88479&response=JSON";

  //     const param1 = queryParams.get('param1');
  //     const param2 = queryParams.get('param2');

  //     // Check if param1 and param2 exist
  //     if (param1 !== null && param2 !== null) {
  //       // Construct the string to send to the BOT
  //       const paramString = `param1=${param1}&param2=${param2}`;

  //       // Send the string to the BOT using cwInstance
  //       // cwInstance.send(paramString); 

  //       // Perform actions based on the parameters
  //       console.log('param1:', param1);
  //       console.log('param2:', param2);
  //     } else {
  //       console.log('param1 or param2 is missing');
  //     }
  //   };

  //   // Call the function initially
  //   handleQueryParams();

  //   // Add event listener to handle URL changes
  //   window.onpopstate = function(event) {
  //     // Call the function whenever the URL changes
  //     handleQueryParams();
  //   };
  // }


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