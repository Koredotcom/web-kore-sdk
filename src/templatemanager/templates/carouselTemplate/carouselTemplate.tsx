

import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel'
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel' && msgData?.message?.[0]?.component?.payload?.carousel_type == 'stacked') {
        const stackClass = msgData.messageId + ' stacked stacked-cards';
        const leftCheButton = msgData.messageId + ' left-click';
        const rightCheButton = msgData.messageId + ' right-click';

        const stackedCard = new stackedCards({
            hostInstance: hostInstance,
            selector: '.' + msgData.messageId,
            layout: "slide",
            transformOrigin: "center",
            id: msgData.messageId,
            buttons: true // To show/hide buttons
        });
        setTimeout(() => {
            stackedCard.init();
        }, 300)

        return (
            <div className={stackClass}>
                <button className={leftCheButton}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <ul class="slider">
                    {msgData.message[0].component.payload.elements.map((item: any) => (
                        <li class="item">
                            <button className="card-content-sec">
                                <div className="top-sec-card">
                                    <h1>{item.topSection.title}</h1>
                                    {/* <span className="tag-name">Active</span> */}
                                </div>
                                <div className="middle-sec-card">
                                    <p>{item.middleSection.description}</p>
                                </div>
                                <div className="bottom-sec-card">
                                    <h2>{item.bottomSection.title}</h2>
                                    <p>
                                        <time>{item.bottomSection.description}</time>
                                    </p>
                                </div>
                                <button className="view-more-btn">{item.buttons[0].title}</button>
                            </button>
                        </li>))}
                </ul>
                <button className={rightCheButton}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        );
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel' && msgData?.message?.[0]?.component?.payload?.carousel_type != 'stacked') {
        setTimeout(() => {
            const btnsParentDiv: any = hostInstance.chatEle.querySelector(`[data-id='${msgData.messageId}']`);
            const leftScrollBtn = hostInstance.chatEle.querySelector(`[data-button-left='${msgData.messageId}']`);
            const rightScrollBtn = hostInstance.chatEle.querySelector(`[data-button-right='${msgData.messageId}']`);
            function updateButtonsView() {
                if (btnsParentDiv.scrollLeft > 0) {
                    leftScrollBtn.classList.remove('hide');
                } else {
                    leftScrollBtn.classList.add('hide');
                }
                if (btnsParentDiv.scrollLeft + btnsParentDiv.clientWidth < btnsParentDiv.scrollWidth) {
                    rightScrollBtn.classList.remove('hide');
                } else {
                    rightScrollBtn.classList.add('hide');
                }
            }
    
            function scrollToElement(element: any, direction: any) {
                const offset = direction === 'left' ? -element.offsetWidth - 9 : element.offsetWidth + 10;
                btnsParentDiv.scrollBy({ left: offset, behavior: 'smooth' });
                setTimeout(updateButtonsView, 500);
            }

            leftScrollBtn.addEventListener('click', () => {
                const qButtons = [...btnsParentDiv.querySelectorAll('.list-carousel-item')];
                for (let i = qButtons.length - 1; i >= 0; i--) {
                    const ele = qButtons[i];
                    if (btnsParentDiv.scrollLeft > ele.offsetLeft) {
                        scrollToElement(ele, 'left');
                        break;
                    }
                }
            });
    
            rightScrollBtn.addEventListener('click', () => {
                const qButtons = [...btnsParentDiv.querySelectorAll('.list-carousel-item')];
                for (let ele of qButtons) {
                    if (btnsParentDiv.scrollLeft + btnsParentDiv.clientWidth < ele.offsetLeft + ele.offsetWidth) {
                        scrollToElement(ele, 'right');
                        break;
                    }
                }
            });
    
            updateButtonsView();
        }, 50);
        return (
            <div className="list-template-carousel-wrapper" id={msgData.messageId}>
                <button className="carousel-left-click" data-button-left={msgData.messageId}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div className="list-carousel" data-id={msgData.messageId}>
                    {msgData.message[0].component.payload.elements.map((ele: any) => (
                        <div className="list-carousel-item">
                            {ele.image_url && <div className="img-block">
                                <figure>
                                    <img src={ele.image_url} />
                                </figure>
                            </div>}
                            <div className="content-block">
                                {(ele.title || ele.subtext) && <div className="heading-block">
                                    {ele.title && <h1>{ele.title}</h1>}
                                    {ele.subtext && <p>{ele.subtext}</p>}
                                </div>}
                                {ele.subtitle && <p>{ele.subtitle}</p>}
                                {ele.default_action && ele.default_action.type === 'web_url' && <a className="link-exteranl-site" href="#" target="_blank" onClick={() => handleButtonEvent({ type: 'web_url', url: ele.default_action.url })}>{ele.default_action.url}</a>}
                                {/* <div className="rating-block">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
                                    </figure>
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
                                    </figure>
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
                                    </figure>
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdGFyIC8gRmlsbGVkIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0NERDVERiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdGFyIC8gRmlsbGVkIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0NERDVERiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                </div> */}
                                { ele && ele.buttons && ele.buttons.length > 0 && ele.buttons.map((button: any) => (
                                    <button className="kr-button-primary" onClick={() => handleButtonEvent(button)} title={button.title}>{button.title}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-right-click" data-button-right={msgData.messageId}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
            </div>
        )
    }
}

class CarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default CarouselTemplate;

