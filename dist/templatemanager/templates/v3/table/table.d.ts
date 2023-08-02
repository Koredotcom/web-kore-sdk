import BaseChatTemplate from '../baseChatTemplate';
import './table.scss';
import { h } from 'preact';
export declare function Table(props: any): h.JSX.Element | undefined;
declare class TableTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TableTemplate;
