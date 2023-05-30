

import './avatarComponent.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
export default class avatarComponent {
    element:any;
    hostInstance: any;
    constructor(hostInstance:any){
        this.hostInstance=hostInstance;
    }
    FunctionalComponent (props?:any) {
        const toggleChat = () => {
            console.log('Button clicked!');
        };
        return (
            <div className="avatar-variations-footer" aria-label="avatar footer">
                <div className="avatar-actions" aria-label="avatar actions">
                    <div className="content-info">
                        <div className="text-content two" role="contentinfo" aria-labelledby="helojohn">
                            <h4 id="helojohn">Hello Jhon</h4>
                            <p className="help-text-content">Welcome to support</p>
                            <span className="close-avatar-content" role="contentinfo" aria-label="close">
                                <figure>
                                    <img src="/images/close.svg" alt="close" />
                                </figure>
                            </span>
                        </div>      
                        <div className="text-content three" role="contentinfo" aria-label="paragraph text">
                            <p className="help-text-content">Can I help you any way?</p>
                        </div>                        
                        <button className="primary-button">Send message</button>
                    </div>
                    <button className="avatar-bg">
                        <span className="un-read-msg">2</span>
                        <figure>
                            <img src="/images/avatar.svg" alt="Elephant at sunset" />
                        </figure>
                    </button>
                </div>
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






// import './welcomeScreeContainer.scss';
// import {h} from 'preact';
// import render from 'preact-render-to-string';

// import ChatContainer from '../chatContainer/chatContainer';

// export default class welcomeScreeContainer {
//     element:any;
//     hostInstance: any;
//     ChatComponent:any;
//     constructor(hostInstance:any){
//         this.hostInstance=hostInstance;
//         this.ChatComponent=new ChatContainer(this.hostInstance).FunctionalComponent;
//     }
//     FunctionalComponent (props:any) {
//         const handleClick = () => {
//             console.log('Button clicked!');
//         };
//         return (
//             <div className='test'>
//             <h1>Welcome Screen</h1>
//             <button onClick={handleClick}>click</button>
//             <p>some thing</p>
//             <div><this.ChatComponent/></div>
//           </div>
//         );
//     } 
//     getHTML() {
//         let me=this;
//         me.element=document.createElement("div"); 
//         me.element.className = "chat-container";
//         me.element=render(this.FunctionalComponent({hostInsance:this.hostInstance}),me.element );
//         return me.element;
//     }    
// }

