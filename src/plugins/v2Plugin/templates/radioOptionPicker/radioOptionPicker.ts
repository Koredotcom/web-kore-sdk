import './radioOptionPicker.scss';
class RadioOptionPickerTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "radioOptionTemplate" && !msgData.fromHistory) {
            me.messageHtml = $(me.getTemplateString());
            me.initiateRadioOptionPicker(msgData);
            me.bindEvents();
        }
    }
    bindEvents() {
        let me: any = this;
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        let target: any;
        $(me.messageHtml).find(".btnAccount").click(function (event: any) {
            target = $(event.currentTarget);
            target.find(".checkmark").addClass("selected");
        });
        $(me.messageHtml).find(".confirmBTN").click(function () {
            var radioOptionPostbackMsg = target.find('.radioOptionName').attr('data-value');
            var radioOptionTitle = target.find('.radioOptionName').attr('data-title');
            //chatWindowInstance.assignValueToInput(radioOptionPostbackMsg);
            chatWindowInstance.sendMessage(radioOptionPostbackMsg,{renderMsg:radioOptionTitle});
            $(me.messageHtml).find(".confirmBTN").css({ "display": "block" });
            chatWindowInstance.bottomSliderAction('hide');
        });
        $(me.messageHtml).find(".closePicker").click(function () {
            $(me.messageHtml).find(".confirmBTN").css({
                "display": "none"
            });
            chatWindowInstance.bottomSliderAction('hide');
        });
    }
    initiateRadioOptionPicker(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        // let accountData: any = me.getRadioOptions();
        let accountData: any = msgData.message[0].component.payload.radioOptions;
        chatWindowInstance.bottomSliderAction('show', me.messageHtml);
        $(me.messageHtml).append(me.getradioOptionsPickerTemplate(accountData))
        $(me.messageHtml).removeClass("hide");
        if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.heading) {
            $(me.messageHtml).find('.radioOptionHeading').text(msgData.message[0].component.payload.heading);
        }
    }
    getTemplateString() {
        return '<div class="radioOptionsPickerContainer hide">\
                    <div class="radioOptionMenuHeader">\
                         <button class="closePicker" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                        <label class="radioOptionHeading">Select an Account</label>\
                    </div>\
                    <div class="confirmBTN">Confirm</div>\
                </div>'

    }

    getRadioOptions = function () {
        let accountData: any = {
            "radioOptions": [
                {
                    "title": "Shanmuga",
                    "value": "1234 4567 5678 6789",
                    "postback": {
                        "title": "Transaction Successful",
                        "value": "Payment Successful"
                    }
                },
                {
                    "title": "Madhu",
                    "value": "1234 4567 5678 9876",
                    "postback": {
                        "title": "radioOptionDetails",
                        "value": "AccountData"
                    }
                },
                {
                    "title": "Santhosh",
                    "value": "4678 1234 5678 9876",
                    "postback": {
                        "title": "Get my leave balance",
                        "value": "leaveintent"
                    }
                },
                {
                    "title": "Manjula",
                    "value": "9876 1234 4567 5678",
                    "postback": {
                        "title": "Transaction Successful",
                        "value": "leaveintent"
                    }
                },
                {
                    "title": "Ravi Kiran",
                    "value": "8976 5677 7946 2345",
                    "postback": {
                        "title": "radioOptionDetails",
                        "value": "leaveintent"
                    }
                },
            ]
        }
        return accountData;
    }
    getradioOptionsPickerTemplate(radioOptionConfig: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        var $radioOptionsContent = $('<div class="radioOptionMenuPicker"></div>');
        radioOptionConfig.forEach(function (radioOption: any) {
            var radioOptionHtml = $('<label class="radioButton"><div class="btnAccount">\
                                        <div class="radioValue">\
                                            <input type="radio" id="selectedValue" name="radio">\
                                                 <span class="checkmark"></span>\
                                            </div>\
                                            <span class="radioOptionDetails">\
                                                <span class="radioOptionName" title="'+ radioOption.title + '" data-value="' + radioOption.postback.value + '" data-title="' + radioOption.postback.title + '">' + radioOption.title + '</span>\
                                                <div class="radioOptionValue" title="'+ radioOption.value + '">' + radioOption.value + '</div>\
                                            </span>\
                                        </div> \
                                    </label>');
            $radioOptionsContent.append(radioOptionHtml)
        });
        return $radioOptionsContent;
    }
}

export default RadioOptionPickerTemplate;
