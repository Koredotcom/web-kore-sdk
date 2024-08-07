import BaseChatTemplate from '../../../baseChatTemplate'; // Importing necessary modules and styles
import './itemSelection.scss';
import { h } from 'preact'; // Using h from preact for JSX
import { useState } from 'preact/hooks';
import IconsManager from '../../../../base/iconsManager'; // Sample import, replace with your module
import { getHTML } from '../../../../base/domManager'; // Sample import, replace with your module


// RetailOrderSelection component function
function RetailOrderSelection(props: any) {
    const hostInstance = props.hostInstance; // Assigning props
    const msgData = props.msgData;
    if (msgData?.message[0]?.component?.payload?.payload) {
        msgData.message[0].component.payload = msgData.message[0].component.payload.payload;
    }

    // State initialization
    const initialElements = msgData.message[0]?.component?.payload?.elements || [];
    const [elements, setElements] = useState(initialElements);
    const [displayLimit, setDisplayLimit] = useState(3);
    // const [isChecked, setIsChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>(Array(elements.length).fill(false));

    const handleCheckboxClick = (index: number) => {
        setCheckboxStates((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const isButtonDisabled = (buttonTitle: string) => {
        if (buttonTitle === 'Checkout') {
            const disabled = checkboxStates.some((state) => !state);
            return checkboxStates.every((state) => !state);
        }
        return false; // If other buttons should not be disabled by checkbox state
    };

    // Handling increment and decrement of quantities
    const handleDecrement = (index: any) => {
        setElements((prevElements: any) => {
            const updatedElements = [...prevElements];
            updatedElements[index].qty = Math.max(1, updatedElements[index].qty - 1);
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

    // Function to handle payload and send message
    const handleButtonEvent = (e: any) => {
        if (e?.type?.toLowerCase() == 'postback' || e?.type?.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e?.type == 'url' || e?.type == 'web_url') {
            let link = e.fallback_url || e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
        else {
            let selectedValues: any = [];
            if (e?.type === 'ContinueShopping') {
                const selectedItems = elements;
                if (selectedItems?.length) {
                    selectedItems.forEach((ele: any) => {
                        selectedValues.push({
                            id: ele.value,
                            quantity: ele.qty
                        });
                    });
                    let title = e.title || e.value;
                    let payload = {
                        title: title,
                        selectedItems: selectedValues
                    }
                    hostInstance.sendMessage(JSON.stringify(payload), { renderMsg: e.value });
                }
            } else {
                const selectedItems = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}:checked`);
                if (selectedItems?.length) {
                    selectedItems.forEach((ele: any) => {
                        let parsedEleInfo = JSON.parse(ele.value);
                        selectedValues.push({
                            id: parsedEleInfo.value,
                            quantity: parsedEleInfo.qty
                        });
                    });
                    let title = e.title || e.value;
                    let payload = {
                        title: title,
                        selectedItems: selectedValues
                    }
                    hostInstance.sendMessage(JSON.stringify(payload), { renderMsg: e.value });
                }
            }
        }
    }

    let checkboxIndex = 0; // Initialize a shared index variable
    if (msgData?.message[0]?.component?.payload?.template_type === "retailOrderSelection" && msgData?.message[0]?.component?.payload?.card_type === 'detail') {
        return (
            <div>
                <div className="list-action-template-wrapper">
                    {
                        <div>
                            <h2 className="m-title">{msgData.message[0].component?.payload?.title}</h2>
                            <div className="card-container">
                                {
                                    elements?.map((ele: any, index: number) => (
                                        ele?.flag !== "ItemdetailsScreen" && ele?.flag !== "addressTemplate" && ele?.flag !== "cancelOrderTemplate" && (
                                            // <div>
                                            <div key={index} className={`card-template-wrapper ${ele.checkBox === "enabled" ? "check-box-style" : ""}`}>
                                                <div className="left-section">
                                                    {
                                                        ele.checkBox === "enabled" && (
                                                            <div class="kr-sg-checkbox">
                                                                {/* <input id={`checkbox-${index}`} className={`checkbox-custom checkbox-input-${msgData.messageId}`} type="checkbox" value={JSON.stringify(ele)} /> */}
                                                                <input
                                                                    id={`checkbox-${index}`}
                                                                    className={`checkbox-custom checkbox-input-${msgData.messageId}`}
                                                                    type="checkbox"
                                                                    checked={!!checkboxStates[index]}
                                                                    value={JSON.stringify(ele)}
                                                                    onChange={() => handleCheckboxClick(index)}
                                                                />
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
                                                        </div>
                                                        <div className="sub-title-style">
                                                            <h2 style={ele?.subTitleStyle}>{ele?.subTitle}</h2>
                                                        </div>
                                                    </div>
                                                    {
                                                        ele?.description?.map((detail: any, detailIndex: number) => (
                                                            <div className="container-details-section" key={detailIndex}>
                                                                <div className="details-left-section">
                                                                    <p style={detail?.detailStyle}>{detail?.title}</p>
                                                                </div>
                                                                <div className="details-right-section">
                                                                    <p style={detail?.detailStyle}>
                                                                        {ele?.flag === 'cartScreen' ?
                                                                            new Intl.NumberFormat('en-US', {
                                                                                style: 'currency',
                                                                                currency: 'USD',
                                                                            }).format(parseFloat(detail?.value.replace(/[^0-9.]/g, '')) * parseFloat(elements[index].qty))
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
                                                                    {ele?.button1?.icon &&
                                                                        <button className="decrement" onClick={() => handleDecrement(index)}>
                                                                            {ele?.button1?.icon && <img src={ele?.button1?.icon} alt="Decrement" />}
                                                                        </button>}
                                                                    {ele?.button1?.icon &&
                                                                        <input
                                                                            className="input-c"
                                                                            type="text"
                                                                            readOnly
                                                                            value={elements[index].qty}
                                                                        />
                                                                    }
                                                                    {ele?.button2?.icon &&
                                                                        <button className="increment" onClick={() => handleIncrement(index)}>
                                                                            {ele?.button2?.icon && <img src={ele?.button2?.icon} alt="Increment" />}
                                                                        </button>
                                                                    }
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

                                        )
                                    )).slice(0, displayLimit)
                                }
                            </div>
                        </div>
                    }
                    {
                        elements?.map((ele: any, index: number) => (
                            (
                                ele?.flag !== "ItemdetailsScreen" && ele?.flag === "addressTemplate" && ele?.flag !== "cancelOrderTemplate" && (
                                    <div className="card-template-wrapper address-template-style" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="left-section">
                                            <img src={ele?.icon} />
                                        </div>
                                        <div className="right-section">
                                            <div className="top-right-section m-gap">
                                                <div className="container-details m-gap">
                                                    {ele?.title && <h1 style={ele?.titleStyle}>{ele?.title}</h1>}
                                                    {
                                                        ele.values && ele.values?.map((ele: any) => (
                                                            <div className="f-left-section">
                                                                <p style={ele?.style}>{ele?.title}</p>
                                                            </div>
                                                        ))
                                                    }
                                                    {ele?.value &&
                                                        <div className="f-left-section">
                                                            <p style={ele?.style}>{ele?.value}</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        )).slice(0, displayLimit)
                    }
                    {
                        elements?.map((ele: any, index: number) => (
                            (
                                ele?.flag === "cancelOrderTemplate" && (
                                    <div key={index} className="card-template-wrapper cancel-order-template-style" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="left-section">
                                            <img src={ele?.icon} />
                                        </div>
                                        <div className="right-section">
                                            <div className="top-right-section m-gap">
                                                <div className="container-details m-gap">
                                                    <h1 style={ele?.titleStyle}>{ele?.title}</h1>

                                                    {
                                                        ele.values && ele.values?.map((ele: any) => (
                                                            <div className="container-details-style ">
                                                                {ele?.title && <div className="f-left-section">
                                                                    <p style={ele?.style}>{ele?.title}</p>
                                                                </div>}
                                                                {ele?.value && <div className="f-right-section">
                                                                    <p style={ele?.style}>{ele?.value}</p>
                                                                </div>
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        )).slice(0, displayLimit)
                    }
                    {/* Button block */}
                    {
                        msgData.message[0].component?.payload?.buttons &&
                        <div className="btn-style">
                            {msgData.message[0].component?.payload?.buttons?.map((button: any, buttonIndex: number) => {
                                const isDisabled = isButtonDisabled(button?.title);
                                return (
                                    <button
                                        key={buttonIndex}
                                        style={button?.buttonStyle}
                                        className={`shopping-btn ${isDisabled ? 'disabled' : 'enabled'}`}
                                        onClick={() => handleButtonEvent(button)}
                                        disabled={isDisabled}
                                    >
                                        {button?.title}
                                    </button>
                                );
                            })}
                        </div>
                    }

                    {displayLimit >= 3 && elements.length > displayLimit && msgData?.message[0]?.component?.payload?.showMore === "true" && (
                        <div className="show-more-title" onClick={() => setDisplayLimit(displayLimit + 3)}>
                            <p>{msgData?.message[0]?.component?.payload?.showMoreTitle}</p>
                        </div>
                    )}

                </div>
                {
                    elements?.map((ele: any, index: number) => (
                        ele?.flag === "ItemdetailsScreen" && (
                            <div className="list-action-template-wrapper item-detail-screen">
                                <div key={index} className="card-template-wrapper">
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
                                                            {/* {typeof ele?.value === 'string' && ele?.value.startsWith('https://') ? (
                                                                <a href={ele?.value} target="_blank" rel="noopener noreferrer">{ele?.value}</a>
                                                            ) : (
                                                                <p>{ele?.value}</p>
                                                            )} */}
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
                                                            {typeof ele?.value === 'string' && ele?.value.startsWith('https://') ? (
                                                                <a style={ele?.valueStyle} href={ele?.value} target="_blank" rel="noopener noreferrer">{ele?.value}</a>
                                                            ) : (
                                                                <p style={ele?.valueStyle}>{ele?.value}</p>
                                                            )}
                                                            {/* test <p style={ele?.valueStyle}>{ele?.value}</p> */}
                                                        </div>
                                                    </div>
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
                    ))
                }
            </div >
        );
    }
}

class ItemSelectionList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(RetailOrderSelection, msgData, this.hostInstance);
    }
}

// {
//     title:
//     selectedItems:[
//         {
//             id:,
//             quantty
//         }
//     ]
// }

export default ItemSelectionList;

