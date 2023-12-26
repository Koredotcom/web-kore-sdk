import BaseChatTemplate from '../../baseChatTemplate';
import './itemSelection.scss';
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import IconsManager from '../../../../base/iconsManager';
import { getHTML } from '../../../../base/domManager';

export function RetailOrderSelection(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const initialElements = msgData.message[0]?.component?.payload?.elements || [];
    const [elements, setElements] = useState(initialElements);
    const [rerenderKey, setRerenderKey] = useState(0);
    const [modifiedQty, setModifiedQty] = useState<number | null>(null);

    useEffect(() => {
        // Check if elements are being updated when the state changes
        console.log('Updated elements:', elements);
    }, [elements]);

    // const handleDecrement = (index: any) => {
    //     setElements((prevElements: any) => {
    //         const updatedElements = [...prevElements];
    //         const currentQty = updatedElements[index].qty;
    //         updatedElements[index].qty = currentQty > 0 ? currentQty - 1 : 0;
    //         return updatedElements;
    //     });
    // };

    // const handleIncrement = (index: any) => {
    //     setElements((prevElements: any) => {
    //         const updatedElements = [...prevElements];
    //         updatedElements[index].qty += 1;
    //         return updatedElements;
    //     });
    // };

    const handleDecrement = (index: any) => {
        setElements((prevElements: any) => {
            const updatedElements = [...prevElements];
            updatedElements[index].qty = Math.max(0, updatedElements[index].qty - 1);
            return updatedElements;
        });
    };

    const handleIncrement = (index: any) => {
        setElements((prevElements: any) => {
            const updatedElements = [...prevElements];
            updatedElements[index].qty = parseInt(updatedElements[index].qty, 10) + 1;
            return updatedElements;
        });
    };

    // Function to handle increment

    const handleButtonEvent = (e: any) => {
        console.log(e, 'e')
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.title || e.payload || e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.fallback_url || e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    // const onChangeHandler = (e:any, index:any) => {
    //     const updatedElements = [...elements];
    //     updatedElements[index].qty = e.target.value;
    //     console.log( setElements(updatedElements),' setElements(updatedElements);')
    //     setElements(updatedElements)
    // };
    // console.log(messageObj, 'messageObj')
    // console.log(msgData?.message[0]?.component?.payload?.template_type, 't type');
    // console.log(msgData?.message[0]?.component?.payload?.card_type, ' test')
    // templates design for the order selection
    if (msgData?.message[0]?.component?.payload?.template_type === "retailOrderSelection" && msgData?.message[0]?.component?.payload?.card_type === 'detail') {
        // console.log(msgData.message[0].component?.payload, 'msgData');
        // console.log(msgData.message[0].component?.payload.elements[2].description[0].value, 'msgData');
        // const stringValue = msgData.message[0]?.component?.payload?.elements[2]?.description[0]?.value || '';
        // const sanitizedValue = stringValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
        // const numericValue = parseFloat(sanitizedValue); // Convert the sanitized string to a number

        // console.log(typeof (numericValue), 'sanitized and parsed value');



        return (
            <div>
                <div key={rerenderKey} className="list-action-template-wrapper">
                    {
                        <div>
                            <h2 className="m-title">{msgData.message[0].component?.payload?.title}</h2>
                            <div className="card-container">
                                {
                                    msgData.message[0].component?.payload?.elements?.map((ele: any, index: number) => (
                                        // ele?.flag != "ItemdetailsScreen" && (
                                        // <div>
                                        <div className={`card-template-wrapper ${ele.checkBox === "enabled" ? "check-box-style" : ""}`}>
                                            <div className="left-section">
                                                {
                                                    ele.checkBox === "enabled" && (
                                                        <div class="kr-sg-checkbox">
                                                            <input id="checkbox-1" class="checkbox-custom" type="checkbox" />
                                                        </div>
                                                    )}

                                                <img src={ele?.icon} />
                                            </div>
                                            <div className="right-section">
                                                <div className="top-right-section m-gap">
                                                    <div className="container-details m-gap">
                                                        <div className="f-left-section">
                                                            <h1 style={ele?.titleStyle}>{ele?.title}</h1>
                                                        </div>
                                                        <div className="f-right-section">
                                                            <p className="status-style" style={ele?.valueStyle}>{ele?.value}</p>
                                                        </div>
                                                    </div>
                                                    <div className="sub-title-style">
                                                        <h2 style={ele?.subTitleStyle}>{ele?.subTitle}</h2>
                                                    </div>

                                                </div>

                                                {/* {
                                            ele?.description?.map((ele: any) => (
                                                
                                                <div className="container-details-section">
                                                    <div className="details-left-section">
                                                        <p style={ele?.detailStyle}>{ele?.title}</p>
                                                    </div>
                                                    <div className="details-right-section">
                                                        <p style={ele?.detailStyle}>{ele?.value}</p>
                                                    </div>
                                                </div>
                                            ))} */}
                                                {
                                                    ele?.description?.map((detail: any, detailIndex: number) => (
                                                        <div className="container-details-section" key={detailIndex}>
                                                            <div className="details-left-section">
                                                                <p style={detail?.detailStyle}>{detail?.title}</p>
                                                            </div>
                                                            <div className="details-right-section">
                                                                <p style={detail?.detailStyle}>
                                                                    {/* Check if flag is "cartScreen" to show the calculated value */}
                                                                    {ele?.flag === 'cartScreen' ?
                                                                        `$${parseFloat(detail?.value.replace(/[^0-9.]/g, '')) * parseFloat(elements[index].qty)}`
                                                                        : detail?.value /* Else, show the default value */}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                                {
                                                    ele?.flag === "cartScreen" && (
                                                        <div className="set-qty-style" key={index}>
                                                            <div className="f-right">
                                                                {/* Your buttons and input fields */}
                                                                <button className="decrement" onClick={() => handleDecrement(index)}>
                                                                    <img src={ele?.button1?.icon} alt="Decrement" />
                                                                </button>
                                                                <input
                                                                    className="input-c"
                                                                    type="text"
                                                                    value={elements[index].qty}
                                                                />
                                                                <button className="increment" onClick={() => handleIncrement(index)}>
                                                                    <img src={ele?.button2?.icon} alt="Increment" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                ele?.buttons?.map((button: any) => (
                                                    <div className={`buttons-container ${ele.flag === "cartScreen" ? "delete-button" : ""}`}>
                                                        <button style={button?.buttonStyle} className="view-details" onClick={() => handleButtonEvent(button)}>{button?.title}</button>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        // </div>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {
                        msgData.message[0].component?.payload?.buttons &&
                        <div className="btn-style">
                            {
                                msgData.message[0].component?.payload?.buttons?.map((button: any) => (
                                    <button style={button?.buttonStyle} className="shopping-btn" onClick={() => handleButtonEvent(button)}>{button?.title}</button>
                                ))}
                        </div>
                    }
                </div>

                {
                    msgData.message[0].component?.payload?.elements?.map((ele: any, index: number) => (
                        ele?.flag === "ItemdetailsScreen" && (
                            <div className="list-action-template-wrapper">
                                {/* <h2 className="m-title">{ele?.title}</h2> */}
                                <div className="card-template-wrapper">
                                    <div className="item-details">
                                        <div className="left-section">
                                            <div className="container-details m-gap">
                                                <h1 className="title-style" style={ele?.titleStyle}>{ele?.title}</h1>

                                            </div>
                                            <div className="container-details m-gap">
                                                <h2 className="sub-title-style" style={ele?.subTitleStyle}>{ele?.subTitle}</h2>
                                            </div>
                                            {
                                                ele?.description && ele?.description?.map((ele: any, index: number) => (
                                                    <div className="description">
                                                        <div className="left-description">
                                                            <p style={ele?.detailStyle}>{ele?.title}</p>
                                                        </div>
                                                        <div className="left-description">
                                                            <p style={ele?.detailStyle}>{ele?.value}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="right-section">
                                            <img src={ele?.icon} />
                                        </div>
                                    </div>

                                    {ele?.descriptionDetails &&
                                        <div className="desc-details">
                                            {
                                                ele?.descriptionDetails?.map((ele: any, index: number) => (
                                                    <div className=" description">
                                                        {/* <div className="description"> */}
                                                        <div className="left-description">
                                                            <p style={ele?.titleStyle}>{ele?.title}</p>
                                                        </div>
                                                        <div className="right-description">
                                                            <p style={ele?.valueStyle}>{ele?.value}</p>
                                                        </div>
                                                    </div>
                                                    // </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        ele?.summaryDetails &&
                                        <div className="summary-details">
                                            {
                                                ele?.summaryDetails?.map((ele: any, index: number) => (
                                                    <div>
                                                        <div className="desc-details-title">
                                                            <h2>{ele?.title}</h2>
                                                        </div>
                                                        {
                                                            ele?.description?.map((ele: any, index: number) => (
                                                                <div className="description">
                                                                    <div className="left-description">
                                                                        <p>{ele?.title}</p>
                                                                    </div>
                                                                    <div className="right-description">
                                                                        <p>{ele?.value}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        ele?.totalSummary &&
                                        <div className="total-summary-details">
                                            {
                                                ele?.totalSummary?.map((ele: any, index: number) => (
                                                    <div>
                                                        <div className="desc-details-title">
                                                            <div className="description">
                                                                <div className="left-description">
                                                                    <h2>{ele?.title}</h2>
                                                                </div>
                                                                <div className="right-description">
                                                                    <h2>{ele?.value}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="desc-details-title">
                                                           
                                                        </div> */}
                                                        {/* {
                                                            ele?.description?.map((ele: any, index: number) => (
                                                                <div className="description">
                                                                    <div className="left-description">
                                                                        <p>{ele?.title}</p>
                                                                    </div>
                                                                    <div className="right-description">
                                                                        <p>{ele?.value}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        } */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    ))}
            </div>
        );
    }
}

class ItemSelectionList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(RetailOrderSelection, msgData, this.hostInstance);
    }
}

export default ItemSelectionList;

