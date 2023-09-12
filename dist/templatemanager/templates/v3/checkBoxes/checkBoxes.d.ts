import BaseChatTemplate from '../baseChatTemplate';
import './checkBoxes.scss';
import { h } from 'preact';
export declare function CheckBoxes(props: any): h.JSX.Element | undefined;
declare class TemplateCheckBoxes extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateCheckBoxes;
