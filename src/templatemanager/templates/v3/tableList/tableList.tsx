import BaseChatTemplate from '../baseChatTemplate';
import './tableList.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function TableList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

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

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'tableList') {
        return (
            <div>
                {msgData.message[0].component.payload.elements.map((ele: any) => (
                    <div>
                        {ele.sectionHeader && <div>{ele.sectionHeader}</div>}
                        {ele.sectionHeaderDesc && <div>{ele.sectionHeaderDesc}</div>}
                        {ele.rowItems.map((item: any) => (
                            <div style={{display: 'flex'}}>
                                { item && item.title.image && item.title.image.image_type && item.title.image.image_src && <div><img src={item.title.image.image_src} style={{height: '40px', width: '40px'}}></img></div> }
                                <div>
                                    { item.title && item.title.type && item.title.type == 'url' && <div>{item.title.url.title}</div>}
                                    { item.title && item.title.type && item.title.type == 'text' && <div>{item.title.text.title}</div>}
                                    { item.title && item.title.url && item.title.url.subtitle && <p>{item.title.url.subtitle}</p>}
                                    { item.title && item.title.text && item.title.text.subtitle && <p>{item.title.text.subtitle}</p>}
                                </div>
                                <div>
                                    { item.value.type == 'text' && item.value.text && <div onClick={() => handleEvent(item.default_action)}>{item.value.text}</div>}
                                    { item.value.type == 'image' && item.value.image && item.value.image.image_src && <div onClick={() => handleEvent(item.default_action)}><img src={item.value.image.image_src} style={{height: '40px', width: '40px'}}></img></div>}
                                    { item.value.type == 'url' && item.value.url && <div onClick={() => handleEvent(item.default_action)}>{item.value.url.title}</div>}
                                    { item.value.type == 'button' && item.value.button && <div onClick={() => handleEvent(item.default_action)}>{item.value.button.title}</div>}
                                    { item.value.type == 'menu' && item.value.menu && item.value.menu.length > 0 && 
                                    <div></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

class TemplateTableList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(TableList, msgData, this.hostInstance);
    }
}

export default TemplateTableList;

