
import helpers from '../../../utils/helpers';
import './ratingTemplate.scss';
class RatingTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload && (msgData.message[0].component.payload.template_type && (msgData.message[0].component.payload.template_type === "feedbackTemplate" && (msgData.message[0].component.payload.view==="star"|| msgData.message[0].component.payload.view ==="emojis" || msgData.message[0].component.payload.view === "CSAT"|| msgData.message[0].component.payload.view ==="ThumbsUpDown" || msgData.message[0].component.payload.view === "NPS") ))){
            var thumpsUpDownArrays;
            if (msgData && msgData?.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.thumpsUpDownArrays) {
                thumpsUpDownArrays = msgData.message[0].component.payload.thumpsUpDownArrays;
                msgData.message[0].component.payload.thumpsUpDownArrays = [];
                thumpsUpDownArrays.forEach(function (eachValue:any) {
                    var eachReviewText;
                    var splitWords;
                    var resultValue = [];
                    if(eachValue && eachValue.thumpUpId && eachValue.thumpUpId === "positive"){
                        msgData.message[0].component.payload.thumpsUpDownArrays[0] = eachValue;
                    }else if(eachValue && eachValue.thumpUpId && eachValue.thumpUpId === "negative"){
                        msgData.message[0].component.payload.thumpsUpDownArrays[1] = eachValue;
                    }
                    else if (eachValue && eachValue.reviewText && (eachValue.thumpUpId !== "positive" && eachValue.thumpUpId !== "negative")) {
                        eachReviewText = eachValue.reviewText.toLocaleLowerCase();
                        splitWords = eachReviewText.split(' ');
                        resultValue = splitWords.filter((option:any) => option.startsWith('un') || option.startsWith('dis') || option.startsWith('no'));
                        if (!resultValue.length) {
                            eachValue.thumpUpId = 0;
                            msgData.message[0].component.payload.thumpsUpDownArrays[0] = eachValue;
                        } else if (resultValue.length) {
                            eachValue.thumpUpId = 1;
                            msgData.message[0].component.payload.thumpsUpDownArrays[1] = eachValue;
                        }
                    }
                });
            }
            me.messageHtml = $(me.getTemplateString('ratingTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            if(msgData?.message[0]?.component?.payload?.sliderView && !msgData.fromHistory){
            me.hostInstance.bottomSliderAction('show', me.messageHtml);
            }
            me.bindEvents(me.messageHtml);
            if(msgData && msgData.message && msgData.message.length && msgData.message[0]&& msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.selectedValue === 0 || msgData.message[0].component.payload.selectedValue !== 0)){
				$(me.messageHtml).find('.numbersComponent .ratingValue.emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
				$(me.messageHtml).find('.thumpsUpDownComponent .ratingValue.emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
				$(me.messageHtml).find('.emojiComponent.version2 .emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
			}
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
        $(messageHtml).find(".emojiComponent,.thumpsUpDownComponent,.numbersComponent").off('click','.emoji-rating').on('click','.emoji-rating',function(e:any){
            var msgData: any;
            if ($(messageHtml).data().tmplItem && $(messageHtml).data().tmplItem.data && $(messageHtml).data().tmplItem.data.msgData) {
                msgData = $(messageHtml).data().tmplItem.data.msgData
            } else {
                msgData = $(messageHtml).data();
            }
            var sliderValue = msgData.message[0].component.payload.sliderView;
            if($(messageHtml).find(".emojiComponent .emoji-rating.active").length !=="0"){
				$(".emojiComponent .emoji-rating").removeClass("active");
				$(".emojiElement").remove();
			}
            if($(messageHtml).find(".thumpsUpDownComponent .emoji-rating.active").length!=="0"){
                $(".thumpsUpDownComponent .emoji-rating").removeClass("active");
                $(".emojiElement").remove();
            }
            if($(messageHtml).find(".numbersComponent .emoji-rating.active").length!=="0"){
                $(".numbersComponent .emoji-rating").removeClass("active");
                $(".emojiElement").remove();
            }
            let selectedTarget = e.currentTarget;
            var emojiValue = $(selectedTarget).attr("value");
            var dataIdValue = $(selectedTarget).attr("data-id");
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
            if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.view !== "CSAT" && msgData.message[0].component.payload.view !== "NPS" && msgData.message[0].component.payload.view !== "ThumbsUpDown")){
            if ($(selectedTarget).attr("value") < "5") {
                $(".ratingStar").remove();
                if($(".submitButton")){
                    $(".submitButton").remove();
                }
                if($(".suggestionsMainComponent").length > 0){
                    $(".suggestionsMainComponent").remove();
                }
                if( $(".kore-action-sheet").find(".thumpsUpDownComponent").length){
                $(".kore-action-sheet").find(".thumpsUpDownComponent").append(me.suggestionComponent());
                }else if($(".kore-action-sheet").find(".numbersComponent").length){
                    $(".kore-action-sheet").find(".numbersComponent").append(me.suggestionComponent());
                }else{
                $(".kore-action-sheet").find(".emojiComponent").append(me.suggestionComponent());
                }

            } else {
                if ($(".submitButton")) {
                    $(".submitButton").remove();
                }
                if ($(".ratingStar").length > 0) {
                    $(".ratingStar").remove();
                }
                var messageTodisplay = msgData.message[0].component.payload.messageTodisplay;
                $(".suggestionsMainComponent").remove();
                if( $(".kore-action-sheet").find(".thumpsUpDownComponent").length){
                    $(".kore-action-sheet").find(".thumpsUpDownComponent").append('<div class="ratingStar">'+messageTodisplay+'</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
                }else  if( $(".kore-action-sheet").find(".numbersComponent").length){
                    $(".kore-action-sheet").find(".numbersComponent").append('<div class="ratingStar">'+messageTodisplay+'</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
                }else{
                $(".kore-action-sheet").find(".emojiComponent").append('<div class="ratingStar">'+messageTodisplay+'</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
                }
            }
        }else if(msgData.message[0].component.payload.sliderView){
			msgData.message[0].component.payload.sliderView=false;
			msgData.message[0].component.payload.selectedValue = JSON.parse(dataIdValue);
			chatWindowInstance.renderMessage(msgData);
            chatWindowInstance.sendMessage( emojiValue);
			chatWindowInstance.bottomSliderAction("hide");
			msgData.message[0].component.payload.sliderView=true;
		}
            if (sliderValue === false) {
                //chatWindowInstance.assignValueToInput(emojiValue)
                chatWindowInstance.sendMessage(emojiValue);
                $(".rating-main-component").css({"pointer-events":"none"});
            }
            $(".emojiComponent,.thumpsUpDownComponent,.numbersComponent").off('click','.submitBtn').on('click','.submitBtn',function(e: any){
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
                    if(messageDisplay){
                    chatWindowInstance.sendMessage( emojiValue + " :" + messageDisplay);
                    }else{
                    chatWindowInstance.sendMessage( emojiValue);
                    }
                }
                chatWindowInstance.bottomSliderAction("hide");
                msgData.message[0].component.payload.sliderView = true;
            });

        });
        $(messageHtml).find(".buttonTmplContent .emojiComponent .close-btn,.buttonTmplContent .thumpsUpDownComponent .close-btn,.buttonTmplContent .numbersComponent .close-btn").click(function(e: any){
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
        var ratingTemplate='<script id="chat_rating_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
            <div class="buttonTmplContent"> \
                    {{if msgData.createdOn && !msgData.message[0].component.payload.sliderView}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <div class="{{if msgData.message[0].component.payload.fromHistory}} dummy messageBubble {{else}}messageBubble{{/if}}"> \
                    {{if msgData.message[0].component.payload.fromHistory}}<ul class="fromHistory listTempView">\
                                  ${msgData.message[0].cInfo.body}</ul>\
                    {{else}}<ul class="listTmplContentBox rating-main-component"> \
                    {{if msgData.message[0].component.payload.view == "star"}}\
                      <div class="ratingMainComponent">\
                      {{if msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                        <div class="star-rating">\
                           {{each(key, msgItem) msgData.message[0].component.payload.starArrays}}\
                           <input type="radio" id="${msgItem.starId}-stars" name="rating" value="${msgItem.value}" />\
                           <label for="${msgItem.starId}-stars" class="star">&#9733;</label>\
                           {{/each}}\
                        </div>\
                      </div>\
                      {{else msgData.message[0].component.payload.view == "emojis" || msgData.message[0].component.payload.view === "CSAT"}}\
                      <div class="emojiComponent{{if msgData.message[0].component.payload.view === "CSAT"}} version2 {{else}} version1 {{/if}}">\
                      {{if msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading text-heading-info">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                      <div class="emojis-data">\
                      {{each(key, msgItem) msgData.message[0].component.payload.smileyArrays}}\
                      <div class="emoji-rating" value="${msgItem.value}" data-id="${msgItem.smileyId}">\
                         <div class="rating" id="rating_${msgItem.smileyId}" value="${msgItem.value}"></div>\
                         <div class="emoji-desc" title="${msgItem.reviewText}">${msgItem.reviewText}</div>\
                         </div>\
                      {{/each}}\
                      </div>\
                      {{else msgData.message[0].component.payload.view == "ThumbsUpDown"}}\
                      <div class="thumpsUpDownComponent">\
                      {{if msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading text-heading-info">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                      <div class="emojis-data">\
                      {{each(key, msgItem) msgData.message[0].component.payload.thumpsUpDownArrays}}\
                       <div class="ratingValue emoji-rating" value="${msgItem.value}" data-id="${key}">\
                         <div class="rating" id="rating_${key}" value="${msgItem.value}"></div>\
                         <div class="emoji-desc"  title="${msgItem.reviewText}">${msgItem.reviewText}</div></div>\
                      {{/each}}\
                      </div>\
                      {{else msgData.message[0].component.payload.view == "NPS"}}\
                      <div class="numbersComponent">\
                      {{if msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
                      {{if msgData.message[0].component.payload.text}}<div class="templateHeading text-heading-info">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
                      <div class="rating-numbers-data">\
                      {{each(key, msgItem) msgData.message[0].component.payload.numbersArrays}}\
                      <div class="ratingValue emoji-rating" value="${msgItem.value}" data-id="${msgItem.numberId}">\
                         <div class="rating" id="rating_${msgItem.numberId}"  value="${msgItem.value}">${msgItem.numberId}</div>\
                         <div class="emoji-desc" title="${msgItem.reviewText}">${msgItem.reviewText}</div>\</div>\
                      {{/each}}\
                      </div>\
                      {{/if}}\
                   </ul>{{/if}}</div>\
            </div>\
            </li>\
        {{/if}} \
        </script>';
        return ratingTemplate;
    }

}

export default RatingTemplate;