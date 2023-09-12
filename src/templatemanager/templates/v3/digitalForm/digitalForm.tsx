

import BaseChatTemplate from '../baseChatTemplate';
import './digitalForm.scss';
import { h } from 'preact';
import { getHTML } from '../../../base/domManager';

export function DigitalFormExtension(props: any) {
    return (
        <div style={{ height: '300px'}}>
            <iframe style={{ height: '100%', width: '100%' }} src={props.msgData.message[0].component.formData.formLink}></iframe>
        </div>
    );
}

export function DigitalForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleForm = () => {
        hostInstance.bottomSliderAction('', getHTML(DigitalFormExtension, msgData, hostInstance))
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && msgData?.message?.[0]?.component?.formData) {
        return (
            <div>
                <div className="thumbnails-wrapper forms-thumbnails">
                    <div className="thumbnail-data-content">
                        <div className="icon-block">
                            <i className="sdkv3-file"></i>
                        </div>
                        <h1>InsureAssist Login</h1>
                        <p>Please click login below to enter your credentials.</p>
                        {
                            msgData.message[0].component.payload.buttons.map((ele: any) => (
                                <button className="link-btn" onClick={handleForm}>{ele.title}</button>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class DigitalFormTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(DigitalForm, msgData, this.hostInstance);
    }

}

export default DigitalFormTemplate;

