import './menu.scss';
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import IconsManager from '../iconsManager';
export function Menu(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        console.log('Branding Data: ', event.brandingData);
        updateBrandingInfo({ ...event.brandingData })
    });

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
    }

    return (
        <div style={{height: '300px'}}>
            <div style={{display: 'flex'}}>Menu
                <span className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </span>
            </div>
            <div class="button-template-container">
                <div class="button-temp full-width-buttons button-variation-3">
                    <button class="kr-btn"><span>Contact Sales</span></button>
                    <button class="kr-btn"><span>Contact us</span></button>
                    <button class="kr-btn"><span>Products</span></button>
                </div>
            </div>
        </div>
    );
}