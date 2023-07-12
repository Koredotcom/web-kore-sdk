

import BaseChatTemplate from '../baseChatTemplate';
import './digitalForm.scss';
import { h } from 'preact';
import { getHTML } from '../../../base/domManager';

export function DigitalFormExtension(props: any) {
    return (
        <div>
            <h1>Action Slider Content</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
            <h1>Action Slider</h1>
        </div>
    );
}

export function DigitalForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleForm = () => {
        hostInstance.bottomSliderAction('', getHTML(DigitalFormExtension, '', hostInstance))
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && msgData?.message?.[0]?.component?.formData) {
        return (
            <div>
                <div className="thumbnails-wrapper forms-thumbnails">
                    <div className="thumbnail-data-content">
                        <div className="icon-block">
                            <i className="sdkv3-file"></i>
                        </div>
                        <h1>Form name</h1>
                        <p>Hello, its really great to see you here. Tell us just a few details about you and we are just ready to start</p>
                        <button className="link-btn" onClick={handleForm}>Fill the form</button>
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

