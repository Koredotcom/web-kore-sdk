import BaseChatTemplate from '../baseChatTemplate';
import './digitalForm.scss';
import { h } from 'preact';
export declare function DigitalFormExtension(props: any): h.JSX.Element;
export declare function DigitalForm(props: any): h.JSX.Element | undefined;
declare class DigitalFormTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default DigitalFormTemplate;
