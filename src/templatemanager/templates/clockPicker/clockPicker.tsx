import BaseChatTemplate from '../baseChatTemplate';
import './clockPicker.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Datepicker from '../../../libs/air-date-picker/src/datepicker';
import KoreHelpers from '../../../utils/helpers';

export function ClockPicker(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const getCurrentTime = () => {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${formattedMinutes} ${ampm}`;
    }    

    const [selectedDate, setSelectedDate] = useState(getCurrentTime());

    const handleSubmit = () => {
        if (selectedDate) {
            hostInstance.sendMessage(selectedDate, { renderMsg: selectedDate});
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'clockTemplate' && !msgData.formHistory) {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        useEffect(() => {
            const dp = new Datepicker(`#clock${msgData.messageId}`, {
                timepicker: true,
                timeFormat: 'hh:mm AA',
                onlyTimepicker: true,
                onSelect: (d: any) => {
                    setSelectedDate(d.formattedDate);
                }
            });
            dp.show();
            setTimeout(() => {
                hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
                    top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }, []);
        return (
          <div className="date-picker-wrapper-template" data-cw-msg-id={msgData?.messageId}>
            <div className="date-picker-calendar" id={`clock${msgData.messageId}`}></div>
            <button className="kr-button-primary lg" onClick={handleSubmit} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message[0]?.component?.payload?.confirmButtonText || "Confirm", "bot") }}></button>
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

