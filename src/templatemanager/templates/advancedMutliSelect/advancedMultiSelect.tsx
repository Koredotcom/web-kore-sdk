import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiSelect.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function AdvancedMultiSelect(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    let selectedData = '';

    const handleViewMore = (event: any, msgId: any) => {
        event.currentTarget.remove();
        const eles = hostInstance.chatEle.querySelectorAll(`.multi-select-list-${msgId}.hide`);
        eles.forEach((e: any) => {
            e.classList.remove('hide');
        });
    }

    const handleSelectAll = (event: any, index: any, msgId: any) => {
        if (hostInstance.chatEle.querySelector(`.checkbox-selectall-${msgId}-${index}`).checked) {
            const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}-${index}`);
            eles.forEach((ele: any) => {
                ele.checked = true;
                selectedData = selectedData + ' ' + ele.value;
            });
        } else {
            const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}-${index}`);
            eles.forEach((ele: any) => {
                ele.checked = false;
            });
            selectedData = '';
        }

        const elesAll = hostInstance.chatEle.querySelectorAll(`.checkbox-selectall-${msgId}`);
        elesAll.forEach((ele: any, ind: any) => {
            if (ind !== index) {
                ele.checked = false;
            }
        });

        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}`);

        eles.forEach((ele: any) => {
            if (!ele.classList.contains(`checkbox-input-${msgId}-${index}`) && !ele.classList.contains(`checkbox-selectall-${msgId}-${index}`)) {
                ele.checked = false;
            }
        });

        if (hostInstance.chatEle.querySelector(`.checkbox-input-${msgId}-${index}`).checked) {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).classList.add('show');
        } else {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).classList.remove('show');
        }
    }

    const handleSelect = (event: any, index: any, ind: any, msgId: any) => {
        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}-${index}`);
        let isSelectAll = true;
        eles.forEach((ele: any) => {
            if (!ele.checked) {
                isSelectAll = false;
            } else {
                selectedData = selectedData + ' ' + ele.value;
            }
        });
        if (eles.length > 1) {
            if (isSelectAll) {
                hostInstance.chatEle.querySelector(`.checkbox-selectall-${msgId}-${index}`).checked = true;
            } else {
                hostInstance.chatEle.querySelector(`.checkbox-selectall-${msgId}-${index}`).checked = false;
            }
        }

        const ele = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}`);

        ele.forEach((ele: any) => {
            if (!ele.classList.contains(`checkbox-input-${msgId}-${index}`) && !ele.classList.contains(`checkbox-selectall-${msgId}-${index}`)) {
                ele.checked = false;
            }
        });

        const elesAll = hostInstance.chatEle.querySelectorAll(`.checkbox-selectall-${msgId}`);
        elesAll.forEach((ele: any) => {
            if (!ele.classList.contains(`.checkbox-selectall-${msgId}`) && !ele.classList.contains(`checkbox-selectall-${msgId}-${index}`)) {
                ele.checked = false;
            }
        });

        if (hostInstance.chatEle.querySelector(`.checkbox-input-${msgId}-${index}-${ind}`).checked) {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).classList.add('show');
        } else {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).classList.remove('show');
        }
    }

    const onSubmit = (msgId: any) => {
        hostInstance.sendMessage('Here are selected items: ' + selectedData, { renderMsg: 'Here are selected items: ' + selectedData});
        hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).remove();
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advanced_multi_select') {
        return (
            <div className="multi-select-action-template-wrapper">
                <h1>{msgData?.message[0].component.payload.heading}</h1>
                <div className="multi-select-list">
                    {msgData.message[0].component.payload.elements.map((ele: any, index: any) => (
                        <div className={`multi-select-list-item multi-select-list-${msgData.messageId} ${index >= msgData.message[0].component.payload.limit ? `hide` : ``}`}>
                            <h1>{ele.collectionTitle}</h1>
                            {ele.collection.length > 1 && <div className="checkbox-item select-all" onClick={event => handleSelectAll(event, index, msgData.messageId)}>
                                <input id={`checkbox-selectall-${msgData.messageId}-${index}`} className={`checkbox-input checkbox-selectall checkbox-selectall-${msgData.messageId} checkbox-selectall-${msgData.messageId}-${index}`} type="checkbox" value="" />
                                <label for={`checkbox-selectall-${msgData.messageId}-${index}`} className="checkbox-label">
                                    <div className="title">Select All</div>
                                </label>
                            </div>}
                            <div className="list-content-details if-checkbox-select-all">
                                {ele.collection.map((e: any, ind: any) => (
                                    <div className="list-data-temp">
                                        <div className="img-with-content-block" onClick={event => handleSelect(event, index, ind, msgData.messageId)}>
                                            <div className="checkbox-item">
                                                <input id={`checkbox-${msgData.messageId}-${index}-${ind}`} className={`checkbox-input checkbox-input-${msgData.messageId} checkbox-input-${msgData.messageId}-${index} checkbox-input-${msgData.messageId}-${index}-${ind}`} type="checkbox" value={e.value} />
                                                <label for={`checkbox-${msgData.messageId}-${index}-${ind}`} className="checkbox-label"></label>
                                            </div>
                                            {e.image_url && <div className="img-block medium-img">
                                                <figure>
                                                    <img src={e.image_url} />
                                                </figure>
                                            </div>}
                                            <div className="content-details">
                                                <h1>{e.title}</h1>
                                                <p>{e.description}</p>
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                        </div>))}
                    <div className="multi-select-list-item" onClick={(event) => handleViewMore(event, msgData.messageId)}>
                        <button className="show-more-btn">View More</button>
                    </div>
                </div>
                <div className={`multi-select-done multi-select-done-${msgData.messageId}`}>
                    <button className="kr-button-primary lg" onClick={() => onSubmit(msgData.messageId)}>{msgData.message[0].component.payload.buttons[0].title}</button>
                </div>
            </div>
        );
    }
}

class TemplateAdvancedMultiSelect extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedMultiSelect, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedMultiSelect;

