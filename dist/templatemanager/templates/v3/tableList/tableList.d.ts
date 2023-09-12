import BaseChatTemplate from '../baseChatTemplate';
import './tableList.scss';
import { h } from 'preact';
export declare function TableList(props: any): h.JSX.Element | undefined;
declare class TemplateTableList extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateTableList;
