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

    const handleViewMore = (event: any) => {
        event.currentTarget.remove();
        const eles = hostInstance.chatEle.querySelectorAll('.multi-select-list-item.hide');
        eles.forEach((e: any) => {
            e.classList.remove('hide');
        });
    }

    const handleSelectAll = (event: any, index: any) => {
        if (hostInstance.chatEle.querySelector(`.checkbox-selectall-${index}`).checked) {
            const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${index}`);
            eles.forEach((ele: any) => {
                ele.checked = true;
                selectedData = selectedData + ' ' + ele.value;
            });
        } else {
            const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${index}`);
            eles.forEach((ele: any) => {
                ele.checked = false;
            });
            selectedData = '';
        }

        const elesAll = hostInstance.chatEle.querySelectorAll('.checkbox-selectall');
        elesAll.forEach((ele: any, ind: any) => {
            if (ind !== index) {
                ele.checked = false;
            }
        });

        const eles = hostInstance.chatEle.querySelectorAll('.checkbox-input');

        eles.forEach((ele: any) => {
            if (!ele.classList.contains(`checkbox-input-${index}`) && !ele.classList.contains(`checkbox-selectall-${index}`)) {
                ele.checked = false;
            }
        });

        if (hostInstance.chatEle.querySelector(`.checkbox-input-${index}`).checked) {
            hostInstance.chatEle.querySelector('.multi-select-done').classList.add('show');
        } else {
            hostInstance.chatEle.querySelector('.multi-select-done').classList.remove('show');
        }
    }

    const handleSelect = (event: any, index: any, ind: any) => {
        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${index}`);
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
                hostInstance.chatEle.querySelector(`.checkbox-selectall-${index}`).checked = true;
            } else {
                hostInstance.chatEle.querySelector(`.checkbox-selectall-${index}`).checked = false;
            }
        }

        const ele = hostInstance.chatEle.querySelectorAll('.checkbox-input');

        ele.forEach((ele: any) => {
            if (!ele.classList.contains(`checkbox-input-${index}`) && !ele.classList.contains(`checkbox-selectall-${index}`)) {
                ele.checked = false;
            }
        });

        if (hostInstance.chatEle.querySelector(`.checkbox-input-${index}-${ind}`).checked) {
            hostInstance.chatEle.querySelector('.multi-select-done').classList.add('show');
        } else {
            hostInstance.chatEle.querySelector('.multi-select-done').classList.remove('show');
        }
    }

    const onSubmit = () => {
        hostInstance.sendMessage('Here are selected items: ' + selectedData, { renderMsg: 'Here are selected items: ' + selectedData});
        hostInstance.chatEle.querySelector('.multi-select-done').remove();
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advanced_multi_select') {
        return (
            <div className="multi-select-action-template-wrapper">
                <h1>{msgData?.message[0].component.payload.heading}</h1>
                <div className="multi-select-list">
                    {msgData.message[0].component.payload.elements.map((ele: any, index: any) => (
                        <div className={`multi-select-list-item ${index >= msgData.message[0].component.payload.limit ? `hide` : ``}`}>
                            <h1>{ele.collectionTitle}</h1>
                            {ele.collection.length > 1 && <div className="checkbox-item select-all" onClick={event => handleSelectAll(event, index)}>
                                <input id={`checkbox-selectall-${index}`} className={`checkbox-input checkbox-selectall checkbox-selectall-${index}`} type="checkbox" value="" />
                                <label for={`checkbox-selectall-${index}`} className="checkbox-label">
                                    <div className="title">Select All</div>
                                </label>
                            </div>}
                            <div className="list-content-details if-checkbox-select-all">
                                {ele.collection.map((e: any, ind: any) => (
                                    <div className="list-data-temp">
                                        <div className="img-with-content-block" onClick={event => handleSelect(event, index, ind)}>
                                            <div className="checkbox-item select-all">
                                                <input id={`checkbox-${index}-${ind}`} className={`checkbox-input checkbox-input-${index} checkbox-input-${index}-${ind}`} type="checkbox" value={e.value} />
                                                <label for={`checkbox-${index}-${ind}`} className="checkbox-label"></label>
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
                    <div className="multi-select-list-item" onClick={handleViewMore}>
                        <button className="show-more-btn">View More</button>
                    </div>
                </div>
                <div className="multi-select-done">
                    <button className="kr-button-primary lg" onClick={onSubmit}>{msgData.message[0].component.payload.buttons[0].title}</button>
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

