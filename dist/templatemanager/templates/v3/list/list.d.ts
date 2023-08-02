import BaseChatTemplate from '../baseChatTemplate';
import './list.scss';
import { h } from 'preact';
export declare function List(props: any): h.JSX.Element | undefined;
declare class TemplateList extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateList;
