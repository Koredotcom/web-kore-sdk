(function($){
    function KorePickers(pickerConfig) {
        var pickerSubconfig={
            dateRangeConfig: {
                alwaysOpen: true,
                singleMonth: true,
                showShortcuts: false,
                showTopbar: false,
                selectForward: true,
                format: 'DD-MM-YYYY',
                startDate: '',
                endDate: '',
                inline: true,
                // container : $('.dateRangePickerContainer'),
    
            },
            daterangepicker: {
                title: "Please Choose"
            },
            dateConfig: {
                alwaysOpen: true,
                singleMonth: true,
                singleDate: true,
                showShortcuts: false,
                showTopbar: false,
                format: 'MM-DD-YYYY',
                startDate: '',
                endDate: '',
                inline: true,
                // container : $('.dateRangePickerContainer'),
    
            },
            datepicker: {
                title: "Please Choose"
            },
            clockPicker:{
               title:""
            }
    
        };
    var mainConfig=[];
    mainConfig.push(pickerConfig);
    mainConfig.push(pickerSubconfig);
    this.mainConfig = mainConfig;
    this.pickerSubconfig=pickerSubconfig;
    this.chatWindowInstance = mainConfig[0].chatWindowInstance;
    this.bottomSlider = mainConfig.bottomSlider;
    this.chatConfig = mainConfig[1];
    var _korePickers = mainConfig[0].chatConfig.chatContainer;
    this._korePickers=_korePickers;
    chatContainerConfig.pickerMainConfig = mainConfig;
}
KorePickers.prototype.showTaskMenuItems=function(actionsData){
    var iconPath='data:image/png;base64,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';
    actionsData={
"tasks": [
  {
   "title": "Get balance",
   "icon":iconPath,
   "postback": {
     "title": "Get my leave balance",
     "value": "leaveintent"
   }
 },
 {
   "title": "Change Password",
   "icon": iconPath,
   "postback": {
     "title": "change my password",
     "value": "leaveintent"
   }
 },
 {
   "title": "Pay Bill",
   "icon": iconPath,
   "postback": {
     "title": "Pay the bill",
     "value": "leaveintent"
   }
 },
 {
   "title": "Setup Balance Alert",
   "icon": iconPath,
   "postback": {
     "title": "Give alert message for balance",
     "value": "leaveintent"
   }
 }
],
"heading": "Choose Task"
      }
      return actionsData;
}
KorePickers.prototype.showRadioOptionMenuItems=function(accountData){
   accountData={
       "radioOptions":[
           {
               "title":"Shanmuga",
               "value":"1234 4567 5678 6789",
               "postback": {
                   "title": "Transaction Successful",
                   "value": "Payment Successful"
                 }
           },
           {
               "title":"Madhu",
               "value":"1234 4567 5678 9876",
               "postback": {
                   "title": "radioOptionDetails",
                   "value": "AccountData"
                 }
           },
           {
               "title":"Santhosh",
               "value":"4678 1234 5678 9876",
               "postback": {
                   "title": "Get my leave balance",
                   "value": "leaveintent"
                 }
           },
           {
               "title":"Manjula",
               "value":"9876 1234 4567 5678",
               "postback": {
                   "title": "Transaction Successful",
                   "value": "leaveintent"
                 }
           },
           {
               "title":"Ravi Kiran",
               "value":"8976 5677 7946 2345",
               "postback": {
                   "title": "radioOptionDetails",
                   "value": "leaveintent"
                 }
           },
       ]
   }
   return accountData;
}
KorePickers.prototype.init = function (mainConfig) {
    mainConfig=this.mainConfig;
    chatWindowInstance=this.chatWindowInstance;
    if (chatWindowInstance.config.pickersConfig.showDateRangePickerIcon) {
       this.showDateRangeIconToFooter();
    //    KorePickers.prototype.showDateRangePicker(mainConfig);
       chatWindowInstance.config.chatContainer.on('click', '.sdkRangeCalender.calenderBtn', function (event) {
       KorePickers.prototype.showDateRangePicker(mainConfig);
        });
    }
    if (chatWindowInstance.config.pickersConfig.showDatePickerIcon) {
        this.showDateIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkCalender.calenderBtn', function (event) {
        KorePickers.prototype.showDatePicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showClockPickerIcon) {
        this.showClockIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkClock.clockBtn', function (event) {
        KorePickers.prototype.showClockPicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showradioOptionMenuPickerIcon) {
        this.showAccountIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkAccount.accountBtn', function (event) {
        KorePickers.prototype.showradioOptionsPicker(mainConfig);
         });
     }
     if (chatWindowInstance.config.pickersConfig.showTaskMenuPickerIcon) {
        this.addTaskIconToFooter();
        // KorePickers.prototype.showDatePicker(mainConfig);
        chatWindowInstance.config.chatContainer.on('click', '.sdkMenu.menuBtn', function (event) {
        KorePickers.prototype.showTaskPicker(mainConfig);
         });
     }
}
KorePickers.prototype.addSlider = function(){
    $('.kore-chat-window').remove('.kore-action-sheet');
    var actionSheetTemplate='<div class="kore-action-sheet hide">\
    <div class="actionSheetContainer"></div>\
    </div>';
    $('.kore-chat-window').append(actionSheetTemplate);
    }
    KorePickers.prototype.bottomSlider = function(action, appendElement){
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
/* RadioOption Template start */
KorePickers.prototype.showradioOptionsPicker = function (mainConfig) {
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".radioOptionsPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    accountData=this.showRadioOptionMenuItems();
    _korePickers.find(".kore-action-sheet").append(this.getradioOptionsPickerContainer());
    this.addAccountIconToFooter();
    _korePickers.find(".radioOptionsPickerContainer").append(this.getradioOptionsPickerTemplate(accountData));
    this.addradioOptionsMenuListener(mainConfig);
}
KorePickers.prototype.getradioOptionsPickerTemplate = function (radioOptionConfig) {
    var $radioOptionsContent = $('<div class="radioOptionMenuPicker"></div>');
    var radioOptions = radioOptionConfig.radioOptions;
    radioOptions.forEach(function (radioOption) {
    var radioOptionHtml = $('<label class="radioButton">\<div class="btnAccount">\
      <div class="radioValue">\
         <input type="radio" id="selectedValue" name="radio">\
         <span class="checkmark"></span>\
         </div>\
         <span class="radioOptionDetails">\
            <span class="radioOptionName" title="'+ radioOption.title + '" data-value="' + radioOption.postback.value + '" data-title="' + radioOption.postback.title + '">' + radioOption.title + '</span>\
            <div class="radioOptionValue" title="'+ radioOption.value + '">' + radioOption.value + '</div>\
         </span>\
    </div> </label>');
        $radioOptionsContent.append(radioOptionHtml)
    });
    return $radioOptionsContent;
}
KorePickers.prototype.addradioOptionsMenuListener = function (mainConfig) {
    var _self = this;
    var target;
    _korePickers.find(".radioOptionsPickerContainer").removeClass("hide");
    _korePickers.find(".TaskPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").addClass("hide");
    _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
        "display": "none"
    });
    _self.bottomSlider('show', _korePickers.find(".radioOptionsPickerContainer"));
    setTimeout(function () {
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
            "display": "block"
        });
    }, 300);
    _korePickers.find(".btnAccount").click(function (event) {
        target = $(event.currentTarget);
        target.find(".checkmark").addClass("selected");
    });
    _korePickers.find(".radioOptionsPickerContainer .confirmBTN").click(function (event) {
        var radioOptionPostbackMsg = target.find('.radioOptionName').attr('data-value');
        var radioOptionTitle = target.find('.radioOptionName').attr('data-title');
        mainConfig[0].chatWindowInstance.sendMessage($('.chatInputBox').text(radioOptionPostbackMsg), radioOptionTitle);
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({ "display": "block" });
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
    _korePickers.find(".radioOptionsPickerContainer .closePicker").click(function () {
        _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
            "display": "none"
        });
        _self.bottomSlider('hide');
        setTimeout(function () {
            _korePickers.find(".radioOptionsPickerContainer .confirmBTN").css({
                "display": "block"
            });
        }, 100);
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getAccountIconTemplate = function () {
    var AccountFooterTemplate = '<div class="sdkFooterIcon account"> \
    <button type="button"  class="sdkAccount accountBtn" title="AccountMenu"> \
         <i class="accountIcon"></i> \
    </button> \
    </div>';
    return AccountFooterTemplate;
}
KorePickers.prototype.addAccountIconToFooter = function () {
    _korePickers.find(".radioOptionsPickerContainer").append(this.getAccountIconTemplate);
}
KorePickers.prototype.getradioOptionsPickerContainer = function () {
    return '<div class="radioOptionsPickerContainer hide">\
    <div class="radioOptionMenuHeader">\
       <button class="closePicker" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
       <label class="radioOptionHeading">Select an Account</label>\
    </div>\
    <div class="confirmBTN">Confirm</div>\
    </div>'
}
KorePickers.prototype.showAccountIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getAccountIconTemplate);
}
/*RadioOption Template end*/ 

/*TaskMenu Template start*/
KorePickers.prototype.showTaskPicker = function (mainConfig) {
actionsData=this.showTaskMenuItems();
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".TaskPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getTaskPickerContainer());
    _korePickers.find(".TaskPickerContainer").append(this.getTaskPickerTemplate(actionsData));
    this.addTaskMenuListener(mainConfig);
}
KorePickers.prototype.getTaskPickerTemplate = function (taskPickerConfig) {
    var $taskContent = $('<div class="taskMenuPicker"></div>');
    var tasks = taskPickerConfig.tasks;
    tasks.forEach(function (task) {
    var taskHtml = $('<div class="btnTask">\
        <span class="taskName" data-value="'+ task.postback.value + '" data-title="' + task.postback.title + '" title="' + task.title + '">' + task.title + '</span>\
        <div class="imageIcon"> <img src="'+ task.icon + '" class="displayIcon"></div>\
        </div>');
        $taskContent.append(taskHtml)
    });
return $taskContent;
}
KorePickers.prototype.addTaskMenuListener = function (mainConfig) {
    var _self = this;
    _korePickers.find(".TaskPickerContainer .searchInput").hide();
    _korePickers.find(".TaskPickerContainer").removeClass("hide");
    _korePickers.find(".radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").addClass("hide");
    _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _self.bottomSlider('show', _korePickers.find(".TaskPickerContainer"));
    _korePickers.find(".TaskPickerContainer .btnTask").click(function (e) {
        var inputValue = $(e.currentTarget).find(".taskName").text();
        _korePickers.find('.footerContainer.pos-relative .chatInputBox').text(inputValue);
        var taskPostbackMsg = $(e.currentTarget).find('.taskName').attr('data-value');
        var taskTitle = $(e.currentTarget).find('.taskName').attr('data-title');
        mainConfig[0].chatWindowInstance.sendMessage($('.chatInputBox').text(taskPostbackMsg), taskTitle);
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
    _korePickers.find(".TaskPickerContainer .closeSheet").click(function () {
        _self.bottomSlider('hide');
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getTaskIconTemplate = function () {
    var TaskFooterTemplate = '<div class="sdkFooterIcon menu"> \
    <button type="button"  class="sdkMenu menuBtn" title="TaskMenu"> \
         <i class="menuIcon"></i> \
    </button> \
    </div>';
    return TaskFooterTemplate;
}
KorePickers.prototype.addTaskIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getTaskIconTemplate);
}
KorePickers.prototype.getTaskPickerContainer = function () {
    return '<div class="TaskPickerContainer hide">\
    <div class="taskMenuHeader">\
         <button class="closeSheet" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
         <input class="searchInput" placeholder="Write a reply">\
       <label class="taskHeading"> Choose Tasks</label>\
    </div>'
}
/*TaskMenu Template end*/

/*DateRangePicker start*/
KorePickers.prototype.showDateRangePicker = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
    _korePickers= mainConfig[0].chatConfig.chatContainer;
    }
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".kore-action-sheet .dateRangePickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getdateRangePickerContainer);
    this.addDateRangeIconToFooter();
    var defaultlibConfig = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        showTopbar: false,
        format: mainConfig[1].dateRangeConfig.format,
        startDate: mainConfig[1].dateRangeConfig.startDate,
        endDate: mainConfig[1].dateRangeConfig.endDate,
        inline: true,
        container:  _korePickers.find('.kore-action-sheet .dateRangePickerContainer'),
    };
    $.extend(defaultlibConfig, mainConfig[1].dateRangeConfig)
    daterangeInput =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer #rangeCalenderBtn').dateRangePicker(defaultlibConfig)
    this.addDateRangeListener(mainConfig);
}
KorePickers.prototype.addDateRangeListener = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    var _self = this;
    var startdateValue;
    var enddateValue;
    var showStartDateValue = null;
    var showEndDateValue = null;
    var showStartYearValue = null;
    var showEndYearValue = null;
    this.addClickEventRangeCalender(mainConfig);
    daterangeInput.bind('datepicker-first-date-selected', function (event, obj) {
        var startYear = null;
        startdateValue = obj.date1;
        var startYear = moment(startdateValue).format("YYYY");
        var startDate = moment(startdateValue).format("ddd,MMM DD");
        showStartYearValue =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showStartdate .showStartYear').html(startYear);
        showStartDateValue = _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showStartdate .showStartMonth").html(startDate);
        showEndDateValue = null;
        _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html("Select");
        _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').css({ "opacity": "0" });
    })
    daterangeInput.bind('datepicker-change', function (event, obj) {
    var endYear = null;
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').css({ "opacity": "1" });
    enddateValue = obj.date2;
    var endYear = moment(enddateValue).format("YYYY");
    showEndYearValue =  _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').html(endYear);
    var endDate = moment(enddateValue).format("ddd,MMM DD");
    showEndDateValue = _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html(endDate);
})
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .confirmBTN").click(function () {
        if ((showStartDateValue !== null) && (showEndDateValue == null)) {
            _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html("Select");
        }
        else if ((showEndDateValue !== null)) {
            var startViewDate = moment(startdateValue).format('MM-DD-YYYY') || moment();
            var endViewDate = moment(enddateValue).format('MM-DD-YYYY') || moment();
            var _innerText = startViewDate + ' to ' + endViewDate;
            _korePickers.find('.footerContainer.pos-relative .chatInputBox').text(_innerText);
            var e = $.Event("keydown");
            e.keyCode = 13;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
            _self.bottomSlider('hide');
            daterangeInput.data('dateRangePicker').clear();
            daterangeInput.data('dateRangePicker').resetMonthsView();
            _korePickers.find(".kore-action-sheet").remove();
        }
    })
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .close-button").click(function () {
        _self.bottomSlider("hide");
        _korePickers.find(".kore-action-sheet").remove();
    })
}
KorePickers.prototype.addClickEventRangeCalender = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    var _self = this;  
    _korePickers.find('.kore-action-sheet .datePickerContainer').addClass("hide");
    _korePickers.find(".kore-action-sheet .clockPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .TaskPickerContainer").addClass("hide");
    _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer #rangeCalenderBtn').data('dateRangePicker').open();
    _korePickers.find(".cancelBtn").hide();
    _korePickers.find(".drp-selected").hide();
    //  dateRangePicker.prototype.outsideClick = function (e) { }
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showStartdate .showStartYear').html(new Date().getFullYear());
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').html(new Date().getFullYear());
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .showEnddate .showEndMonth").html("Select");
    _korePickers.find('.kore-action-sheet .dateRangePickerContainer .showEnddate .showEndYear').css({ "opacity": "0" });
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").removeClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .month-wrapper").css({ "border": "0px" });
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .headerCalendar .choose").html(mainConfig[1].daterangepicker.title);
    _self.bottomSlider('show', _korePickers.find(".dateRangePickerContainer"));
    var showStartDateValue = null;
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .date-picker-wrapper .month-wrapper .real-today").addClass("first-date-selected");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .date-picker-wrapper .month-wrapper .real-today.first-date-selected").trigger("click");
    showStartDateValue = moment()._d;
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer .confirmBTN").css({
        "display": "block"
    });
}
KorePickers.prototype.getDateRangeIconTemplate = function () {
    var dateRangeFooterTemplate = '<div class="sdkFooterIcon rangeCalender"> \
                    <button name="dates" class="sdkRangeCalender calenderBtn" title="RangeCalender"> \
                        <i class="Rangecalender"></i> \
                    </button> \
                </div>';
    return dateRangeFooterTemplate;
}
KorePickers.prototype.addDateRangeIconTemplate = function () {
    var footerRangeIcon = '<div id="rangeCalenderBtn">\
    </div>'
    return footerRangeIcon;
}
KorePickers.prototype.showDateRangeIconToFooter = function () {
    _korePickers=this._korePickers;
   _korePickers.find(".footerContainer").append(this.getDateRangeIconTemplate);
}
KorePickers.prototype.addDateRangeIconToFooter = function () {
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").append(this.addDateRangeIconTemplate);
}
KorePickers.prototype.getdateRangePickerContainer = function () {
    return '<div class="dateRangePickerContainer hide">\
                <div class="headerCalendar">\
                    <span class="choose"></span>\
                    <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <div class="showDatevalues">\
                    <div class="showStartdate">\
                        <div class="showStartYear"></div>\
                        <div class="showStartMonth"></div>\
                    </div>\
                    <div class="showEnddate">\
                        <div class="showEndYear"></div>\
                        <div class="showEndMonth"></div>\
                   </div>\
                </div>\
               <div class="confirmBTN">Confirm</div>\
           </div>';

}
/*DateRangePicker end*/  

/*DatePicker start*/  
KorePickers.prototype.showDatePicker = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".kore-action-sheet  .datePickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getdatePickerContainer);
    this.addDateIconToFooter();
    var defaultlibConfig = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        singleDate: true,
        showTopbar: false,
        format: mainConfig[1].dateRangeConfig.format,
        startDate: mainConfig[1].dateRangeConfig.startDate,
        endDate: mainConfig[1].dateRangeConfig.endDate,
        inline: true,
        container:  _korePickers.find('.kore-action-sheet .datePickerContainer'),

    };
    $.extend(defaultlibConfig, mainConfig[1].dateConfig)
    daterangeInput =  _korePickers.find('.kore-action-sheet .datePickerContainer #calender').dateRangePicker(defaultlibConfig)
    this.addDateListener(mainConfig);
}
KorePickers.prototype.addDateListener = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    var _self = this;
    this.addClickEventCalender(mainConfig);
    var startdateValue;
    // var enddateValue;
    // var showStartDateValue=null;
    // var showEndDateValue=null;
    // var showStartYearValue=null;
    // var showEndYearValue=null;
    daterangeInput.bind('datepicker-first-date-selected', function (event, obj) {
        var startYear = null;
        startdateValue = obj.date1;
        var startYear = moment(startdateValue).format("YYYY");

        var startDate = moment(startdateValue).format("ddd,MMM DD");
        showStartYearValue =  _korePickers.find('.kore-action-sheet .datePickerContainer .showStartdate .showStartYear').html(startYear);
        showStartDateValue = _korePickers.find(".kore-action-sheet .datePickerContainer .showStartdate .showStartMonth").html(startDate);
    })
    _korePickers.find(".kore-action-sheet .datePickerContainer .confirmBTN").click(function () {
        var startViewDate = moment(startdateValue).format('MM-DD-YYYY') || moment();
        var _innerText = startViewDate;
        _korePickers.find(".footerContainer.pos-relative .chatInputBox").text(_innerText);
        var e = $.Event("keydown");
        e.keyCode = 13;
        _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
        _self.bottomSlider('hide');
        daterangeInput.data('dateRangePicker').clear();
        daterangeInput.data('dateRangePicker').resetMonthsView();
        _korePickers.find(".kore-action-sheet").remove();
    })
    _korePickers.find(".kore-action-sheet .datePickerContainer .close-button").click(function () {
        _self.bottomSlider("hide");
        _korePickers.find(".kore-action-sheet").remove();
    })
}
KorePickers.prototype.addClickEventCalender = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    var _self = this;
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .clockPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .TaskPickerContainer").addClass("hide");
    _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    _korePickers.find('#calender').data('dateRangePicker').open();
    _korePickers.find(".cancelBtn").hide();
    _korePickers.find(".drp-selected").hide();
    //  dateRangePicker.prototype.outsideClick = function (e) { }
    _korePickers.find(".kore-action-sheet .datePickerContainer  .showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
    _korePickers.find('.kore-action-sheet .datePickerContainer .showStartdate .showStartYear').html(new Date().getFullYear());
    _korePickers.find(".kore-action-sheet  .datePickerContainer").removeClass("hide");
    _korePickers.find(".kore-action-sheet  .datePickerContainer .date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
    _korePickers.find(".kore-action-sheet  .datePickerContainer .month-wrapper").css({ "border": "0px" });
    _korePickers.find(".kore-action-sheet .datePickerContainer  .headerCalendar .choose").html(mainConfig[1].datepicker.title);
    _korePickers.find(".kore-action-sheet .datePickerContainer  .confirmBTN").css({
        "display": "none"
    });
    _self.bottomSlider('show', _korePickers.find(".datePickerContainer"));
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet .datePickerContainer  .confirmBTN").css({
            "display": "block"
        });
    }, 300);
}
KorePickers.prototype.getDateIconTemplate = function () {
    var dateFooterTemplate = '<div class="sdkFooterIcon singleCalender"> \
                    <button name="dates" class="sdkCalender calenderBtn" title="Calender"> \
                        <i class="calender"></i> \
                    </button> \
                </div>';
    return dateFooterTemplate;
}
KorePickers.prototype.addDateIconTemplate = function () {
    var footerIcon = '<div id="calender">\
    </div>'
    return footerIcon;
}
KorePickers.prototype.showDateIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getDateIconTemplate);
}
KorePickers.prototype.addDateIconToFooter = function () {
     _korePickers.find(".kore-action-sheet  .datePickerContainer").append(this.addDateIconTemplate);
}
KorePickers.prototype.getdatePickerContainer = function () {
    return '<div class="datePickerContainer hide">\
                <div class="headerCalendar">\
                    <span class="choose"></span>\
                    <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <div class="showDatevalues">\
                    <div class="showStartdate">\
                        <div class="showStartYear"></div>\
                        <div class="showStartMonth"></div>\
                    </div>\
                    <div class="showEnddate">\
                        <div class="showEndYear"></div>\
                        <div class="showEndMonth"></div>\
                   </div>\
                </div>\
               <div class="confirmBTN">Confirm</div>\
           </div>';

}
/*DatePicker end*/  
 
/*ClockPicker start*/ 
KorePickers.prototype.showClockPicker = function (mainConfig,e) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    if (_korePickers.find(".kore-action-sheet").length) {
        _korePickers.find(".clockPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
    }
    if (_korePickers.find(".clockPickerContainer").length) {
        _korePickers.find(".clockPickerContainer").remove();
        _korePickers.find(".kore-action-sheet").remove();
       
    }
    this.addSlider();
    _korePickers.find(".kore-action-sheet").append(this.getclockPickerContainer);
    this.addClockIconToFooter();
    var input = $('#clockPickerInput');
    this.input = input;
    input.clockpicker({
        donetext: "Done",
        placement: 'top',
        vibrate: false,
        twelvehour: true,
        parentEl: ".clockPickerContainer",
        afterDone: function (clockPickerObj) {
            var hours = clockPickerObj.hours;
            var minutes = clockPickerObj.minutes;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var amorpm = clockPickerObj.amOrPm;
            var clockValue = hours + ':' + minutes + ' ' + amorpm;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").text(clockValue);
            var e = $.Event("keydown");
            e.keyCode = 13;
            _korePickers.find(".footerContainer.pos-relative .chatInputBox").trigger(e);
        }
    });
    this.addClockListener(mainConfig);
}
KorePickers.prototype.addClickEventClock = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    var clockInput = this.input;
    var showAmorPm =  _korePickers.find('#clockPickerInput').data('clockpicker');
    showAmorPm.amOrPm = "AM";
    showAmorPm.options.default = "12:00";
    _korePickers.find(".form-control").hide();
    _korePickers.find(".kore-action-sheet  .datePickerContainer").addClass("hide");
    _korePickers.find(".kore-action-sheet .dateRangePickerContainer").addClass("hide");
    _korePickers.find(".radioOptionsPickerContainer").addClass("hide");
    _korePickers.find(".TaskPickerContainer").addClass("hide");
    _korePickers.find(".clockPickerContainer").removeClass("hide");
    _korePickers.find(".listViewTmplContent").hide();
    _korePickers.find(".list-template-sheet").hide();
    _korePickers.find(".listTmplContent.advancedMultiSelect").hide();
    clockInput.clockpicker('show').clockpicker('toggleView', 'hours');
    if (mainConfig[1].clockPicker.title) {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .headerClock .choose").html(mainConfig[1].clockPicker.title);
    } else {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .headerClock .choose").html("Please Choose");
    }
   
    _korePickers.find(".clockPickerContainer .confirmBTN").css({
        "display": "none"
    });
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet").animate({ height: 'toggle' });
        _korePickers.find(".kore-action-sheet").removeClass("hide");
        setTimeout(function () {
            _korePickers.find(".clockPickerContainer .confirmBTN").css({
                "display": "block"
            });
        }, 300);
    }, 100);
    
    _korePickers.find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").hide();
    setTimeout(function () {
        _korePickers.find(".kore-action-sheet .clockPickerContainer .clockpicker-popover").css({ "display": "block", "top": "75px ", "left": "80.5px", });
        _korePickers.find(".kore-action-sheet .clockPickerContainer .clockpicker-popover .clockpicker-plate").css({ "margin-left": "25px" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
    }, 0);
}
KorePickers.prototype.addClockListener = function (mainConfig) {
    if(mainConfig && mainConfig.length && mainConfig[0] && mainConfig[0].chatConfig && mainConfig[0].chatConfig.chatContainer){
        _korePickers= mainConfig[0].chatConfig.chatContainer;
        }
    this.addClickEventClock(mainConfig);
    _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").click(function () {
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "1" });
    })
    _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").click(function () {
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "0.4" });
        _korePickers.find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "1" });
    })
    _korePickers.find(".clockPickerContainer .confirmBTN").click(function () {
        _korePickers.find(".clockPickerContainer .confirmBTN").css({ "display": "block" });
        _korePickers.find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").trigger("click");
        _korePickers.find(".kore-action-sheet").hide();
        _korePickers.find(".kore-action-sheet").addClass("hide");
        _korePickers.find(".kore-action-sheet").remove();

    });
   
    _korePickers.find(".clockPickerContainer .closeButton").click(function () {
        _korePickers.find(".clockPickerContainer .confirmBTN").css({
            "display": "none"
        });
        setTimeout(function () {
            _korePickers.find(".kore-action-sheet").animate({ height: 'toggle' });
            _korePickers.find(".kore-action-sheet").addClass("hide");
            setTimeout(function () {
                _korePickers.find(".clockPickerContainer .confirmBTN").css({
                    "display": "block"
                });
            }, 100);
        }, 100);
        _korePickers.find(".kore-action-sheet").remove();
    });
}
KorePickers.prototype.getClockIconTemplate = function () {
    var clockFooterTemplate = '<div class="sdkFooterIcon clock"> \
                   <button type="button"  class="sdkClock clockBtn" title="Clock"> \
                        <i class="clock"></i> \
                   </button> \
               </div>';
    return clockFooterTemplate;
}
KorePickers.prototype.addClockIconToFooter = function () {
    _korePickers.find(".clockPickerContainer").append(this.getClockIconTemplate);
}
KorePickers.prototype.showClockIconToFooter = function () {
    _korePickers=this._korePickers;
    _korePickers.find(".footerContainer").append(this.getClockIconTemplate);
}
KorePickers.prototype.getclockPickerContainer = function () {
    return '<div class="clockPickerContainer hide">\
                <div class="headerClock">\
                    <span class="choose"></span>\
                    <button class="closeButton" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                </div>\
                <input class="form-control" id="clockPickerInput" value="">\
                <div class="confirmBTN">Confirm</div>\
            </div>';
}
/*ClockPicker end*/
window.KorePickers=KorePickers;
})($);