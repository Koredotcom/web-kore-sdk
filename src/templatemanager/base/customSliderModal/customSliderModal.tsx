import '../menu/menu.scss';
import './customSliderModal.scss';
import { h } from 'preact';
import { getHTML } from '../domManager';

/** Popup style: warning, error, info, success. Extend the union and `defaultCopy` when adding a state. */
export type CustomSliderModalVariant = 'warning' | 'error' | 'info' | 'success';

export interface CustomSliderModalOptions {
    variant?: CustomSliderModalVariant;
    title?: string;
    body?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    /** Default true. Set false for a single primary action. */
    showSecondaryButton?: boolean;
}

const defaultCopy: Record<
    CustomSliderModalVariant,
    { title: string; body: string; primaryLabel: string; secondaryLabel: string }
> = {
    warning: {
        title: 'Recording started',
        body: 'This video call will now be recorded to help improve our services. Please do not share sensitive information like passwords or OTPs. If you are not comfortable with recording, let the agent know or you may end the call.',
        primaryLabel: 'Proceed',
        secondaryLabel: 'Decline',
    },
    error: {
        title: 'Something went wrong',
        body: 'We could not complete this action. Please try again or contact support if the problem continues.',
        primaryLabel: 'Try again',
        secondaryLabel: 'Dismiss',
    },
    info: {
        title: 'Heads up',
        body: 'Here is some information you should know before continuing.',
        primaryLabel: 'Continue',
        secondaryLabel: 'Cancel',
    },
    success: {
        title: 'Done',
        body: 'Your action completed successfully.',
        primaryLabel: 'OK',
        secondaryLabel: 'Close',
    },
};

function closeBottomSlider(hostInstance: any) {
    const wrap = hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper');
    if (!wrap) {
        return;
    }
    wrap.classList.add('close-bottom-slide');
    setTimeout(() => {
        wrap.remove();
    }, 150);
}

function IconForVariant(props: { variant: CustomSliderModalVariant }) {
    const { variant } = props;
    if (variant === 'warning') {
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
    if (variant === 'error') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (variant === 'info') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8 12.5L11 15.5L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/** Custom bottom-slider modal: warning-style popup (and error / info / success variants). */
export function CustomSliderModal(props: any) {
    const hostInstance = props.hostInstance;
    const opts: CustomSliderModalOptions = props.msgData && typeof props.msgData === 'object' ? props.msgData : {};
    const variant: CustomSliderModalVariant = opts.variant && defaultCopy[opts.variant] ? opts.variant : 'warning';
    const defaults = defaultCopy[variant];
    const title = opts.title ?? defaults.title;
    const body = opts.body ?? defaults.body;
    const primaryLabel = opts.primaryLabel ?? defaults.primaryLabel;
    const secondaryLabel = opts.secondaryLabel ?? defaults.secondaryLabel;
    const showSecondary = opts.showSecondaryButton !== false;

    const close = () => closeBottomSlider(hostInstance);

    return (
        <div
            className={`menu-wrapper-data-actions custom-slider-modal custom-slider-modal--${variant}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="custom-slider-modal-title"
        >
            <div className="iner-data-scroll-wraper custom-slider-modal__body">
                <div className="custom-slider-modal__icon" aria-hidden="true">
                    <IconForVariant variant={variant} />
                </div>
                <h1 id="custom-slider-modal-title">{title}</h1>
                <p>{body}</p>
                <div className="custom-slider-modal__actions">
                    {showSecondary && (
                        <button className="kr-button-secondary lg" type="button" onClick={close}>
                            {secondaryLabel}
                        </button>
                    )}
                    <button className="kr-button-primary lg" type="button" onClick={close}>
                        {primaryLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Opens the bottom slider with {@link CustomSliderModal} content. */
export function openCustomSliderModal(hostInstance: any, options?: CustomSliderModalOptions) {
    hostInstance.bottomSliderAction('', getHTML(CustomSliderModal, options ?? {}, hostInstance));
}
