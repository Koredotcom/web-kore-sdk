import helpers from '../../../utils/helpers';
import KoreGraphAdapter from '../../../libs/kore-graph-adapter/KoreGraphAdapter';
import './barChartTemplate.scss';

class BarChartTemplate {
  config: any={
    graphLib:'d3'
};
constructor(config?:any) {
    config=config ||{};
    this.config = {
        ...this.config,
        ...config
    }
}
  renderMessage(msgData: any) {
    const me: any = this;
  let $ = me.hostInstance.$;
    const helpersObj = helpers;

    if (msgData?.message?.[0]?.component?.payload?.template_type === 'barchart') {
      me.messageHtml = $(me.getTemplateString('barchartTemplate')).tmpl({
        msgData,
        helpers: helpersObj.helpers,
      });

      me.bindEvents(msgData);
      return me.messageHtml;
    }
  }

  bindEvents(msgData: any) {
    const me: any = this;
    const chatWindowInstance = me.hostInstance;
    KoreGraphAdapter.drawBarChartTemplate(msgData, me.messageHtml,me.config);
    setTimeout(() => {
      chatWindowInstance.scrollTop();
      // $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
      KoreGraphAdapter.handleChartOnClick();
    }, 300);
  }

  getTemplateString() {
    const barchartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon barchart"> \
                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                {{if msgData.message[0].component.payload.text}}<div class="messageBubble barchart">\
                    <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                </div>{{/if}}\
                <div class="barchartDiv">\
                    <div class="barChartChildDiv" id="barchart${msgData.messageId}"></div>\
                </div>\
            </li> \
        {{/if}} \
    </scipt>';
    return barchartTemplate;
  }
}

export default BarChartTemplate;
