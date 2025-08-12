/** @jsx h */
import './clickToCallSlider.scss';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { ClickToCallComponent } from './clickToCallComponent';
import React from 'preact/compat';
import { getHTML } from '../../templatemanager/base/domManager';

interface ClickToCallSliderProps {
    hostInstance: any;
    dtmfInput?: string;
}

export function ClickToCallSlider(props: ClickToCallSliderProps) {
    const { hostInstance, dtmfInput } = props;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);

    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    const closeSlider = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.remove();
        }, 150);
    }

    const openClickToCall = () => {
        closeSlider();
        hostInstance.bottomSliderAction('', getHTML(ClickToCallComponent, { hostInstance }, hostInstance), true);
    }

    return (
        <div className="click-to-call-warning-content-wrapper">
            <div className="click-to-call-warning-content">
                <div className="click-to-call-warning-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z" stroke="#DC6803" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>Connect to Voice Agent?</h1>
                <p>Your current conversation will end before connecting you to a live voice agent. Do you want to continue?</p>
            </div>
            <div className="click-to-call-warning-actions-wrapper">
                <button className="kr-button-secondary" onClick={closeSlider}>Cancel</button>
                <button className="kr-button-primary" onClick={openClickToCall}>Continue</button>
            </div>
        </div>
    );
}