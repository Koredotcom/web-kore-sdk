import BaseChatTemplate from '../baseChatTemplate';
import './cardTemplate.scss';
import { h, Fragment } from 'preact';
import { Message } from '../message/message';

export function card(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.type === 'modern') {
        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper" aria-label="card template sdk">
                        <div className="card-warpper-info">
                            <h1>{msgData.message[0].component.payload.cards.cardHeading.title}</h1>
                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <h1>{ele.topSection.title}</h1>
                                            <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                        </div>
                                        <div className="middle-sec-card">
                                            <p>{ele.middleSection.title}</p>
                                        </div>
                                        <div className="bottom-sec-card">
                                            <h2>{ele.bottomSection.title}</h2>
                                            <p>
                                                <time>{ele.bottomSection.details.title}</time>
                                            </p>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </section>                    
                </div>
            </Fragment>
        );
    }
    else if(msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.type === 'details'){
        return(
            <Fragment>
                <div>
                    <section className="card-template-wrapper-view-more-details" aria-label="card template sdk">
                        <button className="card-content-sec">
                            <div className="top-sec-card">
                                <h1>1043003</h1>
                                <span className="tag-name">Active</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Auto</p>
                            </div>
                            <div className="bottom-sec-card">
                                <h2>Premium amount</h2>
                                <p>$588</p>
                            </div>
                            <div className="middle-sec-card">
                                <p>Amount Due for next 7/12 monthly installments</p>
                                <span className="amount-text">$343</span>
                            </div>
                            <div className="border-divider"></div>
                            <div className="bottom-sec-card">
                                <h2>6th Installment: <span>Due</span></h2>
                            </div>
                            <div className="more-sec-card">
                                <h2>Payment Amount</h2>
                                <p>$49</p>
                            </div>
                            <div className="more-sec-card">
                                <h2>Payment due date</h2>
                                <p>Apr/25/2023</p>
                            </div>
                            <div className="border-divider"></div>
                            <div className="middle-sec-card">
                                <p>Effective</p>
                                <span className="amount-text">Oct/26/2023</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Expiration</p>
                                <span className="amount-text">Oct/25/2023</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Vehicles</p>
                                <span className="clickble-text">Tesla Cybertruck, BMW M3 (+1)</span>
                            </div>
                            <button className="view-more-btn">View more</button>
                        </button>
                    </section>
                </div>
            </Fragment>
        );
    }
}

class cardTemplate extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplate;