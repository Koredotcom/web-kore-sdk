
import helpers from '../../../../../src/utils/helpers';
import './ratingTemplate.scss';
class RatingTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.template_type === "feedbackTemplate" && (msgData.message[0].component.payload.view === "star" || msgData.message[0].component.payload.view === "emojis"))) {
            me.messageHtml = $(me.getTemplateString('ratingTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find(".ratingMainComponent").off('click', '[type*="radio"]').on('click', '[type*="radio"]', function (e: any) {
            var _innerText: any = $(e.currentTarget).attr('value');
            var msgData: any;
            if ($(messageHtml).data().tmplItem && $(messageHtml).data().tmplItem.data && $(messageHtml).data().tmplItem.data.msgData) {
                msgData = $(messageHtml).data().tmplItem.data.msgData
            } else {
                msgData = $(messageHtml).data();
            }
            var silderValue = msgData.message[0].component.payload.sliderView;
            if ($("label.active")) {
                $("label").removeClass("active");
            }
            for (let i = parseInt(_innerText); i > 0; i--) {
                $('label[for="' + i + '-stars"]').addClass("active");
            }
            if (_innerText == msgData.message[0].component.payload.starArrays.length) {
                var messageTodisplay = msgData.message[0].component.payload.messageTodisplay;
                $(".suggestionsMainComponent").remove();
                $(".ratingStar").remove();
                if ($(".submitButton")) {
                    $(".submitButton").remove();
                }
                $(".kore-action-sheet").find(".ratingMainComponent").append('<div class="ratingStar">' + messageTodisplay + '</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
            } else {
                if ($(".submitButton")) {
                    $(".submitButton").remove();
                }
                $(".ratingStar").remove();
                if ($(".suggestionsMainComponent").length > 0) {
                    $(".suggestionsMainComponent").remove();
                    $(".kore-action-sheet").find(".ratingMainComponent").append(me.suggestionComponent());
                } else {
                    $(".kore-action-sheet").find(".ratingMainComponent").append(me.suggestionComponent());
                }
            }
            if (silderValue === false) {
                //chatWindowInstance.assignValueToInput(_innerText);
                chatWindowInstance.sendMessage(_innerText);
                $(".ratingMainComponent").css({ "pointer-events": "none" });
            }
            $(".buttonTmplContent .ratingMainComponent .submitBtn").click(function () {
                msgData.message[0].component.payload.sliderView = false;
                if (_innerText == msgData.message[0].component.payload.starArrays.length) {
                    var messageTodisplay = msgData.message[0].component.payload.messageTodisplay;
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(_innerText + " :" + messageTodisplay);
                    chatWindowInstance.sendMessage( _innerText + " :" + messageTodisplay);
                } else if ($(".suggestionInput").val() == "") {
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(_innerText);
                    chatWindowInstance.sendMessage(_innerText)
                } else {
                    var messageDisplay = $(".suggestionInput").val();
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(_innerText + " :" + messageDisplay)
                    chatWindowInstance.sendMessage( _innerText + " :" + messageDisplay);
                }
                chatWindowInstance.bottomSliderAction("hide");
                msgData.message[0].component.payload.sliderView = true;
            });
        });
        $(messageHtml).find(".buttonTmplContent .ratingMainComponent .close-btn").click(function (e: any) {
            chatWindowInstance.bottomSliderAction("hide");
            e.stopPropagation();
        });
        $(messageHtml).find(".emojiComponent").off('click', '.rating').on('click', '.rating', function (e: any) {
            var msgData = $(messageHtml).data();
            var sliderValue = msgData.message[0].component.payload.sliderView;
            if ($(messageHtml).find(".emojiComponent .active").length == "0") {
                $(".emojiElement").remove();
            }
            let selectedTarget = e.currentTarget;
            var emojiValue = $(selectedTarget).attr("value");
            $(e.currentTarget).addClass("active");
            if ($(selectedTarget).attr("id") == "rating_1" && $("#rating_1.active")) {
                $("<img class='emojiElement' />").attr('src', 'libs/images/emojis/gifs/rating_1.gif').appendTo(selectedTarget)
                $(e.currentTarget).removeClass("active");
            } else if ($(selectedTarget).attr("id") == "rating_2" && $("#rating_2.active")) {
                $("<img class='emojiElement' />").attr('src', 'libs/images/emojis/gifs/rating_2.gif').appendTo(selectedTarget)
                $(e.currentTarget).removeClass("active");
            } else if ($(selectedTarget).attr("id") == "rating_3" && $("#rating_3.active")) {
                $("<img class='emojiElement' />").attr('src', 'libs/images/emojis/gifs/rating_3.gif').appendTo(selectedTarget)
                $(e.currentTarget).removeClass("active");
            } else if ($(selectedTarget).attr("id") == "rating_4" && $("#rating_4.active")) {
                $("<img class='emojiElement' />").attr('src', 'libs/images/emojis/gifs/rating_4.gif').appendTo(selectedTarget)
                $(e.currentTarget).removeClass("active");
            } else if ($(selectedTarget).attr("id") == "rating_5" && $("#rating_5.active")) {
                $("<img class='emojiElement' />").attr('src', 'libs/images/emojis/gifs/rating_5.gif').appendTo(selectedTarget)
                $(e.currentTarget).removeClass("active");
            }
            if ($(selectedTarget).attr("value") < "5") {
                $(".ratingStar").remove();
                if ($(".submitButton")) {
                    $(".submitButton").remove();
                }
                if ($(".suggestionsMainComponent").length > 0) {
                    $(".suggestionsMainComponent").remove();
                }
                $(".kore-action-sheet").find(".emojiComponent").append(me.suggestionComponent());

            } else {
                if ($(".submitButton")) {
                    $(".submitButton").remove();
                }
                if ($(".ratingStar").length > 0) {
                    $(".ratingStar").remove();
                }
                var messageTodisplay = msgData.message[0].component.payload.messageTodisplay;
                $(".suggestionsMainComponent").remove();
                $(".kore-action-sheet").find(".emojiComponent").append('<div class="ratingStar">' + messageTodisplay + '</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
            }
            if (sliderValue === false) {
                //chatWindowInstance.assignValueToInput(emojiValue)
                chatWindowInstance.sendMessage(emojiValue);
            }
            $(".emojiComponent").off('click', '.submitBtn').on('click', '.submitBtn', function () {
                msgData.message[0].component.payload.sliderView = false;
                if (emojiValue == "5") {
                    var messageTodisplay = msgData.message[0].component.payload.messageTodisplay
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(emojiValue + " :" + messageTodisplay)
                    chatWindowInstance.sendMessage(emojiValue + " :" + messageTodisplay,{renderMsg:"Rating" + ': ' + emojiValue + " and " + messageTodisplay});
                } else if ($(".suggestionInput").val() == "") {
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(emojiValue)
                    chatWindowInstance.sendMessage( emojiValue);
                } else {
                    var messageDisplay = $(".suggestionInput").val();
                    chatWindowInstance.renderMessage(msgData);
                    //chatWindowInstance.assignValueToInput(emojiValue + " :" + messageDisplay)
                    chatWindowInstance.sendMessage( emojiValue + " :" + messageDisplay);
                }
                chatWindowInstance.bottomSliderAction("hide");
                msgData.message[0].component.payload.sliderView = true;
            });

        });
        $(messageHtml).find(".buttonTmplContent .emojiComponent .close-btn").click(function (e: any) {
            chatWindowInstance.bottomSliderAction("hide");

            e.stopPropagation();
        });
    }
    suggestionComponent() {
        return '<div class="suggestionsMainComponent">\
<div class="suggestionsHeading">What can be improved?</div>\
<div class="suggestionBox">\
<textarea type="text" class="suggestionInput" placeholder="Add Suggestions"></textarea></div>\
<div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>\
</div>'
    }
    getTemplateString() {
        var ratingTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
            <div class="buttonTmplContent"> \
                    {{if msgData.createdOn && !msgData.message[0].component.payload.sliderView}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    {{if msgData.message[0].component.payload.fromHistory}}<ul class="fromHistory listTempView">\
                                  ${msgData.message[0].cInfo.body}</ul>\
                    {{else}}<ul class="listTmplContentBox rating-main-component"> \
                    {{if msgData.message[0].component.payload.view == "star"}}\
                      <div class="ratingMainComponent">\
                      {{if msgData.message[0].component.payload.sliderView}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                        <div class="star-rating">\
                           {{each(key, msgItem) msgData.message[0].component.payload.starArrays}}\
                           <input type="radio" id="${msgItem.starId}-stars" name="rating" value="${msgItem.value}" />\
                           <label for="${msgItem.starId}-stars" class="star">&#9733;</label>\
                           {{/each}}\
                        </div>\
                      </div>\
                      {{else msgData.message[0].component.payload.view == "emojis"}}\
                      <div class="emojiComponent">\
                      {{if msgData.message[0].component.payload.sliderView}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                      {{each(key, msgItem) msgData.message[0].component.payload.smileyArrays}}\
                         <div class="rating" id="rating_${msgItem.smileyId}" value="${msgItem.value}"></div>\
                      {{/each}}\
                      {{/if}}\
                   </ul>{{/if}}\
            </div>\
            </li>\
        {{/if}} \
        </script>';

        return ratingTemplate;
    }

}

export default RatingTemplate;