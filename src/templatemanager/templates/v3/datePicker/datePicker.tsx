import BaseChatTemplate from '../baseChatTemplate';
import './datePicker.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import Datepicker from '../../../../libs/air-date-picker/src/datepicker';
import { getHTML } from '../../../base/domManager';
import IconsManager from '../../../base/iconsManager';

export function DatePickerExt(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    const handleSubmit = () => {
        hostInstance.sendMessage(selectedDate, { renderMsg: selectedDate });
        closeMenu();
    }
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

    useEffect(() => {
        const dp = new Datepicker(`#cal-${msgData.messageId}`, {
            dateFormat: msgData?.message?.[0]?.component?.payload?.format,
            onSelect: (d: any) => {
                setSelectedDate(d.formattedDate);
            }
        });
        dp.show();
    }, []);
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{msgData?.message?.[0]?.component?.payload?.title}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="date-picker-wrapper-template">
                    <h1>{selectedDate}</h1>
                    <div className="date-picker-calendar" id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary lg" onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export function DatePicker(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dateTemplate' && !msgData?.fromHistory) {
        if (msgData?.message?.[0]?.component?.payload?.view_type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(DatePickerExt, msgData, hostInstance));
            return (
                <Message {...msgObj} />
            )
        } else {
            const handleSubmit = () => {
                hostInstance.sendMessage(selectedDate, { renderMsg: selectedDate });
            }
            const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

            useEffect(() => {
                const dp = new Datepicker(`#cal-${msgData.messageId}`, {
                    dateFormat: msgData?.message?.[0]?.component?.payload?.format,
                    onSelect: (d: any) => {
                        setSelectedDate(d.formattedDate);
                    }
                });
                dp.show();
            }, []);
            return (
                <div className="date-picker-wrapper-template">
                    <Message {...msgObj} />
                    <h1>{selectedDate}</h1>
                    <div className="date-picker-calendar" id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary" onClick={handleSubmit}>Confirm</button>
                </div>
            )
        }
    }
}

class TemplateDatePicker extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(DatePicker, msgData, this.hostInstance);
    }
}

export default TemplateDatePicker;

