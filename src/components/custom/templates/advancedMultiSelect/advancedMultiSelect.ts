
import helpers from '../../../../../src/utils/helpers'

class AdvancedMultiSelectTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "advanced_multi_select") {
            me.messageHtml = $(me.getTemplateString('advancedMultiSelect')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {
    
    }
    getTemplateString() {
        var advancedMultiSelect = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                <div class = "listTmplContent advancedMultiSelect"> \
                    {{if msgData.createdOn && !msgData.message[0].component.payload.sliderView}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <ul class="{{if msgData.message[0].component.payload.fromHistory}} fromHistory listTmplContentBox  {{else}} listTmplContentBox{{/if}} "> \
                        {{if msgData.message[0].component.payload.title || msgData.message[0].component.payload.heading}} \
                        <div class="advMultiSelectHeader">\
                            <h4 class="advMultiSelectHeaderTitle">${(msgData.message[0].component.payload.title) || (msgData.message[0].component.payload.heading)}{{if msgData.message[0].component.payload.sliderView}}<div class="closeIcon closeBottomSlider"></div>{{/if}}</h4>\
                            <p class="orderDate">${msgData.message[0].component.payload.description}</p>\
                        </div>\
                        {{/if}} \
                        <div class="advancedMultiSelectScroll">\
                          {{each(index, element) msgData.message[0].component.payload.elements}} \
                          <div class="collectionDiv {{if msgData.message[0].component.payload.showViewMore && (index >= msgData.message[0].component.payload.limit)}}hide{{/if}}">\
                                {{if element.collection && element.collection.length}}\
                                    {{if element && element.collection && element.collection.length > 1}}\
                                        <div class="checkbox checkbox-primary styledCSS checkboxesDiv groupMultiSelect"> \
                                        <input  class = "checkInput " type="checkbox" text = "${element.collectionName}" value = "${element.collectionName}" id="${element.collectionName}${msgData.messageId}${index}"> \
                                            <label for="${element.collectionName}${msgData.messageId}${index}">\
                                                    {{if element && element.collectionHeader}}\
                                                    <div class="imgDescContainer">\
                                                        <div class="checkImgContainer">\
                                                            <img src="https://image12.coupangcdn.com/image/displayitem/displayitem_8ad9b5e0-fd76-407b-b820-6494f03ffc31.jpg">\
                                                        </div>\
                                                        <div class="multiSelectDescContainer">\
                                                            <p class="multiTitle">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}\</p>\
                                                            <p class="multiDesc">Consultation on weekends and holidays</p>\
                                                        </div>\
                                                    </div>\
                                                    {{else}}\
                                                    Select all\
                                                    {{/if}}\
                                                </label> \
                                        </div> \
                                    {{/if}}\
                                    {{each(key, msgItem) element.collection}} \
                                        {{if msgData.message[0].component.payload.buttons}} \
                                            <li class="listTmplContentChild"> \
                                                <div class="checkbox checkbox-primary styledCSS checkboxesDiv singleSelect {{if !msgItem.description}}nodescription{{/if}} {{if !msgItem.description && !msgItem.image_url}}noImgdescription{{/if}}"> \
                                                    <input  class = "checkInput" type="checkbox" text = "${msgItem.title}" value = "${msgItem.value}" id="${msgItem.value}${msgData.messageId}${index}${key}"> \
                                                    <label for="${msgItem.value}${msgData.messageId}${index}${key}">\
                                                        <div class="imgDescContainer">\
                                                            {{if msgItem.image_url}}\
                                                                <div class="checkImgContainer">\
                                                                    <img src="${msgItem.image_url}">\
                                                                </div>\
                                                            {{/if}}\
                                                            <div class="multiSelectDescContainer">\
                                                                <p class="multiTitle">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}\</p>\
                                                                {{if msgItem.description}}\
                                                                <p class="multiDesc">${msgItem.description}</p>\
                                                                {{/if}}\
                                                            </div>\
                                                        </div>\
                                                    </label> \
                                                </div> \
                                            </li> \
                                        {{/if}} \
                                    {{/each}} \
                                {{/if}}\
                            </div>\
                          {{/each}} \
                          {{if !(msgData.message[0].component.payload.fromHistory)}}\
                          <li class="viewMoreContainer {{if !(msgData.message[0].component.payload.showViewMore) || (msgData.message[0].component.payload.showViewMore && (msgData.message[0].component.payload.elements.length <= msgData.message[0].component.payload.limit))}}hide{{/if}}"> \
                              <span class="viewMoreGroups">ViewMore</span> \
                          </li> \
                          {{/if}}\
                          </div>\
                        {{if !(msgData.message[0].component.payload.fromHistory) && msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length}}\
                        <li class="multiCheckboxBtn hide">\
                            <span title="Here are your selected items " class="{{if msgData.message[0].component.payload.fromHistory}} hide  {{else}} viewMore {{/if}}" type="postback" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                        </li> \
                        {{/if}}\
                    </ul> \
                </div> \
            </li> \
        {{/if}} \
       </scipt>';

        return advancedMultiSelect;
    }

}

export default AdvancedMultiSelectTemplate;