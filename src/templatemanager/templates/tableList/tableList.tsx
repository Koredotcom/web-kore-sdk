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

    const handleEvent = (event: any, action: any) => {
        event?.stopPropagation();
        if ('link' in action) {
            let link = action.link;
            if (link.indexOf("http:") < 0 && link.indexOf("https:") < 0) {
                link = "http:////" + link;
            }
            window.open(link, "_blank");
        } else if (action.type == 'url' || action.type == 'data-url') {
            let link = action.url;
            if (link.indexOf("http:") < 0 && link.indexOf("https:") < 0) {
                link = "http:////" + link;
            }
            window.open(link, "_blank");
        } else {
            hostInstance.sendMessage(action.payload || action.title, { renderMsg: action.title });
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'tableList') {
        return (
            <div>
                {msgData.message[0].component.payload.elements.map((ele: any) => (
                    <Fragment>
                        <div className="table-list-wrapper-info">
                            <div className="table-list-info-content">
                                {ele.sectionHeader && <h1>{ele.sectionHeader}</h1>}
                                {ele.sectionHeaderDesc && <p>{ele.sectionHeaderDesc}</p>}

                                {ele.rowItems.map((item: any) => (
                                    <div className="table-list-data-card" style={{backgroundColor: item.bgcolor ? item.bgcolor: '', color: item.title.rowColor ? item.title.rowColor: ''}} onClick={(event) => handleEvent(event, item.default_action)}>
                                        {item && item.title.image && item.title.image.image_type && item.title.image.image_src && <div className={`img-block ${item.title.image.size == 'medium' ? `medium-img` : `small-img`}`}>
                                            <figure>
                                                <img src={item.title.image.image_src} />
                                            </figure>
                                        </div>}
                                        { item.title.type == 'text' && (item.title.text.title || item.title.text.subtitle) && <div className="content-details">
                                            <h1>{item.title.text.title}</h1>
                                            <p>{item.title.text.subtitle}</p>
                                        </div>}
                                        { item.title.type == 'url' && (item.title.url.title || item.title.url.subtitle) && <div className="content-details">
                                            <h1 className="under-line" onClick={(event) => handleEvent(event, item.title.url)}>{item.title.url.title}</h1>
                                            <p>{item.title.url.subtitle}</p>
                                        </div>}
                                        {item.value.type == 'text' && item.value.text && <div className="price-tag">{item.value.text}</div>}
                                        {item.value.type == 'url' && item.value.url && <div className="price-tag under-line" onClick={(event) => handleEvent(event, item.value.url)}>{item.value.url.title}</div>}

                                        {/* { item && item.title.image && item.title.image.image_type && item.title.image.image_src && <div><img src={item.title.image.image_src} style={{height: '40px', width: '40px'}}></img></div> }
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
                                <div></div>} */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fragment>
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

