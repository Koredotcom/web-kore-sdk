
import helpers from '../../../utils/helpers';
import './cardTemplate.scss';
class CardTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "cardTemplate") {
            me.messageHtml = $(me.getTemplateString('cardTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml,msgData);
            return me.messageHtml;
        }
    }
    bindEvents(ele: any,msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        var _innerText;
		$(ele).off('click', '.card-template .card-body .card-text-action .card-action-data,.icon').on('click', '.card-template .card-body .card-text-action .card-action-data,.icon', function (e: any) {
			var obj = me;
            let selectedTarget = $(e.currentTarget);
            let actionObj = $(selectedTarget).parent().attr('actionObj');
			var actionObjParse = JSON.parse(actionObj);
			console.log(actionObjParse);
			e.stopPropagation();
			if (actionObjParse.type && (actionObjParse.type == "dropdown")) {
				if ($(selectedTarget).parent().find('.more-button-info')) {
                    $(selectedTarget).parent().find(".more-button-info.hide").removeClass("hide");
					$(selectedTarget).parent().find(".more-button-info").toggle(300);
				}
			}
		});
		$(ele).off('click', '.card-template .card-body .more-button-info .close_btn').on('click', '.card-template .card-body .more-button-info .close_btn', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			e.stopPropagation();
			if ($(selectedTarget).parent().parent().find('.more-button-info')) {
                $(selectedTarget).parent().find(".more-button-info").addClass("hide")
				$(selectedTarget).parent().parent().find(".more-button-info").toggle(300);
			}
		});
		$(ele).off('click', '.card-template .card-body .card-btn,.card-template .card-body .card-text-desc').on('click', '.card-template .card-body .card-btn,.card-template .card-body .card-text-desc', function (e: any) {
			e.stopPropagation();
            let selectedTarget = $(e.currentTarget);
            let type = $(selectedTarget).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == 'postback' || type == 'text') {
				var actionObj = $(selectedTarget).attr('actionObj');
				if (actionObj) {
					var parsedActionObj = JSON.parse(actionObj);
					if (parsedActionObj) {
						var _innerText = parsedActionObj.default_action.payload;
						var postBack;
						if (parsedActionObj && parsedActionObj.default_action && parsedActionObj.default_action.title) {
							postBack = parsedActionObj.default_action.title;
						} else {
							postBack = $(selectedTarget)[0].innerText.trim() || $(selectedTarget).attr('data-value').trim();
						}
					}

					chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				} else {
				_innerText = $(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value');
					var postBack = $(selectedTarget)[0].innerText.trim() || $(selectedTarget).attr('data-value').trim();
					chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				}
				$(ele).find(".card-template").css({ "pointer-events": "none" });
			} else if (type == 'action') {
				var actionObj = $(me).attr('actionObj');
				var parsedActionObj = JSON.parse(actionObj);
				let modal: any = document.getElementById('myPreviewModal');
				$(".largePreviewContent").empty();
				modal.style.display = "block";
				let span:any = document.getElementsByClassName("closeElePreview")[0];
				span.onclick = function () {
					modal.style.display = "none";
					$(".largePreviewContent").empty();
					$(".largePreviewContent").removeClass("addheight");
					$(".largePreviewContent").removeClass('card-template-modal')
				}
				$(".largePreviewContent").append($(buildCardPreview(parsedActionObj)).tmpl({
					card: parsedActionObj
				}));
				$(".largePreviewContent").addClass('card-template-modal');

			} else if (type === 'url' || type == 'web_url') {
				var a_link = $(me).attr('title');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatWindowInstance.openExternalLink(a_link);
			}
		});
        function buildCardPreview(card: any) {
            var cardPreview = '<script id="chat_card_tmpl_preview" type="text/x-jqury-tmpl"> \
            <div class="card-template">\
                <div class="card-body" {{if (card && card.cardStyles)}}style="{{each(styleKey,style) card.cardStyles}}${styleKey} : ${style};{{/each}}"{{/if}} {{if card.type}}type="${card.type}{{/if}}" actionObj="${JSON.stringify(card)}">\
                    {{if card && card.cardHeading && (!card.cardHeading.icon && !card.cardHeading.description)}}\
                        <div class="card-title" {{if card && card.cardHeading && card.cardHeading.headerStyles}}style="{{each(styleKey,style) card.cardHeading.headerStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>${card.cardHeading.title}</div>\
                        {{else (card && card.cardHeading && (card.cardHeading.icon || card.cardHeading.description))}}\
                            <div class="card-title-block {{if card && !card.cardDescription}}left-border{{/if}}" {{if card && card.cardHeading && card.cardHeading.headerStyles}}style="{{each(styleKey,style) card.cardHeading.headerStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
                                {{if card && card.cardHeading && card.cardHeading.icon}}\
                                    <div class="card-block-img {{if card && card.cardHeading && card.cardHeading.iconSize}}${card.cardHeading.iconSize}{{/if}}">\
                                        <img src="${card.cardHeading.icon}"/>\
                                    </div>\
                                {{/if}}\
                                <div class="card-block" {{if (card && card.cardContentStyles && !card.cardDescription)}}style="{{each(styleKey,style) card.cardContentStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
                                    {{if card && card.cardHeading && card.cardHeading.title}}\
                                            <div class="title-text {{if (card && card.cardHeading && card.cardHeading.headerExtraInfo)}}card-text-overflow {{/if}}" title="${card.cardHeading.title}">{{html helpers.convertMDtoHTML(card.cardHeading.title, "bot")}}</div>\
                                    {{/if}}\
                                    {{if card && card.cardHeading && card.cardHeading.description}}\
                                            <div class="title-desc">{{html helpers.convertMDtoHTML(card.cardHeading.description, "bot")}}</div>\
                                    {{/if}}\
                                </div>\
                                {{if (card && card.cardHeading && card.cardHeading.headerExtraInfo)}}\
                                    <span class="card-text-action" actionObj="${JSON.stringify(card.cardHeading.headerExtraInfo)}">{{if card && card.cardHeading && card.cardHeading.headerExtraInfo &&  card.cardHeading.headerExtraInfo.title}}<span class="card-action-data">${card.cardHeading.headerExtraInfo.title}</span>{{/if}}{{if (card && card.cardHeading && card.cardHeading.headerExtraInfo &&  card.cardHeading.headerExtraInfo.icon)}}<img src="${card.cardHeading.headerExtraInfo.icon}" class="icon"/>{{/if}}\
                                    {{if (card && card.cardHeading && card.cardHeading.headerExtraInfo && card.cardHeading.headerExtraInfo.type === "dropdown")}}\
                                    <ul  class="more-button-info hide" style="list-style:none;">\
                                            <button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                                            {{if (card && card.cardHeading && card.cardHeading.headerExtraInfo && card.cardHeading.headerExtraInfo.dropdownOptions && card.cardHeading.headerExtraInfo.dropdownOptions.length)}}\
                                            {{each(optionKeykey, option) card.cardHeading.headerExtraInfo.dropdownOptions}} \
                                                    <li><button class="button_" value="${option.payload}" {{if option && option.type}}type="${option.type}"{{/if}}>{{if option && option.icon}}<img src="${option.icon}">{{/if}}{{html helpers.convertMDtoHTML(option.title, "bot")}}</button></li>\
                                            {{/each}}\
                                            {{/if}}\
                                    </ul>\
                                    </span>\
                                    {{/if}}\
                                {{/if}}\
                            </div>\
                    {{/if}}\
                    {{if card && card.cardDescription && card.cardDescription.length}}\
                        <div class="card-data" {{if card && card.cardContentStyles }}style="{{each(styleKey,style) card.cardContentStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
                            <div class="card-data-list {{if (card && card.cardType == "list")}}card-display-flex{{/if}}">\
                            {{each(i,desc) card.cardDescription}}\
                            {{if ((card && card.cardType != "list") || card && !card.cardHeading)}}\
                                <div class="card-text">\
                                    {{if desc && desc.icon}}\
                                        <span class="card-text-icon"><img src="${desc.icon}" /></span>\
                                    {{/if}}\
                                    {{if desc && desc.title}}\
                                        <span class="card-text-desc"  {{if desc.type}}type="${desc.type}"{{/if}} title="${desc.title}">{{html helpers.convertMDtoHTML(desc.title, "bot")}}</span>\
                                    {{/if}}\
                                </div>\
                                {{else (card && card.cardType == "list")}}\
                                    <div class="card-block-text">\
                                        {{if desc && desc.description}}\
                                            <div class="title-desc">{{html helpers.convertMDtoHTML(desc.description, "bot")}}</div>\
                                        {{/if}}\
                                        {{if desc && desc.title}}\
                                            <div class="title-text" title="${desc.title}">{{html helpers.convertMDtoHTML(desc.title, "bot")}}</div>\
                                        {{/if}}\
                                    </div>\
                                {{/if}}\
                            {{/each}}\
                            {{if false}}\
                            <div class="card-text icon"><span class="card-text-action"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAYAAAA8sqwkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABdSURBVHgBjctNDYAwDIbhNkUAoKAZCOCIHBwhASzgCAfDQelhh2Xrfr5Tkz4vgDF2y8VuPa0fWRgEDz33cZ748/4pBhEOwy2NqIztiOo4j7CN407uQTGDyNsVqP0BaHUk0IS2sYcAAAAASUVORK5CYII="></span></div>\
                            {{/if}}\
                            </div>\
                        </div>\
                        {{if card && card.buttons && card.buttons.length}}\
                            <div class="card-data-btn btn-info">\
                            {{each(buttonKey,button) card.buttons}}\
                                    <button class="card-btn" type="${button.type}" {{if button && button.buttonStyles }}style="{{each(styleKey,style) button.buttonStyles}}${styleKey} : ${style};{{/each}}"{{/if}} title="${button.title}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
                                {{/each}}\
                            </div>\
                        {{/if}}\
                    {{/if}}\
                </div>\
            </div>\
        </script>'
            return cardPreview;
        }

    }
    getTemplateString() {
	var cardTemplate = '<script id="chat_card_tmpl" type="text/x-jqury-tmpl"> \
	{{if msgData.message}} \
	<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		{{if msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.cards && msgData.message[0].component.payload.cards.length}}\
		{{each(key,card) msgData.message[0].component.payload.cards}}\
		<div class="card-template">\
			<div class="card-body" {{if (card && card.cardStyles)}}style="{{each(styleKey,style) card.cardStyles}}${styleKey} : ${style};{{/each}}"{{/if}} {{if card.type}}type="${card.type}{{/if}}" {{if card.value}}value="${card.value}{{/if}}" actionObj="${JSON.stringify(card)}">\
				{{if card && card.cardHeading && (!card.cardHeading.icon && !card.cardHeading.description)}}\
					<div class="card-title" {{if card && card.cardHeading && card.cardHeading.headerStyles}}style="{{each(styleKey,style) card.cardHeading.headerStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>${card.cardHeading.title}</div>\
					{{else (card && card.cardHeading && (card.cardHeading.icon || card.cardHeading.description))}}\
						<div class="card-title-block {{if card && !card.cardDescription}}left-border{{/if}}" {{if card && card.cardHeading && card.cardHeading.headerStyles}}style="{{each(styleKey,style) card.cardHeading.headerStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
							{{if card && card.cardHeading && (card.cardHeading.icon || card.cardHeading.iconText)}}\
								<div class="card-block-img {{if card && card.cardHeading && card.cardHeading.iconSize}}${card.cardHeading.iconSize}{{/if}}">\
									{{if  card && card.cardHeading && (card.cardHeading.icon)}}\
										<img src="${card.cardHeading.icon}">\
									{{else card && card.cardHeading && (card.cardHeading.iconText)}}\
										<div class="icon-text" {{if  card && card.cardHeading &&  card.cardHeading.iconStyles}}style="{{each(iconStyleKey,style) card.cardHeading.iconStyles}}${iconStyleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(card.cardHeading.iconText, "bot")}}</div>\
									{{/if}}\
								</div>\
							{{/if}}\
							<div class="card-block" {{if (card && card.cardContentStyles && !card.cardDescription)}}style="{{each(styleKey,style) card.cardContentStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
								{{if card && card.cardHeading && card.cardHeading.title}}\
										<div class="title-text {{if (card && card.cardHeading && card.cardHeading.headerExtraInfo)}}card-text-overflow {{/if}}" title="${card.cardHeading.title}">{{html helpers.convertMDtoHTML(card.cardHeading.title, "bot")}}</div>\
								{{/if}}\
								{{if card && card.cardHeading && card.cardHeading.description}}\
										<div class="title-desc">{{html helpers.convertMDtoHTML(card.cardHeading.description, "bot")}}</div>\
								{{/if}}\
							</div>\
							{{if (card && card.cardHeading && card.cardHeading.headerExtraInfo)}}\
								<span class="card-text-action" actionObj="${JSON.stringify(card.cardHeading.headerExtraInfo)}">{{if card && card.cardHeading && card.cardHeading.headerExtraInfo &&  card.cardHeading.headerExtraInfo.title}}<span class="card-action-data">${card.cardHeading.headerExtraInfo.title}</span>{{/if}}{{if (card && card.cardHeading && card.cardHeading.headerExtraInfo &&  card.cardHeading.headerExtraInfo.icon)}}<img src="${card.cardHeading.headerExtraInfo.icon}" class="icon"/>{{/if}}\
								{{if (card && card.cardHeading && card.cardHeading.headerExtraInfo && card.cardHeading.headerExtraInfo.type === "dropdown")}}\
								<ul  class="more-button-info hide" style="list-style:none;">\
										<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
										{{if (card && card.cardHeading && card.cardHeading.headerExtraInfo && card.cardHeading.headerExtraInfo.dropdownOptions && card.cardHeading.headerExtraInfo.dropdownOptions.length)}}\
										{{each(optionKeykey, option) card.cardHeading.headerExtraInfo.dropdownOptions}} \
												<li><button class="button_" value="${option.payload}" {{if option && option.type}}type="${option.type}"{{/if}}>{{if option && option.icon}}<img src="${option.icon}">{{/if}}{{html helpers.convertMDtoHTML(option.title, "bot")}}</button></li>\
										{{/each}}\
										{{/if}}\
								</ul>\
								</span>\
								{{/if}}\
							{{/if}}\
						</div>\
				{{/if}}\
				{{if card && card.cardDescription && card.cardDescription.length}}\
					<div class="card-data" {{if card && card.cardContentStyles }}style="{{each(styleKey,style) card.cardContentStyles}}${styleKey} : ${style};{{/each}}"{{/if}}>\
						<div class="card-data-list {{if (card && card.cardType == "list")}}card-display-flex{{/if}}">\
						{{each(i,desc) card.cardDescription}}\
						   {{if ((card && card.cardType != "list") || card && !card.cardHeading)}}\
							<div class="card-text">\
								{{if desc && desc.icon}}\
									<span class="card-text-icon {{if desc && desc.iconAlignment && (desc.iconAlignment==="right")}}if-icon-right{{else desc && (desc.iconAlignment && (desc.iconAlignment==="left")) || !desc.iconAlignment}}if-icon-left{{/if}}"><img class="icon-img" src="${desc.icon}" /></span>\
								{{/if}}\
								{{if desc && desc.title}}\
									<span class="card-text-desc" {{if desc.type}}type="${desc.type}"{{/if}} title="${desc.title}" {{if desc.textStyles}}style="{{each(key,style) desc.textStyles}}${key}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(desc.title, "bot")}}</span>\
								{{/if}}\
							</div>\
							{{else (card && card.cardType == "list")}}\
								<div class="card-block-text">\
									{{if desc && desc.description}}\
										<div class="title-desc">{{html helpers.convertMDtoHTML(desc.description, "bot")}}</div>\
									{{/if}}\
									{{if desc && desc.title}}\
										<div class="title-text" title="${desc.title}">{{html helpers.convertMDtoHTML(desc.title, "bot")}}</div>\
									{{/if}}\
								</div>\
							{{/if}}\
						{{/each}}\
						{{if false}}\
						<div class="card-text icon"><span class="card-text-action"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAYAAAA8sqwkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABdSURBVHgBjctNDYAwDIbhNkUAoKAZCOCIHBwhASzgCAfDQelhh2Xrfr5Tkz4vgDF2y8VuPa0fWRgEDz33cZ748/4pBhEOwy2NqIztiOo4j7CN407uQTGDyNsVqP0BaHUk0IS2sYcAAAAASUVORK5CYII="></span></div>\
						{{/if}}\
						</div>\
					</div>\
					{{if card && card.buttons && card.buttons.length}}\
						<div class="card-data-btn btn-info">\
						   {{each(buttonKey,button) card.buttons}}\
								<button class="card-btn" type="${button.type}" {{if button && button.buttonStyles }}style="{{each(styleKey,style) button.buttonStyles}}${styleKey} : ${style};{{/each}}"{{/if}} title="${button.title}" value="${button.payload}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
							{{/each}}\
						</div>\
					{{/if}}\
				{{/if}}\
			</div>\
		</div>\
		{{/each}}\
		{{/if}}\
	</li>\
	{{/if}}\
	</script>';

        return cardTemplate;
    }

}

export default CardTemplate;