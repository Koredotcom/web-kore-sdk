import BaseChatTemplate from '../baseChatTemplate';
import './miniTable.scss';
import { h } from 'preact';
export declare function MiniTable(props: any): h.JSX.Element | undefined;
declare class MiniTableTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default MiniTableTemplate;
