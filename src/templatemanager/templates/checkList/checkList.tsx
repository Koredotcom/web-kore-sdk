import BaseChatTemplate from '../baseChatTemplate';
import './checkList.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function CheckList(props: any) {
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
        let selectedText: any = '';
        const selectedItems = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}:checked`);
        selectedItems.forEach((ele: any) => {
            selectedValues.push(ele.value);
            selectedText = selectedText + ' ' + ele.getAttribute('data-title');
        });
        hostInstance.sendMessage(selectedValues.toString(), {renderMsg: selectedText});
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'checkListTemplate') {
        return (
            <div className="checklist-temp-wrapper">
                <button className="checklist-card">
                    <div className="manage-card-block">
                        <div className="left-block-details">
                            <h1>Manager Onboarding Tasks</h1>
                            <div className="status-data-block">
                                <div className="status-data">
                                    <h2>Total Tasks</h2>
                                    <p>100</p>
                                </div>
                                <div className="status-data">
                                    <h2>Completed</h2>
                                    <p>40</p>
                                </div>
                                <div className="status-data">
                                    <h2>Pending</h2>
                                    <p>60</p>
                                </div>
                            </div>
                        </div>
                        <div className="progress-circle-block"></div>
                    </div>
                    <div className="more-details-status-type">
                        <div className="details-card-status">
                            <div className="status-heading">
                                <h2>Books</h2>
                                <div className="status-info">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00039 13.6004C11.0932 13.6004 13.6004 11.0932 13.6004 8.00039C13.6004 4.9076 11.0932 2.40039 8.00039 2.40039C4.9076 2.40039 2.40039 4.9076 2.40039 8.00039C2.40039 11.0932 4.9076 13.6004 8.00039 13.6004ZM10.5954 7.09537C10.8687 6.822 10.8687 6.37878 10.5954 6.10542C10.322 5.83205 9.87878 5.83205 9.60542 6.10542L7.30039 8.41044L6.39537 7.50542C6.122 7.23205 5.67878 7.23205 5.40542 7.50542C5.13205 7.77878 5.13205 8.222 5.40542 8.49537L6.80542 9.89537C7.07878 10.1687 7.522 10.1687 7.79537 9.89537L10.5954 7.09537Z" fill="#22C55E"/>
                                    </svg>
                                    <span>Completed</span>
                                </div>
                            </div>
                            <p>Completed On: 30/08/2024</p>
                        </div>
                        <div className="details-card-status">
                            <div className="status-heading">
                                <h2>Mentor</h2>
                                <div className="status-info">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00039 13.6004C11.0932 13.6004 13.6004 11.0932 13.6004 8.00039C13.6004 4.9076 11.0932 2.40039 8.00039 2.40039C4.9076 2.40039 2.40039 4.9076 2.40039 8.00039C2.40039 11.0932 4.9076 13.6004 8.00039 13.6004ZM10.5954 7.09537C10.8687 6.822 10.8687 6.37878 10.5954 6.10542C10.322 5.83205 9.87878 5.83205 9.60542 6.10542L7.30039 8.41044L6.39537 7.50542C6.122 7.23205 5.67878 7.23205 5.40542 7.50542C5.13205 7.77878 5.13205 8.222 5.40542 8.49537L6.80542 9.89537C7.07878 10.1687 7.522 10.1687 7.79537 9.89537L10.5954 7.09537Z" fill="#22C55E"/>
                                    </svg>
                                    <span>Completed</span>
                                </div>
                            </div>
                            <p>Completed On: 30/08/2024</p>
                        </div>
                        <div className="details-card-status">
                            <div className="status-heading">
                                <h2>Article</h2>
                                <div className="status-info pending">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8.00039 5.5115V8.00039L9.86706 9.86706M13.6004 8.00039C13.6004 11.0932 11.0932 13.6004 8.00039 13.6004C4.9076 13.6004 2.40039 11.0932 2.40039 8.00039C2.40039 4.9076 4.9076 2.40039 8.00039 2.40039C11.0932 2.40039 13.6004 4.9076 13.6004 8.00039Z" stroke="#F79009" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Pending...</span>
                                </div>
                            </div>
                            <p>Updated On: 30/08/2024</p>
                        </div>
                    </div>
                    <button className="show-more-btn hide-show-details">Details</button>
                </button>
                <button className="checklist-card">
                    <div className="manage-card-block">
                        <div className="left-block-details">
                            <h1>Manager Onboarding Tasks</h1>
                            <div className="status-data-block">
                                <div className="status-data">
                                    <h2>Total Tasks</h2>
                                    <p>100</p>
                                </div>
                                <div className="status-data">
                                    <h2>Completed</h2>
                                    <p>40</p>
                                </div>
                                <div className="status-data">
                                    <h2>Pending</h2>
                                    <p>60</p>
                                </div>
                            </div>
                        </div>
                        <div className="progress-circle-block"></div>
                    </div>
                    <button className="show-more-btn hide-show-details">Details</button>
                </button>
                <button className="checklist-card">
                    <div className="manage-card-block">
                        <div className="left-block-details">
                            <h1>Manager Onboarding Tasks</h1>
                            <div className="status-data-block">
                                <div className="status-data">
                                    <h2>Total Tasks</h2>
                                    <p>100</p>
                                </div>
                                <div className="status-data">
                                    <h2>Completed</h2>
                                    <p>40</p>
                                </div>
                                <div className="status-data">
                                    <h2>Pending</h2>
                                    <p>60</p>
                                </div>
                            </div>
                        </div>
                        <div className="progress-circle-block"></div>
                    </div>
                    <button className="show-more-btn hide-show-details">Details</button>
                </button>
                <button className="show-more-btn">View More</button>
            </div>
        );
    }
}

class TemplateCheckList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(CheckList, msgData, this.hostInstance);
    }
}

export default TemplateCheckList;

