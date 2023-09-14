import { getHTML } from '../../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import IconsManager from '../../../base/iconsManager';
import './cardTemplate.scss';
import { h, Fragment } from 'preact';


export function cardSliderExtension(props: any) {
    const sliderData = props.msgData;
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }
    const openAccordionDetails = (e: any,i: any) =>{
        if( hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.contains('collapse_data')){
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.remove('collapse_data');
        } else {
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.add('collapse_data');
        }  
    }
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{sliderData.sliderTitle}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <section className="card-info-more-details" aria-label="card template sdk">
                    {
                        sliderData.sliderInfo.map((ele: any) => (
                            <div>
                                <div className="top-sec-card">
                                    <h1>{ele.topSection.title}</h1>
                                    <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                </div>
                                {
                                    ele.middleSection.items.map((item: any) => (
                                        <div className="middle-sec-card">
                                            <div class="img-with-text">
                                                <img src={item.icon} />
                                                <p>{item.title}</p>
                                            </div>
                                            <div class="right-title">
                                                <p>{item.value}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ele.bottomSection.items.map((val: any) => (
                                        <div className="bottom-sec-card small-font-sec">
                                            <div class="img-with-text">
                                                <p style={val.titleStyles}>{val.title}</p>
                                            </div>
                                            <div class="right-title">
                                                {val.icon && <img src={val.icon} />}
                                                <p style={val.titleStyles}>{val.value}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </section>
                <div className="accordion-wrapper" id="accordion">
                    {
                        sliderData.sliderInfo.map((ele: any) => (
                            ele.moreInfo.map((item: any,i: any) => (
                                <div className="accordion_item" onClick={() => openAccordionDetails(event,i)}>
                                    <button className="accordion_heading" aria-expanded="true">
                                        <p>{item.title}</p>
                                        <div className="arrow-icon">
                                            <i className="sdkv3-cheveron-right"></i>
                                        </div>
                                    </button>
                                    <div className="accordion_collapse">
                                        <div className="accordion_body">
                                            <div className="card-acc-temp-sec">
                                                {
                                                    item.items.map((val: any) => (
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                <h1 style={val.nameStyles}>{val.name}</h1>
                                                                { val.description  && <p>{val.description}</p>}
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{val.value}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export function card(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        } else if (e.type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(cardSliderExtension, e, hostInstance));
        }
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.cardViewType === 'modern') {
        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper" aria-label="card template sdk">
                        <div className="card-warpper-info">
                            <h1>{msgData.message[0].component.payload.cards.cardHeading.title}</h1>
                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <h1>{ele.topSection.title}</h1>
                                            <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                        </div>
                                        <div className="middle-sec-card">
                                            <p>{ele.middleSection.title}</p>
                                        </div>
                                        <div className="bottom-sec-card">
                                            <h2>{ele.bottomSection.title}</h2>
                                            <p>
                                                <time>{ele.bottomSection.details.title}</time>
                                            </p>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    } else if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.cardViewType === 'details') {
        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper-view-more-details" aria-label="card template sdk">
                        {
                            msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                <div className="card-content-sec">
                                    <div className="top-sec-card">
                                        <h1>{ele.topSection.title}</h1>
                                        <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                    </div>
                                    <div className="middle-sec-card">
                                        <p>{ele.topSection.subTitle}</p>
                                    </div>
                                    {
                                        ele.topSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}</h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.middleSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}<span style={val.subTitleStyles}>{val.subTitle}</span></h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.bottomSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}</h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    {
                                        msgData.message[0].component.payload.cards.buttonActions.map((button: any) => (
                                            <button className="view-more-btn" onClick={() => handleButtonEvent(button)} >{button.title}</button>
                                        ))
                                    }
                                </div>
                            ))
                        }

                    </section>
                </div>
            </Fragment>
        );
    } else if(msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate') {
        return (
            <div className="regular-card-temp-container">
                <div className="rugular-card-temp">
                    <div className="r-header-card">
                        <h1>It is a long established fact that a reading...</h1>
                    </div>
                    <div className="r-body-card">
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg=="/>
                            </figure>
                            <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII="/>
                            </figure>
                            <p>WebEx</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGbSURBVHgBdVJNTgJRDG77iBpXHAFPICTuxRu4cydPNHFc6dIdegLZMQt+Bj2AcAJgbwKeALgBbogY5tV2zEMY9CWTee18/fr16yCkjrV32SUsikSc19g5HGVgtx9F1dk6zqwH55fXt0DLDhHkJJxqTu5nkrs/LBxl34dvA49FfymVg5ZEOYzhIorCyaaKIMcGWnKdtBvhxarwvBxUEKEoyRMvN6a5TSQ56nii0mXQc4zdl2atStbarBRZ7fTL/jkkpENEykunnhIlXQRDCBWNaWl2iirBs8bkTuXVV0nPjdAywCCmRdL9B8MjMPNihlhY5SP8c2QW5rVYggED5TNpoHFfEZvdsczjS0+N48c0jhy6kcx47E1hs/cq4JF0+dBHWszY8NNqTsGS1qg52gFjLIgR6u40qocPG+u4Ch5E4rGawwQ9dHuFZB22fHPH6CrAOGs3wwP448iexzqwELeVmBK3ZC8M2JXsTNeRLkpymBg18GpwS5KDkmQn6p6fSebMI9FjVK9V19xOs4sJsicna0rcEyMg3t/6yb8BlCK9m52XgX8AAAAASUVORK5CYII="/>
                            </figure>
                            <p>Text Info Title</p>
                        </div>
                    </div>
                    <button className="btn-action-card">Button</button>
                </div>
                <div className="rugular-card-temp">
                    <div class="card-r-h-1">
                        <div class="img-block">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=="/>
                            </figure>        
                        </div>
                        <div class="titles-info-block">
                            <h1>Title text [with default view]</h1>
                            <p>See more action dropdown and display limit 3</p>
                        </div>
                    </div>
                    <div className="r-body-card" style="border:0px;">
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg=="/>
                            </figure>
                            <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII="/>
                            </figure>
                            <p>WebEx</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGbSURBVHgBdVJNTgJRDG77iBpXHAFPICTuxRu4cydPNHFc6dIdegLZMQt+Bj2AcAJgbwKeALgBbogY5tV2zEMY9CWTee18/fr16yCkjrV32SUsikSc19g5HGVgtx9F1dk6zqwH55fXt0DLDhHkJJxqTu5nkrs/LBxl34dvA49FfymVg5ZEOYzhIorCyaaKIMcGWnKdtBvhxarwvBxUEKEoyRMvN6a5TSQ56nii0mXQc4zdl2atStbarBRZ7fTL/jkkpENEykunnhIlXQRDCBWNaWl2iirBs8bkTuXVV0nPjdAywCCmRdL9B8MjMPNihlhY5SP8c2QW5rVYggED5TNpoHFfEZvdsczjS0+N48c0jhy6kcx47E1hs/cq4JF0+dBHWszY8NNqTsGS1qg52gFjLIgR6u40qocPG+u4Ch5E4rGawwQ9dHuFZB22fHPH6CrAOGs3wwP448iexzqwELeVmBK3ZC8M2JXsTNeRLkpymBg18GpwS5KDkmQn6p6fSebMI9FjVK9V19xOs4sJsicna0rcEyMg3t/6yb8BlCK9m52XgX8AAAAASUVORK5CYII="/>
                            </figure>
                            <p>Text Info Title</p>
                        </div>
                    </div>
                </div>
                <div className="rugular-card-temp">
                    <div class="card-r-h-1">
                        <div class="img-block">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=="/>
                            </figure>        
                        </div>
                        <div class="titles-info-block">
                            <h1>Title text [with default view]</h1>
                            <p>See more action dropdown and display limit 3</p>
                        </div>
                    </div>
                    <div className="r-body-card" style="border:0px;">
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg=="/>
                            </figure>
                            <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII="/>
                            </figure>
                            <p>WebEx</p>
                        </div>
                        <div className="row-list-info">
                            <figure>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGbSURBVHgBdVJNTgJRDG77iBpXHAFPICTuxRu4cydPNHFc6dIdegLZMQt+Bj2AcAJgbwKeALgBbogY5tV2zEMY9CWTee18/fr16yCkjrV32SUsikSc19g5HGVgtx9F1dk6zqwH55fXt0DLDhHkJJxqTu5nkrs/LBxl34dvA49FfymVg5ZEOYzhIorCyaaKIMcGWnKdtBvhxarwvBxUEKEoyRMvN6a5TSQ56nii0mXQc4zdl2atStbarBRZ7fTL/jkkpENEykunnhIlXQRDCBWNaWl2iirBs8bkTuXVV0nPjdAywCCmRdL9B8MjMPNihlhY5SP8c2QW5rVYggED5TNpoHFfEZvdsczjS0+N48c0jhy6kcx47E1hs/cq4JF0+dBHWszY8NNqTsGS1qg52gFjLIgR6u40qocPG+u4Ch5E4rGawwQ9dHuFZB22fHPH6CrAOGs3wwP448iexzqwELeVmBK3ZC8M2JXsTNeRLkpymBg18GpwS5KDkmQn6p6fSebMI9FjVK9V19xOs4sJsicna0rcEyMg3t/6yb8BlCK9m52XgX8AAAAASUVORK5CYII="/>
                            </figure>
                            <p>Text Info Title</p>
                        </div>
                    </div>
                    <button className="btn-action-card">Button</button>
                </div>

                <div className="rugular-card-temp">
                    <div class="card-r-h-1">
                        <div class="border-block"></div>
                        <div class="titles-info-block">
                            <h1>Title text [with default view]</h1>
                            <p>See more action dropdown and display limit 3</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class cardTemplate extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplate;