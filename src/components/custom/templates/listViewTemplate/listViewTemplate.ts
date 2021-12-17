
import helpers from '../../../../../src/utils/helpers';
import './listViewTemplate.scss';
class ListViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "listView") {
            me.messageHtml = $(me.getTemplateString('templatelistView')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            $(me.messageHtml).data(msgData);
            if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.fromHistory) {
                $(me.messageHtml).css({ "pointer-events": "none" });
            }
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        const _chatContainer = chatWindowInstance.config.chatContainer;
        $(messageHtml).off('click', '.listViewTmplContent .seeMoreList').on('click', '.listViewTmplContent .seeMoreList', function () {
            if ($(".list-template-sheet").length !== 0) {
                $(".list-template-sheet").remove();
                me.listViewTabs();
            }
            else if ($(".list-template-sheet").length === 0) {
                me.listViewTabs();
            }
        });
        $(messageHtml).find(".listViewLeftContent").on('click', function (e: any) {
            let selectedTarget = e.currentTarget;
            if ($(selectedTarget).attr('data-url')) {
                var a_link = $(selectedTarget).attr('data-url');
                if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
                    a_link = "http:////" + a_link;
                }
                var _tempWin = window.open(a_link, "_blank");
            } else {
                var _innerText = $(selectedTarget).attr('data-value');
                var postBack = $(selectedTarget).attr('data-title');
                chatWindowInstance.sendMessage($('.chatInputBox').text(_innerText), postBack);
                $(".listViewTmplContentBox").css({ "pointer-events": "none" });
            }
        });


    }
    listViewTabs() {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        const _chatContainer = chatWindowInstance.config.chatContainer;
        let helpersObj = new helpers();
        var msgData = $("li.fromOtherUsers.with-icon.listView").data();
        if (msgData.message[0].component.payload.seeMore) {
            msgData.message[0].component.payload.seeMore = false;
        }
        var listValues = $(me.getTemplateString("actionSheetTemplate")).tmpl({
            'msgData': msgData,
            'dataItems': msgData.message[0].component.payload.moreData[Object.keys(msgData.message[0].component.payload.moreData)[0]],
            'tabs': Object.keys(msgData.message[0].component.payload.moreData),
            'helpers': helpersObj.helpers
        });

        $($(listValues).find(".tabs")[0]).addClass("active");
        $(".kore-action-sheet").append(listValues);
        $(".kore-action-sheet .list-template-sheet").removeClass("hide");
        chatWindowInstance.bottomSliderAction('show', $(".list-template-sheet"));
        $(".kore-action-sheet .list-template-sheet .displayMonth .tabs").on('click', function (e: any) {
            var _selectedTab = $(e.target).text();
            var msgData = $("li.fromOtherUsers.with-icon.listView").data();
            var viewTabValues = $(me.getTemplateString("actionSheetTemplate")).tmpl({
                'msgData': msgData,
                'dataItems': msgData.message[0].component.payload.moreData[_selectedTab],
                'tabs': Object.keys(msgData.message[0].component.payload.moreData),
                'helpers': helpersObj.helpers
            });
            $(".list-template-sheet .displayMonth").find(".tabs").removeClass("active");
            $(".list-template-sheet .displayMonth").find(".tabs[data-tabid='" + _selectedTab + "']").addClass("active");
            $(".list-template-sheet .displayListValues").html($(viewTabValues).find(".displayListValues"));
            $(".kore-action-sheet .list-template-sheet .listViewLeftContent").on('click', function (e: any) {
                let _selectedTarget = e.currentTarget
                me.valueClick(_selectedTarget);
            });
        });
        $(".kore-action-sheet .list-template-sheet .close-button").on('click', function (event: any) {
            chatWindowInstance.bottomSliderAction('hide');
        });
        $(".kore-action-sheet .list-template-sheet .listViewLeftContent").on('click', function (e: any) {
            let _selectedTarget = e.currentTarget
            me.valueClick(_selectedTarget);
        });
    };
    valueClick(_self: any, actionObj: any) {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        const _chatContainer = chatWindowInstance.config.chatContainer;
        if (actionObj) {
            if (actionObj.type === "url") {
                window.open(actionObj.url, "_blank");
                return;
            }
            if (actionObj.payload) {
                var _innerText = actionObj.payload;
                var eData: any = {};
                eData.payload = _self.innerText || actionObj.title;
                chatWindowInstance.sendMessage($('.chatInputBox').text(_innerText), eData.payload);
            }
            if (_self && _self.hasClass("dropdown-contentWidgt")) {
                $(_self).hide();
            }
        } else {
            if ($(_self).attr('data-url') || $(_self).attr('url')) {
                var a_link = $(_self).attr('data-url') || $(_self).attr('url');
                if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
                    a_link = "http:////" + a_link;
                }
                var _tempWin = window.open(a_link, "_blank");
            } else {
                var _innerText = $(_self).attr('data-value');
                var postBack = $(_self).attr('data-title');
                chatWindowInstance.sendMessage($('.chatInputBox').text(_innerText), postBack);
                $(".kore-action-sheet .list-template-sheet").animate({ height: 'toggle' });
                chatWindowInstance.bottomSliderAction("hide");
                $(".listViewTmplContentBox").css({ "pointer-events": "none" });
            }
        }

    }
    getTemplateString(type: any) {
        var listViewTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon listView"> \
                <div class="listViewTmplContent {{if msgData.message[0].component.payload.boxShadow}}noShadow{{/if}}"> \
                    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <ul class="listViewTmplContentBox"> \
                        {{if msgData.message[0].component.payload.text || msgData.message[0].component.payload.heading}} \
                            <li class="listViewTmplContentHeading"> \
                                {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].component.payload.sliderView}} <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,           PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>{{/if}}\
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </li> \
                        {{/if}} \
                        <div class="listItems">\
                        {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                        {{if (msgData.message[0].component.payload.seeMore && key < msgData.message[0].component.payload.moreCount) || (!msgData.message[0].component.payload.seeMore)}}\
                                    <li class="listViewTmplContentChild"> \
                                        {{if msgItem.image_url}} \
                                            <div class="listViewRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                                <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                            </div> \
                                        {{/if}} \
                                        <div class="listViewLeftContent" data-url="${msgItem.default_action.url}" data-title="${msgItem.default_action.title}" data-value="${msgItem.default_action.title}"> \
                                            <span class="titleDesc">\
                                            <div class="listViewItemTitle" title="${msgItem.title}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                            {{if msgItem.subtitle}}<div class="listViewItemSubtitle" title="${msgItem.subtitle}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                            </span>\
                                        {{if msgItem.value}}<div class="listViewItemValue" title="${msgItem.value}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.value, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.value, "user")}} {{/if}}</div>{{/if}} \
                                        </div>\
                                    </li> \
                                    {{/if}}\
                        {{/each}} \
                        </div>\
                        {{if msgData && msgData.message && msgData.message.length && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length && msgData.message[0].component.payload.buttons[0].title}}\
                        <li class="seeMore"> \
                            <span class="seeMoreList">${msgData.message[0].component.payload.buttons[0].title}</span> \
                        </li> \
                        {{/if}}\
                    </ul> \
                </div> \
            </li> \
        {{/if}} \
     </script>';
        var listActionSheetTemplate = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
     <div class="list-template-sheet hide">\
      {{if msgData.message}} \
        <div class="sheetHeader">\
          <span class="choose">${msgData.message[0].component.payload.heading}</span>\
          <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,           PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
        </div>\
        <div class="listTemplateContainer" >\
             <div class="displayMonth">\
                 {{each(key, tab) tabs}} \
                     <span class="tabs" data-tabid="${tab}"><span class="btnBG">${tab}</span></span>\
                 {{/each}}\
             </div>\
               <ul class="displayListValues">\
                   {{each(key, msgItem) dataItems}} \
                        <li class="listViewTmplContentChild"> \
                              {{if msgItem.image_url}} \
                                  <div class="listViewRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                     <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                 </div> \
                             {{/if}} \
                                 <div class="listViewLeftContent" data-url="${msgItem.default_action.url}" data-title="${msgItem.default_action.title}" data-value="${msgItem.default_action.title}"> \
                                    <span class="titleDesc">\
                                        <div class="listViewItemTitle" title="${msgItem.title}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                         {{if msgItem.subtitle}}<div class="listViewItemSubtitle" title="${msgItem.subtitle}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                     </span>\
                                         {{if msgItem.value}}<div class="listViewItemValue" title="${msgItem.value}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.value, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.value, "user")}} {{/if}}</div>{{/if}} \
                                 </div>\
                         </li> \
                    {{/each}} \
                </ul> \
        </div>\
    {{/if}}\
    </div>\
    </script>';

        if (type === 'templatelistView') {
            return listViewTemplate;
        } else if (type === 'actionSheetTemplate') {
            return listActionSheetTemplate;
        }
    }

}

export default ListViewTemplate;