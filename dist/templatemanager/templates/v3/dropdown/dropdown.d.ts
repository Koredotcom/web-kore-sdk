import BaseChatTemplate from '../baseChatTemplate';
import './dropdown.scss';
import { h } from 'preact';
export declare function Dropdown(props: any): h.JSX.Element | undefined;
declare class TemplateDropdown extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateDropdown;
