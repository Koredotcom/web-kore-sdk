import BaseChatTemplate from '../../../baseChatTemplate';
import './solutionCarausal.scss';
import { h, Fragment } from 'preact';
import stackedCards from './solutionCarousal'
import { useState, useEffect } from 'preact/hooks';
import { getHTML } from '../../../../base/domManager';
import IconsManager from '../../../../base/iconsManager';
import KoreHelpers from '../../../../../utils/helpers';

export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    if (msgData?.message[0]?.component?.payload?.payload) {
        msgData.message[0].component.payload = msgData.message[0].component.payload.payload;
    }
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const initialElements = msgData.message[0]?.component?.payload?.elements || [];
    const [elements, setElements] = useState(initialElements);
    const [rerenderKey, setRerenderKey] = useState(0);
    const [updatedQty, setUpdatedQty] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentQty, setCurrentQty] = useState(null);
    const [upatedQtyElements , upatedQtyElement] = useState<any[]>()
    const [tooltipStatesSubTitle, setTooltipStatesSubTitle] = useState([] as boolean[]);
    const [tooltipStatesSummaryText, setTooltipStatesSummaryText] = useState([] as boolean[]);
     // For disabled the slider
    const [isSliderEnabled, setSliderEnabled] = useState(true);


    const handleMouseEnterSubTitle = (index: number) => {
        const updatedStates = [...tooltipStatesSubTitle];
        updatedStates[index] = true;
        setTooltipStatesSubTitle(updatedStates);
    };

    const handleMouseLeaveSubTitle = (index: number) => {
        const updatedStates = [...tooltipStatesSubTitle];
        updatedStates[index] = false;
        setTooltipStatesSubTitle(updatedStates);
    };

    const handleMouseEnterSummaryText = (index: number) => {
        const updatedStates = [...tooltipStatesSummaryText];
        updatedStates[index] = true;
        setTooltipStatesSummaryText(updatedStates);
    };

    const handleMouseLeaveSummaryText = (index: number) => {
        const updatedStates = [...tooltipStatesSummaryText];
        updatedStates[index] = false;
        setTooltipStatesSummaryText(updatedStates);
    };

    useEffect(() => {
        // Set initial value for currentQty based on initial slide index
        if (elements.length > 0) {
            setCurrentQty(elements[currentSlideIndex]?.qty || null);
        }
    }, [elements, currentSlideIndex]);

    const handleDecrement = (index: any) => {
        setElements((prevElements: any) => {
            const updatedElements = [...prevElements];
            updatedElements[index].qty = Math.max(1, updatedElements[index].qty - 1);
            upatedQtyElement(updatedElements)
            return updatedElements;
        });
    };

    const handleIncrement = (index: any) => {
        setElements((prevElements: any) => {
            const updatedElements = [...prevElements];
            updatedElements[index].qty = parseInt(updatedElements[index].qty, 10) + 1;
            const newQty = updatedElements[index].qty;
            upatedQtyElement(updatedElements)
            setUpdatedQty(newQty);
            return updatedElements;
        });
    };


    const handleButtonEvent = (e: any) => {
        let qty:any
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            upatedQtyElements?.forEach(ele=>{
                ele.buttons.forEach((Buttonpayload: { payload: any; }) =>{
                     if(Buttonpayload.payload == e.payload){
                        qty =  ele.qty
                     }
                })
            })
            let payload = e.payload + `#${qty || updatedQty || currentQty}` || currentQty;
            hostInstance.sendMessage(payload, { renderMsg: e.value });
            setSliderEnabled(false);
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    const handleLeftClick = () => {
        setCurrentSlideIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : elements.length - 1;
            return newIndex;
        });
    };

    const handleRightClick = () => {
        setCurrentSlideIndex((prevIndex) => {
            const newIndex = prevIndex < elements.length - 1 ? prevIndex + 1 : 0;
            return newIndex;
        });
    };

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'retailAssistcarousel') {
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
        // setTimeout(() => {
        //     const btnsParentDiv: any = hostInstance.chatEle.querySelector(`[data-id='${msgData.messageId}']`);
        //     const leftScrollBtn = hostInstance.chatEle.querySelector(`[data-button-left='${msgData.messageId}']`);
        //     const rightScrollBtn = hostInstance.chatEle.querySelector(`[data-button-right='${msgData.messageId}']`);
        //     if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
        //         if (leftScrollBtn) {
        //             if (btnsParentDiv.scrollLeft > 0) {
        //                 leftScrollBtn.classList.remove('hide');
        //             } else {
        //                 leftScrollBtn.classList.add('hide');
        //             }
        //         }
        //         if (rightScrollBtn) {
        //             if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
        //                 rightScrollBtn.classList.remove('hide');
        //             } else {
        //                 rightScrollBtn.classList.add('hide');
        //             }
        //         }
        //     }

        //     leftScrollBtn.addEventListener('click', () => {
        //         const btnsParentDivWidth = btnsParentDiv.scrollLeft;
        //         const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
        //         let curWidth = 0;
        //         if (qButtons.length > 0) {
        //             qButtons.forEach((ele: any) => {
        //                 curWidth = curWidth + ele.offsetWidth + 10;
        //                 if (curWidth > btnsParentDivWidth) {
        //                     btnsParentDiv.scrollTo({
        //                         left: btnsParentDiv.offsetHeight - ele.offsetHeight - 50,
        //                         behavior: 'smooth'
        //                     });
        //                     rightScrollBtn.classList.remove('hide');;
        //                     if (btnsParentDiv.scrollLeft <= 0) {
        //                         leftScrollBtn.classList.add('hide');;
        //                     }
        //                 }

        //             })
        //         }
        //     })
        //     rightScrollBtn.addEventListener('click', () => {
        //         const btnsParentDivWidth = btnsParentDiv.offsetWidth;
        //         const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
        //         let curWidth = 0;
        //         if (qButtons.length > 0) {
        //             qButtons.forEach((ele: any) => {
        //                 curWidth = curWidth + ele.offsetWidth + 10;
        //                 if (curWidth > btnsParentDivWidth) {
        //                     btnsParentDiv.scrollTo({
        //                         left: btnsParentDiv.scrollLeft + ele.offsetWidth + 20,
        //                         behavior: 'smooth'
        //                     });
        //                     leftScrollBtn.classList.remove('hide');;
        //                     if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
        //                         rightScrollBtn.classList.add('hide');
        //                     }
        //                 }

        //             })
        //         }
        //     })
        // }, 50);
        return (
            <div key={rerenderKey} className="list-template-carousel-wrapper" id={msgData.messageId}>
                <button className="carousel-left-click" data-button-left={msgData.messageId} onClick={handleLeftClick} disabled={!isSliderEnabled}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div className={`list-carousel slider ${isSliderEnabled ? '' : 'disabled-slider'}`} data-id={msgData.messageId}>
                    {msgData.message[0].component.payload.elements.map((item: any, index: number) => (
                        <div className="list-carousel-item">
                            <button className="card-content-sec">
                                <div className="top-sec-card">
                                    <img src={item?.thumbnail} />
                                    <div className="thumbnail-card-style">
                                        <p className="p-left thumbnail-style thumbnail-style-br thumbnail-text" style={item?.details?.titleStyle}>{item?.details?.title}</p>
                                        <p className="p-right thumbnail-style thumbnail-style-gr thumbnail-text" style={item?.details?.subTitleStyle}>{item?.details?.subTitle}</p>
                                    </div>
                                </div>
                                {/* <div className="middle-sec-card"> */}
                                <div className="set-qty-style" key={index}>
                                    <div className="f-right">
                                        {/* Your buttons and input fields */}
                                        {item?.button1?.icon &&
                                            <button style={item?.button1?.buttonStyle} className="decrement" onClick={() => handleDecrement(index)}>
                                                <img src={item?.button1?.icon} alt="Decrement" />
                                            </button>
                                        }
                                        {item?.button1?.icon &&
                                            <input
                                                className="input-c"
                                                type="text"
                                                readOnly
                                                value={elements[index].qty}
                                            />
                                        }
                                        {item?.button2?.icon &&
                                            <button style={item?.button2?.buttonStyle} className="increment" onClick={() => handleIncrement(index)}>
                                                <img src={item?.button2?.icon} alt="Increment" />
                                            </button>
                                        }
                                    </div>
                                </div>
                                {/* </div> */}
                                {
                                    item?.items?.map((ele: any) => (
                                        <div className="middle-sec-card">
                                            <p className="title-style" style={ele?.titleStyles}>{ele?.title}</p>

                                            <p
                                                className="sub-title-style"
                                                onMouseEnter={() => handleMouseEnterSubTitle(index)}
                                                onMouseLeave={() => handleMouseLeaveSubTitle(index)}
                                                style={ele?.subTitleStyle}
                                            >
                                                {ele?.subTitle}
                                            </p>
                                            {tooltipStatesSubTitle[index] && (
                                                <div className={`custom-tooltip tooltip-style`}>
                                                    {ele?.subTitle}
                                                </div>
                                            )}

                                            <div className="middle-card-style clear-float">
                                                <div className="f-left">
                                                    <p className="value-style" style={ele?.valueStyle}>
                                                        {parseFloat(ele?.value.replace(/[^0-9.]/g, '')) > 0
                                                            ? new Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(
                                                                parseFloat(ele?.value.replace(/[^0-9.]/g, '')) * parseFloat(elements[index]?.qty)
                                                            )
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            {ele?.summaryText && (
                                                <div>
                                                    <p
                                                        className="summary-text-style"
                                                        onMouseEnter={() => handleMouseEnterSummaryText(index)}
                                                        onMouseLeave={() => handleMouseLeaveSummaryText(index)}
                                                        style={ele?.summaryTextStyle}
                                                    >
                                                        {ele?.summaryText}
                                                    </p>
                                                    {tooltipStatesSummaryText[index] && (
                                                        <div className={`custom-tooltip tooltip-style`}>
                                                            {ele?.summaryText}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                             {ele?.description && <div className='summary-description'>
                                                {ele?.description?.split('\n')?.length && ele?.description?.split('\n')?.map((obj: any) => (
                                                    <p className='desc' dangerouslySetInnerHTML={{__html: KoreHelpers?.helpers?.convertMDtoHTML(obj)}}></p>
                                                ))
                                                }
                                            </div>
                                            }
                                            {ele?.itemID && <p className="summary-text-style" >{ele?.itemID}</p>}
                                        </div>
                                    ))
                                }
                                {
                                    item?.buttons?.map((button: any, index: any) => (
                                        <button
                                            style={button.buttonStyle}
                                            className="view-more-btn"
                                            onClick={() => handleButtonEvent(button)}
                                            key={index}
                                        >
                                            {button?.buttonTitle}
                                        </button>
                                    ))
                                }
                            </button>
                        </div>))}
                </div>
                <button className="carousel-right-click" data-button-right={msgData.messageId} onClick={handleRightClick} disabled={!isSliderEnabled}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        );
    }

    // // 
    // if (msgData?.message?.[0]?.component?.payload?.template_type == 'retailAssistcarousel' && msgData?.message?.[0]?.component?.payload?.carousel_type == 'stacked') {
    //     setTimeout(() => {
    //         const btnsParentDiv: any = hostInstance.chatEle.querySelector(`[data-id='${msgData.messageId}']`);
    //         const leftScrollBtn = hostInstance.chatEle.querySelector(`[data-button-left='${msgData.messageId}']`);
    //         const rightScrollBtn = hostInstance.chatEle.querySelector(`[data-button-right='${msgData.messageId}']`);
    //         if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
    //             if (leftScrollBtn) {
    //                 if (btnsParentDiv.scrollLeft > 0) {
    //                     leftScrollBtn.classList.remove('hide');
    //                 } else {
    //                     leftScrollBtn.classList.add('hide');
    //                 }
    //             }
    //             if (rightScrollBtn) {
    //                 if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
    //                     rightScrollBtn.classList.remove('hide');
    //                 } else {
    //                     rightScrollBtn.classList.add('hide');
    //                 }
    //             }
    //         }

    //         leftScrollBtn.addEventListener('click', () => {
    //             const btnsParentDivWidth = btnsParentDiv.scrollLeft;
    //             const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
    //             let curWidth = 0;
    //             if (qButtons.length > 0) {
    //                 qButtons.forEach((ele: any) => {
    //                     curWidth = curWidth + ele.offsetWidth + 10;
    //                     if (curWidth > btnsParentDivWidth) {
    //                         btnsParentDiv.scrollTo({
    //                             left: btnsParentDiv.offsetHeight - ele.offsetHeight - 50,
    //                             behavior: 'smooth'
    //                         });
    //                         rightScrollBtn.classList.remove('hide');;
    //                         if (btnsParentDiv.scrollLeft <= 0) {
    //                             leftScrollBtn.classList.add('hide');;
    //                         }
    //                     }

    //                 })
    //             }
    //         })
    //         rightScrollBtn.addEventListener('click', () => {
    //             const btnsParentDivWidth = btnsParentDiv.offsetWidth;
    //             const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
    //             let curWidth = 0;
    //             if (qButtons.length > 0) {
    //                 qButtons.forEach((ele: any) => {
    //                     curWidth = curWidth + ele.offsetWidth + 10;
    //                     if (curWidth > btnsParentDivWidth) {
    //                         btnsParentDiv.scrollTo({
    //                             left: btnsParentDiv.scrollLeft + ele.offsetWidth + 20,
    //                             behavior: 'smooth'
    //                         });
    //                         leftScrollBtn.classList.remove('hide');;
    //                         if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
    //                             rightScrollBtn.classList.add('hide');
    //                         }
    //                     }

    //                 })
    //             }
    //         })
    //     }, 50);
    //     return (
    //         <div className="list-template-carousel-wrapper" id={msgData.messageId}>
    //             <button className="carousel-left-click" data-button-left={msgData.messageId}>
    //                 <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
    //                     <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
    //                 </svg>
    //             </button>
    //             <div className="list-carousel" data-id={msgData.messageId}>
    //                 {msgData.message[0].component.payload.elements.map((ele: any) => (
    //                     <div className="list-carousel-item">
    //                         <div className="img-block">
    //                             <figure>
    //                                 <img src={ele.image_url} />
    //                             </figure>
    //                         </div>
    //                         <div className="content-block">
    //                             <div className="heading-block">
    //                                 <h1>{ele.title}</h1>
    //                                 {/* <p>$34.88</p> */}
    //                             </div>
    //                             <p>{ele.subtitle}</p>
    //                             <div className="rating-block">
    //                                 <figure>
    //                                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
    //                                 </figure>
    //                                 <figure>
    //                                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
    //                                 </figure>
    //                                 <figure>
    //                                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0Y1OUUwQiIvPgo8L3N2Zz4K" />
    //                                 </figure>
    //                                 <figure>
    //                                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdGFyIC8gRmlsbGVkIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0NERDVERiIvPgo8L2c+Cjwvc3ZnPgo=" />
    //                                 </figure>
    //                                 <figure>
    //                                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdGFyIC8gRmlsbGVkIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTEuOTU1MzYgNi4wODEyTDUuOTE0NjYgNS42NTA5N0w3LjUzMTc2IDEuODExODlDNy43MDY5MyAxLjM5NjA0IDguMjk2MiAxLjM5NjA0IDguNDcxMzcgMS44MTE4OUwxMC4wODg1IDUuNjUwOTdMMTQuMDQ0NyA2LjA4MTJDMTQuNDc3IDYuMTI4MjEgMTQuNjU1NyA2LjY2MDEzIDE0LjMzOTUgNi45NTg2NkwxMS4zNjI5IDkuNzY5MDRMMTIuMjAxMyAxMy44ODkzQzEyLjI5MDEgMTQuMzI1NCAxMS44MTY2IDE0LjY1NzkgMTEuNDM2NiAxNC40MjYzTDguMDAxNTcgMTIuMzMzOUw0LjU2MzI3IDE0LjQyNjVDNC4xODMwNyAxNC42NTc5IDMuNzA5NyAxNC4zMjUxIDMuNzk4NzcgMTMuODg5TDQuNjQwMjEgOS43NjkwNEwxLjY2MDY2IDYuOTU4ODVDMS4zNDQyIDYuNjYwMzggMS41MjI5MSA2LjEyODE5IDEuOTU1MzYgNi4wODEyWiIgZmlsbD0iI0NERDVERiIvPgo8L2c+Cjwvc3ZnPgo=" />
    //                                 </figure>
    //                             </div>
    //                             <button className="kr-button-secondary" onClick={() => handleButtonEvent(ele.buttons[0])}>{ele.buttons[0].title}</button>
    //                             <button className="kr-button-primary" onClick={() => handleButtonEvent(ele.buttons[1])}>{ele.buttons[1].title}</button>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //             <button className="carousel-right-click" data-button-right={msgData.messageId}>
    //                 <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
    //                     <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
    //                 </svg>
    //             </button>
    //         </div>
    //     )
    // }
}

class SolutionCarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default SolutionCarouselTemplate;