/** @jsx h */
import { h } from 'preact';
import { getHTML } from '../../templatemanager/base/domManager';
import './recordingConsentSlider.scss';

interface RecordingConsentSliderProps {
    hostInstance: any;
}

function closeRecordingConsentSlider(hostInstance: any) {
    if (hostInstance?.config?.UI?.version == 'v2') {
        if (typeof hostInstance?.bottomSliderAction === 'function') {
            hostInstance.bottomSliderAction('hide');
        }
        return;
    }

    const wrap = hostInstance?.chatEle?.querySelector('.chat-actions-bottom-wraper');
    if (!wrap) {
        return;
    }

    wrap.classList.add('close-bottom-slide');
    setTimeout(() => {
        wrap.remove();
    }, 150);
}

function WarningIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function RecordingConsentSlider(props: RecordingConsentSliderProps) {
    const { hostInstance } = props;

    const proceedAction = () => {
        if (typeof hostInstance?.emit === 'function') {
            hostInstance.emit('video_call_recording_proceed');
        }
        closeRecordingConsentSlider(hostInstance);
    };

    const declineAction = () => {
        if (typeof hostInstance?.emit === 'function') {
            hostInstance.emit('video_call_recording_decline');
        }
        closeRecordingConsentSlider(hostInstance);
    };

    return (
        <div
            className="menu-wrapper-data-actions recording-consent-slider"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recording-consent-slider-title"
        >
            <div className="iner-data-scroll-wraper recording-consent-slider__body">
                <div className="recording-consent-slider__icon" aria-hidden="true">
                    <WarningIcon />
                </div>
                <h1 id="recording-consent-slider-title">Recording started</h1>
                <p>
                    This video call will now be recorded to help improve our services. Please do not share sensitive information like passwords or OTPs. If you are not comfortable with recording, let the agent know or you may end the call.
                </p>
                <div className="recording-consent-slider__actions">
                    <button className="kr-button-secondary lg" type="button" onClick={declineAction}>
                        Decline
                    </button>
                    <button className="kr-button-primary lg" type="button" onClick={proceedAction}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}

export function openRecordingConsentSlider(hostInstance: any) {
    hostInstance.bottomSliderAction('', getHTML(RecordingConsentSlider, { hostInstance }, hostInstance));
}
