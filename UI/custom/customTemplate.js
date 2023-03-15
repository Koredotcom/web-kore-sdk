(function($){
	function customTemplate(data,chatInitialize) {
		this.cfg = data;
		this.chatInitialize=chatInitialize;
		this.helpers = null;
		this.extension = null;
	}
	
	/**
	 * purpose: Function to render bot message for a given custom template
	 * input  : Bot Message
	 * output : Custom template HTML
	 */
	customTemplate.prototype.renderMessage = function (msgData) {
		var messageHtml = '';
		if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "dropdown_template") {
			messageHtml = $(this.getChatTemplate("dropdown_template")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			this.bindEvents(messageHtml);
		} else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "multi_select") {
			messageHtml = $(this.getChatTemplate("checkBoxesTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
		} else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "like_dislike") {
			messageHtml = $(this.getChatTemplate("likeDislikeTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "form_template") {
			messageHtml = $(this.getChatTemplate("formTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			this.bindEvents(messageHtml);
		    if(msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.fromHistory){
		        $(messageHtml).find(".formMainComponent form").addClass("hide");
		    }
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "advanced_multi_select") {
			messageHtml = $(this.getChatTemplate("advancedMultiSelect")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			$(messageHtml).data(msgData);
			this.bindEvents(messageHtml);
		} else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "tableList") {
			messageHtml = $(this.getChatTemplate("tableListTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			this.bindEvents(messageHtml);
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "listView") {
			messageHtml = $(this.getChatTemplate("templatelistView")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			this.bindEvents(messageHtml);
			$(messageHtml).data(msgData);
			if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.fromHistory){
				$(messageHtml).css({"pointer-events":"none"});
			}
		}else if(msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.template_type === "feedbackTemplate" && (msgData.message[0].component.payload.view==="star"|| msgData.message[0].component.payload.view ==="emojis" || msgData.message[0].component.payload.view === "CSAT"|| msgData.message[0].component.payload.view ==="ThumbsUpDown" || msgData.message[0].component.payload.view === "NPS") )){
			var thumpsUpDownArrays;
			if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.thumpsUpDownArrays) {
				thumpsUpDownArrays = msgData.message[0].component.payload.thumpsUpDownArrays;
				msgData.message[0].component.payload.thumpsUpDownArrays = [];
				thumpsUpDownArrays.forEach(function (eachValue) {
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
						resultValue = splitWords.filter(option => option.startsWith('un') || option.startsWith('dis') || option.startsWith('no'));
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
			messageHtml = $(this.getChatTemplate("ratingTemplate")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			if(msgData.message[0].component.payload.selectedfeedbackValue){
				$(messageHtml).find(".ratingMainComponent").css({"pointer-events":"none"});
				var _innerText = msgData.message[0].component.payload.selectedfeedbackValue;
				if($(messageHtml).find(".ratingMainComponent label.active")){
					$(messageHtml).find(".ratingMainComponent label").removeClass("active");
				}
				for(i=parseInt(_innerText);i>0;i--){
					$(messageHtml).find('.ratingMainComponent label[for="'+i+'-stars"]').addClass("active");
				}
			}
			 this.bindEvents(messageHtml);
			 $(messageHtml).data(msgData);
			 if(msgData && msgData.message && msgData.message.length && msgData.message[0]&& msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.selectedValue === 0 || msgData.message[0].component.payload.selectedValue !== 0)){
				$(messageHtml).find('.numbersComponent .ratingValue.emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
				$(messageHtml).find('.thumpsUpDownComponent .ratingValue.emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
				$(messageHtml).find('.emojiComponent.version2 .emoji-rating #rating_'+msgData.message[0].component.payload.selectedValue+'').parent().addClass("active");
			}
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "listWidget"){
			messageHtml = $(this.getChatTemplate("listWidget")).tmpl({
				'msgData': msgData,
				'tempdata':msgData.message[0].component.payload,
				'dataItems': msgData.message[0].component.payload.elements || {},
				'viewmore': null,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			 this.templateEvents(messageHtml, 'listWidget');
			 $(messageHtml).data(messageHtml);
		}		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "advancedListTemplate"){
			messageHtml = $(this.getChatTemplate("advancedListTemplate")).tmpl({
				'msgData': msgData,
				'tempdata':msgData.message[0].component.payload,
				'dataItems': msgData.message[0].component.payload.elements || {},
				 'helpers': this.helpers,
				'extension': this.extension
			});
			 this.advancedListTemplateEvents(messageHtml,msgData);
			 $(messageHtml).data(msgData);
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "cardTemplate"){
			messageHtml = $(this.getChatTemplate("cardTemplate")).tmpl({
				'msgData': msgData,
				'viewmore': null,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			  this.cardTemplateEvents(messageHtml,msgData);
			 $(messageHtml).data(msgData);
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "proposeTimes"){
			messageHtml = $(this.getChatTemplate("proposeTimes")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			  this.proposeTimesTemplateBindEvents(messageHtml,msgData);
			 $(messageHtml).data(msgData);
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "default_card_template"){
			messageHtml = $(this.getChatTemplate("default_card_template")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			 $(messageHtml).data(msgData);
			 this.defaultCardTemplateEvents(messageHtml,msgData);
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "advancedMultiListTemplate"){
			messageHtml = $(this.getChatTemplate("advancedMultiListTemplate")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			 $(messageHtml).data(msgData);
			 this.advancedMultiListTemplateEvents(messageHtml,msgData);
		}else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "custom_table") {
			messageHtml = $(this.getChatTemplate("customTableTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			setTimeout(function () {
				var acc = document.getElementsByClassName("accordionRow");
				for (var i = 0; i < acc.length; i++) {
					acc[i].onclick = function () {
						this.classList.toggle("open");
					}
				}
				var showFullTableModal = document.getElementsByClassName("showMore");
				for (var i = 0; i < showFullTableModal.length; i++) {
					showFullTableModal[i].onclick = function () {
						var parentli = this.parentNode.parentElement;
						$("#dialog").empty();
						$("#dialog").html($(parentli).find('.tablechartDiv').html());
						$(".hello").clone().appendTo(".goodbye");
						var modal = document.getElementById('myPreviewModal');
						$(".largePreviewContent").empty();
						//$(".largePreviewContent").html($(parentli).find('.tablechartDiv').html());
						$(parentli).find('.tablechartDiv').clone().appendTo(".largePreviewContent");
						modal.style.display = "block";
						// Get the <span> element that closes the modal
						var span = document.getElementsByClassName("closeElePreview")[0];
						// When the user clicks on <span> (x), close the modal
						span.onclick = function () {
							modal.style.display = "none";
							$(".largePreviewContent").removeClass("addheight");
						}
		
					}
				}
			}, 350);
			this.bindEvents(messageHtml);
		}
		else if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "articleTemplate"){
			messageHtml = $(this.getChatTemplate("articleTemplate")).tmpl({
				'msgData': msgData,
				 'helpers': this.helpers,
				'extension': this.extension
			});
			 $(messageHtml).data(msgData);
			 this.articleTemplateEvents(messageHtml,msgData);
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "resetPinTemplate") {
            messageHtml = $(this.getChatTemplate("resetPinTemplate")).tmpl({
                'msgData': msgData,
                'helpers': this.helpers,
                'extension': this.extension
            });
			if(msgData && msgData.fromHistory){
				$(messageHtml).css({"pointer-events":"none"});
			}
            this.resetPinTemplateEvents(messageHtml, msgData);
        }
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "quick_replies_welcome") {
            messageHtml = $(this.getChatTemplate("quick_replies_welcome")).tmpl({
                'msgData': msgData,
                'helpers': this.helpers,
                'extension': this.extension
			});
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "otpValidationTemplate") {
            messageHtml = $(this.getChatTemplate("otpValidationTemplate")).tmpl({
                'msgData': msgData,
                'helpers': this.helpers,
                'extension': this.extension
            });
			if(msgData && msgData.fromHistory){
				$(messageHtml).css({"pointer-events":"none"});
			}
            this.otpValidationTemplateEvents(messageHtml, msgData);
        }
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.template_type === "FeedbackTemplate" || msgData.message[0].component.payload.template_type === "bankingFeedbackTemplate")) {
			messageHtml = $(this.getChatTemplate("bankingFeedbackTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			this.bankingFeedbackTemplateEvents(messageHtml);
			$(messageHtml).data(msgData);
		}
		else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type === "SYSTEM") {
			if (msgData.message[0].component && msgData.message[0].component.payload) {
				msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || "";
			}
			messageHtml = $(this.getChatTemplate("systemTemplate")).tmpl({
				'msgData': msgData,
				'helpers': this.helpers,
				'extension': this.extension
			});
			$(messageHtml).data(msgData);
		}
	   return messageHtml;
	
		return "";
	}; // end of renderMessage method
	
	
	/**
	* purpose: Function to get custom template HTML
	* input  : Template type
	* output : Custom template HTML
	*
	*/
	
	
	customTemplate.prototype.getChatTemplate = function (tempType) {
		/* Sample template structure for dropdown
		var message =  {
			"type": "template",
			"payload": {
				"template_type": "dropdown_template",
				"heading":"please select : ",
				"elements": [
					{
						"title": "United Arab Emirates Dirham",
						"value":"AED"
					},
					{
						"title": "Australian Dollar",
						"value":"AUD"
					},
					{
						"title": "Canadian Dollar",
						"value":"CAD"
					},
					{
						"title": "Swiss Franc",
						"value":"CHF"
					},
					{
						"title": "Chinese Yuanr",
						"value":"CNY"
					},
					{
						"title": "Czech Koruna",
						"value":"CZK"
					}
			   
				], 
			}
		};
		print(JSON.stringify(message)); 
		*/
		var dropdownTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
			{{if msgData.message}} \
				<li {{if msgData.type !== "bot_response"}} id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
					<div class="buttonTmplContent"> \
						{{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
						{{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
						<div class="{{if msgData.message[0].component.payload.fromHistory}} dummy messageBubble {{else}}messageBubble{{/if}}"> \
							{{if msgData.message[0].component.payload.heading}}<div class="templateHeading">${msgData.message[0].component.payload.heading}</div>{{/if}} \
							<select class="selectTemplateDropdowm">\
							<option>select</option> \
								{{each(key, msgItem) msgData.message[0].component.payload.elements}} \
								    <option xyz = "${msgData.message[0].component.selectedValue} {{if msgData.message[0].component.selectedValue === msgItem.value}}selected{{/if}}" class = "dropdownTemplatesValues" title = "${msgItem.title}" type = "postback" value="${msgItem.value}"> \
								      {{if msgItem.title.length > 32}}${msgItem.title.substr(0,32)}...{{else}}${msgItem.title}{{/if}}\
							        </option> \
								{{/each}} \
							</select> \
						</div>\
					</div>\
				</li> \
			{{/if}} \
		</script>';
	
		/* Sample template structure for multi-select checkboxes
			var message = {
			"type": "template",
			"payload": {
			"template_type": "multi_select",
			"elements": [
			{
			"title": "Classic T-Shirt Collection",
			"value":"tShirt"
			},{
			"title": "Classic Shirt Collection",
			"value":"shirts"
			},
			{
			"title": "Classic shorts Collection",
			"value":"shorts"
			}
			],
			"buttons": [
			{
			"title": "Done",
			"type": "postback",
			"payload": "payload" 
			}
			] 
			}
			};
			print(JSON.stringify(message)); 
		*/
		var checkBoxesTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
			{{if msgData.message}} \
			<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
					<div class = "listTmplContent"> \
						{{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
						{{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
						<ul class="{{if msgData.message[0].component.payload.fromHistory}} dummy listTmplContentBox  {{else}} listTmplContentBox{{/if}} "> \
							{{if msgData.message[0].component.payload.title || msgData.message[0].component.payload.heading}} \
								<li class="listTmplContentHeading"> \
									{{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
									{{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
										<span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
									{{/if}} \
								</li> \
							{{/if}} \
							{{each(key, msgItem) msgData.message[0].component.payload.elements}} \
								{{if msgData.message[0].component.payload.buttons}} \
									<li class="listTmplContentChild"> \
										<div class="checkbox checkbox-primary styledCSS checkboxesDiv"> \
											<input  class = "checkInput" type="checkbox" text = "${msgItem.title}" value = "${msgItem.value}" id="${msgItem.value}${msgData.messageId}"> \
											<label for="${msgItem.value}${msgData.messageId}">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}</label> \
										</div> \
									</li> \
								{{/if}} \
							{{/each}} \
							<div class="{{if msgData.message[0].component.payload.fromHistory}} hide  {{else}} checkboxButtons {{/if}} "> \
								{{each(key, buttonData) msgData.message[0].component.payload.buttons}} \
									<div class="checkboxBtn" value=${buttonData.payload} title="${buttonData.title}"> \
										${buttonData.title} \
									</div> \
								{{/each}} \
							</div> \
						</ul> \
					</div> \
				</li> \
			{{/if}} \
		</script>';
	
		/* Sample template structure for Like_dislike template
			var message = {
			"type": "template",
			"payload": {
			"template_type": "like_dislike"
			}
			};
			print(JSON.stringify(message));
		*/
		var likeDislikeTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
			{{if msgData.message}} \
				<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
					<div class="buttonTmplContent"> \
						{{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
						{{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
						{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
						{{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
							<span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
						{{/if}} \
						<div type ="postback" value = "like" class="likeDislikeDiv likeDiv">\
							<img class = "likeImg" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5saWtlSWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsaWtlSWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMDAwMDAwLCAxMi41MDAwMDApIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEyLjAwMDAwMCwgLTEyLjUwMDAwMCkgIiBmaWxsPSIjOUI5QjlCIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iTGlrZS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDEyLjQyODU3MSkgc2NhbGUoLTEsIDEpIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi40Mjg1NzEpIHRyYW5zbGF0ZSgwLjAwMDAwMCwgMC40Mjg1NzEpIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMy44NCwxMC41MTQyODU3IEMyMy44NCw4LjkzNjMyOTI5IDIyLjU2MDgxMzYsNy42NTcxNDI4NiAyMC45ODI4NTcxLDcuNjU3MTQyODYgTDE2Ljk4Mjg1NzEsNy42NTcxNDI4NiBMMTYuOTgyODU3MSwzLjY1NzE0Mjg2IEMxNi45ODI4NTcxLDEuOTQyODU3MTQgMTYsMC4yMjg1NzE0MjkgMTQuMTI1NzE0MywwLjIyODU3MTQyOSBDMTIuMjUxNDI4NiwwLjIyODU3MTQyOSAxMS4yNjg1NzE0LDEuOTQyODU3MTQgMTEuMjY4NTcxNCwzLjY1NzE0Mjg2IEwxMS4yNjg1NzE0LDUuMjM0Mjg1NzEgTDkuMjA1NzE0MjksNy4yOTcxNDI4NiBMNi41NjU3MTQyOSw4LjE1NDI4NTcxIEM2LjMwMTk0MDQxLDcuNTEyMjExMjUgNS42NzcwMDA0Nyw3LjA5MjU3NjQ5IDQuOTgyODU3MTQsNy4wOTE0Mjg1NyBMMi4xMjU3MTQyOSw3LjA5MTQyODU3IEMxLjE3ODk0MDQzLDcuMDkxNDI4NTcgMC40MTE0Mjg1NzEsNy44NTg5NDA0MyAwLjQxMTQyODU3MSw4LjgwNTcxNDI5IEwwLjQxMTQyODU3MSwyMS4zNzcxNDI5IEMwLjQxMTQyODU3MSwyMi4zMjM5MTY3IDEuMTc4OTQwNDMsMjMuMDkxNDI4NiAyLjEyNTcxNDI5LDIzLjA5MTQyODYgTDQuOTgyODU3MTQsMjMuMDkxNDI4NiBDNS45Mjk2MzEsMjMuMDkxNDI4NiA2LjY5NzE0Mjg2LDIyLjMyMzkxNjcgNi42OTcxNDI4NiwyMS4zNzcxNDI5IEw2LjY5NzE0Mjg2LDIxLjE1NDI4NTcgTDkuMTc3MTQyODYsMjIuODA1NzE0MyBDOS40NTgzMjQ3NywyMi45OTIyMjk0IDkuNzg4Mjk1OTgsMjMuMDkxNjE4MyAxMC4xMjU3MTQzLDIzLjA5MTQyODYgTDIwLjk4Mjg1NzEsMjMuMDkxNDI4NiBDMjIuNTYwODEzNiwyMy4wOTE0Mjg2IDIzLjg0LDIxLjgxMjI0MjEgMjMuODQsMjAuMjM0Mjg1NyBMMjMuODQsMTkuNjYyODU3MSBDMjMuNTMzNzcyNCwxOS4xMzI0NTUzIDIzLjUzMzc3MjQsMTguNDc4OTczMyAyMy44NCwxNy45NDg1NzE0IEwyMy44NCwxNi4yMzQyODU3IEMyMy41MzM3NzI0LDE1LjcwMzg4MzkgMjMuNTMzNzcyNCwxNS4wNTA0MDE4IDIzLjg0LDE0LjUyIEwyMy44NCwxMi44MDU3MTQzIEMyMy41MzM3NzI0LDEyLjI3NTMxMjQgMjMuNTMzNzcyNCwxMS42MjE4MzA0IDIzLjg0LDExLjA5MTQyODYgTDIzLjg0LDEwLjUxNDI4NTcgWiBNNC45ODI4NTcxNCwyMS4zNzE0Mjg2IEwyLjEyNTcxNDI5LDIxLjM3MTQyODYgTDIuMTI1NzE0MjksOC44IEw0Ljk4Mjg1NzE0LDguOCBMNC45ODI4NTcxNCwyMS4zNzE0Mjg2IFogTTIyLjEyNTcxNDMsMTEuMDg1NzE0MyBMMjEuMjY4NTcxNCwxMS4wODU3MTQzIEMyMC43OTUxODQ1LDExLjA4NTcxNDMgMjAuNDExNDI4NiwxMS40Njk0NzAyIDIwLjQxMTQyODYsMTEuOTQyODU3MSBDMjAuNDExNDI4NiwxMi40MTYyNDQxIDIwLjc5NTE4NDUsMTIuOCAyMS4yNjg1NzE0LDEyLjggTDIyLjEyNTcxNDMsMTIuOCBMMjIuMTI1NzE0MywxNC41MTQyODU3IEwyMS4yNjg1NzE0LDE0LjUxNDI4NTcgQzIwLjc5NTE4NDUsMTQuNTE0Mjg1NyAyMC40MTE0Mjg2LDE0Ljg5ODA0MTYgMjAuNDExNDI4NiwxNS4zNzE0Mjg2IEMyMC40MTE0Mjg2LDE1Ljg0NDgxNTUgMjAuNzk1MTg0NSwxNi4yMjg1NzE0IDIxLjI2ODU3MTQsMTYuMjI4NTcxNCBMMjIuMTI1NzE0MywxNi4yMjg1NzE0IEwyMi4xMjU3MTQzLDE3Ljk0Mjg1NzEgTDIxLjI2ODU3MTQsMTcuOTQyODU3MSBDMjAuNzk1MTg0NSwxNy45NDI4NTcxIDIwLjQxMTQyODYsMTguMzI2NjEzMSAyMC40MTE0Mjg2LDE4LjggQzIwLjQxMTQyODYsMTkuMjczMzg2OSAyMC43OTUxODQ1LDE5LjY1NzE0MjkgMjEuMjY4NTcxNCwxOS42NTcxNDI5IEwyMi4xMjU3MTQzLDE5LjY1NzE0MjkgTDIyLjEyNTcxNDMsMjAuMjI4NTcxNCBDMjIuMTI1NzE0MywyMC44NTk3NTQgMjEuNjE0MDM5NywyMS4zNzE0Mjg2IDIwLjk4Mjg1NzEsMjEuMzcxNDI4NiBMMTAuMTI1NzE0MywyMS4zNzE0Mjg2IEw2LjY5NzE0Mjg2LDE5LjA4NTcxNDMgTDYuNjk3MTQyODYsOS45MDg1NzE0MyBMMTAuMTI1NzE0Myw4LjggTDEyLjk4Mjg1NzEsNS45NDI4NTcxNCBMMTIuOTgyODU3MSwzLjY1NzE0Mjg2IEMxMi45ODI4NTcxLDMuNjU3MTQyODYgMTIuOTgyODU3MSwxLjk0Mjg1NzE0IDE0LjEyNTcxNDMsMS45NDI4NTcxNCBDMTUuMjY4NTcxNCwxLjk0Mjg1NzE0IDE1LjI2ODU3MTQsMy42NTcxNDI4NiAxNS4yNjg1NzE0LDMuNjU3MTQyODYgTDE1LjI2ODU3MTQsOS4zNzE0Mjg1NyBMMjAuOTgyODU3MSw5LjM3MTQyODU3IEMyMS42MTQwMzk3LDkuMzcxNDI4NTcgMjIuMTI1NzE0Myw5Ljg4MzEwMzE0IDIyLjEyNTcxNDMsMTAuNTE0Mjg1NyIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="> \
							<img class = "hide likedImg" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5saWtlSWNvblNlbGVjdEJsdWU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibGlrZUljb25TZWxlY3RCbHVlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDEyLjUwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTIuMDAwMDAwLCAtMTIuNTAwMDAwKSAiIGZpbGw9IiM3RkE0REIiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJMaWtlLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTIuNDI4NTcxKSBzY2FsZSgtMSwgMSkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTEyLjAwMDAwMCwgLTEyLjQyODU3MSkgdHJhbnNsYXRlKDAuMDAwMDAwLCAwLjQyODU3MSkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIzLjg0LDEwLjUxNDI4NTcgTDIzLjg0LDExLjA5MTQyODYgQzIzLjUzMzc3MjQsMTEuNjIxODMwNCAyMy41MzM3NzI0LDEyLjI3NTMxMjQgMjMuODQsMTIuODA1NzE0MyBMMjMuODQsMTQuNTIgQzIzLjUzMzc3MjQsMTUuMDUwNDAxOCAyMy41MzM3NzI0LDE1LjcwMzg4MzkgMjMuODQsMTYuMjM0Mjg1NyBMMjMuODQsMTcuOTQ4NTcxNCBDMjMuNTMzNzcyNCwxOC40Nzg5NzMzIDIzLjUzMzc3MjQsMTkuMTMyNDU1MyAyMy44NCwxOS42NjI4NTcxIEwyMy44NCwyMC4yMzQyODU3IEMyMy44NCwyMS44MTIyNDIxIDIyLjU2MDgxMzYsMjMuMDkxNDI4NiAyMC45ODI4NTcxLDIzLjA5MTQyODYgTDEwLjEyNTcxNDMsMjMuMDkxNDI4NiBDOS43ODgyOTU5OCwyMy4wOTE2MTgzIDkuNDU4MzI0NzcsMjIuOTkyMjI5NCA5LjE3NzE0Mjg2LDIyLjgwNTcxNDMgTDYuNjk3MTQyODYsMjEuMTU0Mjg1NyBMNi42OTcxNDI4NiwyMS4zNzcxNDI5IEM2LjY5NzE0Mjg2LDIyLjMyMzkxNjcgNS45Mjk2MzEsMjMuMDkxNDI4NiA0Ljk4Mjg1NzE0LDIzLjA5MTQyODYgTDIuMTI1NzE0MjksMjMuMDkxNDI4NiBDMS4xNzg5NDA0MywyMy4wOTE0Mjg2IDAuNDExNDI4NTcxLDIyLjMyMzkxNjcgMC40MTE0Mjg1NzEsMjEuMzc3MTQyOSBMMC40MTE0Mjg1NzEsOC44MDU3MTQyOSBDMC40MTE0Mjg1NzEsNy44NTg5NDA0MyAxLjE3ODk0MDQzLDcuMDkxNDI4NTcgMi4xMjU3MTQyOSw3LjA5MTQyODU3IEw0Ljk4Mjg1NzE0LDcuMDkxNDI4NTcgQzUuNjc3MDAwNDcsNy4wOTI1NzY0OSA2LjMwMTk0MDQxLDcuNTEyMjExMjUgNi41NjU3MTQyOSw4LjE1NDI4NTcxIEw5LjIwNTcxNDI5LDcuMjk3MTQyODYgTDExLjI2ODU3MTQsNS4yMzQyODU3MSBMMTEuMjY4NTcxNCwzLjY1NzE0Mjg2IEMxMS4yNjg1NzE0LDEuOTQyODU3MTQgMTIuMjUxNDI4NiwwLjIyODU3MTQyOSAxNC4xMjU3MTQzLDAuMjI4NTcxNDI5IEMxNiwwLjIyODU3MTQyOSAxNi45ODI4NTcxLDEuOTQyODU3MTQgMTYuOTgyODU3MSwzLjY1NzE0Mjg2IEwxNi45ODI4NTcxLDcuNjU3MTQyODYgTDIwLjk4Mjg1NzEsNy42NTcxNDI4NiBDMjIuNTYwODEzNiw3LjY1NzE0Mjg2IDIzLjg0LDguOTM2MzI5MjkgMjMuODQsMTAuNTE0Mjg1NyBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"> \
						</div> \
						<div type ="postback" value = "dislike" class="likeDislikeDiv disLikeDiv">\
							<img class = "disLikeImg" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kaXNsaWtlSWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJkaXNsaWtlSWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIC0xLjAwMDAwMCkiIGZpbGw9IiM5QjlCOUIiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJMaWtlLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTIuNDI4NTcxKSBzY2FsZSgtMSwgMSkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTEyLjAwMDAwMCwgLTEyLjQyODU3MSkgdHJhbnNsYXRlKDAuMDAwMDAwLCAwLjQyODU3MSkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIzLjg0LDEwLjUxNDI4NTcgQzIzLjg0LDguOTM2MzI5MjkgMjIuNTYwODEzNiw3LjY1NzE0Mjg2IDIwLjk4Mjg1NzEsNy42NTcxNDI4NiBMMTYuOTgyODU3MSw3LjY1NzE0Mjg2IEwxNi45ODI4NTcxLDMuNjU3MTQyODYgQzE2Ljk4Mjg1NzEsMS45NDI4NTcxNCAxNiwwLjIyODU3MTQyOSAxNC4xMjU3MTQzLDAuMjI4NTcxNDI5IEMxMi4yNTE0Mjg2LDAuMjI4NTcxNDI5IDExLjI2ODU3MTQsMS45NDI4NTcxNCAxMS4yNjg1NzE0LDMuNjU3MTQyODYgTDExLjI2ODU3MTQsNS4yMzQyODU3MSBMOS4yMDU3MTQyOSw3LjI5NzE0Mjg2IEw2LjU2NTcxNDI5LDguMTU0Mjg1NzEgQzYuMzAxOTQwNDEsNy41MTIyMTEyNSA1LjY3NzAwMDQ3LDcuMDkyNTc2NDkgNC45ODI4NTcxNCw3LjA5MTQyODU3IEwyLjEyNTcxNDI5LDcuMDkxNDI4NTcgQzEuMTc4OTQwNDMsNy4wOTE0Mjg1NyAwLjQxMTQyODU3MSw3Ljg1ODk0MDQzIDAuNDExNDI4NTcxLDguODA1NzE0MjkgTDAuNDExNDI4NTcxLDIxLjM3NzE0MjkgQzAuNDExNDI4NTcxLDIyLjMyMzkxNjcgMS4xNzg5NDA0MywyMy4wOTE0Mjg2IDIuMTI1NzE0MjksMjMuMDkxNDI4NiBMNC45ODI4NTcxNCwyMy4wOTE0Mjg2IEM1LjkyOTYzMSwyMy4wOTE0Mjg2IDYuNjk3MTQyODYsMjIuMzIzOTE2NyA2LjY5NzE0Mjg2LDIxLjM3NzE0MjkgTDYuNjk3MTQyODYsMjEuMTU0Mjg1NyBMOS4xNzcxNDI4NiwyMi44MDU3MTQzIEM5LjQ1ODMyNDc3LDIyLjk5MjIyOTQgOS43ODgyOTU5OCwyMy4wOTE2MTgzIDEwLjEyNTcxNDMsMjMuMDkxNDI4NiBMMjAuOTgyODU3MSwyMy4wOTE0Mjg2IEMyMi41NjA4MTM2LDIzLjA5MTQyODYgMjMuODQsMjEuODEyMjQyMSAyMy44NCwyMC4yMzQyODU3IEwyMy44NCwxOS42NjI4NTcxIEMyMy41MzM3NzI0LDE5LjEzMjQ1NTMgMjMuNTMzNzcyNCwxOC40Nzg5NzMzIDIzLjg0LDE3Ljk0ODU3MTQgTDIzLjg0LDE2LjIzNDI4NTcgQzIzLjUzMzc3MjQsMTUuNzAzODgzOSAyMy41MzM3NzI0LDE1LjA1MDQwMTggMjMuODQsMTQuNTIgTDIzLjg0LDEyLjgwNTcxNDMgQzIzLjUzMzc3MjQsMTIuMjc1MzEyNCAyMy41MzM3NzI0LDExLjYyMTgzMDQgMjMuODQsMTEuMDkxNDI4NiBMMjMuODQsMTAuNTE0Mjg1NyBaIE00Ljk4Mjg1NzE0LDIxLjM3MTQyODYgTDIuMTI1NzE0MjksMjEuMzcxNDI4NiBMMi4xMjU3MTQyOSw4LjggTDQuOTgyODU3MTQsOC44IEw0Ljk4Mjg1NzE0LDIxLjM3MTQyODYgWiBNMjIuMTI1NzE0MywxMS4wODU3MTQzIEwyMS4yNjg1NzE0LDExLjA4NTcxNDMgQzIwLjc5NTE4NDUsMTEuMDg1NzE0MyAyMC40MTE0Mjg2LDExLjQ2OTQ3MDIgMjAuNDExNDI4NiwxMS45NDI4NTcxIEMyMC40MTE0Mjg2LDEyLjQxNjI0NDEgMjAuNzk1MTg0NSwxMi44IDIxLjI2ODU3MTQsMTIuOCBMMjIuMTI1NzE0MywxMi44IEwyMi4xMjU3MTQzLDE0LjUxNDI4NTcgTDIxLjI2ODU3MTQsMTQuNTE0Mjg1NyBDMjAuNzk1MTg0NSwxNC41MTQyODU3IDIwLjQxMTQyODYsMTQuODk4MDQxNiAyMC40MTE0Mjg2LDE1LjM3MTQyODYgQzIwLjQxMTQyODYsMTUuODQ0ODE1NSAyMC43OTUxODQ1LDE2LjIyODU3MTQgMjEuMjY4NTcxNCwxNi4yMjg1NzE0IEwyMi4xMjU3MTQzLDE2LjIyODU3MTQgTDIyLjEyNTcxNDMsMTcuOTQyODU3MSBMMjEuMjY4NTcxNCwxNy45NDI4NTcxIEMyMC43OTUxODQ1LDE3Ljk0Mjg1NzEgMjAuNDExNDI4NiwxOC4zMjY2MTMxIDIwLjQxMTQyODYsMTguOCBDMjAuNDExNDI4NiwxOS4yNzMzODY5IDIwLjc5NTE4NDUsMTkuNjU3MTQyOSAyMS4yNjg1NzE0LDE5LjY1NzE0MjkgTDIyLjEyNTcxNDMsMTkuNjU3MTQyOSBMMjIuMTI1NzE0MywyMC4yMjg1NzE0IEMyMi4xMjU3MTQzLDIwLjg1OTc1NCAyMS42MTQwMzk3LDIxLjM3MTQyODYgMjAuOTgyODU3MSwyMS4zNzE0Mjg2IEwxMC4xMjU3MTQzLDIxLjM3MTQyODYgTDYuNjk3MTQyODYsMTkuMDg1NzE0MyBMNi42OTcxNDI4Niw5LjkwODU3MTQzIEwxMC4xMjU3MTQzLDguOCBMMTIuOTgyODU3MSw1Ljk0Mjg1NzE0IEwxMi45ODI4NTcxLDMuNjU3MTQyODYgQzEyLjk4Mjg1NzEsMy42NTcxNDI4NiAxMi45ODI4NTcxLDEuOTQyODU3MTQgMTQuMTI1NzE0MywxLjk0Mjg1NzE0IEMxNS4yNjg1NzE0LDEuOTQyODU3MTQgMTUuMjY4NTcxNCwzLjY1NzE0Mjg2IDE1LjI2ODU3MTQsMy42NTcxNDI4NiBMMTUuMjY4NTcxNCw5LjM3MTQyODU3IEwyMC45ODI4NTcxLDkuMzcxNDI4NTcgQzIxLjYxNDAzOTcsOS4zNzE0Mjg1NyAyMi4xMjU3MTQzLDkuODgzMTAzMTQgMjIuMTI1NzE0MywxMC41MTQyODU3IiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"> \
							<img class = "hide disLikedImg" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kaXNsaWtlSWNvblNlbGVjdEJsdWU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iZGlzbGlrZUljb25TZWxlY3RCbHVlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgLTEuMDAwMDAwKSIgZmlsbD0iIzdGQTREQiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Ikxpa2UtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMDAwMDAwLCAxMi40Mjg1NzEpIHNjYWxlKC0xLCAxKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTIuMDAwMDAwLCAtMTIuNDI4NTcxKSB0cmFuc2xhdGUoMC4wMDAwMDAsIDAuNDI4NTcxKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjMuODQsMTAuNTE0Mjg1NyBMMjMuODQsMTEuMDkxNDI4NiBDMjMuNTMzNzcyNCwxMS42MjE4MzA0IDIzLjUzMzc3MjQsMTIuMjc1MzEyNCAyMy44NCwxMi44MDU3MTQzIEwyMy44NCwxNC41MiBDMjMuNTMzNzcyNCwxNS4wNTA0MDE4IDIzLjUzMzc3MjQsMTUuNzAzODgzOSAyMy44NCwxNi4yMzQyODU3IEwyMy44NCwxNy45NDg1NzE0IEMyMy41MzM3NzI0LDE4LjQ3ODk3MzMgMjMuNTMzNzcyNCwxOS4xMzI0NTUzIDIzLjg0LDE5LjY2Mjg1NzEgTDIzLjg0LDIwLjIzNDI4NTcgQzIzLjg0LDIxLjgxMjI0MjEgMjIuNTYwODEzNiwyMy4wOTE0Mjg2IDIwLjk4Mjg1NzEsMjMuMDkxNDI4NiBMMTAuMTI1NzE0MywyMy4wOTE0Mjg2IEM5Ljc4ODI5NTk4LDIzLjA5MTYxODMgOS40NTgzMjQ3NywyMi45OTIyMjk0IDkuMTc3MTQyODYsMjIuODA1NzE0MyBMNi42OTcxNDI4NiwyMS4xNTQyODU3IEw2LjY5NzE0Mjg2LDIxLjM3NzE0MjkgQzYuNjk3MTQyODYsMjIuMzIzOTE2NyA1LjkyOTYzMSwyMy4wOTE0Mjg2IDQuOTgyODU3MTQsMjMuMDkxNDI4NiBMMi4xMjU3MTQyOSwyMy4wOTE0Mjg2IEMxLjE3ODk0MDQzLDIzLjA5MTQyODYgMC40MTE0Mjg1NzEsMjIuMzIzOTE2NyAwLjQxMTQyODU3MSwyMS4zNzcxNDI5IEwwLjQxMTQyODU3MSw4LjgwNTcxNDI5IEMwLjQxMTQyODU3MSw3Ljg1ODk0MDQzIDEuMTc4OTQwNDMsNy4wOTE0Mjg1NyAyLjEyNTcxNDI5LDcuMDkxNDI4NTcgTDQuOTgyODU3MTQsNy4wOTE0Mjg1NyBDNS42NzcwMDA0Nyw3LjA5MjU3NjQ5IDYuMzAxOTQwNDEsNy41MTIyMTEyNSA2LjU2NTcxNDI5LDguMTU0Mjg1NzEgTDkuMjA1NzE0MjksNy4yOTcxNDI4NiBMMTEuMjY4NTcxNCw1LjIzNDI4NTcxIEwxMS4yNjg1NzE0LDMuNjU3MTQyODYgQzExLjI2ODU3MTQsMS45NDI4NTcxNCAxMi4yNTE0Mjg2LDAuMjI4NTcxNDI5IDE0LjEyNTcxNDMsMC4yMjg1NzE0MjkgQzE2LDAuMjI4NTcxNDI5IDE2Ljk4Mjg1NzEsMS45NDI4NTcxNCAxNi45ODI4NTcxLDMuNjU3MTQyODYgTDE2Ljk4Mjg1NzEsNy42NTcxNDI4NiBMMjAuOTgyODU3MSw3LjY1NzE0Mjg2IEMyMi41NjA4MTM2LDcuNjU3MTQyODYgMjMuODQsOC45MzYzMjkyOSAyMy44NCwxMC41MTQyODU3IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="> \
						</div> \
					</div>\
				</li> \
			{{/if}} \
		</script>';
	/* Sample template structure for Inline Form
	var message = {
  	"type": "template",
	    "payload": {
	        "template_type": "form_template",
	        "heading": "Please fill the form",
	        "formFields": [
	            {
	               "type": "password",
	               "label": "Enter Password",
	               "placeholder": "Enter password",
	               "fieldButton": {
	                        "title": "Ok"
	                              }
               }
	           ]
	      }
	}
	print(JSON.stringify(message)); */
	
		
var formTemplate='<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
<li {{if msgData.type !== "bot_response"}} id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
	<div class="buttonTmplContent"> \
	{{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		{{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
	   <div class="{{if msgData.message[0].component.payload.fromHistory}} dummy messageBubble {{else}}messageBubble{{/if}}"> \
			<div class="formMainComponent">\
			  {{if msgData.message[0].component.payload.heading}}<div class="templateHeading">${msgData.message[0].component.payload.heading}</div>{{else}}Submit Form{{/if}}\
				<form>\
				   <div class="formBody">\
					   {{each(key, msgItem) msgData.message[0].component.payload.formFields}} \
					   <div class="input_group">\
					{{if msgData.message[0].component.payload.formFields[0].label}}<div class="input_label">${msgData.message[0].component.payload.formFields[0].label} : </div>{{/if}}\
							<div class="inputMainComponent">\
							 <div class="input-btn-submit">\
								  <input type="${msgItem.type}" class="form-control" id="email" name="email" placeholder="${msgItem.placeholder}" value=""/>\
							 </div>\
							 <div id="submit" class="submit" value={{if msgData.message[0].component.payload.text}} "${msgData.message[0].component.payload.text}"{{/if}} >\
								 <div class="ok_btn" value="${msgData.message[0].component.payload.formFields[0].fieldButton.title}">${msgData.message[0].component.payload.formFields[0].fieldButton.title}</div>\
							 </div>\
							 </div>\
							</div>\
							{{/each}} \
					   </div>\
						 <div class="errorMessage hide"></div>\
			   </form>\
			</div>\
	   </div>\
	</div>\
</li> \
{{/if}} \
</script>';

/* Sample template structure for Advanced Multi Select Checkbox 
 var message = {
"type": "template",
"payload": {
"template_type": "advanced_multi_select",
"heading":"Please select items to proceed",
"description":"Premium Brands",
"sliderView":false,
"showViewMore":true,
"limit":1,
"elements": [
{
'collectionTitle':"Collection 1",
'collection':[
{
"title": "Classic Adidas Collection",
"description":"German Company",
"value":"Adidas",
"image_url":"https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
},{
"title": "Classic Puma Collection",
"value":"Puma",
"description":"German Company",
"image_url":"https://www.myredqueen.com/45056-home_default/gucci-white-logo-t-shirt.jpg"
},
{
"title": "Classic Nike Collection",
"description":"American Company",
"value":"Nike",
"image_url":"https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg"
}
]

},
{
'collectionTitle':"Collection 2",
'collection':[
{
"title": "Classic Rolls Royce Collection",
"value":"Roll Royce",
"description":"London Company",
"image_url":"https://i.pinimg.com/236x/bd/40/f6/bd40f62bad0e38dd46f9aeaa6a95d80e.jpg"
},{
"title": "Classic Audi Collection",
"value":"Audi",
"description":"German Company",
"image_url":"https://www.car-logos.org/wp-content/uploads/2011/09/audi.png"
},
{
"title": "Classic lamborghini Collection",
"value":"lamborghini",
"description":"Italy Company",
"image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBeoerEQ7F5Mlh4S7u0uvEcPAlQ-J0s6V-__tBJ7JPc6KCZo9&usqp=CAU"
}
]
},{
'collectionTitle':"Collection 3",
'collection':[
{
"title": "Classic Rolex Collection",
"value":"Rolex",
"description":"Switzerland Company",
"image_url":"https://image.shutterstock.com/image-photo/kiev-ukraine-may-13-2015-260nw-278633477.jpg"
}
]
},
{
'collectionTitle':"Collection 4",
'collection':[
{
"title": "Classic Fossil Collection",
"value":"Fossil",
"description":"American Company ",
"image_url":"https://www.pngitem.com/pimgs/m/247-2470775_fossil-logo-png-free-download-fossil-transparent-png.png"
}
]
},
{
'collectionTitle':"Collection 5",
'collection':[
{
"title": "Classic Fastrack Collection",
"value":"FastTrack",
"description":"Indian Company",
"image_url":"https://logodix.com/logo/2153855.jpg"
}
]
}
],
"buttons": [
{
"title": "Done",
"type": "postback",
"payload": "payload"
}
]
}
};
print(JSON.stringify(message)); */


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
    /* Sample template structure for New List Template 
    	 var message={
			"type": "template",
			"payload": {
			    "template_type": "listView",
			    "seeMore":true,
			    "moreCount":4,
			    "text":"Here is your recent transactions",
			    "heading":"Speed Analysis",
			    "buttons":[
			        {
			            "title":"See more",
			            "type":"postback",
			            "payload":"payload"
			        }
			    ],
			    "elements": [
			       {
			          "title": "Swiggy",
			          "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			          "subtitle": "17 Monday June",
			          "value":"get directions",
			          "default_action": {
						   "title":"swiggyOrder",
						   "type":"postback"
			            }
			        },
			        {
			            "title": "Amazon",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "17 Monday June",
			            "value":"$35.88",
			            "default_action": {
							"title":"AmazonOrder",
							"type":"postback"
			            }
			        },
			        {
			            "title": "Timex",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "20 Monday June",
			            "value":"$35.88",
			            "default_action": {
						   "title":"TimexOrder",
						   "type":"postback"
			            }
			        },
			        {
			            "title": "Fuel",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "12 Transactions",
			            "value":"$35.88",
			            "default_action": {
							"title":"TimexOrder",
							"type":"postback"
			            }
			        },
			        {
			            "title": "Shopping",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "17 Monday June",
			            "value":"$35.88",
			            "default_action": {
							"title":"TimexOrder",
							"type":"postback"
			            }
			        },
			    ],
			    "moreData": {
			       "Tab1": [
					 {
						"title": "Swiggy",
						"image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
						"subtitle": "17 Monday June",
						"value":"get directions",
						"default_action": {
							 "title":"swiggyOrder",
							 "type":"postback"
						  }
					  },
					  {
						  "title": "Amazon",
						  "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
						  "subtitle": "17 Monday June",
						  "value":"$35.88",
						  "default_action": {
							  "title":"AmazonOrder",
							  "type":"postback"
						  }
					  },
					  {
						  "title": "Timex",
						  "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
						  "subtitle": "20 Monday June",
						  "value":"$35.88",
						  "default_action": {
							 "title":"TimexOrder",
							 "type":"postback"
						  }
					  },
			    ],
			       "Tab2": [
					{
			            "title": "Fuel",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "12 Transactions",
			            "value":"$35.88",
			            "default_action": {
							"title":"TimexOrder",
							"type":"postback"
			            }
			        },
			        {
			            "title": "Shopping",
			            "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			            "subtitle": "17 Monday June",
			            "value":"$35.88",
			            "default_action": {
							"title":"TimexOrder",
							"type":"postback"
			            }
			        },
			    ]
			}
		}
	}
	print(JSON.stringify(message)); */



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
									<div class="listViewLeftContent" data-url="${msgItem.default_action.url}" data-title="${msgItem.default_action.title}" data-value="${msgItem.default_action.payload}"> \
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
							 <div class="listViewLeftContent" data-url="${msgItem.default_action.url}" data-title="${msgItem.default_action.title}" data-value="${msgItem.default_action.payload}"> \
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

/*TABLE LIST TEMPLATE

var message={
	"type": "template",
	"payload": {
				"template_type": "tableList",
				"title":"Marvel Comics",
				"description":"Marvel Worldwide Inc.",
				"headerOptions":{
					"type":"text",
					"text":"Comics",
				},


	"elements":[
		{
			"sectionHeader":"Marvel Comics",
			"sectionHeaderDesc":"It is a story book",
			"rowItems":[
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://i1.pngguru.com/preview/277/841/159/captain-marvel-movie-folder-icon-v4-png-clipart.jpg",
							"radius":10,
							"size":"medium"
						},
						"type":"url",    //type=text | url
						"url":{			 // if type text use text, if type url use url
							"link":"https://www.facebook.com", // if type=url use link
							"title":"Captain Marvel",
							"subtitle":"Cosmic energy",
						},

						"rowColor":"blue" //text color to entire row
					},
					"value":{
						"type":"url",
						"url":{
							"link":"https://www.marvel.com/movies/captain-marvel",
							"title":"energy"
						},
						"layout":{
							"align":"top",
							"color":"blue",//apply color to value in row
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com", // if type =url use url
						"payload":"marvelmovies",
						"title":"Captain Marvel",
						"utterance":""
					},
					"bgcolor":"#F67159" // background color to entire row
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://www.pinclipart.com/picdir/middle/44-444753_avengers-clipart-marvel-super-heroes-iron-man-logo.png",
							"radius":10,
							"size":"medium"
						},
						"type":"text",
						"text":{
							"title":"Iron Man",
							"subtitle":"Iron Sute",
						},
						"rowColor":"#4BA2F9"
					},
					"value":{
						"type":"text",
						"text":"$ 7,000,000",
						"layout":{
							"align":"center",
							"color":"blue",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/comics/characters/1009368/iron_man",
						"utterance":"",
					},
					"bgcolor":"#C9EEBB"
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://img1.looper.com/img/gallery/rumor-report-is-marvel-really-making-captain-america-4/intro-1571140919.jpg",
							"radius":10,
							"size":"medium"
						},
						"type":"text",
						"text":{
							"title":"Captain America",
							"subtitle":"Vibranium Shield",
						},
						"rowColor":"#F5978A"
					},
					"value":{
						"type":"text",
						"text":"$ 10,000,000",
						"layout":{
							"align":"center",
							"color":"black",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/characters/captain-america-steve-rogers",
						"utterance":"",
					}
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/1/13/Thor-EndgameProfile.jpg/revision/latest/scale-to-width-down/620?cb=20190423174911",
							"radius":10,
							"size":"medium"
						},
						"type":"url",
						"url":{ 
							"link":"https://www.marvel.com/movies/captain-marvel",
							"title":"Captain Marvel",
							"subtitle":"bskjfkejf",
						},
						"rowColor":"#13F5E0"
					},
					"value":{
						"type":"text",
						"text":"$ 5,000,000",
						"layout":{
							"align":"center",
							"color":"#FF5733",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/characters/thor-thor-odinson",
						"utterance":"",
					},
				}
			]
		}

	]
}
};
print(JSON.stringify(message));

*/

 var tableListTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
 {{if msgData.message}} \
	 <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		 <div class="listTmplContent"> \
			 {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
			 {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
			 <div class="{{if msgData.message[0].component.payload.fromHistory}}dummy listTableContainerDiv {{else}}listTableContainerDiv{{/if}} ">\
 <div class="listTableContainerDivRepet">\
 <div class="listTableContainer">\
 {{each(index,element) msgData.message[0].component.payload.elements}}\
		 <div class="listTableDetailsBorderDiv">\
				 <div class="listTableDetails">\
				 <div class="listTableHeader">\
				 {{if element && element.sectionHeader}} <div class="listTableDetailsTitle">${element.sectionHeader}</div>{{/if}}\
					 <div class="listTableHeaderDesc{{if element.value && element.value.layout && element.value.layout.align}}${element.value.layout.align}{{/if}}" {{if element && element.colSize}} style="width:${element.colSize};"{{/if}} {{if element.value && element.value.layout && element.value.layout.color}} style="color:${element.value.layout.color}"{{/if}}>\
					 {{if element && element.sectionHeaderDesc}}  <div class="headerDesc" title="${element.sectionHeaderDesc}">${element.sectionHeaderDesc}</div></div>{{/if}}\
				 </div>\
		 {{each(index,msgItem) element.rowItems}}\
					 <div class="listTableDetailsDesc {{if msgItem && msgItem.title && msgItem.title.image && msgItem.title.image.size==="medium"}}mediumImg{{/if}} {{if msgItem.title.type!=="url" && msgItem.default_action}}pointerStyle{{/if}} {{if msgItem.title.image && msgItem.title.image.size==="large"}}largeImg{{/if}}" {{if msgItem.title.image && msgItem.title.image.size==="small"}}smallImg{{/if}}" {{if msgItem && msgItem.bgcolor}} style="background-color:${msgItem.bgcolor};"{{/if}} {{if msgItem && msgItem.title && msgItem.title.rowColor}}style="color:${msgItem.title.rowColor}"{{/if}} {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}} data-title="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} data-value="${msgItem.default_action.payload}"{{/if}}>\
					   {{if msgItem && msgItem.title.image && msgItem.title.image.image_type && msgItem.title.image.image_src}}\
						 <div class="listTableBigImgConytainer">\
						   {{if msgItem.title.image.image_type === "image"}}\
							   <img src="${msgItem.title.image.image_src}">\
						   {{/if}}\
						   {{if msgItem.title.image.image_type === "fontawesome"}}\
							   <i class="fa {{msgItem.title.image.image_src}}" ></i>\
						   {{/if}}\
						 </div>\
					   {{/if}}\
					   <div class="listTableDetailsDescSub " {{if msgItem && msgItem.title && msgItem.title.rowColor}} style="color:${msgItem.title.rowColor}"{{/if}} >\
						 {{if (msgItem && msgItem.title && msgItem.title.type && msgItem.title.type ==="url")}}\
						 <div class="listTableDetailsDescName">\
						 <div actionObj="${JSON.stringify(msgItem.title.url)}" type="${msgItem.title.type}" url="${msgItem.title.url.link}" class="listViewItemValue actionLink actiontitle {{if !msgItem.subtitle}}top10{{/if}}">${msgItem.title.url.title}</div>\
						 </div>{{else}}\
						 {{if msgItem && msgItem.title && msgItem.title.text && msgItem.title.text.title}} <p class="listTableDetailsDescName">${msgItem.title.text.title}</p>{{/if}}\
					   {{/if}}\
					   {{if (msgItem && msgItem.title && msgItem.title.url && msgItem.title.url.subtitle)}}\
							 <p class="listTableDetailsDescValue">${msgItem.title.url.subtitle}</p>\
							 {{else (msgItem && msgItem.title && msgItem.title.text && msgItem.title.text.subtitle)}}\
							 <p class="listTableDetailsDescValue">${msgItem.title.text.subtitle}</p>\
						 {{/if}}\
						 </div>\
						   {{if (msgItem.value && msgItem.value.type === "text" && msgItem.value.text)}}\
							 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
								 <div class="listViewItemValue {{if !msgItem.subtitle}}top10{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.color}} style="color:${msgItem.value.layout.color}"{{/if}} title="${msgItem.value.text}">${msgItem.value.text}</div>\
							 </div>\
						   {{/if}}\
						   {{if (msgItem.value && msgItem.value.type === "image" && msgItem.value.image && msgItem.value.image.image_src)}}\
							 <div actionObj="${JSON.stringify(msgItem.value.image)}" class="titleActions imageValue action {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
								 {{if msgItem.value.image && msgItem.value.image.image_type === "image" && msgItem.value.image.image_src}}\
									 <span class="wid-temp-btnImage"> \
										 <img alt="image" src="${msgItem.value.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
									 </span> \
								 {{/if}}\
							 </div>\
						   {{/if}}\
						   {{if (msgItem.value && msgItem.value.type === "url" && msgItem.value.url)}}\
							 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && (msgItem.value.layout.colSize || msgItem.value.layout.color)}} style="width:${msgItem.value.layout.colSize};color:${msgItem.value.layout.color}"{{/if}}>\
							 {{if msgItem && msgItem.value && msgItem.value.url}} <div actionObj="${JSON.stringify(msgItem.value.url)}" type="${msgItem.value.type}" url="${msgItem.value.url.link}"class="listViewItemValue actionLink actiontitle{{if !msgItem.subtitle}} top10{{/if}}">${msgItem.value.url.title}</div>{{/if}}\
							 </div>\
						   {{/if}}\
						   {{if msgItem.value && msgItem.value.type=="button" && msgItem.value.button && (msgItem.value.button.title || (msgItem.value.button.image && msgItem.value.button.image.image_src))}}\
							 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
								 <div class="actionBtns action singleBTN {{if !msgItem.value.button.title && (msgItem.value.button.image && msgItem.value.button.image.image_src)}}padding5{{/if}}" actionObj="${JSON.stringify(msgItem.value.button)}">\
									 {{if msgItem.value.button.image && msgItem.value.button.image.image_type === "image" && msgItem.value.button.image.image_src}}\
											 <span class="wid-temp-btnImage"> \
												 <img alt="image" src="${msgItem.value.button.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
											 </span> \
									 {{/if}}\
									 {{if msgItem && msgItem.value && msgItem.value.button && msgItem.value.button.title}}\
									 ${msgItem.value.button.title}\
									 {{/if}}\
								 </div>\
							 </div>\
						   {{/if}}\
						   {{if msgItem.value && msgItem.value.type=="menu" && msgItem.value.menu && msgItem.value.menu.length}}\
						   <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
							   <i class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)"></i>\
								   <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
									 {{each(key, actionbtnli) msgItem.value.menu}} \
										   <li class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
										 <i>\
										 {{if actionbtnli.image && actionbtnli.image.image_type === "image" && msgItem.title.image.image_src}}\
										 <span class="wid-temp-btnImage"> \
											 <img alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
										 </span> \
										 {{/if}} \
										 </i>${actionbtnli.title}</li>\
									 {{/each}}\
								   </ul>\
						   </div>\
						   {{/if}}\
					 </div>\
		 {{/each}}\
				 </div>\
		 </div>\
 {{/each}}\
 </div>\
 {{if msgData.elements && msgData.elements.length > 3 && viewmore}} \
	 <div class="seeMoreFooter">\
		 <span class="seeMoreLink" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">Show more</span>\
	 </div>\
 {{/if}}\
 </div>\
</div>\
</div> \
</li> \
{{/if}} \
</scipt>';
/* rating template
var message = {
"type": "template",
"payload": {
"text":"Rate this chat session",
"template_type": "feedbackTemplate",
"view":"star|| emojis",
"sliderView":false, //add this line and change to true when you want template to open as slider
"starArrays":[],
"smileyArrays":[],
"messageTodisplay":"Glad you liked the experience. Thanks!"//To display on click of 5th star or emoji
}
};
 if(message.payload.view === "star"){
    var level=5;
    for (i = level; i >=1; i--) {
    var starArray = {
        "starId": i,
        "value": i,
    };
message.payload.starArrays.push(starArray);
}

}
else if(message.payload.view === "emojis"){
    for(var i=1;i<=5;i++){
     var smileyArray = {
        "smileyId":i,
        "value": i
    };
message.payload.smileyArrays.push(smileyArray);
    }
}
print(JSON.stringify(message)); */

var ratingTemplate='<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
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
			  {{if msgData.message[0].component.payload.sliderView  && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
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
			  {{if msgData.message[0].component.payload.sliderView  && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
			  {{if msgData.message[0].component.payload.text}}<div class="templateHeading text-heading-info">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
			  <div class="emojis-data">\
			  {{each(key, msgItem) msgData.message[0].component.payload.thumpsUpDownArrays}}\
			  <div class="ratingValue emoji-rating" value="${msgItem.value}" data-id="${key}">\
			    <div class="rating" id="rating_${key}" value="${msgItem.value}"></div>\
				 <div class="emoji-desc" title="${msgItem.reviewText}">${msgItem.reviewText}</div></div>\
			  {{/each}}\
			  </div>\
			  {{else msgData.message[0].component.payload.view == "NPS"}}\
			  <div class="numbersComponent">\
			  {{if msgData.message[0].component.payload.sliderView  && !msgData.fromHistory}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
			  {{if msgData.message[0].component.payload.text}}<div class="templateHeading text-heading-info">${msgData.message[0].component.payload.text}</div>{{else}}Rate the chat session{{/if}}\
			  <div class="rating-numbers-data">\
			  {{each(key, msgItem) msgData.message[0].component.payload.numbersArrays}}\
			  <div class="ratingValue emoji-rating" value="${msgItem.value}" data-id="${msgItem.numberId}">\
				 <div class="rating" id="rating_${msgItem.numberId}" value="${msgItem.value}">${msgItem.numberId}</div>\
				 <div class="emoji-desc" title="${msgItem.reviewText}">${msgItem.reviewText}</div></div>\
			  {{/each}}\
			  </div>\
			  {{/if}}\
		   </ul>{{/if}}</div>\
	</div>\
	</li>\
{{/if}} \
</script>';

/* Sample template structure for List Widget Template 
	var message={
    	"type": "template",
    	"payload": {
  "template_type": "listWidget",
  "title": "Main Title",
  "description": "Min description",
  "headerOptions": {
       "type": "menu",
      "menu": [
      {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      }
    ],

  },
  "elements": [
    {
      "image": {
        "image_type": "image",
        "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
        "radius": 10,
        "size": "medium"
      },
      "title": "One Title",
      "subtitle": "One subtitle",
      "value": {
        "layout":{
          "align":"center",
          "colSize":"50%"
        },
        "type": "text",
        "text": "One Value",
      },
     "details": [{
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393******8455"
            }, {
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393******8455"
            }],

      "default_action": {
        "type": "postback",
        "payload": "New Value",
      },
       "buttonsLayout": {
        "displayLimit": {
          "count": "3"
        },
        "style": "float"
      },
      "buttons": [
        {
          "type": "postback",
          "title": "button1",
          "payload": "buttonpayload",
          "utterance": "",
          "image": {
            "image_type": "image",
            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
          },
        },
          {
          "type": "postback",
          "title": "button2",
          "payload": "buttonpayload",
          "utterance": "",
          "image": {
            "image_type": "image",
            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
          },
        },
          {
          "type": "postback",
          "title": "button3",
          "payload": "buttonpayload",
          "utterance": "",
          "image": {
            "image_type": "image",
            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
          },
        },
          {
          "type": "postback",
          "title": "button4",
          "payload": "buttonpayload",
          "utterance": "",
          "image": {
            "image_type": "image",
            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
          },
        }
      ]
    },
    {
      "image": {
        "image_type": "image",
        "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
        "radius": 10,
        "size": "medium"
      },
      "title": "Two Title",
      "subtitle": "Two subtitle",
      "value": {
        "layout":{
          "align":"center",
          "colSize":"50%"
        },
       "type": "menu",
      "menu": [
      {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      },
       {
        "type": "postback",
        "title": "menuitem",
        "payload": "menupayload",
        "image": {
          "image_type": "image",
          "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
        },
      }
    ],
      },
     "details": [{
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393******8455"
            }, {
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393******8455"
            }],

      "default_action": {
        "type": "postback",
        "payload": "New Value",
      },
    },
    {
      "image": {
        "image_type": "image",
        "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
        "radius": 10,
        "size": "medium"
      },
      "title": "Three Title",
      "subtitle": "Three subtitle",
      "value": {
        "layout":{
          "align":"center",
          "colSize":"50%"
        },
        "type": "text",
        "text": "three Value",
      },
     "details": [{
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393******8455"
            }, {
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393******8455"
            }],

      "default_action": {
        "type": "postback",
        "payload": "New Value",
      },
    },
    {
      "image": {
        "image_type": "image",
        "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
        "radius": 10,
        "size": "medium"
      },
      "title": "Four Title",
      "subtitle": "Four subtitle",
      "value": {
        "layout":{
          "align":"center",
          "colSize":"50%"
        },
        "type": "text",
        "text": "Four Value",
      },
      "details": [{
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393******8455"
            }, {
                "image": {
                    "image_type": "image",
                    "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                },
                "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393******8455"
            }],

      "default_action": {
        "type": "postback",
        "payload": "New Value",
      },
    }
  ],
    	}
}
print(JSON.stringify(message)); */
	
	var listWidget = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
	{{if msgData.message}} \
	<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		<div class="listTmplContent"> \
			{{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
			{{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
			<div class="{{if msgData.message[0].component.payload.fromHistory}}dummy listTableContainerDiv {{else}}listTableContainerDiv{{/if}} ">\
			<div role="main" class="tab-list-template" mainObj="${JSON.stringify(tempdata)}">\
			{{if tempdata}} \
			 <div class="sheetHeader">\
				 <div class="headerLeft">\
					  <span class="choose">${tempdata.title}</span>\
				 {{if tempdata.description}}\
				 <p class="listViewItemSubtitle">${tempdata.description}</p>\
				 {{/if}}\
				 </div>\
				 {{if tempdata && tempdata.headerOptions && tempdata.headerOptions.type==="text" && tempdata.headerOptions.text}}\
				 <div class="headerRight">\
					 <div role="button"  tabindex="0" actionObj="${JSON.stringify(tempdata.headerOptions.text)}" class="headerActionBTN action" title="${tempdata.headerOptions.text}">${tempdata.headerOptions.text}</div>\
				 </div>\
				 {{/if}}\
				 {{if tempdata && tempdata.headerOptions && tempdata.headerOptions.type==="button" && tempdata.headerOptions.button && tempdata.headerOptions.button.title}}\
				 <div class="headerRight">\
					 <div role="button"  tabindex="0" actionObj="${JSON.stringify(tempdata.headerOptions.button)}" class="headerActionBTN action" title="${tempdata.headerOptions.button.title}">${tempdata.headerOptions.button.title}</div>\
				 </div>\
				 {{/if}}\
				 {{if (tempdata.headerOptions && tempdata.headerOptions.type === "url" && tempdata.headerOptions.url && tempdata.headerOptions.url.title)}}\
				   <div class="headerRight">\
					  <div role="button" tabindex="0" actionObj="${JSON.stringify(tempdata.headerOptions.url)}" class="headerActionLink action" title="${tempdata.headerOptions.url.title}">${tempdata.headerOptions.url.title}</div>\
				  </div>\
				 {{/if}}\
				 {{if tempdata.headerOptions && tempdata.headerOptions.type === "menu" && tempdata.headerOptions.menu && tempdata.headerOptions.menu.length}}\
				 <div class="headerRight">\
				 <div role="menu" aria-label="Dropdown Menu" class="titleActions">\
					 <i class="icon-More dropbtnWidgt moreValue"></i>\
						 <ul role="list" class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
						   {{each(key, actionbtnli) tempdata.headerOptions.menu}} \
								 <li role="button" tabindex="0" title="${actionbtnli.title}" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
							   <i>\
							   {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
							   <span class="wid-temp-btnImage"> \
								   <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
							   </span> \
							   {{/if}} \
							   </i>${actionbtnli.title}</li>\
						   {{/each}}\
						 </ul>\
				 </div>\
				 </div>\
				 {{/if}}\
				 <div class="headerRight" style="display:none;">\
				   <div class="headerActionEllipsis">\
				   <i class="icon-More dropbtnWidgt moreValue"></i>\
				   <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
						   <li class="dropdown-item action"> one</li>\
						   <li class="dropdown-item action"> two</li>\
				   </ul>\
				   </div>\
				 </div>\
			  </div>\
			 <div class="listTemplateContainer">\
			 {{if tempdata.tabs && tabs.length}} \
			   <div class="tabsContainer">\
				  {{each(key, tab) tabs}} \
				  <span class="tabs" data-tabid="${tab}" ><span class="btnBG">${tab}</span></span>\
				  {{/each}}\
			   </div>\
			 {{/if}} \
			   <ul class="displayListValues"w>\
				{{each(key, msgItem) dataItems}} \
				{{if ((viewmore && (key<=2)) || (!viewmore))}}\
				  <li class="listViewTmplContentChild" role="listitem"> \
				   <div class="listViewTmplContentChildRow">\
				   {{if msgItem.image && msgItem.image.image_type === "image" && msgItem.image.image_src}} \
						   <div class="listViewRightContent {{if msgItem.image.size}}${msgItem.image.size}{{/if}}" {{if msgItem.image.radius}}style="border-radius:$(msgItem.image.radius)"{{/if}}>\
							   <img aria-hidden="true" alt="image" src="${msgItem.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
						   </div> \
				   {{/if}} \
					   <div class="listViewLeftContent {{if (!msgItem.value) || (msgItem.value && msgItem.value.type==="text" && !msgItem.value.text) || (msgItem.value && msgItem.value.type==="button" && !msgItem.value.button)}}fullWidthTitle{{/if}} {{if msgItem.default_action}}handCursor{{/if}}" {{if msgItem && msgItem.default_action}}actionObj="${JSON.stringify(msgItem.default_action)}"{{/if}} {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize && ((msgItem.value && msgItem.value.type === "text" && msgItem.value.text) || (msgItem.value && msgItem.value.type === "url" && msgItem.value.url && msgItem.value.url.title) || (msgItem.value && msgItem.value.type=="button" && msgItem.value.button && (msgItem.value.button.title || (msgItem.value.button.image && msgItem.value.button.image.image_src))) || (msgItem.value && msgItem.value.type=="menu" && msgItem.value.menu && msgItem.value.menu.length))}} col-size="${msgItem.value.layout.colSize}"{{/if}}> \
							 <span class="titleDesc ">\
							   <div class="listViewItemTitle" title="${msgItem.title}">${msgItem.title}</div> \
							   {{if msgItem.subtitle}}\
								 <div class="listViewItemSubtitle" title="${msgItem.subtitle}">${msgItem.subtitle}</div>\
							   {{/if}} \
							 </span>\
					   </div>\
					   {{if (msgItem.value && msgItem.value.type === "text" && msgItem.value.text)}}\
						 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
							 <div class="listViewItemValue {{if !msgItem.subtitle}}top10{{/if}}" title="${msgItem.value.text}">${msgItem.value.text}</div>\
						 </div>\
					   {{/if}}\
					   {{if (msgItem.value && msgItem.value.type === "image" && msgItem.value.image && msgItem.value.image.image_src)}}\
						 <div actionObj="${JSON.stringify(msgItem.value.image)}" class="titleActions imageValue action {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
							 {{if msgItem.value.image && msgItem.value.image.image_type === "image" && msgItem.value.image.image_src}}\
								 <span class="wid-temp-btnImage"> \
									 <img aria-hidden="true" alt="image" src="${msgItem.value.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
								 </span> \
							 {{/if}}\
						 </div>\
					   {{/if}}\
					   {{if (msgItem.value && msgItem.value.type === "url" && msgItem.value.url && msgItem.value.url.title)}}\
						 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
							 <div role="navigation" actionObj="${JSON.stringify(msgItem.value.url)}" class="listViewItemValue actionLink action {{if !msgItem.subtitle}}top10{{/if}}" title="${msgItem.value.url.title}">${msgItem.value.url.title}</div>\
						 </div>\
					   {{/if}}\
					   {{if msgItem.value && msgItem.value.type=="button" && msgItem.value.button && (msgItem.value.button.title || (msgItem.value.button.image && msgItem.value.button.image.image_src))}}\
						 <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
							 <div role="button" aria-live="polite" tabindex="1" class="actionBtns action singleBTN {{if !msgItem.value.button.title && (msgItem.value.button.image && msgItem.value.button.image.image_src)}}padding5{{/if}}" actionObj="${JSON.stringify(msgItem.value.button)}">\
								 {{if msgItem.value.button.image && msgItem.value.button.image.image_type === "image" && msgItem.value.button.image.image_src}}\
										 <span class="wid-temp-btnImage"> \
											 <img aria-hidden="true" alt="image" src="${msgItem.value.button.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
										 </span> \
								 {{/if}}\
								 {{if msgItem.value.button.title}}\
								 ${msgItem.value.button.title}\
								 {{/if}}\
							 </div>\
						 </div>\
					   {{/if}}\
					   {{if msgItem.value && msgItem.value.type=="menu" && msgItem.value.menu && msgItem.value.menu.length}}\
					   <div role="menu" aria-label="Dropdown Menu" class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
						   <i class="icon-More dropbtnWidgt moreValue"></i>\
							   <ul role="list" class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
								 {{each(key, actionbtnli) msgItem.value.menu}} \
									   <li role="button" tabindex="0" title="${actionbtnli.title}" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
									 <i>\
									 {{if actionbtnli.image && actionbtnli.image.image_type === "image" && msgItem.image.image_src}}\
									 <span class="wid-temp-btnImage"> \
										 <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
									 </span> \
									 {{/if}} \
									 </i>${actionbtnli.title}</li>\
								 {{/each}}\
							   </ul>\
					   </div>\
					   {{/if}}\
					 </div>\
				   {{if msgItem.details && msgItem.details.length}} \
				   <div role="contentinfo" class="tabListViewDiscription">\
					 {{each(key, content) msgItem.details}} \
					   {{if key < 3 }}\
						  <div class="wid-temp-contentDiv" role="complementary">\
							{{if content.image && content.image.image_type === "image" && content.image.image_src}} \
							   <span class="wid-temp-discImage"> \
								   <img aria-hidden="true" alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
							   </span> \
							{{/if}} \
							{{if content.description}} \
							  <span class="wid-temp-discription">${content.description}</span>\
							{{/if}} \
							{{if ((key===2) || ((msgItem.details.length < 3) && (key===msgItem.details.length-1))) && (msgItem.buttons && msgItem.buttons.length)}} \
							<span class="wid-temp-showActions" aria-live="polite" role="button" tabindex="1" aria-label="Show buttons icon">\
							 </span>\
							{{/if}} \
						  </div>\
					   {{/if}}\
					 {{/each}}\
					 {{if msgItem.details.length > 3}}\
					 <span class="wid-temp-showMore" id="showMoreContents">Show more <span class="show-more"></span></span>\
					 {{/if}}\
				   </div>\
				   <div class="wid-temp-showMoreBottom hide">\
					 <div class="showMoreContainer">\
					   <div class="headerTitleMore">MORE<span class="wid-temp-showMoreClose"><img aria-hidden="true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAANlJREFUKBWdkkEKwjAQRWdSqBfwHDmEPYTgBVwXvIWCO8GlG6GHaA/hObxAC3Xan5AmrUkFZ1OY+S//Txo+3x6a6HPlbLM/HQ9vWqnL/bmVvq2IVKkAidBO+q7GIMVZqKuhBaPgxMwvEdEp2EOioTUMHL4HeeFip2bsosUEmCEF0lgnf+AEQrSEDRiB0J+BaISwEZidvBN6qPFW/6uZY+iGnXBkbD/0J3AJcZYXBly7nBj083esQXBExTQKby+1h8WI4I7o/oW11XirqmSmBgMXzwHh18PUgBkAXhfn47Oroz4AAAAASUVORK5CYII=" class="closeCross"></span></div>\
					   <div class="moreItemsScroll">\
						 {{each(key, content) msgItem.details}} \
							 <div class="wid-temp-contentDiv">\
							   {{if content.image && content.image.image_type === "image" && content.image.image_src}}\
									 <span class="wid-temp-discImage"> \
										 <img aria-hidden="true" alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
									 </span> \
							   {{/if}} \
							   {{if content.description}} \
								   <span class="wid-temp-discription">${content.description}</span>\
							   {{/if}} \
							 </div>\
						   {{/each}}\
						 </div>\
					 </div>\
				   </div>\
				   {{/if}}\
				   {{if (msgItem.buttons && msgItem.buttons.length)}} \
				   <div aria-live="polite" role="region" class="meetingActionButtons {{if ((msgItem.buttonsLayout && msgItem.buttonsLayout.style==="float"))}}float{{else}}fix{{/if}} {{if ((msgItem.details && msgItem.details.length))}}hide{{/if}}">\
					   {{each(key, actionbtn) msgItem.buttons}}\
							   {{if (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && msgItem.buttonsLayout.displayLimit.count && (key < msgItem.buttonsLayout.displayLimit.count)) || (!msgItem.buttonsLayout && key < 2) || (msgItem.buttonsLayout && !msgItem.buttonsLayout.displayLimit && key < 2) || (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && !msgItem.buttonsLayout.displayLimit.count && key < 2)}}\
								 {{if actionbtn.title}}\
								   <div role="listitem" tabindex="0" class="actionBtns action" actionObj="${JSON.stringify(actionbtn)}">\
								   <i>\
								   {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
								   <span class="wid-temp-btnImage"> \
									   <img aria-hidden="true" alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
								   </span> \
								   {{/if}} \
								   </i><span role="button">${actionbtn.title}</span></div>\
								 {{/if}}\
							   {{/if}}\
					   {{/each}}\
					   {{if (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && msgItem.buttonsLayout.displayLimit.count && (msgItem.buttons.length > msgItem.buttonsLayout.displayLimit.count)) || (!msgItem.buttonsLayout && msgItem.buttons.length > 2) || (msgItem.buttonsLayout && !msgItem.buttonsLayout.displayLimit && msgItem.buttons.length > 2) || (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && !msgItem.buttonsLayout.displayLimit.count && msgItem.buttons.length > 2)}}\
					   {{if (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && msgItem.buttonsLayout.displayLimit.count && (msgItem.buttons.length > msgItem.buttonsLayout.displayLimit.count)) || (!msgItem.buttonsLayout && msgItem.buttons.length > 3) || (msgItem.buttonsLayout && !msgItem.buttonsLayout.displayLimit && msgItem.buttons.length > 3) || (msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && !msgItem.buttonsLayout.displayLimit.count && msgItem.buttons.length > 3)}}\
						 <div class="dropbtnWidgt actionBtns" style="margin:0;margin-top: 0px;top: unset;">... More</div>\
						 <ul  class="dropdown-contentWidgt" style="list-style:none;">\
						   {{each(key, actionbtn) msgItem.buttons}} \
							{{if key >= 2}}\
								   <li role="button" tabindex="0" title="${actionbtn.title}" class="dropdown-item action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}">\
								   <i>\
								   {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
								   <span class="wid-temp-btnImage"> \
									   <img aria-hidden="true" alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
								   </span> \
								   {{/if}} \
								   </i>${actionbtn.title}</li>\
							{{/if}}\
						   {{/each}}\
						 </ul>\
					   {{/if}}\
					   {{if ((msgItem.buttonsLayout && msgItem.buttonsLayout.displayLimit && !msgItem.buttonsLayout.displayLimit.count) || (!msgItem.buttonsLayout) ) && msgItem.buttons.length === 3}}\
					   {{each(key, actionbtn) msgItem.buttons}}\
						{{if key === 2 }}\
						 {{if actionbtn.title}}\
						   <div role="button" tabindex="0" class="actionBtns action" actionObj="${JSON.stringify(actionbtn)}">\
						   <i>\
						   {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
						   <span class="wid-temp-btnImage"> \
							   <img aria-hidden="true" alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
						   </span> \
						   {{/if}} \
						   </i>${actionbtn.title}</div>\
						 {{/if}}\
						  {{/if}}\
						{{/each}}\
					   {{/if}}\
					 {{/if}}\
				   </div>\
				   {{/if}}\
				 </li> \
				 {{/if}}\
				{{/each}} \
			   </ul> \
	   <div style="clear:both"></div>\
	   {{if dataItems && dataItems.length > 3 && viewmore}} \
		   <div class="listViewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')"><span class="seeMoreText">See more <span class="see-more"></span></span></div>\
	   {{/if}}\
	   {{if dataItems && dataItems.length === 0}}\
		   <div class="noContent">\
			   <img aria-hidden="true" class="img img-fluid" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzEiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCAxNzEgNjMiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBmaWxsPSIjRTVFOEVDIj4KICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjEzMSIgaGVpZ2h0PSIxMiIgeD0iMzkiIHk9IjUiIHJ4PSIyIi8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjIiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgZmlsbD0iI0U1RThFQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA0MSkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMTMxIiBoZWlnaHQ9IjEyIiB4PSIzOSIgeT0iNSIgcng9IjIiLz4KICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMiIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBzdHJva2U9IiNFNUU4RUMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS13aWR0aD0iLjciIGQ9Ik0uNSAzMS41aDE3MCIvPgogICAgPC9nPgo8L3N2Zz4K" width="118px" height="118px" style="margin-top:15px;">\
			   <div class="col-12 rmpmW nodataTxt">No Data</div>\
		   </div>\
	   {{/if}}\
			 </div>\
		  {{/if}}\
		 </div>\
     </div>\
		</div>\
	</li>\
	{{/if}} \
	</script>';
		/*custom table template 
		var elements = [
			{id: "1", name: "Peter", designation: "Producer", salary: 1000},
			 {id: "2", name: "Sam", designation: "Director", salary: 2000},
			 {id: "3", name: "Nick", designation: "DoP", salary: 1500},
			  {id: "4", name: "Peter", designation: "Producer", salary: 1000},
			  {id: "5", name: "Sam", designation: "Director", salary: 2000},
			   {id: "6", name: "Nick", designation: "DoP", salary: 1500}
			 ];
			  var message = {
				  "type": "template",
				  "payload": {
					  "template_type": "custom_table",
					  "text": "Account details",
					  "columns": [ ["Sl", "center"], ["Name"], ["Designation"], ["Salary", "right"] ],
					   "table_design": "regular",
						speech_hint: "Here is your account details",
						elements: []
					}
				};
				var ele = [];
				 for (var i = 0; i < elements.length; i++) {
					  var elementArr = [
						  [elements[i].id,"text"],
						  [elements[i].name,"text"],
						   [elements[i].designation,"button",{"type":"web_url","title":"click","url":"https://www.google.com"}],
							[elements[i].salary,"button",{"type":"postback","title":"click","payload":"id1"}]];
							 ele.push({'Values': elementArr});
					}
					   message.payload.elements = ele;
						print(JSON.stringify(message));
		*/
	var customTableTemplate='<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
	<li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
		class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
		{{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		{{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
		{{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
			<span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
		</div>{{/if}}\
		<div class="tablechartDiv {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}regular{{else}}hide{{/if}}">\
			<div style="overflow-x:auto; padding: 0 8px;">\
				<table cellspacing="0" cellpadding="0">\
					<tr class="headerTitle">\
						{{each(key, tableHeader) msgData.message[0].component.payload.columns}} \
							<th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};"{{/if}}>${tableHeader[0]}</th>\
						{{/each}} \
					</tr>\
					{{each(key, tableRow) msgData.message[0].component.payload.elements}} \
						{{if tableRow.Values.length>1}}\
							<tr {{if key > 4}}class="hide"{{/if}}>\
								{{each(cellkey, cellValue) tableRow.Values}} \
									<td {{if cellValue[1] == "button"}}class="clickableButton {{if cellValue[2].type == "web_url"}}clickableLink{{/if}}" type="${cellValue[2].type}" {{if cellValue[2].type == "web_url"}}url="${cellValue[2].url}"{{/if}} payload="${cellValue[2].payload}"{{/if}} {{if cellkey === tableRow.Values.length-1}}colspan="2"{{/if}} id=" {{if key == 0}} addTopBorder {{/if}}" {{if msgData.message[0].component.payload.columns[cellkey][1]}}style="text-align:${msgData.message[0].component.payload.columns[cellkey][1]};" {{/if}} title="${cellValue[0]}">${cellValue[0]}</td>\
								{{/each}} \
							</tr>\
						{{/if}}\
					{{/each}} \
				</table>\
			</div>\
			{{if msgData.message[0].component.payload.elements.length > 5 && msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}<div class="showMore">Show more</div>{{/if}}\
		</div>\
		 <div class="accordionTable {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}hide{{else}}responsive{{/if}}">\
			{{each(key, tableRow) msgData.message[0].component.payload.elements}} \
				{{if key < 4}}\
					<div class="accordionRow">\
						{{each(cellkey, cellValue) tableRow.Values}} \
							{{if cellkey < 2}}\
								<div class="accordionCol">\
									<div class="colTitle hideSdkEle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
									<div class="colVal">${cellValue} - edited</div>\
								</div>\
							{{else}}\
								<div class="accordionCol hideSdkEle">\
									<div class="colTitle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
									<div class="colVal">${cellValue}</div>\
								</div>\
							{{/if}}\
						{{/each}} \
						<span class="fa fa-caret-right tableBtn"></span>\
					</div>\
				{{/if}}\
			{{/each}} \
			<div class="showMore">Show more</div>\
		</div>\
	</li> \
{{/if}} \
</scipt>';
var advancedListTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
	{{if msgData.message}} \
	<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
	<div class="advanced-list-wrapper {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}img-with-title with-accordion if-multiple-accordions-list{{/if}}{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType ==="button"}}if-multiple-tags{{/if}} {{if msgData.message[0].component.payload.fromHistory}}fromHistory{{/if}}">\
	{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
	{{if msgData && msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
	{{if msgData && msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
	{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.openPreviewModal && msgData.message[0].component.payload.seeMoreAction === "modal"}}\
		<div class="preview-modal-header">\
			<div class="preview-modal-title">{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.previewModalTitle}}${msgData.message[0].component.payload.previewModalTitle}{{else}}Upcoming meetings{{/if}}</div>\
			<button class="advancedlist-template-close" title="Close"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMiAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS43NjU5IDEuNjUwNTlDMTEuOTkgMS4zNzg2OCAxMS45NjE2IDAuOTYxNTk0IDExLjY5MDMgMC42OTAzMjdDMTEuNDAzMSAwLjQwMzEwMyAxMC45NTI0IDAuMzg4MTI1IDEwLjY4MzcgMC42NTY4NzJMNiA1LjM0MDUyTDEuMzE2MzUgMC42NTY4NzJMMS4yNjk5MyAwLjYxNDcwNkMwLjk5ODAyOCAwLjM5MDYyOSAwLjU4MDk0IDAuNDE5MDYgMC4zMDk2NzMgMC42OTAzMjdDMC4wMjI0NDg4IDAuOTc3NTUxIDAuMDA3NDcwNTcgMS40MjgyNiAwLjI3NjIxOCAxLjY5N0w0Ljk1OTg3IDYuMzgwNjVMMC4zNDMxNjQgMTAuOTk3NEwwLjMwMDk5OCAxMS4wNDM4QzAuMDc2OTIwNyAxMS4zMTU3IDAuMTA1MzUxIDExLjczMjggMC4zNzY2MTkgMTIuMDA0QzAuNjYzODQzIDEyLjI5MTMgMS4xMTQ1NSAxMi4zMDYyIDEuMzgzMyAxMi4wMzc1TDYgNy40MjA3OUwxMC42MTY3IDEyLjAzNzVMMTAuNjYzMSAxMi4wNzk3QzEwLjkzNSAxMi4zMDM3IDExLjM1MjEgMTIuMjc1MyAxMS42MjM0IDEyLjAwNEMxMS45MTA2IDExLjcxNjggMTEuOTI1NiAxMS4yNjYxIDExLjY1NjggMTAuOTk3NEw3LjA0MDEzIDYuMzgwNjVMMTEuNzIzOCAxLjY5N0wxMS43NjU5IDEuNjUwNTlaIiBmaWxsPSIjMjAyMTI0Ii8+Cjwvc3ZnPgo="></button>\
		</div>\
	{{/if}}\
	{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}\
		<div class="main-title-text-block">\
			<div class="title-main {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && !msgData.message[0].component.payload.isSortEnabled && !msgData.message[0].component.payload.isSearchEnabled && !msgData.message[0].component.payload.isButtonAvailable}}w-100{{/if}}">\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.title}}\
					<div class="title-main {{if msgData.message[0].component.payload.description}}main-title{{/if}} {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && !msgData.message[0].component.payload.isSortEnabled && !msgData.message[0].component.payload.isSearchEnabled && !msgData.message[0].component.payload.isButtonAvailable}}w-100{{/if}}">${msgData.message[0].component.payload.title}</div>\
				{{/if}}\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.description}}\
					<div class="desc-title">${msgData.message[0].component.payload.description}</div>\
				{{/if}}\
			</div>\
			<div class="filter-sort-block">\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.isFilterEnabled && msgData.message[0].component.payload.filterOptions && msgData.message[0].component.payload.filterOptions.length}}\
						<div class="filter-icon">\
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA7SURBVHgB1c+hEQAgDEPRZJMa9oLJYDHuuknAYLgKkP0qF/doViqojp+khjzxjCfrtrnPgVzxPkJrYFtkCRTHyEG/TwAAAABJRU5ErkJggg==">\
							<ul  class="more-button-info hide" style="list-style:none;">\
								<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
									{{each(filterOptionKey, filterOption) msgData.message[0].component.payload.filterOptions}} \
											<li><button class="button_" {{if filterOption && filterOption.type}}type="${filterOption.type}"{{/if}} value="${filterOption.payload}">{{if filterOption && filterOption.icon}}<img src="${filterOption.icon}">{{/if}} {{html helpers.convertMDtoHTML(filterOption.title, "bot")}}</button></li>\
									{{/each}}\
							</ul>\
						</div>\
				{{/if}}\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.isSortEnabled}}\
						<div class="sort-icon">\
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADQSURBVHgBtVLLDcIwDH1B5d4RohbuHaHdACZoNwEmgA0YAZigK5QzH5kNyr3UuB9KKCISSLyDHb/4xdJzAAPa89faG83Qg67hT0zOaS9cKGcDRiClK2LQ+bh4tg1DgGM5bDthK0rBvJf6AiiSpuRd/IpBHRk7olPSUEzgW4QSV1jgEFEueW6SwpGklU04wI/4j1DrcfCJs09UvKx224l8PxYurbbqWIVcTMW/FKoM5RUtTmuwiirzehNVJiF/VLXjXERQFd+sieiQ4RvUH8XAHSO4SlLHWJY+AAAAAElFTkSuQmCC">\
						</div>\
				{{/if}}\
			</div>\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.isSearchEnabled}}\
				<div class="search-block">\
					<img class="search_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEtSURBVHgBlVJNTsJgFJxX6lYb40J3HwHX9gh6AvUEwglMVy7hBuIJwCN4AmDpirq2wDtClyZWPqf0hwqWhEmavm++N33zJhVUYIzxALcDR65grYFFSPpNNZpgC42N6NKHyBiQcwqmfL8D9gKCJ+/0zPdOjqdxHH8V/ZJPMhB3ximB6ny05cLAcZ/TWhfRPf5etobGtPuoQbqCabaW7LkuOGe9l0gHSEZ1QlWNYeWVuz+UQuDI0LGmwF7YECsGthF+xyQ9HAinmFT1X4NbDvgoDm7mAi/Mt8dq8p8iS5052KRZcFJeNtsznhSrJKjuy8TvKBqyDHUZ3ewI86YBmx7TJj7cHT7tMFEE5HsQG+pi3t0R5rbS344CMesp+hmWvLjj3FVXcACyjzYGwE//F5fNZ2bVtWT6AAAAAElFTkSuQmCC">\
					<input type="text" class="input_text hide"  placeholder="Search">\
					<img class="close_icon hide"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACuSURBVHgBnZLBDcMgDEWdsoBLF6AVvXeEbla6Ta7doJmgC/SQY08pGxAHJZGVGIiChLCNH/4yBqBlzPUGG9eUq6JRhQ9qDf7fNVnoYh901Iinl/K++yHqigIuB0cogKP9bNtvzSRYZ842jK+uoHhHObIUAU5Bijsk+81l41HfmTy5mlg5I+8AcjSIdkpqrMa6R24DhW7P0FJerttJqAgX/0mCh5ErQSt4mu09Q94DEcdaRcYvY1cAAAAASUVORK5CYII=">\
				</div>\
			{{else msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.isButtonAvailable}}\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.headerOptions && msgData.message[0].component.payload.headerOptions.length}}\
					{{each(headerOptionKey,headerOption) msgData.message[0].component.payload.headerOptions}}\
					{{if headerOption && headerOption.type === "button"}}\
							<div class="if-button-mode">\
								<button class="button-">${headerOption.label}</button>\
							</div>\
						{{/if}}\
					{{/each}}\
				{{/if}}\
			{{/if}}\
		</div>\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.tableHeading}}\
		<div class="small-title-sec">\
			<div class="left-title">${msgData.message[0].component.payload.tableHeading.rightLabel}</div>\
			<div class="right-title">${msgData.message[0].component.payload.tableHeading.leftLabel}</div>\
		</div>\
		{{/if}}\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType == "nav" && msgData.message[0].component.payload.navHeaders && msgData.message[0].component.payload.navHeaders.length}}\
			<div class="callendar-tabs">\
				{{each(i,navheader) msgData.message[0].component.payload.navHeaders}}\
					<div class="month-tab {{if i==0}}active-month{{/if}}" id="${navheader.id}">${navheader.title}</div>\
				{{/each}}\
			</div>\
		{{/if}}\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listItems && msgData.message[0].component.payload.listItems.length}} \
			{{each(key, listItem) msgData.message[0].component.payload.listItems}} \
			   {{if  (msgData.message[0].component.payload.listItemDisplayCount &&  msgData.message[0].component.payload.listItemDisplayCount > key && (((!msgData.message[0].component.payload.seeMoreAction )||(msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "slider") || (msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "modal"))) || (!msgData.message[0].component.payload.listItemDisplayCount) || (msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction &&  msgData.message[0].component.payload.seeMoreAction === "inline")) }}\
					<div class="multiple-accor-rows {{if msgData.message[0].component.payload.listItemDisplayCount &&  msgData.message[0].component.payload.listItemDisplayCount < key && msgData.message[0].component.payload.seeMoreAction === "inline"}}hide inline{{/if}} {{if listItem && listItem.type && listItem.type=== "view"}}if-template-view-type{{/if}}" id="{{if listItem && listItem.navId}}${listItem.navId}{{/if}}" type="${listItem.type}" actionObj="${JSON.stringify(listItem)}" {{if listItem.elementStyles}}style="{{each(styleKey,listItemStyle) listItem.elementStyles}}${styleKey}:${listItemStyle};{{/each}}"{{/if}}>\
						<div class="accor-header-top">\
							{{if listItem && listItem.icon || listItem.iconText}}\
								<div class="img-block {{if listItem.iconShape}}${listItem.iconShape}{{/if}} {{if listItem.imageSize}}${listItem.imageSize}{{/if}}">\
									{{if listItem && listItem.icon}}\
										<img src="${listItem.icon}">\
									{{else listItem && listItem.iconText}}\
										<div class="icon-text" {{if listItem.iconStyles}}style="{{each(iconStyleKey,style) listItem.iconStyles}}${iconStyleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.iconText, "bot")}}</div>\
									{{/if}}\
								</div>\
							{{/if}}\
							<div class="content-block {{if !listItem.icon && !listItem.iconText}}pd-0{{/if}} {{if listItem && !listItem.headerOptions}}w-100{{/if}}">\
								{{if listItem && listItem.title}}\
									<div class="title-text" {{if listItem && listItem.titleStyles}}style="{{each(styleKey,style) listItem.titleStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.title, "bot")}}</div>\
								{{/if}}\
								{{if listItem && listItem.description}}\
									<div class="title-desc {{if listItem && listItem.descriptionIcon}}desciptionIcon{{/if}} {{if listItem && listItem.descriptionIconAlignment && (listItem.descriptionIconAlignment==="right")}}if-icon-right{{else listItem && (listItem.descriptionIconAlignment && (listItem.descriptionIconAlignment==="left")) || !listItem.descriptionIconAlignment}}if-icon-left{{/if}}" {{if listItem && listItem.descriptionStyles}}style="{{each(styleKey,style) listItem.descriptionStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{if listItem && listItem.descriptionIcon}}<span class="desc-icon"><img  src="${listItem.descriptionIcon}"></span>{{/if}}{{html helpers.convertMDtoHTML(listItem.description, "bot")}}</div>\
								{{/if}}\
							</div>\
							{{if listItem && listItem.headerOptions && listItem.headerOptions.length}}\
								{{each(i,headerOption) listItem.headerOptions}}\
										{{if headerOption && headerOption.type == "text"}}\
										<div class="btn_block">\
											<div class="amout-text" {{if headerOption && headerOption.styles}}style="{{each(styleKey,style) headerOption.styles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.value, "bot")}}</div>\
										</div>\
										{{/if}}\
										{{if headerOption && headerOption.type == "icon"}}\
										<div class="action-icon-acc">\
											<img src="${headerOption.icon}">\
										</div>\
										{{/if}}\
										{{if headerOption && headerOption.contenttype == "button"}}\
											<div class="btn_block">\
												{{if headerOption && headerOption.contenttype == "button" && headerOption.isStatus}}\
													<div class="btn_tag shorlisted" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</div>\
												{{/if}}\
												{{if headerOption && headerOption.contenttype == "button" && !headerOption.isStatus}}\
													<button class="button_" type="${headerOption.type}" {{if headerOption.url}}url="${headerOption.url}"{{/if}} value="${headerOption.payload}" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</button>\
												{{/if}}\
											</div>\
										{{/if}}\
										{{if headerOption && headerOption.type == "dropdown"}}\
											<div class="btn_block dropdown">\
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjNweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMyAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4NCiAgICA8dGl0bGU+ZWxsaXBzaXNHcmF5PC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPHBhdGggZD0iTTIuNTcxNDI4NTcsOC4wNzE0Mjg1NyBMMi41NzE0Mjg1Nyw5LjM1NzE0Mjg2IEMyLjU3MTQyODU3LDkuNTM1NzE1MTggMi41MDg5MjkyLDkuNjg3NDk5MzggMi4zODM5Mjg1Nyw5LjgxMjUgQzIuMjU4OTI3OTUsOS45Mzc1MDA2MiAyLjEwNzE0Mzc1LDEwIDEuOTI4NTcxNDMsMTAgTDAuNjQyODU3MTQzLDEwIEMwLjQ2NDI4NDgyMSwxMCAwLjMxMjUwMDYyNSw5LjkzNzUwMDYyIDAuMTg3NSw5LjgxMjUgQzAuMDYyNDk5Mzc1LDkuNjg3NDk5MzggMCw5LjUzNTcxNTE4IDAsOS4zNTcxNDI4NiBMMCw4LjA3MTQyODU3IEMwLDcuODkyODU2MjUgMC4wNjI0OTkzNzUsNy43NDEwNzIwNSAwLjE4NzUsNy42MTYwNzE0MyBDMC4zMTI1MDA2MjUsNy40OTEwNzA4IDAuNDY0Mjg0ODIxLDcuNDI4NTcxNDMgMC42NDI4NTcxNDMsNy40Mjg1NzE0MyBMMS45Mjg1NzE0Myw3LjQyODU3MTQzIEMyLjEwNzE0Mzc1LDcuNDI4NTcxNDMgMi4yNTg5Mjc5NSw3LjQ5MTA3MDggMi4zODM5Mjg1Nyw3LjYxNjA3MTQzIEMyLjUwODkyOTIsNy43NDEwNzIwNSAyLjU3MTQyODU3LDcuODkyODU2MjUgMi41NzE0Mjg1Nyw4LjA3MTQyODU3IFogTTIuNTcxNDI4NTcsNC42NDI4NTcxNCBMMi41NzE0Mjg1Nyw1LjkyODU3MTQzIEMyLjU3MTQyODU3LDYuMTA3MTQzNzUgMi41MDg5MjkyLDYuMjU4OTI3OTUgMi4zODM5Mjg1Nyw2LjM4MzkyODU3IEMyLjI1ODkyNzk1LDYuNTA4OTI5MiAyLjEwNzE0Mzc1LDYuNTcxNDI4NTcgMS45Mjg1NzE0Myw2LjU3MTQyODU3IEwwLjY0Mjg1NzE0Myw2LjU3MTQyODU3IEMwLjQ2NDI4NDgyMSw2LjU3MTQyODU3IDAuMzEyNTAwNjI1LDYuNTA4OTI5MiAwLjE4NzUsNi4zODM5Mjg1NyBDMC4wNjI0OTkzNzUsNi4yNTg5Mjc5NSAwLDYuMTA3MTQzNzUgMCw1LjkyODU3MTQzIEwwLDQuNjQyODU3MTQgQzAsNC40NjQyODQ4MiAwLjA2MjQ5OTM3NSw0LjMxMjUwMDYyIDAuMTg3NSw0LjE4NzUgQzAuMzEyNTAwNjI1LDQuMDYyNDk5MzggMC40NjQyODQ4MjEsNCAwLjY0Mjg1NzE0Myw0IEwxLjkyODU3MTQzLDQgQzIuMTA3MTQzNzUsNCAyLjI1ODkyNzk1LDQuMDYyNDk5MzggMi4zODM5Mjg1Nyw0LjE4NzUgQzIuNTA4OTI5Miw0LjMxMjUwMDYyIDIuNTcxNDI4NTcsNC40NjQyODQ4MiAyLjU3MTQyODU3LDQuNjQyODU3MTQgWiBNMi41NzE0Mjg1NywxLjIxNDI4NTcxIEwyLjU3MTQyODU3LDIuNSBDMi41NzE0Mjg1NywyLjY3ODU3MjMyIDIuNTA4OTI5MiwyLjgzMDM1NjUyIDIuMzgzOTI4NTcsMi45NTUzNTcxNCBDMi4yNTg5Mjc5NSwzLjA4MDM1Nzc3IDIuMTA3MTQzNzUsMy4xNDI4NTcxNCAxLjkyODU3MTQzLDMuMTQyODU3MTQgTDAuNjQyODU3MTQzLDMuMTQyODU3MTQgQzAuNDY0Mjg0ODIxLDMuMTQyODU3MTQgMC4zMTI1MDA2MjUsMy4wODAzNTc3NyAwLjE4NzUsMi45NTUzNTcxNCBDMC4wNjI0OTkzNzUsMi44MzAzNTY1MiAwLDIuNjc4NTcyMzIgMCwyLjUgTDAsMS4yMTQyODU3MSBDMCwxLjAzNTcxMzM5IDAuMDYyNDk5Mzc1LDAuODgzOTI5MTk2IDAuMTg3NSwwLjc1ODkyODU3MSBDMC4zMTI1MDA2MjUsMC42MzM5Mjc5NDYgMC40NjQyODQ4MjEsMC41NzE0Mjg1NzEgMC42NDI4NTcxNDMsMC41NzE0Mjg1NzEgTDEuOTI4NTcxNDMsMC41NzE0Mjg1NzEgQzIuMTA3MTQzNzUsMC41NzE0Mjg1NzEgMi4yNTg5Mjc5NSwwLjYzMzkyNzk0NiAyLjM4MzkyODU3LDAuNzU4OTI4NTcxIEMyLjUwODkyOTIsMC44ODM5MjkxOTYgMi41NzE0Mjg1NywxLjAzNTcxMzM5IDIuNTcxNDI4NTcsMS4yMTQyODU3MSBaIiBpZD0iZWxsaXBzaXNHcmF5IiBmaWxsPSIjOEE5NTlGIj48L3BhdGg+DQogICAgPC9nPg0KPC9zdmc+">\
												{{if dropdownOptions && dropdownOptions.length}}\
												<ul  class="more-button-info hide" style="list-style:none;">\
												<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
													{{each(optionKeykey, option) headerOption.dropdownOptions}} \
															<li><button class="button_" {{if option && option.type}}type="${option.type}"{{/if}} {{if option.url}}url="${option.url}"{{/if}} value="${option.payload}">{{if option && option.icon}}<img src="${option.icon}">{{/if}} {{html helpers.convertMDtoHTML(option.title, "bot")}}</button></li>\
													{{/each}}\
												</ul>\
												{{/if}}\
											</div>\
										{{/if}}\
								{{/each}}\
							{{/if}}\
						</div>\
						<div class="accor-inner-content" {{if listItem && listItem.isCollapsed}}style="display:block;"{{/if}}>\
							{{if listItem && listItem.view == "default" && listItem.textInformation && listItem.textInformation.length}}\
							{{each(i,textInfo) listItem.textInformation}}\
								<div class="details-content {{if textInfo && textInfo.iconAlignment && (textInfo.iconAlignment==="right")}}if-icon-right{{else textInfo && (textInfo.iconAlignment && (textInfo.iconAlignment==="left")) || !textInfo.iconAlignment}}if-icon-left{{/if}}">\
									{{if textInfo && textInfo.icon}}\
									<span class="icon-img">\
										<img src="${textInfo.icon}">\
									</span>\
									{{/if}}\
									{{if textInfo && textInfo.title}}\
										<span class="text-info" {{if textInfo && textInfo.styles}}style="{{each(styleKey,style) textInfo.styles}}${styleKey}:${style};{{/each}}"{{/if}} {{if textInfo && textInfo.type}}type="${textInfo.type}"{{/if}} {{if textInfo && textInfo.url}}url="${textInfo.url}"{{/if}}>{{html helpers.convertMDtoHTML(textInfo.title, "bot")}}</span>\
									{{/if}}\
								</div>\
							{{/each}}\
							{{if listItem && listItem.buttonHeader}}\
							   <div class="button-header"><div class="button-header-title">{{html helpers.convertMDtoHTML(listItem.buttonHeader, "bot")}}</div></div>\
							{{/if}}\
							{{if listItem && listItem.buttons && listItem.buttons.length}}\
								<div class="inner-btns-acc {{if listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "center"}}if-btn-position-center{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "left")}}if-btn-position-left{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "right")}}if-btn-position-right{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "fullwidth")}}if-full-width-btn"{{/if}}">\
								  {{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "slider") || (listItem && !listItem.seeMoreAction)}}\
										{{each(i,button) listItem.buttons}}\
											{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3)}}\
												<button class="button_" type="${button.type}" title="${button.title}" value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
											{{/if}}\
										{{/each}}\
									{{else (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "inline")}}\
										{{each(i,button) listItem.buttons}}\
												<button class="button_ {{if !((listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3))}} hide {{/if}}" type="${button.type}" title="${button.title}" value="${button.payload}"><img src="${button.icon}">${button.title}</button>\
										{{/each}}\
									{{/if}}\
										{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && listItem.buttonsLayout.displayLimit.count < listItem.buttons.length) || (listItem && !listItem.buttonsLayout && listItem.buttons.length > 3)}}\
												<button class=" more-btn" actionObj="${JSON.stringify(listItem)}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAADCAYAAABI4YUMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgBNYyxDcJQDET/OREwBhukA0pG+COwQaCnSCR6+BswAqwBTeYB4eOcKJbss89+xnLbtyl5dsfp++6GpFhszhmoWvJXPq/LI7zVrluTvCqHWsAtTDM/SI7RByDZS2McIdK1g54h1yq9OxszG+HpAAVgqgxl9tztbsZG7fMPUTQuCUr8UX4AAAAASUVORK5CYII=">More</button>\
												{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && !listItem.seeMoreAction)}}\
													<ul  class="more-button-info" style="list-style:none;">\
													<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
														{{each(key, button) listItem.buttons}} \
															{{if key >= 2}}\
																<li><button class="button_" type="${button.type}" value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button></li>\
															{{/if}}\
														{{/each}}\
													</ul>\
												{{/if}}\
										{{/if}}\
								</div>\
							{{/if}}\
							{{/if}}\
							{{if listItem && (listItem.view == "table") && listItem.tableListData}}\
							    {{if listItem.tableListData}}\
									<div class="inner-acc-table-sec">\
										{{each(i,list) listItem.tableListData}}\
										  {{if list.rowData && list.rowData.length}}\
											<div class="table-sec {{if listItem.type && listItem.type == "column"}}if-label-table-columns{{/if}}">\
												{{each(key,row) list.rowData}}\
													{{if ((list.rowData.length > 6) && (key < 6)) || (list.rowData.length === 6)}}\
														{{if !row.icon}}\
															<div class="column-table">\
																<div class="header-name">{{html helpers.convertMDtoHTML(row.title, "bot")}}</div>\
																<div class="title-name">{{html helpers.convertMDtoHTML(row.description, "bot")}}</div>\
															</div>\
															{{else}}\
																<div class="column-table">\
																	<div class="labeld-img-block {{if row.iconSize}}${row.iconSize}{{/if}}">\
																		<img src="${row.icon}">\
																	</div>\
																	<div class="label-content">\
																		<div class="header-name">{{html helpers.convertMDtoHTML(row.title, "bot")}}</div>\
																		<div class="title-name">{{html helpers.convertMDtoHTML(row.description, "bot")}}</div>\
																	</div>\
																</div>\
															{{/if}}\
														{{/if}}\
												{{/each}}\
												{{if (list.rowData.length > 6)}}\
														<div class="column-table-more">\
															<div class="title-name"><span>More <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="></div>\
														</div>\
												 {{/if}}\
											</div>\
											{{/if}}\
										{{/each}}\
									</div>\
								{{/if}}\
							{{/if}}\
							{{if listItem && listItem.view == "options" && listItem.optionsData && listItem.optionsData.length}}\
							{{each(i,option) listItem.optionsData}}\
								{{if option && option.type == "radio"}}\
									<div class="kr_sg_radiobutton option">\
										<input id="${key+""+i}" name="radio" class="radio-custom option-input" value="${option.value}" text = "${option.label}" type="radio">\
										<label for="${key+""+i}" class="radio-custom-label">{{html helpers.convertMDtoHTML(option.label, "bot")}}</label>\
									</div>\
								{{/if}}\
								{{if option && option.type == "checkbox"}}\
								<div class="kr_sg_checkbox option">\
									<input id="${key+""+i}" class="checkbox-custom option-input" text = "${option.label}" value="${option.value}" type="checkbox">\
									<label for="${key+""+i}" class="checkbox-custom-label">{{html helpers.convertMDtoHTML(option.label, "bot")}}</label>\
									</div>\
								{{/if}}\
							{{/each}}\
							{{if listItem && listItem.buttons && listItem.buttons.length}}\
									<div class="btn_group {{if listItem.buttonAligment && listItem.buttonAligment == "center"}}if-btn-position-center{{else (listItem.buttonAligment && listItem.buttonAligment == "left")}}if-btn-position-left{{else (listItem.buttonAligment && listItem.buttonAligment == "right")}}if-btn-position-right{{else (listItem.buttonAligment && listItem.buttonAligment == "fullWidth")}}if-full-width-btn"{{/if}}">\
										{{each(i,button) listItem.buttons}}\
											<button class="{{if button && button.btnType =="confirm"}}submitBtn p-button{{else button && button.btnType=="cancel"}}cancelBtn s-button{{/if}}" title="${button.title}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
										{{/each}}\
									</div>\
							{{/if}}\
							{{/if}}\
						</div>\
					</div>\
				{{/if}}\
			{{/each}}\
			{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount) || (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount)}}\
				<div class="see-more-data">\
				    {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (!msgData.message[0].component.payload.seeMoreVisibity || (msgData.message[0].component.payload.seeMoreVisibity && msgData.message[0].component.payload.seeMoreVisibity === "link"))}}\
						<span>{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} ${msgData.message[0].component.payload.seeMoreTitle} {{else}}See more{{/if}} <img {{if msgData.message[0].component.payload.seeMoreIcon}} src="${msgData.message[0].component.payload.seeMoreIcon}" {{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></span>\
					{{else msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.seeMoreVisibity  && msgData.message[0].component.payload.seeMoreVisibity === "button")}}\
							<button class="button_seemore" >{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreIcon)}}<img src="${msgData.message[0].component.payload.seeMoreIcon}">{{/if}}{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} ${msgData.message[0].component.payload.seeMoreTitle} {{else}}See more{{/if}}</button>\
					{{/if}}\
				</div>\
			{{/if}}\
		{{/if}}\
	{{/if}}\
	{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType ==="button"}}\
		<div class="content-sec">\
			<div class="left-sec">\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.title}}\
					<div class="main-title">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot")}}</div>\
				{{/if}}\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.description}}\
					<div class="desc-title">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.description, "bot")}}</div>\
				{{/if}}\
			</div>\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.headerOptions}}\
			<div class="right-sec">\
				{{each(i,headerOption) msgData.message[0].component.payload.headerOptions}}\
					{{if (headerOption.type == "button") || (headerOption.contenttype == "button")}}\
						<button class="button-">{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</button>\
					{{/if}}\
				{{/each}}\
			</div>\
			{{/if}}\
		</div>\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType ==="button" && msgData.message[0].component.payload.listItems && msgData.message[0].component.payload.listItems.length}}\
			<div class="tags-data">\
				{{each(i,listItem) msgData.message[0].component.payload.listItems}}\
				   {{if (msgData.message[0].component.payload.listItemDisplayCount && i < msgData.message[0].component.payload.listItemDisplayCount && ((msgData.message[0].component.payload.seeMoreAction === "slider") || (msgData.message[0].component.payload.seeMoreAction === "modal"))) || !msgData.message[0].component.payload.listItemDisplayCount || (msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction === "inline")}}\
						<div class="tag-name {{if msgData.message[0].component.payload.listItemDisplayCount && i > msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction === "inline"}}hide inline{{/if}}" type="${listItem.type}" value="${listItem.payload}">${listItem.title}</div>\
					{{/if}}\
				{{/each}}\
				{{if (msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount) || (msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount)}}\
					<div class="more-tags see-more-data">${msgData.message[0].component.payload.listItems.length - msgData.message[0].component.payload.listItemDisplayCount}{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} ${msgData.message[0].component.payload.seeMoreTitle} {{else}}More{{/if}} <img {{if msgData.message[0].component.payload.seeMoreIcon}} src="${msgData.message[0].component.payload.seeMoreIcon}" {{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></div>\
				{{/if}}\
			</div>\
		{{/if}}\
	{{/if}}\
	</div>\
</li>\
	{{/if}}\
	</scipt>';

	var cardTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
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
	var proposeTimesTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl">\
	{{if msgData.message}}\
		<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		   <div class="propose-template">\
		   {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		   {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
		   {{if msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.title}}<div class="propose-times-title"> {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot")}}</div>{{/if}}\
			{{if msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.elements && msgData.message[0].component.payload.elements.length}}\
				<div class="propse-times-elements">\
					{{each(key,element) msgData.message[0].component.payload.elements}}\
						<div class="element" type="${element.type}" value="${element.payload}">\
						{{html helpers.convertMDtoHTML(element.title, "bot")}}\
						</div>\
					{{/each}}\
				</div>\
			{{/if}}\
			{{if  msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length}}\
				<div class="action-buttons">\
					{{each(key,button) msgData.message[0].component.payload.buttons}}\
						<div class="propoese-element-button {{if button.class}}${button.class}{{/if}}" type="${button.type}" value="${button.payload}">\
						{{html helpers.convertMDtoHTML(button.title, "bot")}}\
						</div>\
					{{/each}}\
				</div>\
			{{/if}}\
			</div>\
		</li>\
	{{/if}}\
	</script>';

	var proposeActionSheetTemplate = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
	<div class="propose-action-sheet-template">\
	    <div class="heading-title">Other Options</div>\
		<button class="close-button" title="Close"><img src="data:image/svg+xml;base64,           PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
		{{if msgData.message && msgData.message[0].component.payload && msgData.message[0].component.payload.moreOptions && msgData.message[0].component.payload.moreOptions.length}}\
			<div class="header-tabs">\
			    {{each(i, nav) msgData.message[0].component.payload.moreOptions}}\
				    <div class="tab-title" id="${nav.id}" actionObj="${JSON.stringify(nav)}">\
					    ${nav.title}\
					</div>\
				{{/each}}\
			</div>\
			<div class="tab-container">\
				{{if data}}\
				   <div class="tab-data id="${data.id}">\
						{{if data && data.description}}\
							${data.description}\
						{{/if}}\
						<div class="tab-content">\
						{{if data && data.elements && data.elements.length}}\
							<div class="tab-elements">\
								{{each(elementKey,element) data.elements}}\
									<div class="kr_sg_checkbox option">\
										<input id="${elementKey}" class="checkbox-custom option-input" text = "${element.title}" value="${element.value}" type="checkbox">\
										<label for="${elementKey}" class="checkbox-custom-label">{{html helpers.convertMDtoHTML(element.title, "bot")}}</label>\
									</div>\
								{{/each}}\
							</div>\
						{{/if}}\
						{{if data && data.buttons && data.buttons.length}}\
								<div class="action-buttons">\
									{{each(buttonKey,button) data.buttons}}\
										<div class="propoese-element-button {{if button.class}}${button.class}{{/if}}" type="${button.type}" title="${button.title}" value="${button.payload}">\
										{{html helpers.convertMDtoHTML(button.title, "bot")}}\
										</div>\
									{{/each}}\
								</div>\
						{{/if}}\
						</div>\
					</div>\
				{{/if}}\
			</div>\
		{{/if}}\
	</div>\
	</script>'

	var default_card_template = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl">\
	{{if msgData.message}}\
		<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		   <div class="default-card-template">\
		   {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		   {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
				<div class="main-title-text-block">\
				 	<div class="title-main">\
						{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.mainTitle}}\
								<div class="title-main">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.mainTitle, "bot")}}</div>\
						{{/if}}\
						{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.description}}\
								<div class="desc-title">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.description, "bot")}}</div>\
						{{/if}}\
					</div>\
				</div>\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.elements && msgData.message[0].component.payload.elements.length}}\
				    <div class="default-card-elements">\
						{{each(i,listItem) msgData.message[0].component.payload.elements}}\
						  <div class="element-content">\
								<div class="element-header">\
									{{if listItem && listItem.icon || listItem.iconText}}\
										<div class="img-block {{if listItem.iconShape}}${listItem.iconShape}{{/if}} {{if listItem.imageSize}}${listItem.imageSize}{{/if}}">\
											{{if listItem && listItem.icon}}\
												<img src="${listItem.icon}">\
											{{else listItem && listItem.iconText}}\
												<div class="icon-text" {{if listItem.iconStyles}}style="{{each(iconStyleKey,style) listItem.iconStyles}}${iconStyleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.iconText, "bot")}}</div>\
											{{/if}}\
										</div>\
									{{/if}}\
									<div class="content-block {{if (listItem && listItem.icon) || (listItem && listItem.iconText) }}pdl-15{{/if}}">\
										{{if listItem.title}}\
											<div class="title-text" {{if listItem && listItem.titleStyles}}style="{{each(styleKey,style) listItem.titleStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.title, "bot")}}</div>\
										{{/if}}\
										{{if listItem.description}}\
											<div class="title-desc" {{if listItem && listItem.descriptionStyles}}style="{{each(styleKey,style) listItem.descriptionStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.description, "bot")}}</div>\
										{{/if}}\
									</div>\
									{{if listItem.headerOptions && listItem.headerOptions.length}}\
									{{each(i,headerOption) listItem.headerOptions}}\
											{{if headerOption && headerOption.type == "text"}}\
												<div class="btn_block">\
													<div class="amout-text" {{if headerOption && headerOption.styles}}style="{{each(styleKey,style) headerOption.styles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.value, "bot")}}</div>\
												</div>\
											{{/if}}\
											{{if headerOption && headerOption.type == "icon"}}\
												<div class="action-icon-acc">\
													<img src="${headerOption.icon}">\
												</div>\
											{{/if}}\
											{{if headerOption && headerOption.contenttype == "button"}}\
												<div class="btn_block">\
													{{if headerOption && headerOption.contenttype == "button" && headerOption.isStatus}}\
														<div class="btn_tag shorlisted" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</div>\
													{{/if}}\
													{{if headerOption && headerOption.contenttype == "button" && !headerOption.isStatus}}\
														<button class="button_" type="${headerOption.type}" value="${headerOption.payload}" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</button>\
													{{/if}}\
												</div>\
											{{/if}}\
											{{if headerOption && headerOption.type == "dropdown"}}\
												<div class="btn_block dropdown">\
													<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjNweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMyAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4NCiAgICA8dGl0bGU+ZWxsaXBzaXNHcmF5PC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPHBhdGggZD0iTTIuNTcxNDI4NTcsOC4wNzE0Mjg1NyBMMi41NzE0Mjg1Nyw5LjM1NzE0Mjg2IEMyLjU3MTQyODU3LDkuNTM1NzE1MTggMi41MDg5MjkyLDkuNjg3NDk5MzggMi4zODM5Mjg1Nyw5LjgxMjUgQzIuMjU4OTI3OTUsOS45Mzc1MDA2MiAyLjEwNzE0Mzc1LDEwIDEuOTI4NTcxNDMsMTAgTDAuNjQyODU3MTQzLDEwIEMwLjQ2NDI4NDgyMSwxMCAwLjMxMjUwMDYyNSw5LjkzNzUwMDYyIDAuMTg3NSw5LjgxMjUgQzAuMDYyNDk5Mzc1LDkuNjg3NDk5MzggMCw5LjUzNTcxNTE4IDAsOS4zNTcxNDI4NiBMMCw4LjA3MTQyODU3IEMwLDcuODkyODU2MjUgMC4wNjI0OTkzNzUsNy43NDEwNzIwNSAwLjE4NzUsNy42MTYwNzE0MyBDMC4zMTI1MDA2MjUsNy40OTEwNzA4IDAuNDY0Mjg0ODIxLDcuNDI4NTcxNDMgMC42NDI4NTcxNDMsNy40Mjg1NzE0MyBMMS45Mjg1NzE0Myw3LjQyODU3MTQzIEMyLjEwNzE0Mzc1LDcuNDI4NTcxNDMgMi4yNTg5Mjc5NSw3LjQ5MTA3MDggMi4zODM5Mjg1Nyw3LjYxNjA3MTQzIEMyLjUwODkyOTIsNy43NDEwNzIwNSAyLjU3MTQyODU3LDcuODkyODU2MjUgMi41NzE0Mjg1Nyw4LjA3MTQyODU3IFogTTIuNTcxNDI4NTcsNC42NDI4NTcxNCBMMi41NzE0Mjg1Nyw1LjkyODU3MTQzIEMyLjU3MTQyODU3LDYuMTA3MTQzNzUgMi41MDg5MjkyLDYuMjU4OTI3OTUgMi4zODM5Mjg1Nyw2LjM4MzkyODU3IEMyLjI1ODkyNzk1LDYuNTA4OTI5MiAyLjEwNzE0Mzc1LDYuNTcxNDI4NTcgMS45Mjg1NzE0Myw2LjU3MTQyODU3IEwwLjY0Mjg1NzE0Myw2LjU3MTQyODU3IEMwLjQ2NDI4NDgyMSw2LjU3MTQyODU3IDAuMzEyNTAwNjI1LDYuNTA4OTI5MiAwLjE4NzUsNi4zODM5Mjg1NyBDMC4wNjI0OTkzNzUsNi4yNTg5Mjc5NSAwLDYuMTA3MTQzNzUgMCw1LjkyODU3MTQzIEwwLDQuNjQyODU3MTQgQzAsNC40NjQyODQ4MiAwLjA2MjQ5OTM3NSw0LjMxMjUwMDYyIDAuMTg3NSw0LjE4NzUgQzAuMzEyNTAwNjI1LDQuMDYyNDk5MzggMC40NjQyODQ4MjEsNCAwLjY0Mjg1NzE0Myw0IEwxLjkyODU3MTQzLDQgQzIuMTA3MTQzNzUsNCAyLjI1ODkyNzk1LDQuMDYyNDk5MzggMi4zODM5Mjg1Nyw0LjE4NzUgQzIuNTA4OTI5Miw0LjMxMjUwMDYyIDIuNTcxNDI4NTcsNC40NjQyODQ4MiAyLjU3MTQyODU3LDQuNjQyODU3MTQgWiBNMi41NzE0Mjg1NywxLjIxNDI4NTcxIEwyLjU3MTQyODU3LDIuNSBDMi41NzE0Mjg1NywyLjY3ODU3MjMyIDIuNTA4OTI5MiwyLjgzMDM1NjUyIDIuMzgzOTI4NTcsMi45NTUzNTcxNCBDMi4yNTg5Mjc5NSwzLjA4MDM1Nzc3IDIuMTA3MTQzNzUsMy4xNDI4NTcxNCAxLjkyODU3MTQzLDMuMTQyODU3MTQgTDAuNjQyODU3MTQzLDMuMTQyODU3MTQgQzAuNDY0Mjg0ODIxLDMuMTQyODU3MTQgMC4zMTI1MDA2MjUsMy4wODAzNTc3NyAwLjE4NzUsMi45NTUzNTcxNCBDMC4wNjI0OTkzNzUsMi44MzAzNTY1MiAwLDIuNjc4NTcyMzIgMCwyLjUgTDAsMS4yMTQyODU3MSBDMCwxLjAzNTcxMzM5IDAuMDYyNDk5Mzc1LDAuODgzOTI5MTk2IDAuMTg3NSwwLjc1ODkyODU3MSBDMC4zMTI1MDA2MjUsMC42MzM5Mjc5NDYgMC40NjQyODQ4MjEsMC41NzE0Mjg1NzEgMC42NDI4NTcxNDMsMC41NzE0Mjg1NzEgTDEuOTI4NTcxNDMsMC41NzE0Mjg1NzEgQzIuMTA3MTQzNzUsMC41NzE0Mjg1NzEgMi4yNTg5Mjc5NSwwLjYzMzkyNzk0NiAyLjM4MzkyODU3LDAuNzU4OTI4NTcxIEMyLjUwODkyOTIsMC44ODM5MjkxOTYgMi41NzE0Mjg1NywxLjAzNTcxMzM5IDIuNTcxNDI4NTcsMS4yMTQyODU3MSBaIiBpZD0iZWxsaXBzaXNHcmF5IiBmaWxsPSIjOEE5NTlGIj48L3BhdGg+DQogICAgPC9nPg0KPC9zdmc+">\
													{{if dropdownOptions && dropdownOptions.length}}\
													<ul  class="more-button-info hide" style="list-style:none;">\
													<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
														{{each(optionKeykey, option) headerOption.dropdownOptions}} \
																<li><button class="button_" {{if option && option.type}}type="${option.type}"{{/if}} value="${option.payload}">{{if option && option.icon}}<img src="${option.icon}">{{/if}} {{html helpers.convertMDtoHTML(option.title, "bot")}}</button></li>\
														{{/each}}\
													</ul>\
													{{/if}}\
												</div>\
											{{/if}}\
									{{/each}}\
									{{/if}}\
								 </div>\
								 <div class="accor-inner-content">\
									{{if listItem && listItem.view == "default" && listItem.textInformation && listItem.textInformation.length}}\
										{{each(i,textInfo) listItem.textInformation}}\
											<div class="details-content {{if textInfo && textInfo.iconAlignment && (textInfo.iconAlignment==="right")}}if-icon-right{{else textInfo && (textInfo.iconAlignment && (textInfo.iconAlignment==="left")) || !textInfo.iconAlignment}}if-icon-left{{/if}}">\
													{{if textInfo && textInfo.icon}}\
													<span class="icon-img">\
														<img src="${textInfo.icon}">\
													</span>\
													{{/if}}\
													{{if textInfo && textInfo.title}}\
														<span class="text-info" {{if textInfo && textInfo.styles}}style="{{each(styleKey,style) textInfo.styles}}${styleKey}:${style};{{/each}}"{{/if}} {{if textInfo && textInfo.type}}type="${textInfo.type}"{{/if}} {{if textInfo && textInfo.url}}url="${textInfo.url}"{{/if}}>{{html helpers.convertMDtoHTML(textInfo.title, "bot")}}</span>\
													{{/if}}\
											</div>\
										{{/each}}\
									{{/if}}\
							{{if listItem && listItem.buttonHeader}}\
							   <div class="button-header"><div class="button-header-title">{{html helpers.convertMDtoHTML(listItem.buttonHeader, "bot")}}</div></div>\
							{{/if}}\
							{{if listItem && listItem.buttons && listItem.buttons.length}}\
								<div class="inner-btns-acc {{if listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "center"}}if-btn-position-center{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "left")}}if-btn-position-left{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "right")}}if-btn-position-right{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "fullwidth")}}if-full-width-btn"{{/if}}">\
								  {{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "slider") || (listItem && !listItem.seeMoreAction)}}\
										{{each(i,button) listItem.buttons}}\
											{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3)}}\
												<button class="button_"  type="${button.type}" title="${button.title}" {{if button && button.buttonStyles }}style="{{each(styleKey,style) button.buttonStyles}}${styleKey} : ${style};{{/each}}"{{/if}} value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
											{{/if}}\
										{{/each}}\
									{{else (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "inline")}}\
										{{each(i,button) listItem.buttons}}\
												<button class="button_ {{if !((listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3))}} hide {{/if}}" type="${button.type}" title="${button.title}" value="${button.payload}" {{if button && button.buttonStyles }}style="{{each(styleKey,style) button.buttonStyles}}${styleKey} : ${style};{{/each}}"{{/if}}><img src="${button.icon}">${button.title}</button>\
										{{/each}}\
									{{/if}}\
										{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && listItem.buttonsLayout.displayLimit.count < listItem.buttons.length) || (listItem && !listItem.buttonsLayout && listItem.buttons.length > 3)}}\
												<button class=" more-btn" actionObj="${JSON.stringify(listItem)}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAADCAYAAABI4YUMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgBNYyxDcJQDET/OREwBhukA0pG+COwQaCnSCR6+BswAqwBTeYB4eOcKJbss89+xnLbtyl5dsfp++6GpFhszhmoWvJXPq/LI7zVrluTvCqHWsAtTDM/SI7RByDZS2McIdK1g54h1yq9OxszG+HpAAVgqgxl9tztbsZG7fMPUTQuCUr8UX4AAAAASUVORK5CYII=">More</button>\
												{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && !listItem.seeMoreAction)}}\
													<ul  class="more-button-info" style="list-style:none;">\
													<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
														{{each(key, button) listItem.buttons}} \
															{{if key >= 2}}\
																<li><button class="button_" type="${button.type}" {{if button && button.buttonStyles }}style="{{each(styleKey,style) button.buttonStyles}}${styleKey} : ${style};{{/each}}"{{/if}} value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button></li>\
															{{/if}}\
														{{/each}}\
													</ul>\
												{{/if}}\
										{{/if}}\
									</div>\
								{{/if}}\
								 </div>\
						  </div>\
						{{/each}}\
					</div>\
				{{/if}}\
		   </div>\
		</li>\
	{{/if}}\
	</script>';

	var advancedMultiListTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
	{{if msgData.message}} \
		<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		<div class="advanced-multi-list-wrapper {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}img-with-title with-accordion if-multiple-accordions-list{{/if}}{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType ==="button"}}if-multiple-tags{{/if}} {{if msgData.message[0].component.payload.fromHistory}}fromHistory{{/if}}">\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
		{{if msgData && msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		{{if msgData && msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.openPreviewModal && msgData.message[0].component.payload.seeMoreAction === "modal"}}\
		 	<div class="preview-modal-header">\
			 <div class="preview-modal-title">{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.previewModalTitle}}${msgData.message[0].component.payload.previewModalTitle}{{else}}Upcoming meetings{{/if}}</div>\
			 <button class="advancedlist-template-close" title="Close"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMiAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS43NjU5IDEuNjUwNTlDMTEuOTkgMS4zNzg2OCAxMS45NjE2IDAuOTYxNTk0IDExLjY5MDMgMC42OTAzMjdDMTEuNDAzMSAwLjQwMzEwMyAxMC45NTI0IDAuMzg4MTI1IDEwLjY4MzcgMC42NTY4NzJMNiA1LjM0MDUyTDEuMzE2MzUgMC42NTY4NzJMMS4yNjk5MyAwLjYxNDcwNkMwLjk5ODAyOCAwLjM5MDYyOSAwLjU4MDk0IDAuNDE5MDYgMC4zMDk2NzMgMC42OTAzMjdDMC4wMjI0NDg4IDAuOTc3NTUxIDAuMDA3NDcwNTcgMS40MjgyNiAwLjI3NjIxOCAxLjY5N0w0Ljk1OTg3IDYuMzgwNjVMMC4zNDMxNjQgMTAuOTk3NEwwLjMwMDk5OCAxMS4wNDM4QzAuMDc2OTIwNyAxMS4zMTU3IDAuMTA1MzUxIDExLjczMjggMC4zNzY2MTkgMTIuMDA0QzAuNjYzODQzIDEyLjI5MTMgMS4xMTQ1NSAxMi4zMDYyIDEuMzgzMyAxMi4wMzc1TDYgNy40MjA3OUwxMC42MTY3IDEyLjAzNzVMMTAuNjYzMSAxMi4wNzk3QzEwLjkzNSAxMi4zMDM3IDExLjM1MjEgMTIuMjc1MyAxMS42MjM0IDEyLjAwNEMxMS45MTA2IDExLjcxNjggMTEuOTI1NiAxMS4yNjYxIDExLjY1NjggMTAuOTk3NEw3LjA0MDEzIDYuMzgwNjVMMTEuNzIzOCAxLjY5N0wxMS43NjU5IDEuNjUwNTlaIiBmaWxsPSIjMjAyMTI0Ii8+Cjwvc3ZnPgo="></button>\
			</div>\
		{{/if}}\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listItems && msgData.message[0].component.payload.listItems.length}} \
			   {{each(parentKey,parentListItem)  msgData.message[0].component.payload.listItems}}\
			   {{if  (msgData.message[0].component.payload.listItemDisplayCount &&  msgData.message[0].component.payload.listItemDisplayCount > parentKey && (((!msgData.message[0].component.payload.seeMoreAction )||(msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "slider") || (msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "modal"))) || (!msgData.message[0].component.payload.listItemDisplayCount) || (msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction &&  msgData.message[0].component.payload.seeMoreAction === "inline")) }}\
					<div class="advance-multi-list-parent {{if msgData.message[0].component.payload.listItemDisplayCount-1 &&  msgData.message[0].component.payload.listItemDisplayCount-1 < parentKey && msgData.message[0].component.payload.seeMoreAction === "inline"}}hide inline{{/if}}">\
									{{if parentListItem && parentListItem.title}}<div class="main-title" {{if parentListItem && parentListItem.titleStyles}}style="{{each(styleKey,style) parentListItem.titleStyles}}${styleKey}:${style};{{/each}}"{{/if}}>${parentListItem.title}</div>{{/if}}\
									{{if parentListItem && parentListItem.description}}<div class="main-title-desc" {{if parentListItem && parentListItem.descriptionStyles}}style="{{each(styleKey,style) parentListItem.descriptionStyles}}${styleKey}:${style};{{/each}}"{{/if}}>${parentListItem.description}</div>{{/if}}\
									{{if parentListItem && parentListItem.subListItems && parentListItem.subListItems.length}}\
										{{each(key, listItem) parentListItem.subListItems}} \
										    <div class="multi-list-subItems">\
												<div class="multiple-accor-rows {{if listItem && listItem.borderAvailable}}pl-14{{/if}} {{if listItem && listItem.type && listItem.type=== "view"}}if-template-view-type{{/if}}" id="{{if listItem && listItem.navId}}${listItem.navId}{{/if}}"  type="${listItem.type}" actionObj="${JSON.stringify(listItem)}" {{if listItem.elementStyles}}style="{{each(styleKey,listItemStyle) listItem.elementStyles}}${styleKey}:${listItemStyle};{{/each}}"{{/if}}>\
													<div class="accor-header-top">\
													{{if listItem && listItem.borderAvailable}}\
														<div class="border-div" {{if listItem && listItem.borderStyles}}style="{{each(styleKey,style) listItem.borderStyles}}${styleKey}:${style};{{/each}}"{{/if}}></div>\
													{{/if}}\
														{{if listItem && listItem.icon || listItem.iconText}}\
															<div class="img-block {{if listItem.iconShape}}${listItem.iconShape}{{/if}} {{if listItem.imageSize}}${listItem.imageSize}{{/if}}">\
																{{if listItem && listItem.icon}}\
																	<img src="${listItem.icon}">\
																{{else listItem && listItem.iconText}}\
																	<div class="icon-text" {{if listItem.iconStyles}}style="{{each(iconStyleKey,style) listItem.iconStyles}}${iconStyleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.iconText, "bot")}}</div>\
																{{/if}}\
															</div>\
														{{/if}}\
														<div class="content-block {{if !listItem.icon && !listItem.iconText}}pd-0{{/if}}{{if listItem && ((!listItem.icon && !listItem.iconText) || !listItem.headerOptions)}} w-100{{/if}}">\
															{{if listItem && listItem.title}}\
																<div class="title-text" {{if listItem && listItem.titleStyles}}style="{{each(styleKey,style) listItem.titleStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(listItem.title, "bot")}}</div>\
															{{/if}}\
															{{if listItem && listItem.description}}\
																<div class="title-desc {{if listItem && listItem.descriptionIcon}}desciptionIcon {{/if}}{{if listItem && listItem.descriptionIconAlignment && (listItem.descriptionIconAlignment==="right")}}if-icon-right{{else listItem && (listItem.descriptionIconAlignment && (listItem.descriptionIconAlignment==="left")) || !listItem.descriptionIconAlignment}}if-icon-left{{/if}}" {{if listItem && listItem.descriptionStyles}}style="{{each(styleKey,style) listItem.descriptionStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{if listItem && listItem.descriptionIcon}}<span class="desc-icon"><img  src="${listItem.descriptionIcon}"></span>{{/if}}{{html helpers.convertMDtoHTML(listItem.description, "bot")}}</div>\
															{{/if}}\
														</div>\
														{{if listItem && listItem.headerOptions && listItem.headerOptions.length}}\
															{{each(i,headerOption) listItem.headerOptions}}\
																	{{if headerOption && headerOption.type == "text"}}\
																	<div class="btn_block">\
																		<div class="amout-text" {{if headerOption && headerOption.styles}}style="{{each(styleKey,style) headerOption.styles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.value, "bot")}}</div>\
																	</div>\
																	{{/if}}\
																	{{if headerOption && headerOption.type == "icon"}}\
																	<div class="action-icon-acc">\
																		<img src="${headerOption.icon}">\
																	</div>\
																	{{/if}}\
																	{{if headerOption && headerOption.contenttype == "button"}}\
																		<div class="btn_block">\
																			{{if headerOption && headerOption.contenttype == "button" && headerOption.isStatus}}\
																				<div class="btn_tag shorlisted" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</div>\
																			{{/if}}\
																			{{if headerOption && headerOption.contenttype == "button" && !headerOption.isStatus}}\
																				<button class="button_" type="${headerOption.type}" value="${headerOption.payload}" {{if headerOption && headerOption.buttonStyles}}style="{{each(styleKey,style) headerOption.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(headerOption.title, "bot")}}</button>\
																			{{/if}}\
																		</div>\
																	{{/if}}\
																	{{if headerOption && headerOption.type == "dropdown"}}\
																		<div class="btn_block dropdown">\
																			<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjNweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMyAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4NCiAgICA8dGl0bGU+ZWxsaXBzaXNHcmF5PC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPHBhdGggZD0iTTIuNTcxNDI4NTcsOC4wNzE0Mjg1NyBMMi41NzE0Mjg1Nyw5LjM1NzE0Mjg2IEMyLjU3MTQyODU3LDkuNTM1NzE1MTggMi41MDg5MjkyLDkuNjg3NDk5MzggMi4zODM5Mjg1Nyw5LjgxMjUgQzIuMjU4OTI3OTUsOS45Mzc1MDA2MiAyLjEwNzE0Mzc1LDEwIDEuOTI4NTcxNDMsMTAgTDAuNjQyODU3MTQzLDEwIEMwLjQ2NDI4NDgyMSwxMCAwLjMxMjUwMDYyNSw5LjkzNzUwMDYyIDAuMTg3NSw5LjgxMjUgQzAuMDYyNDk5Mzc1LDkuNjg3NDk5MzggMCw5LjUzNTcxNTE4IDAsOS4zNTcxNDI4NiBMMCw4LjA3MTQyODU3IEMwLDcuODkyODU2MjUgMC4wNjI0OTkzNzUsNy43NDEwNzIwNSAwLjE4NzUsNy42MTYwNzE0MyBDMC4zMTI1MDA2MjUsNy40OTEwNzA4IDAuNDY0Mjg0ODIxLDcuNDI4NTcxNDMgMC42NDI4NTcxNDMsNy40Mjg1NzE0MyBMMS45Mjg1NzE0Myw3LjQyODU3MTQzIEMyLjEwNzE0Mzc1LDcuNDI4NTcxNDMgMi4yNTg5Mjc5NSw3LjQ5MTA3MDggMi4zODM5Mjg1Nyw3LjYxNjA3MTQzIEMyLjUwODkyOTIsNy43NDEwNzIwNSAyLjU3MTQyODU3LDcuODkyODU2MjUgMi41NzE0Mjg1Nyw4LjA3MTQyODU3IFogTTIuNTcxNDI4NTcsNC42NDI4NTcxNCBMMi41NzE0Mjg1Nyw1LjkyODU3MTQzIEMyLjU3MTQyODU3LDYuMTA3MTQzNzUgMi41MDg5MjkyLDYuMjU4OTI3OTUgMi4zODM5Mjg1Nyw2LjM4MzkyODU3IEMyLjI1ODkyNzk1LDYuNTA4OTI5MiAyLjEwNzE0Mzc1LDYuNTcxNDI4NTcgMS45Mjg1NzE0Myw2LjU3MTQyODU3IEwwLjY0Mjg1NzE0Myw2LjU3MTQyODU3IEMwLjQ2NDI4NDgyMSw2LjU3MTQyODU3IDAuMzEyNTAwNjI1LDYuNTA4OTI5MiAwLjE4NzUsNi4zODM5Mjg1NyBDMC4wNjI0OTkzNzUsNi4yNTg5Mjc5NSAwLDYuMTA3MTQzNzUgMCw1LjkyODU3MTQzIEwwLDQuNjQyODU3MTQgQzAsNC40NjQyODQ4MiAwLjA2MjQ5OTM3NSw0LjMxMjUwMDYyIDAuMTg3NSw0LjE4NzUgQzAuMzEyNTAwNjI1LDQuMDYyNDk5MzggMC40NjQyODQ4MjEsNCAwLjY0Mjg1NzE0Myw0IEwxLjkyODU3MTQzLDQgQzIuMTA3MTQzNzUsNCAyLjI1ODkyNzk1LDQuMDYyNDk5MzggMi4zODM5Mjg1Nyw0LjE4NzUgQzIuNTA4OTI5Miw0LjMxMjUwMDYyIDIuNTcxNDI4NTcsNC40NjQyODQ4MiAyLjU3MTQyODU3LDQuNjQyODU3MTQgWiBNMi41NzE0Mjg1NywxLjIxNDI4NTcxIEwyLjU3MTQyODU3LDIuNSBDMi41NzE0Mjg1NywyLjY3ODU3MjMyIDIuNTA4OTI5MiwyLjgzMDM1NjUyIDIuMzgzOTI4NTcsMi45NTUzNTcxNCBDMi4yNTg5Mjc5NSwzLjA4MDM1Nzc3IDIuMTA3MTQzNzUsMy4xNDI4NTcxNCAxLjkyODU3MTQzLDMuMTQyODU3MTQgTDAuNjQyODU3MTQzLDMuMTQyODU3MTQgQzAuNDY0Mjg0ODIxLDMuMTQyODU3MTQgMC4zMTI1MDA2MjUsMy4wODAzNTc3NyAwLjE4NzUsMi45NTUzNTcxNCBDMC4wNjI0OTkzNzUsMi44MzAzNTY1MiAwLDIuNjc4NTcyMzIgMCwyLjUgTDAsMS4yMTQyODU3MSBDMCwxLjAzNTcxMzM5IDAuMDYyNDk5Mzc1LDAuODgzOTI5MTk2IDAuMTg3NSwwLjc1ODkyODU3MSBDMC4zMTI1MDA2MjUsMC42MzM5Mjc5NDYgMC40NjQyODQ4MjEsMC41NzE0Mjg1NzEgMC42NDI4NTcxNDMsMC41NzE0Mjg1NzEgTDEuOTI4NTcxNDMsMC41NzE0Mjg1NzEgQzIuMTA3MTQzNzUsMC41NzE0Mjg1NzEgMi4yNTg5Mjc5NSwwLjYzMzkyNzk0NiAyLjM4MzkyODU3LDAuNzU4OTI4NTcxIEMyLjUwODkyOTIsMC44ODM5MjkxOTYgMi41NzE0Mjg1NywxLjAzNTcxMzM5IDIuNTcxNDI4NTcsMS4yMTQyODU3MSBaIiBpZD0iZWxsaXBzaXNHcmF5IiBmaWxsPSIjOEE5NTlGIj48L3BhdGg+DQogICAgPC9nPg0KPC9zdmc+">\
																			{{if dropdownOptions && dropdownOptions.length}}\
																			<ul  class="more-button-info hide" style="list-style:none;">\
																			<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
																				{{each(optionKeykey, option) headerOption.dropdownOptions}} \
																						<li><button class="button_" {{if option && option.type}}type="${option.type}"{{/if}} value="${option.payload}">{{if option && option.icon}}<img src="${option.icon}">{{/if}} {{html helpers.convertMDtoHTML(option.title, "bot")}}</button></li>\
																				{{/each}}\
																			</ul>\
																			{{/if}}\
																		</div>\
																	{{/if}}\
															{{/each}}\
														{{/if}}\
													</div>\
													<div class="accor-inner-content" {{if listItem && listItem.isCollapsed}}style="display:block;"{{/if}}>\
														{{if listItem && listItem.view == "default" && listItem.textInformation && listItem.textInformation.length}}\
														{{each(i,textInfo) listItem.textInformation}}\
															<div class="details-content {{if textInfo && textInfo.iconAlignment && (textInfo.iconAlignment==="right")}}if-icon-right{{else textInfo && (textInfo.iconAlignment && (textInfo.iconAlignment==="left")) || !textInfo.iconAlignment}}if-icon-left{{/if}}">\
																{{if textInfo && textInfo.icon}}\
																<span class="icon-img">\
																	<img src="${textInfo.icon}">\
																</span>\
																{{/if}}\
																{{if textInfo && textInfo.title}}\
																	<span class="text-info" {{if textInfo && textInfo.styles}}style="{{each(styleKey,style) textInfo.styles}}${styleKey}:${style};{{/each}}"{{/if}} {{if textInfo && textInfo.type}}type="${textInfo.type}"{{/if}} {{if textInfo && textInfo.url}}url="${textInfo.url}"{{/if}}>{{html helpers.convertMDtoHTML(textInfo.title, "bot")}}</span>\
																{{/if}}\
															</div>\
														{{/each}}\
														{{if listItem && listItem.buttonHeader}}\
														<div class="button-header"><div class="button-header-title">{{html helpers.convertMDtoHTML(listItem.buttonHeader, "bot")}}</div></div>\
														{{/if}}\
														{{if listItem && listItem.buttons && listItem.buttons.length}}\
															<div class="inner-btns-acc {{if listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "center"}}if-btn-position-center{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "left")}}if-btn-position-left{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment == "right")}}if-btn-position-right{{else (listItem.buttonsLayout && listItem.buttonsLayout.buttonAligment && listItem.buttonsLayout.buttonAligment  == "fullwidth")}}if-full-width-btn"{{/if}}">\
															{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "slider") || (listItem && !listItem.seeMoreAction)}}\
																	{{each(i,button) listItem.buttons}}\
																		{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3)}}\
																			<button class="button_" type="${button.type}" {{if button && button.url}}url="${button.url}"{{/if}} title="${button.title}" value="${button.payload}"  {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
																		{{/if}}\
																	{{/each}}\
																{{else (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "inline")}}\
																	{{each(i,button) listItem.buttons}}\
																			<button class="button_ {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}} {{if !((listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3))}} hide {{/if}}" type="${button.type}" title="${button.title}" {{if button.url}}url="${button.url}"{{/if}}  value="${button.payload}"><img src="${button.icon}">${button.title}</button>\
																	{{/each}}\
																{{/if}}\
																	{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && listItem.buttonsLayout.displayLimit.count < listItem.buttons.length) || (listItem && !listItem.buttonsLayout && listItem.buttons.length > 3)}}\
																			<button class=" more-btn" actionObj="${JSON.stringify(listItem)}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAADCAYAAABI4YUMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgBNYyxDcJQDET/OREwBhukA0pG+COwQaCnSCR6+BswAqwBTeYB4eOcKJbss89+xnLbtyl5dsfp++6GpFhszhmoWvJXPq/LI7zVrluTvCqHWsAtTDM/SI7RByDZS2McIdK1g54h1yq9OxszG+HpAAVgqgxl9tztbsZG7fMPUTQuCUr8UX4AAAAASUVORK5CYII=">More</button>\
																			{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && !listItem.seeMoreAction)}}\
																				<ul  class="more-button-info" style="list-style:none;">\
																				<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
																					{{each(key, button) listItem.buttons}} \
																						{{if key >= 2}}\
																							<li><button class="button_" {{if button && button.url}}url="${button.url}"{{/if}}  type="${button.type}" {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}} value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button></li>\
																						{{/if}}\
																					{{/each}}\
																				</ul>\
																			{{/if}}\
																	{{/if}}\
															</div>\
														{{/if}}\
														{{/if}}\
														{{if listItem && (listItem.view == "table") && listItem.tableListData}}\
															{{if listItem.tableListData}}\
																<div class="inner-acc-table-sec">\
																	{{each(i,list) listItem.tableListData}}\
																	{{if list.rowData && list.rowData.length}}\
																		<div class="table-sec {{if listItem.type && listItem.type == "column"}}if-label-table-columns{{/if}}">\
																			{{each(key,row) list.rowData}}\
																				{{if ((list.rowData.length > 6) && (key < 6)) || (list.rowData.length === 6)}}\
																					{{if !row.icon}}\
																						<div class="column-table">\
																							<div class="header-name">{{html helpers.convertMDtoHTML(row.title, "bot")}}</div>\
																							<div class="title-name">{{html helpers.convertMDtoHTML(row.description, "bot")}}</div>\
																						</div>\
																						{{else}}\
																							<div class="column-table">\
																								<div class="labeld-img-block {{if row.iconSize}}${row.iconSize}{{/if}}">\
																									<img src="${row.icon}">\
																								</div>\
																								<div class="label-content">\
																									<div class="header-name">{{html helpers.convertMDtoHTML(row.title, "bot")}}</div>\
																									<div class="title-name">{{html helpers.convertMDtoHTML(row.description, "bot")}}</div>\
																								</div>\
																							</div>\
																						{{/if}}\
																					{{/if}}\
																			{{/each}}\
																			{{if (list.rowData.length > 6)}}\
																					<div class="column-table-more">\
																						<div class="title-name"><span>More <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="></div>\
																					</div>\
																			{{/if}}\
																		</div>\
																		{{/if}}\
																	{{/each}}\
																</div>\
															{{/if}}\
														{{/if}}\
														{{if listItem && listItem.view == "options" && listItem.optionsData && listItem.optionsData.length}}\
														{{each(i,option) listItem.optionsData}}\
															{{if option && option.type == "radio"}}\
																<div class="kr_sg_radiobutton option">\
																	<input id="${key+""+i}" name="radio" class="radio-custom option-input" value="${option.value}" text = "${option.label}" type="radio">\
																	<label for="${key+""+i}" class="radio-custom-label">{{html helpers.convertMDtoHTML(option.label, "bot")}}</label>\
																</div>\
															{{/if}}\
															{{if option && option.type == "checkbox"}}\
															<div class="kr_sg_checkbox option">\
																<input id="${key+""+i}" class="checkbox-custom option-input" text = "${option.label}" value="${option.value}" type="checkbox">\
																<label for="${key+""+i}" class="checkbox-custom-label">{{html helpers.convertMDtoHTML(option.label, "bot")}}</label>\
																</div>\
															{{/if}}\
														{{/each}}\
														{{if listItem && listItem.buttons && listItem.buttons.length}}\
																<div class="btn_group {{if listItem.buttonAligment && listItem.buttonAligment == "center"}}if-btn-position-center{{else (listItem.buttonAligment && listItem.buttonAligment == "left")}}if-btn-position-left{{else (listItem.buttonAligment && listItem.buttonAligment == "right")}}if-btn-position-right{{else (listItem.buttonAligment && listItem.buttonAligment == "fullWidth")}}if-full-width-btn"{{/if}}">\
																	{{each(i,button) listItem.buttons}}\
																		<button class="{{if button && button.btnType =="confirm"}}submitBtn p-button{{else button && button.btnType=="cancel"}}cancelBtn s-button{{/if}}" title="${button.title}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
																	{{/each}}\
																</div>\
														{{/if}}\
														{{/if}}\
													</div>\
												</div>\
											</div>\
										{{/each}}\
									{{/if}}\
					</div>\
					{{/if}}\
				{{/each}}\
				{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount) || (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount)}}\
					<div class="see-more-data">\
						{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (!msgData.message[0].component.payload.seeMoreVisibity || (msgData.message[0].component.payload.seeMoreVisibity && msgData.message[0].component.payload.seeMoreVisibity === "link"))}}\
							<span>{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} ${msgData.message[0].component.payload.seeMoreTitle} {{else}}See more{{/if}} <img {{if msgData.message[0].component.payload.seeMoreIcon}} src="${msgData.message[0].component.payload.seeMoreIcon}" {{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></span>\
						{{else msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.seeMoreVisibity  && msgData.message[0].component.payload.seeMoreVisibity === "button")}}\
								<button class="button_seemore" >{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreIcon)}}<img src="${msgData.message[0].component.payload.seeMoreIcon.seeMoreIcon}">{{/if}}{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} ${msgData.message[0].component.payload.seeMoreTitle} {{else}}See more{{/if}}</button>\
						{{/if}}\
					</div>\
				{{/if}}\
			{{/if}}\
		{{/if}}\
		</div>\
	</li>\
		{{/if}}\
	</scipt>'; 
/* article Template json 
var message = {
    "type": "template",
    "payload": {
            "template_type": "articleTemplate",
            "elements": [
              {
                "title": "*Repair Mac laptop*",
                "description": "If your Mac needs to be serviced or repaired, System Information can help you find out if your Mac is still covered under warranty and where to take it for service. The information that appears i ...",
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjczMjQgMC43NzczNDRDMTAuMDExNiAwLjc3NzM0NCAxMC4yNDA4IDAuOTkxMDk0IDEwLjI2NTUgMS4yNjM4N0wxMC4yNjc2IDEuMzEyNTlWMi4wNDExMkgxMS4zMTIxQzExLjYwNzcgMi4wNDExMiAxMS44NDc0IDIuMjgwNzUgMTEuODQ3NCAyLjU3NjM2VjEyLjY4NjVDMTEuODQ3NCAxMi45ODIyIDExLjYwNzcgMTMuMjIxOCAxMS4zMTIxIDEzLjIyMThIMS4yMDE5M0MwLjkwNjMyNCAxMy4yMjE4IDAuNjY2Njg3IDEyLjk4MjIgMC42NjY2ODcgMTIuNjg2NVYyLjU3NjM2QzAuNjY2Njg3IDIuMjgwNzUgMC45MDYzMjQgMi4wNDExMiAxLjIwMTkzIDIuMDQxMTJIMi4yNDY0VjEuMzEyNTlDMi4yNDY0IDEuMDE2OTggMi40ODYwNCAwLjc3NzM0NCAyLjc4MTY1IDAuNzc3MzQ0QzMuMDYwODMgMC43NzczNDQgMy4yOTAwOSAwLjk5MTA5NCAzLjMxNDcxIDEuMjYzODdMMy4zMTY4OSAxLjMxMjU5VjIuMDQxMTJIOS4xOTcxNVYxLjMxMjU5QzkuMTk3MTUgMS4wMTY5OCA5LjQzNjc5IDAuNzc3MzQ0IDkuNzMyNCAwLjc3NzM0NFpNMTAuNzc2OCA0Ljg4NDZWMy4xMTEzNUgxLjczNzE4VjQuODg0NkgxMC43NzY4Wk0xLjczNzE4IDUuOTU1MDlIMTAuNzc2OFYxMi4xNTEzSDEuNzM3MThWNS45NTUwOVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==",
                "createdOn": "Created: Jan 18th 2015",
                "updatedOn": "Updated: Oct 15th 2018",
                "button": {
                  "title": "Show Article",
                  "type": "postback",
                  "payload": "Show my new article"
                }
              },
              {
                "title": "*Reinstall Mac OS*",
                "description": "You can use macOS Recovery, the built-in recovery system on your Mac, to reinstall macOS. macOS Recovery keeps your files and user settings intact when reinstalling. Important: Your computer must ...",
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjczMjQgMC43NzczNDRDMTAuMDExNiAwLjc3NzM0NCAxMC4yNDA4IDAuOTkxMDk0IDEwLjI2NTUgMS4yNjM4N0wxMC4yNjc2IDEuMzEyNTlWMi4wNDExMkgxMS4zMTIxQzExLjYwNzcgMi4wNDExMiAxMS44NDc0IDIuMjgwNzUgMTEuODQ3NCAyLjU3NjM2VjEyLjY4NjVDMTEuODQ3NCAxMi45ODIyIDExLjYwNzcgMTMuMjIxOCAxMS4zMTIxIDEzLjIyMThIMS4yMDE5M0MwLjkwNjMyNCAxMy4yMjE4IDAuNjY2Njg3IDEyLjk4MjIgMC42NjY2ODcgMTIuNjg2NVYyLjU3NjM2QzAuNjY2Njg3IDIuMjgwNzUgMC45MDYzMjQgMi4wNDExMiAxLjIwMTkzIDIuMDQxMTJIMi4yNDY0VjEuMzEyNTlDMi4yNDY0IDEuMDE2OTggMi40ODYwNCAwLjc3NzM0NCAyLjc4MTY1IDAuNzc3MzQ0QzMuMDYwODMgMC43NzczNDQgMy4yOTAwOSAwLjk5MTA5NCAzLjMxNDcxIDEuMjYzODdMMy4zMTY4OSAxLjMxMjU5VjIuMDQxMTJIOS4xOTcxNVYxLjMxMjU5QzkuMTk3MTUgMS4wMTY5OCA5LjQzNjc5IDAuNzc3MzQ0IDkuNzMyNCAwLjc3NzM0NFpNMTAuNzc2OCA0Ljg4NDZWMy4xMTEzNUgxLjczNzE4VjQuODg0NkgxMC43NzY4Wk0xLjczNzE4IDUuOTU1MDlIMTAuNzc2OFYxMi4xNTEzSDEuNzM3MThWNS45NTUwOVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==",
                "createdOn": "Created: Jun 20th 2016",
                "updatedOn": "Updated: Jul 18th 2019",
                "button": {
                  "title": "Show Article",
                  "type": "url",
                  "url": "https://itassist-qa.kore.ai/demoitsm/api/v1/kb_article/KB0000002?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImNzLTE1NTRjYzA2LWIwNzAtNWUxMC05OTY4LTk0ZGQ3ZTQ5YTgzMSIsImlhdCI6MTY2MzA1NTA5OX0.gim4Dp7Knxw0aCImZSDLUfxWD-zdBTZAC3vlDTGLX-k&host=https%3A%2F%2Fstaging-bots.korebots.com%2Fapi%2F1.1%2Fpublic%2Ftables%2F&env=dev&lang=en"
                }
              },
              {
                "title": "*Reset Windows laptop*",
                "description": "If you're having problems with your PC, you can: Refresh your PC to reinstall Windows and keep your personal files and settings. Refresh also keeps the apps that came with your PC and the apps yo ...",
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjczMjQgMC43NzczNDRDMTAuMDExNiAwLjc3NzM0NCAxMC4yNDA4IDAuOTkxMDk0IDEwLjI2NTUgMS4yNjM4N0wxMC4yNjc2IDEuMzEyNTlWMi4wNDExMkgxMS4zMTIxQzExLjYwNzcgMi4wNDExMiAxMS44NDc0IDIuMjgwNzUgMTEuODQ3NCAyLjU3NjM2VjEyLjY4NjVDMTEuODQ3NCAxMi45ODIyIDExLjYwNzcgMTMuMjIxOCAxMS4zMTIxIDEzLjIyMThIMS4yMDE5M0MwLjkwNjMyNCAxMy4yMjE4IDAuNjY2Njg3IDEyLjk4MjIgMC42NjY2ODcgMTIuNjg2NVYyLjU3NjM2QzAuNjY2Njg3IDIuMjgwNzUgMC45MDYzMjQgMi4wNDExMiAxLjIwMTkzIDIuMDQxMTJIMi4yNDY0VjEuMzEyNTlDMi4yNDY0IDEuMDE2OTggMi40ODYwNCAwLjc3NzM0NCAyLjc4MTY1IDAuNzc3MzQ0QzMuMDYwODMgMC43NzczNDQgMy4yOTAwOSAwLjk5MTA5NCAzLjMxNDcxIDEuMjYzODdMMy4zMTY4OSAxLjMxMjU5VjIuMDQxMTJIOS4xOTcxNVYxLjMxMjU5QzkuMTk3MTUgMS4wMTY5OCA5LjQzNjc5IDAuNzc3MzQ0IDkuNzMyNCAwLjc3NzM0NFpNMTAuNzc2OCA0Ljg4NDZWMy4xMTEzNUgxLjczNzE4VjQuODg0NkgxMC43NzY4Wk0xLjczNzE4IDUuOTU1MDlIMTAuNzc2OFYxMi4xNTEzSDEuNzM3MThWNS45NTUwOVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==",
                "createdOn": "Created: Apr 23rd 2014",
                "updatedOn": "Updated: May 18th 2019",
                "button": {
                  "title": "Show Article",
                  "type": "url",
                  "url": "https://itassist-qa.kore.ai/demoitsm/api/v1/kb_article/KB0000003?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImNzLTE1NTRjYzA2LWIwNzAtNWUxMC05OTY4LTk0ZGQ3ZTQ5YTgzMSIsImlhdCI6MTY2MzA1NTA5OX0.gim4Dp7Knxw0aCImZSDLUfxWD-zdBTZAC3vlDTGLX-k&host=https%3A%2F%2Fstaging-bots.korebots.com%2Fapi%2F1.1%2Fpublic%2Ftables%2F&env=dev&lang=en"
                }
              },
              {
                "title": "*Reinstall Mac OS*",
                "description": "You can use macOS Recovery, the built-in recovery system on your Mac, to reinstall macOS. macOS Recovery keeps your files and user settings intact when reinstalling. Important: Your computer must ...",
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjczMjQgMC43NzczNDRDMTAuMDExNiAwLjc3NzM0NCAxMC4yNDA4IDAuOTkxMDk0IDEwLjI2NTUgMS4yNjM4N0wxMC4yNjc2IDEuMzEyNTlWMi4wNDExMkgxMS4zMTIxQzExLjYwNzcgMi4wNDExMiAxMS44NDc0IDIuMjgwNzUgMTEuODQ3NCAyLjU3NjM2VjEyLjY4NjVDMTEuODQ3NCAxMi45ODIyIDExLjYwNzcgMTMuMjIxOCAxMS4zMTIxIDEzLjIyMThIMS4yMDE5M0MwLjkwNjMyNCAxMy4yMjE4IDAuNjY2Njg3IDEyLjk4MjIgMC42NjY2ODcgMTIuNjg2NVYyLjU3NjM2QzAuNjY2Njg3IDIuMjgwNzUgMC45MDYzMjQgMi4wNDExMiAxLjIwMTkzIDIuMDQxMTJIMi4yNDY0VjEuMzEyNTlDMi4yNDY0IDEuMDE2OTggMi40ODYwNCAwLjc3NzM0NCAyLjc4MTY1IDAuNzc3MzQ0QzMuMDYwODMgMC43NzczNDQgMy4yOTAwOSAwLjk5MTA5NCAzLjMxNDcxIDEuMjYzODdMMy4zMTY4OSAxLjMxMjU5VjIuMDQxMTJIOS4xOTcxNVYxLjMxMjU5QzkuMTk3MTUgMS4wMTY5OCA5LjQzNjc5IDAuNzc3MzQ0IDkuNzMyNCAwLjc3NzM0NFpNMTAuNzc2OCA0Ljg4NDZWMy4xMTEzNUgxLjczNzE4VjQuODg0NkgxMC43NzY4Wk0xLjczNzE4IDUuOTU1MDlIMTAuNzc2OFYxMi4xNTEzSDEuNzM3MThWNS45NTUwOVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==",
                "createdOn": "Created: Jun 20th 2016",
                "updatedOn": "Updated: Jul 18th 2019",
                "button": {
                  "title": "Show Article",
                  "type": "url",
                  "url": "https://itassist-qa.kore.ai/demoitsm/api/v1/kb_article/KB0000002?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImNzLTE1NTRjYzA2LWIwNzAtNWUxMC05OTY4LTk0ZGQ3ZTQ5YTgzMSIsImlhdCI6MTY2MzA1NTA5OX0.gim4Dp7Knxw0aCImZSDLUfxWD-zdBTZAC3vlDTGLX-k&host=https%3A%2F%2Fstaging-bots.korebots.com%2Fapi%2F1.1%2Fpublic%2Ftables%2F&env=dev&lang=en"
                }
              },
              {
                "title": "*Reinstall Mac OS*",
                "description": "You can use macOS Recovery, the built-in recovery system on your Mac, to reinstall macOS. macOS Recovery keeps your files and user settings intact when reinstalling. Important: Your computer must ...",
                "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjczMjQgMC43NzczNDRDMTAuMDExNiAwLjc3NzM0NCAxMC4yNDA4IDAuOTkxMDk0IDEwLjI2NTUgMS4yNjM4N0wxMC4yNjc2IDEuMzEyNTlWMi4wNDExMkgxMS4zMTIxQzExLjYwNzcgMi4wNDExMiAxMS44NDc0IDIuMjgwNzUgMTEuODQ3NCAyLjU3NjM2VjEyLjY4NjVDMTEuODQ3NCAxMi45ODIyIDExLjYwNzcgMTMuMjIxOCAxMS4zMTIxIDEzLjIyMThIMS4yMDE5M0MwLjkwNjMyNCAxMy4yMjE4IDAuNjY2Njg3IDEyLjk4MjIgMC42NjY2ODcgMTIuNjg2NVYyLjU3NjM2QzAuNjY2Njg3IDIuMjgwNzUgMC45MDYzMjQgMi4wNDExMiAxLjIwMTkzIDIuMDQxMTJIMi4yNDY0VjEuMzEyNTlDMi4yNDY0IDEuMDE2OTggMi40ODYwNCAwLjc3NzM0NCAyLjc4MTY1IDAuNzc3MzQ0QzMuMDYwODMgMC43NzczNDQgMy4yOTAwOSAwLjk5MTA5NCAzLjMxNDcxIDEuMjYzODdMMy4zMTY4OSAxLjMxMjU5VjIuMDQxMTJIOS4xOTcxNVYxLjMxMjU5QzkuMTk3MTUgMS4wMTY5OCA5LjQzNjc5IDAuNzc3MzQ0IDkuNzMyNCAwLjc3NzM0NFpNMTAuNzc2OCA0Ljg4NDZWMy4xMTEzNUgxLjczNzE4VjQuODg0NkgxMC43NzY4Wk0xLjczNzE4IDUuOTU1MDlIMTAuNzc2OFYxMi4xNTEzSDEuNzM3MThWNS45NTUwOVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==",
                "createdOn": "Created: Jun 20th 2016",
                "updatedOn": "Updated: Jul 18th 2019",
                "button": {
                  "title": "Show Article",
                  "type": "url",
                  "url": "https://itassist-qa.kore.ai/demoitsm/api/v1/kb_article/KB0000002?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImNzLTE1NTRjYzA2LWIwNzAtNWUxMC05OTY4LTk0ZGQ3ZTQ5YTgzMSIsImlhdCI6MTY2MzA1NTA5OX0.gim4Dp7Knxw0aCImZSDLUfxWD-zdBTZAC3vlDTGLX-k&host=https%3A%2F%2Fstaging-bots.korebots.com%2Fapi%2F1.1%2Fpublic%2Ftables%2F&env=dev&lang=en"
                }
              },
            ],
            "showmore": true,
            "displayLimit": 3,
            "seemoreAction": "slider",
            "showMoreStyles": {
              "color": "#11dc09"
            }
          }
};
print(JSON.stringify(message)); */

	var articleTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
	{{if msgData.message}} \
		<li {{if msgData.type !== "bot_response"}} id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		   <div class="article-template">\
				{{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
				{{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
				{{if msgData.message[0].component.payload.sliderView}} <button class="close-button" title="Close"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>{{/if}}\
					<div class="article-template-content" actionObj="${JSON.stringify(msgData.message[0].component.payload)}">\
						{{if msgData.message[0].component.payload.elements.length}}\
						    <div class="article-template-elements">\
								{{each(key,value) msgData.message[0].component.payload.elements}}\
								      {{if ((key <  msgData.message[0].component.payload.displayLimit) && (msgData.message[0].component.payload.seemoreAction === "slider")) || (msgData.message[0].component.payload.seemoreAction !== "slider") || !msgData.message[0].component.payload.displayLimit }}\
											<div class="media-block media-blue {{if (key >=  msgData.message[0].component.payload.displayLimit) && (msgData.message[0].component.payload.seemoreAction === "inline")}}hide{{/if}}" {{if value.styles}}style="{{each(styleKey,style) value.styles}}${styleKey}:${style};{{/each}}"{{/if}} actionObj="${JSON.stringify(value)}">\
												<div class="media-header">{{html helpers.convertMDtoHTML(value.title, "bot")}}</div>\
													<div class="media-desc">{{html helpers.convertMDtoHTML(value.description, "bot")}}</div>\
												<div class="media-space-between">\
													<div class="media-icon-block">\
														<div class="media-icon">\
															<img src="${value.icon}"/>\
														</div>\
														<div class="media-icon-desc">\
														<div class="media-icon-desc-data">{{html helpers.convertMDtoHTML(value.createdOn, "bot")}}</div>\
														<div class="media-icon-desc-data">{{html helpers.convertMDtoHTML(value.updatedOn, "bot")}}</div>\
														</div>\
													</div>\
													<div><button class="btn-primary btn" actionObj="${JSON.stringify(value.button)}" type="${value.button.type}" {{if value.button.type === "url"}}url="${value.button.url}"{{/if}} {{if value.button.styles}}style="{{each(styleKey,style) value.button.styles}}${styleKey}:${style};{{/each}}"{{/if}}>${value.button.title}</button></div>\
												</div>\
											</div>\
										{{/if}}\
								{{/each}}\
							</div>\
						{{/if}}\
						{{if msgData.message[0].component.payload.showmore || (msgData.message[0].component.payload.elements.length > msgData.message[0].component.payload.displayLimit)}}\
							<div class="article-show-more" {{if  msgData.message[0].component.payload.showMoreStyles}}style="{{each(styleKey,style) msgData.message[0].component.payload.showMoreStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{if msgData.message[0].component.payload.seeMoreTitle}}${msgData.message[0].component.payload.seeMoreTitle}{{else}}Show more{{/if}}</div>\
						{{/if}}\
					</div>\
		   </div>\
		</li>\
		{{/if}} \
	</script>';

		/* Reset Template json
		var message = {
	  "type": "template",
	  "payload": {
		"template_type": "resetPinTemplate",
		"title": "Reset Pin",
		"enterPinTitle": "Enter your new PIN",
		"reEnterPinTitle": "Re-enter your PIN",
		"sliderView": true,
		"warningMessage": "Pin Miss match",
		"description":"Enter Otp",
		"mobileNumber":"+91******8161",
		"piiReductionChar":'#', // Special charater that is used for Pii reduction
		"pinLength":5,// specifies the length of the pin, it should be minimun 4
		"resetButtons": [
		  {
			title: "Get OTP",
		  }
		]
	  }
	};
	print(JSON.stringify(message)); */

	var resetPinTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{else}} id="${msgData.messageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}mashreq-otp-validation"> \
            <div class="reset-pin-template">\
                <div class="hading-text">${msgData.message[0].component.payload.title}\
                {{if msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}\
                <button class="close-button" title="Close"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                {{/if}}\
                </div>\
                    <div class="reset-pin-generation">\
                        <div class="enter-pin-info">\
                        <div class="enter-pin-title">${msgData.message[0].component.payload.enterPinTitle}</div>\
						    {{if msgData.message[0].component.payload.pinLength === 4}}\
								<div class="enter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{else msgData.message[0].component.payload.pinLength == 5}}\
								<div class="enter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{else msgData.message[0].component.payload.pinLength == 6}}\
								<div class="enter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{/if}}\
                        </div>\
                        <div class="reenter-pin-info">\
                            <div class="reenter-pin-title">${msgData.message[0].component.payload.reEnterPinTitle}</div>\
							{{if msgData.message[0].component.payload.pinLength === 4}}\
								<div class="reenter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{else msgData.message[0].component.payload.pinLength == 5}}\
								<div class="reenter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{else msgData.message[0].component.payload.pinLength == 6}}\
								<div class="reenter-pin-inputs">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
									<input type="password" class="input-item" maxlength="1">\
								</div>\
							{{/if}}\
                        </div>\
                        <div class="warning-message hide error-message-info">${msgData.message[0].component.payload.warningMessage}</div>\
                        <div class="error-message hide error-message-info">${msgData.message[0].component.payload.errorMessage}</div>\
                        {{if msgData.message[0].component.payload.resetButtons && msgData.message[0].component.payload.resetButtons.length}}\
                        <div class="resetpin-button-group">\
                            {{each(key,button) msgData.message[0].component.payload.resetButtons}}\
                                <button class="reset-btn disabled" title="${button.title}"><span class="button-title">${button.title}</span>{{if button.icon}}<img src="${button.icon}">{{/if}}</button>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                    </div>\
            </div>\
        </li>\
    {{/if}} \
    </script>';

	/* quick replies welcome template json 
	var message = {
    "type": "template",
    "payload": {
            "template_type": "quick_replies_welcome",
            "text": "Hello, my name is korabank.I am here to help you with your \nbanking needs. What can i do for you today?",
            "quick_replies": [
              {
                "content_type": "text",
                "title": "Get Balance",
                "value": "Get Balance",
                "payload": "get balance"
              },
              {
                "content_type": "text",
                "title": "Get Transactions",
                "value": "Get Transactions",
                "payload": "get transaction"
              },
              {
                "content_type": "text",
                "title": "Bill Pay",
                "value": "Bill Pay",
                "payload": "pay my bill today"
              }
            ],
    }
};
print(JSON.stringify(message)); */

	var quick_replies_welcome = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
                    <div class="buttonTmplContent "> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        {{if msgData.message[0].component.payload.text}} \
                            <div class="buttonTmplContentHeading quickReply"> \
                                {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </div>\
                            {{/if}} \
                            {{if msgData.message[0].component.payload.quick_replies && msgData.message[0].component.payload.quick_replies.length}} \
                                <div class="quick_replies_btn_parent"><div class="autoWidth">\
                                    {{each(key, msgItem) msgData.message[0].component.payload.quick_replies}} \
                                        <div class="buttonTmplContentChild quickReplyDiv displayInline"> <span {{if msgItem.payload}} value="${msgItem.payload}"{{/if}} actual-value="${msgItem.title}" class="buttonQuickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.content_type}">\
                                            {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                                        </div> \
                                    {{/each}} \
                                </div>\
                            </div>\
                        {{/if}} \
                    </div>\
                </li> \
            {{/if}} \
	</scipt>';

	/* otp validation template json
	var message = {
  "type": "template",
  "payload": {
    "template_type": "otpValidationTemplate",
    "title": "Enter OTP",
    "sliderView": true,
    "description":"Please Enter your 6 digit One time password below",
    "mobileNumber":"+91******8161",
    "piiReductionChar":'#', // Special charater that is used for Pii reduction
    "pinLength":4,// specifies the length of the pin, it should be minimun 4
    "otpButtons": [
      {
        title: "Submit",
        type:"submit"
      },
      {
          title:"Resend OTP",
          type:"resend"
      }
    ]
  }
};
print(JSON.stringify(message)); */

	var otpValidationTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{else}} id="${msgData.messageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}mashreq-otp-validation"> \
            <div class="otp-validations">\
                <div class="hading-text">${msgData.message[0].component.payload.title}\
                {{if msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView && !msgData.fromHistory}}\
                <button class="close-button" title="Close"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                {{/if}}\
                </div>\
                {{if msgData.message[0].component.payload.type ==="otp" || !msgData.message[0].component.payload.type}}\
                  <div class="otp-content">\
                    <div class="desc-text">${msgData.message[0].component.payload.description}</div>\
                    {{if  msgData.message && msgData.message[0].component.payload.mobileNumber}}\
                        <div class="phone-number-block">\
                            <div class="icon-block">\
                                <img src="{{if msgData.message && msgData.message[0].component.payload.mobileIcon}}${msgData.message[0].payload.component.mobileIcon}{{else}}data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAATCAYAAABLN4eXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADESURBVHgB7ZNNCsIwEIW/FH+2PUK8gTdQTyDddaPWk4gHEQq6F0+gnqT1BHaraOO0qXWVUtwJPkgmDPPlJTCjqGRmRBJGuHVWW+LioEpgzkpCAR1kZQ5ogSEVcPKGruQEasfJZWMifKlJ8Jh4Vc6nL4kGqbh8QcYD3+ML/aHfgDr16cbAhLYX20MeR3q00gfqotWGS1OxNHZi77fKuBM0AiFaghab1DrlLAXfyyBOnZRiKPtauj2tPy7zonkydltJcTVvL7jJL/rGRbIOAAAAAElFTkSuQmCC{{/if}}">\
                            </div>\
                            <div class="number-phone">${msgData.message[0].component.payload.mobileNumber}</div>\
                        </div>\
                    {{/if}}\
                    {{if  msgData.message && msgData.message[0].component.payload.mobileDesc}}\
                        <div class="text-tip">${msgData.message[0].component.payload.mobileDesc}</div>\
                    {{/if}}\
                    <div class="otp-block-inputs">\
                        <div class="input-block">\
                            <img alt="" class="otp-view-eye eye-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7N13tF1Vtcfx76RKld6bSAkIPBSVjjRBitJ9IF1ApVcVREFFOooIKvIA6V1AqoCEiCCCgEgNoYUSeu+SkPn+WCvkptzk3nvKXHvv32eMM8AxMPcH95yz5l5lLnN3REREpFmmiA4gIiIi3acCQEREpIFUAIiIiDSQCgAREZEGUgEgIiLSQCoAREREGkgFgIiISAOpABAREWkgFQAiIiINpAJARESkgVQAiIiINJAKABERkQZSASAiItJAKgBEREQaSAWAiIhIA6kAEBERaSAVACIiIg2kAkBERKSBVACIiIg0kAoAERGRBlIBICIi0kAqAERERBpIBYCIiEgDqQAQERFpIBUAIiIiDaQCQEREpIFUAIiIiDSQCgAREZEGUgEgIiLSQCoAREREGkgFgIiISAOpABAREWkgFQAiIiINpAJARESkgVQAiIiINJAKABERkQZSASAiItJAKgBEREQaSAWAiIhIA6kAEBERaSAVACIiIg2kAkBERKSBVACIiIg0kAoAERGRBlIBICIi0kAqAERERBpIBYCIiEgDqQAQERFpIBUAIiIiDaQCQEREpIFUAIiIiDSQCgAREZEGUgEgIiLSQCoAREREGkgFgIiISAOpABAREWkgFQAiIiINpAJARESkgVQAiIiINJAKABERkQZSASAiItJAKgBEREQaSAWAiIhIA6kAEBERaSAVACIiIg2kAkBERKSBVACIiIg0kAoAERGRBlIBICIi0kAqAERERBpIBYCIiEgDqQAQERFpIBUAIiIiDaQCQEREpIFUAIiIiDSQCgAREZEGUgEgIiLSQCoAREREGkgFgIiISAOpABAREWkgFQAiIiINpAJARESkgVQAiIiINJAKABERkQZSASAiItJAKgBEREQaSAWAiIhIA6kAEBERaSAVACIiIg2kAkBERKSBVACIiIg00FTRAUSkO8xsSuBT470APuz5cvePYxKKSDeZu0dnEJE+MLOpgHmAeXt5zcqEA3zPV18L/lGMVxSM93oDeKGX14vuPqq1f1MR6QYVACKFMLNZ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" />\
                            <img alt="" class="otp-hidden-eye eye-icon hide" src="data:image/png;base64,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" />\
                            <input type="password" class="input-item" maxlength="{{if msgData.message[0].component.payload.pinLength}}${msgData.message[0].component.payload.pinLength}{{else}}6{{/if}}">\
                        </div>\
                    </div>\
                    <div class="respond-time hide">Resend possible in <span>90 sec.</span></div>\
                    {{if msgData.message[0].component.payload.otpButtons}}\
                       <div class="otp-btn-group">\
                            {{each(key,btn) msgData.message[0].component.payload.otpButtons}}\
                               <button class="{{if btn.type ==="submit"}}otp-btn disabled{{else btn.type ==="resend"}}otp-resend{{/if}}" {{if btn.payload}}value="${btn.payload}"{{/if}}><span class="button-title">${btn.title}</span>{{if btn.icon}}<img src="${btn.icon}">{{/if}}</button>\
                            {{/each}}\
                       </div>\
                    {{/if}}\
                  </div>\
                {{else  msgData.message[0].component.payload.type ==="resetPin"}}\
                    <div class="reset-pin-generation">\
                        <div class="enter-pin-info">\
                        <div class="enter-pin-title">${msgData.message[0].component.payload.enterPinTitle}</div>\
                            <div class="enter-pin-inputs">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                            </div>\
                        </div>\
                        <div class="reenter-pin-info">\
                            <div class="reenter-pin-title">${msgData.message[0].component.payload.reEnterPinTitle}</div>\
                            <div class="reenter-pin-inputs">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                                <input type="password" class="input-item" maxlength="1">\
                            </div>\
                        </div>\
                        <div class="warning-message hide error-message-info">${msgData.message[0].component.payload.warningMessage}</div>\
                        <div class="error-message hide error-message-info">${msgData.message[0].component.payload.errorMessage}</div>\
                        {{if msgData.message[0].component.payload.resetButtons && msgData.message[0].component.payload.resetButtons.length}}\
                        <div class="resetpin-button-group">\
                            {{each(key,button) msgData.message[0].component.payload.resetButtons}}\
                                <button class="reset-btn disabled" title="${button.title}"><span class="button-title">${button.title}</span>{{if button.icon}}<img src="${button.icon}">{{/if}}</button>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                    </div>\
                {{/if}}\
            </div>\
        </li>\
    {{/if}} \
    </script>';
/* banking feedback template json 
var message= {
          "type": "template",
          "payload": {
            "heading": "Rate your Experience",
            "template_type": "bankingFeedbackTemplate",
            "lang": "en",
            "feedbackListHeading": "Please select Feedback Option",
            "userSuggestion": "",
            "experienceContent": [
              {
                "id": "VeryUnsatisfied",
                "value": "Very Unsatisfied"
              },
              {
                "id": "Unsatisfied",
                "value": "Unsatisfied"
              },
              {
                "id": "Neutral",
                "value": "Neutral"
              },
              {
                "id": "Satisfied",
                "value": "Satisfied"
              },
              {
                "id": "ExtremelySatisfied",
                "value": "Extremely Satisfied"
              }
            ],
            "feedbackList": [
              {
                "value": "Too many steps involved",
                "id": "Too many steps involved"
              },
              {
                "value": "Could not complete task",
                "id": "Could not complete task"
              },
              {
                "value": "Took lot of time than expected",
                "id": "Took lot of time than expected"
              }
            ],
            "buttons": [
              {
                "btnType": "confirm",
                "label": "Confirm"
              },
              {
                "btnType": "cancel",
                "label": "Cancel"
              }
            ]
          }
        };
        print(JSON.stringify(message)); */

	var bankingFeedbackTemplate = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
	{{if msgData.message && msgData.message[0].component.payload}} \
	<li {{if msgData.type !=="bot_response" }}id="msg_${msgItem.clientMessageId}" {{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
	{{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>\
				{{/if}} \
				{{if msgData.icon}}\
				<div aria-live="off" class="profile-photo">\
					<div class="user-account avtar" style="background-image:url(${msgData.icon})"></div>\
				</div> \
				{{/if}} \
		<div class="{{if msgData.message[0].component.payload.fromHistory}} dummy bankingFeedBackTemplate messageBubble {{else}}bankingFeedBackTemplate messageBubble{{/if}}"> \
				<div class="bankingFeedBackTemplate-experience-content">\
					{{if msgData.message[0].component.payload}}<div class="content-heading"> ${msgData.message[0].component.payload.heading}</div>{{/if}}\
					<div class="bankingFeedBackTemplate-content-experience">\
						{{if msgData && msgData.message[0].component.payload.experienceContent}}\
							{{each(key, experience) msgData.message[0].component.payload.experienceContent}}\
								<div class="content-list-view">\
									<input  class = "checkInput" type="radio" text = "${experience.value}" value = "${experience.value}" id="${experience.id}${msgData.messageId}" actionObj="${JSON.stringify(experience)}"> \
									<label for="${experience.id}${msgData.messageId}" class="checkInput-label">${experience.value}</label> \
								</div>\
							{{/each}}\
						{{/if}}\
					</div>\
				</div>\
				{{if msgData && msgData.message[0].component.payload.experienceContent}}\
					{{each(key, experience) msgData.message[0].component.payload.experienceContent}}\
					    {{if experience && experience.empathyMessage && experience.empathyMessage.length}}\
							<div class="empathy-message hide" id="${experience.id}${msgData.messageId}"> ${experience.empathyMessage}</div>\
						{{/if}}\
					{{/each}}\
				{{/if}}\
				{{if msgData &&  msgData.message[0] &&  msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.feedbackList}}\
				<div class="bankingFeedBackTemplate-feedback-content hide">\
							{{if msgData &&  msgData.message[0] &&  msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.feedbackListHeading}}<div class="feebackList-heading">${msgData.message[0].component.payload.feedbackListHeading}</div>{{/if}}\
								{{if msgData &&  msgData.message[0] &&  msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.feedbackList && msgData.message[0].component.payload.feedbackList.length}}\
								<div class="experience-feedback-listItems">\
									{{each(keyval, list) msgData.message[0].component.payload.feedbackList}}\
									<div class="feedback-listItem">\
										<div class="checkbox checkbox-primary styledCSS checkboxesDiv"> \
											<input  class = "checkInput" type="checkbox" text = "${list.value}" value = "${list.value}" id="${list.id}${msgData.messageId}" actionObj="${JSON.stringify(list)}" > \
											<label for="${list.id}${msgData.messageId}">${list.value}</label> \
										</div> \
									</div>\
									{{/each}}\
								</div>\
								{{/if}}\
								<div class="suggestions-component"><textarea type="text" class="feedback-suggestionInput" rows="5" id="bankingSuggestionInput" placeholder="Tell us more.."></textarea></div>\
								{{if msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length}}\
									<div class="buttons-div">\
										{{each(btnKey,button) msgData.message[0].component.payload.buttons}}\
											<div class="{{if (button.btnType == "confirm") }}feedback-submit {{else (button.btnType == "cancel")}}feedback-cancel{{/if}}"><button type="button" class="{{if (button.btnType == "confirm") }}submitBtn {{else (button.btnType == "cancel")}}cancelBtn{{/if}}">${button.label}</button></div>\
										{{/each}}\
									</div>\
								{{/if}}\
					</div>\
				{{/if}}\
		</div>\
	</li>\
	{{/if}}\
    </script>';
	var systemTemplate = '<script id="chat_system_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData.message}} \
        {{each(key, msgItem) msgData.message}} \
            {{if msgItem.cInfo && msgItem.type === "text"}} \
            <div class="messageBubble"> \
                <div class = "system-template"> \
                        <span class = "system-template-msg"> {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "bot", msgItem)}}</span> \
                    </div> \
                </div> \
            {{/if}} \
        {{/each}} \
    {{/if}} \
</script>';
		if (tempType === "dropdown_template") {
			return dropdownTemplate;
		} else if (tempType === "checkBoxesTemplate") {
			return checkBoxesTemplate;
		} else if (tempType === "likeDislikeTemplate") {
			return likeDislikeTemplate;
		}else if(tempType === "formTemplate"){
            return formTemplate;
		} else if (tempType === "advancedMultiSelect") {
			return advancedMultiSelect;
		}else if (tempType === "templatelistView") {
			return listViewTemplate;
		}else if (tempType === "actionSheetTemplate") {
			return listActionSheetTemplate;
		}else if(tempType === "tableListTemplate"){
			return tableListTemplate;
		}else if(tempType === "ratingTemplate"){
			return ratingTemplate;
		}else if(tempType === "listWidget"){
			return listWidget;
		}else if(tempType === "customTableTemplate"){
			return customTableTemplate;
		}else if(tempType === "advancedListTemplate"){
			return advancedListTemplate;
		} 
		else if(tempType === "cardTemplate"){
			return cardTemplate;
		}
		else if(tempType === "proposeTimes"){
			return proposeTimesTemplate;
		} 
		else if(tempType === "proposeActionSheetTemplate"){
			return proposeActionSheetTemplate;
		}
		else if(tempType === "default_card_template"){
			return default_card_template;
		} 
		else if(tempType === "advancedMultiListTemplate"){
			return advancedMultiListTemplate;
		} 
		else if(tempType === "articleTemplate"){
			return articleTemplate;
		} 
		else if (tempType == "resetPinTemplate") {
            return resetPinTemplate;
        }
		else if(tempType === "quick_replies_welcome"){
            return quick_replies_welcome;
		}
		else if (tempType == "otpValidationTemplate") {
            return otpValidationTemplate;
        } else if (tempType === "bankingFeedbackTemplate") {
            return bankingFeedbackTemplate;
        } 
		else if (tempType === "systemTemplate") {
            return systemTemplate;
        }
		else {
			return "";
		}
		return "";
	}; // end of getChatTemplate method


	customTemplate.prototype.getColumnWidth = function (width) {
		var _self = this;
		var newWidth;
		var widthToApply = '100%';
	  if (width){
		newWidth = width.replace(/[^\d.-]/g, '');
		 console.log(width)
		try {
		  widthToApply = 100 - parseInt(newWidth, 10);
		} catch (e){
		console.log(width);
		}
		return widthToApply;
	   }
	  };
//Below method is for template specific events
	customTemplate.prototype.templateEvents =function(ele, templateType, bindingData){
		chatInitialize=this.chatInitialize;
		var _self = this;
		var $ele = $(ele);
		if (templateType === 'TabbedList' || templateType === 'listWidget') {
			$($ele.find(".tabs")[0]).addClass("active");
			var titleEle = $ele.find('.listViewLeftContent');
			if(titleEle && titleEle.length){
			  for (i = 0; i < titleEle.length; i++){
				var ele =titleEle[i];
				if($(ele).attr('col-size')){
					if($(ele).hasClass("listViewLeftContent")){
						var width = _self.getColumnWidth((100 - parseInt($(ele).attr('col-size')))+'%');
						$(ele).css("width", width + '%');
					}else{
				  var width = _self.getColumnWidth($(ele).attr('col-size'));
				  $(ele).css("width", width + '%');
					}
				}
			  }
			}
			console.log(bindingData);
			$ele.off('click', '.listViewLeftContent').on('click', '.listViewLeftContent', function (e) {
			  e.stopPropagation();
			  var actionObjString = $(e.currentTarget).attr('actionObj');
	
			  if (actionObjString) {
				var actionObj = {};
				actionObj = JSON.parse(actionObjString);
			  }
	var _self=this;
			  valueClick(_self,actionObj);
			});
			$ele.off('click', '.moreValue').on('click', '.moreValue', function (e) {
			  e.stopPropagation();
			});
			$ele.off('click', '.tabs').on('click', '.tabs', function (e) {
			  e.stopPropagation();
	
			  var _selectedTab = $(e.target).text();
	
			  var msgData = $(e.target).closest(".tab-list-template").data();
			  var panelDetail = $(e.target).closest(".tab-list-template").attr('panelDetail');
	
			  if (panelDetail) {
				panelDetail = JSON.parse(panelDetail);
			  }
	
			  delete msgData.tmplItem;
			  var tempObj = {
				'tempdata': msgData,
				'dataItems': msgData.elements,
				'helpers': helpers,
				'viewmore': panelDetail.viewmore,
				'panelDetail': panelDetail
			  };
	
			  if (msgData && msgData.tabs && Object.keys(msgData.tabs) && Object.keys(msgData.tabs).length) {
				tempObj = {
				  'tempdata': msgData,
				  'dataItems': msgData.tabs[_selectedTab],
				  'tabs': Object.keys(msgData.tabs),
				  'helpers': helpers,
				  'viewmore': panelDetail.viewmore,
				  'panelDetail': panelDetail
				};
			  }
	
			  var viewTabValues = $(_self.getTemplate("TabbedList")).tmplProxy(tempObj);
			  $(viewTabValues).find(".tabs[data-tabid='" + _selectedTab + "']").addClass("active");
			  $(e.target).closest(".tab-list-template").html($(viewTabValues).html());
			});
			$ele.off('click', '#showMoreContents').on('click', '#showMoreContents', function (e) {
			  e.stopPropagation();
			  $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").removeClass('hide');
			});
			$ele.off('click', '.wid-temp-showMoreClose').on('click', '.wid-temp-showMoreClose', function (e) {
			  e.stopPropagation();
			  $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").addClass('hide');
			});
			$ele.off('click', '.wid-temp-showActions').on('click', '.wid-temp-showActions', function (e) {
			  e.stopPropagation();
	
			  if ($(e.currentTarget) && $(e.currentTarget).closest(".listViewTmplContentChild") && $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions") && $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").hasClass('active')) {
				$(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").removeClass('active');
				$(e.currentTarget).closest(".listViewTmplContentChild").find(".meetingActionButtons").addClass('hide'); // $(e.currentTarget).closest(".listViewTmplContentChild").find("#showMoreContents").removeClass('hide');
			  } else {
				$(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").addClass('active');
				$(e.currentTarget).closest(".listViewTmplContentChild").find(".meetingActionButtons").removeClass('hide'); // $(e.currentTarget).closest(".listViewTmplContentChild").find("#showMoreContents").addClass('hide');
			  }
			});
			$ele.off('click', '.action').on('click', '.action', function (e) {
			  e.stopPropagation();
			  var actionObjString = $(e.currentTarget).attr('actionObj');
	
			  if (actionObjString) {
				var actionObj = {};
				actionObj = JSON.parse(actionObjString);
			  } // var eData={
			  //   postbackValue: actionObj.payload,
			  //   payload:actionObj,
			  //   type:'widget'
			  // }
			  // if(eData && eData.postbackValue && eData.payload){
			  //   _self.triggerEvent('postback',eData);
			  // }
	            
			   if(typeof actionObj=='object' && actionObj.link){
				window.open(actionObj.link);
			   }else {
				   var _self = $(e.currentTarget).parent();
				valueClick(_self,actionObj);
			   }
			});
			// $('.widgetContentPanel').css({
			//   'padding': '10px 20px'
			// });
		  }
		  $ele.off('click', '.dropbtnWidgt.moreValue,.dropbtnWidgt.actionBtns').on('click', '.dropbtnWidgt.moreValue,.dropbtnWidgt.actionBtns', function (e) {
		      var obj=this;
			if ($(obj).next().hasClass('dropdown-contentWidgt')) {
			  $(obj).next().toggleClass('show');
			}
	  
			$('.dropdown-contentWidgt.show').not($(obj).next()).removeClass('show');
		  })
			window.onclick = function (event) {
			  if (!event.target.matches('.dropbtnWidgt')) {
				var dropdowns = document.getElementsByClassName("dropdown-contentWidgt");
				var i;
	  
				for (i = 0; i < dropdowns.length; i++) {
				  var openDropdown = dropdowns[i];
	  
				  if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				  }
				}
			  }
			};
	}


	customTemplate.prototype.bindEvents = function (messageHtml) {
		chatInitialize=this.chatInitialize;
		helpers=this.helpers;
		$(messageHtml).find('.selectTemplateDropdowm').on('change', function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(".chatInputBox").text(this.value)
			var k = $.Event('keydown', { which: 13 });
			k.keyCode = 13
			$('.chatInputBox').trigger(k);
	
		});
		/* Inline form submit click function starts here*/
		$(messageHtml).find(".formMainComponent").on('keydown',function(e){
			if(e.keyCode==13){
		 e.preventDefault();
		 e.stopPropagation();
	       }
	    })
		$(messageHtml).find("#submit").on('click', function(e){
		var inputForm_id =$(e.currentTarget).closest('.buttonTmplContent').find(".formMainComponent .formBody");
		var parentElement = $(e.currentTarget).closest(".fromOtherUsers.with-icon");
		var messageData=$(parentElement).data();
		if(messageData.tmplItem.data.msgData.message[0].component.payload){
			messageData.tmplItem.data.msgData.message[0].component.payload.ignoreCheckMark=true;
			var msgData=messageData.tmplItem.data.msgData;
		}
		
		if(inputForm_id.find("#email").val()==""){
			   $(parentElement).find(".buttonTmplContent").last().find(".errorMessage").removeClass("hide");
			  $(".errorMessage").text("Please enter value");
		 }
	    else if(inputForm_id.find("input[type='password']").length!=0){
				 var textPwd= inputForm_id.find("#email").val();
				 var passwordLength=textPwd.length;
				 var selectedValue="";
				 for(var i=0;i<passwordLength;i++){
						  selectedValue=selectedValue+"*";
					 }
				  $('.chatInputBox').text(textPwd);
				  $(messageHtml).find(".formMainComponent form").addClass("hide");
		}else if(inputForm_id.find("input[type='password']").length==0){
				$('.chatInputBox').text(inputForm_id.find("#email").val());
				var selectedValue=inputForm_id.find("#email").val();
				$(messageHtml).find(".formMainComponent form").addClass("hide");
		}
		chatInitialize.sendMessage($('.chatInputBox'),selectedValue,msgData);
		});
		/* Inline form submit click function ends here*/
		
		/* Advanced multi select checkbox click functions starts here */
		$(messageHtml).off('click', '.closeBottomSlider').on('click', '.closeBottomSlider', function (e) {
			bottomSliderAction('hide');
		});
		$(messageHtml).off('click', '.singleSelect').on('click', '.singleSelect', function (e) {
			var parentContainer = $(e.currentTarget).closest('.listTmplContentBox');
			var allGroups = $(parentContainer).find('.collectionDiv');
			var allcheckboxs = $(parentContainer).find('.checkbox input');
			$(allGroups).removeClass('selected');
			var selectedGroup = $(e.currentTarget).closest('.collectionDiv');
			$(selectedGroup).addClass("selected");
			var groupSelectInput = $(selectedGroup).find('.groupMultiSelect input');
			if (allGroups) {
				if (allGroups && allGroups.length) {
					for (i = 0; i < allGroups.length; i++) {
						if (allGroups && !($(allGroups[i]).hasClass('selected'))) {
							var allGroupItems = $(allGroups[i]).find('.checkbox input');
							for (j = 0; j < allGroupItems.length; j++) {
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
					for (i = 0; i < selectedGroupItems.length; i++) {
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
				for (i = 0; i < allcheckboxs.length; i++) {
					if($(allcheckboxs[i]).prop("checked")){
						showDoneButton = true;
					}
				}
			}
			if(showDoneButton){
			   $(doneButton).removeClass('hide');
			}else{
				$(doneButton).addClass('hide');
			}
		});
		$(messageHtml).off('click', '.viewMoreGroups').on('click', '.viewMoreGroups', function (e) {
			var parentContainer = $(e.currentTarget).closest('.listTmplContentBox')
			var allGroups = $(parentContainer).find('.collectionDiv');
			$(allGroups).removeClass('hide');
			$(".viewMoreContainer").addClass('hide');
		});
		$(messageHtml).off('click', '.groupMultiSelect').on('click', '.groupMultiSelect', function (e) {
			var clickedGroup = $(e.currentTarget).find('input');
			var clickedGroupStatus = $(clickedGroup[0]).prop('checked');
			var selectedGroup = $(e.currentTarget).closest('.collectionDiv');
			var selectedGroupItems = $(selectedGroup).find('.checkbox input');
			var parentContainer = $(e.currentTarget).closest('.listTmplContentBox')
			var allcheckboxs = $(parentContainer).find('.checkbox input');
				if (allcheckboxs && allcheckboxs.length) {
					for (i = 0; i < allcheckboxs.length; i++) {
						$(allcheckboxs[i]).prop("checked", false);
					}
				}
			if (clickedGroupStatus) {
				if (selectedGroupItems && selectedGroupItems.length) {
					for (i = 0; i < selectedGroupItems.length; i++) {
						$(selectedGroupItems[i]).prop("checked", true);
					}
				}
			} else {
				if (selectedGroupItems && selectedGroupItems.length) {
					for (i = 0; i < selectedGroupItems.length; i++) {
						$(selectedGroupItems[i]).prop("checked", false);
					}
				}
			}
			var showDoneButton = false;
			var doneButton = $(parentContainer).find('.multiCheckboxBtn');
			if (allcheckboxs && allcheckboxs.length) {
				for (i = 0; i < allcheckboxs.length; i++) {
					if($(allcheckboxs[i]).prop("checked")){
						showDoneButton = true;
					}
				}
			}
			if(showDoneButton){
			   $(doneButton).removeClass('hide');
			}else{
				$(doneButton).addClass('hide');
			}
		});
		$(messageHtml).find(".multiCheckboxBtn").on('click',function(e){
			var msgData=$(messageHtml).data();
			if(msgData.message[0].component.payload.sliderView===true){
				msgData.message[0].component.payload.sliderView=false;
				chatInitialize.renderMessage(msgData);
				bottomSliderAction("hide");
			}
			msgData.message[0].component.payload.sliderView=false;
				var checkboxSelection = $(e.currentTarget.parentElement).find('.checkInput:checked');
				var selectedValue = [];
				var toShowText = [];
				for (var i = 0; i < checkboxSelection.length; i++) {
					selectedValue.push($(checkboxSelection[i]).attr('value'));
					toShowText.push($(checkboxSelection[i]).attr('text'));
				}
				$('.chatInputBox').text('Here are the selected items ' + ': '+ selectedValue.toString());
				
				chatInitialize.sendMessage($('.chatInputBox'),'Here are the selected items '+': '+ toShowText.toString());
				$(messageHtml).find(".multiCheckboxBtn").hide();
				$(messageHtml).find(".advancedMultiSelectScroll").css({"pointer-events":"none"});
				$(messageHtml).find(".advancedMultiSelectScroll").css({"overflow":"hidden"});
			
		})
		/* Advanced multi select checkbox click functions ends here */
  
		/* New List Template click functions starts here*/
		$(messageHtml).off('click', '.listViewTmplContent .seeMoreList').on('click', '.listViewTmplContent .seeMoreList', function (e) {
			if($(".list-template-sheet").length!==0){
				$(".list-template-sheet").remove();
				listViewTabs(e);
			}
			else if($(".list-template-sheet").length===0){
				listViewTabs(e);
			}
		});
		$(messageHtml).find(".listViewLeftContent").on('click', function (e) {
		 if($(this).attr('data-url')){
			var a_link = $(this).attr('data-url');
			if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
				a_link = "http:////" + a_link;
			}
			var _tempWin = window.open(a_link, "_blank");
		 }else{
			var _innerText = $(this).attr('data-value') || $(this).attr('data-title');
			var postBack = $(this).attr('data-title');
			chatInitialize.sendMessage($('.chatInputBox').text(_innerText), postBack);
			$(".listViewTmplContentBox").css({"pointer-events":"none"});
		 }
		 });
		/* New List Template click functions ends here*/
		$(messageHtml).off('click', '.listViewItemValue.actionLink,.listTableDetailsDesc').on('click', '.listViewItemValue.actionLink,.listTableDetailsDesc', function () {
			var _self=this;
			valueClick(_self);
		});
		$(messageHtml).find(".ratingMainComponent").off('click','[type*="radio"]').on('click','[type*="radio"]',function (e) {
			var _innerText=$(e.currentTarget).attr('value');
			var msgData=$(messageHtml).data();
			var silderValue=msgData.message[0].component.payload.sliderView;
			if($("label.active")){
				$("label").removeClass("active");
			}
			for(i=parseInt(_innerText);i>0;i--){
				$('label[for="'+i+'-stars"]').addClass("active");
			}
			if(_innerText==msgData.message[0].component.payload.starArrays.length){
		        var messageTodisplay=msgData.message[0].component.payload.messageTodisplay;
				$(".suggestionsMainComponent").remove();
				$(".ratingStar").remove();
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				$(".kore-action-sheet").find(".ratingMainComponent").append('<div class="ratingStar">'+messageTodisplay+'</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
			}else{
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				$(".ratingStar").remove();
			    if($(".suggestionsMainComponent").length > 0){
				$(".suggestionsMainComponent").remove();
				$(".kore-action-sheet").find(".ratingMainComponent").append(customTemplate.prototype.suggestionComponent());
			    }else{
                $(".kore-action-sheet").find(".ratingMainComponent").append(customTemplate.prototype.suggestionComponent());
				}
			}
			if(silderValue===false){
				chatInitialize.sendMessage($('.chatInputBox').text(_innerText), _innerText);
				$(".ratingMainComponent").css({"pointer-events":"none"});
			  }
			$(".buttonTmplContent .ratingMainComponent .submitBtn").click(function(){
				msgData.message[0].component.payload.sliderView=false;
				if(_innerText == msgData.message[0].component.payload.starArrays.length){
					var messageTodisplay=msgData.message[0].component.payload.messageTodisplay;
					chatInitialize.renderMessage(msgData);
					chatInitialize.sendMessage($('.chatInputBox').text(_innerText +" :"+ messageTodisplay), _innerText +" :"+ messageTodisplay);
				}else if($(".suggestionInput").val()==""){
					chatInitialize.renderMessage(msgData);
					chatInitialize.sendMessage($('.chatInputBox').text(_innerText),_innerText)
				}else{
					var messageDisplay=$(".suggestionInput").val();
					chatInitialize.renderMessage(msgData);
					chatInitialize.sendMessage($('.chatInputBox').text(_innerText +" :"+ messageDisplay),_innerText +" :"+ messageDisplay);
				}
				bottomSliderAction("hide");
				msgData.message[0].component.payload.sliderView=true;
			   });
		});
		$(messageHtml).find(".buttonTmplContent .ratingMainComponent .close-btn").click(function(e){
			bottomSliderAction("hide");
			e.stopPropagation();
		});
		$(messageHtml).find(".emojiComponent,.thumpsUpDownComponent,.numbersComponent").off('click','.emoji-rating').on('click','.emoji-rating',function(e){
			var msgData=$(messageHtml).data();
			var sliderValue=msgData.message[0].component.payload.sliderView;
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
			var emojiValue=$(this).attr("value");
			var dataIdValue = $(this).attr("data-id");
			$(e.currentTarget).addClass("active");
			if($(messageHtml).find(".emojiComponent.version2").length === 0 && $(messageHtml).find(".thumpsUpDownComponent").length === 0 && $(messageHtml).find('.numbersComponent').length === 0){
			if($(this).attr("id")=="rating_1" && $("#rating_1.active")){
				 $("<img class='emojiElement' />").attr('src','libs/images/emojis/gifs/rating_1.gif').appendTo(this)
				 $(e.currentTarget).removeClass("active");
			  }else if($(this).attr("id")=="rating_2" && $("#rating_2.active")){
				$("<img class='emojiElement' />").attr('src','libs/images/emojis/gifs/rating_2.gif').appendTo(this)
				$(e.currentTarget).removeClass("active");
			  }else if($(this).attr("id")=="rating_3" && $("#rating_3.active")){
				$("<img class='emojiElement' />").attr('src','libs/images/emojis/gifs/rating_3.gif').appendTo(this)
				$(e.currentTarget).removeClass("active");
			  }else if($(this).attr("id")=="rating_4" && $("#rating_4.active")){
				$("<img class='emojiElement' />").attr('src','libs/images/emojis/gifs/rating_4.gif').appendTo(this)
				$(e.currentTarget).removeClass("active");
			  }else if($(this).attr("id")=="rating_5" && $("#rating_5.active")){
				$("<img class='emojiElement' />").attr('src','libs/images/emojis/gifs/rating_5.gif').appendTo(this)
				$(e.currentTarget).removeClass("active");
			  }
			}
			if(msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.view !== "CSAT" && msgData.message[0].component.payload.view !== "NPS" && msgData.message[0].component.payload.view !== "ThumbsUpDown")){
			if($(this).attr("value") < "5"){
				$(".ratingStar").remove();
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				if($(".suggestionsMainComponent").length > 0){
					$(".suggestionsMainComponent").remove();
				}
				if ($(".kore-action-sheet").find(".thumpsUpDownComponent").length) {
					$(".kore-action-sheet").find(".thumpsUpDownComponent").append(customTemplate.prototype.suggestionComponent());
				} else if ($(".kore-action-sheet").find(".numbersComponent").length) {
					$(".kore-action-sheet").find(".numbersComponent").append(customTemplate.prototype.suggestionComponent());
				} else {
					$(".kore-action-sheet").find(".emojiComponent").append(customTemplate.prototype.suggestionComponent());
				}

		    }else{
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				if($(".ratingStar").length > 0){
					$(".ratingStar").remove();
				}
				var messageTodisplay=msgData.message[0].component.payload.messageTodisplay;
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
				chatInitialize.renderMessage(msgData);
				chatInitialize.sendMessage($('.chatInputBox').text(emojiValue),emojiValue);
				bottomSliderAction("hide");
				msgData.message[0].component.payload.sliderView=true;
			}
			if(sliderValue===false){
				chatInitialize.sendMessage($('.chatInputBox').text(emojiValue),emojiValue);
				$(".rating-main-component").css({"pointer-events":"none"});
			}
			$(".emojiComponent,.thumpsUpDownComponent,.numbersComponent").off('click','.submitBtn').on('click','.submitBtn',function(e){
				msgData.message[0].component.payload.sliderView=false;
				if(emojiValue=="5"){
					var messageTodisplay=msgData.message[0].component.payload.messageTodisplay
					chatInitialize.renderMessage(msgData);
				  chatInitialize.sendMessage($('.chatInputBox').text(emojiValue +" :"+ messageTodisplay),"Rating"+': '+ emojiValue +" and "+ messageTodisplay);
				}else if($(".suggestionInput").val()==""){
					chatInitialize.renderMessage(msgData);
					chatInitialize.sendMessage($('.chatInputBox').text(emojiValue),emojiValue);
				}else{
					var messageDisplay=$(".suggestionInput").val();
					chatInitialize.renderMessage(msgData);
					if(messageDisplay){
						chatInitialize.sendMessage($('.chatInputBox').text(emojiValue +" :"+ messageDisplay),emojiValue +" :"+ messageDisplay);
						}else{
							chatInitialize.sendMessage($('.chatInputBox').text(emojiValue),emojiValue);
						}
				}
				bottomSliderAction("hide");
				msgData.message[0].component.payload.sliderView=true;
		  });
		
		});
		$(messageHtml).find(".buttonTmplContent .emojiComponent .close-btn,.buttonTmplContent .thumpsUpDownComponent .close-btn,.buttonTmplContent .numbersComponent .close-btn").click(function(e){
			bottomSliderAction("hide");
			
			e.stopPropagation();
		});

		$(".kore-chat-window").off('click','.clickableButton').on('click','.clickableButton',function(e) {
			let typeCheck = $(this).attr("type");
			if (typeCheck == "postback") {
				let payload = $(this).attr("payload");
				$('.chatInputBox').text(payload);
				chatInitialize.sendMessage($('.chatInputBox'), $(this).text());
			} else {
				let a_link = $(this).attr("url");
				chatInitialize.openExternalLink(a_link);
			}
			var modal = document.getElementById('myPreviewModal');
            modal.style.display = "none";
		});
	
	}; 
	    customTemplate.prototype.suggestionComponent=function(){
            return '<div class="suggestionsMainComponent">\
	<div class="suggestionsHeading">What can be improved?</div>\
	<div class="suggestionBox">\
	<textarea type="text" class="suggestionInput" placeholder="Add Suggestions"></textarea></div>\
	<div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>\
	</div>'
		}
	   
		this.bottomSliderAction = function(action, appendElement){
		$(".kore-action-sheet").animate({ height: 'toggle' });
		if(action=='hide'){
		$(".kore-action-sheet").innerHTML='';
		$(".kore-action-sheet").addClass("hide");
		} else {
		$(".kore-action-sheet").removeClass("hide");
		$(".kore-action-sheet .actionSheetContainer").empty();
		setTimeout(function(){
		$(".kore-action-sheet .actionSheetContainer").append(appendElement);
		},200);
		
		}
		}
		/* Action sheet Template functions starts here*/
		this.listViewTabs = function (e) {
			var msgData = $(e.currentTarget).closest("li.fromOtherUsers.with-icon.listView").data();
			if(msgData.message[0].component.payload.seeMore){
				msgData.message[0].component.payload.seeMore=false;
			   }
			var listValues = $(customTemplate.prototype.getChatTemplate("actionSheetTemplate")).tmpl({
				'msgData': msgData,
				'dataItems':  msgData.message[0].component.payload.moreData[Object.keys(msgData.message[0].component.payload.moreData)[0]],
				'tabs': Object.keys(msgData.message[0].component.payload.moreData),
				'helpers': helpers
			});

			$($(listValues).find(".tabs")[0]).addClass("active");
			if($(".kore-action-sheet").length === 0){
				$('.kore-chat-window').remove('.kore-action-sheet');
				var actionSheetTemplate='<div class="kore-action-sheet hide">\
				<div class="actionSheetContainer"></div>\
				</div>';
				$('.kore-chat-window').append(actionSheetTemplate);
			}
			$(".kore-action-sheet").append(listValues);
			$(".kore-action-sheet .list-template-sheet").removeClass("hide");
			this.bottomSliderAction('show',$(".list-template-sheet"));
			$(".kore-action-sheet .list-template-sheet .displayMonth .tabs").on('click', function (e) {
				var _selectedTab = $(e.target).text();
	
				var viewTabValues = $(customTemplate.prototype.getChatTemplate("actionSheetTemplate")).tmpl({
					'msgData': msgData,
					'dataItems': msgData.message[0].component.payload.moreData[_selectedTab],
					'tabs': Object.keys(msgData.message[0].component.payload.moreData),
					'helpers': helpers
				});
	            $(".list-template-sheet .displayMonth").find(".tabs").removeClass("active");
				$(".list-template-sheet .displayMonth").find(".tabs[data-tabid='" + _selectedTab + "']").addClass("active");
				$(".list-template-sheet .displayListValues").html($(viewTabValues).find(".displayListValues"));
				$(".kore-action-sheet .list-template-sheet .listViewLeftContent").on('click', function () {
					var _self=this;
				    valueClick(_self);
					});
			});
			$(".kore-action-sheet .list-template-sheet .close-button").on('click', function (event) {
				bottomSliderAction('hide');
			});
			$(".kore-action-sheet .list-template-sheet .listViewLeftContent").on('click', function () {
				var _self=this;
				valueClick(_self);
			});
		};
		this.valueClick=function(_self,actionObj){
			if(actionObj){
			if (actionObj.type === "url") {
				window.open(actionObj.url, "_blank");
				return;
			  }
			  if (actionObj.payload) {
				  var _innerText = actionObj.payload;
				  var eData={};
				eData.payload = _self.innerText || actionObj.title;
				chatInitialize.sendMessage($('.chatInputBox').text(_innerText), eData.payload);
			  }
			  if(_self && _self.hasClass("dropdown-contentWidgt")){
				$(_self).hide();
			}
			}else{
			if($(_self).attr('data-url')||$(_self).attr('url')){
				var a_link = $(_self).attr('data-url')||$(_self).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				var _tempWin = window.open(a_link, "_blank");
			 }else{
				var _innerText= $(_self).attr('data-value') || $(_self).attr('data-title');
				var postBack=$(_self).attr('data-title');
				chatInitialize.sendMessage($('.chatInputBox').text(_innerText), postBack);
			 $(".kore-action-sheet .list-template-sheet").animate({ height: 'toggle' });
             bottomSliderAction("hide");
			 $(".listViewTmplContentBox").css({"pointer-events":"none"});
			 }
			}
			
		}
		/* Action sheet Template functions ends here*/
	
	/* advanced List template actions start here */
	customTemplate.prototype.advancedListTemplateEvents = function (ele, msgData) {
		if (this.chatInitialize) {
			chatInitialize = this.chatInitialize;
		}
		if(this.helpers){
			helpers = this.helpers;
		}
		var me = this;
		var $ele = $(ele);
		var messageData = $(ele).data();
		if (msgData.message[0].component.payload.listViewType == "nav") {
			var navHeadersData = msgData.message[0].component.payload.navHeaders;
			if (msgData.message[0].component.payload.navHeaders && msgData.message[0].component.payload.navHeaders.length) {
				var selectedNav = msgData.message[0].component.payload.navHeaders[0];
				$ele.find('.month-tab#' + selectedNav.id).addClass('active-month');
			}
			for (var i = 0; i < navHeadersData.length; i++) {
				if (navHeadersData[i].id != selectedNav.id) {
					$ele.find('.multiple-accor-rows#' + navHeadersData[i].id).addClass('hide');
				}
			}
		}
		$ele.off('click', '.advanced-list-wrapper .callendar-tabs .month-tab').on('click', '.advanced-list-wrapper .callendar-tabs .month-tab', function (e) {
			var messageData = $(ele).data();
			var selectedTabId = e.currentTarget.id;
			if (messageData && messageData.message[0].component.payload.listViewType == "nav" && messageData.message[0].component.payload.navHeaders) {
				var navHeadersData = messageData.message[0].component.payload.navHeaders;
				for (var i = 0; i < navHeadersData.length; i++) {
					if (selectedTabId != navHeadersData[i].id) {
						if (!$ele.find('.advanced-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).hasClass('hide')) {
							$ele.find('.advanced-list-wrapper .advanced-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).addClass('hide');
							$ele.find('.advanced-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).css({ 'display': 'none' });
						}
					}
				}
				for (var i = 0; i < navHeadersData.length; i++) {
					if (navHeadersData[i].id == selectedTabId) {
						$ele.find('.advanced-list-wrapper .month-tab#' + navHeadersData[i].id).addClass('active-month');
					} else if (navHeadersData[i].id != selectedTabId) {
						$ele.find('.advanced-list-wrapper .month-tab#' + navHeadersData[i].id).removeClass('active-month')
					}
				}
			}
			if ($ele.find('.advanced-list-wrapper .multiple-accor-rows#' + selectedTabId).addClass('hide')) {
				$ele.find('.advanced-list-wrapper .multiple-accor-rows#' + selectedTabId).removeClass('hide')
				$ele.find('.advanced-list-wrapper .multiple-accor-rows#' + selectedTabId).css({ 'display': 'block' });
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option', function (e) {
			var obj = this;
			e.preventDefault();
			e.stopPropagation();
			if ($(obj).find('.option-input').attr('type') == "radio") {
				$(obj).parent().find('.option.selected-item').removeClass('selected-item')
			}
			if (!$(obj).find('.option-input').prop('checked')) {
				$(obj).find('.option-input').prop('checked', true);
				$(obj).addClass('selected-item');
			} else {
				if ($(obj).hasClass('selected-item')) {
					$(obj).removeClass('selected-item');
				}
				$(obj).find('.option-input').prop('checked', false);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input', function (e) {
			var obj = this;
			var selectedId = e.currentTarget.id;
			e.stopPropagation();
			e.preventDefault();
			if (!$('#' + selectedId).prop('checked')) {
				$('#' + selectedId).prop('checked', true);
				$(obj).parent().addClass('selected-item');
			} else {
				if ($(obj).parent().hasClass('selected-item')) {
					$(obj).parent().removeClass('selected-item');
				}
				$('#' + selectedId).prop('checked', false);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top', function (e) {
			var obj = this;
			var parentElement = e.currentTarget.parentElement;
			var parentElementChildrenArray = parentElement.children;
			var childElementCount = parentElementChildrenArray[1].childElementCount;
			var actionObj = $(e.currentTarget).parent().attr('actionObj');
			var parsedActionObj = JSON.parse(actionObj);
			var type= parentElement.getAttribute('type');
			if (type && type == "postback" || type == "text") {
				$('.chatInputBox').text(parsedActionObj.payload ||parsedActionObj.title);
				var _innerText = parsedActionObj.renderMessage || parsedActionObj.title;
				bottomSliderAction('hide');
				chatInitialize.sendMessage($('.chatInputBox'), _innerText);
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
			} else if (type && type == "url" || type == "web_url") {
				if ($(this).attr('msgData') !== undefined) {
					var msgData;
					try {
						msgData = JSON.parse($(this).attr('msgData'));
					} catch (err) {

					}
					if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
						if (msgData.message[0].component.formData) {
							msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
						}
						chatInitialize.renderWebForm(msgData);
						return;
					}
				}
				var a_link = parsedActionObj.url;
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatInitialize.openExternalLink(a_link);
			}else{
				if ((childElementCount > 0) && parsedActionObj.isAccordian) {
					$(obj).find(".action-icon-acc").toggleClass("rotate-icon");
					$(obj).closest('.multiple-accor-rows').find(".accor-inner-content").toggle(300);
				}
				var iconRotation;
				if(parsedActionObj && parsedActionObj.headerOptions && parsedActionObj.headerOptions.length){
					for(var i=0;i<parsedActionObj.headerOptions.length;i++){
						var val = parsedActionObj.headerOptions[i];
						if(val && val.type==='icon' && val.iconRotation){
							iconRotation = val.iconRotation;
						}
					}
					if($(obj).find(".action-icon-acc").hasClass('rotate-icon')){
						$(obj).find(".action-icon-acc.rotate-icon").css('transform', 'rotate('+iconRotation+'deg)');
					}else{
						$(obj).find(".action-icon-acc").css('transform', '');
					}
				}
			}


		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .search_icon').on('click', '.advanced-list-wrapper .main-title-text-block .search-block .search_icon', function (e) {
			var obj = this;
			$(obj).parent().find('.input_text').removeClass('hide');
			$(obj).parent().find('.close_icon').removeClass('hide');
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .close_icon').on('click', '.advanced-list-wrapper .main-title-text-block .search-block .close_icon', function (e) {
			var obj = this;
			$(obj).parent().find('.input_text').val('');
			var messageData = $(ele).data();
			if (messageData.message[0].component.payload.listViewType == "nav") {
				var selectedNav = $(obj).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
				var selectedNavId = $(selectedNav).attr('id');
				$(obj).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
					if (!$(this).hasClass('hide')) {
						$(this).css({ 'display': 'block' });
					}
				});
			} else {
				$(obj).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
					if (!$(this).hasClass('hide')) {
						$(this).css({ 'display': 'block' });
					}
				});
			}
			$(obj).parent().find('.input_text').addClass('hide');
			$(obj).parent().find('.close_icon').addClass('hide');
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .input_text').on("keyup", '.advanced-list-wrapper .main-title-text-block .search-block .input_text', function (e) {
			var obj = this;
			var searchText = $(obj).val().toLowerCase();
			var messageData = $(ele).data();
			if (messageData.message[0].component.payload.listViewType == "nav") {
				var selectedNav = $(obj).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
				var selectedNavId = $(selectedNav).attr('id');
				$(obj).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
					$(this).toggle($(this).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
				});
			} else {
				$(obj).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
					$(this).toggle($(this).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
				});
			}
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .filter-sort-block .sort-icon').on("click", '.advanced-list-wrapper .main-title-text-block .filter-sort-block .sort-icon', function (e) {
			var obj = this;
			var seeMoreDiv = $(obj).parent().parent().parent().find('.see-more-data');
			if (!$(obj).attr('type') || $(obj).attr('type') == "asc") {
				$(obj).attr('type', 'desc');
				if (seeMoreDiv && seeMoreDiv.length) {
					$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
						if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).insertBefore($(obj).parent().parent().parent().find('.see-more-data'));
				} else {
					$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
						if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).appendTo($(obj).parent().parent().parent());
				}

			} else if ($(obj).attr('type') == "desc") {
				$(obj).attr('type', 'asc');
				if (seeMoreDiv && seeMoreDiv.length) {
					$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
						if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).insertBefore($(obj).parent().parent().parent().find('.see-more-data'));
				} else {
					$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
						if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).appendTo($(obj).parent().parent().parent());
				}

			}
		});
		$ele.off('click', '.advanced-list-wrapper .see-more-data').on("click", '.advanced-list-wrapper .see-more-data', function (e) {
			var messageData = $(ele).data();
			if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'slider') {
				if ($(".list-template-sheet").length !== 0) {
					$(".list-template-sheet").remove();
				} else if ($(".list-template-sheet").length === 0) {
					if (messageData.message[0].component.payload.seeMore) {
						messageData.message[0].component.payload.seeMore = false;
						messageData.message[0].component.payload.listItemDisplayCount = msgData.message[0].component.payload.listItems.length;
					}
					if (!(msgData.message[0].component.payload.sliderView)) {
						msgData.message[0].component.payload.sliderView = true;
					}
					messageHtml = $(customTemplate.prototype.getChatTemplate("advancedListTemplate")).tmpl({
						'msgData': messageData,
						'helpers': helpers,
					});
					$(messageHtml).find(".advanced-list-wrapper .extra-info").hide();
					bottomSliderAction('show', messageHtml);
					customTemplate.prototype.advancedListTemplateEvents(messageHtml, messageData);
				}
			} else if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'inline') {
				if(messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.listViewType === 'button'){
					var hiddenElementsArray = $(ele).find('.tag-name.hide');
				}else{
					var hiddenElementsArray = $(ele).find('.multiple-accor-rows.hide');
				}
				for (var i = 0; i < hiddenElementsArray.length; i++) {
					if ($(hiddenElementsArray[i]).hasClass('hide')) {
						$(hiddenElementsArray[i]).removeClass('hide');
					}
				}
				$(ele).find('.see-more-data').addClass('hide');
			} else if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'modal') {
				var modal = document.getElementById('myPreviewModal');
				$(".largePreviewContent").empty();
				modal.style.display = "block";
				var span = document.getElementsByClassName("closeElePreview")[0];
				$(span).addClass('hide');
				if (messageData.message[0].component.payload.seeMore) {
					messageData.message[0].component.payload.seeMore = false;
					messageData.message[0].component.payload.openPreviewModal = true;
					messageData.message[0].component.payload.listItemDisplayCount = msgData.message[0].component.payload.listItems.length+1;
				}
				messageHtml = $(customTemplate.prototype.getChatTemplate("advancedListTemplate")).tmpl({
					'msgData': messageData,
					'helpers': helpers,
				});
				$(messageHtml).find(".advanced-list-wrapper .extra-info").hide();
				$(".largePreviewContent").append(messageHtml);
				var closeElement =  document.getElementsByClassName('advancedlist-template-close')[0];
				closeElement.onclick = function () {
					modal.style.display = "none";
					$(".largePreviewContent").removeClass("addheight");
				}
				$(".largePreviewContent .fromOtherUsers ").css('list-style','none');
				customTemplate.prototype.advancedListTemplateEvents(messageHtml, messageData);
			}
			var dropdownElements = $ele.find('.advanced-list-wrapper .more-button-info');
			for(var i=0;i<dropdownElements.length;i++){
				if( $(dropdownElements[i]).is(':visible')){
					 $(dropdownElements[i]).toggle(300);
				}
			}
		});
		$ele.off('click', '.advanced-list-wrapper .close-btn').on("click", '.advanced-list-wrapper .close-btn', function (e) {
			bottomSliderAction('hide');
			e.stopPropagation();
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn', function (e) {
			var obj = this;
			e.stopPropagation();
			var actionObj = $(obj).attr('actionObj');
			var actionObjParse = JSON.parse(actionObj);
			if ((actionObjParse && actionObjParse.seeMoreAction == "dropdown") || (actionObjParse && !actionObjParse.seeMoreAction)) {
				if ($(obj).parent().find('.more-button-info')) {
					$(obj).parent().find(".more-button-info").toggle(300);
				}
			}
			else if (actionObjParse && actionObjParse.seeMoreAction == "inline") {
				var parentElemnt = $(obj).parent();
				var hiddenElementsArray = $(parentElemnt).find('.button_.hide');
				for (var i = 0; i < hiddenElementsArray.length; i++) {
					if ($(hiddenElementsArray[i]).hasClass('hide')) {
						$(hiddenElementsArray[i]).removeClass('hide')
					}
				}
				$(parentElemnt).find('.more-btn').addClass('hide');
			}
			else if (actionObjParse && actionObjParse.seeMoreAction == "slider") {
				var $sliderContent = $('<div class="advancelisttemplate"></div>');
				$sliderContent.append(sliderHeader(actionObjParse))
				$sliderContent.find(".TaskPickerContainer").append(sliderContent(actionObjParse));
				if ($(".kore-action-sheet").hasClass('hide')) {
					bottomSliderAction('show', $sliderContent);
				} else {
					$(".kore-action-sheet").find('.actionSheetContainer').empty();
					$(".kore-action-sheet").find('.actionSheetContainer').append($sliderContent);
				}
				sliderButtonEvents($sliderContent);
				var modal = document.getElementById('myPreviewModal');
				modal.style.display = "none";
				$(".largePreviewContent").empty();
			}
			function sliderHeader(listItem) {
				return '<div class="TaskPickerContainer">\
				<div class="taskMenuHeader">\
					 <button class="closeSheet close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
				   <label class="taskHeading"> '+ listItem.title + ' </label>\
				</div>'
			}
			function sliderContent(listItem) {
				var $taskContent = $('<div class="inner-btns-acc if-full-width-btn"></div>');
				if (listItem && listItem.buttons) {
					var buttonsArray = listItem.buttons;
					buttonsArray.forEach(function (button) {
						var taskHtml = $('<button class="button_" type="' + button.type + '" title="' + button.title + '" value="'+button.payload+'" ><img src="' + button.icon + '">' + button.title + '</button>');
						$taskContent.append(taskHtml)
					});
				}
			return $taskContent;
			}
			function sliderButtonEvents(sliderContent){
				sliderContent.off('click','.inner-btns-acc .button_').on('click','.inner-btns-acc .button_',function(e){
					var type = $(this).attr('type');
					if (type) {
						type = type.toLowerCase();
					}
					if (type == "postback" || type == "text") {
						$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
						var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
						if ($('.largePreviewContent .advanced-list-wrapper')) {
							var modal = document.getElementById('myPreviewModal');
							$(".largePreviewContent").empty();
							modal.style.display = "none";
							$(".largePreviewContent").removeClass("addheight");
						}
						bottomSliderAction('hide');
						chatInitialize.sendMessage($('.chatInputBox'), _innerText);
						$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
					} else if (type == "url" || type == "web_url") {
						if ($(this).attr('msgData') !== undefined) {
							var msgData;
							try {
								msgData = JSON.parse($(this).attr('msgData'));
							} catch (err) {
		
							}
							if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
								if (msgData.message[0].component.formData) {
									msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
								}
								chatInitialize.renderWebForm(msgData);
								return;
							}
						}
						var a_link = $(this).attr('url');
						if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
							a_link = "http:////" + a_link;
						}
						chatInitialize.openExternalLink(a_link);
					}
				});
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn', function (e) {
			var obj = this;
			e.stopPropagation();
			if ($(obj).parent()) {
				$(obj).parent().toggle(300);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon', function (e) {
			var obj = this;
			e.stopPropagation();
			if ($(obj).find('.more-button-info')) {
				$(obj).find(".more-button-info").toggle(300);
			}
		});
		$(".kore-action-sheet").off('click', ".advancelisttemplate .TaskPickerContainer .close-button").on('click', ".advancelisttemplate .TaskPickerContainer .close-button", function (event) {
            bottomSliderAction('hide');
        });
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more').on("click", '.advanced-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more', function (e) {
			var modal = document.getElementById('myPreviewModal');
			$(".largePreviewContent").empty();
			modal.style.display = "block";
			var span = document.getElementsByClassName("closeElePreview")[0];
			span.onclick = function () {
				modal.style.display = "none";
				$(".largePreviewContent").empty();
				$(".largePreviewContent").removeClass("addheight");
			}
			var parent = $(e.currentTarget).closest('.multiple-accor-rows');
			var actionObj = $(parent).attr('actionObj');
			var parsedActionObj = JSON.parse(actionObj);
			$(".largePreviewContent").append($(buildPreviewModalTemplate(parsedActionObj)).tmpl({
				listItem: parsedActionObj
			}));
			bindModalPreviewEvents();



			function bindModalPreviewEvents() {
				if ($(".largePreviewContent")) {
					$(".largePreviewContent").find('.multiple-accor-rows').css({ 'border-bottom': '0' });
					$(".largePreviewContent").find('.accor-inner-content').css({ display: 'block' });
				}
			}

			function buildPreviewModalTemplate(listItem) {
				var modalPreview = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
				<div class="advanced-list-wrapper img-with-title with-accordion if-multiple-accordions-list">\
					<div class="multiple-accor-rows">\
							<div class="accor-inner-content">\
									<div class="inner-acc-table-sec">\
										{{each(i,list) listItem.tableListData}}\
											{{if list.rowData && list.rowData.length}}\
												<div class="table-sec {{if listItem.type && listItem.type == "column"}}if-label-table-columns{{/if}}">\
													{{each(key,row) list.rowData}}\
															{{if !row.icon}}\
																<div class="column-table">\
																	<div class="header-name">${row.title}</div>\
																	<div class="title-name">${row.description}</div>\
																</div>\
																{{else}}\
																	<div class="column-table">\
																		<div class="labeld-img-block {{if row.iconSize}}${row.iconSize}{{/if}}">\
																			<img src="${row.icon}">\
																		</div>\
																		<div class="label-content">\
																			<div class="header-name">${row.title}</div>\
																			<div class="title-name">${row.description}</div>\
																		</div>\
																	</div>\
															{{/if}}\
													{{/each}}\
												</div>\
											{{/if}}\
										{{/each}}\
									</div>\
							</div>\
					</div>\
			</div>\
			</script>'
				return modalPreview;
			}
		});

		$ele.off('click', '.advanced-list-wrapper .button_,.advanced-list-wrapper .inner-btns-acc .button_,.advanced-list-wrapper .tags-data .tag-name,.advanced-list-wrapper .btn_group .submitBtn,.advanced-list-wrapper .btn_group .cancelBtn,.advanced-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_').on("click", '.advanced-list-wrapper .button_,.advanced-list-wrapper .inner-btns-acc .button_,.advanced-list-wrapper .tags-data .tag-name,.advanced-list-wrapper .btn_group .submitBtn,.advanced-list-wrapper .btn_group .cancelBtn,.advanced-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var type = $(this).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == "postback" || type == "text") {
				$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
				var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
				if ($('.largePreviewContent .advanced-list-wrapper')) {
					var modal = document.getElementById('myPreviewModal');
					$(".largePreviewContent").empty();
					modal.style.display = "none";
					$(".largePreviewContent").removeClass("addheight");
				}
				bottomSliderAction('hide');
				chatInitialize.sendMessage($('.chatInputBox'), _innerText);
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
			} else if (type == "url" || type == "web_url") {
				if ($(this).attr('msgData') !== undefined) {
					var msgData;
					try {
						msgData = JSON.parse($(this).attr('msgData'));
					} catch (err) {

					}
					if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
						if (msgData.message[0].component.formData) {
							msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
						}
						chatInitialize.renderWebForm(msgData);
						return;
					}
				}
				var a_link = $(this).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatInitialize.openExternalLink(a_link);
			}
			if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'submitBtn') {
				var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
				var selectedValue = [];
				var toShowText = [];
				for (var i = 0; i < checkboxSelection.length; i++) {
					selectedValue.push($(checkboxSelection[i]).attr('value'));
					toShowText.push($(checkboxSelection[i]).attr('text'));
				}
				if(selectedValue && selectedValue.length){
					$('.chatInputBox').text($(this).attr('title') + ': ' + selectedValue.toString());
				}else{
					$('.chatInputBox').text($(this).attr('title'));
				}
				chatInitialize.sendMessage($('.chatInputBox'), toShowText.toString());
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
				bottomSliderAction('hide');
			}
			if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'cancelBtn') {
				var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
				var selectedValue = [];
				var toShowText = [];
				for (var i = 0; i < checkboxSelection.length; i++) {
					$(checkboxSelection[i]).prop('checked', false);
					if (checkboxSelection[i].parentElement.classList.contains('selected-item')) {
						checkboxSelection[i].parentElement.classList.remove('selected-item')
					}
				}
			}
           var dropdownElements = $ele.find('.advanced-list-wrapper .more-button-info');
		   for(var i=0;i<dropdownElements.length;i++){
			   if( $(dropdownElements[i]).is(':visible')){
					$(dropdownElements[i]).toggle(300);
			   }
		   }
		});
	}
	/* advanced List template actions end here */

	/* card template Events starts here */
	customTemplate.prototype.cardTemplateEvents = function (ele, msgData) {
		chatInitialize = this.chatInitialize;
		helpers = this.helpers;
		$(ele).off('click', '.card-template .card-body .card-text-action .card-action-data,.icon').on('click', '.card-template .card-body .card-text-action .card-action-data,.icon', function (e) {
			var obj = this;
			var actionObj = $(obj).parent().attr('actionObj');
			var actionObjParse = JSON.parse(actionObj);
			console.log(actionObjParse);
			e.stopPropagation();
			if (actionObjParse.type && (actionObjParse.type == "dropdown")) {
				if ($(obj).parent().find('.more-button-info')) {
					$(obj).parent().find(".more-button-info").toggle(300);
				}
			}
		});
		$(ele).off('click', '.card-template .card-body .more-button-info .close_btn').on('click', '.card-template .card-body .more-button-info .close_btn', function (e) {
			var obj = this;
			e.stopPropagation();
			if ($(obj).parent().parent().find('.more-button-info')) {
				$(obj).parent().parent().find(".more-button-info").toggle(300);
			}
		});
		$(ele).off('click', '.card-template .card-body,.card-template .card-body .card-btn,.card-template .card-body .card-text-desc').on('click', '.card-template .card-body,.card-template .card-body .card-btn,.card-template .card-body .card-text-desc', function (e) {
			e.stopPropagation();
			var type = $(this).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == 'postback' || type == 'text') {
				var actionObj = $(this).attr('actionObj');
				if (actionObj) {
					var parsedActionObj = JSON.parse(actionObj);
					if (parsedActionObj) {
						var payload = parsedActionObj.default_action.payload;
						$('.chatInputBox').text(payload);
						var renderMessage;
						if (parsedActionObj && parsedActionObj.default_action && parsedActionObj.default_action.title) {
							renderMessage = parsedActionObj.default_action.title;
						} else {
							renderMessage = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
						}
					}

					chatInitialize.sendMessage($('.chatInputBox'), renderMessage);
				} else {
					$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
					var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
					chatInitialize.sendMessage($('.chatInputBox'), _innerText);
				}
				$(ele).find(".card-template").css({ "pointer-events": "none" });
			} else if (type == 'action') {
				var actionObj = $(this).attr('actionObj');
				var parsedActionObj = JSON.parse(actionObj);
				var modal = document.getElementById('myPreviewModal');
				$(".largePreviewContent").empty();
				modal.style.display = "block";
				var span = document.getElementsByClassName("closeElePreview")[0];
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

				function buildCardPreview(card) {
					var cardPreview = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
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
			} else if (type === 'url' || type == 'web_url') {
				var a_link = $(this).attr('title');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatInitialize.openExternalLink(a_link);
			}
		});

	}
	/* card template Events ends here */

		/* proposeTimesTemplateBindEvents starts here */
	customTemplate.prototype.proposeTimesTemplateBindEvents = function (ele, msgData) {
		if (this.chatInitialize) {
			chatInitialize = this.chatInitialize;
		}
		if(this.helpers){
			helpers = this.helpers;
		}
		var me = this;
		var $ele = $(ele);
		var messageData = $(ele).data();
		$ele.off('click', '.action-buttons .propoese-element-button,.propose-template .propse-times-elements .element').on("click", '.action-buttons .propoese-element-button,.propose-template .propse-times-elements .element', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var type = $(this).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type !== 'postback') {
				getproposeActionSheetTemplate();
				function getproposeActionSheetTemplate() {
					var msgData = $ele.data();
					var proposeAtionSheetTemplate = $(customTemplate.prototype.getChatTemplate("proposeActionSheetTemplate")).tmpl({
						'msgData': msgData,
						'data': msgData.message[0].component.payload.moreOptions[0],
						'helpers':helpers
					});
					proposeAtionSheetTemplateEvents(proposeAtionSheetTemplate, msgData)
					$(".kore-action-sheet").empty();
					$(".kore-action-sheet").append(proposeAtionSheetTemplate);
					$(".kore-action-sheet .list-template-sheet").removeClass("hide");
					var navTabsArray = $(".kore-action-sheet .propose-action-sheet-template").find('.header-tabs .tab-title');
					$(navTabsArray[0]).addClass('active-tab')
					this.bottomSliderAction('show', $(".list-template-sheet"));

					function proposeAtionSheetTemplateEvents(ele, msgData) {
						var me = this;
						$(ele).off('click', '.close-button').on("click", '.close-button', function (e) {
							me.bottomSliderAction('hide');
						});
						$(ele).off('click', '.header-tabs .tab-title').on("click", '.header-tabs .tab-title', function (e) {
							var obj = this;
							var selectedTabId = obj.getAttribute('id');
							var navTabsArray = $(ele).find('.header-tabs .tab-title');
							var actionObj = obj.getAttribute('actionObj');
							for (var i = 0; i < navTabsArray.length; i++) {
								$(navTabsArray[i]).removeClass('active-tab');
							}
							$(this).addClass('active-tab');
							var parsedActionObj = JSON.parse(actionObj);
							var proposeAtionSheetTemplate = $(customTemplate.prototype.getChatTemplate("proposeActionSheetTemplate")).tmpl({
								'msgData': msgData,
								'data': parsedActionObj,
								'helpers':helpers
							});
							//proposeAtionSheetTemplateEvents(proposeAtionSheetTemplate, msgData);
							$(".kore-action-sheet .propose-action-sheet-template .tab-container").html($(proposeAtionSheetTemplate).find(".tab-container"));
							// $(".kore-action-sheet").empty();
							// $(".kore-action-sheet").append(proposeAtionSheetTemplate);
							$(".kore-action-sheet .propose-action-sheet-template").find('#' + selectedTabId).addClass('active-tab');
						});
						$(ele).off('click', '.tab-container .tab-content .tab-elements .option').on("click", '.tab-container .tab-content .tab-elements .option', function (e) {
							var obj = this;
							if (!$(obj).find('.option-input').prop('checked')) {
								$(obj).find('.option-input').prop('checked', true);
								$(obj).addClass('selected-item');
							} else {
								if ($(obj).hasClass('selected-item')) {
									$(obj).removeClass('selected-item');
								}
								$(obj).find('.option-input').prop('checked', false);
							}
						});
						$(ele).off('click', '.tab-container .tab-content .action-buttons .s-button').on("click", '.tab-container .tab-content .action-buttons .s-button', function (e) {
							var obj = this;
							var inputElements =  $(obj).closest('.tab-content').find('.tab-elements .kr_sg_checkbox')
							for(var i=0;i<inputElements.length ; i++){
								if($(inputElements[i]).hasClass('selected-item')){
									$(inputElements[i]).removeClass('selected-item')
								}
								if($(inputElements[i]).find('.option-input').prop('checked')){
									$(inputElements[i]).find('.option-input').prop('checked',false)
								}
							}
						});
						$(ele).off('click', '.tab-container .tab-content .action-buttons .p-button').on("click", '.tab-container .tab-content .action-buttons .p-button', function (e) {
							var obj = this;
							var selectedValue = [];
							var toShowText = [];
							var inputElements =  $(obj).closest('.tab-content').find('.tab-elements .kr_sg_checkbox .option-input:checked');
                            for(var i=0;i<inputElements.length;i++){
								selectedValue.push($(inputElements[i]).attr('value'));
								toShowText.push($(inputElements[i]).attr('text'));
							}
						    if(selectedValue && selectedValue.length){
								$('.chatInputBox').text($(this).attr('title') + ': ' + selectedValue.toString());
							}else{
								$('.chatInputBox').text($(this).attr('title'));
							}
							chatInitialize.sendMessage($('.chatInputBox'), toShowText.toString());
							bottomSliderAction('hide');
						});
					}
				}
			}else if(type == 'postback'){
				$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
				var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
				chatInitialize.sendMessage($('.chatInputBox'), _innerText);
				$ele.find('.propose-template').css({"pointer-events":"none"});
			}

		});
	}
		/* proposeTimesTemplateBindEvents ends here */

	/* default card template events starts here */
	customTemplate.prototype.defaultCardTemplateEvents = function (ele, msgData) {
		chatInitialize = this.chatInitialize;
		helpers = this.helpers;
		var $ele = $(ele);
		var messageData = $(ele).data();
		$ele.off('click', '.default-card-elements .element-content .accor-inner-content .inner-btns-acc .more-btn').on("click", '.default-card-elements .element-content .accor-inner-content .inner-btns-acc .more-btn', function (e) {
			var obj = this;
			e.stopPropagation();
			var actionObj = $(obj).attr('actionObj');
			var actionObjParse = JSON.parse(actionObj);
			if ((actionObjParse && actionObjParse.seeMoreAction == "dropdown") || (actionObjParse && !actionObjParse.seeMoreAction)) {
				if ($(obj).parent().find('.more-button-info')) {
					$(obj).parent().find(".more-button-info").toggle(300);
				}
			}
			else if (actionObjParse && actionObjParse.seeMoreAction == "inline") {
				var parentElemnt = $(obj).parent();
				var hiddenElementsArray = $(parentElemnt).find('.button_.hide');
				for (var i = 0; i < hiddenElementsArray.length; i++) {
					if ($(hiddenElementsArray[i]).hasClass('hide')) {
						$(hiddenElementsArray[i]).removeClass('hide')
					}
				}
				$(parentElemnt).find('.button_.more-btn').addClass('hide');
			}
			else if (actionObjParse && actionObjParse.seeMoreAction == "slider") {
				var $sliderContent = $('<div class="default-cardtmplate"></div>');
				$sliderContent.append(sliderHeader(actionObjParse))
				$sliderContent.find(".TaskPickerContainer").append(sliderContent(actionObjParse));
				if ($(".kore-action-sheet").hasClass('hide')) {
					bottomSliderAction('show', $sliderContent);
				} else {
					$(".kore-action-sheet").find('.actionSheetContainer').empty();
					$(".kore-action-sheet").find('.actionSheetContainer').append($sliderContent);
				}
				sliderButtonEvents($sliderContent);
				var modal = document.getElementById('myPreviewModal');
				modal.style.display = "none";
				$(".largePreviewContent").empty();
			}
		});
		$ele.off('click', '.default-card-elements .element-content .accor-inner-content .inner-btns-acc .more-button-info .close_btn').on("click", '.default-card-elements .element-content .accor-inner-content .inner-btns-acc .more-button-info .close_btn', function (e) {
			var obj = this;
			e.stopPropagation();
			if ($(obj).parent()) {
				$(obj).parent().toggle(300);
			}
		});
		$ele.off('click', '.default-card-elements .button_,.default-card-elements .inner-btns-acc .button_,.default-card-elements .tags-data .tag-name,.default-card-elements .btn_group .submitBtn,.default-card-elements .btn_group .cancelBtn,.default-card-elements .details-content .text-info,.default-card-elements .inner-btns-acc .button_,.default-card-elements .filter-icon .button_').on("click", '.default-card-elements .button_,.default-card-elements .inner-btns-acc .button_,.advanced-list-wrapper .tags-data .tag-name,.default-card-elements .btn_group .submitBtn,.default-card-elements .btn_group .cancelBtn,.default-card-elements .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var type = $(this).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == "postback" || type == "text") {
				$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
				var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
				if ($('.largePreviewContent .default-card-elements')) {
					var modal = document.getElementById('myPreviewModal');
					$(".largePreviewContent").empty();
					modal.style.display = "none";
					$(".largePreviewContent").removeClass("addheight");
				}
				bottomSliderAction('hide');
				chatInitialize.sendMessage($('.chatInputBox'), _innerText);
				$ele.find(".default-card-elements").css({ "pointer-events": "none" });
			} else if (type == "url" || type == "web_url") {
				if ($(this).attr('msgData') !== undefined) {
					var msgData;
					try {
						msgData = JSON.parse($(this).attr('msgData'));
					} catch (err) {

					}
					if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
						if (msgData.message[0].component.formData) {
							msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
						}
						chatInitialize.renderWebForm(msgData);
						return;
					}
				}
				var a_link = $(this).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatInitialize.openExternalLink(a_link);
			}
			if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'submitBtn') {
				var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
				var selectedValue = [];
				var toShowText = [];
				for (var i = 0; i < checkboxSelection.length; i++) {
					selectedValue.push($(checkboxSelection[i]).attr('value'));
					toShowText.push($(checkboxSelection[i]).attr('text'));
				}
				if (selectedValue && selectedValue.length) {
					$('.chatInputBox').text($(this).attr('title') + ': ' + selectedValue.toString());
				} else {
					$('.chatInputBox').text($(this).attr('title'));
				}
				chatInitialize.sendMessage($('.chatInputBox'), toShowText.toString());
				$ele.find(".default-card-elements").css({ "pointer-events": "none" });
				bottomSliderAction('hide');
			}
			if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'cancelBtn') {
				var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
				var selectedValue = [];
				var toShowText = [];
				for (var i = 0; i < checkboxSelection.length; i++) {
					$(checkboxSelection[i]).prop('checked', false);
					if (checkboxSelection[i].parentElement.classList.contains('selected-item')) {
						checkboxSelection[i].parentElement.classList.remove('selected-item')
					}
				}
			}
			var dropdownElements = $ele.find('.default-card-elements .more-button-info');
			for (var i = 0; i < dropdownElements.length; i++) {
				if ($(dropdownElements[i]).is(':visible')) {
					$(dropdownElements[i]).toggle(300);
				}
			}
		});
		$ele.off('click', '.default-card-elements .btn_block.dropdown').on("click", '.default-card-elements .btn_block.dropdown', function (e) {
			var obj = this;
			e.stopPropagation();
			if ($(obj).find('.more-button-info')) {
				$(obj).find(".more-button-info").toggle(300);
			}
		});

	}
		/* default card template events ends here */

			/* advanced List template actions start here */
			customTemplate.prototype.advancedMultiListTemplateEvents = function (ele, msgData) {
				if (this.chatInitialize) {
					chatInitialize = this.chatInitialize;
				}
				if(this.helpers){
					helpers = this.helpers;
				}
				var me = this;
				var $ele = $(ele);
				var messageData = $(ele).data();
				if (msgData.message[0].component.payload.listViewType == "nav") {
					var navHeadersData = msgData.message[0].component.payload.navHeaders;
					if (msgData.message[0].component.payload.navHeaders && msgData.message[0].component.payload.navHeaders.length) {
						var selectedNav = msgData.message[0].component.payload.navHeaders[0];
						$ele.find('.month-tab#' + selectedNav.id).addClass('active-month');
					}
					for (var i = 0; i < navHeadersData.length; i++) {
						if (navHeadersData[i].id != selectedNav.id) {
							$ele.find('.multiple-accor-rows#' + navHeadersData[i].id).addClass('hide');
						}
					}
				}
				$ele.off('click', '.advanced-multi-list-wrapper .callendar-tabs .month-tab').on('click', '.advanced-multi-list-wrapper .callendar-tabs .month-tab', function (e) {
					var messageData = $(ele).data();
					var selectedTabId = e.currentTarget.id;
					if (messageData && messageData.message[0].component.payload.listViewType == "nav" && messageData.message[0].component.payload.navHeaders) {
						var navHeadersData = messageData.message[0].component.payload.navHeaders;
						for (var i = 0; i < navHeadersData.length; i++) {
							if (selectedTabId != navHeadersData[i].id) {
								if (!$ele.find('.advanced-multi-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).hasClass('hide')) {
									$ele.find('.advanced-multi-list-wrapper .advanced-multi-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).addClass('hide');
									$ele.find('.advanced-multi-list-wrapper .multiple-accor-rows#' + navHeadersData[i].id).css({ 'display': 'none' });
								}
							}
						}
						for (var i = 0; i < navHeadersData.length; i++) {
							if (navHeadersData[i].id == selectedTabId) {
								$ele.find('.advanced-multi-list-wrapper .month-tab#' + navHeadersData[i].id).addClass('active-month');
							} else if (navHeadersData[i].id != selectedTabId) {
								$ele.find('.advanced-multi-list-wrapper .month-tab#' + navHeadersData[i].id).removeClass('active-month')
							}
						}
					}
					if ($ele.find('.advanced-multi-list-wrapper .multiple-accor-rows#' + selectedTabId).addClass('hide')) {
						$ele.find('.advanced-multi-list-wrapper .multiple-accor-rows#' + selectedTabId).removeClass('hide')
						$ele.find('.advanced-multi-list-wrapper .multiple-accor-rows#' + selectedTabId).css({ 'display': 'block' });
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .option').on('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .option', function (e) {
					var obj = this;
					e.preventDefault();
					e.stopPropagation();
					if ($(obj).find('.option-input').attr('type') == "radio") {
						$(obj).parent().find('.option.selected-item').removeClass('selected-item')
					}
					if (!$(obj).find('.option-input').prop('checked')) {
						$(obj).find('.option-input').prop('checked', true);
						$(obj).addClass('selected-item');
					} else {
						if ($(obj).hasClass('selected-item')) {
							$(obj).removeClass('selected-item');
						}
						$(obj).find('.option-input').prop('checked', false);
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input').on('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input', function (e) {
					var obj = this;
					var selectedId = e.currentTarget.id;
					e.stopPropagation();
					e.preventDefault();
					if (!$('#' + selectedId).prop('checked')) {
						$('#' + selectedId).prop('checked', true);
						$(obj).parent().addClass('selected-item');
					} else {
						if ($(obj).parent().hasClass('selected-item')) {
							$(obj).parent().removeClass('selected-item');
						}
						$('#' + selectedId).prop('checked', false);
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-header-top').on('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-header-top', function (e) {
					var obj = this;
					var parentElement = e.currentTarget.parentElement;
					var parentElementChildrenArray = parentElement.children;
					var childElementCount = parentElementChildrenArray[1].childElementCount;
					var actionObj = $(e.currentTarget).parent().attr('actionObj');
					var parsedActionObj = JSON.parse(actionObj);
					var type= parentElement.getAttribute('type');
					if (type && type == "postback" || type == "text") {
						$('.chatInputBox').text(parsedActionObj.payload ||parsedActionObj.title);
						var _innerText = parsedActionObj.renderMessage || parsedActionObj.title;
						chatInitialize.sendMessage($('.chatInputBox'), _innerText);
						$ele.find(".advanced-multi-list-wrapper").css({"pointer-events":"none"});
					}
					else if (type && type == "url" || type == "web_url") {
						if ($(this).attr('msgData') !== undefined) {
							var msgData;
							try {
								msgData = JSON.parse($(this).attr('msgData'));
							} catch (err) {
		
							}
							if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
								if (msgData.message[0].component.formData) {
									msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
								}
								chatInitialize.renderWebForm(msgData);
								return;
							}
						}
						var a_link = parsedActionObj.url;
						if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
							a_link = "http:////" + a_link;
						}
						chatInitialize.openExternalLink(a_link);
					}else{
						if ((childElementCount > 0) && parsedActionObj.isAccordian) {
							$(obj).find(".action-icon-acc").toggleClass("rotate-icon");
							$(obj).closest('.multiple-accor-rows').find(".accor-inner-content").toggle(300);
						}
						var iconRotation;
						if(parsedActionObj && parsedActionObj.headerOptions && parsedActionObj.headerOptions.length){
							for(var i=0;i<parsedActionObj.headerOptions.length;i++){
								var val = parsedActionObj.headerOptions[i];
								if(val && val.type==='icon' && val.iconRotation){
									iconRotation = val.iconRotation;
								}
							}
							if($(obj).find(".action-icon-acc").hasClass('rotate-icon')){
								$(obj).find(".action-icon-acc.rotate-icon").css('transform', 'rotate('+iconRotation+'deg)');
							}else{
								$(obj).find(".action-icon-acc").css('transform', '');
							}
						}
					}
		
				});
				$ele.off('click', '.advanced-multi-list-wrapper .main-title-text-block .search-block .search_icon').on('click', '.advanced-multi-list-wrapper .main-title-text-block .search-block .search_icon', function (e) {
					var obj = this;
					$(obj).parent().find('.input_text').removeClass('hide');
					$(obj).parent().find('.close_icon').removeClass('hide');
				});
				$ele.off('click', '.advanced-multi-list-wrapper .main-title-text-block .search-block .close_icon').on('click', '.advanced-multi-list-wrapper .main-title-text-block .search-block .close_icon', function (e) {
					var obj = this;
					$(obj).parent().find('.input_text').val('');
					var messageData = $(ele).data();
					if (messageData.message[0].component.payload.listViewType == "nav") {
						var selectedNav = $(obj).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
						var selectedNavId = $(selectedNav).attr('id');
						$(obj).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
							if (!$(this).hasClass('hide')) {
								$(this).css({ 'display': 'block' });
							}
						});
					} else {
						$(obj).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
							if (!$(this).hasClass('hide')) {
								$(this).css({ 'display': 'block' });
							}
						});
					}
					$(obj).parent().find('.input_text').addClass('hide');
					$(obj).parent().find('.close_icon').addClass('hide');
				});
				$ele.off('click', '.advanced-multi-list-wrapper .main-title-text-block .search-block .input_text').on("keyup", '.advanced-multi-list-wrapper .main-title-text-block .search-block .input_text', function (e) {
					var obj = this;
					var searchText = $(obj).val().toLowerCase();
					var messageData = $(ele).data();
					if (messageData.message[0].component.payload.listViewType == "nav") {
						var selectedNav = $(obj).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
						var selectedNavId = $(selectedNav).attr('id');
						$(obj).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
							$(this).toggle($(this).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
						});
					} else {
						$(obj).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
							$(this).toggle($(this).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
						});
					}
				});
				$(".kore-action-sheet").off('click', ".advancelisttemplate .TaskPickerContainer .close-button").on('click', ".advancelisttemplate .TaskPickerContainer .close-button", function (event) {
					bottomSliderAction('hide');
				});
				$ele.off('click', '.advanced-multi-list-wrapper .main-title-text-block .filter-sort-block .sort-icon').on("click", '.advanced-multi-list-wrapper .main-title-text-block .filter-sort-block .sort-icon', function (e) {
					var obj = this;
					var seeMoreDiv = $(obj).parent().parent().parent().find('.see-more-data');
					if (!$(obj).attr('type') || $(obj).attr('type') == "asc") {
						$(obj).attr('type', 'desc');
						if (seeMoreDiv && seeMoreDiv.length) {
							$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
								if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
									return -1;
								} else {
									return 1;
								}
							}).insertBefore($(obj).parent().parent().parent().find('.see-more-data'));
						} else {
							$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
								if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
									return -1;
								} else {
									return 1;
								}
							}).appendTo($(obj).parent().parent().parent());
						}
			
					} else if ($(obj).attr('type') == "desc") {
						$(obj).attr('type', 'asc');
						if (seeMoreDiv && seeMoreDiv.length) {
							$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
								if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
									return -1;
								} else {
									return 1;
								}
							}).insertBefore($(obj).parent().parent().parent().find('.see-more-data'));
						} else {
							$(obj).parent().parent().parent().find('.multiple-accor-rows').sort(function (a, b) {
								if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
									return -1;
								} else {
									return 1;
								}
							}).appendTo($(obj).parent().parent().parent());
						}
			
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .see-more-data').on("click", '.advanced-multi-list-wrapper .see-more-data', function (e) {
					var messageData = $(ele).data();
					if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'slider') {
						if ($(".list-template-sheet").length !== 0) {
							$(".list-template-sheet").remove();
						} else if ($(".list-template-sheet").length === 0) {
							if (messageData.message[0].component.payload.seeMore) {
								messageData.message[0].component.payload.seeMore = false;
								messageData.message[0].component.payload.listItemDisplayCount = msgData.message[0].component.payload.listItems.length;
							}
							if (!(msgData.message[0].component.payload.sliderView)) {
								msgData.message[0].component.payload.sliderView = true;
							}
							messageHtml = $(customTemplate.prototype.getChatTemplate("advancedMultiListTemplate")).tmpl({
								'msgData': messageData,
								'helpers': helpers,
							});
							$(messageHtml).find(".advanced-multi-list-wrapper .extra-info").hide();
							bottomSliderAction('show', messageHtml);
							customTemplate.prototype.advancedMultiListTemplateEvents(messageHtml, messageData);
						}
					} else if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'inline') {
						if(messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.listViewType === 'button'){
							var hiddenElementsArray = $(ele).find('.tag-name.hide');
						}else{
							var hiddenElementsArray = $(ele).find('.advance-multi-list-parent.hide');
						}
						for (var i = 0; i < hiddenElementsArray.length; i++) {
							if ($(hiddenElementsArray[i]).hasClass('hide')) {
								$(hiddenElementsArray[i]).removeClass('hide');
							}
						}
						$(ele).find('.see-more-data').addClass('hide');
					} else if (messageData && messageData.message[0] && messageData.message[0].component && messageData.message[0].component.payload && messageData.message[0].component.payload.seeMoreAction === 'modal') {
						var modal = document.getElementById('myPreviewModal');
						$(".largePreviewContent").empty();
						modal.style.display = "block";
						var span = document.getElementsByClassName("closeElePreview")[0];
						$(span).addClass('hide');
						if (messageData.message[0].component.payload.seeMore) {
							messageData.message[0].component.payload.seeMore = false;
							messageData.message[0].component.payload.openPreviewModal = true;
							messageData.message[0].component.payload.listItemDisplayCount = msgData.message[0].component.payload.listItems.length+1;
						}
						messageHtml = $(customTemplate.prototype.getChatTemplate("advancedMultiListTemplate")).tmpl({
							'msgData': messageData,
							'helpers': helpers,
						});
						$(messageHtml).find(".advanced-multi-list-wrapper .extra-info").hide();
						$(".largePreviewContent").append(messageHtml);
						var closeElement =  document.getElementsByClassName('advancedlist-template-close')[0];
						closeElement.onclick = function () {
							modal.style.display = "none";
							$(".largePreviewContent").removeClass("addheight");
						}
						$(".largePreviewContent .fromOtherUsers ").css('list-style','none');
						customTemplate.prototype.advancedMultiListTemplateEvents(messageHtml, messageData);
					}
					var dropdownElements = $ele.find('.advanced-multi-list-wrapper .more-button-info');
					for(var i=0;i<dropdownElements.length;i++){
						if( $(dropdownElements[i]).is(':visible')){
							 $(dropdownElements[i]).toggle(300);
						}
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .close-btn').on("click", '.advanced-multi-list-wrapper .close-btn', function (e) {
					bottomSliderAction('hide');
					e.stopPropagation();
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn').on("click", '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn', function (e) {
					var obj = this;
					e.stopPropagation();
					var actionObj = $(obj).attr('actionObj');
					var actionObjParse = JSON.parse(actionObj);
					if ((actionObjParse && actionObjParse.seeMoreAction == "dropdown") || (actionObjParse && !actionObjParse.seeMoreAction)) {
						if ($(obj).parent().find('.more-button-info')) {
							$(obj).parent().find(".more-button-info").toggle(300);
						}
					}
					else if (actionObjParse && actionObjParse.seeMoreAction == "inline") {
						var parentElemnt = $(obj).parent();
						var hiddenElementsArray = $(parentElemnt).find('.button_.hide');
						for (var i = 0; i < hiddenElementsArray.length; i++) {
							if ($(hiddenElementsArray[i]).hasClass('hide')) {
								$(hiddenElementsArray[i]).removeClass('hide')
							}
						}
						$(parentElemnt).find('.more-btn').addClass('hide');
					}
					else if (actionObjParse && actionObjParse.seeMoreAction == "slider") {
						var $sliderContent = $('<div class="advancelisttemplate"></div>');
						$sliderContent.append(sliderHeader(actionObjParse))
						$sliderContent.find(".TaskPickerContainer").append(sliderContent(actionObjParse));
						if ($(".kore-action-sheet").hasClass('hide')) {
							bottomSliderAction('show', $sliderContent);
						} else {
							$(".kore-action-sheet").find('.actionSheetContainer').empty();
							$(".kore-action-sheet").find('.actionSheetContainer').append($sliderContent);
						}
						sliderButtonEvents($sliderContent);
						var modal = document.getElementById('myPreviewModal');
						modal.style.display = "none";
						$(".largePreviewContent").empty();
					}
					function sliderHeader(listItem) {
						return '<div class="TaskPickerContainer">\
						<div class="taskMenuHeader">\
							 <button class="closeSheet close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
						   <label class="taskHeading"> '+ listItem.title + ' </label>\
						</div>'
					}
					function sliderContent(listItem) {
						var $taskContent = $('<div class="inner-btns-acc if-full-width-btn"></div>');
						if (listItem && listItem.buttons) {
							var buttonsArray = listItem.buttons;
							buttonsArray.forEach(function (button) {
								var taskHtml = $('<button class="button_" type="' + button.type + '" title="' + button.title + '" value="'+button.payload+'" ><img src="' + button.icon + '">' + button.title + '</button>');
								$taskContent.append(taskHtml)
							});
						}
					return $taskContent;
					}
					function sliderButtonEvents(sliderContent){
						sliderContent.off('click','.inner-btns-acc .button_').on('click','.inner-btns-acc .button_',function(e){
							var type = $(this).attr('type');
							if (type) {
								type = type.toLowerCase();
							}
							if (type == "postback" || type == "text") {
								$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
								var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
								if ($('.largePreviewContent .advanced-multi-list-wrapper')) {
									var modal = document.getElementById('myPreviewModal');
									$(".largePreviewContent").empty();
									modal.style.display = "none";
									$(".largePreviewContent").removeClass("addheight");
								}
								bottomSliderAction('hide');
								chatInitialize.sendMessage($('.chatInputBox'), _innerText);
								$ele.find(".advanced-multi-list-wrapper").css({"pointer-events":"none"});
							} else if (type == "url" || type == "web_url") {
								if ($(this).attr('msgData') !== undefined) {
									var msgData;
									try {
										msgData = JSON.parse($(this).attr('msgData'));
									} catch (err) {
				
									}
									if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
										if (msgData.message[0].component.formData) {
											msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
										}
										chatInitialize.renderWebForm(msgData);
										return;
									}
								}
								var a_link = $(this).attr('url');
								if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
									a_link = "http:////" + a_link;
								}
								chatInitialize.openExternalLink(a_link);
							}
						});
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn').on("click", '.advanced-multi-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn', function (e) {
					var obj = this;
					e.stopPropagation();
					if ($(obj).parent()) {
						$(obj).parent().toggle(300);
					}
				});
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon').on("click", '.advanced-multi-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon', function (e) {
					var obj = this;
					e.stopPropagation();
					if ($(obj).find('.more-button-info')) {
						$(obj).find(".more-button-info").toggle(300);
					}
				});
			
				$ele.off('click', '.advanced-multi-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more').on("click", '.advanced-multi-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more', function (e) {
					var modal = document.getElementById('myPreviewModal');
					$(".largePreviewContent").empty();
					modal.style.display = "block";
					var span = document.getElementsByClassName("closeElePreview")[0];
					$(span).removeClass("hide");
					span.onclick = function () {
						modal.style.display = "none";
						$(".largePreviewContent").empty();
						$(".largePreviewContent").removeClass("addheight");
					}
					var parent = $(e.currentTarget).closest('.multiple-accor-rows');
					var actionObj = $(parent).attr('actionObj');
					var parsedActionObj = JSON.parse(actionObj);
					$(".largePreviewContent").append($(buildPreviewModalTemplate(parsedActionObj)).tmpl({
						listItem: parsedActionObj
					}));
					bindModalPreviewEvents();
			
			
			
					function bindModalPreviewEvents() {
						if ($(".largePreviewContent")) {
							$(".largePreviewContent").find('.multiple-accor-rows').css({ 'border-bottom': '0' });
							$(".largePreviewContent").find('.accor-inner-content').css({ display: 'block' });
						}
					}
			
					function buildPreviewModalTemplate(listItem) {
						var modalPreview = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
						<div class="advanced-multi-list-wrapper img-with-title with-accordion if-multiple-accordions-list">\
							<div class="multiple-accor-rows">\
									<div class="accor-inner-content">\
											<div class="inner-acc-table-sec">\
												{{each(i,list) listItem.tableListData}}\
													{{if list.rowData && list.rowData.length}}\
														<div class="table-sec {{if listItem.type && listItem.type == "column"}}if-label-table-columns{{/if}}">\
															{{each(key,row) list.rowData}}\
																	{{if !row.icon}}\
																		<div class="column-table">\
																			<div class="header-name">${row.title}</div>\
																			<div class="title-name">${row.description}</div>\
																		</div>\
																		{{else}}\
																			<div class="column-table">\
																				<div class="labeld-img-block {{if row.iconSize}}${row.iconSize}{{/if}}">\
																					<img src="${row.icon}">\
																				</div>\
																				<div class="label-content">\
																					<div class="header-name">${row.title}</div>\
																					<div class="title-name">${row.description}</div>\
																				</div>\
																			</div>\
																	{{/if}}\
															{{/each}}\
														</div>\
													{{/if}}\
												{{/each}}\
											</div>\
									</div>\
							</div>\
					</div>\
					</script>'
						return modalPreview;
					}
				});
			
				$ele.off('click', '.advanced-multi-list-wrapper .button_,.advanced-multi-list-wrapper .inner-btns-acc .button_,.advanced-multi-list-wrapper .tags-data .tag-name,.advanced-multi-list-wrapper .btn_group .submitBtn,.advanced-multi-list-wrapper .btn_group .cancelBtn,.advanced-multi-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_').on("click", '.advanced-multi-list-wrapper .button_,.advanced-multi-list-wrapper .inner-btns-acc .button_,.advanced-multi-list-wrapper .tags-data .tag-name,.advanced-multi-list-wrapper .btn_group .submitBtn,.advanced-multi-list-wrapper .btn_group .cancelBtn,.advanced-multi-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_', function (e) {
					e.preventDefault();
					e.stopPropagation();
					var type = $(this).attr('type');
					if (type) {
						type = type.toLowerCase();
					}
					if (type == "postback" || type == "text") {
						$('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
						var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
						if ($('.largePreviewContent .advanced-multi-list-wrapper')) {
							var modal = document.getElementById('myPreviewModal');
							$(".largePreviewContent").empty();
							modal.style.display = "none";
							$(".largePreviewContent").removeClass("addheight");
						}
						bottomSliderAction('hide');
						chatInitialize.sendMessage($('.chatInputBox'), _innerText);
						$ele.find(".advanced-multi-list-wrapper").css({"pointer-events":"none"});
					} else if (type == "url" || type == "web_url") {
						if ($(this).attr('msgData') !== undefined) {
							var msgData;
							try {
								msgData = JSON.parse($(this).attr('msgData'));
							} catch (err) {
			
							}
							if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
								if (msgData.message[0].component.formData) {
									msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
								}
								chatInitialize.renderWebForm(msgData);
								return;
							}
						}
						var a_link = $(this).attr('url');
						if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
							a_link = "http:////" + a_link;
						}
						chatInitialize.openExternalLink(a_link);
					}
					if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'submitBtn') {
						var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
						var selectedValue = [];
						var toShowText = [];
						for (var i = 0; i < checkboxSelection.length; i++) {
							selectedValue.push($(checkboxSelection[i]).attr('value'));
							toShowText.push($(checkboxSelection[i]).attr('text'));
						}
						if(selectedValue && selectedValue.length){
							$('.chatInputBox').text($(this).attr('title') + ': ' + selectedValue.toString());
						}else{
							$('.chatInputBox').text($(this).attr('title'));
						}
						chatInitialize.sendMessage($('.chatInputBox'), toShowText.toString());
						$ele.find(".advanced-multi-list-wrapper").css({"pointer-events":"none"});
						bottomSliderAction('hide');
					}
					if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'cancelBtn') {
						var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
						var selectedValue = [];
						var toShowText = [];
						for (var i = 0; i < checkboxSelection.length; i++) {
							$(checkboxSelection[i]).prop('checked', false);
							if (checkboxSelection[i].parentElement.classList.contains('selected-item')) {
								checkboxSelection[i].parentElement.classList.remove('selected-item')
							}
						}
					}
				   var dropdownElements = $ele.find('.advanced-multi-list-wrapper .more-button-info');
				   for(var i=0;i<dropdownElements.length;i++){
					   if( $(dropdownElements[i]).is(':visible')){
							$(dropdownElements[i]).toggle(300);
					   }
				   }
				});
			}
	/* advanced multi List template actions end here */
	 /* article template events starts here */
	 customTemplate.prototype.articleTemplateEvents = function (ele, messageData) {
		if (this.chatInitialize) {
			chatInitialize = this.chatInitialize;
		}
		if (this.helpers) {
			helpers = this.helpers;
		}
		if (this.extension) {
			extension = this.extension;
		}
		var me = this;
		var $ele = $(ele);
		var messageData = $(ele).data();
		var _chatContainer = chatInitialize.config.chatContainer;
		$(ele).off('click', '.article-template-content .article-template-elements .media-block .btn-primary').on('click', '.article-template-content .article-template-elements .media-block .btn-primary', function (e) {
			e.stopPropagation();
			var type = $(e.currentTarget).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == "postback" || type == "text") {
				var actionObj = $(e.currentTarget).attr('actionObj');
				var parsedActionObj = JSON.parse(actionObj);
				var messageToBot;
				if (parsedActionObj.payload) {
					messageToBot = parsedActionObj.payload;
				} else {
					messageToBot = parsedActionObj.title;
				}
				bottomSliderAction('hide');
				chatInitialize.sendMessage($('.chatInputBox').text(messageToBot), parsedActionObj.title);
				$(_chatContainer).find('.article-template-content').css({ "pointer-events": "none" });
			} else if (type == "url" || type == "web_url") {
				var a_link = $(this).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				chatInitialize.openExternalLink(a_link);
			}
		});
		$(ele).off('click', '.article-template-content .article-show-more').on('click', '.article-template-content .article-show-more', function (e) {
			var templateInfo = $(e.currentTarget).closest('.article-template-content');
			var templateActionObj = $(templateInfo).attr('actionObj');
			var parsedtemplateActionObj = JSON.parse(templateActionObj);
			var type = parsedtemplateActionObj.seemoreAction;
			if (!type || (type === 'slider')) {
				messageData.message[0].component.payload.displayLimit = messageData.message[0].component.payload.elements.length;
				messageData.message[0].component.payload.showmore = false;
				messageData.message[0].component.payload.sliderView = true;
				var template = $(customTemplate.prototype.getChatTemplate("articleTemplate")).tmpl({
					'msgData': messageData,
					'helpers': helpers,
				});
				$(template).find(".article-template .extra-info").hide();
				//$(".kore-action-sheet").append(listValues);
				customTemplate.prototype.articleTemplateEvents(template, messageData)
				bottomSliderAction('show', template);
			} else if (type === 'inline') {
				var hiddenElements = $(ele).find('.article-template .article-template-content .article-template-elements .media-block.hide');
				$(hiddenElements).removeClass('hide');
				var _templateInfo = $(e.currentTarget).closest('.article-template-content');
				$(_templateInfo).find('.article-show-more').addClass('hide');

			}
		});
		$(ele).off('click', '.article-template .close-button').on('click', '.article-template .close-button', function (e) {
			bottomSliderAction('hide');
		});
		$(ele).off('click', '.article-template-content .article-template-elements .media-block ').on('click', '.article-template-content .article-template-elements .media-block', function (e) {
			var _actionObj = $(e.currentTarget).attr('actionObj');
			var parsedActionObj = JSON.parse(_actionObj);
			if (parsedActionObj.hasOwnProperty('default_action')) {
				var default_action = parsedActionObj.default_action;
				var type = parsedActionObj.default_action.type;
				if (type == "url" || type == "web_url") {
					var a_link = default_action.url;
					if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
						a_link = "http:////" + a_link;
					}
					chatInitialize.openExternalLink(a_link);

				} else if (type === "postback") {
					var payload = parsedActionObj.default_action.payload;
					var messageToDisplay = parsedActionObj.default_action.messageToDisplay || parsedActionObj.title;
					bottomSliderAction('hide');
					chatInitialize.sendMessage($('.chatInputBox').text(payload), messageToDisplay);
					$(_chatContainer).find('.article-template-content').css({ "pointer-events": "none" });
				}

			}

		});
	}

	 /* article template events Ends here */

	 /* ResetTemplateEvents starts here */

	customTemplate.prototype.resetPinTemplateEvents = function (messageHtml, msgData) {
		chatInitialize = this.chatInitialize;
		helpers = this.helpers;
		$(messageHtml).off('keypress', '.reset-pin-template .enter-pin-inputs .input-item,.reset-pin-template .reenter-pin-inputs .input-item').on('keypress', '.reset-pin-template .enter-pin-inputs .input-item,.reset-pin-template .reenter-pin-inputs .input-item', function (e) {
			if ((e.keyCode >= 48 && e.keyCode <= 57)) {
				return true;
			} else {
				return false;
			}
		});

		$(messageHtml).off('keyup', '.reset-pin-template .enter-pin-inputs .input-item,.reset-pin-template .reenter-pin-inputs .input-item').on('keyup', '.reset-pin-template .enter-pin-inputs .input-item,.reset-pin-template .reenter-pin-inputs .input-item', function (e) {
			if (e.keyCode === 8 || e.keyCode === 37) {
				if (!($(e.currentTarget).val().length)) {
					var prev = $(e.currentTarget).prev();
					if (prev.length) {
						$(prev).focus();
					}
				}

			} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode === 39)) {
				var next = $(e.currentTarget).next();
				if (next.length) {
					$(next).focus();
				}
			}
			var next = $(e.currentTarget).next();
			var pinFields = $(messageHtml).find('.reset-pin-template .enter-pin-inputs .input-item');
			var resetPinFields = $(messageHtml).find('.reset-pin-template .reenter-pin-inputs .input-item');
			var enteredPin = '';
			var reEnteredPin = '';
			var messageTodisplay = '';
			for (var i = 0; i < pinFields.length; i++) {
				enteredPin = enteredPin + $(pinFields[i]).val();
				messageTodisplay = messageTodisplay + '*';
			}
			for (var i = 0; i < resetPinFields.length; i++) {
				reEnteredPin = reEnteredPin + $(resetPinFields[i]).val();
			}
			const regEx = new RegExp(enteredPin);
			var ruleRegEx = /([0-9])\1/;
			var messagePinLength = msgData.message[0].component.payload.pinLength;
			if (!enteredPin.length || !reEnteredPin.length) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').addClass('disabled');
			} else if ((enteredPin.length == messagePinLength) && (reEnteredPin.length == messagePinLength)) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').removeClass('disabled');
			} else if ((enteredPin.length != messagePinLength) || (reEnteredPin.length != messagePinLength)) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').addClass('disabled');
			}
		});
		$(messageHtml).off('click', '.reset-pin-template .reset-pin-generation .resetpin-button-group .reset-btn').on('click', '.reset-pin-template .reset-pin-generation .resetpin-button-group .reset-btn', function (e) {
			var pinFields = $(messageHtml).find('.reset-pin-template .enter-pin-inputs .input-item');
			var resetPinFields = $(messageHtml).find('.reset-pin-template .reenter-pin-inputs .input-item');
			var enteredPin = '';
			var reEnteredPin = '';
			var messageTodisplay = '';
			for (var i = 0; i < pinFields.length; i++) {
				enteredPin = enteredPin + $(pinFields[i]).val();
				messageTodisplay = messageTodisplay + '*';
			}
			for (var i = 0; i < resetPinFields.length; i++) {
				reEnteredPin = reEnteredPin + $(resetPinFields[i]).val();
			}
			const regEx = new RegExp(enteredPin);
			var ruleRegEx = /([0-9])\1/;
			if (regEx.test(reEnteredPin)) {
				if (!$(messageHtml).find('.warning-message').hasClass('hide')) {
					$(messageHtml).find('.warning-message').addClass('hide');
				}
				if (!$(messageHtml).find('.error-message').hasClass('hide')) {
					$(messageHtml).find('.error-message').addClass('hide');
				}
				if(msgData.message[0].component.payload.piiReductionChar){
					var specialChar = msgData.message[0].component.payload.piiReductionChar;
					enteredPin = specialChar+enteredPin+specialChar;
				}
				$('.chatInputBox').text(enteredPin);
				chatInitialize.sendMessage($('.chatInputBox'), messageTodisplay, msgData, true);
				bottomSliderAction('hide');
				if ($('.kore-chat-window').hasClass('background-blur')) {
					$('.kore-chat-window').removeClass('background-blur');
				}
			} else {
				$(messageHtml).find('.warning-message').removeClass('hide');
			}
		});

		$(messageHtml).off('click', '.reset-pin-template .hading-text .close-button').on('click', '.reset-pin-template .hading-text .close-button', function (e) {
			$('.chatInputBox').text('cancel');
			var messageTodisplay = '******';
			chatInitialize.sendMessage($('.chatInputBox'), messageTodisplay, msgData, true);
			bottomSliderAction('hide');
			if ($('.kore-chat-window').hasClass('background-blur')) {
				$('.kore-chat-window').removeClass('background-blur');
			}
		});

	}

	/* ResetTemplateEvents ends here */

	/* otpValidationTemplateEvents starts here */

	customTemplate.prototype.otpValidationTemplateEvents = function (messageHtml, msgData) {
		chatInitialize = this.chatInitialize;
		helpers = this.helpers;
		$(messageHtml).off('keypress', '.otp-validations .otp-block-inputs .input-item,.otp-validations .enter-pin-inputs .input-item,.otp-validations .reenter-pin-inputs .input-item').on('keypress', '.otp-validations .otp-block-inputs .input-item,.otp-validations .enter-pin-inputs .input-item,.otp-validations .reenter-pin-inputs .input-item', function (e) {
			if ((e.keyCode >= 48 && e.keyCode <= 57)) {
				return true;
			} else {
				return false;
			}
		});

		$(messageHtml).off('keyup', '.otp-validations .enter-pin-inputs .input-item,.otp-validations .reenter-pin-inputs .input-item').on('keyup', '.otp-validations .enter-pin-inputs .input-item,.otp-validations .reenter-pin-inputs .input-item', function (e) {
			if (e.keyCode === 8 || e.keyCode === 37) {
				if (!($(e.currentTarget).val().length)) {
					var prev = $(e.currentTarget).prev();
					if (prev.length) {
						$(prev).focus();
					}
				}

			} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode === 39)) {
				var next = $(e.currentTarget).next();
				if (next.length) {
					$(next).focus();
				}
			}
			var next = $(e.currentTarget).next();
			var pinFields = $(messageHtml).find('.otp-validations .enter-pin-inputs .input-item');
			var resetPinFields = $(messageHtml).find('.otp-validations .reenter-pin-inputs .input-item');
			var enteredPin = '';
			var reEnteredPin = '';
			var messageTodisplay = '';
			for (var i = 0; i < pinFields.length; i++) {
				enteredPin = enteredPin + $(pinFields[i]).val();
				messageTodisplay = messageTodisplay + '*';
			}
			for (var i = 0; i < resetPinFields.length; i++) {
				reEnteredPin = reEnteredPin + $(resetPinFields[i]).val();
			}
			const regEx = new RegExp(enteredPin);
			var ruleRegEx = /([0-9])\1/;
			if (!enteredPin.length || !reEnteredPin.length) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').addClass('disabled');
			} else if ((enteredPin.length == 4) && (reEnteredPin.length == 4)) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').removeClass('disabled');
			} else if ((enteredPin.length != 4) || (reEnteredPin.length != 4)) {
				$(messageHtml).find('.reset-pin-generation .resetpin-button-group .reset-btn').addClass('disabled');
			}
		});
		$(messageHtml).off('click', '.otp-validations .reset-pin-generation .resetpin-button-group .reset-btn').on('click', '.otp-validations .reset-pin-generation .resetpin-button-group .reset-btn', function (e) {
			var pinFields = $(messageHtml).find('.otp-validations .enter-pin-inputs .input-item');
			var resetPinFields = $(messageHtml).find('.otp-validations .reenter-pin-inputs .input-item');
			var enteredPin = '';
			var reEnteredPin = '';
			var messageTodisplay = '';
			for (var i = 0; i < pinFields.length; i++) {
				enteredPin = enteredPin + $(pinFields[i]).val();
				messageTodisplay = messageTodisplay + '*';
			}
			for (var i = 0; i < resetPinFields.length; i++) {
				reEnteredPin = reEnteredPin + $(resetPinFields[i]).val();
			}
			const regEx = new RegExp(enteredPin);
			var ruleRegEx = /([0-9])\1/;
			if (regEx.test(reEnteredPin)) {
				if (!$(messageHtml).find('.warning-message').hasClass('hide')) {
					$(messageHtml).find('.warning-message').addClass('hide');
				}
				if (!$(messageHtml).find('.error-message').hasClass('hide')) {
					$(messageHtml).find('.error-message').addClass('hide');
				}
				$('.chatInputBox').text(enteredPin);
				chatInitialize.sendMessage($('.chatInputBox'), messageTodisplay, msgData, true);
				bottomSliderAction('hide');
				if ($('.kore-chat-window').hasClass('background-blur')) {
					$('.kore-chat-window').removeClass('background-blur');
				}
			} else {
				$(messageHtml).find('.warning-message').removeClass('hide');
			}
		});
		$(messageHtml).off('keyup', '.otp-validations .otp-block-inputs .input-item').on('keyup', '.otp-validations .otp-block-inputs .input-item', function (e) {
			var messagePinLength = msgData.message[0].component.payload.pinLength;
			if ($(e.currentTarget).val() && $(e.currentTarget).val().length === messagePinLength) {
				$(messageHtml).find('.otp-validations .otp-btn-group .otp-btn').removeClass('disabled');
			} else {
				$(messageHtml).find('.otp-validations .otp-btn-group .otp-btn').addClass('disabled');
			}
		});
		$(messageHtml).off('click', '.otp-validations .otp-btn-group .otp-btn').on('click', '.otp-validations .otp-btn-group .otp-btn', function (e) {
			var inputElement = $(e.currentTarget).closest('.otp-content').find('.otp-block-inputs .input-item');
			var inputValue = inputElement.val();
			if(msgData.message[0].component.payload.piiReductionChar){
				var specialChar = msgData.message[0].component.payload.piiReductionChar;
				inputValue = specialChar+inputValue+specialChar;
			}
			$('.chatInputBox').text(inputValue);
			var messageTodisplay = '******';
			chatInitialize.sendMessage($('.chatInputBox'), messageTodisplay, msgData, true);
			bottomSliderAction('hide');
			if ($('.kore-chat-window').hasClass('background-blur')) {
				$('.kore-chat-window').removeClass('background-blur');
			}
		});
		$(messageHtml).off('click', '.otp-validations .otp-block-inputs .eye-icon').on('click', '.otp-validations .otp-block-inputs .eye-icon', function (e) {
			if ((e.currentTarget).classList && (e.currentTarget).classList[0] === 'otp-view-eye') {
				$(e.currentTarget).closest('.otp-block-inputs').find('.input-item').attr('type', 'text');
				$(e.currentTarget).closest('.otp-block-inputs').find('.otp-view-eye').addClass('hide');
				$(e.currentTarget).closest('.otp-block-inputs').find('.otp-hidden-eye').removeClass('hide');
			} else if ((e.currentTarget).classList && (e.currentTarget).classList[0] === 'otp-hidden-eye') {
				$(e.currentTarget).closest('.otp-block-inputs').find('.input-item').attr('type', 'password');
				$(e.currentTarget).closest('.otp-block-inputs').find('.otp-hidden-eye').addClass('hide');
				$(e.currentTarget).closest('.otp-block-inputs').find('.otp-view-eye').removeClass('hide');
			}
		});

		$(messageHtml).off('click', '.otp-validations .hading-text .close-button').on('click', '.otp-validations .hading-text .close-button', function (e) {
			$('.chatInputBox').text('cancel');
			var messageTodisplay = '******';
			chatInitialize.sendMessage($('.chatInputBox'), messageTodisplay, msgData, true);
			bottomSliderAction('hide');
			if ($('.kore-chat-window').hasClass('background-blur')) {
				$('.kore-chat-window').removeClass('background-blur');
			}
		});

		$(messageHtml).off('click', '.otp-validations .otp-btn-group .otp-resend').on('click', '.otp-validations .otp-btn-group .otp-resend', function (e) {
			var payload = $(e.currentTarget).attr('value');
			$('.chatInputBox').text(payload);
			chatInitialize.sendMessage($('.chatInputBox'), payload, msgData, true);
			bottomSliderAction('hide');
		});

	}

	/* otpValidationTemplateEvents ends here */

	/* bankingFeedbackTemplateEvents starts here */
	customTemplate.prototype.bankingFeedbackTemplateEvents = function(messageHtml){
		var me = this;
		var _chatContainer = me.chatInitialize.config.chatContainer;
		$(messageHtml).off('click', '.bankingFeedBackTemplate-experience-content [type*="radio"]').on('click', '.bankingFeedBackTemplate-experience-content [type*="radio"]', function (e) {
			var currentTargetId = $(e.currentTarget).attr('id');
			var msgData = $(messageHtml).data();
			var experienceContentArray = $(messageHtml).find('[type*="radio"]');
			var empathyMessageArray =$(messageHtml).find('.empathy-message');
			for (var i = 0; i < empathyMessageArray.length; i++) {
				if (!$(messageHtml).find(empathyMessageArray[i]).hasClass('hide')) {
					$(messageHtml).find(empathyMessageArray[i]).addClass('hide');
				}
			}
			for (var i = 0; i < experienceContentArray.length; i++) {
				if ((currentTargetId != $(experienceContentArray[i]).attr('id')) && ($(messageHtml).find(experienceContentArray[i]).prop('checked'))) {
					$(messageHtml).find(experienceContentArray[i]).prop('checked', false);
				} else if ((currentTargetId === $(messageHtml).find(experienceContentArray[i]).attr('id')) && ($(messageHtml).find(experienceContentArray[i]).prop('checked'))) {
					if ($(messageHtml).find('.empathy-message#' + currentTargetId).hasClass('hide')) {
						$(messageHtml).find('.empathy-message#' + currentTargetId).removeClass('hide')
					}
				}
			}
			if ($(messageHtml).find('.bankingFeedBackTemplate-feedback-content').hasClass('hide')) {
				$(messageHtml).find('.bankingFeedBackTemplate-feedback-content').removeClass('hide');
				// $('.empathy-message').removeClass('hide');
			}
		});
		$(messageHtml).off('click', '.bankingFeedBackTemplate-feedback-content .buttons-div .feedback-submit').on('click', '.bankingFeedBackTemplate-feedback-content .buttons-div .feedback-submit', function (e) {
			var msgData = $(messageHtml).data();
			if (msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.experienceContent) {
				var contentArray = msgData.message[0].component.payload.experienceContent;
				var payload = {};
				payload.selectedFeedback = [];
				var experienceContentArray = $(messageHtml).find('[type*="radio"]');
				for (var i = 0; i < experienceContentArray.length; i++) {
					if ($(messageHtml).find(experienceContentArray[i]).prop('checked')) {
						var selectedExperience = $(experienceContentArray[i]).attr('actionObj');
						var parsedSelectedExperienceObj = JSON.parse(selectedExperience);
						delete parsedSelectedExperienceObj.empathyMessage;
						payload.selectedExperience = parsedSelectedExperienceObj;
					}
				}
				var feedbackOptionsArray = $(messageHtml).find('.experience-feedback-listItems').find('[type*="checkbox"]');
				for (var i = 0; i < feedbackOptionsArray.length; i++) {
					if ($(messageHtml).find(feedbackOptionsArray[i]).prop('checked')) {
						var actionObj = $(feedbackOptionsArray[i]).attr('actionObj');
						var parsedActionObj = JSON.parse(actionObj);
						payload.selectedFeedback.push(parsedActionObj);
					}
				}
				var userSuggestion = $(messageHtml).find("#bankingSuggestionInput").val();
				payload.userSuggestion = userSuggestion;
				// console.log(payload);
				var displayMessage = msgData.message[0].component.payload.messageToDisplay;
				$('.chatInputBox').text(JSON.stringify(payload));
				$(messageHtml).find('.bankingFeedBackTemplate').addClass('disabled');
				me.chatInitialize.sendMessage($('.chatInputBox'), displayMessage, msgData, true);
			}
		});
		$(messageHtml).off('click', '.bankingFeedBackTemplate-feedback-content .buttons-div .feedback-cancel').on('click', '.bankingFeedBackTemplate-feedback-content .buttons-div .feedback-cancel', function (e) {
			var msgData = $(messageHtml).data();
			if (msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.experienceContent) {
				var contentArray = msgData.message[0].component.payload.experienceContent;
				var payload = {};
				payload.selectedFeedback = [];
				var experienceContentArray = $(messageHtml).find('[type*="radio"]');
				for (var i = 0; i < experienceContentArray.length; i++) {
					if ($(experienceContentArray[i]).prop('checked')) {
						$(experienceContentArray[i]).prop('checked', false)
						var selectedExperience = $(experienceContentArray[i]).attr('actionObj');
						var parsedSelectedExperienceObj = JSON.parse(selectedExperience);
						delete parsedSelectedExperienceObj.empathyMessage;
						payload.selectedExperience = parsedSelectedExperienceObj;
					}
				}
				var feedbackOptionsArray = $(messageHtml).find('.experience-feedback-listItems').find('[type*="checkbox"]');
				for (var i = 0; i < feedbackOptionsArray.length; i++) {
					if ($(messageHtml).find(feedbackOptionsArray[i]).prop('checked')) {
						$(messageHtml).find(feedbackOptionsArray[i]).prop('checked', false);
						var actionObj = $(feedbackOptionsArray[i]).attr('actionObj');
						var parsedActionObj = JSON.parse(actionObj);
						payload.selectedFeedback.push(parsedActionObj);
					}
				}
				var userSuggestion = $(messageHtml).find("#bankingSuggestionInput").val("");
				var userSuggestion = $(messageHtml).find("#bankingSuggestionInput").val();
				payload.userSuggestion = userSuggestion;
				// console.log(payload);
				var displayMessage = msgData.message[0].component.payload.messageToDisplay;
				$('.chatInputBox').text('Cancel');
				$(messageHtml).find('.bankingFeedBackTemplate').addClass('disabled');
				me.chatInitialize.sendMessage($('.chatInputBox'), 'Cancel', msgData);
			}
		});
	};
	/* bankingFeedbackTemplateEvents ends here */	

	    window.customTemplate=customTemplate;	

	return {
		bottomSliderAction:bottomSliderAction,
		listViewTabs:listViewTabs,
		valueClick:valueClick
	}
})($);

