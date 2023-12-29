import BaseChatTemplate from '../baseChatTemplate';
import './templateAttachment.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import KoreHelpers from '../../../../utils/helpers';

export function Attachment(props: any) {
    const helpers = KoreHelpers.helpers;
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({ ...event.brandingData })
    });

    let extension = '';
    let extractedFileName: any;
    if (msgData?.message?.[0]?.component?.payload?.name) {
        extension = msgData.message[0].component.payload.name.split('.');
        extractedFileName = extension[0];
    }

    const download = (url: any, filename: any) => {
        let link = document.createElement("a");
        link.download = filename;
        link.target = "_blank";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const openLink = (url: any) => {
        window.open(url, '_blank');
    }

    if (msgData?.message?.[0]?.component?.payload && (msgData.message[0].component.type == 'image' || msgData.message[0].component.type == 'audio' || msgData.message[0].component.type == 'video' || msgData.message[0].component.type == 'link')) {
        return (
            <section className="attachment-sended-temp-wrapper attachment-wrap">
                <div className="multiple-attchments">
                    <div className="attchments-wrap" onClick={() => openLink(msgData?.message?.[0]?.component?.payload.url)}>
                        {msgData.message[0].component.type == 'image' && <div className="img-attch">
                            <figure>
                                <img src={msgData?.message?.[0]?.component?.payload.url}></img>
                            </figure>
                        </div>}
                        {msgData.message[0].component.type == 'audio' && <div className="img-attch">
                            <figure>
                                <audio controls>
                                    <source src={msgData?.message?.[0]?.component?.payload.url} type="audio/ogg"></source>
                                </audio>
                            </figure>
                        </div>}
                        {msgData.message[0].component.type == 'video' && <div className="img-attch">
                            <figure>
                                <video width="240" height="145" controls>
                                    <source src={msgData?.message?.[0]?.component?.payload.url} type="video/mp4"></source>
                                </video>
                            </figure>
                        </div>}
                        {msgData.message[0].component.type == 'link' && <div className="img-attch">
                            <p style={{ color: 'blue' }}>{msgData?.message?.[0]?.component?.payload.url}</p>
                        </div>}
                        {/* <button className="layer-multiple">+1</button> */}
                    </div>
                    <div className="attchment-details">
                        <div className="content-info">
                            <h2>{msgData?.message?.[0]?.component?.payload.name}</h2>
                            {/* <p>256 KB</p> */}
                        </div>
                        <button className="kr-button-blue-light" onClick={() => download(msgData?.message?.[0]?.component?.payload.url, extractedFileName || 'name')}>Download</button>
                    </div>
                </div>
            </section>
        );
    }
}

class TemplateAttachmentV3 extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Attachment, msgData, this.hostInstance);
    }
}

export default TemplateAttachmentV3;