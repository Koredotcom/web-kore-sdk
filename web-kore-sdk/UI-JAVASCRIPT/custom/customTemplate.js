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
	/*  For your reference sample code snippet given below
    var messageHtml = '';
	helpers = this.helpers;
	extension = this.extension;
	
	if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "button") {
        messageHtml = this.getChatTemplate("templatebutton", msgData);
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

customTemplate.prototype.getChatTemplate = function(tempType, tempData, extension, extractedFileName) {
	/* For your reference sample code snippet given below
    if (tempType === "templatebutton") {
        var buttonTemplate = '';
        if (tempData.message) {
            tempData.message.forEach(function (msgItem) {
                if (msgItem.component && msgItem.component.type === "template") {
                    var msg_data = '';
                    var msg_class = '';
                    var msg_icon_html = '';
                    var msg_created_html = '';
                    var msg_html = '';
                    var inner_html = '';
                    if (tempData.type !== "bot_response") {
                        msg_data = 'id = "msg_' + msgItem.clientMessageId + '"';
                        msg_class = 'fromCurrentUser';
                        msg_html = helpers.convertMDtoHTML(msgItem.component.payload.text, 'user');
                    }
                    else {
                        msg_class = 'fromOtherUsers';
                        msg_html = helpers.convertMDtoHTML(msgItem.component.payload.text, 'bot');
                    }

                    if (tempData.icon) {
                        msg_class += ' with-icon';
                        msg_icon_html = '<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(' + tempData.icon + ')"></div> </div>';
                    }

                    if (tempData.createdOn) {
                        msg_created_html = '<div class="extra-info">' + helpers.formatDate(tempData.createdOn) + '</div>';
                    }
                    if (msgItem.cInfo.emoji) {
                        msg_html = msg_html + '<span class="emojione emojione-' + msgItem.cInfo.emoji[0].code + '"></span>';
                    }
                    msgItem.component.payload.buttons.forEach(function (msgInnerItem) {
                        var value = '', url = '', type = '';
                        if (msgInnerItem.payload) {
                            value = 'value="' + msgInnerItem.payload + '"';
                        }
                        if (msgInnerItem.url) {
                            url = 'url="' + msgInnerItem.url + '"';
                        }
                        if (msgInnerItem.type) {
                            type = 'type="' + msgInnerItem.type + '"';
                        }
                        inner_html = inner_html + '<li ' + value + ' ' + url + ' ' + type + ' class="buttonTmplContentChild sendClickReq">\
								'+ msgInnerItem.title + '</li>';
                    });
                    buttonTemplate += '<li ' + msg_data + ' class=" ' + msg_class + '"> \
							<div class="buttonTmplContent"> \
                            '+ msg_created_html + ' \
                            '+ msg_icon_html + ' \
							<ul class="buttonTmplContentBox">\
								<li class="buttonTmplContentHeading">'+ msg_html + '</li>\
								'+ inner_html + ' \
							</ul>\
							</div>\
					</li>';
                }
            });
        }
        return buttonTemplate;
    } End of reference snippet code */
    return "";
}; // end of getChatTemplate method