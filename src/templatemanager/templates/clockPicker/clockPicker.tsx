import BaseChatTemplate from '../baseChatTemplate';
import './clockPicker.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import Datepicker from '../../../libs/air-date-picker/src/datepicker';

export function ClockPicker(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleSubmit = () => {
        hostInstance.sendMessage(selectedDate, { renderMsg: selectedDate});
    }
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'clockTemplate' && !msgData.formHistory) {
        useEffect(() => {
            const dp = new Datepicker(`#${msgData.messageId}`, {
                timepicker: true,
                timeFormat: 'hh:mm AA',
                onlyTimepicker: true,
                onSelect: (d: any) => {
                    setSelectedDate(d.formattedDate);
                }
            });
            dp.show();
        }, []);
        return (
          <div className="date-picker-wrapper-template">
            <div className="date-picker-calendar" id={msgData.messageId}></div>
            <button className="kr-button-primary lg" onClick={handleSubmit}>Confirm</button>
          </div>
        );
    }
}

class TemplateClockPicker extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ClockPicker, msgData, this.hostInstance);
    }
}

export default TemplateClockPicker;

