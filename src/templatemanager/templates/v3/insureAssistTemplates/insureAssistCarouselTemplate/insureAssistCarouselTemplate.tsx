

import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistCarouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel';
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
                    <i className="sdkv3-cheveron-left"></i>
                </button>
                <ul class="slider">
                    {msgData.message[0].component.payload.elements.map((ele: any) => (
                        <li class="item card-content-sec" style={ele.sliderStyle}>
                            <button className="card-content-sec">
                                <div className="top-sec-card">
                                    <div className="card-acc-temp-sec">
                                        <div className="card-acc-temp">
                                            <div className="left-data">
                                                {ele?.topSection?.title && <h1 style={ele?.topSection?.titleStyle}> <img src={ele?.topSection?.icon} /> {ele?.topSection?.title}</h1>}
                                            </div>
                                            <div className="right-data">
                                                {ele?.topSection?.details?.title && <span style={ele?.topSection?.details?.styles} className="tag-name">{ele?.topSection?.details?.title}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp-sec">
                                        <div className="card-acc-temp">
                                            <div className="left-data">
                                                {ele?.topSection?.subTitle && <h2 style={ele?.topSection?.subtitleStyle}>{ele?.topSection?.subTitle}</h2>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="middle-sec-card">
                                    {/* <div className="card-acc-temp-sec"> */}
                                        <div className="card-acc-temp">
                                            <div className="left-data">
                                                {ele.middleSection?.title && <h1 style={ele.middleSection.titleStyles}>{ele.middleSection?.title}</h1>}
                                            </div>
                                            <div className="right-data">
                                                {ele.middleSection?.value && <h1>{ele.middleSection?.value}</h1>}
                                            </div>
                                        </div>
                                        {
                                            ele?.middleSection?.items?.map((val: any) => (
                                                <div className="card-acc-temp">
                                                    <div className="left-data">
                                                        {val?.title && <h2 style={val?.titleStyles && val?.titleStyles}>{val?.title}</h2>}
                                                        <div />
                                                    </div>
                                                    <div className="right-data">
                                                        {val?.value && <p style={val?.titleStyles && val?.valueStyles}>{val?.value}</p>}
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    {/* </div> */}
                                </div>
                                <div className="border-divider"></div>
                                <div className="bottom-sec-card">
                                    {
                                        ele.bottomSection?.items?.map((val: any) => (
                                            <div style={val?.spaceTopStyle} className="card-acc-temp">
                                                <div className="left-data">
                                                    {val?.title && <h2 style={val?.titleStyles && val?.titleStyles}>{val?.title}</h2>}
                                                    <div />
                                                </div>
                                                <div className="right-data">
                                                    {val?.value && <p style={val?.titleStyles && val?.valueStyles}>{val?.value}</p>}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    
                                    ele?.buttons?.map((button: any) => (
                                        <button style={button.buttonStyle} className="view-more-btn" onClick={() => handleButtonEvent(button)}>{button?.buttonTitle}</button>
                                    ))
                                }
                            </button>
                        </li>))}
                </ul>
                <button className={rightCheButton}>
                    <i className="sdkv3-cheveron-right"></i>
                </button>
            </div>
        );
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel' && msgData?.message?.[0]?.component?.payload?.carousel_type != 'stacked') {
        setTimeout(() => {
            const btnsParentDiv: any = hostInstance.chatEle.querySelector(`[data-id='${msgData.messageId}']`);
            const leftScrollBtn = hostInstance.chatEle.querySelector(`[data-button-left='${msgData.messageId}']`);
            const rightScrollBtn = hostInstance.chatEle.querySelector(`[data-button-right='${msgData.messageId}']`);
            if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
                if (leftScrollBtn) {
                    if (btnsParentDiv.scrollLeft > 0) {
                        leftScrollBtn.classList.remove('hide');
                    } else {
                        leftScrollBtn.classList.add('hide');
                    }
                }
                if (rightScrollBtn) {
                    if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
                        rightScrollBtn.classList.remove('hide');
                    } else {
                        rightScrollBtn.classList.add('hide');
                    }
                }
            }

            leftScrollBtn.addEventListener('click', () => {
                const btnsParentDivWidth = btnsParentDiv.scrollLeft;
                const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
                let curWidth = 0;
                if (qButtons.length > 0) {
                    qButtons.forEach((ele: any) => {
                        curWidth = curWidth + ele.offsetWidth + 10;
                        if (curWidth > btnsParentDivWidth) {
                            btnsParentDiv.scrollTo({
                                left: btnsParentDiv.offsetHeight - ele.offsetHeight - 50,
                                behavior: 'smooth'
                            });
                            rightScrollBtn.classList.remove('hide');;
                            if (btnsParentDiv.scrollLeft <= 0) {
                                leftScrollBtn.classList.add('hide');;
                            }
                        }

                    })
                }
            })
            rightScrollBtn.addEventListener('click', () => {
                const btnsParentDivWidth = btnsParentDiv.offsetWidth;
                const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
                let curWidth = 0;
                if (qButtons.length > 0) {
                    qButtons.forEach((ele: any) => {
                        curWidth = curWidth + ele.offsetWidth + 10;
                        if (curWidth > btnsParentDivWidth) {
                            btnsParentDiv.scrollTo({
                                left: btnsParentDiv.scrollLeft + ele.offsetWidth + 20,
                                behavior: 'smooth'
                            });
                            leftScrollBtn.classList.remove('hide');;
                            if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
                                rightScrollBtn.classList.add('hide');
                            }
                        }

                    })
                }
            })
        }, 50);
        return (
            <div className="list-template-carousel-wrapper" id={msgData.messageId}>
                <button className="carousel-left-click" data-button-left={msgData.messageId}>
                    <i className="sdkv3-cheveron-left"></i>
                </button>
                <div className="list-carousel" data-id={msgData.messageId}>
                    {msgData.message[0].component.payload.elements.map((ele: any) => (
                        <div className="list-carousel-item">
                            <div className="img-block">
                                <figure>
                                    <img src={ele.image_url} />
                                </figure>
                            </div>
                            <div className="content-block">
                                <div className="heading-block">
                                    <h1>{ele.title}</h1>
                                    {/* <p>$34.88</p> */}
                                </div>
                                <p>{ele.subtitle}</p>
                                <div className="rating-block">
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
                                </div>
                                <button className="kr-button-secondary" onClick={() => handleButtonEvent(ele.buttons[0])}>{ele.buttons[0].title}</button>
                                <button className="kr-button-primary" onClick={() => handleButtonEvent(ele.buttons[1])}>{ele.buttons[1].title}</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-right-click" data-button-right={msgData.messageId}>
                    <i className="sdkv3-cheveron-right"></i>
                </button>
            </div>
        )
    }
}

class insureAssistCarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default insureAssistCarouselTemplate;