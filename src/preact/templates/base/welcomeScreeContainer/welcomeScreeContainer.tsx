

import './welcomeScreeContainer.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';

export default class welcomeScreeContainer {
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
            <h1>Welcome Screen</h1>
            <button onClick={handleClick}>click</button>
            <p>some thing</p>
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

