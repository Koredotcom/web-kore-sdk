

import './chatWidgetHeader.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
export default class chatWidgetHeader {
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
            <div className="chat-widget-header" aria-label="chat widget header">
                <button className="back-to-chat" aria-label="back to welcome screen">
                    <figure>
                        <img src="/images/arrow-back.svg" alt="back button" />
                    </figure>
                </button>
                <div className="info-content-data">
                    <div className="img-block">
                        <figure>
                            <img src="/images/avatar-bot.svg" alt="back button" />
                        </figure>
                    </div>
                    <div className="content-text">
                        <h1 aria-label="bot name">Bot</h1>
                        <h2 aria-label="bot desc">Your personal assistant</h2>
                    </div>
                </div>
                <div className="actions-info">
                    <button className="btn-action">
                        {/* <figure>
                            <img src="/images/help.svg" alt="back button" />
                        </figure> */}
                        <i className="sdkv3-help"></i>
                    </button>
                    <button className="btn-action">
                        {/* <figure>
                            <img src="/images/support.svg" alt="back button" />
                        </figure> */}
                        <i className="sdkv3-support"></i>
                    </button>
                    <button className="btn-action">
                        {/* <figure>
                            <img src="/images/close-large.svg" alt="back button" />
                        </figure> */}
                        <i className="sdkv3-close"></i>
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

