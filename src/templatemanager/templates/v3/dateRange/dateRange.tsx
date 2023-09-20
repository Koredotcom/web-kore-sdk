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
        hostInstance.sendMessage(selectedDate.from + ' - ' + selectedDate.to, { renderMsg: selectedDate.from + ' - ' + selectedDate.to });
        closeMenu();
    }
    const [selectedDate, setSelectedDate] = useState({ from: new Date().toDateString(), to: '-' });

    useEffect(() => {
        const dp = new Datepicker(`#cal-${msgData.messageId}`, {
            dateFormat: msgData?.message?.[0]?.component?.payload?.format,
            range: true,
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
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="date-picker">
                    <p>{selectedDate.from} - {selectedDate.to}</p>
                    <div id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary" onClick={handleSubmit}>Confirm</button>
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

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'daterange' && !msgData?.fromHistory) {
        if (msgData?.message?.[0]?.component?.payload?.view_type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(DateRangeExt, msgData, hostInstance));
            return (
                <Message {...msgObj} />
            )
        } else {
            const handleSubmit = () => {
                hostInstance.sendMessage(selectedDate.from + ' - ' + selectedDate.to, { renderMsg: selectedDate.from + ' - ' + selectedDate.to });
            }
            const [selectedDate, setSelectedDate] = useState({ from: new Date().toDateString(), to: '-' });

            useEffect(() => {
                const dp = new Datepicker(`#cal-${msgData.messageId}`, {
                    dateFormat: msgData?.message?.[0]?.component?.payload?.format,
                    range: true,
                    onSelect: (d: any) => {
                        setSelectedDate({ from: d.formattedDate[0], to: d.formattedDate[1]});
                    }
                });
                dp.show();
            }, []);
            return (
                <div className="date-picker">
                    <Message {...msgObj} />
                    <p>{selectedDate.from} - {selectedDate.to}</p>
                    <div id={'cal-' + msgData.messageId}></div>
                    <button className="kr-button-primary" onClick={handleSubmit}>Confirm</button>
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

