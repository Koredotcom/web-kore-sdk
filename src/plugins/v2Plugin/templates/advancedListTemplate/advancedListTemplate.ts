import helpers from '../../../../utils/helpers';
import './advancedListTemplate.scss';
class AdvancedListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "advancedListTemplate") {
            me.messageHtml = $(me.getTemplateString('advancedListTemplate')).tmpl({
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
		var $ele = $(ele);
        let helpersObj = helpers;
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
		$ele.off('click', '.advanced-list-wrapper .callendar-tabs .month-tab').on('click', '.advanced-list-wrapper .callendar-tabs .month-tab', function (e: any) {
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
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			e.preventDefault();
			e.stopPropagation();
			if ($(selectedTarget).find('.option-input').attr('type') == "radio") {
				$(selectedTarget).parent().find('.option.selected-item').removeClass('selected-item')
			}
			if (!$(selectedTarget).find('.option-input').prop('checked')) {
				$(selectedTarget).find('.option-input').prop('checked', true);
				$(selectedTarget).addClass('selected-item');
			} else {
				if ($(selectedTarget).hasClass('selected-item')) {
					$(selectedTarget).removeClass('selected-item');
				}
				$(selectedTarget).find('.option-input').prop('checked', false);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .option .option-input', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			var selectedId = e.currentTarget.id;
			e.stopPropagation();
			e.preventDefault();
			if (!$('#' + selectedId).prop('checked')) {
				$('#' + selectedId).prop('checked', true);
				$(selectedTarget).parent().addClass('selected-item');
			} else {
				if ($(selectedTarget).parent().hasClass('selected-item')) {
					$(selectedTarget).parent().removeClass('selected-item');
				}
				$('#' + selectedId).prop('checked', false);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top').on('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			var parentElement = e.currentTarget.parentElement;
			var parentElementChildrenArray = parentElement.children;
			var childElementCount = parentElementChildrenArray[1].childElementCount;
			var actionObj = $(e.currentTarget).parent().attr('actionObj');
			var parsedActionObj = JSON.parse(actionObj);
			var type= parentElement.getAttribute('type');
            var _innerText;
			if (type && type == "postback" || type == "text") {
                _innerText = parsedActionObj.payload ||parsedActionObj.title;
				var postBack = parsedActionObj.renderMessage || parsedActionObj.title;
				chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				chatWindowInstance.bottomSliderAction('hide');
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
			} else if (type && type == "url" || type == "web_url") {
				if ($(me).attr('msgData') !== undefined) {
					var msgData;
					try {
						msgData = JSON.parse($(me).attr('msgData'));
					} catch (err) {

					}
					if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
						if (msgData.message[0].component.formData) {
							msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
						}
						me.renderWebForm(msgData);
						return;
					}
				}
				var a_link = parsedActionObj.url;
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				me.openExternalLink(a_link);
				chatWindowInstance.bottomSliderAction('hide');
			}else{
				if ((childElementCount > 0) && parsedActionObj.isAccordian) {
					$(selectedTarget).find(".action-icon-acc").toggleClass("rotate-icon");
					$(selectedTarget).closest('.multiple-accor-rows').find(".accor-inner-content").toggle(300);
				}
				var iconRotation;
				if(parsedActionObj && parsedActionObj.headerOptions && parsedActionObj.headerOptions.length){
					for(var i=0;i<parsedActionObj.headerOptions.length;i++){
						var val = parsedActionObj.headerOptions[i];
						if(val && val.type==='icon' && val.iconRotation){
							iconRotation = val.iconRotation;
						}
					}
					if($(selectedTarget).find(".action-icon-acc").hasClass('rotate-icon')){
						$(selectedTarget).find(".action-icon-acc.rotate-icon").css('transform', 'rotate('+iconRotation+'deg)');
					}else{
						$(selectedTarget).find(".action-icon-acc").css('transform', '');
					}
				}
			}


		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .search_icon').on('click', '.advanced-list-wrapper .main-title-text-block .search-block .search_icon', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			$(selectedTarget).parent().find('.input_text').removeClass('hide');
			$(selectedTarget).parent().find('.close_icon').removeClass('hide');
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .close_icon').on('click', '.advanced-list-wrapper .main-title-text-block .search-block .close_icon', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			$(selectedTarget).parent().find('.input_text').val('');
			var messageData = $(ele).data();
			if (messageData.message[0].component.payload.listViewType == "nav") {
				var selectedNav = $(selectedTarget).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
				var selectedNavId = $(selectedNav).attr('id');
				$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
					if (!$(me).hasClass('hide')) {
						$(me).css({ 'display': 'block' });
					}
				});
			} else {
				$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
					if (!$(me).hasClass('hide')) {
						$(me).css({ 'display': 'block' });
					}
				});
			}
			$(selectedTarget).parent().find('.input_text').addClass('hide');
			$(selectedTarget).parent().find('.close_icon').addClass('hide');
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .search-block .input_text').on("keyup", '.advanced-list-wrapper .main-title-text-block .search-block .input_text', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			var searchText = $(selectedTarget).val().toLowerCase();
			var messageData = $(ele).data();
			if (messageData.message[0].component.payload.listViewType == "nav") {
				var selectedNav = $(selectedTarget).parent().parent().parent().find('.callendar-tabs .month-tab.active-month');
				var selectedNavId = $(selectedNav).attr('id');
				$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows#' + selectedNavId).filter(function () {
					$(me).toggle($(me).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
				});
			} else {
				$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').filter(function () {
					$(me).toggle($(me).find('.accor-header-top .title-text').text().toLowerCase().indexOf(searchText) > -1)
				});
			}
		});
		$ele.off('click', '.advanced-list-wrapper .main-title-text-block .filter-sort-block .sort-icon').on("click", '.advanced-list-wrapper .main-title-text-block .filter-sort-block .sort-icon', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			var seeMoreDiv = $(selectedTarget).parent().parent().parent().find('.see-more-data');
			if (!$(selectedTarget).attr('type') || $(selectedTarget).attr('type') == "asc") {
				$(selectedTarget).attr('type', 'desc');
				if (seeMoreDiv && seeMoreDiv.length) {
					$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').sort(function (a: any, b: any) {
						if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).insertBefore($(selectedTarget).parent().parent().parent().find('.see-more-data'));
				} else {
					$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').sort(function (a: any, b: any) {
						if ($(a).find('.accor-header-top .title-text').text() < $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).appendTo($(selectedTarget).parent().parent().parent());
				}

			} else if ($(selectedTarget).attr('type') == "desc") {
				$(selectedTarget).attr('type', 'asc');
				if (seeMoreDiv && seeMoreDiv.length) {
					$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').sort(function (a: any, b: any) {
						if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).insertBefore($(selectedTarget).parent().parent().parent().find('.see-more-data'));
				} else {
					$(selectedTarget).parent().parent().parent().find('.multiple-accor-rows').sort(function (a: any, b: any) {
						if ($(a).find('.accor-header-top .title-text').text() > $(b).find('.accor-header-top .title-text').text()) {
							return -1;
						} else {
							return 1;
						}
					}).appendTo($(selectedTarget).parent().parent().parent());
				}

			}
		});
		$ele.off('click', '.advanced-list-wrapper .see-more-data').on("click", '.advanced-list-wrapper .see-more-data', function (e: any) {
			var messageDataCopy = $(ele).data();
            let messageData: any;
            if (messageDataCopy?.tmplItem?.data?.msgData?.message[0]?.component?.payload) {
                messageData = messageDataCopy.tmplItem.data.msgData;
            }
			if (messageData?.message[0]?.component?.payload?.seeMoreAction === 'slider' || !messageData?.message[0]?.component?.payload?.seeMoreAction) {
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
					me.messageHtml = $(me.getTemplateString("advancedListTemplate")).tmpl({
						'msgData': messageData,
						'helpers': helpersObj.helpers,
					});
					$(me.messageHtml).find(".extra-info").hide();
                    chatWindowInstance.bottomSliderAction('show', me.messageHtml);
					me.bindEvents(me.messageHtml, messageData);
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
				let modal: any = document.getElementById('myPreviewModal');
				$(".largePreviewContent").empty();
				modal.style.display = "block";
				let span: any = document.getElementsByClassName("closeElePreview")[0];
				$(span).addClass('hide');
				if (messageData.message[0].component.payload.seeMore) {
					messageData.message[0].component.payload.seeMore = false;
					messageData.message[0].component.payload.openPreviewModal = true;
					messageData.message[0].component.payload.listItemDisplayCount = msgData.message[0].component.payload.listItems.length+1;
				}
				me.messageHtml = $(me.getTemplateString("advancedListTemplate")).tmpl({
					'msgData': messageData,
					'helpers': helpersObj.helpers,
				});
				$(me.messageHtml).find(".advanced-list-wrapper .extra-info").hide();
				$(".largePreviewContent").append(me.messageHtml);
				let closeElement: any =  document.getElementsByClassName('advancedlist-template-close')[0];
				closeElement.onclick = function () {
					modal.style.display = "none";
					$(".largePreviewContent").removeClass("addheight");
				}
				$(".largePreviewContent .fromOtherUsers ").css('list-style','none');
				me.bindEvents(me.messageHtml, messageData);
			}
			var dropdownElements = $ele.find('.advanced-list-wrapper .more-button-info');
			for(var i=0;i<dropdownElements.length;i++){
				if( $(dropdownElements[i]).is(':visible')){
					 $(dropdownElements[i]).toggle(300);
				}
			}
		});
		$ele.off('click', '.advanced-list-wrapper .close-btn').on("click", '.advanced-list-wrapper .close-btn', function (e: any) {
			chatWindowInstance.bottomSliderAction('hide');
			e.stopPropagation();
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-btn', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			e.stopPropagation();
			var actionObj = $(selectedTarget).attr('actionObj');
			var actionObjParse = JSON.parse(actionObj);
			if ((actionObjParse && actionObjParse.seeMoreAction == "dropdown") || (actionObjParse && !actionObjParse.seeMoreAction)) {
				if ($(selectedTarget).parent().find('.more-button-info')) {
					$(selectedTarget).parent().find(".more-button-info").toggle(300);
				}
			}
			else if (actionObjParse && actionObjParse.seeMoreAction == "inline") {
				var parentElemnt = $(selectedTarget).parent();
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
					chatWindowInstance.bottomSliderAction('show', $sliderContent);
				} else {
					// $(".kore-action-sheet").find('.actionSheetContainer').empty();
                    chatWindowInstance.bottomSliderAction('show', $sliderContent);
					// $(".kore-action-sheet").find('.actionSheetContainer').append($sliderContent);
                    // $(".kore-action-sheet").css({"display":"block"});
				}
				sliderButtonEvents($sliderContent);
				let modal: any = document.getElementById('myPreviewModal');
				modal.style.display = "none";
				$(".largePreviewContent").empty();
			}
			function sliderHeader(listItem: any) {
				return '<div class="TaskPickerContainer">\
				<div class="taskMenuHeader">\
					 <button class="closeSheet close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
				   <label class="taskHeading"> '+ listItem.title + ' </label>\
				</div>'
			}
			function sliderContent(listItem: any) {
				var $taskContent = $('<div class="inner-btns-acc if-full-width-btn"></div>');
				if (listItem && listItem.buttons) {
					var buttonsArray = listItem.buttons;
					buttonsArray.forEach(function (button: any) {
						var taskHtml = $('<button class="button_" type="' + button.type + '" title="' + button.title + '" value="'+button.payload+'" ><img src="' + button.icon + '">' + button.title + '</button>');
						$taskContent.append(taskHtml)
					});
				}
			return $taskContent;
			}
			function sliderButtonEvents(sliderContent: any){
				sliderContent.off('click','.inner-btns-acc .button_').on('click','.inner-btns-acc .button_',function(e: any){
                    let selectedTarget = $(e.currentTarget);
                    var type = $(selectedTarget).attr('type');
					if (type) {
						type = type.toLowerCase();
					}
					if (type == "postback" || type == "text") {
						var _innerText = $(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value');
						var postBack = $(selectedTarget)[0].innerText.trim() || $(selectedTarget).attr('data-value').trim();
						if ($('.largePreviewContent .advanced-list-wrapper')) {
							let modal: any = document.getElementById('myPreviewModal');
							$(".largePreviewContent").empty();
							modal.style.display = "none";
							$(".largePreviewContent").removeClass("addheight");
						}
						chatWindowInstance.bottomSliderAction('hide');
						chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
						$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
					} else if (type == "url" || type == "web_url") {
						if ($(me).attr('msgData') !== undefined) {
							var msgData;
							try {
								msgData = JSON.parse($(me).attr('msgData'));
							} catch (err) {
		
							}
							if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
								if (msgData.message[0].component.formData) {
									msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
								}
								me.renderWebForm(msgData);
								return;
							}
						}
						var a_link = $(selectedTarget).attr('url');
						if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
							a_link = "http:////" + a_link;
						}
						me.openExternalLink(a_link);
					}
				});
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-inner-content .inner-btns-acc .more-button-info .close_btn,.filter-icon .close_btn', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			e.stopPropagation();
			if ($(selectedTarget).parent()) {
                $(selectedTarget).find(".more-button-info").addClass("hide");
				$(selectedTarget).parent().toggle(300);
			}
		});
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon').on("click", '.advanced-list-wrapper .multiple-accor-rows .accor-header-top .btn_block.dropdown,.filter-icon', function (e: any) {
            let selectedTarget = $(e.currentTarget);
			e.stopPropagation();
			if ($(selectedTarget).find('.more-button-info')) {
                $(selectedTarget).find(".more-button-info.hide").removeClass("hide");
				$(selectedTarget).find(".more-button-info").toggle(300);
			}
		});
		$(".kore-action-sheet").off('click', ".advancelisttemplate .TaskPickerContainer .close-button").on('click', ".advancelisttemplate .TaskPickerContainer .close-button", function (event: any) {
            chatWindowInstance.bottomSliderAction('hide');
        });
		$ele.off('click', '.advanced-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more').on("click", '.advanced-list-wrapper .multiple-accor-rows .inner-acc-table-sec .table-sec .column-table-more', function (e: any) {
			let modal: any = document.getElementById('myPreviewModal');
			$(".largePreviewContent").empty();
			modal.style.display = "block";
			let span: any = document.getElementsByClassName("closeElePreview")[0];
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

			function buildPreviewModalTemplate(listItem: any) {
				var modalPreview = '<script id="chat_adv_list_tmpl" type="text/x-jqury-tmpl"> \
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

		$ele.off('click', '.advanced-list-wrapper .button_,.advanced-list-wrapper .inner-btns-acc .button_,.advanced-list-wrapper .tags-data .tag-name,.advanced-list-wrapper .btn_group .submitBtn,.advanced-list-wrapper .btn_group .cancelBtn,.advanced-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_').on("click", '.advanced-list-wrapper .button_,.advanced-list-wrapper .inner-btns-acc .button_,.advanced-list-wrapper .tags-data .tag-name,.advanced-list-wrapper .btn_group .submitBtn,.advanced-list-wrapper .btn_group .cancelBtn,.advanced-list-wrapper .details-content .text-info,.advancelisttemplate .inner-btns-acc .button_,.advancelisttemplate .filter-icon .button_', function (e: any) {
			e.preventDefault();
			e.stopPropagation();
            var selectedTarget = $(e.currentTarget);
            console.log(selectedTarget);
			var type = $(selectedTarget).attr('type');
			if (type) {
				type = type.toLowerCase();
			}
			if (type == "postback" || type == "text") {
				var _innerText = $(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value');
				var postBack = $(selectedTarget)[0].innerText.trim() || $(selectedTarget).attr('data-value').trim();
				if ($('.largePreviewContent .advanced-list-wrapper')) {
					let modal: any = document.getElementById('myPreviewModal');
					$(".largePreviewContent").empty();
					modal.style.display = "none";
					$(".largePreviewContent").removeClass("addheight");
				}
				chatWindowInstance.bottomSliderAction('hide');
				chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
			} else if (type == "url" || type == "web_url") {
				if ($(selectedTarget).attr('msgData') !== undefined) {
					var msgData;
					try {
						msgData = JSON.parse($(me).attr('msgData'));
					} catch (err) {

					}
					if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
						if (msgData.message[0].component.formData) {
							msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
						}
						me.renderWebForm(msgData);
						return;
					}
				}
				var a_link = $(selectedTarget).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				me.openExternalLink(a_link);
			}
			if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'submitBtn') {
				const checkboxSelection:any = $(e.currentTarget.parentElement.parentElement).find('.option-input:checked')
				const selectedValue:any = [];
				const postBack:any = [];
                var _innerText;
				for (var i = 0; i < checkboxSelection.length; i++) {
					selectedValue.push($(checkboxSelection[i]).attr('value'));
					postBack.push($(checkboxSelection[i]).attr('text'));
				}
				if(selectedValue && selectedValue.length){
                    _innerText = $(selectedTarget).attr('title') + ': ' + selectedValue.toString();
				}else{
                    _innerText = $(selectedTarget).attr('title');
				}
				chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				$ele.find(".advanced-list-wrapper").css({"pointer-events":"none"});
				chatWindowInstance.bottomSliderAction('hide');
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
    getTemplateString() {
		var advancedListTemplate = '<script id="chat_adv_list_tmpl" type="text/x-jqury-tmpl"> \
		{{if msgData.message}} \
		<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
		<div class="advanced-list-wrapper {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}img-with-title with-accordion if-multiple-accordions-list{{/if}}{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType ==="button"}}if-multiple-tags{{/if}} {{if msgData.message[0].component.payload.fromHistory}}fromHistory{{/if}}">\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView}}<button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> {{/if}}\
		{{if msgData && msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
		{{if msgData && msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.openPreviewModal && msgData.message[0].component.payload.seeMoreAction === "modal"}}\
			<div class="preview-modal-header">\
				<div class="preview-modal-title">{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.previewModalTitle}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.previewModalTitle, "bot")}}{{else}}Upcoming meetings{{/if}}</div>\
				<button class="advancedlist-template-close" title="Close"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMiAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS43NjU5IDEuNjUwNTlDMTEuOTkgMS4zNzg2OCAxMS45NjE2IDAuOTYxNTk0IDExLjY5MDMgMC42OTAzMjdDMTEuNDAzMSAwLjQwMzEwMyAxMC45NTI0IDAuMzg4MTI1IDEwLjY4MzcgMC42NTY4NzJMNiA1LjM0MDUyTDEuMzE2MzUgMC42NTY4NzJMMS4yNjk5MyAwLjYxNDcwNkMwLjk5ODAyOCAwLjM5MDYyOSAwLjU4MDk0IDAuNDE5MDYgMC4zMDk2NzMgMC42OTAzMjdDMC4wMjI0NDg4IDAuOTc3NTUxIDAuMDA3NDcwNTcgMS40MjgyNiAwLjI3NjIxOCAxLjY5N0w0Ljk1OTg3IDYuMzgwNjVMMC4zNDMxNjQgMTAuOTk3NEwwLjMwMDk5OCAxMS4wNDM4QzAuMDc2OTIwNyAxMS4zMTU3IDAuMTA1MzUxIDExLjczMjggMC4zNzY2MTkgMTIuMDA0QzAuNjYzODQzIDEyLjI5MTMgMS4xMTQ1NSAxMi4zMDYyIDEuMzgzMyAxMi4wMzc1TDYgNy40MjA3OUwxMC42MTY3IDEyLjAzNzVMMTAuNjYzMSAxMi4wNzk3QzEwLjkzNSAxMi4zMDM3IDExLjM1MjEgMTIuMjc1MyAxMS42MjM0IDEyLjAwNEMxMS45MTA2IDExLjcxNjggMTEuOTI1NiAxMS4yNjYxIDExLjY1NjggMTAuOTk3NEw3LjA0MDEzIDYuMzgwNjVMMTEuNzIzOCAxLjY5N0wxMS43NjU5IDEuNjUwNTlaIiBmaWxsPSIjMjAyMTI0Ii8+Cjwvc3ZnPgo="></button>\
			</div>\
		{{/if}}\
		<div class="advanced-list-items" {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.templateStyles}}style="{{each(styleKey,style) msgData.message[0].component.payload.templateStyles}}${styleKey}:${style};{{/each}}"{{/if}}>\
		{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType !="button"}}\
			<div class="main-title-text-block">\
				<div class="title-main {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && !msgData.message[0].component.payload.isSortEnabled && !msgData.message[0].component.payload.isSearchEnabled && !msgData.message[0].component.payload.isButtonAvailable}}w-100{{/if}}">\
					{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.title}}\
						<div class="title-main {{if msgData.message[0].component.payload.description}}main-title{{/if}} {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && !msgData.message[0].component.payload.isSortEnabled && !msgData.message[0].component.payload.isSearchEnabled && !msgData.message[0].component.payload.isButtonAvailable}}w-100{{/if}}" {{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.titleStyles}}style="{{each(styleKey,style)  msgData.message[0].component.payload.titleStyles}}${styleKey}:${style};{{/each}}"{{/if}}>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot")}}</div>\
					{{/if}}\
					{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.description}}\
						<div class="desc-title">${msgData.message[0].component.payload.description}</div>\
					{{/if}}\
				</div>\
				{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.isFilterEnabled || msgData.message[0].component.payload.isSortEnabled)}}\
					<div class="filter-sort-block">\
						{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.isFilterEnabled && msgData.message[0].component.payload.filterOptions && msgData.message[0].component.payload.filterOptions.length}}\
								<div class="filter-icon">\
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA7SURBVHgB1c+hEQAgDEPRZJMa9oLJYDHuuknAYLgKkP0qF/doViqojp+khjzxjCfrtrnPgVzxPkJrYFtkCRTHyEG/TwAAAABJRU5ErkJggg==">\
									<ul  class="more-button-info hide" style="list-style:none;">\
										<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
											{{each(filterOptionKey, filterOption) msgData.message[0].component.payload.filterOptions}} \
													<li><button class="button_"  {{if filterOption && filterOption.type}}type="${filterOption.type}"{{/if}} value="${filterOption.payload}" {{if filterOption.url}}url="${filterOption.ur}"{{/if}}>{{if filterOption && filterOption.icon}}<img src="${filterOption.icon}">{{/if}} {{html helpers.convertMDtoHTML(filterOption.title, "bot")}}</button></li>\
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
				{{/if}}\
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
									<button class="button-" type="${headerOption.type}" {{if headerOption.url}}url="${headerOption.url}"{{/if}} title="{{html helpers.convertMDtoHTML(headerOption.label, "bot")}}" value="${headerOption.payload}">{{html helpers.convertMDtoHTML(headerOption.label, "bot")}}</button>\
								</div>\
							{{/if}}\
						{{/each}}\
					{{/if}}\
				{{/if}}\
			</div>\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.tableHeading}}\
			<div class="small-title-sec">\
				<div class="left-title">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.tableHeading.rightLabel, "bot")}}</div>\
				<div class="right-title">{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.tableHeading.leftLabel, "bot")}}</div>\
			</div>\
			{{/if}}\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listViewType == "nav" && msgData.message[0].component.payload.navHeaders && msgData.message[0].component.payload.navHeaders.length}}\
				<div class="callendar-tabs">\
					{{each(i,navheader) msgData.message[0].component.payload.navHeaders}}\
						<div class="month-tab {{if i==0}}active-month{{/if}}" id="${navheader.id}">{{html helpers.convertMDtoHTML(navheader.title, "bot")}}</div>\
					{{/each}}\
				</div>\
			{{/if}}\
			{{if msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.listItems && msgData.message[0].component.payload.listItems.length}} \
				{{each(key, listItem) msgData.message[0].component.payload.listItems}} \
				   {{if  (msgData.message[0].component.payload.listItemDisplayCount &&  msgData.message[0].component.payload.listItemDisplayCount > key && (((!msgData.message[0].component.payload.seeMoreAction )||(msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "slider") || (msgData.message[0].component.payload.seeMoreAction && msgData.message[0].component.payload.seeMoreAction === "modal"))) || (!msgData.message[0].component.payload.listItemDisplayCount) || (msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction &&  msgData.message[0].component.payload.seeMoreAction === "inline")) }}\
						<div class="multiple-accor-rows {{if msgData.message[0].component.payload.listItemDisplayCount &&  msgData.message[0].component.payload.listItemDisplayCount < key && msgData.message[0].component.payload.seeMoreAction === "inline"}}hide inline{{/if}} {{if listItem && listItem.type && listItem.type=== "view"}}if-template-view-type{{/if}}" id="{{if listItem && listItem.navId}}${listItem.navId}{{/if}}" type="${listItem.type}" actionObj="${JSON.stringify(listItem)}" {{if listItem.elementStyles}}style="{{each(styleKey,listItemStyle) listItem.elementStyles}}${styleKey}:${listItemStyle};{{/each}}"{{/if}}>\
							<div class="accor-header-top"  {{if listItem.headerStyles}}style="{{each(styleKey,style) listItem.headerStyles}}${styleKey}:${style};{{/each}}"{{/if}}>\
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
							<div class="accor-inner-content {{if listItem && !listItem.isCollapsed}}displayBlock{{/if}}"    {{if listItem.contentStyles}}style="{{each(styleKey,style) listItem.contentStyles}}${styleKey}:${style};{{/each}}"{{/if}}>\
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
													<button class="button_" type="${button.type}" {{if button.url}}url="${button.url}"{{/if}} title="${button.title}" value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button>\
												{{/if}}\
											{{/each}}\
										{{else (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "inline")}}\
											{{each(i,button) listItem.buttons}}\
													<button class="button_ {{if !((listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && (i < listItem.buttonsLayout.displayLimit.count)) || (listItem && !listItem.buttonsLayout && i < 2) || (listItem && !listItem.buttonsLayout && listItem.buttons.length === 3))}} hide {{/if}}" type="${button.type}" title="${button.title}" {{if button.url}}url="${button.url}"{{/if}} value="${button.payload}"><img src="${button.icon}">${button.title}</button>\
											{{/each}}\
										{{/if}}\
											{{if (listItem && listItem.buttonsLayout && listItem.buttonsLayout.displayLimit && listItem.buttonsLayout.displayLimit.count && listItem.buttonsLayout.displayLimit.count < listItem.buttons.length) || (listItem && !listItem.buttonsLayout && listItem.buttons.length > 3)}}\
													<button class=" more-btn" actionObj="${JSON.stringify(listItem)}"><img {{if listItem.seeMoreIcon}}src=${listItem.seeMoreIcon}{{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAADCAYAAABI4YUMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgBNYyxDcJQDET/OREwBhukA0pG+COwQaCnSCR6+BswAqwBTeYB4eOcKJbss89+xnLbtyl5dsfp++6GpFhszhmoWvJXPq/LI7zVrluTvCqHWsAtTDM/SI7RByDZS2McIdK1g54h1yq9OxszG+HpAAVgqgxl9tztbsZG7fMPUTQuCUr8UX4AAAAASUVORK5CYII="{{/if}}>{{if listItem.seeMoreTitle}}{{html helpers.convertMDtoHTML(listItem.seeMoreTitle, "bot")}} {{else}}More{{/if}}</button>\
													{{if (listItem && listItem.seeMoreAction && listItem.seeMoreAction === "dropdown") || (listItem && !listItem.seeMoreAction)}}\
														<ul  class="more-button-info" style="list-style:none;">\
														<button class="close_btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
															{{each(key, button) listItem.buttons}} \
																{{if key >= 2}}\
																	<li><button class="button_" {{if button.url}}url="${button.url}"{{/if}} type="${button.type}" value="${button.payload}"><img src="${button.icon}">{{html helpers.convertMDtoHTML(button.title, "bot")}}</button></li>\
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
																<div class="title-name"><span>{{if listItem.seeMoreTitle}}{{html helpers.convertMDtoHTML(listItem.seeMoreTitle, "bot")}}{{else}}More{{/if}} <img {{if listItem.seeMoreIcon}}src="${listItem.seeMoreIcon}"{{else}}src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></div>\
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
							<span>{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}}{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.seeMoreTitle, "bot")}} {{else}}See more{{/if}} <img {{if msgData.message[0].component.payload.seeMoreIcon}} src="${msgData.message[0].component.payload.seeMoreIcon}" {{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></span>\
						{{else msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.seeMoreVisibity  && msgData.message[0].component.payload.seeMoreVisibity === "button")}}\
								<button class="button_seemore" >{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreIcon)}}<img src="${msgData.message[0].component.payload.seeMoreIcon}">{{/if}}{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.seeMoreTitle, "bot")}} {{else}}See more{{/if}}</button>\
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
					   {{if (msgData.message[0].component.payload.listItemDisplayCount && i < msgData.message[0].component.payload.listItemDisplayCount && ((msgData.message[0].component.payload.seeMoreAction !== "slider") || (msgData.message[0].component.payload.seeMoreAction !== "modal"))) || !msgData.message[0].component.payload.listItemDisplayCount || (msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction === "inline")}}\
							<div class="tag-name {{if msgData.message[0].component.payload.listItemDisplayCount && i > msgData.message[0].component.payload.listItemDisplayCount && msgData.message[0].component.payload.seeMoreAction === "inline"}}hide inline{{/if}}" type="${listItem.type}" value="${listItem.payload}">{{html helpers.convertMDtoHTML(listItem.title, "bot")}}</div>\
						{{/if}}\
					{{/each}}\
					{{if (msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount) || (msgData.message[0].component.payload.listItems.length > msgData.message[0].component.payload.listItemDisplayCount)}}\
							<div class="more-tags see-more-data">${msgData.message[0].component.payload.listItems.length - msgData.message[0].component.payload.listItemDisplayCount}{{if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.seeMoreTitle)}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.seeMoreTitle, "bot")}} {{else}}More{{/if}} <img {{if msgData.message[0].component.payload.seeMoreIcon}} src="${msgData.message[0].component.payload.seeMoreIcon}" {{else}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgBdY7BDYMwDEW/E+612gWs0gE6Qtmkm7ACGzADI7ABG5AJIAMgQozEIUDewQf/Z/lDdso/brAcAZmWny/289QnoY8wPzqAmrNgdeQEe1h3Ap1LaD1QMSKgMpeKxtZxDsAyJJfyLlsE+iIslXPOUy7QHeUCpRD5/LBC4o8kUDaUO0VusgMydwAAAABJRU5ErkJggg=="{{/if}}></div>\
					{{/if}}\
				</div>\
			{{/if}}\
		{{/if}}\
		</div>\
		</div>\
	</li>\
		{{/if}}\
		</script>';
        return advancedListTemplate;
    }

}

export default AdvancedListTemplate;