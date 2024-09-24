import $ from '../../libs/korejquery';
import PerfectScrollbar from 'perfect-scrollbar';
import requireKr from '../base-sdk/kore-bot-sdk-client'
import './styles/kore-widgets.scss'
import addPolyFils from '../../utils/kore-polyfills';
import { AnyMxRecord, AnyPtrRecord } from 'dns';
import KoreGraphAdapter from '../../libs/kore-graph-adapter/KoreGraphAdapter';

// //"use strict";
declare const window: any;
declare const docType:any;
declare const slideType:any
declare const audioType:any;
declare const videoType:any;
declare const imageType:any;
declare const vectorType:any;
declare const pdfType:any;
declare const sheetType:any;
declare const execType:any;
declare const databaseType:any;
declare const fontType:any;
declare const systemType:any;
declare const zipType:any;
declare const devpType:any;
declare const dobjType:any;
declare const sketchType:any;



function _typeof(obj: any) :any{
  let _typeof:any;
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj:any) {
      return typeof obj;
    };
  }
  else {
     _typeof = function _typeof(obj:any) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  } 
  return _typeof(obj);
}


(function () {
  window.onclick = function (event:any) {
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
})();

// (function (factory) {
//   //if (typeof define === 'function' && define.amd) { // AMD
//   //    define(factory);
//   //} else if (typeof module !== 'undefined') {      // CommonJS
//   //    module.exports = factory();
//   //} else {                                         // browser globals
//   window.KoreWidgetSDK = factory(); //}
// })(function () {
//   var koreJquery;

//   if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
//     //load kore's jquery version
//     koreJquery = window.KoreSDK.dependencies.jQuery;
//   } else {
//     //fall back to clients jquery version
//     koreJquery = window.jQuery;
//   }

// var korejstz;
// if (window.jstz) {
//   korejstz = window.jstz;
// } else {
//   korejstz = requireKr(2).jstz;
// }
var jstz = requireKr(2).jstz;

var KRPerfectScrollbar: any;
if (window.PerfectScrollbar && typeof PerfectScrollbar === 'function') {
  KRPerfectScrollbar = window.PerfectScrollbar;
}

//   return function ($, jstz,KRPerfectScrollbar) {
//     //get dependencies as arguments here 

//     /**
//     * @param  {Object} KoreWidgetSDK Config
//     */
//     var me;


window.menuActiveTab = '';
var panel = ["meetings", "tasks", "files", 'knowledge', 'announcement'];
var oldPanelName:any;
var editComponent = {
  editComponentList: ['AnnouncementformComponent', 'InfoshowformComponent', 'CreateNotesComponent'],
  editComponentSelector: {
    AnnouncementformComponent: 'app-announcementform',
    InfoshowformComponent: 'app-infoshowform',
    CreateNotesComponent: 'app-createnotes'
  },
  selector: ['app-announcementform', 'app-infoshowform', 'app-createnotes']
};

var taskList:any = [],
  taskTitle:any = {},
  viewMoreScrollBox:any = null;
var intializeOffset = 0,
  pollingTimer:any = '',
  viewMoreCntrScroll:any = '',
  meetingTimeRef:any = [];
var meetingArray:any = [];
var mainTemplateBdr:any,
  localPanelDetail:any = {},
  makeAPICall:any = true;
var helpers:any = {
  'actionIcon': function actionIcon(actionbtndata:any) {
    if (actionbtndata.type === "open_form") {
      return "icon-Take-notes";
    } else if (actionbtndata.type === "url") {
      return "icon-Go-out";
    }
  },
  'updateMeetingTimer': function updateMeetingTimer(strTime:any, endDate:any, index:any, id:any) {
    return true;
  },
  'compareCurntTimeAndTimln_minutes': function compareCurntTimeAndTimln_minutes(strTime:any, endDate:any, type:any) {
    if (strTime) {
      var startDate = strTime;
      var sysDate = new Date().getTime();
      var stTimeline = startDate - sysDate;
      var minStartTime = Math.ceil(stTimeline / 60000);
      var entTimeline:any;

      if (endDate) {
        entTimeline = endDate - sysDate;
      }

      if (type === 'textFormat') {
        var dayType = helpers.getTimeline(strTime, "fulldate", "meetings"); // today

        if (dayType === "Happening Now" || dayType === "Later Today" || dayType === "Today") {
          if (minStartTime > 0) {
            //meeting is yet to start
            var hoursTime = Math.floor(minStartTime / 60);
            var minutePartsTime = minStartTime % 60;

            if (minStartTime > 60) {
              return 'In ' + hoursTime + 'h  ' + minutePartsTime + 'm';
            } else if (minStartTime < 60) {
              return 'In ' + minutePartsTime + 'm';
            }
          } else if (minStartTime <= 0) {
            //meeting is in progress
            return 'Now';
          }
        } else if (dayType === "Tomorrow") {
          return 'Tomorrow';
        } else if (dayType === 'Yesterday') {
          if (minStartTime < 0 && entTimeline > 0) {
            //meeting is in progress
            return 'Now';
          }

          return 'xcac';
        } else {
          var givenDate = new Date(strTime);
          var timLnDateFormt = givenDate.getMonth() + '/' + (givenDate.getDate() + 1) + '/' + givenDate.getFullYear();
          var currentDate = new Date();
          var currentDateFormt = currentDate.getMonth() + '/' + (currentDate.getDate() + 1) + '/' + currentDate.getFullYear();
          var date1:any = new Date(timLnDateFormt);
          var date2:any = new Date(currentDateFormt);
          var diffTime = Math.abs(date2 - date1);
          var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return 'In ' + diffDays + ' days';
        }
      }

      return minStartTime;
    }
  },
  'callMeetingTimer': function callMeetingTimer(strTime:any, endDate:any, type:any) {
    helpers.compareCurntTimeAndTimln_minutes(strTime, endDate, type);
  },
  'getWidgetIcon': function getWidgetIcon(iconId:any) {
    // menu icon for menu panel
    iconId = iconId ? iconId.toLowerCase() : '';

    if (iconId == "meetings" || iconId === 'meeting') {
      return 'icon-MeetingCalendar';
    }

    if (iconId == "task" || iconId === 'tasks') {
      return 'icon-Tasks';
    }

    if (iconId == "file" || iconId === 'files') {
      return 'icon-iOS---Folder';
    }

    if (iconId == "knowledge" || iconId === 'knowledges') {
      return 'icon-Knowledge-Cap';
    }

    if (iconId == "announcement" || iconId === 'announcements') {
      return 'icon-Announcements';
    }

    return '';
  },
  'checkMeetingHeaderTimeline': function checkMeetingHeaderTimeline(data:any, key:any) {
    // meeting header checks for ('Happening Now' and 'Later Today') for the same day and 'Tomorrow' then day/month/year
    if (key === 0) {
      return true;
    } else {
      var preDate = new Date(parseInt(data[key - 1].data['duration']['start']));
      var currDate = new Date(parseInt(data[key].data['duration']['start'])); // meetings of same date

      if (preDate.toDateString() === currDate.toDateString() || new Date().toDateString() === currDate.toDateString()) {
        // difference between current system time and meeting start time
        var cmpareTimelinIn_MinutsStart = helpers.compareCurntTimeAndTimln_minutes(data[key].data.duration.start, null, null);
        var previousTmStamp:any = helpers.compareCurntTimeAndTimln_minutes(data[key - 1].data.duration.start, null, null);
        var currentTmStamp:any = helpers.compareCurntTimeAndTimln_minutes(data[key].data.duration.start, null, null);

        if (previousTmStamp <= 5 && currentTmStamp <= 5 || previousTmStamp <= 5 && currentTmStamp <= 0 || previousTmStamp < 0 && currentTmStamp < 0 || previousTmStamp <= 5 && currentTmStamp < 0 || previousTmStamp < 0 && currentTmStamp <= 5) {
          return false;
        } else if ((previousTmStamp <= 5 || previousTmStamp < 0) && currentTmStamp > 5) {
          return true;
        }

        return false;
      } else {
        return true;
      }
    }
  },
  'checkForlineWidget': function checkForlineWidget(arr:any, key:any) {
    var dayTypeTracker:any = [];

    for (var k = 0; k < arr.length; k++) {
      dayTypeTracker[k] = helpers.getTimeline(arr[k].data.duration.start, "fulldate", "meetings");
    }

    var curredayType = helpers.getTimeline(arr[key].data.duration.start, "fulldate", "meetings");

    if (dayTypeTracker[key] === curredayType && dayTypeTracker[key + 1] === curredayType) {
      return false;
    } else {
      return true;
    }
  },
  'getTimeline': function getTimeline(timeline:any, type:any, widgetType:any) {
    // For all normal timeline

    /* day - Sun, Mon, etc,
    numberdate - 12/4/2019
    date - 25 MAR
    fulldate Mon, 25 MAR
    year - 19
    fullyear - 2019
    time - 12 AM*/
    type = type ? type.toLowerCase() : '';
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var givenDate:any = new Date(timeline);
    var day = days[givenDate.getDay()];
    var month:any = months[givenDate.getMonth()];
    var date = givenDate.getDate();
    var currentDate = new Date();
    var todayDay = days[currentDate.getDay()];
    var todayMonth = months[currentDate.getMonth()];
    var todayDate = currentDate.getDate();
    var yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    var yesterdayDay = days[yesterday.getDay()];
    var yesterdayMonth = months[yesterday.getMonth()];
    var yesterdayDate = yesterday.getDate();
    var tomorrow = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
    var tomorrowDay = days[tomorrow.getDay()];
    var tomorrowMonth = months[tomorrow.getMonth()];
    var tomorrowDate = tomorrow.getDate();

    if (type === 'day') {
      return day;
    } else if (type === 'numberdate') {
      if (day + month + date === todayDay + todayMonth + todayDate) {
        return 'Today';
      } else if (day + month + date === yesterdayDay + yesterdayMonth + yesterdayDate) {
        return 'Yesterday';
      } else if (day + month + date === tomorrowDay + tomorrowMonth + tomorrowDate) {
        return 'Tomorrow';
      } else {
        month = givenDate.getMonth() + 1;
        return givenDate.getDate() + '/' + month + '/' + givenDate.getFullYear();
      }
    } else if (type === 'date') {
      if (day + month + date === todayDay + todayMonth + todayDate) {
        return 'Today';
      } else if (day + month + date === yesterdayDay + yesterdayMonth + yesterdayDate) {
        return 'Yesterday';
      } else if (day + month + date === tomorrowDay + tomorrowMonth + tomorrowDate) {
        return 'Tomorrow';
      } else {
        return month + ' ' + date;
      }
    } else if (type === 'fulldate') {
      if (day + month + date === todayDay + todayMonth + todayDate) {
        if (widgetType === 'meetings') {
          // var comparedMinutes = helpers.compareCurntTimeAndTimln_minutes(timeline, null, null);
          var startDate = timeline;
          var sysDate = new Date().getTime();
          var stTimeline = startDate - sysDate;
          var comparedMinutes = Math.ceil(stTimeline / 60000);

          if (comparedMinutes <= 5 && comparedMinutes > 0 || comparedMinutes < 0) {
            return 'Happening Now';
          }

          return 'Later Today';
        } else {
          return 'Today';
        }
      } else if (day + month + date === yesterdayDay + yesterdayMonth + yesterdayDate) {
        return 'Yesterday';
      } else if (day + month + date === tomorrowDay + tomorrowMonth + tomorrowDate) {
        return 'Tomorrow';
      } else {
        return day + ', ' + month + ' ' + date;
      }
    } else if (type === 'year') {
      return givenDate.getYear().toString().substring(1, 3);
    } else if (type === 'fullyear') {
      return givenDate.getFullYear();
    } else if (type === 'time') {
      var hours = givenDate.getHours();
      var minutes = givenDate.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      hours = hours < 10 ? '0' + hours : hours;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
  },
  'getFileIcon': function getFileIcon(fileType:any) {
    // File panel icon
    if (docType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeDoc"></i>';
    } else if (slideType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeSlide"></i>';
    } else if (audioType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeAudio"></i>';
    } else if (videoType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeVideo"></i>';
    } else if (imageType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeImage"></i>';
    } else if (vectorType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeVector"></i>';
    } else if (pdfType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypePDF"></i>';
    } else if (sheetType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeSheet"></i>';
    } else if (databaseType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeDatabase"></i>';
    } else if (execType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeExec"></i>';
    } else if (fontType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeFont"></i>';
    } else if (systemType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeSystem"></i>';
    } else if (zipType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeZip"></i>';
    } else if (devpType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeDevp"></i>';
    } else if (dobjType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeDObject"></i>';
    } else if (sketchType.indexOf(fileType.toUpperCase()) !== -1) {
      return '<i class="common fileTypeSketch"></i>';
    } else {
      return '<i class="common fileTypeNone"></i>';
    }
  },
  'checkTaskUser': function checkTaskUser(fN:any, lN:any, id:any) {
    // Check current user in task
    //#TODO :needs to remove koreWidgetSDKInstance refs
    var uId = window.koreWidgetSDKInstance.userInfo.id; //$.jStorage.get('currentAccount').userInfo.id;

    if (uId == id) {
      return 'You';
    } else {
      return fN + ' ' + lN.charAt(0);
    }
  },
  'getTimeLineNotification': function getTimeLineNotification(timeline:any) {
    // For announcement time line
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var inputDate = new Date(timeline);
    var currDate = new Date();

    if (currDate.getFullYear() - inputDate.getFullYear() >= 1) {
      return days[inputDate.getDay()] + ', ' + months[inputDate.getMonth()] + ' ' + inputDate.getDate() + ', ' + inputDate.getFullYear();
    } else {
      if (currDate.getMonth() - inputDate.getMonth() >= 1) {
        return days[inputDate.getDay()] + ', ' + months[inputDate.getMonth()] + ' ' + inputDate.getDate() + ', ' + inputDate.getFullYear();
      } else {
        if (currDate.getDate() - inputDate.getDate() === 0) {
          var minutes = '';
          var myDatedate = parseInt(timeline);
          var d = new Date(myDatedate);
          var hours = d.getHours();
          minutes = d.getMinutes().toString();
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        } else if (currDate.getDate() - inputDate.getDate() === 1) {
          return 'Yesterday';
        } else {
          return days[inputDate.getDay()] + ', ' + months[inputDate.getMonth()] + ' ' + inputDate.getDate() + ', ' + inputDate.getFullYear();
        }
      }
    }
  }
};



class KoreWidgetSDK {
  vars: any;
  events: any;
  config: any;
  // this.config=config;
  // this.config.container=this.config.container || "body";
  // if(typeof this.config.container==="string"){
  //     this.config.container=$(this.config.container);
  // }
  // this.bot = requireKr('/KoreBot.js').instance();
  // //this.config.botOptions.
  constructor(config: any){
    this.init(config);
  this.initVariables();
  this.jqueryManupulations(); //this.on=$(this).on;
  addPolyFils();
  var me = this;

  this.attachEventListener();
  }

  jqueryManupulations () {
    var _self:any = this; // $.fn.extend({
    //   tmplProxy: function(a,b,c){
    //     return this.tmpl(a,b,c);
    //   }
    // });     
  
  
    $.prototype.tmplProxy = function (a:any, b:any, c:any) {
      return this.tmpl($.extend(_self.getTemplateMethods(), a), b, c);
    };
  };

  initVariables  () {
    KoreWidgetSDK.prototype = Object.create($.prototype);
    this.vars = {}; //use this vars to store any local data variable for sdk developers. Will be avaiable as "koreWidgetSDKInstance.vars"
  
    var vars:any = this.vars;
    vars.timezone = jstz.determine();
    vars.latitude = '';
    vars.longitude = '';
    //config = {};
    vars.initialWidgetData = {};
    vars.cacheData = [];
  }; //********************original widget.js start */
  
   attachEventListener() {
    // Create IE + others compatible event handler
    const self =this;
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent, function (e:any) {
      if (e.data && e.data.event) {
        var data = e.data;
        switch (data.event) {
          case 'formEvent':
            self.formAction(e.data);
            break;
          default:
            break;
        }
      }
    }, false);
  }


show  (config:any) {
    var _self:any = this;
    _self.config = _self.extend(JSON.parse(JSON.stringify(_self.config)), config);
    var initialWidgetData = _self.vars.initialWidgetData;
    //_self.config.container = sel || {}; //#TODO :need to remove below line on prod
  
    window.koreWidgetSDKInstance = _self;
  
    var currentTimezone = _self.vars.timezone.name();
  
    var latitude = _self.vars.latitude;
    var longitude = _self.vars.longitude;
    var config = _self.config;
  
    _self.getServerDataGen("/widgetsdk/" + config.botOptions.botInfo._id + "/panels?resolveWidgets=true&from=" + config.botOptions.userIdentity, 'get').done(function (response:any) {
      //_self.getServerDataGen("/api/1.1/ka/users/:userId/panels?tz=" + currentTimezone + "&lat=" + latitude + "&lon=" + longitude, 'get').done(function (response) {
      // getServerData("/api/1.1/ka/users/:userId/widgets?tz=" + currentTimezone + "&lat=" + latitude + "&lon=" + longitude, 'get').done(function(response){
      if (response && response.length) {
        response.sort(function (a:any, b:any) {
          var c = new Date(a.lMod).getTime();
          var d = new Date(b.lMod).getTime();
          return d - c;
        });
      }
      initialWidgetData.panels = response;
      var panelData:any = [];
  
      for (var i = 0; i < initialWidgetData.panels.length; i++) {
        //todo: deviation :adding "id" from "_id"
        if (initialWidgetData.panels[i].widgets && initialWidgetData.panels[i].widgets.length) {
          initialWidgetData.panels[i].widgets.forEach(function (widget:any) {
            if (!widget.id) {
              widget.id = widget._id;
            }
          });
        } //todo: deviation :added fallback icon for panels
  
  
  
  
        panelData.push(initialWidgetData.panels[i]);
      }
      var dataHTML = (<any>$(_self.getTemplate("menu"))).tmplProxy({
        'panelData': panelData,
        'helpers': helpers,
        'baseUrl': window.baseUrl,
        'botDetails': _self.config.botOptions.botInfo
      });
      _self.bindTemplateEvents(dataHTML, 'menu', panelData);
      if ($(_self.config.container.menu).find('.menuItemCntr').length > 0) {
        $(_self.config.container.menu).find('.menuItemCntr').remove();
      }
  
      $(_self.config.container.menu).addClass('kr-wiz-menu-css');
      $(_self.config.container.menu).addClass('defaultTheme-kore');
      $(_self.config.container.menu).append(dataHTML);
  
  
      if (KRPerfectScrollbar) {
        if (!_self.vars.menuPSObj) {
          _self.vars.menuPSObj = new KRPerfectScrollbar($(_self.config.container.menu).find(".menuItemBox").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.menuPSObj.update();
        }
      }
  
      _self.maintainCache();
  
      setTimeout(function () {
        _self.triggerEvent('onPanelsLoaded');
      }, 100);
    });
  };

   formAction(event:any) {
     let me:any= this;
    if (event && event.metaData && event.metaData.queryParams && event.metaData.queryParams.widgetId) {
      var widgetElement:any = $('.widgetPanel#' + event.metaData.queryParams.widgetId);
      var paneldataString:any = widgetElement.find('.webFormWidget').attr('paneldetail');
      var panelData = JSON.parse(paneldataString);
      if ((event.action === 'formCancel') || (event.action === 'formClose')) {
        me.refreshElement(paneldataString);
      } else {
        var responseData = {
          success: true,
          successMsg: 'Form Submitted Successfully'
        }
        var dataHTML = (<any> $(me.getTemplate("webForm"))).tmplProxy({
          'tempdata': responseData,
          'panelDetail': panelData
        });
        me.bindTemplateEvents(dataHTML, 'webForm');
        widgetElement.find('.widgetContentPanel ').html(dataHTML);
      }
    }
    widgetElement?.find('button')?.addClass('active')
    setTimeout(function () {
      if (widgetElement?.find('button')?.length) {
        me.refreshElement(paneldataString);
      }
    }, 5000)
  }

  
maintainCache  () {
  var _self:any = this;
  var initialWidgetData = _self.vars.initialWidgetData;
  var cacheData = _self.vars.cacheData;
  var count = 0;

  for (var i = 0; i < initialWidgetData.panels.length; i++) {
    for (var j = 0; j < initialWidgetData.panels[i].widgets.length; j++) {
      if (initialWidgetData.panels[i].widgets[j].type === 'List' && initialWidgetData.panels[i].widgets[j].priority) {
        var api = initialWidgetData.panels[i].widgets[j].hook.api;

        if (initialWidgetData.panels[i].widgets[j].hook.params) {
          api = initialWidgetData.panels[i].widgets[j].hook.api + '?' + $.param(initialWidgetData.panels[i].widgets[j].hook.params);
        }

        cacheData.push({
          "api": api,
          "response": _self.getServerDataGen(initialWidgetData.panels[i].widgets[j].hook.api, initialWidgetData.panels[i].widgets[j].hook.method, initialWidgetData.panels[i].widgets[j].hook.body, initialWidgetData.panels[i].widgets[j].hook.params).done(function (res:any) {
            _self.modifyJSON(count++);
          })
        });
      } else if (initialWidgetData.panels[i].widgets[j].type === 'FilteredList' && initialWidgetData.panels[i].widgets[j].priority) {
        for (var k = 0; k < initialWidgetData.panels[i].widgets[j].filters.length; k++) {
          var api = initialWidgetData.panels[i].widgets[j].filters[k].hook.api;

          if (initialWidgetData.panels[i].widgets[j].filters[k].hook.params) {
            api = initialWidgetData.panels[i].widgets[j].filters[k].hook.api + '?' + $.param(initialWidgetData.panels[i].widgets[j].filters[k].hook.params);
          }

          cacheData.push({
            "api": api,
            "response": _self.getServerDataGen(initialWidgetData.panels[i].widgets[j].filters[k].hook.api, initialWidgetData.panels[i].widgets[j].filters[k].hook.method, initialWidgetData.panels[i].widgets[j].filters[k].hook.body, initialWidgetData.panels[i].widgets[j].filters[k].hook.params).done(function (res:any) {
              _self.modifyJSON(count++);
            })
          });
        }
      }
    }
  }
};



modifyJSON  (count:any) {
  var _self = this;
  var initialWidgetData = _self.vars.initialWidgetData;
  var cacheData = _self.vars.cacheData;
  if (count < initialWidgetData.panels.length) return; else {
    for (var i = 0; i < cacheData.length; i++) {
      if (cacheData[i].response && cacheData[i].response.responseJSON) {
        cacheData[i].response = cacheData[i].response.responseJSON;
      } else {
        cacheData[i].response = cacheData[i].response;
      }
    }
  }
}; //********************original widget.js end */


//********************original widgetTemplate.js start */


getTemplate  (type:any) {
  var menuTemplate = '<script id="chat_message_menu_tmpl" type="text/x-jqury-tmpl">\
        <div class="menuItemCntr">\
        <div class="sdkBotIcon" {{if botDetails && botDetails.name}} {{/if}}>\
        <svg onClick="openPanel(\'closePanel\',\'' + " " + '\',\'' + "true" + '\')" width="24" height="24" viewBox="0 0 24 24" fill="none">\
          <path d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>\
        </svg>\
        <span aria-hidden="true" class="botName">Home</span>\
        </div>\
        <div class="divider-line"></div>\
          <div tabindex="0" class="menuItemBox" tabindex="0" aria-live="assertive" aria-label="Panels List">\
              {{each(key, msgItem) panelData}}\
              <div aria-live="polite" role="region" tabindex="0" onClick="openPanel(\'${msgItem._id}\')" class="menuItemContainer {{if msgItem && msgItem._id}}${msgItem._id}{{/if}}" {{if msgItem && msgItem.name}}title="${msgItem.name}"{{/if}}>\
                  {{if msgItem && msgItem.icon}}\
                    <img src="${msgItem.icon}" class="menuItem" panels-menu-id="${msgItem._id}" id="${msgItem.name}"  onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';">\
                  {{/if}}\
                  {{if msgItem && !msgItem.icon}}\
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\
                      <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>\
                    </svg>\
                  {{/if}}\
                <span role="listitem" class="panelNameTooltip" title="${msgItem.name}">${msgItem.name}</span>\
              </div>\
              {{/each}}\
          </div>\
          <div class="sdkThemeContainer" aria-live="polite" title="Themes">\
          <i role="region" aria-label="Select a theme for widgets"  tabindex="0" class="icon-More dropbtnWidgt sdkThemeIcon"  onclick="showDropdown(this)"></i>\
          <ul class="dropdown-contentWidgt  rmpmW themeContent" aria-live="polite" role="list" style="list-style:none;">\
                  <li role="heading" class="themeTitle">Theme</li>\
                  <li role="listitem" class="dropdown-item action themeName" id="defaultTheme-kore">Theme One<span></span></li>\
                  <li role="listitem" class="dropdown-item action themeName" id="darkTheme-kore">Theme Two<span></span></li>\
                  <li role="listitem" class="dropdown-item action themeName" id="defaultTheme-kora">Theme Three<span></span></li>\
                  <li role="listitem" class="dropdown-item action themeName" id="darkTheme-kora">Theme Four<span></span></li>\
          </ul>\
          </div>\
        </div>\
      </script>';
  var widgetHeader = '<script id="chat_message_widgetHeader_tmpl" type="text/x-jqury-tmpl"> \
          <div class="headerLeft">\
            <p class="headerWidgetTitle newHeader">${widgetData.title}</p>\
            {{if tempData && tempData.description}}\
            <p class="headerWidgetDesc" id="widgetDisc">${tempData.description}</p>\
            {{/if}}\
          </div>\
          {{if tempData && ((tempData.sortOptions && tempData.sortOptions.length)|| (tempData && tempData.headerOptions && (tempData.headerOptions.type==="text") && tempData.headerOptions.text) || (tempData.headerOptions && tempData.headerOptions.type==="menu" && tempData.headerOptions.menu && tempData.headerOptions.menu.length) || (tempData.headerOptions && tempData.headerOptions.type==="image" && tempData.headerOptions && tempData.headerOptions.image && tempData.headerOptions.image.image_src) || (tempData.filterOptions && tempData.filterOptions.length) || (tempData.headerOptions && tempData.headerOptions.type==="button" && tempData.headerOptions.button && tempData.headerOptions.button.title) || (tempData.headerOptions && tempData.headerOptions.type==="url" && tempData.headerOptions.url && tempData.headerOptions.url.title))}}\
            <div class="headerRight">\
                {{if tempData && tempData.sortOptions && tempData.sortOptions.length}}\
                  <div class="headerTitleSorting">\
                    <i class="icon-More dropbtnWidgt sortingIcon"  onclick="showDropdown(this)"></i>\
                    <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                    {{each(key1, sort) tempData.sortOptions}} \
                            <li class="dropdown-item action {{if sort.isSelect}}selected{{/if}}" sort-obj ="${JSON.stringify(sort)}" action-type="sortOptions">${sort.title}<span class="selectedFilterTick"></span></li>\
                    {{/each}} \
                    </ul>\
                  </div>\
                {{/if}}\
                {{if tempData && tempData.filterOptions && tempData.filterOptions.length}}\
                  <div class="headerTitleFilters action" action-type="filter" filterObj= "${JSON.stringify(tempData)}"></div>\
                {{/if}}\
                {{if tempData && tempData.headerOptions && tempData.headerOptions.type==="button" && tempData.headerOptions.button && tempData.headerOptions.button.title}}\
                  <div class="headerTitleBTN action" action-type="default" title="${tempData.headerOptions.button.title}" actionObj="${JSON.stringify(tempData.headerOptions.button)}">${tempData.headerOptions.button.title}</div>\
                {{/if}}\
                {{if tempData && tempData.headerOptions && tempData.headerOptions.type==="text" && tempData.headerOptions.text}}\
                  <div class="headerTitleTEXT" title="${tempData.headerOptions.text}" action-type="default">${tempData.headerOptions.text}</div>\
                {{/if}}\
                {{if tempData && tempData.headerOptions && tempData.headerOptions.type==="url" && tempData.headerOptions.url && tempData.headerOptions.url.title}}\
                  <div class="headerTitleURL action" action-type="url" title="${tempData.headerOptions.url.title}" actionObj="${JSON.stringify(tempData.headerOptions.url)}">${tempData.headerOptions.url.title}</div>\
                {{/if}}\
                {{if tempData && tempData.headerOptions && tempData.headerOptions.type==="image" && tempData.headerOptions.image && tempData.headerOptions.image.image_src}}\
                <div class="headerTitleIMG action" action-type="default" actionObj="${JSON.stringify(tempData.headerOptions.image)}"><img src="${tempData.headerOptions.image.image_src}" class="headerIcon"></div>\
                {{/if}}\
                {{if tempData && tempData.headerOptions && tempData.headerOptions.type==="menu" && tempData.headerOptions.menu && tempData.headerOptions.menu.length}}\
                <div class="headerTitleMenu">\
                <i class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">\
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">\
                  <path d="M7.99992 8.66669C8.36811 8.66669 8.66659 8.36821 8.66659 8.00002C8.66659 7.63183 8.36811 7.33335 7.99992 7.33335C7.63173 7.33335 7.33325 7.63183 7.33325 8.00002C7.33325 8.36821 7.63173 8.66669 7.99992 8.66669Z" stroke="#667085" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>\
                  <path d="M7.99992 4.00002C8.36811 4.00002 8.66659 3.70154 8.66659 3.33335C8.66659 2.96516 8.36811 2.66669 7.99992 2.66669C7.63173 2.66669 7.33325 2.96516 7.33325 3.33335C7.33325 3.70154 7.63173 4.00002 7.99992 4.00002Z" stroke="#667085" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>\
                  <path d="M7.99992 13.3334C8.36811 13.3334 8.66659 13.0349 8.66659 12.6667C8.66659 12.2985 8.36811 12 7.99992 12C7.63173 12 7.33325 12.2985 7.33325 12.6667C7.33325 13.0349 7.63173 13.3334 7.99992 13.3334Z" stroke="#667085" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>\
                </svg>\
                </i>\
                <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                {{each(key1, menuBtn) tempData.headerOptions.menu}} \
                        <li class="dropdown-item action" actionObj="${JSON.stringify(menuBtn)}" action-type="default">${menuBtn.title}</li>\
                 {{/each}} \
                </ul>\
                </div>\
                {{/if}}\
            </div>\
          {{/if}}\
      </script>';
  var mainTemplate = '<script id="chat_message_widget_tmpl" type="text/x-jqury-tmpl"> \
          <div class="mainTemplateCntr" role="heading" id="${widgetData._id}" {{if panelDetail}}panelDetail="${JSON.stringify(panelDetail)}{{/if}}">\
              <div class="widgetTitle">\
              <img class="menuIconMobile" tabindex="0"  onClick="openPanel(\'closePanel\',\'' + " " + '\',\'' + "true" + '\')"  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDcwcHgiIGhlaWdodD0iNDcwcHgiIHZpZXdCb3g9IjAgMCA0NzAgNDcwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1My4yICg3MjY0MykgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+bWVudS1pY29uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Im1lbnUtaWNvbiIgZmlsbD0iIzc2NzY4OCIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTUzLjMzMywxMDYuNjY3IEw0MTYsMTA2LjY2NyBDNDQ1LjQxNywxMDYuNjY3IDQ2OS4zMzMsODIuNzQgNDY5LjMzMyw1My4zMzQgQzQ2OS4zMzMsMjMuOTI4IDQ0NS40MTcsMCA0MTYsMCBMNTMuMzMzLDAgQzIzLjkxNywwIDAsMjMuOTI3IDAsNTMuMzMzIEMwLDgyLjczOSAyMy45MTcsMTA2LjY2NyA1My4zMzMsMTA2LjY2NyBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNDE2LDE4MS4zMzMgTDUzLjMzMywxODEuMzMzIEMyMy45MTcsMTgxLjMzMyAwLDIwNS4yNiAwLDIzNC42NjcgQzAsMjY0LjA3NCAyMy45MTcsMjg4IDUzLjMzMywyODggTDQxNiwyODggQzQ0NS40MTcsMjg4IDQ2OS4zMzMsMjY0LjA3MyA0NjkuMzMzLDIzNC42NjcgQzQ2OS4zMzMsMjA1LjI2MSA0NDUuNDE3LDE4MS4zMzMgNDE2LDE4MS4zMzMgWiIgaWQ9IlBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQxNiwzNjIuNjY3IEw1My4zMzMsMzYyLjY2NyBDMjMuOTE3LDM2Mi42NjcgMCwzODYuNTk0IDAsNDE2IEMwLDQ0NS40MDYgMjMuOTE3LDQ2OS4zMzMgNTMuMzMzLDQ2OS4zMzMgTDQxNiw0NjkuMzMzIEM0NDUuNDE3LDQ2OS4zMzMgNDY5LjMzMyw0NDUuNDA2IDQ2OS4zMzMsNDE2IEM0NjkuMzMzLDM4Ni41OTQgNDQ1LjQxNywzNjIuNjY3IDQxNiwzNjIuNjY3IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=">\
              <img class="widgetMobileIcon"src="${widgetData.icon}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';">\
              <span aria-hidden="true" class="panelWidgetName">${widgetData.name}</span>\
              <span class="panelHeaderActions">\
                <span onClick="refreshElement(\'${JSON.stringify(panelDetail)}\',\'refreshPanel\')" class="panelRefresh"></span>\
                <span class="panelSetting"></span>\
                <span class="panelMin"></span>\
                <span onClick="openPanel(\'${widgetData._id}\')" class="panelClose"></span>\
              </span>\
              </div>\
              <div role="contentinfo" aria-live="assertive" aria-relevant="additions all" class="mainTemplateBdr {{if widgetData.widgets && widgetData.widgets.length > 1}}scroll{{else}}scroll{{/if}}">\
                  {{each(key1, widget) widgetData.widgets}} \
                      <div class="widgetPanel" id="${widget.id}">\
                      {{if widget && widget.title}}\
                      <div class="panelHeader" >\
                        <div class="headerLeft fullWidthTitle">\
                          <p class="headerWidgetTitle">${widget.title}</p>\
                        </div>\
                      </div>\
                      {{/if}}\
                          {{if widget && widget.filterOptions}}\
                              <div id="${widget.id}"  class="widgetContParent">\
                                  <div class="filter">\
                                      <ul class="filterCntr">\
                                          {{each(key, widgetFilter) widget.filterOptions}} \
                                              <li class="{{if key === 0}}active{{else}}unActive{{/if}}" style="background: ${widgetData.theme};" id="${widgetFilter.id}" onclick="filterTabs(\'.mainTemplateCntr\',\'${widget.id}\',\'${widgetFilter.id}\')">${widgetFilter.title}</li>\
                                          {{/each}}\
                                      </ul>\
                                      <div class="progress"><div  class="slider"> <div class="line"></div><div class="subline inc"></div> <div class="subline dec"></div></div></div>\
                                      {{each(key, widgetFilter) widget.filterOptions}} \
                                          <div {{if widgetData.widgets && widgetData.widgets.length === 1}} onscroll="scrollData(\'${JSON.stringify(panelDetail)}\',\'${JSON.stringify(widgetFilter)}\',\'maintemplate\',this)" {{/if}}  class="widgetContentPanel ${widget.id}_content  {{if widgetData.widgets && widgetData.widgets.length === 1}}scroll{{/if}}" id="${widgetFilter.id}_content" {{if key > 0}}style="display: none;"{{/if}}><div class="loaderRing"><div></div><div></div><div></div><div></div></div></div>\
                                      {{/each}}\
                                  </div>\
                              </div>\
                          {{else}}\
                              <div id="${widget.id}" class="widgetContParent">\
                                  <div class="progress"><div  class="slider"> <div class="line"></div><div class="subline inc"></div> <div class="subline dec"></div></div></div>\
                                  <div {{if widgetData.widgets && widgetData.widgets.length === 1}} onscroll="scrollData(\'${JSON.stringify(panelDetail)}\',\'${JSON.stringify(widget)}\',\'maintemplate\', this)" {{/if}}    id="${widget.id}_content" class="widgetContentPanel {{if widgetData.widgets && widgetData.widgets.length === 1}}scroll{{/if}}"><div class="loaderRing"><div></div><div></div><div></div><div></div></div>\</div>\
                              </div>\
                          {{/if}}\
                      </div>\
                  {{/each}} \
                  <div class="bottomOverlayContainer" id="widgetSdkBottomOverlayContainer">\
                  </div>\
              </div>\
          </div>\
      </script>';
  var viewMoreTemplate = '<script id="chat_message_viewMore_tmpl" type="text/x-jqury-tmpl"> \
          <div role="contentinfo" class="viewMoreCntr" id="${widgetData._id}">\
              <div class="widgetTitle"><i class="icon-Arrow-Material viewMoreBack" onclick="removeViewMore()"></i> ${widgetData.name}</div>\
              <div class="taskSelectCntr"><i class="icon-Close1" onclick="removeTaskSelection()"></i> <span class="taskCount">1 task selected</span></div>\
              <div class="mainTemplateBdr">\
                  {{each(key, widget) widgetData.widgets}} \
                      <div class="widgetPanel">\
                      {{if widget && widget.title}}\
                          <div class="panelHeader padd10">${widget.title}</div>\
                      {{/if}}\
                          {{if widget && widget.filterOptions}}\
                              <div id="${widget.id}" class="panelCntr" style="border-bottom: 5px solid var(--sdk-primary-border-color);">\
                                  <div class="filter">\
                                      <ul class="filterCntr">\
                                          {{each(key, widgetFilter) widget.filterOptions}} \
                                              <li class="{{if (widgetData._id === panelDetail.panel && widget.id === panelDetail.subpanel && widgetFilter.id === panelDetail.filter)}}active{{else}}unActive{{/if}}" style="background: ${widgetData.theme};" id="${widgetFilter.id}" onclick="filterTabs(\'.viewMoreCntr\',\'${widget.id}\',\'${widgetFilter.id}\')">${widgetFilter.title}</li>\
                                          {{/each}}\
                                      </ul>\
                                      {{each(key, widgetFilter) widget.filterOptions}} \
                                          <div onscroll="scrollData(\'${JSON.stringify(panelDetail)}\', \'${JSON.stringify(widgetFilter)}\',\'viewmore\', this)" class="scroll widgetContentPanel ${widget.id}_content" id="${widgetFilter.id}_content" style="display:{{if (widgetData._id === panelDetail.panel && widget.id === panelDetail.subpanel && widgetFilter.id === panelDetail.filter)}}block{{else}}none{{/if}};"><div class="loaderRing"><div></div><div></div><div></div><div></div></div></div>\
                                      {{/each}}\
                                  </div>\
                              </div>\
                          {{else}}\
                              <div id="${widget.id}" class="scroll" style="border-bottom: 5px solid var(--sdk-primary-border-color);"><div class="loaderRing"><div></div><div></div><div></div><div></div></div></div>\
                          {{/if}}\
                      </div>\
                  {{/each}} \
              </div>\
              <div class="taskSelectFootCntr">\
                  <button role=""button" tabindex="0" class="btn complete" onclick="taskSend(\'complete\')">Complete</button>\
                  <button role=""button" tabindex="0" class="btn changeduedate" onclick="taskSend(\'changeduedate\')">Change due date</button>\
              </div>\
          </div>\
      </script>';
  var meetingTemplate = '<script id="chat_message_meeting_tmpl" type="text/x-jqury-tmpl"> \
          <div class="meetingWidget_Root" > \
              <div class="meetingWidget_Box">\
                  {{each(key, myMsgItem) tempdata.elements}} \
                      {{if helpers.checkMeetingHeaderTimeline(tempdata.elements, key)}}\
                          <div class="timeline">{{html helpers.getTimeline(myMsgItem.data.duration.start, "fulldate", "meetings")}}</div> \
                      {{/if}}\
                      <div class="carosalItem eleCntr {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}timeactive{{/if}}" template-type="${myMsgItem.template_type}">\
                      <div class="carosalCntr">\
                          <div class="meetingCntr">\
                              <div class="smeetingLft" style="display:none;">\
                                  {{if myMsgItem.day}}\
                                      <div class="timeCntr">{{if myMsgItem.localDay.intial}}<div>${myMsgItem.localDay.intial}</div>{{/if}}{{if myMsgItem.localDay.time}}<div>${myMsgItem.localDay.time}</div>{{/if}}<div>${myMsgItem.localDay.last}</div></div>\
                                  {{else}}\
                                      <div class="timeCntr">{{html helpers.getTimeline(new Date(parseInt(myMsgItem.data.duration.start)), "time")}}<br>{{html helpers.getTimeline(new Date(parseInt(myMsgItem.data.duration.end)), "time")}}</div>\
                                  {{/if}}\
                              </div>\
                              {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}\
                              <div class="meetingRft" style="border: 1px solid ${myMsgItem.data.color}">\
                              <div class="meetingTitle" {{if myMsgItem.data.color}}style="background:${myMsgItem.data.color};color:#ffffff!important"{{/if}}><div class="titleAlign">${myMsgItem.title}\
                              {{else}}\
                              <div class="meetingRft" {{if myMsgItem.data.color}}style="border: 1px solid ${hexToRGBMeeting(myMsgItem.data.color)}"{{/if}}>\
                                  <div class="meetingTitle" {{if myMsgItem.data.color}}style="background:${hexToRGBMeeting(myMsgItem.data.color)};"{{/if}}{{if $("body").hasClass("darkTheme")}}style="color:#ffffff"{{else}}style="color:#000000"{{/if}}><div class="titleAlign">${myMsgItem.title}\
                              {{/if}}\
                                  <i  class="icon-More dropbtnWidgt hide"  onclick="showDropdown(this)"></i>\
                                          <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                                          {{each(key1, actionbtnli) myMsgItem.actions}} \
                                              {{if actionbtnli.type !== "dial"}}\
                                              {{if actionbtnli.type === "postback"}}\
                                                      <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)">"${actionbtnli.title}"</li>\
                                                  {{else}}\
                                                      <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(myMsgItem)}"  onclick="passMeetingUtterances(this)">${actionbtnli.title}</li>\
                                                  {{/if}}\
                                              {{/if}}\
                                          {{/each}}\
                                      </ul>\
                                  </div>\
                              </div>\
                              <div class="timeCountrCntr hide">\
                              {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 0}}\
                                      <i class="redDot"></i>\
                               {{/if}}\
                                    <span  id="m_${key}"> {{html meetingTimer( tempdata.elements,myMsgItem, key)}}</span>   \
                               </div>\
                              {{if myMsgItem.day}}\
                              <div class="timeCntr"> <i class="icon-Time1 icon16Gray"></i>{{if myMsgItem.localDay.intial}}<span>${myMsgItem.localDay.intial}</span>{{/if}}{{if myMsgItem.localDay.time}}<span> ${myMsgItem.localDay.time}</span>{{/if}}<span>${myMsgItem.localDay.last}</span></div>\
                          {{else}}\
                              <div class="timeCntr"><i class="icon-Time1 icon16Gray"></i><span>{{html helpers.getTimeline(new Date(parseInt(myMsgItem.data.duration.start)), "time")}} - {{html helpers.getTimeline(new Date(parseInt(myMsgItem.data.duration.end)), "time")}}</span>\
                              {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) > 5}}\
                              <span class="timeCountrCntr" id="m_${key}">\
                                     {{html meetingTimer( tempdata.elements,myMsgItem, key)}}\
                               {{/if}}\
                               </span>\
                              </div>\
                          {{/if}}\
                              {{if myMsgItem.location}}<div class="meetingPlaceCntr"><i class="meetingPlace icon-Material---Location1"></i> {{if isURL(myMsgItem.location).status}}<a class="meetingUrlText" href="${isURL(myMsgItem.location).location}"  target="_blank">${myMsgItem.location}</a>{{else}}${myMsgItem.location}{{/if}}</div>{{/if}}\
                              {{if myMsgItem.data.attendees && myMsgItem.data.attendees.length}}\
                                  <div class="meetingMemberCntr">\
                                      <span><i class="meetingUser icon-Material-Person"></i></span><span class="meetingMemberCntrText">{{if myMsgItem.data.attendees[0].name}}${myMsgItem.data.attendees[0].name}{{else}}${myMsgItem.data.attendees[0].email}{{/if}}\
                                      {{if myMsgItem.data.attendees.length > 1}} and ${myMsgItem.data.attendees.length -1} {{if myMsgItem.data.attendees.length > 2}}others{{else}}other{{/if}}{{/if}}\
                                      </span>\
                                      {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}\
                                      <div {{if myMsgItem.data.color}}style="background: ${hexToRGBMeeting(myMsgItem.data.color,0.1)}"{{/if}} class="meetingIconToggle" onclick="toggelMeetingActionBtn(\'meetingbtns${key}\', this)"><i class="{{if helpers.getTimeline(myMsgItem.data.duration.start, "fulldate", "meetings") === "Happening Now"}}icon-Arrow_Drop_Down_Up{{else}}icon-Arrow_Drop_Down{{/if}}" {{if myMsgItem.data.color}}style="color: ${myMsgItem.data.color}"{{/if}} ></i></div>\
                                      {{else}}\
                                      <div {{if myMsgItem.data.color}}style="background: ${hexToRGBMeeting(myMsgItem.data.color,0.1)}"{{/if}} class="meetingIconToggle" onclick="toggelMeetingActionBtn(\'meetingbtns${key}\', this)"><i class="{{if helpers.getTimeline(myMsgItem.data.duration.start, "fulldate", "meetings") === "Happening Now"}}icon-Arrow_Drop_Down_Up{{else}}icon-Arrow_Drop_Down{{/if}}" {{if myMsgItem.data.color}}style="color: ${myMsgItem.data.color}"{{/if}} ></i></div>\
                                      {{/if}}\
                                      </div>\
                              {{/if}}\
                              {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}\
                              <div class="meetingActionButtons hide" style="font-size: 23px;margin-top:10px;">\
                                  {{each(key, actionbtn) myMsgItem.actions}} \
                                      {{if actionbtn.type === "open_form" || actionbtn.custom_type === "url"}}\
                                       <div class="actionBtns"  {{if myMsgItem.data.color}}style="color:${myMsgItem.data.color};border: 2px solid ${myMsgItem.data.color}"{{/if}}  actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)"> \
                                       <i class="${helpers.actionIcon(actionbtn)}"  ></i>&nbsp; ${actionbtn.title} </div> \
                                     {{/if}}  \
                                  {{/each}}\
                            </div>\
                          {{/if}}\
                        </div>\
                        <div class="meetingActionButtons"  id="meetingbtns${key}"  {{if helpers.getTimeline(myMsgItem.data.duration.start, "fulldate", "meetings") !== "Happening Now"}} style="display:none;{{/if}}">\
                            {{each(key, actionbtn) myMsgItem.actions}} \
                                {{if key < 2 }}\
                                {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}\
                                 <div class="actionBtns" {{if myMsgItem.data.color}}style="text-transform: uppercase;color:${myMsgItem.data.color};border: 2px solid ${myMsgItem.data.color}"{{/if}} actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)"> \
                                 {{else}}\
                                 <div class="actionBtns" {{if myMsgItem.data.color}}style="text-transform: uppercase;color:${myMsgItem.data.color};border: 2px solid ${hexToRGBMeeting(myMsgItem.data.color)}"{{/if}} actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)"> \
                                 {{/if}}\
                                 <i class="${helpers.actionIcon(actionbtn)}"></i> ${actionbtn.title} </div> \
                               {{/if}}  \
                            {{/each}}\
                            {{if myMsgItem.actions.length > 2}}\
                            {{if helpers.compareCurntTimeAndTimln_minutes(myMsgItem.data.duration.start,myMsgItem.data.duration.end, null) <= 5}}\
                            <div class="actionBtns dropdown" {{if myMsgItem.data.color}}style="color:${myMsgItem.data.color};text-transform: uppercase;border: 2px solid ${myMsgItem.data.color}"{{/if}}  style="vertical-align:middle;" >\
                            {{else}}\
                            <div class="actionBtns dropdown" {{if myMsgItem.data.color}}style="color:${myMsgItem.data.color};text-transform: uppercase;border: 2px solid ${hexToRGBMeeting(myMsgItem.data.color)}"{{/if}}  style="vertical-align:middle;" >\
                            {{/if}}\
                            <i class="dropbtnWidgt" style="margin:0;margin-top: 0px;top: unset;" onclick="showDropdown(this)">More</i>\
                            <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                            {{each(key, actionbtn) myMsgItem.actions}} \
                            {{if key >= 2}}\
                            {{if actionbtn.type === "postback"}}\
                                    <li {{if myMsgItem.data.color}}style="color: ${myMsgItem.data.color};text-transform: uppercase;"{{/if}}  class="dropdown-item" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)">"${actionbtn.title}"</li>\
                                    {{else}}\
                                    <li {{if myMsgItem.data.color}}style="color: ${myMsgItem.data.color};text-transform: uppercase;"{{/if}}  class="dropdown-item" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(myMsgItem)}" onclick="passMeetingUtterances(this)">${actionbtn.title}</li>\
                                {{/if}}\
                            {{/if}}\
                          {{/each}}\
                        </ul>\
                            </div> \
                            {{/if}}\
                      </div>\
                      </div>\
                    </div>\
                  </div>\
              {{/each}}\
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
            </div>\
          </div>  \
      </scipt>';

  var tasksTemplate = '<script id="chat_message_tasks_tmpl" type="text/x-jqury-tmpl"> \
          <div class="allTaskCntr"   payload="{{if tempdata && tempdata.buttons && tempdata.buttons.length && tempdata.buttons[0].api}}${tempdata.buttons[0].api}{{/if}}">\
              {{each(key, msgItem) tempdata.elements}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2}}\
                          <div class="viewTask{{if msgItem.data.status === "Close"}} closeTask{{/if}}" id="${msgItem.id}">\
                              {{if panelDetail.showAll}}\
                                  <div class="viewTaskLft">\
                                      <div class="roundCheckbox">\
                                          <input {{if msgItem.data.status === "Close"}}disabled="disabled"{{/if}} class="taskSel" type="checkbox" id="task_${msgItem.id}" onclick="taskkAction(\'${msgItem.id}\',\'${msgItem.title}\',this)" {{if taskCheckbox(msgItem.id)}}checked{{/if}} />\
                                          <label for="task_${msgItem.id}"></label>\
                                      </div>\
                                  </div>\
                              {{/if}}\
                              <div class="viewTaskRgtt{{if msgItem.data.status === "Close"}} closeTask{{/if}}"   {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                  <div class="title">${msgItem.title}\
                                      <i  class="icon-More dropbtnWidgt" onclick="showDropdown(this)"></i>\
                                      <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                                          {{each(key, actionbtnli) msgItem.actions}} \
                                              {{if actionbtnli.type === "postback"}}\
                                                  <li class="dropdown-item" payload="${JSON.stringify(msgItem)}"   onclick="passTaskUtterances(this, ${key})">"${actionbtnli.title}"</li>\
                                              {{/if}}\
                                          {{/each}}\
                                      </ul>\
                                  </div> \
                                  {{if checkOverDue(msgItem.data.status, msgItem.data.dueDate)}}\
                                      <div class="taskDateCntr" style="color: #fc4a61"> \
                                          <i class="icon-Time icon16Gray"></i> <span>{{html helpers.getTimeline(msgItem.data.dueDate, "fulldate")}}, {{html helpers.getTimeline(msgItem.data.dueDate, "time")}}</span>\
                                      </div> \
                                  {{else}} \
                                      <div class="taskDateCntr"> \
                                          <i class="icon16Gray icon-Time"></i> <span>{{html helpers.getTimeline(msgItem.data.dueDate, "fulldate")}}, {{html helpers.getTimeline(msgItem.data.dueDate, "time")}}</span>\
                                      </div> \
                                  {{/if}}\
                                  <div class="userCntr"> \
                                      <i class="icon16Gray icon-Material-Person"></i>\
                                      {{if checkCurrentUser(msgItem.data.owner._id, msgItem.data.assignee._id)}}\
                                          <div style="display: inline-block">You</div>\
                                      {{else}}\
                                          {{html helpers.checkTaskUser(msgItem.data.owner.fN, msgItem.data.owner.lN, msgItem.data.owner._id)}}\
                                          <i style="margin: 0px 5px;" class="fa fa-caret-right" aria-hidden="true"></i>\
                                          {{html helpers.checkTaskUser(msgItem.data.assignee.fN, msgItem.data.assignee.lN, msgItem.data.assignee._id)}}\
                                      {{/if}}\
                                  </div>\
                              </div>\
                          </div>\
                      {{/if}}\
                  {{else}}\
                      <div class="viewTask{{if msgItem.data.status === "Close"}} closeTask{{/if}}" id="${msgItem.id}">\
                          {{if panelDetail.showAll}}\
                              <div class="viewTaskLft">\
                                  <div class="roundCheckbox">\
                                      <input {{if msgItem.data.status === "Close"}}disabled="disabled"{{/if}} class="taskSel" type="checkbox" id="task_${msgItem.id}" onclick="taskkAction(\'${msgItem.id}\',\'${msgItem.title}\',this)" {{if taskCheckbox(msgItem.id)}}checked{{/if}}/>\
                                      <label for="task_${msgItem.id}"></label>\
                                  </div>\
                              </div>\
                          {{/if}}\
                          <div class="viewTaskRgtt{{if msgItem.data.status === "Close"}} closeTask{{/if}}" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                              <div class="title">${msgItem.title}\
                                  <i  class="icon-More dropbtnWidgt" onclick="showDropdown(this)"></i>\
                                  <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                                      {{each(key, actionbtnli) msgItem.actions}} \
                                          {{if actionbtnli.type === "postback"}}\
                                              <li class="dropdown-item" payload="${JSON.stringify(msgItem)}"   onclick="passTaskUtterances(this, ${key})">"${actionbtnli.title}"</li>\
                                          {{/if}}\
                                      {{/each}}\
                                  </ul>\
                              </div> \
                              {{if checkOverDue(msgItem.data.status, msgItem.data.dueDate)}}\
                                  <div class="taskDateCntr" style="color: #fc4a61"> \
                                      <i class="icon-Time icon16Gray"></i> <span>{{html helpers.getTimeline(msgItem.data.dueDate, "fulldate")}}, {{html helpers.getTimeline(msgItem.data.dueDate, "time")}}</span>\
                                  </div> \
                              {{else}} \
                                  <div class="taskDateCntr"> \
                                      <i class="icon16Gray icon-Time"></i> <span>{{html helpers.getTimeline(msgItem.data.dueDate, "fulldate")}}, {{html helpers.getTimeline(msgItem.data.dueDate, "time")}}</span>\
                                  </div> \
                              {{/if}}\
                              <div class="userCntr"> \
                                  <i class="icon16Gray icon-Material-Person"></i>\
                                  {{if checkCurrentUser(msgItem.data.owner._id, msgItem.data.assignee._id)}}\
                                      <div style="display: inline-block">You</div>\
                                  {{else}}\
                                      {{html helpers.checkTaskUser(msgItem.data.owner.fN, msgItem.data.owner.lN, msgItem.data.owner._id)}}\
                                      <i style="margin: 0px 5px;" class="fa fa-caret-right" aria-hidden="true"></i>\
                                      {{html helpers.checkTaskUser(msgItem.data.assignee.fN, msgItem.data.assignee.lN, msgItem.data.assignee._id)}}\
                                  {{/if}}\
                              </div>\
                          </div>\
                      </div>\
                  {{/if}}\
              {{/each}} \
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </script>';
  var filesTemplate = '<script id="chat_files_tmpl" type="text/x-jqury-tmpl"> \
          <div class="filesCntr" >\
              {{each(key, msgItem) tempdata.elements}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2}}\
                          <div class="carosalItem" onclick="openLink(\'${msgItem.default_action.url}\')">\
                              <div class="carpadding">\
                                  <div class="lftCntr">\
                                      <div class="fileCntr">{{html helpers.getFileIcon(msgItem.data.ext)}}</div>\
                                  </div>\
                                  <div class="rgtCntr" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                      <div class="fileName">${msgItem.title}</div>\
                                      {{if msgItem.sharedBy}}<div class="sharedBy">Shared by  ${msgItem.owners[0].displayName }</div>{{/if}}\
                                      <div class="lastModified">Last Edited ${helpers.getTimeline(msgItem.data.modifiedTime, "fulldate")}, ${helpers.getTimeline(msgItem.data.modifiedTime, "fullyear")}</div>\
                                  </div>\
                              </div>\
                          </div>\
                      {{/if}}\
                  {{else}}\
                      <div class="carosalItem" onclick="openLink(\'${msgItem.default_action.url}\')">\
                          <div class="carpadding">\
                              <div class="lftCntr">\
                                  <div class="fileCntr">{{html helpers.getFileIcon(msgItem.data.ext)}}</div>\
                              </div>\
                              <div class="rgtCntr" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                  <div class="fileName">${msgItem.title}</div>\
                                  {{if msgItem.sharedBy}}<div class="sharedBy">Shared by  ${msgItem.owners[0].displayName }</div>{{/if}}\
                                  <div class="lastModified">Last Edited ${helpers.getTimeline(msgItem.data.modifiedTime, "fulldate")}, ${helpers.getTimeline(msgItem.data.modifiedTime, "fullyear")}</div>\
                              </div>\
                          </div>\
                      </div>\
                  {{/if}}\
              {{/each}} \
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </script>';
  var defaultFilesTemplate = '<script id="chat_defaultFiles_tmpl" type="text/x-jqury-tmpl"> \
          <div class="filesCntr" >\
              {{each(key, msgItem) tempdata.elements}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2}}\
                          <div class="carosalItem" style="margin: 0px 5px 0px 5px;width: 97%;border-bottom: 1px solid var(--sdk-primary-border-color);" {{if msgItem.default_action}}onclick="openLink(\'${msgItem.default_action.url}\')" {{/if}}>\
                              <div class="carpadding">\
                                  <div class="lftCntr" style="padding-top: 5px;">\
                                      {{if msgItem.icon}}<div class="fileCntr"><img class="common" style="height: 60px; width: 60px;border-radius: 30px;" src="${msgItem.icon}"></img></div>{{/if}}\
                                  </div>\
                                  <div class="rgtCntr" style="min-height: 50px;border-bottom: 0px;padding-top: 10px; padding-bottom: 0px;width: calc(100% - 75px);" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                      <div class="fileName" style="font-weight: 600;padding-right: 23px;">${msgItem.title}\
                                      {{if msgItem.actions}}<i  class="icon-More dropbtnWidgt"  style="margin:0;margin-top: 0px; top: unset;" onclick="showDropdown(this)"></i>\
                                      <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                                          {{each(key1, actionbtnli) msgItem.actions}} \
                                              {{if actionbtnli.type === "postback"}}\
                                                  <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(msgItem)}" onclick="passUtterances(\'\',\'${actionbtnli.payload}\',event)">"${actionbtnli.title}"</li>\
                                              {{else}}\
                                                  <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(msgItem)}"  onclick="passUtterances(\'url\',\'${actionbtnli.url}\',event)">${actionbtnli.title}</li>\
                                              {{/if}}\
                                          {{/each}}\
                                      </ul>{{/if}}</div>\
                                      {{if msgItem.sub_title}}<div class="lastModified" style="font-size: 13px;">${msgItem.sub_title}</div>{{/if}}\
                                      {{if msgItem.text}}<div class="lastModified">${msgItem.text}</div>{{/if}}\
                                      {{if msgItem.modifiedTime}}<div class="lastModified">${msgItem.modifiedTime}</div>{{/if}}\
                                      {{if msgItem.button}}\
                                      {{each(key, actionbtn) msgItem.button}} \
                                          {{if actionbtn.type === "url"}}\
                                          <button class="btn actionBtns" style="background: none;border: 2px solid ${actionbtn.theme}; color: ${actionbtn.theme};" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}" onclick="passUtterances(\'url\',\'${actionbtn.title}\',event)">\
                                              ${actionbtn.title}\
                                          </button>\
                                      {{/if}}\
                                      {{if actionbtn.type === "postback"}}\
                                          <button class="btn actionBtns" style="background: none;border: 2px solid ${actionbtn.theme}; color: ${actionbtn.theme};" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}" onclick="passUtterances(\'\',\'${actionbtn.payload}\',event)">\
                                              ${actionbtn.title}\
                                          </button>\
                                      {{/if}}\
                                      {{/each}}\
                                      {{/if}}\
                                  </div>\
                              </div>\
                          </div>\
                      {{/if}}\
                  {{else}}\
                      <div class="carosalItem" style="margin: 0px 5px 0px 5px;width: 97%;border-bottom: 1px solid var(--sdk-primary-border-color);" {{if msgItem.default_action}} onclick="openLink(\'${msgItem.default_action.url}\')" {{/if}}>\
                          <div class="carpadding">\
                              <div class="lftCntr" style="padding-top: 5px;">\
                              {{if msgItem.icon}}<div class="fileCntr"><img class="common" style="height: 60px; width: 60px;border-radius: 30px;" src="${msgItem.icon}"></img></div>{{/if}}\
                              </div>\
                              <div class="rgtCntr" style="min-height: 50px;border-bottom: 0px;padding-top: 10px; padding-bottom: 0px;width: calc(100% - 75px);" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                  <div class="fileName" style="font-weight: 600;padding-right: 23px;">${msgItem.title}\
                                  {{if msgItem.actions}}<i  class="icon-More dropbtnWidgt" style="margin:0;margin-top: 0px; top: unset;" onclick="showDropdown(this)"></i>\
                                  <ul  class="dropdown-contentWidgt  rmpmW" style="list-style:none;">\
                                      {{each(key1, actionbtnli) msgItem.actions}} \
                                          {{if actionbtnli.type === "postback"}}\
                                              <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(msgItem)}" onclick="passUtterances(\'\',\'${actionbtnli.payload}\',event)">"${actionbtnli.title}"</li>\
                                          {{else}}\
                                              <li class="dropdown-item" actionObj="${JSON.stringify(actionbtnli)}" mainObj="${JSON.stringify(msgItem)}"  onclick="passUtterances(\'url\',\'${actionbtnli.url}\',event)">${actionbtnli.title}</li>\
                                          {{/if}}\
                                      {{/each}}\
                                  </ul>{{/if}}</div>\
                                  {{if msgItem.sub_title}}<div class="lastModified" style="font-size: 13px;">${msgItem.sub_title}</div>{{/if}}\
                                  {{if msgItem.text}}<div class="lastModified">${msgItem.text}</div>{{/if}}\
                                  {{if msgItem.modifiedTime}}<div class="lastModified">${msgItem.modifiedTime}</div>{{/if}}\
                                  {{if msgItem.button}}\
                                  {{each(key, actionbtn) msgItem.button}} \
                                      {{if actionbtn.type === "url"}}\
                                      <button class="btn actionBtns" style="background: none;border: 2px solid ${actionbtn.theme}; color: ${actionbtn.theme};" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}"  onclick="passUtterances(\'url\',\'${actionbtn.url}\',event)">\
                                          ${actionbtn.title}\
                                      </button>\
                                     {{/if}}\
                                     {{if actionbtn.type === "postback"}}\
                                      <button class="btn actionBtns" style="background: none;border: 2px solid ${actionbtn.theme}; color: ${actionbtn.theme};" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}"  onclick="passUtterances(\'\',\'${actionbtn.payload}\',event)">\
                                          ${actionbtn.title}\
                                      </button>\
                                     {{/if}}\
                                  {{/each}}\
                                  {{/if}}\
                              </div>\
                          </div>\
                      </div>\
                  {{/if}}\
              {{/each}} \
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </script>';
  var knowledgeTemplate = '<script id="chat_message_knowledge_tmpl" type="text/x-jqury-tmpl"> \
      <div class="knowledgeCntr"  >\
          {{each(key, msgItem) tempdata.elements}} \
              {{if panelDetail.viewmore}}\
                  {{if key<= 2 }}\
                      <div class="carosalItem" id="${msgItem.id}" onclick="openArticle(\'${msgItem.id}\')">\
                          <div class="carosalCntr">\
                              <div class="lftCntr" style="width:{{if msgItem.imageUrl && msgItem.imageUrl != null}} calc(100% - 90px) {{else}} 100%{{/if}};">\
                                  <div class="title">${msgItem.title}</div>\
                                  <div class="lastModified">Modified ${helpers.getTimeline(new Date(msgItem.lastMod), "fulldate")} at ${helpers.getTimeline(new Date(parseInt(msgItem.lastMod)), "time")}</div>\
                                  <div class="subtitle" style="-webkit-box-orient: vertical;">${msgItem.desc}</div>\
                              </div>\
                              {{if msgItem.imageUrl && msgItem.imageUrl != null}}\
                                  <div class="rgtCntr">\
                                      <img src="${msgItem.imageUrl}" class="knwImg">\
                                  </div>\
                              {{/if}}\
                              <div class="actionCntr">\
                                  <div class="viewsCntr">\
                                      <i class="iconConfig icon-Material-Eye"></i>\
                                      <span class="actionItemCount">${msgItem.nViews}</span>\
                                  </div>\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="commentCntr">\
                                          <i class="iconConfig icon-iOS---Comment"></i>\
                                          <span class="actionItemCount">${msgItem.nComments}</span>\
                                      </div>\
                                  {{/if}}\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="votesupCntr">\
                                          <i class="iconConfig icon-Like-Yes-Material-Filled"></i>\
                                          <span class="actionItemCount">{{if msgItem.nUpVotes}}${msgItem.nUpVotes}{{else}}0{{/if}}</span>\
                                      </div>\
                                  {{/if}}\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="votesdownCntr">\
                                          <i class="iconConfig icon-Dislike-Material"></i>\
                                          <span class="actionItemCount">{{if msgItem.nDownVotes}}${msgItem.nDownVotes}{{else}}0{{/if}}</span>\
                                      </div>\
                                  {{/if}}\
                              </div>\
                          </div>\
                      </div>\
                  {{/if}}\
                  {{else}}\
                      <div class="carosalItem" id="${msgItem.id}" onclick="openArticle(\'${msgItem.id}\')">\
                          <div class="carosalCntr" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                              <div class="lftCntr" style="width:{{if msgItem.imageUrl && msgItem.imageUrl != null}} calc(100% - 90px) {{else}} 100%{{/if}};">\
                                  <div class="title">${msgItem.title}</div>\
                                  <div class="lastModified">Modified ${helpers.getTimeline(new Date(msgItem.lastMod), "fulldate")} at ${helpers.getTimeline(new Date(parseInt(msgItem.lastMod)), "time")}</div>\
                                  <div class="subtitle" style="-webkit-box-orient: vertical;">${msgItem.desc}</div>\
                              </div>\
                              {{if msgItem.imageUrl && msgItem.imageUrl != null}}\
                                  <div class="rgtCntr">\
                                      <img src="${msgItem.imageUrl}" class="knwImg">\
                                  </div>\
                              {{/if}}\
                              <div class="actionCntr">\
                                  <div class="viewsCntr">\
                                      <i class="iconConfig icon-Material-Eye"></i>\
                                      <span class="actionItemCount">${msgItem.nViews}</span>\
                                  </div>\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="commentCntr">\
                                          <i class="iconConfig icon-iOS---Comment"></i>\
                                          <span class="actionItemCount">${msgItem.nComments}</span>\
                                      </div>\
                                  {{/if}}\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="votesupCntr">\
                                          <i class="iconConfig icon-Like-Yes-Material-Filled"></i>\
                                          <span class="actionItemCount">{{if msgItem.nUpVotes}}${msgItem.nUpVotes}{{else}}0{{/if}}</span>\
                                      </div>\
                                  {{/if}}\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="votesdownCntr">\
                                          <i class="iconConfig icon-Dislike-Material"></i>\
                                          <span class="actionItemCount">{{if msgItem.nDownVotes}}${msgItem.nDownVotes}{{else}}0{{/if}}</span>\
                                      </div>\
                                  {{/if}}\
                              </div>\
                          </div>\
                      </div>\
                  {{/if}}\
          {{/each}}\
          <div style="clear:both"></div>\
          {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
              <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
          {{/if}}\
          {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
              <div class="noContent">\
                  <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                  <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
              </div>\
          {{/if}}\
          </div>\
      </scipt>';
  var announcementTemplate = '<script id="chat_message_announcement_tmpl" type="text/x-jqury-tmpl"> \
          <div class="announcementCntr" >\
              {{each(key, msgItem) tempdata.elements}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2 }}\
                          <div class="carosalItemAnnc" id="${msgItem.id}" onclick="openAnnouncement(\'${msgItem.id}\')">\
                              <div class="carosalCntr" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                  <div class="lftIconCntr"><div class="icon" style="background: ${msgItem.owner.color}">\
                                      <div class="icon" style="background: ${msgItem.owner.color}">\
                                          {{if msgItem && msgItem.owner.fN}}${msgItem.owner.fN[0]}{{/if}}{{if msgItem && msgItem.owner.lN}}${msgItem.owner.lN[0]}{{/if}}\
                                      </div>\
                                  </div>\
                              </div>\
                              <div class="lftCntr lftCntrAnnnc" style="width:{{if msgItem.imageUrl && msgItem.imageUrl != null}} calc(100% - 50px) {{else}} calc(100% - 36px) {{/if}};">\
                                  <div class="title titleAnnc">${msgItem.owner.fN} ${msgItem.owner.lN} <span class="lastModifiedAnnc pull-right">${helpers.getTimeLineNotification(msgItem.sharedOn)}</span></div>\
                                  <div class="col-12 rmpm sharedList" style="-webkit-box-orient: vertical;"> \
                                      {{each(index, list) msgItem.sharedList}}\
                                          {{if index == 0}}\
                                              <span>${list.name} </span> \
                                          {{/if}}\
                                          {{if index > 0}}\
                                              <span> , ${list.name} </span>\
                                          {{/if}}\
                                      {{/each}}\
                                  </div>\
                                  <div class="col-12 rmpm infoTitleA_NL" style="-webkit-box-orient: vertical;padding-bottom:3px;"> ${msgItem.title} </div>\
                                  <div class="subtitle" style="-webkit-box-orient: vertical;">${msgItem.subtitle}</div>\
                              </div>\
                              {{if msgItem.imageUrl && msgItem.imageUrl != null}}\
                                  <div class="rgtCntr">\
                                      <img src="${msgItem.imageUrl}" class="knwImg">\
                                  </div>\
                              {{/if}}\
                              <div class="actionCntr actionCntrAnnc">\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="commentCntr">\
                                          <i class="commentIcon icon-iOS---Comment"></i>\
                                          <span class="commentCount">${msgItem.nComments}</span>\
                                      </div>\
                                  {{/if}}\
                                  {{if msgItem.nShares && msgItem.nShares > 0}}\
                                      <div class="votesupCntr1">\
                                          <i class="votesupIcon icon-Like-Yes-Material-Filled"></i>\
                                          <span class="commentCount">{{if msgItem.nUpVotes}}${msgItem.nUpVotes}{{else}}0{{/if}}</span>\
                                      </div>\
                                  {{/if}}\
                              </div>\
                          </div>\
                      {{/if}}\
                      {{else}}\
                          <div class="carosalItem" id="${msgItem.id}"  onclick="openAnnouncement(\'${msgItem.id}\')">\
                              <div class="carosalCntr" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                                  <div class="lftIconCntr">\
                                      <div class="icon" style="background: ${msgItem.owner.color}">\
                                          {{if msgItem && msgItem.owner.fN}}${msgItem.owner.fN[0]}{{/if}}{{if msgItem && msgItem.owner.lN}}${msgItem.owner.lN[0]}{{/if}}\
                                      </div>\
                                  </div>\
                                  <div class="lftCntr" style="width:{{if msgItem.imageUrl && msgItem.imageUrl != null}} calc(100% - 50px) {{else}} calc(100% - 36px) {{/if}};">\
                                      <div class="title titleAnnc">${msgItem.owner.fN} ${msgItem.owner.lN} <span class="lastModifiedAnnc pull-right">${helpers.getTimeLineNotification(msgItem.sharedOn)}</span></div>\
                                      <div class="col-12 rmpm sharedList" style="-webkit-box-orient: vertical;"> \
                                          {{each(index, list) msgItem.sharedList}}\
                                              {{if index == 0}}\
                                                  <span>${list.name} </span> \
                                              {{/if}}\
                                              {{if index > 0}}\
                                                  <span> , ${list.name} </span>\
                                              {{/if}}\
                                          {{/each}}\
                                      </div>\
                                      <div class="col-12 rmpm infoTitleA_NL" style="-webkit-box-orient: vertical;padding-bottom:3px;"> ${msgItem.title} </div>\
                                      <div class="subtitle" style="-webkit-box-orient: vertical;">${msgItem.desc}</div>\
                                  </div>\
                                  <div class="actionCntr">\
                                      {{if msgItem.nShares && msgItem.nShares > 0}}\
                                          <div class="commentCntr">\
                                              <i class="iconConfig icon-iOS---Comment"></i>\
                                              <span class="actionItemCount">${msgItem.nComments}</span>\
                                          </div>\
                                      {{/if}}\
                                      {{if msgItem.nShares && msgItem.nShares > 0}}\
                                          <div class="votesupCntr">\
                                              <i class="iconConfig icon-Like-Yes-Material-Filled"></i>\
                                              <span class="actionItemCount">{{if msgItem.nUpVotes}}${msgItem.nUpVotes}{{else}}0{{/if}}</span>\
                                          </div>\
                                      {{/if}}\
                                  </div>\
                              </div>\
                          </div>\
                      {{/if}}\
              {{/each}}\
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </scipt>';
  var hashtagTemplate = '<script id="chat_message_hashtag_tmpl" type="text/x-jqury-tmpl"> \
          <div class="trendingHashtagCntr"  >\
              {{each(key, msgItem) tempdata.elements}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2 }}\
                          <div class="carosalItemHash" onclick="passHashTag(\'${msgItem.title}\')" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                              <span>${msgItem.title}</span>\
                              <span class="hashCount">${msgItem.title_right}</span>\
                          </div>\
                      {{/if}}\
                  {{else}}\
                      <div class="carosalItemHash" onclick="passHashTag(\'${msgItem.title}\')" {{if key === tempdata.elements.length - 1}}style="border-bottom:0"{{/if}}>\
                          <span>${msgItem.title}</span>\
                          <span class="hashCount">${msgItem.title_right}</span>\
                      </div>\
                  {{/if}}\
              {{/each}}\
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length > 2 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </scipt>';
  var skillsTemplate = '<script id="chat_message_skills_tmpl" type="text/x-jqury-tmpl"> \
          <div class="skillsCntr"  >\
              {{each(key, msgItem) tempdata.actions}} \
                  {{if panelDetail.viewmore}}\
                      {{if key<= 2 }}\
                          <div class="carosalItemHash" onclick="passUtterances(\'${msgItem.id}\',\'${payload}\')">\
                              <span title="${msgItem.title}">${msgItem.title}</span>\
                          </div>\
                      {{/if}}\
                  {{else}}\
                      <div class="carosalItemHash" onclick="passUtterances(\'${msgItem.id}\',\'${payload}\')">\
                          <span title="${msgItem.title}">${msgItem.title}</span>\
                      </div>\
                  {{/if}}\
              {{/each}}\
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.actions.length > 3 && panelDetail.viewmore}} \
                  <div class="viewMore" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">View more <i class="moreArrow icon-Disclose1"></i></div>\
              {{/if}}\
              {{if tempdata && tempdata.elements && tempdata.actions.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </scipt>';
  var chartListTemplate = '<script id="chat_message_chartList_tmpl" type="text/x-jqury-tmpl"> \
          <div class="" style="margin-top: 11px;">\
              {{each(key, msgItem) tempdata.elements}} \
              <div style="position: relative; max-width: 25%; max-height: 25%; width: calc(100%/${tempdata.elements.length} - 5px);height: calc(100%/${tempdata.elements.length} - 5px);\
                  float : left; margin: 2px;">\
                  <div class="" style="border-radius: 100%; border: 1px solid #ddd; \
                      width: 100%;height: 100%;\
                      padding-bottom: 100%; background: ${msgItem.theme} ">\
                  </div>\
                  <div class="" style="text-align: center;font-weight: 600; word-break: break-word;">${msgItem.title}</div>\
                  <div class="" style="position: absolute;top:16%; color: #fff; margin-left: calc(125px/${tempdata.elements.length}); left: calc(key *100%/${tempdata.elements.length} + 5%)">${msgItem.text}</div>\
              </div>\
              {{/each}}\
              <div style="clear:both"></div>\
              {{if tempdata && tempdata.elements && tempdata.elements.length === 0}}\
                  <div class="noContent">\
                      <img class="img img-fluid" src="/assets/images/widget/nodata.svg" width="118px" height="118px" style="margin-top:15px;">\
                      <div class="col-12 rmpmW nodataTxt">${tempdata.placeholder}</div>\
                  </div>\
              {{/if}}\
          </div>\
      </scipt>';
  var popUpTemplate = '<script id="chat_message_popup_tmpl" type="text/x-jqury-tmpl"> \
          <div class="popupPreview" id="preview_${tempdata[0].id}"></div>\
          <div class="defaultPopupCntr" id="popup_${tempdata[0].id}">\
              <div class="popupContentCntr">\
                  {{if tempdata[0] && tempdata[0].title}} <div class="title">${tempdata[0].title}</div>{{/if}}\
                  {{if tempdata[0] && tempdata[0].desc}} <div class="desc">${tempdata[0].desc}</div>{{/if}}\
                  {{if tempdata[0] && tempdata[0].buttons && tempdata[0].buttons.length}}\
                      <div class="btnCntr">\
                          {{each(key, msgItem) tempdata[0].buttons}} \
                              <button class="btn" actionObj="${actionObj}" mainObj="${mainObj}" onclick="popupAction(\'${JSON.stringify(tempdata)}\',\'${msgItem.title}\', this)">\
                                  ${msgItem.title}\
                              </button>\
                          {{/each}}\
                      </div>\
                  {{/if}}\
              </div>\
          </div>\
      </scipt>';
  var defaultTemplate = '<script id="chat_message_default_tmpl" type="text/x-jqury-tmpl"> \
          <div class="defaultTemplateCntr">\
              Panel need to define\
          </div>\
      </scipt>';
  var errorTemplate = '<script id="chat_message_error_tmpl" type="text/x-jqury-tmpl"> \
          <div class="errorTemplateCntr">\
              <div class="imgCntr"> <img class="img img-fluid" src="assets/images/widget/widgetError.png"></div>\
              <div class="oopsErrorText">Oops!! Something went wrong!</div>\
          </div>\
      </scipt>';
  var ErrorTemplate = '<script id="chat_Error_tmpl" type="text/x-jqury-tmpl"> \
                            <div class="errorTemplateCntr {{if tempdata && !tempdata.templateType}}notFound{{/if}} {{if tempdata && tempdata.templateType}}${tempdata.templateType}{{/if}}">\
                                <div class="imgCntr"></div>\
                                {{if tempdata && tempdata.templateType && !tempdata.elements}}\
                                    {{if tempdata.errMsg}}\
                                      <div class="oopsErrorTitle">${tempdata.errMsg}</div>\
                                    {{else}}\
                                      <div class="oopsErrorTitle">No Data Available</div>\
                                    {{/if}}\
                                    {{if false && tempdata.errMsgDiscription}}\
                                      <div class="oopsErrorDesc">Looks like there is no data availble to show it to you.</div>\
                                    {{/if}}\
                                {{else}}\
                                     <div class="oopsErrorTitle">Page not found</div>\
                                {{/if}}\
                                <div class="oopsErrorBtns">\
                                    <button role="button" tabindex="0" aria-label="Refresh Widget" class="buttonSolid" onclick="refreshElement(\'${JSON.stringify(panelDetail)}\')" id="refreshData" {{if panelDetail}}panelDetail="${JSON.stringify(panelDetail)}"{{/if}}>Refresh</button>\
                                </div>\
                            </div>\
                          </scipt>';
  var AuthRequired = '<script id="chat_message_authRequired_tmpl" type="text/x-jqury-tmpl"> \
                            <div class="errorTemplateCntr authRequired">\
                                <div aria-hidden="true" class="imgCntr"></div>\
                                <div role="heddi" class="oopsErrorTitle">Authorization Needed!</div>\
                                <div class="oopsErrorBtns">\
                                    <button  role="button" tabindex="0" class="buttonSolid action" {{if tempdata && tempdata.elements && tempdata.elements.length && tempdata.elements[0].defaultAction}}actionObj="${JSON.stringify(tempdata.elements[0].defaultAction)}"{{/if}} {{if panelDetail}}panelDetail="${JSON.stringify(panelDetail)}"{{/if}}>Login</button>\
                                </div>\
                            </div>\
                          </scipt>';
  var filterTemplate = '<script id="chat_message_filter_tmpl" type="text/x-jqury-tmpl"> \
        <div class="filterTemplateCntr">\
            <div class="wiz-filters">\
            <div class="wix-filter-header">Filters<span class="wid-filter-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAANlJREFUKBWdkkEKwjAQRWdSqBfwHDmEPYTgBVwXvIWCO8GlG6GHaA/hObxAC3Xan5AmrUkFZ1OY+S//Txo+3x6a6HPlbLM/HQ9vWqnL/bmVvq2IVKkAidBO+q7GIMVZqKuhBaPgxMwvEdEp2EOioTUMHL4HeeFip2bsosUEmCEF0lgnf+AEQrSEDRiB0J+BaISwEZidvBN6qPFW/6uZY+iGnXBkbD/0J3AJcZYXBly7nBj083esQXBExTQKby+1h8WI4I7o/oW11XirqmSmBgMXzwHh18PUgBkAXhfn47Oroz4AAAAASUVORK5CYII=" class="closeCross"></span></div>\
              {{each(index,filter) filterOptions}} \
                  {{if filter && filter.type==="enum"}}\
                      <div class="wiz-filter">\
                            <div class="title">${filter.title}</div>\
                            <div class="open-filters" id="${filter.field}">\
                                  <div class="filterInputTags">\
                                          {{if filter && filter.selected}} \
                                                {{each(index,selectItem) filter.data}} \
                                                        {{if selectItem && selectItem.isSelect}} \
                                                        <span field="${selectItem.title}" value="${selectItem.fieldValue}" >${selectItem.title}</span>\
                                                        {{/if}}\
                                                {{/each}}\
                                          {{/if}}\
                                          {{if filter && !filter.isSelect}} \
                                                <span>${"Select "+filter.title}</span>\
                                          {{/if}}\
                                  </div>\
                            </div>\
                      </div>\
                  {{/if}}\
                  {{if (filter && filter.type==="radio")}}\
                    <div class="wiz-filter {{if filter.view==="horizontal"}}horizontalView{{/if}}">\
                        <div class="title">${filter.title}</div>\
                        <div class="open-radiofilters">\
                            <div class="radiodivsdk" filter-type="radioFilter" filter-index="${index}">\
                                {{each(index,filterItem) filter.data}} \
                                    <label for="filterRadioHoriz_${filterItem.title}" class="radioItemContainer" field="${filterItem.field}">\
                                        <span>${filterItem.title}<span>\
                                          <input field="${filterItem.field}" {{if filterItem.isSelect}}checked{{/if}} name="radioFilterVertical" value-index="${index}" class="taskSelRadio" type="radio" value="${filterItem.isSelect}" id="filterRadioHoriz_${filterItem.title}"/>\
                                        <span class="checkmark"><span>\
                                    </label>\
                                {{/each}}\
                            </div>\
                        </div>\
                    </div>\
                 {{/if}}\
                 {{if  (filter && filter.type==="checkbox")}}\
                 <div class="wiz-filter {{if filter.view==="horizontal"}}horizontalView{{/if}}">\
                    <div class="title">${filter.title}</div>\
                    <div class="radiodivsdk" filter-type="checkBoxFilter" filter-index="${index}">\
                        {{each(index,filterItem) filter.data}} \
                            <label for="filterCheckHorixontal_${filterItem.value}" class="container checkContainer">\
                                <span>${filterItem.title}<span>\
                                <input filed="${filterItem.title}" {{if filterItem.isSelect}}checked{{/if}} name="${filterItem.title}" element="filterCheckbox" value-index="${index}"  class="taskSelRadio" type="checkbox" value="${filterItem.value}" id="filterCheckHorixontal_${filterItem.value}"/>\
                                <span class="checkmark"><span>\
                            </label>\
                        {{/each}}\
                    </div>\
                 </div>\
              {{/if}}\
              {{/each}}\
            </div>\
            <div class="action-bar">\
              <button class="btn apply-btn">Apply</button>\
            </div>\
        </div>\
     </scipt>';
  var filterOptionsTemplate = '<script id="chat_message_filterOptions_tmpl" type="text/x-jqury-tmpl"> \
                  <div class="filterOptionsTemplateCtrl">\
                      <div class="sortBy">\
                            <div class="wix-filter-header">${"Select  "+ filterSelectedItems.title}<span class="wid-filter-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAANlJREFUKBWdkkEKwjAQRWdSqBfwHDmEPYTgBVwXvIWCO8GlG6GHaA/hObxAC3Xan5AmrUkFZ1OY+S//Txo+3x6a6HPlbLM/HQ9vWqnL/bmVvq2IVKkAidBO+q7GIMVZqKuhBaPgxMwvEdEp2EOioTUMHL4HeeFip2bsosUEmCEF0lgnf+AEQrSEDRiB0J+BaISwEZidvBN6qPFW/6uZY+iGnXBkbD/0J3AJcZYXBly7nBj083esQXBExTQKby+1h8WI4I7o/oW11XirqmSmBgMXzwHh18PUgBkAXhfn47Oroz4AAAAASUVORK5CYII=" class="closeCross"></span></div>\
                            {{if filterSelectedItems.isMulti === "Yes"}}\
                            <div class="radiodivsdk">\
                                {{each(index,filterItem) filterSelectedItems.data}} \
                                    <label for="filter_${filterItem.value}" class="container checkContainer">\
                                        <span>${filterItem.title}<span>\
                                        <input filed="${filterItem.title}" {{if filterItem.isSelect}}checked{{/if}} name="${filterItem.title}" class="taskSelRadio" type="checkbox" value="${filterItem.value}" id="filter_${filterItem.value}"/>\
                                        <span class="checkmark"><span>\
                                    </label>\
                                {{/each}}\
                            </div>\
                            {{else}}\
                            <div class="radiodivsdk" >\
                              {{each(index,filterItem) filterSelectedItems.data}} \
                              <div class="tickMarkContainer {{if filterItem.isSelect}}selected{{/if}}" field="${filterItem.title}">\
                                <span class="selectDropValue" valueObj="${JSON.stringify(filterItem)}">${filterItem.title}</span>\
                                <span class="selectedFilterTick "></span>\
                              </div>\
                              {{/each}}\
                            </div>\
                            {{/if}}\
                      </div>\
                      <div class="action-bar">\
                        <button class="btn apply-btn">Done</button>\
                      </div>\
                  </div>\
                </scipt>';
  var List = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
                <div role="main" class="tab-list-template" mainObj="${JSON.stringify(tempdata)}" panelDetail="${JSON.stringify(panelDetail)}">\
                   {{if tempdata}} \
                    <div class="sheetHeader hide">\
                        <div class="headerLeft">\
                        {{if panelDetail && panelDetail.widgetTitle}}\
                           <span class="choose">${panelDetail.widgetTitle}</span>\
                           {{else}}\
                             <span class="choose">${tempdata.widgetName}</span>\
                        {{/if}}\
                        {{if tempdata.description}}\
                        <p class="listViewItemSubtitle">${tempdata.description}</p>\
                        {{/if}}\
                        </div>\
                        {{if tempdata && tempdata.headerOptions && tempdata.headerOptions.type==="button" && tempdata.headerOptions.button && tempdata.headerOptions.button.title}}\
                        <div class="headerRight">\
                            <div role="button"  tabindex="0" actionObj="${JSON.stringify(tempdata.headerOptions.button)}" class="headerActionBTN action">${tempdata.headerOptions.button.title}</div>\
                        </div>\
                        {{/if}}\
                        {{if (tempdata.headerOptions && tempdata.headerOptions.type === "url" && tempdata.headerOptions.url && tempdata.headerOptions.url.title)}}\
                          <div class="headerRight">\
                             <div role="button" tabindex="0" actionObj="${JSON.stringify(tempdata.headerOptions.url)}" class="headerActionLink action">${tempdata.headerOptions.url.title}</div>\
                         </div>\
                        {{/if}}\
                        <div class="headerRight" style="display:none;">\
                          <div class="headerActionEllipsis">\
                          <i class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)"></i>\
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
                                      <div class="listViewItemTitle">${msgItem.title}</div> \
                                      {{if msgItem.subtitle}}\
                                        <div class="listViewItemSubtitle">${msgItem.subtitle}</div>\
                                      {{/if}} \
                                    </span>\
                              </div>\
                              {{if (msgItem.value && msgItem.value.type === "text" && msgItem.value.text)}}\
                                <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}}>\
                                    <div class="listViewItemValue {{if !msgItem.subtitle}}top10{{/if}}">${msgItem.value.text}</div>\
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
                                    <div role="navigation" actionObj="${JSON.stringify(msgItem.value.url)}" class="listViewItemValue actionLink action {{if !msgItem.subtitle}}top10{{/if}}">${msgItem.value.url.title}</div>\
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
                                  <i class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)"></i>\
                                      <ul role="list" class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                        {{each(key, actionbtnli) msgItem.value.menu}} \
                                              <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
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
                                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">\
                                        <path d="M10.9615 6.36398C10.9695 5.97582 10.7986 5.67266 10.7001 5.51298C10.5989 5.34876 10.4588 5.16209 10.3227 4.98073L7.38484 1.06354C7.29149 0.938993 7.18594 0.798167 7.08438 0.685249C6.97238 0.560728 6.78622 0.377328 6.50548 0.268145C6.15577 0.132135 5.76778 0.132135 5.41807 0.268145C5.13734 0.377328 4.95118 0.560728 4.83918 0.685249C4.73762 0.798154 4.6321 0.938945 4.53876 1.06348L1.60084 4.98072C1.46475 5.16209 1.32469 5.34876 1.22343 5.51298C1.12497 5.67266 0.954034 5.97582 0.962104 6.36398C0.971464 6.81413 1.18253 7.23626 1.53703 7.51384C1.84272 7.75319 2.18781 7.79834 2.37463 7.81538C2.56675 7.8329 2.80011 7.83286 3.02685 7.83281H8.89668C9.12342 7.83286 9.35681 7.8329 9.54893 7.81538C9.73575 7.79834 10.0808 7.75319 10.3865 7.51384C10.741 7.23626 10.9521 6.81413 10.9615 6.36398Z" fill="#101828"/>\
                                      </svg>\
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
                                <div class="dropbtnWidgt actionBtns" style="margin:0;margin-top: 0px;top: unset;" onclick="showDropdown(this)">... More</div>\
                                <ul  class="dropdown-contentWidgt" style="list-style:none;">\
                                  {{each(key, actionbtn) msgItem.buttons}} \
                                   {{if key >= 2}}\
                                          <li role="button" tabindex="0" class="dropdown-item action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}">\
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
             </script>';
  var barChartTemplate = '<script id="chat_message_barchart_tmpl" type="text/x-jqury-tmpl"> \
             <div class="bar-chart-template" >\
               <div class="tab-list-template" mainObj="${JSON.stringify(tempdata)}">\
                 {{if tempdata}} \
                   <div class="listTemplateContainer">\
                   {{if tempdata.tabs && tabs.length}} \
                     <div class="tabsContainer">\
                       {{each(key, tab) tabs}} \
                       <span class="tabs" data-tabid="${tab}" ><span class="btnBG">${tab}</span></span>\
                       {{/each}}\
                     </div>\
                   {{/if}} \
                     <ul class="displayListValues">\
                       <li class="listViewTmplContentChild"> \
                         <div class="listViewTmplContentChildRow">\
                         {{if tempdata.image && tempdata.image.image_type === "image"}} \
                                 <div class="listViewRightContent"> \
                                     <img aria-hidden="true"  alt="image" src="${tempdata.image.namespace}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                 </div> \
                         {{/if}} \
                         <div class="listViewLeftContent"> \
                               <div class="barchartDiv">\
                                       <div class="wiz-header-buttons hide">\
                                         {{if tempdata.buttons && tempdata.buttons.length > 1}} \
                                           <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                           <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                             {{each(key, actionbtnli) tempdata.buttons}} \
                                                   <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                 <i>\
                                                 {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                 <span class="wid-temp-btnImage"> \
                                                 <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                 </span> \
                                                 {{/if}} \
                                                 </i>${actionbtnli.title}</li>\
                                             {{/each}}\
                                           </ul>\
                                         {{/if}}\
                                         {{if tempdata.buttons && tempdata.buttons.length === 1}} \
                                             {{each(key, actionbtnli) tempdata.buttons}} \
                                                 <a role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                     {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                       <i>\
                                                         <span class="wid-temp-btnImage"> \
                                                             <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                         </span> \
                                                       </i>\
                                                     {{/if}} \
                                                     {{if actionbtnli.title}}\
                                                       ${actionbtnli.title}\
                                                     {{/if}}\
                                                 </a>\
                                             {{/each}}\
                                         {{/if}}\
                                       </div>\
                               </div>\
                               <div class="" id="barchart"></div>\
                               {{if tempdata.value && tempdata.value.type=="text"}}<div class="listViewItemValue">${tempdata.value.text}</div>{{/if}} \
                               {{if tempdata.value && tempdata.value.type=="button"}}\
                                   {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length > 1}} \
                                     <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                     <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                       {{each(key, actionbtnli) tempdata.value.buttons}} \
                                             <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                           <i>\
                                           {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                           <span class="wid-temp-btnImage"> \
                                               <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                           </span> \
                                           {{/if}} \
                                           </i>${actionbtnli.title}</li>\
                                       {{/each}}\
                                     </ul>\
                                   {{/if}}\
                                   {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length === 1}} \
                                     <div role="button" tabindex="0" class="viewMore action" actionObj="${JSON.stringify(tempdata.value.buttons[0])}" >${tempdata.value.buttons[0].title}</div>\
                                   {{/if}}\
                               {{/if}} \
                         </div>\
                         </div>\
                         {{if tempdata.content && tempdata.content.length}} \
                         <div class="tabListViewDiscription">\
                           {{each(key, content) tempdata.content}} \
                             {{if key < 3 }}\
                               <div class="wid-temp-contentDiv">\
                                 {{if content.image && content.image.image_type === "image"}} \
                                     <span class="wid-temp-discImage"> \
                                         <img aria-hidden="true"  alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                     </span> \
                                 {{/if}} \
                                 {{if content.description}} \
                                   <span class="wid-temp-discription">${content.description}</span>\
                                 {{/if}} \
                                 {{if ((key===2) || ((tempdata.content.length < 3) && (key===tempdata.content.length-1))) && (tempdata.buttons && tempdata.buttons.length)}} \
                                 <span class="wid-temp-showActions">\
                                 </span>\
                                 {{/if}} \
                               </div>\
                             {{/if}}\
                           {{/each}}\
                           {{if tempdata.content.length > 3}}\
                           <span class="wid-temp-showMore" id="showMoreContents">Show more <img src="libs/images/show-more.svg" class="show-more"></span>\
                           {{/if}}\
                         </div>\
                         <div class="wid-temp-showMoreBottom hide">\
                         <div class="headerTitleMore">MORE<span class="wid-temp-showMoreClose"></span></div>\
                           {{each(key, content) tempdata.content}} \
                             <div class="wid-temp-contentDiv">\
                               {{if content.image && content.image.image_type === "image"}}\
                                     <span class="wid-temp-discImage"> \
                                         <img aria-hidden="true"  alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                     </span> \
                               {{/if}} \
                               {{if content.description}} \
                                   <span class="wid-temp-discription">${content.description}</span>\
                               {{/if}} \
                             </div>\
                           {{/each}}\
                         </div>\
                         {{/if}}\
                         {{if (tempdata.buttons && tempdata.buttons.length)}} \
                         <div class="meetingActionButtons {{if ((tempdata.content && tempdata.content.length))}}hide{{/if}}">\
                             {{each(key, actionbtn) tempdata.buttons}}\
                                     {{if key < 2 }}\
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
                             {{if tempdata.buttons && (tempdata.buttons.length > 2)}}\
                             {{if tempdata.buttons && tempdata.buttons.length > 2}}\
                               <div class="dropbtnWidgt actionBtns" style="margin:0;margin-top: 0px;top: unset;" onclick="showDropdown(this)">... More</div>\
                               <ul  class="dropdown-contentWidgt" style="list-style:none;">\
                                 {{each(key, actionbtn) tempdata.buttons}} \
                                 {{if key >= 2}}\
                                         <li role="button" tabindex="0" class="dropdown-item action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}">\
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
                             {{if tempdata.buttons && tempdata.buttons.length === 7}}\
                             {{if key === 7}}\
                                 <div role="button" tabindex="0" class="actionBtns action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}">\
                                 <i>\
                                   {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
                                         <span class="wid-temp-btnImage"> \
                                             <img aria-hidden="true" alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                         </span> \
                                   {{/if}} \
                                   </i>${actionbtn.title}</div>\
                             {{/if}}\
                             {{/if}}\
                           {{/if}}\
                         </div>\
                         {{/if}}\
                       </li> \
                     </ul> \
                   </div>\
               {{/if}}\
               </div>\
             </div>\
           </scipt>';
  var lineChartTemplate = '<script id="chat_message_lineChart_tmpl" type="text/x-jqury-tmpl"> \
            <div class="line-chart-template">\
              <div class="tab-list-template" mainObj="${JSON.stringify(tempdata)}">\
                {{if tempdata}} \
                  <div class="listTemplateContainer">\
                  {{if tempdata.tabs && tabs.length}} \
                    <div class="tabsContainer">\
                      {{each(key, tab) tabs}} \
                      <span class="tabs" data-tabid="${tab}" ><span class="btnBG">${tab}</span></span>\
                      {{/each}}\
                    </div>\
                  {{/if}} \
                    <ul class="displayListValues">\
                      <li class="listViewTmplContentChild"> \
                        <div class="listViewTmplContentChildRow">\
                        {{if tempdata.image && tempdata.image.image_type === "image"}} \
                                <div class="listViewRightContent"> \
                                    <img aria-hidden="true"  alt="image" src="${tempdata.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                </div> \
                        {{/if}} \
                        <div class="listViewLeftContent"> \
                              <div class="linechartDiv">\
                                      <div class="wiz-header-buttons hide">\
                                        {{if tempdata.buttons && tempdata.buttons.length > 1}} \
                                          <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                          <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                            {{each(key, actionbtnli) tempdata.buttons}} \
                                                  <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                <i>\
                                                {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                <span class="wid-temp-btnImage"> \
                                                <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                </span> \
                                                {{/if}} \
                                                </i>${actionbtnli.title}</li>\
                                            {{/each}}\
                                          </ul>\
                                        {{/if}}\
                                        {{if tempdata.buttons && tempdata.buttons.length === 1}} \
                                            {{each(key, actionbtnli) tempdata.buttons}} \
                                                <a role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                    {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                      <i>\
                                                        <span class="wid-temp-btnImage"> \
                                                            <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                        </span> \
                                                      </i>\
                                                    {{/if}} \
                                                    {{if actionbtnli.title}}\
                                                      ${actionbtnli.title}\
                                                    {{/if}}\
                                                </a>\
                                            {{/each}}\
                                        {{/if}}\
                                      </div>\
                              </div>\
                              <div class="" id="linechart"></div>\
                              {{if tempdata.value && tempdata.value.type=="text"}}<div class="listViewItemValue">${tempdata.value.text}</div>{{/if}} \
                              {{if tempdata.value && tempdata.value.type=="button"}}\
                                  {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length > 1}} \
                                    <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                    <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                      {{each(key, actionbtnli) tempdata.value.buttons}} \
                                            <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                          <i>\
                                          {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                          <span class="wid-temp-btnImage"> \
                                              <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                          </span> \
                                          {{/if}} \
                                          </i>${actionbtnli.title}</li>\
                                      {{/each}}\
                                    </ul>\
                                  {{/if}}\
                                  {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length === 1}} \
                                    <div role="button" tabindex="0" class="viewMore action" actionObj="${JSON.stringify(tempdata.value.buttons[0])}" >${tempdata.value.buttons[0].title}</div>\
                                  {{/if}}\
                              {{/if}} \
                        </div>\
                        </div>\
                        {{if tempdata.details && tempdata.details.length}} \
                        <div class="tabListViewDiscription">\
                          {{each(key, content) tempdata.details}} \
                            {{if key < 3 }}\
                              <div class="wid-temp-contentDiv">\
                                {{if content.image && content.image.image_type === "image"}} \
                                    <span class="wid-temp-discImage"> \
                                        <img aria-hidden="true"  alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                    </span> \
                                {{/if}} \
                                {{if content.description}} \
                                  <span class="wid-temp-discription">${content.description}</span>\
                                {{/if}} \
                                {{if ((key===2) || ((tempdata.details.length < 3) && (key===tempdata.details.length-1))) && (tempdata.buttons && tempdata.buttons.length)}} \
                                <span class="wid-temp-showActions">\
                                </span>\
                                {{/if}} \
                              </div>\
                            {{/if}}\
                          {{/each}}\
                          {{if tempdata.details.length > 3}}\
                          <span class="wid-temp-showMore" id="showMoreContents">Show more <img src="libs/images/show-more.svg" class="show-more"></span>\
                          {{/if}}\
                        </div>\
                        <div class="wid-temp-showMoreBottom hide">\
                        <div class="headerTitleMore">MORE<span class="wid-temp-showMoreClose"></span></div>\
                          {{each(key, content) tempdata.details}} \
                            <div class="wid-temp-contentDiv">\
                              {{if content.image && content.image.image_type === "image"}}\
                                    <span class="wid-temp-discImage"> \
                                        <img aria-hidden="true"  alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                    </span> \
                              {{/if}} \
                              {{if content.description}} \
                                  <span class="wid-temp-discription">${content.description}</span>\
                              {{/if}} \
                            </div>\
                          {{/each}}\
                        </div>\
                        {{/if}}\
                        {{if (tempdata.buttons && tempdata.buttons.length)}} \
                        <div class="meetingActionButtons {{if ((tempdata.details && tempdata.details.length))}}hide{{/if}}">\
                            {{each(key, actionbtn) tempdata.buttons}}\
                                    {{if key < 2 }}\
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
                            {{if tempdata.buttons && (tempdata.buttons.length > 2)}}\
                            {{if tempdata.buttons && tempdata.buttons.length > 2}}\
                              <div class="dropbtnWidgt actionBtns" style="margin:0;margin-top: 0px;top: unset;" onclick="showDropdown(this)">... More</div>\
                              <ul role="region"  class="dropdown-contentWidgt" style="list-style:none;">\
                                {{each(key, actionbtn) tempdata.buttons}} \
                                {{if key >= 2}}\
                                        <li role="button" tabindex="0" class="dropdown-item action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}">\
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
                            {{if tempdata.buttons && tempdata.buttons.length === 7}}\
                            {{if key === 7}}\
                                <div role="button" tabindex="0"  class="actionBtns action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}">\
                                <i>\
                                  {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
                                        <span class="wid-temp-btnImage"> \
                                            <img aria-hidden="true" alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                        </span> \
                                  {{/if}} \
                                  </i>${actionbtn.title}</div>\
                            {{/if}}\
                            {{/if}}\
                          {{/if}}\
                        </div>\
                        {{/if}}\
                      </li> \
                    </ul> \
                  </div>\
              {{/if}}\
              </div>\
            </div>\
         </scipt>';
  var pieChartTemplate = '<script id="chat_message_pieChart_tmpl" type="text/x-jqury-tmpl"> \
                <div class="pie-chart-template">\
                  <div class="tab-list-template" mainObj="${JSON.stringify(tempdata)}">\
                    {{if tempdata}} \
                      <div class="listTemplateContainer">\
                      {{if tempdata.tabs && tabs.length}} \
                        <div class="tabsContainer">\
                          {{each(key, tab) tabs}} \
                          <span role="tab" tabindex="0" class="tabs" data-tabid="${tab}" ><span class="btnBG">${tab}</span></span>\
                          {{/each}}\
                        </div>\
                      {{/if}} \
                        <ul class="displayListValues">\
                          <li class="listViewTmplContentChild"> \
                            <div class="listViewTmplContentChildRow">\
                            {{if tempdata.image && tempdata.image.image_type === "image"}} \
                                    <div class="listViewRightContent"> \
                                        <img aria-hidden="true" alt="image" src="${tempdata.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                    </div> \
                            {{/if}} \
                            <div class="listViewLeftContent"> \
                                  <div class="piechartDiv">\
                                          <div class="wiz-header-buttons hide">\
                                            {{if tempdata.buttons && tempdata.buttons.length > 1}} \
                                              <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                              <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                                {{each(key, actionbtnli) tempdata.buttons}} \
                                                      <li role="button" tabindex="0" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                    <i>\
                                                    {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                    <span class="wid-temp-btnImage"> \
                                                    <img alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                    </span> \
                                                    {{/if}} \
                                                    </i>${actionbtnli.title}</li>\
                                                {{/each}}\
                                              </ul>\
                                            {{/if}}\
                                            {{if tempdata.buttons && tempdata.buttons.length === 1}} \
                                                {{each(key, actionbtnli) tempdata.buttons}} \
                                                    <a class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                        {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                                          <i>\
                                                            <span class="wid-temp-btnImage"> \
                                                                <img alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                            </span> \
                                                          </i>\
                                                        {{/if}} \
                                                        {{if actionbtnli.title}}\
                                                          ${actionbtnli.title}\
                                                        {{/if}}\
                                                    </a>\
                                                {{/each}}\
                                            {{/if}}\
                                          </div>\
                                  </div>\
                                  <div class="" id="piechart"></div>\
                                  {{if tempdata.value && tempdata.value.type=="text"}}<div class="listViewItemValue">${tempdata.value.text}</div>{{/if}} \
                                  {{if tempdata.value && tempdata.value.type=="button"}}\
                                      {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length > 1}} \
                                        <i  class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)">... More</i>\
                                        <ul  class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                          {{each(key, actionbtnli) tempdata.value.buttons}} \
                                                <li class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                              <i>\
                                              {{if actionbtnli.image && actionbtnli.image.image_type === "image" && actionbtnli.image.image_src}}\
                                              <span class="wid-temp-btnImage"> \
                                                  <img alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                              </span> \
                                              {{/if}} \
                                              </i>${actionbtnli.title}</li>\
                                          {{/each}}\
                                        </ul>\
                                      {{/if}}\
                                      {{if tempdata.value && tempdata.value.buttons && tempdata.value.buttons.length === 1}} \
                                        <div class="viewMore action" actionObj="${JSON.stringify(tempdata.value.buttons[0])}" >${tempdata.value.buttons[0].title}</div>\
                                      {{/if}}\
                                  {{/if}} \
                            </div>\
                            </div>\
                            {{if tempdata.details && tempdata.details.length}} \
                            <div class="tabListViewDiscription">\
                              {{each(key, content) tempdata.details}} \
                                {{if key < 3 }}\
                                  <div class="wid-temp-contentDiv">\
                                    {{if content.image && content.image.image_type === "image"}} \
                                        <span class="wid-temp-discImage"> \
                                            <img aria-hidden="true"  alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                        </span> \
                                    {{/if}} \
                                    {{if content.description}} \
                                      <span class="wid-temp-discription">${content.description}</span>\
                                    {{/if}} \
                                    {{if ((key===2) || ((tempdata.details.length < 3) && (key===tempdata.details.length-1))) && (tempdata.buttons && tempdata.buttons.length)}} \
                                    <span class="wid-temp-showActions">\
                                    </span>\
                                    {{/if}} \
                                  </div>\
                                {{/if}}\
                              {{/each}}\
                              {{if tempdata.details.length > 3}}\
                              <span class="wid-temp-showMore" id="showMoreContents">Show more <img src="libs/images/show-more.svg" class="show-more"></span>\
                              {{/if}}\
                            </div>\
                            <div class="wid-temp-showMoreBottom hide">\
                            <div class="headerTitleMore">MORE<span class="wid-temp-showMoreClose"></span></div>\
                            <div class="moreItemsScroll">\
                            {{each(key, content) tempdata.details}} \
                                <div class="wid-temp-contentDiv">\
                                  {{if content.image && content.image.image_type === "image"}}\
                                        <span class="wid-temp-discImage"> \
                                            <img alt="image" src="${content.image.image_src}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                        </span> \
                                  {{/if}} \
                                  {{if content.description}} \
                                      <span class="wid-temp-discription">${content.description}</span>\
                                  {{/if}} \
                                </div>\
                              {{/each}}\
                            </div>\
                            </div>\
                            {{/if}}\
                            {{if (tempdata.buttons && tempdata.buttons.length)}} \
                            <div class="meetingActionButtons {{if ((tempdata.details && tempdata.details.length))}}hide{{/if}}">\
                                {{each(key, actionbtn) tempdata.buttons}}\
                                        {{if key < 2 }}\
                                          {{if actionbtn.title}}\
                                            <div role="button" class="actionBtns action" actionObj="${JSON.stringify(actionbtn)}">\
                                            <i>\
                                            {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
                                            <span class="wid-temp-btnImage"> \
                                                <img alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                            </span> \
                                            {{/if}} \
                                            </i>${actionbtn.title}</div>\
                                          {{/if}}\
                                        {{/if}}\
                                {{/each}}\
                                {{if tempdata.buttons && (tempdata.buttons.length > 2)}}\
                                {{if tempdata.buttons && tempdata.buttons.length > 2}}\
                                  <div class="dropbtnWidgt actionBtns" style="margin:0;margin-top: 0px;top: unset;" onclick="showDropdown(this)">... More</div>\
                                  <ul  class="dropdown-contentWidgt" style="list-style:none;">\
                                    {{each(key, actionbtn) tempdata.buttons}} \
                                    {{if key >= 2}}\
                                            <li class="dropdown-item action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}">\
                                            <i>\
                                            {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
                                            <span class="wid-temp-btnImage"> \
                                                <img alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                            </span> \
                                            {{/if}} \
                                            </i>${actionbtn.title}</li>\
                                    {{/if}}\
                                    {{/each}}\
                                  </ul>\
                                {{/if}}\
                                {{if tempdata.buttons && tempdata.buttons.length === 7}}\
                                {{if key === 7}}\
                                    <div role="button" class="actionBtns action" href="javascript:void(0)" actionObj="${JSON.stringify(actionbtn)}" mainObj="${JSON.stringify(msgItem)}">\
                                    <i>\
                                      {{if actionbtn.image && actionbtn.image.image_type === "image" && actionbtn.image.image_src}}\
                                            <span class="wid-temp-btnImage"> \
                                                <img alt="image" src="${actionbtn.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                            </span> \
                                      {{/if}} \
                                      </i>${actionbtn.title}</div>\
                                {{/if}}\
                                {{/if}}\
                              {{/if}}\
                            </div>\
                            {{/if}}\
                          </li> \
                        </ul> \
                      </div>\
                  {{/if}}\
                  </div>\
                </div>\
             </scipt>';
  var ActionItems = '<script> \
              {{if tempdata && tempdata.displayLimit && tempdata.displayLimit.displayAs === "inline" }} \
                <div class="actionItemsParentDiv" mainObj="${JSON.stringify(tempdata)}"> \
                  <div class="actionItemsHeader"> \
                    <div class="actionItemHeading">${tempdata.heading}</div> \
                    {{if tempdata && tempdata.text}} \
                      <span class="actionItemText">${tempdata.text}</span> \
                    {{/if}} \
                  </div> \
                  {{if tempdata && tempdata.buttons && tempdata.buttons.length}} \
                    <div class="actionItemBody"> \
                      {{each(key, actionbtn) tempdata.actionItems}} \
                        <span class = "actionBtnTitle {{if key<tempdata.displayLimit.count}} show {{else}} hide {{/if}}" actionObj="${JSON.stringify(actionbtn)}">${actionbtn.title}</span> \
                      {{/each}} \
                      <span class="hasMoreActionItems"> + ${tempdata.actionItems.length - tempdata.displayLimit.count} More</span> \
                    </div> \
                  {{/if}} \
                </div> \
              {{/if}} \
            </script>';

  var TableList = '<script> \
                        <div class="listTableContainerDiv">\
                        <div class="listTableContainerDivRepet">\
                        <div class="listTableContainer">\
                        {{each(index,record) tempdata.records}}\
                                <div class="listTableDetailsBorderDiv">\
                                        <div class="listTableDetails" role="main">\
                                            <p role="header" class="listTableDetailsTitle">${record.sectionHeader}</p>\
                                {{each(index,msgItem) record.elements}}\
                                            <div role="list" class="listTableDetailsDesc {{if msgItem.image && msgItem.image.size==="medium"}}mediumImg{{/if}}" {{if msgItem.image && msgItem.image.size==="large"}}mediumImg{{/if}}" {{if msgItem.image && msgItem.image.size==="small"}}smallImg{{/if}}">\
                                              {{if msgItem && msgItem.image && msgItem.image.image_type && msgItem.image.image_src}}\
                                                <div class="listTableBigImgConytainer">\
                                                  {{if msgItem.image.image_type === "image"}}\
                                                      <img aria-hidden="true" src="${msgItem.image.image_src}">\
                                                  {{/if}}\
                                                  {{if msgItem.image.image_type === "fontawesome"}}\
                                                      <i aria-hidden="true" class="fa {{msgItem.image.image_src}}" ></i>\
                                                  {{/if}}\
                                                </div>\
                                              {{/if}}\
                                                <div class="listTableDetailsDescSub" role="region">\
                                                    <p role="heading" aria-level="1" class="listTableDetailsDescName">${msgItem.title}</p>\
                                                    <p role="heading" aria-level="2" class="listTableDetailsDescValue">${msgItem.subtitle}</p>\
                                                </div>\
                                                  {{if (msgItem.value && msgItem.value.type === "text" && msgItem.value.text)}}\
                                                    <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}} style="width:${msgItem.value.layout.colSize};"{{/if}} {{if msgItem.value && msgItem.value.layout && msgItem.value.color}} style="color:${msgItem.value.layout.color};"{{/if}}>\
                                                        <div class="listViewItemValue {{if !msgItem.subtitle}}top10{{/if}}">${msgItem.value.text}</div>\
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
                                                        <div role="button" actionObj="${JSON.stringify(msgItem.value.url)}" class="listViewItemValue actionLink action {{if !msgItem.subtitle}}top10{{/if}}">${msgItem.value.url.title}</div>\
                                                    </div>\
                                                  {{/if}}\
                                                  {{if msgItem.value && msgItem.value.type=="button" && msgItem.value.button && (msgItem.value.button.title || (msgItem.value.button.image && msgItem.value.button.image.image_src))}}\
                                                    <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
                                                        <div role="button" class="actionBtns action singleBTN {{if !msgItem.value.button.title && (msgItem.value.button.image && msgItem.value.button.image.image_src)}}padding5{{/if}}" actionObj="${JSON.stringify(msgItem.value.button)}">\
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
                                                  <div class="titleActions {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.align}}${msgItem.value.layout.align}{{/if}}" {{if msgItem.value && msgItem.value.layout && msgItem.value.layout.colSize}}style="width:${msgItem.value.layout.colSize};"{{/if}}>\
                                                      <i class="icon-More dropbtnWidgt moreValue"  onclick="showDropdown(this)"></i>\
                                                          <ul role="list" class="dropdown-contentWidgt  rmpmW moreValueContent" style="list-style:none;">\
                                                            {{each(key, actionbtnli) msgItem.value.menu}} \
                                                                  <li role="listitem" class="dropdown-item action" actionObj="${JSON.stringify(actionbtnli)}">\
                                                                <i>\
                                                                {{if actionbtnli.image && actionbtnli.image.image_type === "image" && msgItem.image.image_src}}\
                                                                <span class="wid-temp-btnImage"> \
                                                                    <img aria-hidden="true" alt="image" src="${actionbtnli.image.image_src}" onerror="this.onerror=null;this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/FJREFUWAnNmItK60AQQLdN05eIIoog+v+/pQiKIlhab9M2SXv3TDthk25evenFgTbJPmZOdndmM9ubL/7szC+WwalsvZ4xg2BggqBvevah3+/JFX273c5stzu5punWJGli70+z1BowDAcmHAQWaA/mM7sH3teEIcChBd6aOElNHCe+LqVljQEHFmo0DAWsVFtJBcBBEMhvaF9wvYlNYmGbSC0gyifjoShvorCuDSM/GY9MmqYmWm1kGVT16VdVBlbZdDLuDM61xYiKbmujSkprmdLJZCSLv0rBv9ThWNjAVpl4p5iRG4+GmVcyHT8/P7XTUTQyHA4twCTTU6znmSWErWi7Nql1pKIcAUoHu0a4qry+vpr1eq2Pra5APjw8mNFoVNpPbS6j1dEgHAHiEAy9K8Bh6Pb21i0uvV8sFobfdDo1y+XS8IJPT0+VkDLd1vYyyg9EDpC1wOL1CeWXl5e+qqOyzWYjgDc3N9Ln4+OjESQ2YHBDUM5JiHNdy/X1tbm/v5ew0mSpFBkyQHYIYtQ5pA0kDLCoZERsX+cUF/Lt7e3IGVzbLoug4rDnGL3VauXatSMTZo4TRZHc5xocHmCBiQ8MAeSrxA0rvk5tyvB45Ovrq7QbjoSX+wQWmOIk2QPyydRWCD388Oziy1FG7AOiKPQhBNUJTHz4HKY4H/fqOr+/v5v5fC7NPj8/zePjoxmPx7luZSFJY2SusedBX1qGrhiYPe2zojiOMzgK2Qa/v7+z+q5ulEkAlbaJct+0Ad21KFPrxXdxcSHe6AIRQlwBuC6UuO2r7mUNkkMocVVjrWNfnc1m4iRXV1e5LRA4dgyuifVC2rbRrTZgQgSQBKfNJkI8u7u7U13Z1YWjkFgH7CmQMCEyxUorJS3+GCGVIpyWK2RbG9peAEkN2wpfKM/PzzLNZXCqE0jWZBtRJpnifd4aNl4rwLEGEaaQrQnIKvF5f1l7Rg8m5DDFRvLWsg5uOQFa4SgnDtbBuf2b3JNDH3xkD0gnkuomQudzi8uSxUEy/v9hvO7l5ATCOX2QNaidyPhJqquEoFwMzFXt29bB4EoOkFyANeXLS3iz4vedq6jpfZWzYNvNR9CZA6SA4wgyft2sKSMw85n08vLCYyeCTlcIzNguSs93PkjiTsavWxRweK8Gz6KSts/kyGyRKuiNbLrpS9y9gHQc2BzFPV1QZV1fgVutN0dTq3YyL9YCvbIWeCvdE7W8y6tMq7VRXHeujVJAGjHkHEeweLsWdIrumrh65CRFEKaA4wim/NQDTFcn0aDTA0xVzjTwa3IErH30yktKALb9z3YErMYwwI+89VceoiuoHRTJW51dSas6vf4FP88rnfrjdTEAAAAASUVORK5CYII=\';"/> \
                                                                </span> \
                                                                {{/if}} \
                                                                </i><span role="button" aria-label="${"Clickble " + actionbtnli.title}">${actionbtnli.title}</span></li>\
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
                        {{if tempdata.records && tempdata.records.length > 3 && viewmore}} \
                            <div class="seeMoreFooter">\
                                <span class="seeMoreLink" onclick="viewMorePanel(\'${JSON.stringify(panelDetail)}\')">Show more</span>\
                            </div>\
                        {{/if}}\
                        </div>\
                    </div>\
          </sript>';
  var webForm = '<script  type="text/x-jquery-tmpl"> \
          <div class="webFormWidget" {{if panelDetail}}panelDetail="${JSON.stringify(panelDetail)}"{{/if}}>\
              {{if tempdata && tempdata.formLink}}\
                      <iframe id="${panelDetail.subpanel}" class="iframeModal" src="${tempdata.formLink}"></iframe> \
              {{else}}\
                      {{if tempdata.success}}\
                        <div class="sucessMsg">\
                        <img class="sucessTickGreen" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTRweCIgaGVpZ2h0PSI1NHB4IiB2aWV3Qm94PSIwIDAgNTQgNTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5zdWNlc3NUaWNrR3JlZW48L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ic3VjZXNzVGlja0dyZWVuIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjMDA5REFCIiBjeD0iMjciIGN5PSIyNyIgcj0iMjciPjwvY2lyY2xlPgogICAgICAgICAgICA8cGF0aCBkPSJNMzUuMzM3MDUzNiwyMi40MTUxNzg2IEMzNS41NDUzODc5LDIyLjYyMzUxMjkgMzUuNjQ5NTUzNiwyMi44NzY0ODY2IDM1LjY0OTU1MzYsMjMuMTc0MTA3MSBDMzUuNjQ5NTUzNiwyMy40NzE3Mjc3IDM1LjU0NTM4NzksMjMuNzI0NzAxMyAzNS4zMzcwNTM2LDIzLjkzMzAzNTcgTDI1LjczODgzOTMsMzMuNTMxMjUgQzI1LjUzMDUwNDksMzMuNzM5NTg0NCAyNS4yNzc1MzEyLDMzLjg0Mzc1IDI0Ljk3OTkxMDcsMzMuODQzNzUgQzI0LjY4MjI5MDIsMzMuODQzNzUgMjQuNDI5MzE2NSwzMy43Mzk1ODQ0IDI0LjIyMDk4MjEsMzMuNTMxMjUgTDE4LjY2Mjk0NjQsMjcuOTczMjE0MyBDMTguNDU0NjEyMSwyNy43NjQ4Nzk5IDE4LjM1MDQ0NjQsMjcuNTExOTA2MyAxOC4zNTA0NDY0LDI3LjIxNDI4NTcgQzE4LjM1MDQ0NjQsMjYuOTE2NjY1MiAxOC40NTQ2MTIxLDI2LjY2MzY5MTUgMTguNjYyOTQ2NCwyNi40NTUzNTcxIEwyMC4xODA4MDM2LDI0LjkzNzUgQzIwLjM4OTEzNzksMjQuNzI5MTY1NiAyMC42NDIxMTE2LDI0LjYyNSAyMC45Mzk3MzIxLDI0LjYyNSBDMjEuMjM3MzUyNywyNC42MjUgMjEuNDkwMzI2MywyNC43MjkxNjU2IDIxLjY5ODY2MDcsMjQuOTM3NSBMMjQuOTc5OTEwNywyOC4yMjk5MTA3IEwzMi4zMDEzMzkzLDIwLjg5NzMyMTQgQzMyLjUwOTY3MzcsMjAuNjg4OTg3MSAzMi43NjI2NDczLDIwLjU4NDgyMTQgMzMuMDYwMjY3OSwyMC41ODQ4MjE0IEMzMy4zNTc4ODg0LDIwLjU4NDgyMTQgMzMuNjEwODYyMSwyMC42ODg5ODcxIDMzLjgxOTE5NjQsMjAuODk3MzIxNCBMMzUuMzM3MDUzNiwyMi40MTUxNzg2IFoiIGlkPSLvgIwiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">\
                          <div class="sucessDesc">${tempdata.successMsg}</div>\
                          <button class="sucessDoneBtn"><span class="doneBTNText">Done</span> <span class="sucessProgress"></span></button>\
                        </div>\
                      {{else}}\
                      <div class="failedIframe">Failed to load Form</div>\
                    {{/if}}\
            {{/if}}\
          </div>\
       </script>';
  switch (type) {
    case 'menu':
      return menuTemplate;

    case 'meetingTemplate':
      return meetingTemplate;

    case 'tasksTemplate':
      return tasksTemplate;

    case 'filesTemplate':
      return filesTemplate;

    case 'defaultFilesTemplate':
      return defaultFilesTemplate;

    case 'mainTemplate':
      return mainTemplate;

    case 'viewMoreTemplate':
      return viewMoreTemplate;

    case 'knowledgeTemplate':
      return knowledgeTemplate;

    case 'announcementTemplate':
      return announcementTemplate;

    case 'hashtagTemplate':
      return hashtagTemplate;

    case 'skillsTemplate':
      return skillsTemplate;

    case 'defaultTemplate':
      return defaultTemplate;

    case 'popUpTemplate':
      return popUpTemplate;

    case 'chartListTemplate':
      return chartListTemplate;

    case 'errorTemplate':
      return errorTemplate;

    case 'filterTemplate':
      return filterTemplate;

    case 'filterOptionsTemplate':
      return filterOptionsTemplate;

    case 'List':
      return List;

    case 'pieChartTemplate':
      return pieChartTemplate;

    case 'TabbedList':
      return List;

    case 'ActionItems':
      return ActionItems;

    case 'barChartTemplate':
      return barChartTemplate;

    case 'lineChartTemplate':
      return lineChartTemplate;

    case 'ErrorTemplate':
      return ErrorTemplate;

    case 'AuthRequired':
      return AuthRequired;

    case 'widgetHeader':
      return widgetHeader;

    case 'TableList':
      return TableList;
    case 'webForm':
      return webForm;
  }
}; //********************original widgetTemplate.js ends */
//********************original widgetEvents.js end */



bindWidgetEvent  () { };

openDropdown  (data:any) {
  console.log(data);
};
openPanel  (panelName:any, resPopUp:any, heightToggle:any) {
  if (panelName && (panelName !== 'closePanel')) {
    $(".kore-chat-window").removeClass("selectedHeight");
  }
  if (heightToggle) {
    $(".kore-chat-window").toggleClass("selectedHeight");
  }
  var _self:any = this;

  var popUpStatus;

  if ((panelName === oldPanelName) || (panelName === 'closePanel')) {
    //todo:deviation:toggle fuctionality on panel click
    oldPanelName = "";
    if ($('.menuItemContainer') && $('.menuItemContainer').removeClass('selected')) {
      $('.menuItemContainer').removeClass('selected');
    }
    $('.sdkBotIcon').addClass('selected');
    localPanelDetail[panelName] = "";
    _self.clearWidgetPolling();
    //todo:raj
    $(_self.config.container.content).hide();
    // $(_self.config.container.content).hide("slide", {
    //   direction: _self.config.direction === 'left' ? 'left' : 'right'
    // }, 500);
    return false;
  }

  if (resPopUp) {
    if (!resPopUp.btnresponse) {
      return;
    }
  } else {
    popUpStatus = _self.checkWidgetSwitchEditor(panelName, oldPanelName);
  }

  if (popUpStatus) {
    return;
  }

  makeAPICall = true;

  if (localPanelDetail[panelName] !== undefined && (panelName === oldPanelName)) {
    var currTime = new Date().getTime();
    var deffTime = currTime - localPanelDetail[panelName];
    var seconds = Math.floor(deffTime / 1000);

    if (seconds < 10) {
      makeAPICall = false;
    }
  }

  localPanelDetail[panelName] = new Date().getTime();
  oldPanelName = panelName;
  panelName = panelName ? panelName.toLowerCase() : '';
  clearInterval(pollingTimer);

  if (meetingTimeRef.length > 0) {
    for (var k = 0; k < meetingTimeRef.length; k++) {
      clearInterval(meetingTimeRef[k]);
    }
  }

  if (panelName === 'kora') {
    console.log('<<<<Width350>>>>');
    window.menuActiveTab = '';

    _self.setChatFocus();

    $('.menuItem').removeClass('active');
    $('.menuItemCntr #' + panelName).addClass('active'); // $('.menuItemCntr #' + oldPanelName).addClass('active');

    $('.centerWindow').children().not('.kore-chat-window').not('.koraPanelHeader').not('.centralLoader').remove();
  } else if (panelName === 'profile') {
    window.angularComponentReference.zone.run(function () {
      window.angularComponentShowProfile.componentFn();
    });
  } else if (panelName === 'notification') {
    window.angularComponentReference.zone.run(function () {
      window.angularCmptRefNotification.componentFn();
    });
  } else {
    _self.resetTask();

    console.log('<<<<Width350>>>>');
    window.menuActiveTab = panelName;
    $('.menuItem').removeClass('selected');
    $('.menuItemContainer').removeClass('selected');
    $('.sdkBotIcon').removeClass('selected');
    $('.menuItemContainer.' + panelName).addClass('selected'); // $('.menuItemCntr #' + oldPanelName).addClass('active');

    $('.centerWindow').children().not('.kore-chat-window').not('.koraPanelHeader').not('.centralLoader').remove();
    mainTemplateBdr = '';

    if ($(_self.config.container.content).is(':visible')) {
      $(_self.config.container.content).hide();
    }
    $(_self.config.container.content).show();
    //todo:raj
    // $(_self.config.container.content).show("slide", {
    //   direction: _self.config.direction //$.jStorage.get('menuPosition')

    // }, 250);
    $(_self.config.container.content).html('<div class="loaderRing"><div></div><div></div><div></div><div></div></div>');

    _self.prepareRenderData(panelName, true);
  }
};

checkWidgetSwitchEditor  (newPanel:any, oldPanel:any) {
  var _self:any = this;

  if (newPanel !== oldPanel) {
    var componentSelectorsArray = Array.from(document.querySelectorAll('.centerWindow *')).map(function (el) {
      return el.tagName.toLowerCase();
    }).filter(function (selector) {
      return selector.startsWith('app-');
    });
    var commonKeys = editComponent.selector.filter(function (obj) {
      return componentSelectorsArray.indexOf(obj) !== -1;
    });

    if (componentSelectorsArray.length && commonKeys.length > 0) {
      var content = [{
        'id': 'skillSwitche',
        'title': 'Are you sure?',
        'desc': 'All changes made will be lost.',
        'buttons': [{
          'title': 'YES'
        }, {
          'title': 'NO'
        }]
      }];
      var actionObj = {
        "newPanel": newPanel,
        "oldPanel": oldPanel
      };

      _self.createPopup(content, JSON.stringify(actionObj), '');

      return true;
    }
  }

  return false;
};

prepareRenderData  (panelName:any) {
  var mainPanel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var _self:any = this;
  var initialWidgetData = _self.vars.initialWidgetData;
  var config = _self.config;

  clearInterval(pollingTimer); // if (meetingTimeRef.length > 0) {
  //     for (var k = 0; k < meetingTimeRef.length; k++) {
  //         clearInterval(meetingTimeRef[k]);
  //     }
  //     meetingTimeRef = [];
  // }

  for (var i = 0; i < initialWidgetData.panels.length; i++) {
    if (initialWidgetData.panels[i]._id.toLowerCase() === panelName.toLowerCase()) {
      if (mainPanel) {
        if (initialWidgetData.panels[i].widgets.length === 1) {
          initialWidgetData.panels[i].widgets[0].templateType = initialWidgetData.panels[i].widgets[0].templateType == undefined ? "Sushanth" : initialWidgetData.panels[i].widgets[0].templateType;
          var panelDetailLocal:any = {
            'panel': initialWidgetData.panels[i]._id,
            'subpanel': initialWidgetData.panels[i].widgets[0].id,
            'widgetTitle': initialWidgetData.panels[i].widgets[0].title || initialWidgetData.panels[i].widgets[0].name,
            'widgetTemplate': initialWidgetData.panels[i].widgets[0].templateType,
            'viewmore': false
          };
          var dataHTML = (<any>$(_self.getTemplate("mainTemplate"))).tmplProxy({
            'widgetData': initialWidgetData.panels[i],
            'helpers': helpers,
            'panelDetail': panelDetailLocal
          });
          _self.bindTemplateEvents(dataHTML, 'mainTemplate');
        } else {
          var panelDetailLocal:any = {
            'panel': initialWidgetData.panels[i]._id,
            'viewmore': false
          };
          var dataHTML = (<any>$(_self.getTemplate("mainTemplate"))).tmplProxy({
            'widgetData': initialWidgetData.panels[i],
            'helpers': helpers,
            'panelDetail': panelDetailLocal
          });
          _self.bindTemplateEvents(dataHTML, 'mainTemplate');
        }

        $(_self.config.container.content).addClass('kr-wiz-content-css');
        if ($(_self.config.container.menu).hasClass('darkTheme-kore')) {
          $(_self.config.container.content).addClass('darkTheme-kore');
          $(_self.config.container.content).removeClass('defaultTheme-kore');
          $(_self.config.container.content).removeClass('defaultTheme-kora');
          $(_self.config.container.content).removeClass('darkTheme-kora');
        } else if ($(_self.config.container.menu).hasClass('defaultTheme-kore')) {
          $(_self.config.container.content).addClass('defaultTheme-kore');
          $(_self.config.container.content).removeClass('darkTheme-kore');
          $(_self.config.container.content).removeClass('darkTheme-kora');
          $(_self.config.container.content).removeClass('defaultTheme-kora');
        } else if ($(_self.config.container.menu).hasClass('darkTheme-kora')) {
          $(_self.config.container.content).addClass('darkTheme-kora');
          $(_self.config.container.content).removeClass('darkTheme-kore');
          $(_self.config.container.content).removeClass('defaultTheme-kore');
          $(_self.config.container.content).removeClass('defaultTheme-kora');
        } else if ($(_self.config.container.menu).hasClass('defaultTheme-kora')) {
          $(_self.config.container.content).addClass('defaultTheme-kora');
          $(_self.config.container.content).removeClass('darkTheme-kora');
          $(_self.config.container.content).removeClass('defaultTheme-kore');
          $(_self.config.container.content).removeClass('darkTheme-kore');
        }
        $(_self.config.container.content).html(dataHTML);
      }
      // var refreshInterval = initialWidgetData.panels[i].widgets[0].autoRefresh.interval * 60;
      // _self.refreshData(panelName, refreshInterval);

      for (var j = 0; j < initialWidgetData.panels[i].widgets.length; j++) {
        initialWidgetData.panels[i].widgets[j].templateType = initialWidgetData.panels[i].widgets[j].templateType == undefined ? "Sushanth" : initialWidgetData.panels[i].widgets[j].templateType;
        clearInterval(initialWidgetData.panels[i].widgets[j].pollingTimer);
        if (initialWidgetData.panels[i].widgets[j].type === 'List') {
          var panelDetail = {
            'panel': initialWidgetData.panels[i]._id,
            'subpanel': initialWidgetData.panels[i].widgets[j].id,
            'widgetTitle': initialWidgetData.panels[i].widgets[j].title || initialWidgetData.panels[i].widgets[j].name,
            'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
            'viewmore': initialWidgetData.panels[i].widgets.length === 1 ? false : true
          };

          _self.getServerData(initialWidgetData.panels[i].widgets[j].hook.api, initialWidgetData.panels[i].widgets[j].hook.method, initialWidgetData.panels[i].widgets[j].hook.body, initialWidgetData.panels[i].widgets[j].hook.params, panelDetail);
        } else if (initialWidgetData.panels[i].widgets[j].type === 'FilteredList') {
          for (var k = 0; k < initialWidgetData.panels[i].widgets[j].filters.length; k++) {
            let panelDetail:any = {
              'panel': initialWidgetData.panels[i]._id,
              'subpanel': initialWidgetData.panels[i].widgets[j].id,
              'widgetTitle': initialWidgetData.panels[i].widgets[j].title || initialWidgetData.panels[i].widgets[j].name,
              'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
              'viewmore': initialWidgetData.panels[i].widgets.length === 1 ? false : true,
              'filter': initialWidgetData.panels[i].widgets[j].filters[k].id
            };

            _self.getServerData(initialWidgetData.panels[i].widgets[j].filters[k].hook.api, initialWidgetData.panels[i].widgets[j].filters[k].hook.method, initialWidgetData.panels[i].widgets[j].filters[k].hook.body, initialWidgetData.panels[i].widgets[j].filters[k].hook.params, panelDetail);
          }
        } else if (initialWidgetData.panels[i].widgets[j].type === 'UtterancesList') {
          if (initialWidgetData.panels[i].widgets[j].actions) {
            let panelDetail:any = {
              'panel': initialWidgetData.panels[i]._id,
              'subpanel': initialWidgetData.panels[i].widgets[j].id,
              'widgetTitle': initialWidgetData.panels[i].widgets[j].title || initialWidgetData.panels[i].widgets[j].name,
              'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
              'viewmore': initialWidgetData.panels[i].widgets.length === 1 ? false : true
            };
            var dataHTML = (<any>$(_self.getTemplate("skillsTemplate"))).tmplProxy({
              'tempdata': initialWidgetData.panels[i].widgets[j],
              'helpers': helpers,
              'panelDetail': panelDetail
            });
            $(_self.config.container.content).find('.mainTemplateCntr#' + panelDetail.panel + ' #' + panelDetail.subpanel).html(dataHTML);
          }
        } else {
          var panelDetail = {
            'panel': initialWidgetData.panels[i]._id,
            'subpanel': initialWidgetData.panels[i].widgets[j].id,
            'widgetTitle': initialWidgetData.panels[i].widgets[j].title || initialWidgetData.panels[i].widgets[j].name,
            'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
            'viewmore': initialWidgetData.panels[i].widgets.length === 1 ? false : true
          }; //todo:#deviation :commented below as widget data is not avaiable yet
          //todo:deviation:mainTemplate became default template now for widget SDK
          //var dataHTML = $(_self.getTemplate("defaultTemplate")).tmplProxy({
          // var dataHTML = $(_self.getTemplate("defaultTemplate")).tmplProxy({
          //   'tempdata': initialWidgetData.panels[i].widgets[j],
          //   'helpers': helpers,
          //   'panelDetail': panelDetail,
          //   'widgetData': initialWidgetData.panels[i],
          // });
          //$(_self.config.container.content).find('.mainTemplateCntr#' + panelDetail.panel + ' #' + panelDetail.subpanel).html(dataHTML);
          //todo:#deviation :added below api call for widget SDK default case

          _self.getServerData('widgetsdk/' + config.botOptions.botInfo._id + '/widgets/' + initialWidgetData.panels[i].widgets[j]._id, 'post', {
            "from": config.botOptions.userIdentity || "user-name",
          }, {}, panelDetail);
        }
      }
    }
  }
};

getServerDataGen  (url:any, method:any, payload:any, _params:any):any {
  var _self:any = this;
  var config = _self.config;
  url = _self.resolveUrl(url, {
    userId: config.botOptions.botInfo.customData.kmUId
  }, false);
  if (_params) url = url + '?' + $.param(_params);
  var apiConfigs:any = {
    url: _self.config.botOptions.koreAPIUrl + url,
    type: method,
    data: payload,
    async: true,
    beforeSend: function beforeSend(xhr:any) {
      xhr.setRequestHeader("Authorization", "bearer " + config.botOptions.botInfo.customData.kmToken);
    },
    success: function success(data:any) { },
    error: function error(err:any) {// errorPopup(err);
    }
  }
  if (_self.config.botOptions.botInfo && _self.config.botOptions.botInfo.botState) {
    apiConfigs.headers = { "state": _self.config.botOptions.botInfo.botState };
  }
  return $.ajax(apiConfigs);
};

getServerData  (url:any, method:any, payload:any, _params:any, passedJson:any) {
  var _self:any = this;
  var initialWidgetData = _self.vars.initialWidgetData;
  var cacheData = _self.vars.cacheData;
  var config = _self.config;
  var userInputs:any = {}
  if (passedJson && passedJson.subpanel) {
    var widgetInfo = _self.getWidgetDataByWidgetId(passedJson.subpanel);
    if (widgetInfo && widgetInfo.fields && widgetInfo.fields.length) {
      for (var i = 0; i < widgetInfo.fields.length; i++) {
        if (widgetInfo.fields[i].label) {
          if (!userInputs[widgetInfo.fields[i].label]) {
            userInputs[widgetInfo.fields[i].label] = widgetInfo.fields[i].defaultValue;
          }
        }
      }
    }
  }
  payload.inputs = $.extend(payload.inputs, userInputs);
  if (_params) url = url + '?' + $.param(_params);

  for (var i = 0; i < cacheData.length; i++) {
    if (cacheData[i].api === url) {
      var xhrObject:any = {};
      xhrObject.passedkey = {};
      xhrObject.passedkey = passedJson;
      if (cacheData[i].response && cacheData[i].response.templateType !== 'form') {
        _self.renderTemplate(cacheData[i].response, xhrObject); // need to implement this later //
      }
      //  if(passedJson.subpanel){
      //   $('.widgetContParent#'+ passedJson.subpanel).find('.progress').show(); // progress meter show
      //  }else{
      //   $('.widgetContParent#'+ passedJson.subpanel).find('.progress').show(); // progress meter show
      //  }
    }
  }

  url = _self.resolveUrl(url, {
    userId: config.botOptions.botInfo.customData.kmUId
  }, false);

  if (makeAPICall === false) {
    $('.mainTemplateCntr .progress').hide();
    return;
  }

  return (<any> $).ajax({
    url: window.baseUrl + '/' + url,
    type: method,
    data: JSON.stringify(payload),
    myData: passedJson,
    contentType: "application/json",
    async: true,
    beforeSend: function beforeSend(xhr:any, passedkey:any) {
      xhr.setRequestHeader("Authorization", "bearer " + config.botOptions.botInfo.customData.kmToken);
      xhr.passedkey = passedkey.myData;
    },
    success: function success(responseData:any, status:any, xhrObject:any) {
      //todo:#deviation :need to correct from server
      if (responseData && responseData.data && responseData.data.length) {
        responseData = responseData.data[0];
      }

      if (responseData && responseData.responseJSON) {
        responseData = responseData.responseJSON;
      } //todo:#deviation:reading widgetTemplate from execure api

      if (responseData && _typeof(responseData) === 'object') {
        if (responseData.isAuthElement && responseData.elements && responseData.elements.length === 1) {
          responseData.templateType = 'AuthRequired';
          xhrObject.passedkey.widgetTemplate = responseData.templateType;
        } else {
          if (responseData && responseData.templateType) {
            xhrObject.passedkey.widgetTemplate = responseData.templateType;
          } else {
            xhrObject.passedkey.widgetTemplate = 'standard'; // fallback for default templates
          }

        }
      }

      for (var i = 0; i < initialWidgetData.panels.length; i++) {
        // to update widgetType//
        if (initialWidgetData.panels[i].widgets && initialWidgetData.panels[i].widgets.length && initialWidgetData.panels[i]._id === passedJson.panel) {
          initialWidgetData.panels[i].widgets.forEach(function (widget:any) {
            if (widget.id === passedJson.subpanel) {
              if (responseData && responseData.templateType) {
                widget.templateType = responseData.templateType;
              }
              widget.hook = {};
              widget.hook.api = url;
              widget.hook.method = method;
              widget.hook.body = payload;
              widget.hook.params = _params;
              var refreshInterval = widget.autoRefresh.interval * 60;
              if (widget.pollingTimer) {
                clearInterval(widget.pollingTimer);
              }
              if (widget.autoRefresh && widget.autoRefresh.enabled) {
                _self.refreshWidgetData(widget, refreshInterval, passedJson);
              }
            }
          });
        }
      }

      $('.mainTemplateCntr .progress').hide(); // progress meter hide

      if (!responseData || responseData && _typeof(responseData) !== 'object' || _typeof(responseData) === 'object' && responseData.data && !responseData.data.length) {
        // if response is not an object //
        // responseData.templateType = 'somthingWentWrong';
        // responseData.errMsg = 'Oops! Something went wrong.';

        if (typeof responseData === 'string') {
          var responseCopy = responseData;
          responseData = {};
          responseData.templateType = 'somthingWentWrong';
          responseData.errMsg = 'Oops! Something went wrong.'; // responseData.errMsgDiscription = responseCopy;
        } // console.log(xhrObject);


        var dataHTML = (<any>$(_self.getTemplate("ErrorTemplate"))).tmplProxy({
          'tempdata': responseData,
          'panelDetail': xhrObject.passedkey
        });

        if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel && xhrObject.passedkey.filter) {
          $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.filter + '_content').html(dataHTML);
        } else if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel) {
          $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.subpanel + '_content').html(dataHTML);
        }
        if (KRPerfectScrollbar) {
          _self.vars.contentPSObj = null;
          if (!_self.vars.contentPSObj) {
            _self.vars.contentPSObj = new KRPerfectScrollbar($(_self.config.container.content).find(".mainTemplateBdr").get(0), {
              suppressScrollX: true
            });
          } else {
            _self.vars.contentPSObj.update();
          }
        }
        return;
      }

      _self.renderTemplate(responseData, xhrObject);

      var localCount = 0;

      for (var i = 0; i < cacheData.length; i++) {
        if (cacheData[i].api === url) {
          localCount = localCount + 1;
          cacheData[i].response = responseData;
        }
      }

      if (localCount === 0) {
        cacheData.push({
          'api': url,
          'response': responseData
        });
      }
    },
    error: function error(err:any) {
      $('.mainTemplateCntr .progress').hide();

      if (false && (err.status === 410 || err.status === 401)) {
        var content = [{
          'id': 'tokenExpired',
          'title': 'Session Expired',
          'desc': 'To continue, please sign in again.',
          'buttons': [{
            'title': 'OK'
          }]
        }];

        _self.createPopup(content, '', '');
      } else {
        var xhrObject:any = {};
        xhrObject.passedkey = {};
        xhrObject.passedkey = err.passedkey;
        if (err && typeof err === 'object' && err.responseJSON && err.responseJSON.errors && err.responseJSON.errors.length) {
          xhrObject.templateType = 'somthingWentWrong';
          xhrObject.errMsg = err.responseJSON.errors[0].msg || ''; // responseData.errMsgDiscription = responseCopy;
        }
        if (err && err.status == '429') {
          xhrObject.templateType = 'somthingWentWrong';
          xhrObject.errMsg = err.responseText || 'Too many tries, please wait for sometime';
        }
        var dataHTML = (<any>$(_self.getTemplate("ErrorTemplate"))).tmplProxy({
          'tempdata': xhrObject,
          'panelDetail': xhrObject.passedkey
        });

        if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel && xhrObject.passedkey.filter) {
          $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.filter + '_content').html(dataHTML);
        } else if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel) {
          $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.subpanel + '_content').html(dataHTML);
        } // if (!mainTemplateBdr) {
        //   mainTemplateBdr = new PerfectScrollbar('.scroll', { suppressScrollX: true });
        // } else {
        //   mainTemplateBdr.update();
        // }


        $('.mainTemplateCntr .progress').hide(); // progress meter hide
      }
    }
  });
};


getCacheDataByWidgetId  (widgetId:any) {
  var _self:any = this; //var cacheData=cacheData;
  var cacheData = _self.vars.cacheData;

  var key = 'widgetsdk/' + _self.config.botOptions.botInfo._id + '/widgets/' + widgetId + '?';
  var resIndex = cacheData.findIndex(function (item:any) {
    return item.api === key;
  });

  if (resIndex > -1) {
    return cacheData[resIndex].response;
  } else {
    return false;
  }
};



getPanelDataByPanelId  (panelId:any) {
  var _self = this;
  var panelIndex = -1;
  var initialWidgetData = _self.vars.initialWidgetData;
  for (var i = 0; i < initialWidgetData.panels.length; i++) {
    if (initialWidgetData.panels && initialWidgetData.panels.length) {
      panelIndex = initialWidgetData.panels.findIndex(function (item:any) {
        return item._id === panelId
      });
    }
  }
  if (panelIndex > -1) {
    return initialWidgetData.panels[panelIndex];
  }
};


getWidgetDataByWidgetId  (widgetId:any) {
  var _self:any = this;
  var widgetInfo = null;
  var initialWidgetData = _self.vars.initialWidgetData;
  for (var i = 0; i < initialWidgetData.panels.length; i++) {
    if (initialWidgetData.panels[i].widgets && initialWidgetData.panels[i].widgets.length) {
      initialWidgetData.panels[i].widgets.forEach(function (item:any) {
        if (item.id === widgetId) {
          widgetInfo = item;
        }
      });
    }
  }
  if (widgetInfo) {
    return widgetInfo;
  }
};

openCloseBottomOverlayContainer  (open:any, htmlData:any) {
  var _self:any = this;
  if (open && htmlData) {
    $('#widgetSdkBottomOverlayContainer').html(htmlData)
    $('#widgetSdkBottomOverlayContainer').show();
  } else {
    $('#widgetSdkBottomOverlayContainer').hide();
  }
  setTimeout(function () {
    if (KRPerfectScrollbar) {
      _self.vars.contentPSObj = null;
      if (!_self.vars.contentPSObj) {
        _self.vars.contentPSObj = new KRPerfectScrollbar($('#widgetSdkBottomOverlayContainer').find(".filterTemplateCntr").get(0), {
          suppressScrollX: true
        });
      } else {
        _self.vars.contentPSObj.update();
      }
    }
  }, 100);
}


applySortingAndFilter  (e:any, bindingData:any, sortInputs:any) {
  let _self:any = this;
  if (!bindingData.inputsPayload) {
    bindingData.inputsPayload = {};
  }
  if (bindingData && bindingData.filterOptions && bindingData.filterOptions.length) {
    // applying filters for filter payload //
    bindingData.filterOptions.forEach(function (item:any) {
      if (item.data && item.field && item.data.length && (((item.type == 'enum') && (item.isMulti === 'Yes')) || (item.type == 'checkbox'))) {
        item.data.forEach(function (filterValue:any) {
          if (filterValue && filterValue.isSelect && filterValue.value && filterValue.value.trim() !== '') {
            if (!bindingData.inputsPayload[item.field]) {
              bindingData.inputsPayload[item.field] = [];
            }

            bindingData.inputsPayload[item.field].push(filterValue.value);
          }
        });
      }
      if (item.data && item.field && item.data.length && (((item.type == 'enum') && (item.isMulti === 'No')) || (item.type == 'radio'))) {
        item.data.forEach(function (filterValue:any) {
          if (filterValue && filterValue.isSelect && filterValue.value && filterValue.value.trim() !== '') {
            if (!bindingData.inputsPayload[item.field]) {
              bindingData.inputsPayload[item.field] = {};
            }
            bindingData.inputsPayload[item.field] = filterValue.value;
          }
        });
      }
    });
  }
  if (sortInputs && typeof sortInputs === 'object') {
    bindingData.inputsPayload = $.extend(bindingData.inputsPayload, sortInputs)
  }
  _self.openCloseBottomOverlayContainer();

  var panelDetail:any = $(e.target).closest('[paneldetail]').attr('paneldetail');
  panelDetail = JSON.parse(panelDetail);
  var widgetId = panelDetail.subpanel;
  _self.getServerData('widgetsdk/' + _self.config.botOptions.botInfo._id + '/widgets/' + widgetId, 'post', {
    "from": _self.config.botOptions.userIdentity || "user-name",
    "inputs": bindingData.inputsPayload
  }, {}, panelDetail);
  _self.openCloseBottomOverlayContainer();
}


applySorting (e:any, $ele:any, templateType:any, bindingData:any) {
  var _self:any = this;
  var allSorts = $(e.currentTarget).closest('dropdown-contentWidgt').find('dropdown-item');
  if (allSorts && allSorts.length) {
    allSorts.removeClass('selected');
  }
  $(e.currentTarget).addClass('selected');
  var selectedSort:any = $(e.currentTarget).attr('sort-obj');
  var selectedSortObj = JSON.parse(selectedSort);
  var sortInputs:any = {}
  sortInputs[selectedSortObj.field] = selectedSortObj.fieldValue;
  _self.applySortingAndFilter(e, bindingData, sortInputs);
};



openWidgetFilters  (e:any, ele:any, templateType:any, bindingData:any) {
  var _self:any = this;
  var widgetId = $(e.target).closest('.widgetContParent').attr('id');
  var res = bindingData || _self.getCacheDataByWidgetId(widgetId);
  if (res.filterOptions && res.filterOptions.length) {
    for (var i = 0; i < res.filterOptions.length; i++) {
      res.filterOptions[i].selected = false;
      if (res.filterOptions[i] && res.filterOptions[i].data && res.filterOptions[i].data.length) {
        for (var j = 0; j < res.filterOptions[i].data.length; j++) {
          if (res.filterOptions[i].data[j].isSelect) {
            res.filterOptions[i].selected = true;
          }
        }
      }
    }
    var templateData = {
      filterOptions: res.filterOptions,
      sortOptions: res.sortOptions,
      inputsPayload: {}
    };
    var filterHTML:any = (<any> $(_self.getTemplate("filterTemplate"))).tmplProxy(templateData);

    _self.bindTemplateEvents(filterHTML, 'filterTemplate', templateData);
    _self.openCloseBottomOverlayContainer(true, filterHTML);
  }
}


bindTemplateEvents  (ele:any, templateType:any, bindingData:any) {
  var _self:any = this;
  var initialWidgetData = _self.vars.initialWidgetData;

  var initialWidgetData = initialWidgetData;

  var $ele = $(ele);
  if (templateType === 'mainTemplate') {
    $ele.off('click').on('click', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    })
  } else if (templateType === 'widgetHeader') {
    $ele.off('click', '.action').on('click', '.action', function (e) {
      e.stopPropagation();
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var actionObj:any = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      }
      var actionType = $(e.currentTarget).attr('action-type');
      if (typeof actionObj == 'object' && actionObj.link) {
        window.open(actionObj.link);
      } else if (actionObj && (actionType === 'filter')) {
        _self.openWidgetFilters(e, $ele, templateType, bindingData);
      } else if (actionObj && (actionType === 'sortOptions')) {
        _self.applySorting(e, $ele, templateType, bindingData);
      } else {
        _self.triggerAction(actionObj);
      }
    });
  } else if (templateType === 'defaultFilesTemplate') {
    $ele.on('click', '.filter-btn', function (e) {
      var widgetId = $(e.target).closest('.widgetContParent').attr('id');
      var res = _self.getCacheDataByWidgetId(widgetId); // var templateData={
      var templateData:any = {
        filterOptions: res.filterOptions,
        sortOptions: res.sortOptions,
        inputsPayload: {}
      };
      var appliedFilters = res.appliedFilters;
      var appliedSortBy = res.appliedSort; //for applying  appliedFilters

      appliedFilters.forEach(function (appliedFilter:any) {
        var filterIndex = templateData.filters.findIndex(function (item:any) {
          return item.field = appliedFilter.field;
        });

        if (filterIndex > -1) {
          var targetFilter = templateData.filters[filterIndex];

          if (appliedFilter && appliedFilter.fieldValue && appliedFilter.fieldValue.length) {
            appliedFilter.fieldValue.forEach(function (apliedFilterValue:any) {
              var targetFilterItemIndex = -1;
              targetFilterItemIndex = targetFilter.data.findIndex(function (item:any) {
                return item.value === apliedFilterValue;
              });

              if (targetFilterItemIndex > -1) {
                templateData.filters[filterIndex].data[targetFilterItemIndex].selected = true;
                templateData.filters[filterIndex].selected = true;
              }
            });
          }
        }
      }); //for applying appliedSortBy

      if (appliedSortBy && appliedSortBy.fieldValue) {
        var sortByItemIndex = templateData.sortOptions.findIndex(function (item:any) {
          return item.field === appliedSortBy.field;
        });

        if (sortByItemIndex > -1) {
          var targetSortByItem = templateData.sortOptions[sortByItemIndex];
          templateData.sortOptions[sortByItemIndex].selected = true;
        }
      }

      var filterHTML = (<any> $(_self.getTemplate("filterTemplate"))).tmplProxy(templateData);

      _self.bindTemplateEvents(filterHTML, 'filterTemplate', templateData);

      var listContainer = $(e.target).closest('.filesCntr');
      filterHTML.insertAfter(listContainer);
      setTimeout(function () {
        if (KRPerfectScrollbar) {
          _self.vars.contentPSObj = null;
          if (!_self.vars.contentPSObj) {
            _self.vars.contentPSObj = new KRPerfectScrollbar($('#widgetSdkBottomOverlayContainer').find(".filterTemplateCntr").get(0), {
              suppressScrollX: true
            });
          } else {
            _self.vars.contentPSObj.update();
          }
        }
      }, 100);
      listContainer.hide();
    });
  } else if (templateType === 'filterTemplate') {
    $ele.on('click', '.open-filters', function (e) {
     let selectedFilter = $(e.currentTarget).attr('id');
      if (selectedFilter) {
        var selectedFilterIndex = bindingData.filterOptions.findIndex(function (item:any) {
          return item.field === selectedFilter;
        });
        if (selectedFilterIndex > -1) {
          bindingData.filterSelectedItems = bindingData.filterOptions[selectedFilterIndex];
        }
      }
      var filterOptionsHTML = (<any>$(_self.getTemplate("filterOptionsTemplate"))).tmplProxy(bindingData);
      _self.bindTemplateEvents(filterOptionsHTML, 'filterOptionsTemplate', bindingData);
      var filterContainer = $(e.target).closest('.filterTemplateCntr');
      filterOptionsHTML.insertAfter(filterContainer);
      filterContainer.remove();
      // setTimeout(function(){
      if (KRPerfectScrollbar) {
        _self.vars.contentPSObj = null;
        if (!_self.vars.contentPSObj) {
          _self.vars.contentPSObj = new KRPerfectScrollbar($('#widgetSdkBottomOverlayContainer').find(".filterOptionsTemplateCtrl").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.contentPSObj.update();
        }
      }
      // },100);
    });
    $ele.on('click', '.radiodivsdk', function (e) {
      var filterType = $(e.currentTarget).attr('filter-type');
      var filterIndex:any = $(e.currentTarget).attr('filter-index');
      if (filterIndex) {
        filterIndex = parseInt(filterIndex);
      }
      bindingData.filterOptions[filterIndex].data.forEach(function (item:any) {
        item.isSelect = false;
      });
      if ($(e.currentTarget).find('.taskSelRadio').length && filterType === 'radioFilter') {
        var selectedBy = $(e.currentTarget).find("input[name='radioFilterVertical']:checked");
        if (selectedBy && selectedBy.length) {
          for (var i = 0; i < selectedBy.length; i++) {
            var selectedValueIndex:any = $($(selectedBy)[i]).attr('value-index');
            if (selectedValueIndex) {
              selectedValueIndex = parseInt(selectedValueIndex);
              bindingData.filterOptions[filterIndex].data[selectedValueIndex].isSelect = true;
            }
          }
        }
      }
      if ($(e.currentTarget).find('.taskSelRadio').length && filterType === 'checkBoxFilter') {
        var checkedElements = $(e.currentTarget).find("input[element='filterCheckbox']:checked");
        if (checkedElements && checkedElements.length) {
          for (var i = 0; i < checkedElements.length; i++) {
            var selectedValueIndex:any = $($(checkedElements)[i]).attr('value-index');
            if (selectedValueIndex) {
              selectedValueIndex = parseInt(selectedValueIndex);
              bindingData.filterOptions[filterIndex].data[selectedValueIndex].isSelect = true;
            }
          }
        }
      }
    });
    $ele.on('click', '.wid-filter-close', function (e) {
      $(e.target).closest(".widgetContParent").find(".filesCntr").show();
      $(e.target).closest(".widgetContParent").find(".filterTemplateCntr").remove();
      e.stopPropagation();
      _self.openCloseBottomOverlayContainer();
    });
    $ele.on('click', '.apply-btn', function (e) {
      _self.applySortingAndFilter(e, bindingData);
    });
  } else if (templateType === 'filterOptionsTemplate') {
    $ele.on('click', '.tickMarkContainer', function (e) {
      var filterValue = $(e.currentTarget).attr('field');
      $(e.currentTarget).closest('.filterOptionsTemplateCtrl').find('.tickMarkContainer').removeClass('selected');
      $(e.currentTarget).addClass('selected');
    });
    $ele.on('click', '.selectDropValue', function (e) {
      var filterValue:any = $(e.target).attr('valueObj');
      var filterValueObj = JSON.parse(filterValue);
    });
    $ele.on('click', '.wid-filter-close', function (e) {
      var filterHTML =(<any> $(_self.getTemplate("filterTemplate"))).tmplProxy(bindingData);

      _self.bindTemplateEvents(filterHTML, 'filterTemplate', bindingData);

      var listContainer = $(e.target).closest('.filterOptionsTemplateCtrl');
      filterHTML.insertBefore(listContainer);
      $(e.target).closest(".widgetContParent").find(".filterTemplateCntr").show();
      $('#widgetSdkBottomOverlayContainer').find(".filterOptionsTemplateCtrl").remove();
      e.stopPropagation();
    });
    $ele.on('click', '.apply-btn', function (e) {
      var _filterEle = $(e.target).closest(".filterOptionsTemplateCtrl");
      if (bindingData.filterSelectedItems && bindingData.filterSelectedItems.isMulti === 'No') {
        var selectedFilterEle = $(e.currentTarget).closest('.filterOptionsTemplateCtrl').find('.tickMarkContainer.selected');
        if (selectedFilterEle && selectedFilterEle.length) {
          bindingData.filterSelectedItems.data.forEach(function (filter:any) {
            if (filter.title === $(selectedFilterEle[0]).attr('field')) {
              filter.isSelect = true;
            } else {
              filter.isSelect = false;
            }
          });
        }
      } else {
        var selectedFilters = _filterEle.find("input[class='taskSelRadio']:checked");

        var selectedFiltersCount = 0;

        if (selectedFilters.length) {
          // partial of all buttons selected //
          bindingData.filterSelectedItems.data.forEach(function (filter:any) {
            filter.isSelect = false;
            selectedFilters.each(function (i, filterEle) {
              var $filterEle = $(filterEle);

              var _value = $filterEle.val();

              var _key = bindingData.filterSelectedItems.field;

              if (_value !== "" && filter.value === _value) {
                filter.isSelect = true;
                selectedFiltersCount = selectedFiltersCount + 1;
              }
            });
          });
        } else {
          // No buttons selected //
          bindingData.filterSelectedItems.data.forEach(function (filter:any) {
            filter.isSelect = false;
          });
        }

        if (selectedFiltersCount) {
          bindingData.filterSelectedItems.selected = true; //if filterButtons are selected //
        } else {
          bindingData.filterSelectedItems.selected = false; //if filterButtons are not selected //
        }
      }
      if (bindingData.filterSelectedItems.field && bindingData.filterSelectedItems) {
        var selectedFilterIndex = bindingData.filterOptions.findIndex(function (item:any) {
          return item.field === bindingData.filterSelectedItems.field;
        });

        if (selectedFilterIndex > -1) {
          bindingData.filterOptions[selectedFilterIndex] = bindingData.filterSelectedItems;
        }
      }
      var filterHTML = (<any> $(_self.getTemplate("filterTemplate"))).tmplProxy(bindingData);
      _self.bindTemplateEvents(filterHTML, 'filterTemplate', bindingData);

      var listContainer = $(e.target).closest('.filterOptionsTemplateCtrl');
      filterHTML.insertBefore(listContainer);
      $(e.target).closest(".widgetContParent").find(".filterTemplateCntr").show();
      $('#widgetSdkBottomOverlayContainer').find(".filterOptionsTemplateCtrl").remove();
      // setTimeout(function(){
      if (KRPerfectScrollbar) {
        _self.vars.contentPSObj = null;
        if (!_self.vars.contentPSObj) {
          _self.vars.contentPSObj = new KRPerfectScrollbar($('#widgetSdkBottomOverlayContainer').find(".filterTemplateCntr").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.contentPSObj.update();
        }
      }
      // },100);
      e.stopPropagation();
    });
  } else if (templateType === 'TabbedList' || templateType === 'List') {
    $($ele.find(".tabs")[0]).addClass("active");
    var titleEle = $ele.find('.listViewLeftContent');
    if (titleEle && titleEle.length) {
      for (var i = 0; i < titleEle.length; i++) {
        var ele:any = titleEle[i];
        if ($(ele).attr('col-size')) {
          var width = _self.getColumnWidth($(ele).attr('col-size'));
          $(ele).css("width", width + '%');
        }
      }
    }
    console.log(bindingData);
    $ele.off('click', '.listViewLeftContent').on('click', '.listViewLeftContent', function (e) {
      e.stopPropagation();
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var actionObj = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      }

      _self.triggerAction(actionObj);
    });
    $ele.off('click', '.moreValue').on('click', '.moreValue', function (e) {
      e.stopPropagation();
    });
    $ele.off('click', '.tabs').on('click', '.tabs', function (e) {
      e.stopPropagation();

      var _selectedTab = $(e.target).text();

      var msgData:any = $(e.target).closest(".tab-list-template").data();
      var panelDetail:any = $(e.target).closest(".tab-list-template").attr('panelDetail');

      if (panelDetail) {
        panelDetail = JSON.parse(panelDetail);
      }

      delete msgData.tmplItem;
      var tempObj:any = {
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

      var viewTabValues = (<any>$(_self.getTemplate("TabbedList"))).tmplProxy(tempObj);
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
      var actionObj:any = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      } // var eData={
      //   postbackValue: actionObj.payload,
      //   payload:actionObj,
      //   type:'widget'
      // }
      // if(eData && eData.postbackValue && eData.payload){
      //   _self.triggerEvent('postback',eData);
      // }

      if (typeof actionObj == 'object' && actionObj.link) {
        window.open(actionObj.link);
      } else {
        _self.triggerAction(actionObj);
      }
    });
    // $('.widgetContentPanel').css({
    //   'padding': '10px 20px'
    // });
  } else if (templateType === 'TableList') {
    $($ele.find(".tabs")[0]).addClass("active");
    var titleEle = $ele.find('.listViewLeftContent');
    if (titleEle && titleEle.length) {
      for (i = 0; i < titleEle.length; i++) {
        var ele:any = titleEle[i];
        if ($(ele).attr('col-size')) {
          var width = _self.getColumnWidth($(ele).attr('col-size'));
          $(ele).css("width", width + '%');
        }
      }
    }
    $ele.off('click', '.listViewLeftContent').on('click', '.listViewLeftContent', function (e) {
      e.stopPropagation();
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var actionObj = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      }

      _self.triggerAction(actionObj);
    });
    $ele.off('click', '.moreValue').on('click', '.moreValue', function (e) {
      e.stopPropagation();
    });
    $ele.off('click', '#showMoreContents').on('click', '#showMoreContents', function (e) {
      e.stopPropagation();
      $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").removeClass('hide');
    });
    $ele.off('click', '.wid-temp-showMoreClose').on('click', '.wid-temp-showMoreClose', function (e) {
      e.stopPropagation();
      $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").addClass('hide');
    });
    $ele.off('click', '.action').on('click', '.action', function (e) {
      e.stopPropagation();
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var actionObj:any = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      } // var eData={
      //   postbackValue: actionObj.payload,
      //   payload:actionObj,
      //   type:'widget'
      // }
      // if(eData && eData.postbackValue && eData.payload){
      //   _self.triggerEvent('postback',eData);
      // }

      if (typeof actionObj == 'object' && actionObj.link) {
        window.open(actionObj.link);
      } else {
        _self.triggerAction(actionObj);
      }
    });
    // $('.widgetContentPanel').css({
    //   'padding': '10px 20px'
    // });
  }
  else if (templateType === 'pieChartTemplate' || templateType === 'barChartTemplate' || templateType === 'lineChartTemplate') {
    $ele.off('click', '#showMoreContents').on('click', '#showMoreContents', function (e) {
      $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").removeClass('hide');
    });
    $ele.off('click', '.wid-temp-showMoreClose').on('click', '.wid-temp-showMoreClose', function (e) {
      $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showMoreBottom").addClass('hide');
    });
    $ele.off('click', '.wid-temp-showActions').on('click', '.wid-temp-showActions', function (e) {
      if ($(e.currentTarget) && $(e.currentTarget).closest(".listViewTmplContentChild") && $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions") && $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").hasClass('active')) {
        $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").removeClass('active');
        $(e.currentTarget).closest(".listViewTmplContentChild").find(".meetingActionButtons").addClass('hide'); // $(e.currentTarget).closest(".listViewTmplContentChild").find("#showMoreContents").removeClass('hide');
      } else {
        $(e.currentTarget).closest(".listViewTmplContentChild").find(".wid-temp-showActions").addClass('active');
        $(e.currentTarget).closest(".listViewTmplContentChild").find(".meetingActionButtons").removeClass('hide'); // $(e.currentTarget).closest(".listViewTmplContentChild").find("#showMoreContents").addClass('hide');
      }
    });
    $ele.off('click', '.action').on('click', '.action', function (e) {
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var actionObj = {};

      if (actionObjString) {
        actionObj = JSON.parse(actionObjString);
      }

      _self.triggerAction(actionObj);
    });
    // $('.widgetContentPanel').css({
    //   'padding': '10px 20px'
    // });
  } else if (templateType === 'ActionItems') {
    $ele.on('click', '.hasMoreActionItems', function (e) {
      $(e.target).closest('.actionItemBody').find('.actionBtnTitle').each(function (index, ele) {
        if ($(ele).hasClass('hide')) {
          $(ele).removeClass('hide');
          $(ele).addClass('show');
        }
      });
      $(e.target).addClass('hide');
    });
    $ele.on('click', '.actionBtnTitle', function (e) {
      console.log('abc....');
    });
  } else if (templateType === 'AuthRequired') {
    $ele.off('click', '.action').on('click', '.action', function (e) {
      e.stopPropagation();
      var actionObjString = $(e.currentTarget).attr('actionObj');
      var panelDetails = $(e.currentTarget).attr('panelDetail');
      var actionObj:any = {}
      if (actionObjString) {
        // try {
        actionObj = JSON.parse(actionObjString);
        var child:any;
   
        if (actionObj.url) {
          child = window.open(actionObj.url);
           const checkChild = () => {
            if (child && (typeof child === 'object') && child.closed) {
              _self.refreshElement(panelDetails);
              clearInterval(timer);
            }
          }
          var timer = setInterval(checkChild, 500);
        }
        // } catch(e){
        //   console.log('invalid JSON')
        // }
      }
    });
  } else if (templateType === 'menu') {
    $ele.off('click').on('click', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    })
    $ele.off('click', '.menuIconMobile').on('click', '.menuIconMobile', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    })
    $ele.find('#defaultTheme-kore span').addClass('checkMarkIcon');
    $ele.find('.sdkBotIcon').addClass('selected');
    $ele.off('click', '.action').on('click', '.action', function (e) {
      if (e && e.currentTarget && $(e.currentTarget)[0]) {
        var addtheme = $(e.currentTarget)[0].id;
        $($('.themeName').find('span')).removeClass('checkMarkIcon');
        if ($('#' + addtheme) && $('#' + addtheme).find('span')) {
          $($('#' + addtheme).find('span')).addClass('checkMarkIcon');
        }
        if (addtheme !== 'darkTheme-kore') {
          $(_self.config.container.menu).removeClass('darkTheme-kore');
          if ($(_self.config.container.content)) {
            $(_self.config.container.content).removeClass('darkTheme-kore');
          }
        }
        if (addtheme !== 'defaultTheme-kore') {
          $(_self.config.container.menu).removeClass('defaultTheme-kore');
          if ($(_self.config.container.content)) {
            $(_self.config.container.content).removeClass('defaultTheme-kore');
          }
        }
        if (addtheme !== 'defaultTheme-kora') {
          $(_self.config.container.menu).removeClass('defaultTheme-kora');
          if ($(_self.config.container.content)) {
            $(_self.config.container.content).removeClass('defaultTheme-kora');
          }
        }
        if (addtheme !== 'darkTheme-kora') {
          $(_self.config.container.menu).removeClass('darkTheme-kora');
          if ($(_self.config.container.content)) {
            $(_self.config.container.content).removeClass('darkTheme-kora');
          }
        }
        $(_self.config.container.menu).addClass(addtheme);
        $(_self.config.container.content).addClass(addtheme);
      }
    });
  } else if (templateType === 'webForm') {
    var checkfordone = ele.find('button');
    checkfordone.off('click').on('click', function () {
      var paneldatastring = ele.attr('paneldetail');
      _self.refreshElement(paneldatastring);
    })
  }
};



getHTMLTemplate  (responseData:any, xhrObject:any, timeout: any = 100) {
  var _self:any = this;

  var dataHTML:any;

  if (xhrObject && xhrObject.passedkey) {
    if (xhrObject.passedkey.widgetTemplate === 'calendar_events') {
      var ele = $.extend(true, {}, responseData);
      var ele1 = $.extend(true, {}, responseData);

      var elements = _self.getResolveMeeting(ele);

      ele1.elements = elements;
      dataHTML = (<any> $(_self.getTemplate("meetingTemplate"))).tmplProxy({
        'tempdata': ele1,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'task_list') {
      dataHTML = (<any>$(_self.getTemplate("tasksTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'file_list') {
      dataHTML = (<any> $(_self.getTemplate("filesTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'Sushanth' || xhrObject.passedkey.widgetTemplate === 'custom_style') {
      dataHTML = (<any>$(_self.getTemplate("defaultFilesTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'chartList') {
      dataHTML = (<any> $(_self.getTemplate("chartListTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'knowledge_list') {
      dataHTML = (<any> $(_self.getTemplate("knowledgeTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'TrendingHashTag') {
      dataHTML = (<any> $(_self.getTemplate("hashtagTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'announcement_list') {
      dataHTML = (<any> $(_self.getTemplate("announcementTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
    } else if (xhrObject.passedkey.widgetTemplate === 'List') {
      dataHTML = (<any> $(_self.getTemplate("List"))).tmplProxy({
        'tempdata': responseData,
        'dataItems': responseData.elements,
        'helpers': helpers,
        'viewmore': xhrObject.passedkey.viewmore,
        'panelDetail': xhrObject.passedkey
      });

      _self.bindTemplateEvents(dataHTML, 'List');
    } else if (xhrObject.passedkey.widgetTemplate === 'TabbedList') {
      var tempObj:any = {
        'tempdata': responseData,
        'dataItems': responseData.elements,
        'helpers': helpers,
        'viewmore': xhrObject.passedkey.viewmore,
        'panelDetail': xhrObject.passedkey
      };

      if (responseData && responseData.tabs && Object.keys(responseData.tabs) && Object.keys(responseData.tabs).length) {
        tempObj = {
          'tempdata': responseData,
          'dataItems': responseData.tabs.Tab1,
          'tabs': Object.keys(responseData.tabs),
          'helpers': helpers,
          'viewmore': xhrObject.passedkey.viewmore,
          'panelDetail': xhrObject.passedkey
        };
      }

      dataHTML = (<any>$(_self.getTemplate("TabbedList"))).tmplProxy(tempObj);
      dataHTML.data(responseData);

      _self.bindTemplateEvents(dataHTML, 'TabbedList');
    } else if (xhrObject.passedkey.widgetTemplate === 'piechart') {
      var dataHTML = (<any>$(_self.getTemplate("pieChartTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
      setTimeout(function () {
        var dimens:any = {};
        dimens.width = 350;
        dimens.height = 175;
        dimens.legendRectSize = 10;
        dimens.legendSpacing = 2.4;

        _self.bindTemplateEvents(dataHTML, 'pieChartTemplate');

        if (responseData.pie_type === "donut") {
          KoreGraphAdapter.drawD3PieDonut(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #piechart', 12, 'donut_legend');
        } else {
          KoreGraphAdapter.drawD3Pie(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #piechart', 12);
        }
      }, timeout);
    } else if (xhrObject.passedkey.widgetTemplate === 'linechart') {
      var dataHTML = (<any>$(_self.getTemplate("lineChartTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
      setTimeout(function () {
        var dimens:any = {};
        dimens.width = 350;
        dimens.height = 175;
        dimens.outerWidth = 450;
        dimens.outerHeight = 360;
        dimens.innerWidth = 210;
        dimens.innerHeight = 250;
        dimens.legendRectSize = 10;
        dimens.legendSpacing = 2.4;

        _self.bindTemplateEvents(dataHTML, 'lineChartTemplate');

        KoreGraphAdapter.drawD3lineChartV2(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #linechart', 12);
      }, timeout);
    } else if (xhrObject.passedkey.widgetTemplate === 'barchart') {
      var dataHTML = (<any>$(_self.getTemplate("barChartTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
      setTimeout(function () {
        var dimens:any = {};
        dimens.width = 350;
        dimens.height = 175;
        dimens.legendRectSize = 10;
        dimens.legendSpacing = 2.4;
        dimens.outerWidth = 450;
        dimens.outerHeight = 360;
        dimens.innerWidth = 230;
        dimens.innerHeight = 250;
        dimens.legendRectSize = 15;
        dimens.legendSpacing = 4;


        _self.bindTemplateEvents(dataHTML, 'barChartTemplate');

        if (responseData.stacked == false && responseData.direction == 'vertical') {
          KoreGraphAdapter.drawD3barChart(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #barchart', 12);
        } else if (responseData.stacked == false && responseData.direction == 'horizontal') {
          dimens.outerWidth = 420;
          dimens.outerHeight = 360;
          dimens.innerWidth = 240;
          dimens.innerHeight = 250;
          KoreGraphAdapter.drawD3barHorizontalbarChart(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #barchart', 12);
        } else if (responseData.stacked == true && responseData.direction == 'vertical') {
          KoreGraphAdapter.drawD3barVerticalStackedChart(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #barchart', 12);
        } else if (responseData.stacked == true && responseData.direction == 'horizontal') {
          dimens.outerWidth = 370;
          dimens.outerHeight = 310;
          dimens.innerWidth = 170;
          dimens.innerHeight = 200;
          KoreGraphAdapter.drawD3barStackedChart(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #barchart', 12);
        } // if(responseData.pie_type==="donut"){
        //   KoreGraphAdapter.drawD3barChart(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #piechart', 12,'donut_legend');
        // }else{
        //   KoreGraphAdapter.drawD3Pie(responseData, dimens, '.widgetContParent#' + xhrObject.passedkey.subpanel + ' #piechart', 12);
        // }

      }, timeout);
    } else if (xhrObject.passedkey.widgetTemplate === 'ActionItems') {
      dataHTML = (<any>$(_self.getTemplate("ActionItems"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });

      _self.bindTemplateEvents(dataHTML, 'ActionItems');
    } else if (xhrObject.passedkey.widgetTemplate === 'AuthRequired') {
      dataHTML = (<any>$(_self.getTemplate("AuthRequired"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });

      _self.bindTemplateEvents(dataHTML, 'AuthRequired');
    } else if (xhrObject.passedkey.widgetTemplate === 'TableList') {
      dataHTML = (<any>$(_self.getTemplate("TableList"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey,
        'viewmore': true,
      });
      _self.bindTemplateEvents(dataHTML, 'TableList');
    } else if (xhrObject.passedkey.widgetTemplate === 'form') {
      dataHTML = (<any>$(_self.getTemplate("webForm"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });
      _self.bindTemplateEvents(dataHTML, 'webForm');
    } else {
      //#todo:deviation : making "defaultFilesTemplate" as default template, naming should correct though
      //var dataHTML = $(_self.getTemplate("defaultTemplate")).tmplProxy({
      dataHTML = (<any>$(_self.getTemplate("defaultFilesTemplate"))).tmplProxy({
        'tempdata': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey
      });

      _self.bindTemplateEvents(dataHTML, 'defaultFilesTemplate');
    }
  }

  if (dataHTML) {
    return dataHTML;
  }
};


prepereWidgetHeader  (responseData:any, xhrObject:any) {
  var _self:any = this;
  var widgetData = _self.getWidgetDataByWidgetId(xhrObject.passedkey.subpanel);
  if (typeof widgetData === 'object') {
    if (responseData && (
      (responseData.sortOptions && responseData.sortOptions.length) ||
      (responseData.filterOptions && responseData.filterOptions.length) ||
      (responseData.headerOptions && responseData.headerOptions.type === "menu" && responseData.headerOptions.menu && responseData.headerOptions.menu.length) ||
      (responseData.headerOptions && responseData.headerOptions.type === "text" && responseData.headerOptions.text) ||
      (responseData.headerOptions && responseData.headerOptions.type === "image" && responseData.headerOptions.image && responseData.headerOptions.image.image_src) ||
      (responseData.headerOptions && responseData.headerOptions.type === "button" && responseData.headerOptions.button && responseData.headerOptions.button.title) ||
      (responseData.headerOptions && responseData.headerOptions.type === "url" && responseData.headerOptions.url && responseData.headerOptions.url.title))) {
      var headerHtml = (<any> $(_self.getTemplate("widgetHeader"))).tmplProxy({
        'tempData': responseData,
        'helpers': helpers,
        'panelDetail': xhrObject.passedkey,
        'widgetData': widgetData
      });
      _self.bindTemplateEvents(headerHtml, 'widgetHeader', responseData);
      $('#' + xhrObject.passedkey.subpanel + '.widgetPanel').find('.panelHeader').html(headerHtml);
    }
  }
}

renderTemplate  (responseData:any, xhrObject:any) {
  var _self:any = this;
  if (xhrObject && xhrObject.passedkey) {
    _self.prepereWidgetHeader(responseData, xhrObject);
    if (responseData && responseData.formLink) {
      var channelParms = "&channel=widgetSdk"
      var widgetId = "&widgetId=" + xhrObject.passedkey.subpanel;
      responseData.formLink = responseData.formLink + channelParms + widgetId;
    }
    var dataHTML = _self.getHTMLTemplate(responseData, xhrObject);
    if (!xhrObject.passedkey.showAll) {
      if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel && xhrObject.passedkey.filter) {
        $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.filter + '_content').html(dataHTML);
      } else if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel) {
        $(_self.config.container.content).find('.mainTemplateCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.subpanel + '_content').html(dataHTML);
      }
      if (KRPerfectScrollbar) {
        _self.vars.contentPSObj = null;
        if (!_self.vars.contentPSObj) {
          _self.vars.contentPSObj = new KRPerfectScrollbar($(_self.config.container.content).find(".mainTemplateBdr").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.contentPSObj.update();
        }
      }

    } else {
      if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel && xhrObject.passedkey.filter) {
        $(_self.config.container.content).find('.viewMoreCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel + ' #' + xhrObject.passedkey.filter + '_content').html(dataHTML);
      } else if (xhrObject.passedkey.panel && xhrObject.passedkey.subpanel) {
        $(_self.config.container.content).find('.viewMoreCntr#' + xhrObject.passedkey.panel + ' #' + xhrObject.passedkey.subpanel).html(dataHTML);
      } // if (!viewMoreCntrScroll) {
      //   viewMoreCntrScroll = new PerfectScrollbar('.viewMoreCntr .scroll', { suppressScrollX: true });
      // } else {
      //   viewMoreCntrScroll.update();
      // }
      if (KRPerfectScrollbar) {
        _self.vars.contentPSObj = null;
        if (!_self.vars.contentPSObj) {
          _self.vars.contentPSObj = new KRPerfectScrollbar($(_self.config.container.content).find(".mainTemplateBdr").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.contentPSObj.update();
        }
      }
    }
  } //#todo //applyWidgetOverlay();
};


resolveUrl  (toResolveUrl:any, values:any, deleteProp:any) {
  var _regExToParamName = /\:([a-zA-Z]+)/g;
  return toResolveUrl.replace(_regExToParamName, function (matchStr:any, valName:any) {
    var r = values[valName];

    if (typeof r !== 'undefined' && typeof r !== null) {
      if (deleteProp) {
        delete values[valName];
      }

      return r;
    }

    return matchStr;
  });
};


getResolveMeeting  (obj:any) {
  var _self:any = this;

  var items:any = [];

  if (obj && obj.elements && obj.elements.length) {
    for (let i = 0; i < obj.elements.length; i++) {
      var temp:any = [];
      var actionsArr = obj.elements[i].actions;

      for (var k = 0; k < actionsArr.length; k++) {
        var actionObj = actionsArr[k];

        if (actionObj.type !== "dial") {
          temp.push(actionObj);
        }
      }

      obj.elements[i].actions = temp;
      var ele = Object.assign({}, obj.elements[i]);

      var slots = _self.getMeetingSlot(ele.data.duration);

      for (let j = 0; j < slots.length; j++) {
        var today = new Date();
        var localStarttime = new Date(slots[j].start);

        if ((today.getFullYear() <= localStarttime.getFullYear() && today.getMonth() <= localStarttime.getMonth() && today.getDate() <= localStarttime.getDate() || today.getTime() <= slots[j].start) && slots[j].end <= obj.cursor.end) {
          ele.data.duration = slots[j];
          var startTime = new Date(slots[j].start);
          var endTime = new Date(slots[j].end);

          if (slots.length === 1) {
            if (ele.data.isAllDay) {
              ele.day = 'All Day';
              ele.break = true;
              ele.localDay = {
                'intial': 'All Day'
              };
              items.push(_self.cloneMessage1(ele));
            } else if (startTime.getHours() === 0 && startTime.getMinutes() === 0 && endTime.getHours() === 23 && endTime.getMinutes() === 59) {
              ele.day = 'All Day';
              ele.break = true;
              ele.localDay = {
                'intial': 'All Day'
              };
              items.push(_self.cloneMessage1(ele));
            } else {
              items.push(_self.cloneMessage1(ele));
            }
          } else {
            var off = j + 1;

            if (startTime.getHours() === 0 && startTime.getMinutes() === 0 && endTime.getHours() === 23 && endTime.getMinutes() === 59) {
              ele.day = 'All Day';
              ele.break = true;

              if (off === slots.length) {
                ele.localDay = {
                  'intial': 'All Day',
                  'last': ' (Day ' + off + '/' + slots.length + ')'
                };
              } else {
                ele.localDay = {
                  'intial': 'All Day',
                  'last': ' (Day ' + off + '/' + slots.length + ')'
                };
              }
            } else if (off !== slots.length) {
              ele.day = 'From' + startTime.getTime() + ' Day (' + off + '/' + slots.length + ')';
              ele.break = true;
              ele.localDay = {
                'intial': 'From',
                'time': startTime.getTime(),
                'last': ' (Day ' + off + '/' + slots.length + ')'
              };
            } else if (off === slots.length) {
              ele.day = 'Till' + endTime.getTime() + ' Day (' + off + '/' + slots.length + ')';
              ele.break = true;
              ele.localDay = {
                'intial': 'Till',
                'time': endTime.getTime(),
                'last': ' (Day ' + off + '/' + slots.length + ')'
              };
            }

            items.push(_self.cloneMessage1(ele));
          }
        }
      }
    }

    items.sort(_self.compare);
    return items;
  } else {
    return items;
  }
};

filterTabs (parentId:any, subpanelId:any, filterId:any) {
  var _self = this;

  $(parentId + ' #' + subpanelId + ' .' + subpanelId + '_content').hide(); // hiding the content panel

  $(parentId + ' #' + subpanelId + ' #' + filterId + '_content').show(); // showing the content panel

  $(parentId + ' #' + subpanelId + ' .filterCntr li').addClass('unActive').removeClass('active'); // removing active class from all and adding unactive class to all

  $(parentId + ' #' + subpanelId + ' #' + filterId).addClass('active').removeClass('unActive'); // add active in current tab and remove unactive

  _self.resetTask();
};


viewMorePanel  (obj:any) {
  var _self:any = this;
  var initialWidgetData = _self.vars.initialWidgetData;

  var viewMoreObj;
  intializeOffset = 0;

  try {
    viewMoreObj = JSON.parse(obj);

    for (var i = 0; i < initialWidgetData.panels.length; i++) {
      if (initialWidgetData.panels[i]._id.toLowerCase() === viewMoreObj.panel.toLowerCase()) {
        for (var j = 0; j < initialWidgetData.panels[i].widgets.length; j++) {
          initialWidgetData.panels[i].widgets[j].templateType = initialWidgetData.panels[i].widgets[j].templateType == undefined ? "Sushanth" : initialWidgetData.panels[i].widgets[j].templateType;

          if (initialWidgetData.panels[i].widgets[j]._id === viewMoreObj.subpanel) {
            var ele = $.extend(true, {}, initialWidgetData.panels[i]);
            ele.widgets = [];
            ele.widgets.push(initialWidgetData.panels[i].widgets[j]);
            if (ele.widgets.length === 1) {
              var dataHTML = (<any>$(_self.getTemplate("viewMoreTemplate"))).tmplProxy({
                'widgetData': ele,
                'helpers': helpers,
                'panelDetail': viewMoreObj
              });
            } else {
              for (var k = 0; k < ele.widgets.length; k++) {
                if (ele.widgets[k].id !== viewMoreObj.subpanel) {
                  ele.widgets.splice(k, 1);
                }
              }

              var dataHTML = (<any>$(_self.getTemplate("viewMoreTemplate"))).tmplProxy({
                'widgetData': ele,
                'helpers': helpers,
                'panelDetail': viewMoreObj
              });
            }

            $(_self.config.container.content).append(dataHTML);

            if (initialWidgetData.panels[i].widgets[j].hook && initialWidgetData.panels[i].widgets[j].hook.api) {
              var panelDetail:any = {
                'panel': initialWidgetData.panels[i]._id,
                'subpanel': initialWidgetData.panels[i].widgets[j].id,
                'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
                'viewmore': false,
                'showAll': true
              };

              _self.getServerData(initialWidgetData.panels[i].widgets[j].hook.api, initialWidgetData.panels[i].widgets[j].hook.method, initialWidgetData.panels[i].widgets[j].hook.body, initialWidgetData.panels[i].widgets[j].hook.params, panelDetail);
            } else {
              if (initialWidgetData.panels[i].widgets[j].filters) {
                for (var l = 0; l < initialWidgetData.panels[i].widgets[j].filters.length; l++) {
                  var panelDetail:any = {
                    'panel': initialWidgetData.panels[i]._id,
                    'subpanel': initialWidgetData.panels[i].widgets[j].id,
                    'widgetTemplate': initialWidgetData.panels[i].widgets[j].templateType,
                    'viewmore': false,
                    'filter': initialWidgetData.panels[i].widgets[j].filters[l].id,
                    'showAll': true
                  };

                  _self.getServerData(initialWidgetData.panels[i].widgets[j].filters[l].hook.api, initialWidgetData.panels[i].widgets[j].filters[l].hook.method, initialWidgetData.panels[i].widgets[j].filters[l].hook.body, initialWidgetData.panels[i].widgets[j].filters[l].hook.params, panelDetail);
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log('Not getting JSON:' + e);
  }
};

scrollData  (paneldata:any, filterdata:any, panelType:any, e:any) {
  var _self:any = this;

  var paneldata = JSON.parse(paneldata);
  var filterdata = JSON.parse(filterdata);
  var pos = e.scrollTop + e.offsetHeight;
  var max = e.scrollHeight;

  if (pos === max) {
    if (filterdata && filterdata.hook && filterdata.hook.api) {
      var apiAjax = filterdata.hook.api; //cacheData Api

      if (filterdata.hook.params) {
        apiAjax = apiAjax + '?' + $.param(filterdata.hook.params);
      }

      var resultApiCache = _self.vars.cacheData.filter(function (obj:any) {
        return obj.api === apiAjax;
      });
      var viewMoredata = resultApiCache[0].response;

      if (viewMoredata && viewMoredata.hasMore) {
        paneldata.viewmore = panelType === "maintemplate" ? false : false;

        _self.scrollServerData(viewMoredata.hook.api, viewMoredata.hook.method, viewMoredata.hook.body, paneldata, e, viewMoredata, panelType);
      }
    }
  }
};

scrollServerData(url:any, method:any, payload:any, passedJson:any, e:any, viewMoredata:any, panelType:any):any {
  var _self:any = this;

  url = _self.resolveUrl(url, {
    userId: _self.config.botOptions.botInfo.customData.kmUId
  }, false);
  if (viewMoredata.hook.params) url = viewMoredata.hook.api + '?' + $.param(viewMoredata.hook.params);
  return (<any> $).ajax({
    url: window.baseUrl + '/' + url,
    type: method,
    data: payload,
    myData: passedJson,
    async: true,
    beforeSend: function beforeSend(xhr:any, passedkey:any) {
      xhr.setRequestHeader("Authorization", "bearer " + _self.config.botOptions.botInfo.customData.kmToken);
      xhr.passedkey = passedkey.myData;
    },
    success: function success(responsedata:any, status:any, xhrObject:any) {
      var responseData = _self.mergedata(viewMoredata, responsedata);

      xhrObject.passedkey['showAll'] = panelType === "maintemplate" ? false : true;

      if (xhrObject && xhrObject.passedkey) {
        if (xhrObject.passedkey.widgetTemplate === 'calendar_events') {
          var ele = $.extend(true, {}, responseData);
          var ele1 = $.extend(true, {}, responseData);

          var elements = _self.getResolveMeeting(ele);

          ele1.elements = elements;
          var dataHTML = (<any> $(_self.getTemplate("meetingTemplate"))).tmplProxy({
            'tempdata': ele1,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'task_list') {
          var dataHTML = (<any>$(_self.getTemplate("tasksTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'cloudFiles') {
          var dataHTML = (<any>$(_self.getTemplate("filesTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'Sushanth' || xhrObject.passedkey.widgetTemplate === 'custom_style') {
          var dataHTML = (<any>$(_self.getTemplate("defaultFilesTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'knowledge_list') {
          var dataHTML = (<any>$(_self.getTemplate("knowledgeTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'TrendingHashTag') {
          var dataHTML = (<any>$(_self.getTemplate("hashtagTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else if (xhrObject.passedkey.widgetTemplate === 'announcement_list') {
          var dataHTML = (<any>$(_self.getTemplate("announcementTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey,
            'showAll': panelType === "maintemplate" ? false : true
          });
        } else {
          var dataHTML = (<any>$(_self.getTemplate("defaultTemplate"))).tmplProxy({
            'tempdata': responseData,
            'helpers': helpers,
            'panelDetail': xhrObject.passedkey
          });
        }

        $(e).html(dataHTML);

        if (panelType === "viewmore" && !viewMoreCntrScroll) {
          viewMoreCntrScroll = new PerfectScrollbar('.viewMoreCntr .scroll', {
            suppressScrollX: true
          });
        } else {
          if (panelType === "viewmore") {
            viewMoreCntrScroll.update();
          }
        }
      }
    },
    error: function error(err:any) {
      var xhrObject:any = {};
      xhrObject.passedkey = {};
      xhrObject.passedkey = err.passedkey;
      if (err && typeof err === 'object' && err.responseJSON && err.responseJSON.errors && err.responseJSON.errors.length) {
        xhrObject.templateType = 'somthingWentWrong';
        xhrObject.errMsg = err.responseJSON.errors[0].msg || ''; // responseData.errMsgDiscription = responseCopy;
      }
      if (err && err.status == '429') {
        xhrObject.templateType = 'somthingWentWrong';
        xhrObject.errMsg = err.responseText || 'Too many tries, please wait for sometime';
      }
      var dataHTML = (<any>$(_self.getTemplate("ErrorTemplate"))).tmplProxy({
        'tempdata': xhrObject,
        'panelDetail': xhrObject.passedkey
      });
      $(e).html(dataHTML);
      if (KRPerfectScrollbar) {
        _self.vars.contentPSObj = null;
        if (!_self.vars.contentPSObj) {
          _self.vars.contentPSObj = new KRPerfectScrollbar($(_self.config.container.content).find(".mainTemplateBdr").get(0), {
            suppressScrollX: true
          });
        } else {
          _self.vars.contentPSObj.update();
        }
      }
    }
  });
};

mergedata  (oldJson:any, newJson:any) {
  var oldkeys = Object.keys(oldJson);
  var newkeys = Object.keys(newJson);
  var commonKeys = oldkeys.filter(function (obj) {
    return newkeys.indexOf(obj) !== -1;
  }); //updating oldJson based on newJson

  for (var k = 0; k < commonKeys.length; k++) {
    if (commonKeys[k] === 'elements') {
      oldJson.elements = oldJson.elements.concat(newJson.elements);
    } else {
      delete oldJson[commonKeys[k]];
      oldJson[commonKeys[k]] = newJson[commonKeys[k]];
    }
  }

  return oldJson;
};

setChatFocus  () {
  var _self:any = this;

  $('.menuItemCntr .menuItem').removeClass('active');
  $('.menuItemCntr #kora').addClass('active');
  window.menuActiveTab = '';

  _self.resetTask();

  clearInterval(pollingTimer);

  if (meetingTimeRef.length > 0) {
    for (var k = 0; k < meetingTimeRef.length; k++) {
      clearInterval(meetingTimeRef[k]);
    }
  }

  if ($(_self.config.container.content).is(':visible')) {
    $(_self.config.container.content).hide(500,"linear", {
      direction: _self.config.direction //$.jStorage.get('menuPosition')

    } as any);
  }

  $('.chatInputBox').focus();
  $('.centerWindow').children().not('.kore-chat-window').not('.koraPanelHeader').not('.centralLoader').remove();
};

removeViewMore  () {
  var _self:any = this;

  $(_self.config.container.content).find('.viewMoreCntr').remove();
};

getColumnWidth  (width:any) {
  var _self = this;
  var newWidth;
  var widthToApply:any = '100%';
  if (width) {
    newWidth = width.replace(/[^\d.-]/g, '');
    console.log(width)
    try {
      widthToApply = 100 - parseInt(newWidth, 10);
    } catch (e) {
      console.log(width);
    }
    return widthToApply;
  }
};

refreshElement (panelDetails:any, refreshFullpanel:any, widgetData?:any) {
  // need to correct with filter implementation form and imputs mainlt//
  var _self:any = this;
  var _config = _self.config;
  if (panelDetails) {
    try {
      var panelDetails = JSON.parse(panelDetails);
      if (refreshFullpanel) {
        _self.prepareRenderData(panelDetails.panel);
      } else {
        if (widgetData) {
          clearInterval(widgetData.pollingTimer);
        }
        $('.widgetContParent#' + panelDetails.subpanel).find('.progress').show();
        _self.getServerData('widgetsdk/' + _config.botOptions.botInfo._id + '/widgets/' + panelDetails.subpanel, 'post', {}, {
          "from": _config.botOptions.userIdentity || "user-name"
        }, panelDetails);
      }
    } catch (e) {
      console.log('invalidjson');
    }
  }
};

refreshWidgetData (widgetData:any, time:any, panelDetail:any) {
  var _self:any = this;
  var currTime = new Date().getTime();
  var givenTime:any = new Date().getTime() + 1000 * time;
  givenTime = parseInt(givenTime);
  if ($(_self.config.container.content).find('.mainTemplateCntr#' + panelDetail.panel).is(':visible') && currTime < givenTime) {
    _self.startWidgetPolling(widgetData, currTime, givenTime, panelDetail);
  } else {
    clearInterval(widgetData.pollingTimer);
  }
};
clearWidgetPolling  (widgetData:any) {
  var _self:any = this;
  if (widgetData) {
    clearInterval(widgetData.pollingTimer);
  } else {
    if (_self.vars.initialWidgetData && _self.vars.initialWidgetData.panels && _self.vars.initialWidgetData.panels.length) {
      for (var i = 0; i < _self.vars.initialWidgetData.panels.length; i++) {
        //todo: deviation :adding "id" from "_id"
        if (_self.vars.initialWidgetData.panels[i].widgets && _self.vars.initialWidgetData.panels[i].widgets.length) {
          _self.vars.initialWidgetData.panels[i].widgets.forEach(function (widget:any) {
            if (widget.pollingTimer) {
              clearInterval(widget.pollingTimer);
            }
          });
        } //todo: deviation :added fallback icon for panels
      }
    }
  }
}

startWidgetPolling  (widgetData:any, currTime:any, givenTime:any, panelDetail:any) {
  var _self = this;
  widgetData.pollingTimer = setInterval(function () {
    currTime = currTime + 5000;
    if (givenTime < currTime) {
      clearInterval(widgetData);
      var panelDetailsString = JSON.stringify(panelDetail);
      _self.refreshElement(panelDetailsString, false, widgetData);
    }
  }, 5000);
  console.log(widgetData);
};

refreshData  (panelName:any, time:any) {
  var _self:any = this;

  var currTime = new Date().getTime();
  var givenTime:any = new Date().getTime() + 1000 * time;
  givenTime = parseInt(givenTime);

  if ($(_self.config.container.content).find('.mainTemplateCntr#' + panelName).is(':visible') && currTime < givenTime) {
    _self.startPolling(panelName, currTime, givenTime);
  } else {
    clearInterval(pollingTimer);

    if (meetingTimeRef.length > 0) {
      for (var k = 0; k < meetingTimeRef.length; k++) {
        clearInterval(meetingTimeRef[k]);
      }
    }
  }
};
startPolling  (panelName:any, currTime:any, givenTime:any) {
  var _self:any = this;

  pollingTimer = setInterval(function () {
    currTime = currTime + 5000;

    if (givenTime < currTime) {
      clearInterval(pollingTimer);

      if (meetingTimeRef.length > 0) {
        for (var k = 0; k < meetingTimeRef.length; k++) {
          clearInterval(meetingTimeRef[k]);
        }
      }

      meetingTimeRef = [];

      _self.prepareRenderData(panelName, false);
    }
  }, 5000);
};

resetTask  () {
  taskList = [];
  taskTitle = {};
  $('.viewMoreCntr .viewTask').find('[type="checkbox"]').prop('checked', false);
  $('.viewMoreCntr .taskSelectCntr,.viewMoreCntr .taskSelectFootCntr').hide();
  $('.allTaskCntr .viewTask').removeClass('selected');
};

meetingTimer  (tdata:any, m_Data:any, index:any) {
  var _self = this; //#TODO
  // if (this.constructor !== KoreWidgetSDK) {
  //   _self = koreWidgetSDKInstance;
  // }


  if (index === 0) {
    meetingArray = [];

    if (meetingTimeRef.length > 0) {
      for (var k = 0; k < meetingTimeRef.length; k++) {
        clearInterval(meetingTimeRef[k]);
      }
    }

    meetingTimeRef = [];
  }

  m_Data.data.duration.objId = "m_" + index;
  meetingArray.push(m_Data.data.duration);
  var m_startTime = m_Data.data.duration.start; // meeting start timeStamp

  var m_endTime = m_Data.data.duration.end; // meeting end timeStamp

  var dayType = helpers.getTimeline(m_startTime, "fulldate", "meetings");
  var timeStatus = helpers.compareCurntTimeAndTimln_minutes(m_startTime, m_endTime, "textFormat");
  meetingTimeRef[index] = null;
  m_Data.data.duration.dayType = dayType;
  m_Data.data.duration.index = index;
  m_Data.data.duration.timeStatus = timeStatus;

  _self.startTimer(meetingArray[index]);

  return timeStatus;
};

startTimer  (mObj:any) {
  var _self:any = this; //#TODO
  // if(this.constructor!==KoreWidgetSDK){
  //   _self=koreWidgetSDKInstance;
  // }


  if (meetingTimeRef[mObj.index] === null) {
    var meetingTimerv = setInterval(function () {
      // console.log(meetingTimeRef);
      var timeStatus = helpers.compareCurntTimeAndTimln_minutes(mObj.start, mObj.end, "textFormat");
      var dayType = helpers.getTimeline(mObj.start, "fulldate", "meetings");

      if (mObj.dayType && dayType !== mObj.dayType || mObj.timeStatus && timeStatus === "Now" && mObj.timeStatus !== timeStatus) {
        // console.log(mObj.index);
        // console.log(mObj.dayType);
        // console.log(dayType);
        // console.log(mObj.timeStatus);
        // console.log(timeStatus);
        _self.prepareRenderData("meetings", true);
      } else {
        $("#" + mObj.objId).html(timeStatus);
      }
    }, 30 * 1000);
    meetingTimeRef[mObj.index] = meetingTimerv;
  }
}; //********************original widgetEvents.js end */
//********************original widgetTemplateEvent.js start */


passHashTag  (uttarence:any) {
  var message = 'find the articles with ' + uttarence;
  window['chatWinRef'].sendMessageToBot($('.chatInputBox'), message, {}, 'onlyMessage');
};

openArticle  (kId:any) {
  window.angularComponentReference.zone.run(function () {
    window.angularComponentReference.componentFn({
      'id': kId
    });
  });
};

openAnnouncement  (kId:any) {
  window.angularComponentReference.zone.run(function () {
    window.viewMoreKnowledgeAnncCmp.componentFn({
      'id': kId,
      'viewType': 'announceWidgetView'
    });
  });
};

openLink  (url:any) {
  if (url) {
    window.open(url, '_blank');
  }
};

passTaskUtterances  (e:any, actionIndex:any) {
  var _self:any = this;

  var taskData = JSON.parse((<any> $(e)).attr('payload'));
  let message = taskData.actions[actionIndex].utterance.replace(/qwertyuiopasdfghjklzxcvbnmdouble/g, "\"");
  message = taskData.actions[actionIndex].utterance.replace(/qwertyuiopasdfghjklzxcvbnm/g, "'");

  if ($('.switchKoraDD .switchHeader .skillNameTxt').text().trim().toLowerCase() !== "kora") {
    var desc = $('.switchKoraDD .switchHeader .skillNameTxt').text().trim();
    var content = [{
      'id': 'taskBotInfo',
      'title': 'Switch Skill',
      'desc': 'This action will end your conversation with ' + desc + ' skill and move to Kora. Do you want to continue? ',
      'buttons': [{
        'title': 'YES'
      }, {
        'title': 'NO'
      }]
    }];

    _self.createPopup(content, taskData.id, 'Ask Kora ' + message);
  } else {
    _self.passUtterances(taskData.id, message);
  }
};

passUtterances  (idss:any, message:any, evt:any) {
  var _self:any = this;

  if (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  if (idss == 'url') {
    window.open(message, '_blank');
    return;
  }

  var parmaMessage:any = {
    ids: []
  };
  parmaMessage.ids = [];
  parmaMessage.ids.push(idss);
  var actionObj:any = $(evt.currentTarget).attr('actionobj');
  actionObj = JSON.parse(actionObj);
  var eData = {
    payload: parmaMessage,
    type: 'widget'
  };

  _self.triggerAction(actionObj, eData); // if(actionObj.payload){
  //   eData.payload=actionObj.payload;
  // }
  // if(actionObj.nlmeta){
  //   eData.nlmeta=actionObj.nlmeta;
  // }
  // if(actionObj.customdata){
  //   eData.customdata=actionObj.customdata;
  // }
  // _self.triggerEvent('postback',eData);
  // //$(_self).triggerHandler('postback',{"some":"obj","message":message});
  // //window['chatWinRef'].sendMessage($('.chatInputBox'), message, parmaMessage, 'widget');
  // _self.setChatFocus();

};

triggerEvent  (eventName:any, data:any) {
  var _self:any = this;

  if (_self.events && _self.events[eventName]) {
    _self.events[eventName](data);

    _self.setChatFocus();
  }
};

triggerAction  (actionObj:any, postData:any) {
  var _self:any = this;

  if (actionObj.type === "url") {
    window.open(actionObj.url, "_blank");
    return;
  }

  var eData = postData || {};

  if (actionObj.utterance) {
    eData.utterance = actionObj.utterance;
  }

  if (actionObj.payload) {
    eData.payload = actionObj.payload;
  }

  if (actionObj.nlmeta || actionObj.nlMeta) {
    eData.nlmeta = actionObj.nlmeta || actionObj.nlMeta;
  }

  if (actionObj.customdata) {
    eData.customData = actionObj.customData;
  }

  _self.triggerEvent('onPostback', eData);
  _self.openPanel('closePanel');
  _self.setChatFocus();
};

checkCurrentUser  (oId:any, aId:any) {
  var _self:any = this;

  var uId = _self.config.userInfo.id; //$.jStorage.get('currentAccount').userInfo.id;

  if (oId == uId && aId == uId) {
    return true;
  } else {
    return false;
  }
};

categoriseMeetingDayWise  (mData:any) {
  var ele = Object.assign({}, mData);

  for (var k = 0; k < ele.length; k++) {
    var dayType = helpers.getTimeline(ele.data.duration.start, "fulldate", "meetings");

    if (dayType === "Next Inline") { } else if (dayType === 'Later Today') { } else { }
  }
};

showDropdown  (obj:any) {
  if ($(obj).next().hasClass('dropdown-contentWidgt')) {
    $(obj).next().toggleClass('show');
  }

  $('.dropdown-contentWidgt.show').not($(obj).next()).removeClass('show');
} // Close the dropdown if the user clicks outside of it
  


addArticleAnnouncement  (type:any) {
  if (type === 'Article') {
    window.angularComponentReference.zone.run(function () {
      window.addKnowledge.componentFn();
    });
  } else if (type === 'Announcement') {
    window.angularComponentReference.zone.run(function () {
      window.addAnnouncement.componentFn();
    });
  }
};

passMeetingUtterances  (_this:any) {
  var _self:any = this;

  let mainObj = $(_this).attr('mainObj');
  let actionObj:any = $(_this).attr('actionObj');
  var actionObjJson = JSON.parse(actionObj);
  var eData:any = {
    utterance: actionObjJson.utterance,
    payload: actionObjJson.payload,
    type: 'widget'
  };

  if (actionObjJson.payload) {
    eData.payload = actionObjJson.payload;
  }

  if (actionObjJson.nlmeta || actionObjJson.mlMeta) {
    eData.nlmeta = actionObjJson.nlmeta || actionObjJson.nlMeta;
  }

  if (actionObjJson.customdata) {
    eData.customdata = actionObjJson.customdata;
  }

  _self.triggerEvent('onPostback', eData); // if ($('.switchKoraDD .switchHeader .skillNameTxt').text().trim().toLowerCase() !== "kora") {
  //   var desc = $('.switchKoraDD .switchHeader .skillNameTxt').text().trim();
  //   var content = [{
  //     'id': 'meetingInfo',
  //     'title': 'Switch Skill',
  //     'desc': 'This action will end your conversation with ' + desc + ' skill and move to Kora. Do you want to continue?',
  //     'buttons': [
  //       { 'title': 'YES' },
  //       { 'title': 'NO' }
  //     ]
  //   }]
  //   _self.createPopup(content, actionObj, mainObj);
  // } else {
  //   _self.meetingAction(actionObj, mainObj);
  // }

};

meetingAction  (actionObj:any, mainObj:any) {
  try {
    actionObj = JSON.parse(actionObj);
    mainObj = JSON.parse(mainObj);
    var temp:any = new Object();
    temp['title'] = mainObj.title;
    temp['duration'] = mainObj.data.duration;
    temp['where'] = mainObj.location;
    temp['color'] = mainObj.data.color;
    temp['htmlLink'] = mainObj.data.htmlLink;
    temp['eventId'] = mainObj.data.eventId;
    temp['attendees'] = mainObj.data.attendees;
    temp['isAllDay'] = mainObj.data.isAllDay;
    temp['meetJoin'] = mainObj.data.meetJoin;
    temp['isOrganizer'] = mainObj.data.isOrganizer;
    temp['description'] = mainObj.data.description;
    temp['mId'] = mainObj.meetingId;

    if (actionObj.type === 'postback') {
      var parmaMessage = {
        ids: [mainObj.data.eventId]
      };
      window['chatWinRef'].sendMessageToBot($('.chatInputBox'), actionObj.utterance, parmaMessage, 'widget');
      this.setChatFocus();
    } else if (actionObj.type === 'view_details') {
      window.angularComponentReference.zone.run(function () {
        window.openMeetingDetail.componentFn(temp);
      });
    } else if (actionObj.type === 'open_form') {
      window.angularComponentReference.zone.run(function () {
        window.openCreateNotes.componentFn(temp);
      });
    } else if (actionObj.type === 'url') {
      window.open(actionObj.url, '_blank');
    }
  } catch (e) {
    console.log('Exception occur:' + e);
  }
};

taskkAction  (tId:any, taskName:any, e:any) {
  if (taskList.indexOf(tId) >= 0) {
    taskList.splice(taskList.indexOf(tId), 1);
    $(e).parents('.viewTask').removeClass('selected');
  } else {
    taskTitle[tId] = taskName;
    taskList.push(tId);
    $(e).parents('.viewTask').addClass('selected');
  }

  if (taskList.length === 1) {
    $(".viewMoreCntr .mainTemplateBdr .widgetContentPanel").css({
      'height': 'calc(100% - 135px - ' + $(".taskSelectFootCntr").height() + 'px)'
    });
  }

  if (taskList.length === 0) {
    $(".viewMoreCntr .mainTemplateBdr .widgetContentPanel").css({
      'height': 'calc(100% - 135px)'
    });
  }

  if (taskList.length) {
    $('.viewMoreCntr .taskSelectCntr,.viewMoreCntr .taskSelectFootCntr').show();
    var task = taskList.length === 1 ? 'task' : 'tasks';
    $('.viewMoreCntr .taskSelectCntr .taskCount').text(taskList.length + ' ' + task + ' selected');
  } else {
    $('.viewMoreCntr .taskSelectCntr,.viewMoreCntr .taskSelectFootCntr').hide();
  } // $(e)[0].scrollIntoView(false);
  // $(e)[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

};

removeTaskSelection  () {
  this.resetTask();

  if (taskList.length === 0) {
    $(".viewMoreCntr .mainTemplateBdr .widgetContentPanel").css({
      'height': 'calc(100% - 135px)'
    });
  }
};

taskSend  (type:any) {
  var _self = this;

  if ($('.switchKoraDD .switchHeader .skillNameTxt').text().trim().toLowerCase() !== "kora") {
    var desc = $('.switchKoraDD .switchHeader .skillNameTxt').text().trim();
    var content = [{
      'id': 'taskInfo',
      'title': 'Switch Skill',
      'desc': 'This action will end your conversation with ' + desc + ' skill and move to Kora. Do you want to continue? ',
      'buttons': [{
        'title': 'YES'
      }, {
        'title': 'NO'
      }]
    }];

    _self.createPopup(content, type, '');
  } else {
    _self.sendTaskAction(type, 'normal');
  }
};

taskCheckbox  (taskId:any) {
  if (taskList.indexOf(taskId) >= 0) {
    return true;
  } else {
    return false;
  }
};

sendTaskAction  (type:any, actionPlace:any) {
  var msg = '';
  var parmaMessage = {
    ids: taskList
  };

  if (type === 'complete') {
    if (taskList.length === 1) {
      msg = 'Complete task - ' + taskTitle[taskList[0]];
    } else {
      msg = 'Complete selected tasks';
    }
  } else if (type === 'changeduedate') {
    if (taskList.length === 1) {
      msg = 'Change due date of task - ' + taskTitle[taskList[0]];
    } else {
      msg = 'Change due date of the selected tasks';
    }
  }

  if (actionPlace === 'switchbot') {
    msg = 'Ask Kora ' + msg;
  }

  window['chatWinRef'].sendMessageToBot($('.chatInputBox'), msg, parmaMessage, 'meeting_action');
  taskList = [];
  taskTitle = {};
  $(this.config.container.content).find('.viewMoreCntr').remove();
};

popupAction  (data:any, title:any, _this:any) {
  var _self:any = this;

  var actionObj:any = $(_this).attr('actionObj');
  var mainObj = $(_this).attr('mainObj');

  try {
    var loData = JSON.parse(data);
    var loTitle = title.toLowerCase();

    if (loTitle === 'no') {
      if (loData[0].id === 'skillSwitche') {
        $('.mgrCntr').find('#preview_' + loData[0]['id']).fadeOut('fast', function () {
          $('.mgrCntr').find('#preview_' + loData[0]['id']).remove();
        });
        $('.mgrCntr').find('#popup_' + loData[0]['id']).fadeOut('fast', function () {
          $('.mgrCntr').find('#popup_' + loData[0]['id']).remove();
        });
        actionObj.btnresponse = false;
        window.openPanel(actionObj.oldPanel, actionObj);
        return;
      }

      $('.mgrCntr').find('#preview_' + loData[0]['id']).fadeOut('slow', function () {
        $('.mgrCntr').find('#preview_' + loData[0]['id']).remove();
      });
      $('.mgrCntr').find('#popup_' + loData[0]['id']).fadeOut('slow', function () {
        $('.mgrCntr').find('#popup_' + loData[0]['id']).remove();
      });
    } else if (loTitle === 'yes') {
      if (loData[0].id === 'meetingInfo') {
        var lactionObj = JSON.parse(actionObj);
        lactionObj.utterance = 'Ask Kora ' + lactionObj.utterance;

        _self.meetingAction(JSON.stringify(lactionObj), mainObj);
      } else if (loData[0].id === 'taskInfo') {
        _self.sendTaskAction(actionObj, 'switchbot');
      } else if (loData[0].id === 'taskBotInfo') {
        _self.passUtterances(actionObj, mainObj);
      } else if (loData[0].id === 'skillSwitche') {
        $('.mgrCntr').find('#preview_' + loData[0]['id']).fadeOut('fast', function () {
          $('.mgrCntr').find('#preview_' + loData[0]['id']).remove();
        });
        $('.mgrCntr').find('#popup_' + loData[0]['id']).fadeOut('fast', function () {
          $('.mgrCntr').find('#popup_' + loData[0]['id']).remove();
        });
        var actionObj = JSON.parse(actionObj);
        actionObj.btnresponse = true;
        window.openPanel(actionObj.newPanel, actionObj);
        return;
      }

      $('.mgrCntr').find('#preview_' + loData[0]['id']).fadeOut('slow', function () {
        $('.mgrCntr').find('#preview_' + loData[0]['id']).remove();
      });
      $('.mgrCntr').find('#popup_' + loData[0]['id']).fadeOut('slow', function () {
        $('.mgrCntr').find('#popup_' + loData[0]['id']).remove();
      });
    } else if (loTitle.toLowerCase() === 'ok') {
      if (loData[0].id === 'tokenExpired') {
        window.angularComponentReference.zone.run(function () {
          window.componentRefsessionTmout.componentFn();
        });
      }
    }
  } catch (e) {
    console.log('Exception occur: ' + e);
  }
};

createPopup  (content:any, actionObj:any, mainObj:any) {
  var _self:any = this;

  var dataHTML = (<any>$(_self.getTemplate("popUpTemplate"))).tmplProxy({
    'tempdata': content,
    'actionObj': actionObj,
    'mainObj': mainObj
  });
  $('.mgrCntr').append(dataHTML);
};

toggelMeetingActionBtn  (id:any, e:any) {
  if ($(e).children().hasClass("icon-Arrow_Drop_Down_Up")) {
    $(e).children().removeClass("icon-Arrow_Drop_Down_Up");
    $(e).children().addClass("icon-Arrow_Drop_Down");
  } else {
    $(e).children().addClass("icon-Arrow_Drop_Down_Up");
    $(e).children().removeClass("icon-Arrow_Drop_Down");
  }

  $("#" + id).slideToggle("slow");
};

hexToRGBMeeting (hex:any, alpha:any) {
  if (!alpha) {
    if ($("body").hasClass("darkTheme")) {
      alpha = 0.7;
    } else {
      alpha = 0.3;
    }
  }

  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

isURL  (str:any) {
  function hasWhiteSpace(text:any) {
    return /\s/g.test(text);
  }

  var statusWhiteSpace = hasWhiteSpace(str);

  if (statusWhiteSpace) {
    str = str.split(/[ ]+/);
    str = str[0];
  } // var pattern = new RegExp('^((https|http)?:\\/\\/)?' + // protocol
  //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  //     console.log(pattern.test(str));


  var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  if (res) {
    return {
      status: true,
      location: str
    };
  } else {
    return {
      status: false,
      location: str
    };
  }
}; //********************original widgetTemplateEvent.js end */


getTemplateMethods  () {
  var _self:any = this;

  var methodMap:any = {};
  var templateMethodsArr = ["openPanel", "filterTabs", "viewMorePanel", "scrollData", "removeViewMore", "meetingTimer", "passHashTag", "openArticle", "openAnnouncement", "openLink", "passTaskUtterances", "passUtterances", "checkCurrentUser", "showDropdown", "addArticleAnnouncement", "passMeetingUtterances", "taskkAction", "removeTaskSelection", "taskSend", "taskCheckbox", "popupAction", "toggelMeetingActionBtn", "hexToRGBMeeting", "isURL"];
  templateMethodsArr.forEach(function (methodName) {
    methodMap[methodName] = _self[methodName].bind(_self);
  });
  return methodMap;
};

openPanelForWindow  (panelName:any, resPopUp:any, heightToggle:any) {
  window.koreWidgetSDKInstance.openPanel.call(window.koreWidgetSDKInstance, panelName, resPopUp, heightToggle);
};

filterTabsForWindow  (parentId:any, subpanelId:any, filterId:any) {
  window.koreWidgetSDKInstance.filterTabs.call(window.koreWidgetSDKInstance, parentId, subpanelId, filterId);
};

viewMorePanelForWindow  (obj:any) {
  window.koreWidgetSDKInstance.viewMorePanel.call(window.koreWidgetSDKInstance, obj);
};

scrollDataForWindow  (paneldata:any, filterdata:any, panelType:any, e:any) {
  window.koreWidgetSDKInstance.scrollData.call(window.koreWidgetSDKInstance, paneldata, filterdata, panelType, e);
};

removeViewMoreForWindow  () {
  window.koreWidgetSDKInstance.removeViewMore.call(window.koreWidgetSDKInstance);
};

meetingTimerForWindow  (tdata:any, m_Data:any, index:any) {
  window.koreWidgetSDKInstance.meetingTimer.call(window.koreWidgetSDKInstance, tdata, m_Data, index);
};

passHashTagForWindow  (uttarence:any) {
  window.koreWidgetSDKInstance.passHashTag.call(window.koreWidgetSDKInstance, uttarence);
};

openArticleForWindow  (kId:any) {
  window.koreWidgetSDKInstance.openArticle.call(window.koreWidgetSDKInstance, kId);
};

openAnnouncementForWindow  (kId:any) {
  window.koreWidgetSDKInstance.openAnnouncement.call(window.koreWidgetSDKInstance, kId);
};

openLinkForWindow  (url:any) {
  window.koreWidgetSDKInstance.openLink.call(window.koreWidgetSDKInstance, url);
};

passTaskUtterancesForWindow  (e:any, actionIndex:any) {
  window.koreWidgetSDKInstance.passTaskUtterances.call(window.koreWidgetSDKInstance, e, actionIndex);
};

passUtterancesForWindow (idss:any, message:any, evt:any) {
  window.koreWidgetSDKInstance.passUtterances.call(window.koreWidgetSDKInstance, idss, message, evt);
};

checkCurrentUserForWindow  (oId:any, aId:any) {
  window.koreWidgetSDKInstance.checkCurrentUser.call(window.koreWidgetSDKInstance, oId, aId);
};

showDropdownForWindow (obj:any) {
  window.koreWidgetSDKInstance.showDropdown.call(window.koreWidgetSDKInstance, obj);
};

addArticleAnnouncementForWindow  (type:any) {
  window.koreWidgetSDKInstance.addArticleAnnouncement.call(window.koreWidgetSDKInstance, type);
};

refreshElementForWindow  (type: any, refreshType: any) {
  window.koreWidgetSDKInstance.refreshElement.call(window.koreWidgetSDKInstance, type, refreshType);
};

passMeetingUtterancesForWindow (_this: any) {
  window.koreWidgetSDKInstance.passMeetingUtterances.call(window.koreWidgetSDKInstance, _this);
};

taskkActionForWindow (tId: any, taskName: any, e: any) {
  window.koreWidgetSDKInstance.taskkAction.call(window.koreWidgetSDKInstance, tId, taskName, e);
};

removeTaskSelectionForWindow () {
  window.koreWidgetSDKInstance.removeTaskSelection.call(window.koreWidgetSDKInstance);
};

taskSendForWindow (type: any) {
  window.koreWidgetSDKInstance.taskSend.call(window.koreWidgetSDKInstance, type);
};

taskCheckboxForWindow  (taskId: any) {
  window.koreWidgetSDKInstance.taskCheckbox.call(window.koreWidgetSDKInstance, taskId);
};

popupActionForWindow  (data: any, title: any, _this: any) {
  window.koreWidgetSDKInstance.popupAction.call(window.koreWidgetSDKInstance, data, title, _this);
};

toggelMeetingActionBtnForWindow  (id: any, e: any) {
  window.koreWidgetSDKInstance.toggelMeetingActionBtn.call(window.koreWidgetSDKInstance, id, e);
};

hexToRGBMeetingForWindow  (hex: any, alpha: any) {
  window.koreWidgetSDKInstance.hexToRGBMeeting.call(window.koreWidgetSDKInstance, hex, alpha);
};

isURLForWindow  (str: any) {
  window.koreWidgetSDKInstance.isURL.call(window.koreWidgetSDKInstance, str);
};


getMeetingSlot  (duration:any) {
  var _self = this;

  var slots:any = [];
  var myStart = new Date(duration.start);
  var myEnd = new Date(duration.end);
  let days = _self.getDateArray(myStart, myEnd);
 let day = days.length - 1;

  if (day < 1) {
    return slots = [{
      'start': duration.start,
      'end': duration.end
    }];
  } else {
    var start = duration.start;
    var end = duration.end;

    for (var _i = 0; _i <= day; _i++) {
      var startDate = new Date(start);
      var endDate = new Date(end);

      if (_i > 0) {
        startDate.setDate(startDate.getDate() + _i);
        var tempStartDate = startDate;
        startDate = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate(), 0, 0, 0); // 2013-07-30 23:59:59
      }

      var endOfDay:any = '';

      if (_i === day) {
        endOfDay = endDate;
      } else {
        endOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 23, 59, 0); // 2013-07-30 23:59:59
      }

      var today = new Date();
      var localStarttime = new Date(startDate); // if (today.getFullYear() <= localStarttime.getFullYear() && today.getMonth() <= localStarttime.getMonth() && today.getDate() <= localStarttime.getDate())

      slots.push({
        'start': new Date(startDate).getTime(),
        'end': new Date(endOfDay).getTime()
      });
    }

    return slots;
  }
};

getDateArray  (start:any, end:any) {
  var arr = new Array(),
    dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
};

cloneMessage1  (obj:any) {
  var _self:any = this;

  var rv;

  switch (_typeof(obj)) {
    case "object":
      if (obj === null) {
        rv = null;
      } else {
        switch (toString.call(obj)) {
          case "[object Array]":
            rv = obj.map(_self.cloneMessage1.bind(_self));
            break;

          case "[object Date]":
            rv = new Date(obj);
            break;

          case "[object RegExp]":
            rv = new RegExp(obj);
            break;

          default:
            rv = Object.keys(obj).reduce(function (prev:any, key:any) {
              prev[key] = _self.cloneMessage1(obj[key]);
              return prev;
            }, {});
            break;
        }
      }

      break;

    default:
      rv = obj;
      break;
  }

  return rv;
};

compare  (a:any, b:any) {
  var startFirst = a.data.duration.start;
  var startSecond = b.data.duration.start;
  var comparison = 0;

  if (startFirst > startSecond) {
    comparison = 1;
  } else if (startFirst < startSecond) {
    comparison = -1;
  }

  return comparison;
};

init  (config:any) {
  //me = this;
  this.events = {};
  this.config = config || {}; //this.bot.init(this.config.botOptions);
  //todo:need to remove

  window.baseUrl = config.botOptions.koreAPIUrl;
  config.direction = "left"; //$.jStorage.get('menuPosition');

  config.userInfo = {
    id: ""
  }; //$.jStorage.get('currentAccount').userInfo;

  console.log($);
  $('body').off('click').on('click', function () {
    if ($('.kore-chat-window')) {
      $('.kore-chat-window').removeClass('selectedHeight')
    }
  })
};

setJWT  (jwtToken:any) {
  var _self:any = this;

  if (_self.config.botOptions && _self.config.botOptions.botInfo) {
    if (_self.config.botOptions && _self.config.botOptions.botInfo && _self.config.botOptions.botInfo.customData) {
      _self.config.botOptions.botInfo.customData.kmToken = jwtToken;
    } else {
      _self.config.botOptions.botInfo.customData = {
        kmToken: jwtToken
      };
    }
  } else {
    _self.config.botOptions.botInfo = {
      customData: {
        kmToken: jwtToken
      }
    };
  }
};
extend  (target:any, source:any) {
  let me = this;
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (target[prop] && typeof source[prop] === 'object') {
        me.extend(target[prop], source[prop]);
      }
      else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
  
}

window.openPanel = KoreWidgetSDK.prototype.openPanelForWindow;
window.filterTabs = KoreWidgetSDK.prototype.filterTabsForWindow;
window.viewMorePanel = KoreWidgetSDK.prototype.viewMorePanelForWindow;
window.scrollData = KoreWidgetSDK.prototype.scrollDataForWindow;
window.removeViewMore = KoreWidgetSDK.prototype.removeViewMoreForWindow;
window.meetingTimer = KoreWidgetSDK.prototype.meetingTimerForWindow;
window.passHashTag = KoreWidgetSDK.prototype.passHashTagForWindow;
window.openArticle = KoreWidgetSDK.prototype.openArticleForWindow;
window.openAnnouncement = KoreWidgetSDK.prototype.openAnnouncementForWindow;
window.openLink = KoreWidgetSDK.prototype.openLinkForWindow;
window.passTaskUtterances = KoreWidgetSDK.prototype.passTaskUtterancesForWindow;
window.passUtterances = KoreWidgetSDK.prototype.passUtterancesForWindow;
window.checkCurrentUser = KoreWidgetSDK.prototype.checkCurrentUserForWindow;
window.showDropdown = KoreWidgetSDK.prototype.showDropdownForWindow;
window.addArticleAnnouncement = KoreWidgetSDK.prototype.addArticleAnnouncementForWindow;
window.refreshElement = KoreWidgetSDK.prototype.refreshElementForWindow;
window.passMeetingUtterances = KoreWidgetSDK.prototype.passMeetingUtterancesForWindow;
window.taskkAction = KoreWidgetSDK.prototype.taskkActionForWindow;
window.removeTaskSelection = KoreWidgetSDK.prototype.removeTaskSelectionForWindow;
window.taskSend = KoreWidgetSDK.prototype.taskSendForWindow;
window.taskCheckbox = KoreWidgetSDK.prototype.taskCheckboxForWindow;
window.popupAction = KoreWidgetSDK.prototype.popupActionForWindow;
window.toggelMeetingActionBtn = KoreWidgetSDK.prototype.toggelMeetingActionBtnForWindow;
window.hexToRGBMeeting = KoreWidgetSDK.prototype.hexToRGBMeetingForWindow;
window.isURL = KoreWidgetSDK.prototype.isURLForWindow;



//     return KoreWidgetSDK;
//   }(koreJquery, korejstz,KRPerfectScrollbar);
// });
export default KoreWidgetSDK