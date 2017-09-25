function customTemplate(data) {
	this.cfg = data;
	this.helpers = null;
	this.extension = null;
}

/**
 * purpose: Function to render bot message for a given custom template
 * input  : Bot Message
 * output : Custom template HTML
 */
customTemplate.prototype.renderMessage = function (msgData) {
	

	/* For your reference sample code snippet given below
	var messageHtml = '';
	if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "button") {
		messageHtml = $(this.getChatTemplate("templatebutton")).tmpl({
			'msgData': msgData,
			'helpers': this.helpers,
			'extension': this.extension
		});
	} 
	return messageHtml;

	End of reference snippet code*/

   return "";	
}; // end of renderMessage method


 /**
 * purpose: Function to get custom template HTML
 * input  : Template type
 * output : Custom template HTML
 *
 */
 
customTemplate.prototype.getChatTemplate = function(tempType) {
	/* For your reference sample code snippet given below
	var buttonTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
			{{if msgData.message}} \
				<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
					<div class="buttonTmplContent"> \
						{{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
						{{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
						<ul class="buttonTmplContentBox">\
							<li class="buttonTmplContentHeading"> \
								{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
								{{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
									<span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
								{{/if}} \
							</li>\
							{{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
								<li {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} {{if msgItem.url}}url="${msgItem.url}"{{/if}} class="buttonTmplContentChild" data-value="${msgItem.value}" type="${msgItem.type}">\
									${msgItem.title}\
								</li> \
							{{/each}} \
						</ul>\
					</div>\
				</li> \
			{{/if}} \
		</scipt>';
        if(tempType === "templatebutton"){
            return buttonTemplate;
        } else {
            return "";
    }
    End of reference snippet code */
    return "";
}; // end of getChatTemplate method