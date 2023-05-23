

import './chatContainer.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';

class ChatContainer {
    element:any;
    hostInstance: any;
    constructor(hostInstance:any){
        this.hostInstance=hostInstance;
    }
    FunctionalComponent (props:any) {
        const handleClick = () => {
            console.log('Button clicked!');
        };
        return (
            <div className='test'>
            <h1>Hello, World!</h1>
            <button onClick={handleClick}>click</button>
            <p>This is a virtual DOM element created from a functional component.</p>
          </div>
        );
    } 
    getHTML() {
        let me=this;
        me.element=document.createElement("div"); 
        me.element.className = "chat-container";
        me.element=render(this.FunctionalComponent({hostInsance:this.hostInstance}),me.element );
        return me.element;
    }    
}

export default ChatContainer;
