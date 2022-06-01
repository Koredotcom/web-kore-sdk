
import helpers from '../../../utils/helpers';
import KoreGraphAdapter from '../../../../libs/KoreGraphAdapter';
import './pieChartTemplate.scss';

class PieChartTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "piechart") {
            me.messageHtml = $(me.getTemplateString('pieChartTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });

            me.bindEvents(msgData);
            return me.messageHtml;
        }
    }
    bindEvents(msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        KoreGraphAdapter.drawPieChartTemplate(msgData, me.messageHtml);
        setTimeout(() => {
            // $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
            chatWindowInstance.scrollTop();
            KoreGraphAdapter.handleChartOnClick();
        }, 200);
    }
    getTemplateString() {
        var pieChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon piechart"> \
                {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                {{if msgData.message[0].component.payload.text}}<div class="messageBubble pieChart">\
                    <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                </div>{{/if}}\
                <div id="d3Pie">\
                </div>\
                <div class="piechartDiv">\
                    <div class="lineChartChildDiv" id="piechart${msgData.messageId}"></div>\
                </div>\
            </li> \
        {{/if}} \
    </scipt>';

        return pieChartTemplate;
    }

}

export default PieChartTemplate;