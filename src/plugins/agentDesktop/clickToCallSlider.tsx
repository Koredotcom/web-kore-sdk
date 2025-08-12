/** @jsx h */
import './clickToCallSlider.scss';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { ClickToCallComponent } from './clickToCallComponent';
import React from 'preact/compat';

interface ClickToCallSliderProps {
    hostInstance: any;
    dtmfInput?: string;
}

export function ClickToCallSlider(props: ClickToCallSliderProps) {
    const { hostInstance, dtmfInput } = props;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    const [showWarningPopup, setShowWarningPopup] = useState(true);

    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    const closeSlider = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.remove();
        }, 150);
    }

    const proceedToCall = () => {
        setShowWarningPopup(false);
    }

    return (
        <div className="click-to-call-slider-wrapper">
            {showWarningPopup ? (
                <React.Fragment>
                    <div className="actions-slider-header-c2c">
                        <h1>Connect to Voice Agent</h1>
                        <button className="slider-close" role="contentinfo" aria-label="close" onClick={closeSlider}>
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                            </svg>
                        </button>
                    </div>
                    <div className="c2c-warning-content">
                        <div className="warning-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="warning-text">
                            <p>You will be connected to a live voice agent{dtmfInput && ` at ${dtmfInput}`}. Your current conversation will end before connecting. Do you want to continue?</p>
                        </div>
                        <div className="warning-actions">
                            <button className="btn-cancel" onClick={closeSlider}>Cancel</button>
                            <button className="btn-continue" onClick={proceedToCall}>Continue</button>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <ClickToCallComponent 
                    hostInstance={hostInstance} 
                    setShowClickToCallWidget={() => closeSlider()} 
                    dtmfInput={dtmfInput}
                    autoInit={true}
                />
            )}
        </div>
    );
}