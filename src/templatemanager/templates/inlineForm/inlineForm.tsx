import { h, Fragment } from 'preact';
import BaseChatTemplate from '../baseChatTemplate';
import './inlineForm.scss';
import KoreHelpers from '../../../utils/helpers';

export function InlineForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    if (msgData?.message?.[0]?.component?.payload?.formData && msgData?.message?.[0]?.component?.payload?.formData.formLink && msgData?.message?.[0]?.component?.payload?.formData.renderType == 'inline') {
        return (
            <div className="thumbnails-wrapper-form forms-thumbnails" dir={KoreHelpers.isRTLContent(hostInstance.config, msgData) ? 'rtl' : 'ltr'}>
                <div className="thumbnail-data-content">
                    <iframe style={{ height: '100%', width: '100%' }} src={msgData.message[0].component?.payload?.formData.formLink}></iframe>
                </div>
            </div>
        );
    }
}

class InlineFormTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(InlineForm, msgData, this.hostInstance);
    }

}

export default InlineFormTemplate;

