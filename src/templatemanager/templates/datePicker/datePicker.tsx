import BaseChatTemplate from '../baseChatTemplate';
import './datePicker.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import Datepicker from '../../../libs/air-date-picker/src/datepicker';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function DatePickerExt(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

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

    const dateFormats: any = {
        'DD-MM-YYYY': 'dd-MM-yyyy',
        'MM-DD-YYYY': 'MM-dd-yyyy',
        'YYYY-MM-DD': 'yyyy-MM-dd',
        'YYYY-DD-MM': 'yyyy-dd-MM'
    }

    const getConvertedDate = (date: any, format: any) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date;
        }
        const map: any = {
            'DD-MM-YYYY': [0, 1, 2],
            'MM-DD-YYYY': [1, 0, 2],
            'YYYY-MM-DD': [2, 1, 0],
            'YYYY-DD-MM': [2, 0, 1]
        };
    
        const idx = map[format];
        const parts = date.split('-');
        const [d, m, y] = idx.map((i: number) => Number(parts[i]));
        return new Date(y, m - 1, d);
    }

    useEffect(() => {
        const currentDatePrev = new Date();
        const currentDateNext = new Date();
        currentDatePrev.setFullYear(currentDatePrev.getFullYear() - 7);
        currentDateNext.setFullYear(currentDateNext.getFullYear() + 7);
        const dp = new Datepicker(`#cal-${msgData.messageId}`, {
            dateFormat: msgData?.message?.[0]?.component?.payload?.format ? dateFormats[msgData?.message?.[0]?.component?.payload?.format] : 'dd-MM-yyyy',
            minDate: msgData.message?.[0]?.component?.payload?.startDate ? getConvertedDate(msgData.message?.[0]?.component?.payload?.startDate, msgData?.message?.[0]?.component?.payload?.format) : getConvertedDate(currentDatePrev, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),
            maxDate: msgData.message?.[0]?.component?.payload?.endDate ? getConvertedDate(msgData.message?.[0]?.component?.payload?.endDate, msgData?.message?.[0]?.component?.payload?.format) : getConvertedDate(currentDateNext, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),        
            disableNavWhenOutOfRange: false,
            onSelect: (d: any) => {
                setSelectedDate(d.formattedDate);
            }
        });
        dp.show();
    }, []);
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                {msgData?.message?.[0]?.component?.payload?.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload?.title, "bot") }}></h1>}
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
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

export function DatePickerInline(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }

    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

    const dateFormats: any = {
        'DD-MM-YYYY': 'dd-MM-yyyy',
        'MM-DD-YYYY': 'MM-dd-yyyy',
        'YYYY-MM-DD': 'yyyy-MM-dd',
        'YYYY-DD-MM': 'yyyy-dd-MM'
    }

    const getConvertedDate = (date: any, format: any) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date;
        }
        const map: any = {
            'DD-MM-YYYY': [0, 1, 2],
            'MM-DD-YYYY': [1, 0, 2],
            'YYYY-MM-DD': [2, 1, 0],
            'YYYY-DD-MM': [2, 0, 1]
        };
    
        const idx = map[format];
        const parts = date.split('-');
        const [d, m, y] = idx.map((i: number) => Number(parts[i]));
        return new Date(y, m - 1, d);
    }

    const handleSubmit = () => {
        hostInstance.sendMessage(selectedDate, { renderMsg: selectedDate });
    }

    useEffect(() => {
        const currentDatePrev = new Date();
        const currentDateNext = new Date();
        currentDatePrev.setFullYear(currentDatePrev.getFullYear() - 7);
        currentDateNext.setFullYear(currentDateNext.getFullYear() + 7);
        const dp = new Datepicker(`#cal-${msgData.messageId}`, {
            dateFormat: msgData?.message?.[0]?.component?.payload?.format ? dateFormats[msgData?.message?.[0]?.component?.payload?.format] : 'dd-MM-yyyy',
            minDate: msgData.message?.[0]?.component?.payload?.startDate ? getConvertedDate(msgData.message?.[0]?.component?.payload?.startDate, msgData?.message?.[0]?.component?.payload?.format) : getConvertedDate(currentDatePrev, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),
            maxDate: msgData.message?.[0]?.component?.payload?.endDate ? getConvertedDate(msgData.message?.[0]?.component?.payload?.endDate, msgData?.message?.[0]?.component?.payload?.format) : getConvertedDate(currentDateNext, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),        
            disableNavWhenOutOfRange: false,
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

export function DatePicker(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dateTemplate' && !msgData?.fromHistory) {
        msgData.message[0].cInfo.body = msgData?.message?.[0]?.component?.payload?.text_message;
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData?.message?.[0]?.component?.payload?.view_type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(DatePickerExt, msgData, hostInstance));
            return (
                <Message {...msgObj} />
            )
        } else {
            return <DatePickerInline hostInstance={hostInstance} msgData={msgData} />
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

