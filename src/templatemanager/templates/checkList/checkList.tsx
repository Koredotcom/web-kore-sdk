import BaseChatTemplate from '../baseChatTemplate';
import './checkList.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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
        useEffect(() => {
            const ele = hostInstance.chatEle.querySelector(`#msg${msgData.messageId}`)
            function bindPercentages(ele: any, msgData: any) {
                if (msgData && msgData.message[0].component.payload.elements.length) {
                    for (var i = 0; i < msgData.message[0].component.payload.elements.length; i++) {
                        var element = msgData.message[0].component.payload.elements[i];
                        var id = i;
                        var HTMLElement = ele.querySelector('#c' + id);
                        var progressStyles = element.progressStyles;
                        var percentage = parseInt(element.taskProgress);
                        if (HTMLElement && progressStyles) {
                            for (var key in progressStyles) {
                                if (progressStyles.hasOwnProperty(key)) {
                                    if (key === 'background') {
                                        var style = document.createElement('style');
                                        style.textContent = `
                                            #progress${id}:before {
                                                background-image: conic-gradient(transparent ${percentage}%, ${progressStyles[key]} ${percentage}%);
                                            }
                                        `;
                                        HTMLElement.querySelector('.checklist-progress#progress' + id).appendChild(style);
                                    } else if (key === 'fillColor') {
                                        HTMLElement.querySelector('.checklist-progress').style.setProperty('--percentage', (percentage * 1) + '%');
                                        var image = `conic-gradient(${progressStyles[key]} 100%, ${progressStyles[key]} 100%, ${progressStyles[key]} 100%)`;
                                        HTMLElement.querySelector('.checklist-progress').style.backgroundImage = image;
                                    } else if (key === 'textcolor') {
                                        HTMLElement.querySelector('.checklist-percentage').style.color = progressStyles[key];
                                    }
                                }
                            }
                        } else {
                            if (HTMLElement) {
                                HTMLElement.querySelector('.checklist-progress').style.setProperty('--percentage', (percentage * 1) + '%');
                            }
                        }
                    }
                }
            }
            
            bindPercentages(ele, msgData);
        }, []);

        return (
            <div className="checklist-temp-wrapper" id={`msg${msgData.messageId}`}>
                <button className="checklist-card" id="c1">
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
                        <div className="progress-circle-block">
                            <div class="checklist-progress" id="progress1">
                                <div class="checklist-percentage">
                                    89 %
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="more-details-status-type">
                        <div className="details-card-status">
                            <h2>Books</h2>
                            <div className="status-heading">
                                <h3>Status:</h3>
                                <div className="status-info">
                                    <figure>
                                        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImNoZWNrLWNpcmNsZSIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1MjQxXzM4NzI2KSI+CjxwYXRoIGlkPSJJY29uIiBkPSJNNS4wMDA2NSA3Ljk5OTY3TDcuMDAwNjUgOS45OTk2N0wxMS4wMDA3IDUuOTk5NjdNMTQuNjY3MyA3Ljk5OTY3QzE0LjY2NzMgMTEuNjgxNiAxMS42ODI2IDE0LjY2NjMgOC4wMDA2NSAxNC42NjYzQzQuMzE4NzUgMTQuNjY2MyAxLjMzMzk4IDExLjY4MTYgMS4zMzM5OCA3Ljk5OTY3QzEuMzMzOTggNC4zMTc3OCA0LjMxODc1IDEuMzMzMDEgOC4wMDA2NSAxLjMzMzAxQzExLjY4MjYgMS4zMzMwMSAxNC42NjczIDQuMzE3NzggMTQuNjY3MyA3Ljk5OTY3WiIgc3Ryb2tlPSIjNjY3MDg1IiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTUyNDFfMzg3MjYiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" />
                                    </figure>
                                    <span>Completed</span>
                                </div>
                            </div>
                            <div className="status-heading">
                                <h3>Updated:</h3>
                                <p className="status-info-desc">July 30, 2024</p>
                            </div>
                        </div>
                        <div className="details-card-status">
                            <h2>Books</h2>
                            <div className="status-heading">
                                <h3>Status:</h3>
                                <div className="status-info">
                                    <figure>
                                        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImNoZWNrLWNpcmNsZSIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1MjQxXzM4NzI2KSI+CjxwYXRoIGlkPSJJY29uIiBkPSJNNS4wMDA2NSA3Ljk5OTY3TDcuMDAwNjUgOS45OTk2N0wxMS4wMDA3IDUuOTk5NjdNMTQuNjY3MyA3Ljk5OTY3QzE0LjY2NzMgMTEuNjgxNiAxMS42ODI2IDE0LjY2NjMgOC4wMDA2NSAxNC42NjYzQzQuMzE4NzUgMTQuNjY2MyAxLjMzMzk4IDExLjY4MTYgMS4zMzM5OCA3Ljk5OTY3QzEuMzMzOTggNC4zMTc3OCA0LjMxODc1IDEuMzMzMDEgOC4wMDA2NSAxLjMzMzAxQzExLjY4MjYgMS4zMzMwMSAxNC42NjczIDQuMzE3NzggMTQuNjY3MyA3Ljk5OTY3WiIgc3Ryb2tlPSIjNjY3MDg1IiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTUyNDFfMzg3MjYiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" />
                                    </figure>
                                    <span>Stopped</span>
                                </div>
                            </div>
                            <div className="status-heading">
                                <h3>Updated:</h3>
                                <p className="status-info-desc">July 30, 2024</p>
                            </div>
                        </div>
                        <div className="details-card-status">
                            <h2>Books</h2>
                            <div className="status-heading">
                                <h3>Status:</h3>
                                <div className="status-info">
                                    <figure>
                                        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImNoZWNrLWNpcmNsZSIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1MjQxXzM4NzI2KSI+CjxwYXRoIGlkPSJJY29uIiBkPSJNNS4wMDA2NSA3Ljk5OTY3TDcuMDAwNjUgOS45OTk2N0wxMS4wMDA3IDUuOTk5NjdNMTQuNjY3MyA3Ljk5OTY3QzE0LjY2NzMgMTEuNjgxNiAxMS42ODI2IDE0LjY2NjMgOC4wMDA2NSAxNC42NjYzQzQuMzE4NzUgMTQuNjY2MyAxLjMzMzk4IDExLjY4MTYgMS4zMzM5OCA3Ljk5OTY3QzEuMzMzOTggNC4zMTc3OCA0LjMxODc1IDEuMzMzMDEgOC4wMDA2NSAxLjMzMzAxQzExLjY4MjYgMS4zMzMwMSAxNC42NjczIDQuMzE3NzggMTQuNjY3MyA3Ljk5OTY3WiIgc3Ryb2tlPSIjNjY3MDg1IiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTUyNDFfMzg3MjYiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" />
                                    </figure>
                                    <span>Inprogress</span>
                                </div>
                            </div>
                            <div className="status-heading">
                                <h3>Updated:</h3>
                                <p className="status-info-desc">July 30, 2024</p>
                            </div>
                        </div>
                    </div>
                    <button className="show-more-btn hide-show-details">Details</button>
                </button>
                <button className="checklist-card" id="c2">
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
                        <div className="progress-circle-block">
                            <div class="checklist-progress" id="progress2">
                                <div class="checklist-percentage">
                                    50 %
                                </div>
                            </div>
                        </div>                    </div>
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

