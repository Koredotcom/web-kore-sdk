import BaseChatTemplate from '../baseChatTemplate';
import './button.scss';
import { h } from 'preact';
export declare function Button(props: any): h.JSX.Element | undefined;
declare class TemplateButton extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateButton;
