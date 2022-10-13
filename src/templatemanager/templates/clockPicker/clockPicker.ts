
import './clockPicker.scss';
import installClockPicker from '../../../libs/jquery-clockpicker/jquery-clockpicker';
//import '../../../../../UI/libs/jquery-clockpicker.css';
import '../../../libs/jquery-clockpicker/jquery-clockpicker.css';
class ClockPickerTemplate {
    defaultClockerPickerConfig: any = {
        title: "",
        appendTo: 'slider'
    };
    clockPickerInputContainer: any;
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "clockTemplate") {
            me.messageHtml = $(me.getTemplateString());
            me.initiateClockPicker();
            me.bindDataToTemplate(msgData)
            me.bindEvents();
            if (this.defaultClockerPickerConfig.appendTo === 'messageBubble') {
                return me.messageHtml;
            }
        }
    }
    bindEvents() {
        let me: any = this;
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.am-button").click(function () {
            $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
            $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "1" });
        })
        $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").click(function () {
            $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.am-button").css({ "opacity": "0.4" });
            $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "1" });
        })
        $(me.messageHtml).find(".confirmBTN").click(function () {
            $(me.messageHtml).find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").trigger("click");
            if (me.defaultClockerPickerConfig.appendTo === 'messageBubble') {
                $(me.messageHtml).find(".confirmBTN").css({ "display": "none" });
                $(me.messageHtml).css({ 'pointer-events': 'none' });
            } else {
                chatWindowInstance.bottomSliderAction('hide');
            }
        });
        $(me.messageHtml).find(".closeButton").click(function () {
            chatWindowInstance.bottomSliderAction('hide');
        });
    }
    initiateClockPicker() {
        let me: any = this;
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        installClockPicker($);
        if (this.defaultClockerPickerConfig.appendTo !== 'messageBubble') {
            chatWindowInstance.bottomSliderAction('show', me.messageHtml);
        }
        var input = $(me.messageHtml).find('#clockPickerInput');
        this.clockPickerInputContainer = input;
        input.clockpicker({
            donetext: "Done",
            placement: 'top',
            vibrate: false,
            twelvehour: true,
            parentEl: $(me.messageHtml),
            afterDone: function (clockPickerObj: any) {
                var hours = clockPickerObj.hours;
                var minutes = clockPickerObj.minutes;
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                var amorpm = clockPickerObj.amOrPm;
                var clockValue = hours + ':' + minutes + ' ' + amorpm;
                //chatWindowInstance.assignValueToInput(clockValue);
                chatWindowInstance.sendMessage(clockValue);
            }
        });

    }
    getTemplateString() {
        return '<div class="clockPickerContainer hide">\
                    <div class="headerClock">\
                        <span class="choose"></span>\
                        <button class="closeButton" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                    </div>\
                    <input class="form-control" id="clockPickerInput" value="">\
                    <div class="confirmBTN">Confirm</div>\
                </div>';
    }

    bindDataToTemplate(msgData: any) {
        var clockInput = this.clockPickerInputContainer;
        let me: any = this;
        let $ = me.hostInstance.$;
        var showAmorPm: any = $(me.messageHtml).find('#clockPickerInput').data('clockpicker');
        showAmorPm.amOrPm = "AM";
        showAmorPm.options.default = "12:00";
        $(me.messageHtml).removeClass("hide");
        clockInput.clockpicker('show').clockpicker('toggleView', 'hours');
        $(me.messageHtml).find("#clockPickerInput").hide();
        if (msgData.message[0].component.payload.title) {
            $(me.messageHtml).find(".headerClock .choose").html(msgData.message[0].component.payload.title);
        } else {
            $(me.messageHtml).find(".headerClock .choose").html("Please Choose");
        }
        $(me.messageHtml).find(".btn.btn-sm.btn-default.btn-block.clockpicker-button").hide();
        setTimeout(function () {
            $(me.messageHtml).find(".clockpicker-popover").css({ "display": "block", "top": "75px ", "left": "80.5px", });
            $(me.messageHtml).find(".clockpicker-popover .clockpicker-plate").css({ "margin-left": "25px" });
            $(me.messageHtml).find(".btn.btn-sm.btn-default.clockpicker-button.pm-button").css({ "opacity": "0.4" });
        }, 0);
        if (me.defaultClockerPickerConfig && me.defaultClockerPickerConfig.appendTo !== 'slider') {
            $(me.messageHtml).find(".headerClock .closeButton").addClass('hide');
        }
    }
}

export default ClockPickerTemplate;
