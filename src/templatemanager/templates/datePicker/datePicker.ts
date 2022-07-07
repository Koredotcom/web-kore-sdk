import installDateRangeFunctions from '../../../libs/jquery-daterangepicker/jquery.daterangepicker';
import '../../../libs/jquery-daterangepicker/daterangepicker.css';
import moment from 'moment';
import './datePicker.scss';
class DatePickerTemplate {
    defaultDatePickerConfig: any = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        singleDate: true,
        showTopbar: false,
        format: 'DD-MM-YYYY',
        startDate: moment(new Date()).format("DD-MM-YYYY"),
        endDate: (moment(new Date()).add(3, 'M')).format("DD-MM-YYYY"),
        inline: true,
        container: '',
        appendTo: 'slider' // slider|| messageBubble
    };
    daterangeInput: any;
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "dateTemplate") {
            me.messageHtml = $(me.getTemplateString('datePickerTemplate'));
            me.initiateDatePicker(msgData);
            me.addClickEventCalender(msgData)
            me.bindEvents();
            if (this.defaultDatePickerConfig.appendTo === 'messageBubble') {
                return me.messageHtml;
            }
        }
    }
    bindEvents() {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        let startdateValue: any;
        $(me.messageHtml).off('click', ".confirmBTN").on('click', '.confirmBTN', function () {
            var startViewDate = moment(startdateValue).format('MM-DD-YYYY') || moment();
            var _innerText = startViewDate;
            //chatWindowInstance.assignValueToInput(_innerText);
            chatWindowInstance.sendMessage(_innerText);
            chatWindowInstance.bottomSliderAction('hide');
            me.daterangeInput.data('dateRangePicker').clear();
            me.daterangeInput.data('dateRangePicker').resetMonthsView();
            if (me.defaultDatePickerConfig.appendTo === 'messageBubble') {
                $(me.messageHtml).find(".confirmBTN").css({ "display": "none" });
                $(me.messageHtml).find(".date-picker-wrapper").css({ 'pointer-events': 'none' });
            }
        });
        $(me.messageHtml).off('click', '.headerCalendar .close-button').on('click', '.headerCalendar .close-button', function () {
            chatWindowInstance.bottomSliderAction("hide");
        });
        me.daterangeInput.bind('datepicker-first-date-selected', function (event: any, obj: any) {
            var startYear = null;
            startdateValue = obj.date1;
            startYear = moment(startdateValue).format("YYYY");
            var startDate = moment(startdateValue).format("ddd,MMM DD");
            $(me.messageHtml).find('.showStartdate .showStartYear').html(startYear);
            $(me.messageHtml).find(".showStartdate .showStartMonth").html(startDate);
        });

    }
    initiateDatePicker(msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        installDateRangeFunctions($, moment);
        if (this.defaultDatePickerConfig.appendTo !== 'messageBubble') {
            chatWindowInstance.bottomSliderAction('show', me.messageHtml);
        }
        let datePickerConfig: any = {
            alwaysOpen: true,
            singleMonth: true,
            showShortcuts: false,
            singleDate: true,
            showTopbar: false,
            // format: 'DD-MM-YYYY',
            // startDate: msgData.message[0].component.payload.startDate,
            // endDate: msgData.message[0].component.payload.endDate,
            // showdueDate: msgData.message[0].component.payload.showdueDate,
            inline: true,
            container: $(me.messageHtml),
        };
        if (msgData.message[0].component.payload.startDate) {
            datePickerConfig.startDate = msgData.message[0].component.payload.startDate;
        }
        if (msgData.message[0].component.payload.endDate) {
            datePickerConfig.endDate = msgData.message[0].component.payload.endDate;
        }
        if (msgData.message[0].component.payload.showdueDate) {
            datePickerConfig.showdueDate = msgData.message[0].component.payload.showdueDate;
        }
        if (msgData.message[0].component.payload.format) {
            datePickerConfig.format = msgData.message[0].component.payload.format;
        }
        $.extend(this.defaultDatePickerConfig, datePickerConfig)
        me.daterangeInput = $(me.messageHtml).find('#calender').dateRangePicker(this.defaultDatePickerConfig);
    }
    getTemplateString() {
        return '<div class="datePickerContainer">\
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
                    <div id="calender"></div>\
                </div>';

    }

    addClickEventCalender(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        $(me.messageHtml).find(".showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
        $(me.messageHtml).find('.showStartdate .showStartYear').html(new Date().getFullYear());
        $(me.messageHtml).find(".datePickerContainer").removeClass("hide");
        $(me.messageHtml).find(".date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
        $(me.messageHtml).find(".month-wrapper").css({ "border": "0px" });
        $(me.messageHtml).find(".headerCalendar .choose").html(msgData.message[0].component.payload.title);
        $(me.messageHtml).find(".confirmBTN").css({
            "display": "none"
        });
        if (me.defaultDatePickerConfig && me.defaultDatePickerConfig.appendTo !== 'slider') {
            $(me.messageHtml).find(".headerCalendar .close-button").addClass('hide');
        }
        setTimeout(function () {
            $(me.messageHtml).find(".confirmBTN").css({
                "display": "block"
            });
        }, 300);
    }

}

export default DatePickerTemplate;
