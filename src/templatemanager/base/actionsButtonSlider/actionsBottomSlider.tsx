import './actionsBottomSlider.scss';
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export function ActionsBottomSlider(props: any) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (contentRef.current) {
                const firstFocusableElement = contentRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusableElement) {
                    (firstFocusableElement as HTMLElement).focus();
                }
            }
        }, 1000);
    }, []);

    return (
        <div className="chat-actions-bottom-wraper" role="dialog" aria-modal="true">
            <div className="actions-contnet-data" ref={contentRef}></div>
        </div>
    );
}

