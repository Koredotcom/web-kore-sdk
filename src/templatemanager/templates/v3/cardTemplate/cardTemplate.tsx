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
}

class cardTemplate extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplate;