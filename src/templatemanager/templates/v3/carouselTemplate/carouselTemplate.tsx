

import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel'
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const stackClass = msgData.messageId + ' stacked stacked-cards';
    const leftCheButton = msgData.messageId + ' left-click';
    const rightCheButton = msgData.messageId + ' right-click';
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel') {
        const stackedCard = new stackedCards({
            hostInstance: hostInstance,
            selector: '.' + msgData.messageId,
            layout: "slide",
            transformOrigin: "center",
            id: msgData.messageId,
            buttons: false // To show/hide buttons
        });
        setTimeout(() => {
            stackedCard.init();
        }, 300)

        return (

            // <div className={stackClass}>
            //     <button className={leftCheButton}>
            //         <i className="sdkv3-cheveron-left"></i>
            //     </button>
            //     <ul class="slider">
            //         <li class="item">
            //             <button className="card-content-sec">
            //                 <div className="top-sec-card">
            //                     <h1>1043693</h1>
            //                     <span className="tag-name">Active</span>
            //                 </div>
            //                 <div className="middle-sec-card">
            //                     <p>Auto</p>
            //                 </div>
            //                 <div className="bottom-sec-card">
            //                     <h2>Premium amount</h2>
            //                     <p>
            //                         <time>$588</time>
            //                     </p>
            //                 </div>
            //                 <button className="view-more-btn">View more</button>
            //             </button>
            //         </li>
            //         <li class="item">
            //             <button className="card-content-sec">
            //                 <div className="top-sec-card">
            //                     <h1>1043693</h1>
            //                     <span className="tag-name">Active</span>
            //                 </div>
            //                 <div className="middle-sec-card">
            //                     <p>Auto</p>
            //                 </div>
            //                 <div className="bottom-sec-card">
            //                     <h2>Premium amount</h2>
            //                     <p>
            //                         <time>$588</time>
            //                     </p>
            //                 </div>
            //                 <button className="view-more-btn">View more</button>
            //             </button>
            //         </li>
            //         <li class="item">
            //             <button className="card-content-sec">
            //                 <div className="top-sec-card">
            //                     <h1>1043693</h1>
            //                     <span className="tag-name">Active</span>
            //                 </div>
            //                 <div className="middle-sec-card">
            //                     <p>Auto</p>
            //                 </div>
            //                 <div className="bottom-sec-card">
            //                     <h2>Premium amount</h2>
            //                     <p>
            //                         <time>$588</time>
            //                     </p>
            //                 </div>
            //                 <button className="view-more-btn">View more</button>
            //             </button>
            //         </li>
            //         <li class="item">
            //             <button className="card-content-sec">
            //                 <div className="top-sec-card">
            //                     <h1>1043693</h1>
            //                     <span className="tag-name">Active</span>
            //                 </div>
            //                 <div className="middle-sec-card">
            //                     <p>Auto</p>
            //                 </div>
            //                 <div className="bottom-sec-card">
            //                     <h2>Premium amount</h2>
            //                     <p>
            //                         <time>$588</time>
            //                     </p>
            //                 </div>
            //                 <button className="view-more-btn">View more</button>
            //             </button>
            //         </li>
            //     </ul>
            //     <button className={rightCheButton}>
            //         <i className="sdkv3-cheveron-right"></i>
            //     </button>
            // </div>
            <div className="list-template-carousel-wrapper">
                <div className="list-carousel">
                    <div className="img-block">
                        <figure>
                            <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1691971200&Signature=MYsZPVBMdO9528S16MPxOlcoa-ing2mQa6V3qusq-B2Ln3wY-X8xSdgeJWg6eDZ2uIxlRbPJCbeD-6QXWvB2cycuV9kkAvXSimKjY3YCCr-Se46op-TQG3lWxjW3c4i11iobMRWXB2G1RNE1xXpxAeTamyBsUT6gcoiTZHXjKMMqIH6Iim-mOUgoyQ8P5HcgOHPBB6u1FLUCgPJSFist--JTre82~E92mYX~Smmv-uBvCbLAzXNtj1BwxjMv9VvpnRxHTLsjriAMvxXGomIKs1uDMPkRy-vcr7Xpa7HQ6z1phbs-2Ik2lfbZ5zGC52JB8quNqFwp0jvn5ciVkVrHCA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                        </figure>
                    </div>
                    <div className="content-block">
                        <div className="heading-block">
                            <h1>Large Pizza</h1>
                            <p>$34.88</p>
                        </div>
                        <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
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
                        <button className="kr-button-secondary">Add to cart</button>
                        <button className="kr-button-primary">Select</button>
                    </div>
                </div>
            </div>
        );
    }
}

class CarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default CarouselTemplate;

