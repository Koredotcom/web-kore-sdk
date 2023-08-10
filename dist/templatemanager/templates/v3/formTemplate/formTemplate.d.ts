import BaseChatTemplate from '../baseChatTemplate';
import './formTemplate.scss';
import { h } from 'preact';
export declare function Form(props: any): h.JSX.Element | undefined;
declare class TemplateForm extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateForm;
