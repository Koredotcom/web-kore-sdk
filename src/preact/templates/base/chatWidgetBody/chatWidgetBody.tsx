

import './chatWidgetBody.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
export default class chatWidgetBody {
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
            <div className="chat-widget-body-wrapper" aria-label="chat widget body">
                <div className="agent-bubble-comp">
                    <div className="agent-bubble-content">
                        <div className="top-info">
                            <div className="time-tamp"><time>2:32pm, Today</time></div>
                            <div className="you-text">You</div>                            
                        </div>
                        <div className="bubble-msg-with-img">
                            <div className="bubble-msg">Hello there! Thanks for reaching Kore.ai how may I assist you?</div>
                            <div className="agent-img">
                                <figure>
                                    <img src="/images/avatar-bot.svg" alt='avatr img'/>
                                </figure>
                            </div>
                            <div className="copy-bubble">
                                <img src="/images/arrow-back.svg" alt="back button" />
                            </div>
                        </div>
                        <div className="bottom-info">
                            <div className="time-tamp"><time>2:32pm, Today</time></div>
                            <div className="read-text">Read</div>
                        </div>
                    </div>
                </div>
                <div className="bot-bubble-comp">
                    <div className="bot-bubble-content">
                        <div className="top-info">
                            <div className="you-text">You</div>  
                            <div className="time-tamp"><time>2:32pm, Today</time></div>                          
                        </div>
                        <div className="bubble-msg-with-img">
                            <div className="bubble-msg">Hello there! Thanks for reaching Kore.ai how may I assist you?</div>
                            <div className="bot-img">
                                <figure>
                                    <img src="/images/avatar-bot.svg" alt='avatr img'/>
                                </figure>
                            </div>
                            <div className="copy-bubble">
                                <img src="/images/arrow-back.svg" alt="back button" />
                            </div>
                        </div>
                        <div className="bottom-info">
                            <div className="time-tamp"><time>2:32pm, Today</time></div>
                        </div>
                    </div>
                </div>
                <div className="date-saperator">
                    <div className="line-border"></div>
                    <div className="date-text">Today</div>
                    <div className="line-border"></div>
                </div>
                <div className="agent-joined-banner">
                    <div className="agent-joined-wrapper">
                        <div className="img-block">
                            <figure>
                                <img src="/images/dummy-img.svg" alt="agent image"/>
                            </figure>
                        </div>
                        <div className="agent-name">Agent Martin joined</div>
                        <div className="time-stamp">
                            <time>2:32pm</time>
                        </div>
                    </div>
                </div>
                <div className="button-template-container">
                    <div className="button-temp">
                        <button className="kr-btn">Know about Kore.ai</button>
                        <button className="kr-btn">Just browsing!</button>
                        <button className="kr-btn">I’m a Kore.ai customer with a question</button>
                    </div>
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

