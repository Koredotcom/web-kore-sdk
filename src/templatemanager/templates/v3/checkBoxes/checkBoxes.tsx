import BaseChatTemplate from '../baseChatTemplate';
import './checkBoxes.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function CheckBoxes(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
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
                <h1>Collections</h1>
                <div className="checkbox-item select-all">
                    <input id="checkbox-selectall" className="checkbox-input" type="checkbox" value="" />
                    <label for="checkbox-selectall" className="checkbox-label">
                        <div className="title">Select All</div>
                    </label>
                </div>
                <div className="checkbox-container">
                    { msgData?.message?.[0]?.component?.payload?.elements.map((ele: any, ind: any) => (
                        <div className="checkbox-item">
                            <input id={`checkbox-${ind}`} className={`checkbox-input checkbox-input-${msgData.messageId}`} type="checkbox" value={ele.value} />
                            <label for={`checkbox-${ind}`} className="checkbox-label">
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

