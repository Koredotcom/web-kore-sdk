
import helpers from '../../../../../src/utils/helpers';
import './advancedMultiSelect.scss';
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
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        $(messageHtml).off('click', '.singleSelect').on('click', '.singleSelect', function (e:any) {
            var parentContainer = $(e.currentTarget).closest('.listTmplContentBox');
            var allGroups = $(parentContainer).find('.collectionDiv');
            var allcheckboxs = $(parentContainer).find('.checkbox input');
            $(allGroups).removeClass('selected');
            var selectedGroup = $(e.currentTarget).closest('.collectionDiv');
            $(selectedGroup).addClass("selected");
            var groupSelectInput = $(selectedGroup).find('.groupMultiSelect input');
            if (allGroups) {
                if (allGroups && allGroups.length) {
                    for (let i = 0; i < allGroups.length; i++) {
                        if (allGroups && !($(allGroups[i]).hasClass('selected'))) {
                            var allGroupItems = $(allGroups[i]).find('.checkbox input');
                            for (let j = 0; j < allGroupItems.length; j++) {
                                $(allGroupItems[j]).prop("checked", false);
                            }
                        }
                    }
                }
            }
            if (selectedGroup && selectedGroup[0]) {
                var allChecked = true;
                var selectedGroupItems = $(selectedGroup).find('.checkbox.singleSelect input');
                if (selectedGroupItems && selectedGroupItems.length) {
                    for (let i = 0; i < selectedGroupItems.length; i++) {
                        if (!($(selectedGroupItems[i]).prop("checked"))) {
                            allChecked = false;
                        }
                    }
                }
                if (allChecked) {
                    $(groupSelectInput).prop("checked", true);
                } else {
                    $(groupSelectInput).prop("checked", false);
                }
            }
            var showDoneButton = false;
            var doneButton = $(parentContainer).find('.multiCheckboxBtn');
            if (allcheckboxs && allcheckboxs.length) {
                for (let i = 0; i < allcheckboxs.length; i++) {
                    if ($(allcheckboxs[i]).prop("checked")) {
                        showDoneButton = true;
                    }
                }
            }
            if (showDoneButton) {
                $(doneButton).removeClass('hide');
            } else {
                $(doneButton).addClass('hide');
            }
        });
        $(messageHtml).off('click', '.viewMoreGroups').on('click', '.viewMoreGroups', function (e:any) {
            var parentContainer = $(e.currentTarget).closest('.listTmplContentBox')
            var allGroups = $(parentContainer).find('.collectionDiv');
            $(allGroups).removeClass('hide');
            $(".viewMoreContainer").addClass('hide');
        });
        $(messageHtml).off('click', '.groupMultiSelect').on('click', '.groupMultiSelect', function (e:any) {
            var clickedGroup = $(e.currentTarget).find('input');
            var clickedGroupStatus = $(clickedGroup[0]).prop('checked');
            var selectedGroup = $(e.currentTarget).closest('.collectionDiv');
            var selectedGroupItems = $(selectedGroup).find('.checkbox input');
            var parentContainer = $(e.currentTarget).closest('.listTmplContentBox')
            var allcheckboxs = $(parentContainer).find('.checkbox input');
            if (allcheckboxs && allcheckboxs.length) {
                for (let i = 0; i < allcheckboxs.length; i++) {
                    $(allcheckboxs[i]).prop("checked", false);
                }
            }
            if (clickedGroupStatus) {
                if (selectedGroupItems && selectedGroupItems.length) {
                    for (let i = 0; i < selectedGroupItems.length; i++) {
                        $(selectedGroupItems[i]).prop("checked", true);
                    }
                }
            } else {
                if (selectedGroupItems && selectedGroupItems.length) {
                    for (let i = 0; i < selectedGroupItems.length; i++) {
                        $(selectedGroupItems[i]).prop("checked", false);
                    }
                }
            }
            var showDoneButton = false;
            var doneButton = $(parentContainer).find('.multiCheckboxBtn');
            if (allcheckboxs && allcheckboxs.length) {
                for (let i = 0; i < allcheckboxs.length; i++) {
                    if ($(allcheckboxs[i]).prop("checked")) {
                        showDoneButton = true;
                    }
                }
            }
            if (showDoneButton) {
                $(doneButton).removeClass('hide');
            } else {
                $(doneButton).addClass('hide');
            }
        });
        $(messageHtml).find(".multiCheckboxBtn").on('click', function (e:any) {
            let msgData : any;
            if($(messageHtml).data().tmplItem && $(messageHtml).data().tmplItem.data && $(messageHtml).data().tmplItem.data.msgData){
                msgData =  $(messageHtml).data().tmplItem.data.msgData
            }else{
                msgData = $(messageHtml).data();
            } 
            if (msgData.message[0].component.payload.sliderView === true) {
                msgData.message[0].component.payload.sliderView = false;
                chatWindowInstance.renderMessage(msgData);
                chatWindowInstance.bottomSliderAction("hide");
            }
            msgData.message[0].component.payload.sliderView = false;
            var checkboxSelection = $(e.currentTarget.parentElement).find('.checkInput:checked');
            var selectedValue = [];
            var toShowText = [];
            for (var i = 0; i < checkboxSelection.length; i++) {
                selectedValue.push($(checkboxSelection[i]).attr('value'));
                toShowText.push($(checkboxSelection[i]).attr('text'));
            }
            // $('.chatInputBox').text('Here are the selected items ' + ': ' + selectedValue.toString());
            chatWindowInstance.assignValueToInput('Here are the selected items ' + ': ' + selectedValue.toString());
            chatWindowInstance.sendMessage($('.chatInputBox'), 'Here are the selected items ' + ': ' + toShowText.toString());
            $(messageHtml).find(".multiCheckboxBtn").hide();
            $(messageHtml).find(".advancedMultiSelectScroll").css({ "pointer-events": "none" });
            $(messageHtml).find(".advancedMultiSelectScroll").css({ "overflow": "hidden" });

        })
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
                                                            <p class="multiTitle">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}</p>\
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
                                                                <p class="multiTitle">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}</p>\
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