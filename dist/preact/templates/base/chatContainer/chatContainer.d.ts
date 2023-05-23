import './chatContainer.scss';
import { h } from 'preact';
declare class ChatContainer {
    element: any;
    hostInstance: any;
    constructor(hostInstance: any);
    FunctionalComponent(props: any): h.JSX.Element;
    getHTML(): any;
}
export default ChatContainer;
