import installDateRangeFunctions from '../../../../../UI/libs/jquery.daterangepicker';
import '../../../../../UI/libs/daterangepicker.css';
import moment from 'moment';
import './dateRangePicker.scss';
class DateRangePickerTemplate {
    defaultDateRangePickerConfig: any = {
        alwaysOpen: true,
        singleMonth: true,
        showShortcuts: false,
        showTopbar: false,
        selectForward: true,
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
        let $ = me.cwInstance.$;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "daterange") {
            me.messageHtml = $(me.getTemplateString('datePickerTemplate'));
            me.initiateDatePicker(msgData);
            me.bindDataToTemplate(msgData)
            me.bindEvents();
            if (this.defaultDateRangePickerConfig.appendTo === 'messageBubble') {
                return me.messageHtml;
            }
        }
    }
    bindEvents() {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        let startdateValue: any;
        let enddateValue: any;
        let showEndDateValue: any;
        let showStartDateValue: any;
        $(me.messageHtml).off('click', ".confirmBTN").on('click', '.confirmBTN', function () {
            if ((showStartDateValue !== null) && (showEndDateValue == null)) {
                $(me.messageHtml).find(".showEnddate .showEndMonth").html("Select");
            } else if (showEndDateValue !== null) {
                var startViewDate = moment(startdateValue).format('MM-DD-YYYY') || moment();
                var endViewDate = moment(enddateValue).format('MM-DD-YYYY') || moment();
                var _innerText = startViewDate + ' to ' + endViewDate;
                chatWindowInstance.assignValueToInput(_innerText);
                chatWindowInstance.sendMessage(_innerText);
                chatWindowInstance.bottomSliderAction('hide');
                me.daterangeInput.data('dateRangePicker').clear();
                me.daterangeInput.data('dateRangePicker').resetMonthsView();
                if (me.defaultDateRangePickerConfig.appendTo === 'messageBubble') {
                    $(me.messageHtml).find(".confirmBTN").css({ "display": "none" });
                    $(me.messageHtml).find(".date-picker-wrapper").css({ 'pointer-events': 'none' });
                }
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
            showStartDateValue = $(me.messageHtml).find(".showStartdate .showStartMonth").html(startDate);

            $(me.messageHtml).find(".showEnddate .showEndMonth").html("Select");
            $(me.messageHtml).find('.showEnddate .showEndYear').css({ "opacity": "0" });
        });
        me.daterangeInput.bind('datepicker-change', function (event: any, obj: any) {
            let endYear: any;
            $(me.messageHtml).find('.showEnddate .showEndYear').css({ "opacity": "1" });
            enddateValue = obj.date2;
            endYear = moment(enddateValue).format("YYYY");
            $(me.messageHtml).find('.showEnddate .showEndYear').html(endYear);
            var endDate = moment(enddateValue).format("ddd,MMM DD");
            showEndDateValue = $(me.messageHtml).find(".showEnddate .showEndMonth").html(endDate);
        })
    }
    initiateDatePicker(msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        installDateRangeFunctions($, moment);
        if (this.defaultDateRangePickerConfig.appendTo !== 'messageBubble') {
            chatWindowInstance.bottomSliderAction('show', me.messageHtml);
        }
        var datePickerConfig = {
            alwaysOpen: true,
            singleMonth: true,
            showShortcuts: false,
            showTopbar: false,
            format: 'DD-MM-YYYY',
            startDate: msgData.message[0].component.payload.startDate,
            endDate: msgData.message[0].component.payload.endDate,
            showdueDate: msgData.message[0].component.payload.showdueDate,
            inline: true,
            container: $(me.messageHtml),
        };
        $.extend(this.defaultDateRangePickerConfig, datePickerConfig)
        me.daterangeInput = $(me.messageHtml).find('#rangeCalenderBtn').dateRangePicker(this.defaultDateRangePickerConfig);
    }
    getTemplateString() {
        return '<div class="dateRangePickerContainer">\
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
                    <div id="rangeCalenderBtn"></div>\
                </div>';

    }

    bindDataToTemplate(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        $(me.messageHtml).find(".showStartdate .showStartMonth").html(moment().format('ddd,MMM DD'));
        $(me.messageHtml).find('.showStartdate .showStartYear').html(new Date().getFullYear());
        $(me.messageHtml).find('.showEnddate .showEndYear').html(new Date().getFullYear());
        $(me.messageHtml).find(".showEnddate .showEndMonth").html("Select");
        $(me.messageHtml).find('.showEnddate .showEndYear').css({ "opacity": "0" });
        $(me.messageHtml).find(".datePickerContainer").removeClass("hide");
        $(me.messageHtml).find(".date-picker-wrapper").css({ "border": "0px", "background-color": "white" });
        $(me.messageHtml).find(".month-wrapper").css({ "border": "0px" });
        $(me.messageHtml).find(".headerCalendar .choose").html(msgData.message[0].component.payload.title);
        $(me.messageHtml).find(".date-picker-wrapper .month-wrapper .real-today").addClass("first-date-selected");
        $(me.messageHtml).find(".date-picker-wrapper .month-wrapper .real-today.first-date-selected").trigger("click");
        if (me.defaultDateRangePickerConfig && me.defaultDateRangePickerConfig.appendTo !== 'slider') {
            $(me.messageHtml).find(".headerCalendar .close-button").addClass('hide');
        }
        setTimeout(function () {
            $(me.messageHtml).find(".confirmBTN").css({
                "display": "block"
            });
        }, 300);
    }

}

export default DateRangePickerTemplate;
