import BaseChatTemplate from '../baseChatTemplate';
import './feedback.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../base/domManager';

export function additionalFeedback(props: any) {
    const data = {
        header: 'Describe your feedback',
        placeholder: 'Anything else you would like to add (optional)',
        options: [
            'Didn’t resolve my problem',
            'Had to give too many details',
            'Took too long'
        ],
        submitButtonText: 'Submit feedback'
    }

    return(
        <div className="radio-button-wrapper">
                <h1>{data.header}</h1>
                { data.options.map((ele: any, ind: any) => (
                    <div className="radio-padding">
                        <div className="radio-button-item">
                            <input id={`feedback-radio-${ind}`} name="radio-feedback" className="radio-input" value={ele} type="radio" />
                            <label for={`feedback-radio-${ind}`} className="radio-label">
                                <div className="radio-title">{ele}</div>
                                {/* <div className="radio-desc">Radio button item</div> */}
                            </label>
                        </div>
                    </div>
                ))}
                <textarea className="feedback-typing-text-area" id="feedback-text" placeholder={data.placeholder}></textarea>
                <button className="kr-button-primary feedback-text-submit lg">{data.submitButtonText}</button>
            </div>
    )
}

export function Feedback(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    
    const handleEvent = (e: any) => {
        if (e.type == 'url' || e.type == 'data-url') {
            let link = e.url;
            if (link.indexOf("http:") < 0 && link.indexOf("https:") < 0) {
                link = "http:////" + link;
            }
            window.open(link, "_blank");
        } else {
            hostInstance.sendMessage(e.payload, { renderMsg: e.title });
        }
    }

    const handleEmoji = (event: any, item: any, msgId?: any, ind?: any) => {
        const currentTarget = event.currentTarget;
        let val = item.value;
        let renderMsg = item.reviewText;
        if (msgId) {
            const ele = hostInstance.chatEle.querySelector(`.rating-${msgId}-${ind}`);
            if (ele) {
                ele.checked = true;
            }
        }
        currentTarget.parentNode.parentNode.classList.add('selected-cst-feeback');
        // if (item.smileyId == '5') {
        //     val = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        //     renderMsg = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        // }
        // if (item.smileyId > 3) {
            hostInstance.sendMessage(val, { renderMsg });
            closeSlider();
        // } else {
        //     if (hostInstance.chatEle.querySelectorAll('.chat-actions-bottom-wraper') && hostInstance.chatEle.querySelectorAll('.chat-actions-bottom-wraper').length > 0) {
        //         closeSlider();
        //     }
        //     setTimeout(() => {
        //         hostInstance.bottomSliderAction('', getHTML(additionalFeedback, msgData, hostInstance));
        //         setTimeout(() => {
        //             hostInstance.chatEle.querySelector('.feedback-text-submit').addEventListener('click', () => {
        //                 const selectedOption = hostInstance.chatEle.querySelector('input[name="radio-feedback"]:checked');
        //                 const typedtext = hostInstance.chatEle.querySelector('.feedback-typing-text-area');
        //                 const csatDiv = hostInstance.chatEle.querySelector('.added-feeback-text');
        //                 if (typedtext && typedtext.value) {
        //                     val = val + ': ' + typedtext.value;
        //                     renderMsg = renderMsg + ': ' + typedtext.value;
        //                 }
        //                 if (selectedOption) {
        //                     csatDiv.classList.remove('hide');
        //                     csatDiv.innerText = selectedOption.value;
        //                     val = val + ': ' + selectedOption.value;
        //                     renderMsg = renderMsg + ': ' + selectedOption.value;
        //                 }
        //                 hostInstance.sendMessage(val, { renderMsg });
        //                 closeSlider();
        //             });
        //         });
        //     }, 250);
        // }
    }

    const handleNPS = (event: any) => {
        const currentTarget = event.currentTarget;
        let value = currentTarget.textContent;
        let renderMsg = currentTarget.textContent;
        currentTarget.classList.add('selected-nps');
        currentTarget.parentNode.childNodes.forEach((e: any) => {
            if (currentTarget !== e) {
                e.disabled = true;
            }
        });
        // if (value > 8) {
        //     value = value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        //     renderMsg = value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        // }
        hostInstance.sendMessage(value, { renderMsg });
        closeSlider();
    }

    const handleThumps = (event: any, item: any) => {
        const currentTarget = event.currentTarget;
        const parentElement = currentTarget.parentElement;
        let val = item.value;
        let renderMsg = item.reviewText;
        for (const child of parentElement.children) {
            if (child !== currentTarget) {
                child.disabled = true;
            }
        }
        // val = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        // renderMsg = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        currentTarget.classList.add('selected-thumb');
        hostInstance.sendMessage(val, { renderMsg });
        closeSlider();
    }

    const handleStar = (item: any) => {
        const stars = hostInstance.chatEle.querySelectorAll(`.star-rating-${msgData.messageId}`);
        stars.forEach((star: any, ind: any) => {
            star.disabled = true;
            if (ind > item.value) {
                star.checked = true;
            }
        })
        let val = item.value.toString();
        let renderMsg = item.value;
        // if (val == '5') {
        //     val = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        //     renderMsg = item.value + ': ' + msgData.message[0].component.payload.messageTodisplay;
        // }
        hostInstance.sendMessage(val, { renderMsg });
        closeSlider();
    }

    const closeSlider = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.classList?.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    return (
        <div className="feedback-template-wrapper-container" id={msgData.messageId} data-cw-msg-id={msgData?.messageId}>
            <div className="feedback-temp-wrapper">
                <div className="feedback-temp-sec">
                    <h6>{msgData?.message?.[0]?.component?.payload?.text}</h6>
                    {(msgData.message[0].component.payload.view == 'emojis' || msgData.message[0].component.payload.view == 'CSAT') && <div className="csat-feedback">
                        <div className="emoji_container">
                            {msgData.message[0].component.payload.smileyArrays.map((emojiItem: any, ind: any) => (<div className="emoji-feedback">
                                <input type="radio" id={`rating-${emojiItem.smileyId}`} className={`rating-${msgData.messageId}-${ind}`} name={`csat_feedback-${msgData.messageId}`} onClick={event => handleEmoji(event, emojiItem)} />
                                <div className="emoji-details-label" for={`rating-${emojiItem.smileyId}`} onClick={event => handleEmoji(event, emojiItem, msgData.messageId, ind)}>
                                    <p>{emojiItem.reviewText}</p>
                                </div>
                            </div>))}
                        </div>
                        <p className="added-feeback-text hide"></p>
                    </div>}
                    {msgData.message[0].component.payload.view == 'NPS' && <div className="nps-feeback-survey">
                        <div className="btn-surveys-nps">
                            {msgData.message[0].component.payload.numbersArrays.map((numItem: any) => (
                                <button className="nps-btn-fdb" style={{ color: numItem?.color }} onClick={event => handleNPS(event)} id={numItem.numberId}>{numItem.value}</button>))}
                        </div>
                        <div className="text-info-survey-indication">
                            <h4>Not at all likely</h4>
                            <svg width="auto" height="8" viewBox="0 0 152 8" fill="none">
                                <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM151.354 4.35355C151.549 4.15829 151.549 3.84171 151.354 3.64645L148.172 0.464466C147.976 0.269204 147.66 0.269204 147.464 0.464466C147.269 0.659728 147.269 0.976311 147.464 1.17157L150.293 4L147.464 6.82843C147.269 7.02369 147.269 7.34027 147.464 7.53553C147.66 7.7308 147.976 7.7308 148.172 7.53553L151.354 4.35355ZM1 4.5H1.98684V3.5H1V4.5ZM3.96053 4.5H5.93421V3.5H3.96053V4.5ZM7.90789 4.5H9.88158V3.5H7.90789V4.5ZM11.8553 4.5H13.8289V3.5H11.8553V4.5ZM15.8026 4.5H17.7763V3.5H15.8026V4.5ZM19.75 4.5H21.7237V3.5H19.75V4.5ZM23.6974 4.5H25.6711V3.5H23.6974V4.5ZM27.6447 4.5H29.6184V3.5H27.6447V4.5ZM31.5921 4.5H33.5658V3.5H31.5921V4.5ZM35.5395 4.5H37.5132V3.5H35.5395V4.5ZM39.4868 4.5H41.4605V3.5H39.4868V4.5ZM43.4342 4.5H45.4079V3.5H43.4342V4.5ZM47.3816 4.5H49.3552V3.5H47.3816V4.5ZM51.3289 4.5H53.3026V3.5H51.3289V4.5ZM55.2763 4.5H57.25V3.5H55.2763V4.5ZM59.2237 4.5H61.1973V3.5H59.2237V4.5ZM63.171 4.5H65.1447V3.5H63.171V4.5ZM67.1184 4.5H69.0921V3.5H67.1184V4.5ZM71.0658 4.5H73.0395V3.5H71.0658V4.5ZM75.0131 4.5H76.9868V3.5H75.0131V4.5ZM78.9605 4.5H80.9342V3.5H78.9605V4.5ZM82.9079 4.5H84.8816V3.5H82.9079V4.5ZM86.8553 4.5H88.8289V3.5H86.8553V4.5ZM90.8026 4.5H92.7763V3.5H90.8026V4.5ZM94.75 4.5H96.7237V3.5H94.75V4.5ZM98.6974 4.5H100.671V3.5H98.6974V4.5ZM102.645 4.5H104.618V3.5H102.645V4.5ZM106.592 4.5H108.566V3.5H106.592V4.5ZM110.539 4.5H112.513V3.5H110.539V4.5ZM114.487 4.5H116.461V3.5H114.487V4.5ZM118.434 4.5H120.408V3.5H118.434V4.5ZM122.382 4.5H124.355V3.5H122.382V4.5ZM126.329 4.5H128.303V3.5H126.329V4.5ZM130.276 4.5H132.25V3.5H130.276V4.5ZM134.224 4.5H136.197V3.5H134.224V4.5ZM138.171 4.5H140.145V3.5H138.171V4.5ZM142.118 4.5H144.092V3.5H142.118V4.5ZM146.066 4.5H148.039V3.5H146.066V4.5ZM150.013 4.5H151V3.5H150.013V4.5Z" fill="#9AA4B2" />
                            </svg>
                            <h5>Extreme Likely</h5>
                        </div>
                    </div>}
                    {msgData.message[0].component.payload.view == 'ThumbsUpDown' && <div className="thumbs-up-down-feebdack">
                        <button className="btn-thumb-fdb positive-thumb" onClick={event => handleThumps(event, msgData.message[0].component.payload.thumpsUpDownArrays[1].reviewText.includes('Extremely Likely') ? msgData.message[0].component.payload.thumpsUpDownArrays[1] : msgData.message[0].component.payload.thumpsUpDownArrays[0])}>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M3.69238 10.4375C3.69238 9.71263 4.28001 9.125 5.00488 9.125C5.72976 9.125 6.31738 9.71263 6.31738 10.4375V15.6875C6.31738 16.4124 5.72976 17 5.00488 17C4.28001 17 3.69238 16.4124 3.69238 15.6875V10.4375Z" fill="#16A34A" />
                                <path d="M7.19238 10.2917V15.0434C7.19238 15.7063 7.56689 16.3123 8.15976 16.6087L8.20337 16.6305C8.68937 16.8735 9.22526 17 9.76862 17H14.5077C15.3419 17 16.0601 16.4112 16.2237 15.5932L17.2737 10.3432C17.4903 9.26032 16.6621 8.25 15.5577 8.25H12.4424V4.75C12.4424 3.7835 11.6589 3 10.6924 3C10.2091 3 9.81738 3.39175 9.81738 3.875V4.45833C9.81738 5.21563 9.57176 5.9525 9.11738 6.55833L7.89238 8.19167C7.43801 8.7975 7.19238 9.53437 7.19238 10.2917Z" fill="#16A34A" />
                            </svg>
                            <span>{msgData.message[0].component.payload.thumpsUpDownArrays[1].reviewText.includes('Extremely Likely') ? msgData.message[0].component.payload.thumpsUpDownArrays[1].reviewText : msgData.message[0].component.payload.thumpsUpDownArrays[0].reviewText}</span>
                        </button>
                        <button className="btn-thumb-fdb negtive-thumb" onClick={event => handleThumps(event, msgData.message[0].component.payload.thumpsUpDownArrays[0].reviewText.includes('Extremely Unlikely') ? msgData.message[0].component.payload.thumpsUpDownArrays[0] : msgData.message[0].component.payload.thumpsUpDownArrays[1])}>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M17.3083 9.5625C17.3083 10.2874 16.7207 10.875 15.9958 10.875C15.2709 10.875 14.6833 10.2874 14.6833 9.5625V4.3125C14.6833 3.58763 15.2709 3 15.9958 3C16.7207 3 17.3083 3.58763 17.3083 4.3125V9.5625Z" fill="#DC2626" />
                                <path d="M13.8083 9.70833V4.95656C13.8083 4.29371 13.4338 3.68775 12.8409 3.39131L12.7973 3.3695C12.3113 3.12651 11.7754 3 11.2321 3L6.49298 3C5.65879 3 4.94056 3.5888 4.77696 4.4068L3.72696 9.6568C3.51038 10.7397 4.33865 11.75 5.44298 11.75H8.55832V15.25C8.55832 16.2165 9.34182 17 10.3083 17C10.7916 17 11.1833 16.6082 11.1833 16.125V15.5417C11.1833 14.7844 11.4289 14.0475 11.8833 13.4417L13.1083 11.8083C13.5627 11.2025 13.8083 10.4656 13.8083 9.70833Z" fill="#DC2626" />
                            </svg>
                            <span>{msgData.message[0].component.payload.thumpsUpDownArrays[0].reviewText.includes('Extremely Unlikely') ? msgData.message[0].component.payload.thumpsUpDownArrays[0].reviewText : msgData.message[0].component.payload.thumpsUpDownArrays[1].reviewText}</span>
                        </button>
                    </div>}
                    {msgData.message[0].component.payload.view == 'star' && <div className="rating-feedback-star">{
                        msgData.message[0].component.payload.starArrays.map((starItem: any) => (
                            <Fragment>
                                <input type="radio" name="rating" id={`rating-${msgData.messageId}-${starItem.starId}`} onClick={() => handleStar(starItem)} className={`rating-${msgData.messageId}`} />
                                <label for={`rating-${msgData.messageId}-${starItem.starId}`}></label>
                            </Fragment>
                        ))
                    }
                    </div>}
                </div>
            </div>
        </div>
    );
}

export function FeedbackTemplate(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'feedbackTemplate' && (msgData.message[0].component.payload.view === "star" || msgData.message[0].component.payload.view === "emojis" || msgData.message[0].component.payload.view === "CSAT" || msgData.message[0].component.payload.view === "ThumbsUpDown" || msgData.message[0].component.payload.view === "NPS")) {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData.message[0].component.payload.sliderView) {
            if (msgData?.fromHistory) {
                msgObj.msgData.message[0].cInfo.body = msgObj.msgData.message[0].cInfo.body.payload.text;
                <Message {...msgObj} />
            } else {
                hostInstance.bottomSliderAction('', getHTML(Feedback, msgData, hostInstance));
                return (
                    <Message {...msgObj} />
                )
            }
        } else {
            return (
                <Feedback {...props} />
            )
        }
    }
}

class TemplateFeedback extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(FeedbackTemplate, msgData, this.hostInstance);
    }
}

export default TemplateFeedback;

