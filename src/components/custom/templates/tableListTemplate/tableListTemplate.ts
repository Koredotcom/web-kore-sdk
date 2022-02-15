
import helpers from '../../../../../src/utils/helpers';
import './tableListTemplate.scss';
class TableListTemplate {
	renderMessage(msgData: any) {
		let me: any = this;
		let $ = me.cwInstance.$;
		let helpersObj = helpers;

		if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "tableList") {
			me.messageHtml = $(me.getTemplateString('tableListTemplate')).tmpl({
				'msgData': msgData,
				'helpers': helpersObj.helpers
			});
			me.bindEvents(me.messageHtml);
			return me.messageHtml;
		}
	}
	bindEvents(messageHtml: any) {
		let me: any = this;
		let $ = me.cwInstance.$;
		$(messageHtml).off('click', '.listViewItemValue.actionLink,.listTableDetailsDesc').on('click', '.listViewItemValue.actionLink,.listTableDetailsDesc', function (e: any) {
			var _self = e.currentTarget;
			me.valueClick(_self);
		});
	}
	valueClick(_self: any, actionObj: any) {
		let me: any = this;
		let chatWindowInstance = me.cwInstance;
		let $ = me.cwInstance.$;
		var _innerText;
		if (actionObj) {
			if (actionObj.type === "url") {
				window.open(actionObj.url, "_blank");
				return;
			}
			if (actionObj.payload) {
				_innerText = actionObj.payload;
				var eData: any = {};
				eData.payload = _self.innerText || actionObj.title;
				//chatWindowInstance.assignValueToInput()
				chatWindowInstance.sendMessage(_innerText,{renderMsg:eData.payload});
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
				window.open(a_link, "_blank");
			} else {
				_innerText = $(_self).attr('data-value');
				var postBack = $(_self).attr('data-title');
				//chatWindowInstance.assignValueToInput(_innerText)
				chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				$(".kore-action-sheet .list-template-sheet").animate({ height: 'toggle' });
				chatWindowInstance.bottomSliderAction("hide");
				$(".listViewTmplContentBox").css({ "pointer-events": "none" });
			}
		}

	}
	getTemplateString() {
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

		return tableListTemplate;
	}

}

export default TableListTemplate;