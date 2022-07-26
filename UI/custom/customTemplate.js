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
		}else if(msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.template_type === "feedbackTemplate" && (msgData.message[0].component.payload.view==="star"|| msgData.message[0].component.payload.view ==="emojis"))){
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
									<option xyz = ${msgData.message[0].component.selectedValue} {{if msgData.message[0].component.selectedValue === msgItem.value}}selected{{/if}} class = "dropdownTemplatesValues" type = "postback" value="${msgItem.value}"> \
										${msgItem.title}\
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
																			<button class="button_" type="${button.type}" title="${button.title}" value="${button.payload}"  {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}}><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
																		{{/if}}\
																	{{/each}}\
																{{else (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "inline")}}\
																	{{each(i,button) listItem.buttons}}\
																			<button class="button_ {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}} {{if !((listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3))}} hide {{/if}}" type="${button.type}" title="${button.title}" value="${button.payload}"><img src="${button.icon}">${button.title}</button>\
																	{{/each}}\
																{{/if}}\
																	{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && listItem.buttonsLayout.displayLimit.count < listItem.buttons.length) || (listItem && !listItem.buttonsLayout && listItem.buttons.length > 3)}}\
																			<button class=" more-btn" actionObj="${JSON.stringify(listItem)}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAADCAYAAABI4YUMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgBNYyxDcJQDET/OREwBhukA0pG+COwQaCnSCR6+BswAqwBTeYB4eOcKJbss89+xnLbtyl5dsfp++6GpFhszhmoWvJXPq/LI7zVrluTvCqHWsAtTDM/SI7RByDZS2McIdK1g54h1yq9OxszG+HpAAVgqgxl9tztbsZG7fMPUTQuCUr8UX4AAAAASUVORK5CYII=">More</button>\
																			{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && !listItem.seeMoreAction)}}\
																				<ul  class="more-button-info" style="list-style:none;">\
																				<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
																					{{each(key, button) listItem.buttons}} \
																						{{if key >= 2}}\
																							<li><button class="button_" type="${button.type}" {{if button && button.buttonStyles}}style="{{each(styleKey,style) button.buttonStyles}}${styleKey}:${style};{{/each}}"{{/if}} value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button></li>\
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
		} else {
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
		$(messageHtml).find(".emojiComponent").off('click','.rating').on('click','.rating',function(e){
			var msgData=$(messageHtml).data();
			var sliderValue=msgData.message[0].component.payload.sliderView;
			  if($(messageHtml).find(".emojiComponent .active").length=="0"){
				$(".emojiElement").remove();
			}
			var emojiValue=$(this).attr("value");
			$(e.currentTarget).addClass("active");
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
			if($(this).attr("value") < "5"){
				$(".ratingStar").remove();
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				if($(".suggestionsMainComponent").length > 0){
					$(".suggestionsMainComponent").remove();
				}
				$(".kore-action-sheet").find(".emojiComponent").append(customTemplate.prototype.suggestionComponent());
			    
		    }else{
				if($(".submitButton")){
					$(".submitButton").remove();
				}
				if($(".ratingStar").length > 0){
					$(".ratingStar").remove();
				}
				var messageTodisplay=msgData.message[0].component.payload.messageTodisplay;
				$(".suggestionsMainComponent").remove();
				$(".kore-action-sheet").find(".emojiComponent").append('<div class="ratingStar">'+messageTodisplay+'</div><div class="submitButton"><button type="button" class="submitBtn">Submit</button></div>')
			}
			if(sliderValue===false){
				chatInitialize.sendMessage($('.chatInputBox').text(emojiValue),emojiValue);
			}
			$(".emojiComponent").off('click','.submitBtn').on('click','.submitBtn',function(e){
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
                    chatInitialize.sendMessage($('.chatInputBox').text(emojiValue +" :"+ messageDisplay),emojiValue +" :"+ messageDisplay);
				}
				bottomSliderAction("hide");
				msgData.message[0].component.payload.sliderView=true;
		  });
		
		});
		$(messageHtml).find(".buttonTmplContent .emojiComponent .close-btn").click(function(e){
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
	    window.customTemplate=customTemplate;	

	return {
		bottomSliderAction:bottomSliderAction,
		listViewTabs:listViewTabs,
		valueClick:valueClick
	}
})($);

