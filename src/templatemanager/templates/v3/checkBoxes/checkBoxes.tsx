import BaseChatTemplate from '../baseChatTemplate';
import './checkBoxes.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function CheckBoxes(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const onSelectAll = () => {
        const selectedAll = hostInstance.chatEle.querySelector(`.checkbox-selectall-${msgData.messageId}`);
        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}`);
        if (selectedAll && selectedAll.checked) {
            eles.forEach((ele: any) => {
                ele.checked = true;
            });
        } else {
            eles.forEach((ele: any) => {
                ele.checked = false;
            });
        }
    }

    const onItemSelect = () => {
        const selectedAll = hostInstance.chatEle.querySelector(`.checkbox-selectall-${msgData.messageId}`);
        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}`);
        let allChecked = true;
        eles.forEach((ele: any) => {
            if (!ele.checked) allChecked = false;
        });
        if (allChecked) selectedAll.checked = true
        else selectedAll.checked = false
    }

    const onSubmit = () => {
        let selectedValues: any= [];
        const selectedItems = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}:checked`);
        selectedItems.forEach((ele: any) => {
            selectedValues.push(ele.value);
        });
        hostInstance.sendMessage(selectedValues.toString(), {renderMsg: ''});
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'multi_select') {
        return (
            <div className="checkbox-wrapper">
                {msgData.message[0].component.payload.heading && <h1>{msgData.message[0].component.payload.heading}</h1>}
                <div className="checkbox-item select-all" onClick={() => onSelectAll()}>
                    <input id={`checkbox-selectall-${msgData.messageId}`} className={`checkbox-input checkbox-selectall-${msgData.messageId}`} type="checkbox" value="" />
                    <label for={`checkbox-selectall-${msgData.messageId}`} className="checkbox-label">
                        <div className="title">Select All</div>
                    </label>
                </div>
                <div className="checkbox-container">
                    { msgData?.message?.[0]?.component?.payload?.elements.map((ele: any, ind: any) => (
                        <div className="checkbox-item" onClick={() => onItemSelect()}>
                            <input id={`checkbox-${msgData.messageId}-${ind}`} className={`checkbox-input checkbox-input-${msgData.messageId}`} type="checkbox" value={ele.value} />
                            <label for={`checkbox-${msgData.messageId}-${ind}`} className="checkbox-label">
                                <div className="title">{ele.title}</div>
                                {/* <div className="desc-text-checkbox">Checkbox item</div> */}
                            </label>
                        </div>
                    ))}
                </div>
                <button className="kr-button-primary lg" onClick={onSubmit}>{msgData?.message?.[0]?.component?.payload?.buttons[0].title}</button>
            </div>
        );
    }
}

class TemplateCheckBoxes extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(CheckBoxes, msgData, this.hostInstance);
    }
}

export default TemplateCheckBoxes;

