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
    } else if (msgData?.message?.[0]?.component?.payload && msgData.message[0].component.type == 'document') {
        return (
            <div className="thumbnails-wrapper attachment-document document-template">
                <div className="thumbnail-data-content document-cotent">
                    <div className="icon-block">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 4.75C4.75 3.7835 5.5335 3 6.5 3H10.5126C10.9767 3 11.4218 3.18437 11.75 3.51256L14.7374 6.5C15.0656 6.82819 15.25 7.27331 15.25 7.73744V15.25C15.25 16.2165 14.4665 17 13.5 17H6.5C5.5335 17 4.75 16.2165 4.75 15.25V4.75ZM6.5 10C6.5 9.51675 6.89175 9.125 7.375 9.125H12.625C13.1082 9.125 13.5 9.51675 13.5 10C13.5 10.4832 13.1082 10.875 12.625 10.875H7.375C6.89175 10.875 6.5 10.4832 6.5 10ZM7.375 12.625C6.89175 12.625 6.5 13.0168 6.5 13.5C6.5 13.9832 6.89175 14.375 7.375 14.375H12.625C13.1082 14.375 13.5 13.9832 13.5 13.5C13.5 13.0168 13.1082 12.625 12.625 12.625H7.375Z" fill="#697586" />
                        </svg>
                    </div>
                    <div className="attchment-details">
                        <div className="content-info">
                            {/* <p>120 MB</p> */}
                        </div>
                        <button className="kr-button-blue-light" onClick={() => download(msgData?.message?.[0]?.component?.payload.url, extractedFileName || 'file')}>Download</button>
                    </div>
                </div>
            </div>
        )
    }
}

class TemplateAttachmentV3 extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Attachment, msgData, this.hostInstance);
    }
}

export default TemplateAttachmentV3;