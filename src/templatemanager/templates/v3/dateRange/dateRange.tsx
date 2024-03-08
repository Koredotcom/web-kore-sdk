import BaseChatTemplate from '../baseChatTemplate';
import './dateRange.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import Datepicker from '../../../../libs/air-date-picker/src/datepicker';
import { getHTML } from '../../../base/domManager';
import IconsManager from '../../../base/iconsManager';

export function DateRangeExt(props: any) {
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
        hostInstance.sendMessage(selectedDate.from + ' to ' + selectedDate.to, { renderMsg: selectedDate.from + ' to ' + selectedDate.to });
        closeMenu();
    }
    const [selectedDate, setSelectedDate] = useState({ from: new Date().toDateString(), to: 'Select' });

    const dateFormats: any = {
        'DD-MM-YYYY': 'dd-MM-yyyy',
        'MM-DD-YYYY': 'MM-dd-yyyy',
        'YYYY-MM-DD': 'yyyy-MM-dd',
        'YYYY-DD-MM': 'yyyy-dd-MM'
    }

    const getConvertedDate = (date: any, format: any) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
        return formattedDate;
    }

    useEffect(() => {
        const currentDatePrev = new Date();
        const currentDateNext = new Date();
        currentDatePrev.setFullYear(currentDatePrev.getFullYear() - 7);
        currentDateNext.setFullYear(currentDateNext.getFullYear() + 7);
        const dp = new Datepicker(`#cal-${msgData.messageId}`, {
            dateFormat: msgData?.message?.[0]?.component?.payload?.format ? dateFormats[msgData?.message?.[0]?.component?.payload?.format] : 'dd-MM-yyyy',
            range: true,
            minDate: msgData.message?.[0]?.component?.payload?.startDate ? msgData.message?.[0]?.component?.payload?.startDate : getConvertedDate(currentDatePrev, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),
            maxDate: msgData.message?.[0]?.component?.payload?.endDate ? msgData.message?.[0]?.component?.payload?.endDate : getConvertedDate(currentDateNext, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),        
            disableNavWhenOutOfRange: false,
            onSelect: (d: any) => {
                setSelectedDate({ from: d.formattedDate[0], to: d.formattedDate[1]});
            }
        });
        dp.show();
    }, []);
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{msgData?.message?.[0]?.component?.payload?.title}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="date-picker-wrapper-template">
                    <h1>{selectedDate.from} - {selectedDate.to}</h1>
                    <div className="date-picker-calendar" id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary lg" onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export function DateRange(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }

    const dateFormats: any = {
        'DD-MM-YYYY': 'dd-MM-yyyy',
        'MM-DD-YYYY': 'MM-dd-yyyy',
        'YYYY-MM-DD': 'yyyy-MM-dd',
        'YYYY-DD-MM': 'yyyy-dd-MM'
    }

    const getConvertedDate = (date: any, format: any) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
        return formattedDate;
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'daterange' && !msgData?.fromHistory) {
        msgData.message[0].cInfo.body = msgData?.message?.[0]?.component?.payload?.text_message;
        if (msgData?.message?.[0]?.component?.payload?.view_type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(DateRangeExt, msgData, hostInstance));
            return (
                <Message {...msgObj} />
            )
        } else {
            const handleSubmit = () => {
                hostInstance.sendMessage(selectedDate.from + ' to ' + selectedDate.to, { renderMsg: selectedDate.from + ' to ' + selectedDate.to });
            }
            const [selectedDate, setSelectedDate] = useState({ from: new Date().toDateString(), to: 'Select' });

            useEffect(() => {
                const currentDatePrev = new Date();
                const currentDateNext = new Date();
                currentDatePrev.setFullYear(currentDatePrev.getFullYear() - 7);
                currentDateNext.setFullYear(currentDateNext.getFullYear() + 7);
                const dp = new Datepicker(`#cal-${msgData.messageId}`, {
                    dateFormat: msgData?.message?.[0]?.component?.payload?.format ? dateFormats[msgData?.message?.[0]?.component?.payload?.format] : 'dd-MM-yyyy',
                    range: true,
                    minDate: msgData.message?.[0]?.component?.payload?.startDate ? msgData.message?.[0]?.component?.payload?.startDate : getConvertedDate(currentDatePrev, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),
                    maxDate: msgData.message?.[0]?.component?.payload?.endDate ? msgData.message?.[0]?.component?.payload?.endDate : getConvertedDate(currentDateNext, msgData?.message?.[0]?.component?.payload?.format ? msgData?.message?.[0]?.component?.payload?.format : 'DD-MM-YYYY'),        
                    disableNavWhenOutOfRange: false,
                    onSelect: (d: any) => {
                        setSelectedDate({ from: d.formattedDate[0], to: d.formattedDate[1]});
                    }
                });
                dp.show();
            }, []);
            return (
                <div className="date-picker-wrapper-template">
                    <Message {...msgObj} />
                    <h1>{selectedDate.from} - {selectedDate.to}</h1>
                    <div  className="date-picker-calendar"id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary lg" onClick={handleSubmit}>Confirm</button>
                </div>
            )
        }
    }
}

class TemplateDatePicker extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(DateRange, msgData, this.hostInstance);
    }
}

export default TemplateDatePicker;

