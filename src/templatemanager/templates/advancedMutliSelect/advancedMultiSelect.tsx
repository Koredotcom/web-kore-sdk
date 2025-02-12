import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiSelect.scss';
import { h, Fragment } from 'preact';
import { Message } from '../message/message';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function AdvancedMultiSelect(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const slider = props.slider || false;
    const helpers = KoreHelpers.helpers;

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
            });
        } else {
            const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}-${index}`);
            eles.forEach((ele: any) => {
                ele.checked = false;
            });
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

        if (hostInstance.chatEle.querySelectorAll(`input[type="checkbox"].checkbox-input-${msgId}:checked`) && hostInstance.chatEle.querySelectorAll(`input[type="checkbox"].checkbox-input-${msgId}:checked`).length > 0) {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`)?.classList.add('show');
        } else {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`)?.classList.remove('show');
        }
    }

    const handleSelect = (event: any, index: any, ind: any, msgId: any) => {
        const eles = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}-${index}`);
        let isSelectAll = true;
        eles.forEach((ele: any) => {
            if (!ele.checked) {
                isSelectAll = false;
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

        if (hostInstance.chatEle.querySelectorAll(`input[type="checkbox"].checkbox-input-${msgId}:checked`) && hostInstance.chatEle.querySelectorAll(`input[type="checkbox"].checkbox-input-${msgId}:checked`).length > 0) {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`)?.classList.add('show');
        } else {
            hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`)?.classList.remove('show');
        }
    }

    const onSubmit = (msgId: any) => {
        let selectedData = '';
        let selectedTitles = '';
        const ele = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgId}`);

        ele.forEach((ele: any) => {
            if (ele.checked) {
                selectedData = selectedData ? selectedData + ',' + ele.value : ele.value;
                selectedTitles = selectedTitles ? selectedTitles + ', ' + ele.getAttribute('data-desc') : ele.getAttribute('data-desc');
            }
        });


        hostInstance.sendMessage('Here are selected items: ' + selectedData, { renderMsg: 'Here are selected items: ' + selectedTitles});
        hostInstance.chatEle.querySelector(`.multi-select-done-${msgId}`).remove();
        if (slider) {
            closeMenu();
        }
    }

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

        return (
            <div className="multi-select-action-template-wrapper" data-cw-msg-id={msgData?.messageId}>
                <h1>{msgData?.message[0].component.payload.heading}</h1>
                <div className="multi-select-list">
                    {msgData.message[0].component.payload.elements.map((ele: any, index: any) => (
                        <div className={`multi-select-list-item multi-select-list-${msgData.messageId} ${msgData.message[0].component.payload.showViewMore && index >= msgData.message[0].component.payload.limit ? `hide` : ``}`}>
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
                                                <input id={`checkbox-${msgData.messageId}-${index}-${ind}`} className={`checkbox-input checkbox-input-${msgData.messageId} checkbox-input-${msgData.messageId}-${index} checkbox-input-${msgData.messageId}-${index}-${ind}`} type="checkbox" value={e.value} data-desc={e.title} />
                                                <label for={`checkbox-${msgData.messageId}-${index}-${ind}`} className="checkbox-label"></label>
                                            </div>
                                            {e.image_url && <div className="img-block medium-img">
                                                <figure>
                                                    <img src={e.image_url} />
                                                </figure>
                                            </div>}
                                            <div className="content-details">
                                                <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(e.title, "bot") }}></h1>
                                                <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(e.description, "bot") }}></p>
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                        </div>))}
                    {(msgData.message[0].component.payload.showViewMore && (msgData.message[0].component.payload.elements.length > msgData.message[0].component.payload.limit)) && <div className="multi-select-list-item" onClick={(event) => handleViewMore(event, msgData.messageId)}>
                        <button className="show-more-btn">View More</button>
                    </div>}
                </div>
                <div className={`multi-select-done multi-select-done-${msgData.messageId}`}>
                    <button className="kr-button-primary lg" onClick={() => onSubmit(msgData.messageId)}>{msgData.message[0].component.payload.buttons[0].title}</button>
                </div>
            </div>
        );
}

export function AdvancedMultiSelectSlider(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance,
        slider: true
    }

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }
    
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1></h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <AdvancedMultiSelect {...messageObj} />
            </div>
        </div>
    )
}


export function AMSelect(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advanced_multi_select') {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData?.message?.[0]?.component?.payload?.sliderView && !msgData?.fromHistory) {
            hostInstance.bottomSliderAction('', getHTML(AdvancedMultiSelectSlider, msgData, hostInstance));
            messageObj.msgData.message[0].cInfo.body = messageObj.msgData?.message[0]?.component?.payload?.heading;
            return (
                <Message {...messageObj} />
            )
        } else {
            return (
                <AdvancedMultiSelect {...messageObj} />
            )
        }
    }
}

class TemplateAdvancedMultiSelect extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AMSelect, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedMultiSelect;

