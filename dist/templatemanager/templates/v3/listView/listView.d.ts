import BaseChatTemplate from '../baseChatTemplate';
import './listView.scss';
import { h } from 'preact';
export declare function ListViewMore(props: any): h.JSX.Element;
export declare function ListView(props: any): h.JSX.Element | undefined;
declare class TemplateListView extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateListView;
