import helpers from '../../../utils/helpers';
import './checkList.scss';
class CheckListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "checkListTemplate") {
            me.messageHtml = $(me.getTemplateString("checkListTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml, msgData);
            return me.messageHtml;
        }
    }

    bindEvents(ele: any, messageData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        me.bindPercentages(ele, messageData, $);
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.off('click', '.subelement-info').on('click', '.subelement-info', function (e: any) {
            e.stopPropagation();
            let actionObj = $(e.currentTarget).attr('actionObj');
            if (actionObj) {
                let parsedActionObj = JSON.parse(actionObj);
                let type = parsedActionObj.type;
                if (type == 'postback') {
                    let payload = parsedActionObj.payload;
                    let renderMsg = parsedActionObj.title;
                    chatWindowInstance.sendMessage(payload, { renderMsg });
                } else if (type == 'url') {
                    let link = parsedActionObj.url;
                    chatWindowInstance.openExternalLink(link);
                }
            }
        })
        _chatContainer.off('click', '.checklist-element').on('click', '.checklist-element', function (e: any) {
            e.stopPropagation();
            let actionObj = $(e.currentTarget).attr('actionObj');
            if (actionObj) {
                let parsedActionObj = JSON.parse(actionObj);
                let type = parsedActionObj.type;
                if (type == 'postback') {
                    let payload = parsedActionObj.payload;
                    let renderMsg = parsedActionObj.title;
                    chatWindowInstance.sendMessage(payload, { renderMsg });
                } else if (type == 'url') {
                    let link = parsedActionObj.url;
                    chatWindowInstance.openExternalLink(link);
                }
            }
        })
        _chatContainer.off('click', '.subelement-info .subelement-header .icon-block').on('click', '.subelement-info .subelement-header .icon-block', function (e: any) {
            e.stopPropagation();
            let actionObj = $(e.currentTarget).attr('actionObj');
            if (actionObj) {
                let parsedActionObj = JSON.parse(actionObj);
                let type = parsedActionObj.type;
                if (type == 'postback') {
                    let payload = parsedActionObj.payload;
                    let renderMsg = parsedActionObj.title;
                    chatWindowInstance.sendMessage(payload, { renderMsg });
                } else if (type == 'url') {
                    let link = parsedActionObj.url;
                    chatWindowInstance.openExternalLink(link);
                }
            }
        })
        _chatContainer.off('click', '.chevron-subelement').on('click', '.chevron-subelement', function (e: any) {
            e.stopPropagation();
            $(e.currentTarget).toggleClass('open');
            let ind = $(e.currentTarget).attr('subElementIndex');
            let msgId = $(e.currentTarget).attr('msgId')
            $('[subElementItem="' + msgId + '-' + ind + '"]').toggleClass('show');
        })
    }

    bindPercentages(ele: any, messageData: any, $: any) {
        if (messageData && messageData.message[0].component.payload.elements.length) {
            for (let i = 0; i < messageData.message[0].component.payload.elements.length; i++) {
                let element = messageData.message[0].component.payload.elements[i];
                let id = i;
                let HTMLElement = $(ele).find('#' + id);
                let progressStyles = element.progressStyles;
                let percentage = parseInt(element.taskProgress);
                if (HTMLElement && progressStyles) {
                    for (let j = 0; j < Object.keys(progressStyles).length; j++) {
                        let key = Object.keys(progressStyles)[j];
                        if (key == 'background') {
                            $(HTMLElement).find('.checklist-progress#progress' + id).append('<style>#progress' + id + ':before{background-image:conic-gradient(transparent ' + percentage + '%, ' + progressStyles[key] + ' ' + percentage + '%)}</style>');
                        } else if (key === 'fillColor') {
                            $(HTMLElement).find('.checklist-progress').css('--percentage', (percentage * 1) + '%');
                            let image = 'conic-gradient(' + progressStyles[key] + ' 100%, ' + progressStyles[key] + ' 100%, ' + progressStyles[key] + ' 100%)';
                            $(HTMLElement).find('.checklist-progress').css({ 'background-image': image });
                        } else if (key === 'textcolor') {
                            $(HTMLElement).find('.checklist-percentage').css({ 'color': progressStyles[key] });
                        }
                    }
                } else {
                    $(HTMLElement).find('.checklist-progress').css('--percentage', (percentage * 1) + '%');
                }
            }
        }
    }

    getTemplateString() {
        var checkListTemplate = '<script id="chat_checklist_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon" id="${msgData.messageId || msgItem.clientMessageId}"> \
               <div class="check-list-template">\
                       {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        {{if msgData.message[0].component.payload.sliderView}} <button class="close-button" title="Close"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>{{/if}}\
                        <div class="check-list-template-content">\
                            {{if msgData.message[0].component.payload.title}}<div class="templateHeading">${msgData.message[0].component.payload.title}</div>{{/if}}\
                            {{if msgData.message[0].component.payload.elements}}\
                               <div class="check-list-elements">\
                                       {{each(key,element) msgData.message[0].component.payload.elements}}\
                                      <div class="checklist-element {{if element.default_action}}clickable{{/if}}" {{if element.elementStyles}}style="{{each(styleKey,style) element.elementStyles}}${styleKey}:${style};{{/each}}"{{/if}} id="${element.id}" {{if element.default_action}}actionObj="${JSON.stringify(element.default_action)}"{{/if}}>\
                                        <div class="checklist-heading">\
                                            <div class="left-info-sec-data">\
                                                <div class="headig-with-progress">\
                                                    <div class="element-title-block">${element.title}\</div>\
                                                </div>\
                                                <div class="checklist-options-wrapper"> \
                                                    {{if element.subInformation}}\
                                                        <div class="checklist-options">\
                                                            {{each(optionkey,option) element.subInformation}}\
                                                                <div class="option-info">\
                                                                    <div class="option-title">${option.title}</div>\
                                                                    <div class="option-value">${option.value}</div>\
                                                                </div>\
                                                            {{/each}}\
                                                        </div>\
                                                    {{/if}}\
                                                </div> \
                                            </div>\
                                            <div class="progress-data-block">\
                                                {{if element.taskProgress}}\
                                                    <div class="checklist-progress" id="progress${element.id}">\
                                                        <div class="checklist-percentage">\
                                                        ${element.taskProgress}\
                                                        </div>\
                                                    </div>\
                                                {{/if}}\
                                                <div class="chevron-subelement" subElementIndex="${key}" msgId="${msgData.messageId}">\
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">\
                                                        <path d="M6 9L12 15L18 9" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\
                                                    </svg>\
                                                </div> \
                                            </div>\
                                        </div>\
                                        {{if element.subElements &&  element.subElements.length}}\
                                          <div class="checklist-subElements" subElementItem="${msgData.messageId}-${key}">\
                                             {{each(subElementKey,subElement) element.subElements}}\
                                                <div class="subelement-info" {{if subElement.default_action}}actionObj="${JSON.stringify(subElement.default_action)}"{{/if}}>\
                                                        <div class="subelement-header">\
                                                            <div class="subelemt-title-text">${subElement.title}</div>\
                                                            {{if subElement.rightContent && subElement.rightContent.icon}}\
                                                                <div class="icon-block" actionObj="${JSON.stringify(subElement.rightContent.default_action)}">\
                                                                    <img src="${subElement.rightContent.icon}">\
                                                                </div>\
                                                            {{/if}}\
                                                        </div>\
                                                        {{if subElement.values}}\
                                                            <div class="subelemnt-values">\
                                                                {{each(valkey,val) subElement.values}}\
                                                                    <div class="subelement-value">\
                                                                        <span class="val-title">${val.title}</span>\
                                                                        {{if val.icon}}\
                                                                                <span class="val-icon"><img src="${val.icon}"></span>\
                                                                        {{/if}}\
                                                                        <span class="val-value">${val.value}</span>\
                                                                    </div>\
                                                                {{/each}}\
                                                            </div>\
                                                        {{/if}}\
                                                </div>\
                                             {{/each}}\
                                          </div>\
                                        {{/if}}\
                                      </div>\
                                    {{/each}}\
                               </div>\
                            {{/if}}\
                        </div>\
               </div>\
            </li>\
            {{/if}} \
        </script>';
        return checkListTemplate;
    }
}

export default CheckListTemplate;