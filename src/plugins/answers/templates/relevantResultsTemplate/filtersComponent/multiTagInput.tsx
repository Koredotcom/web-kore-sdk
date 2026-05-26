import { useState } from 'preact/hooks';
import { h } from 'preact';
import './multiTagInput.scss';

interface MultiTagInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export function MultiTagInput(props: MultiTagInputProps): any {
    const { 
        placeholder = "Select file types", 
        value = "", 
        onChange, 
        onFocus, 
        onBlur 
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const handleChange = (e: any) => {
        onChange?.(e.target.value);
    };

    return h('div', { className: "sa-answer-multi-tag-input-wrapper kwsdk-w-100" }, [
        h('div', { 
            className: `sa-answer-multi-tag-input kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-py-2 kwsdk-px-3 kwsdk-border kwsdk-rounded kwsdk-bg-white ${isFocused ? 'sa-answer-focused' : ''}`,
            onClick: handleFocus
        }, [
            h('div', { className: "sa-answer-input-content kwsdk-flex-grow-1 kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2" }, [
                h('span', { className: "sa-answer-input-text kwsdk-text-sm kwsdk-fw-normal" }, value || placeholder)
            ]),
            h('div', { className: "sa-answer-chevron-icon kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center kwsdk-flex-shrink-0" }, [
                h('svg', { 
                    width: "16", 
                    height: "16", 
                    viewBox: "0 0 16 16", 
                    fill: "none" 
                }, [
                    h('path', { 
                        d: "M4 6L8 10L12 6", 
                        stroke: "var(--theme-panel-wigdet-secondary-text-color)", 
                        strokeWidth: "1.4", 
                        strokeLinecap: "round", 
                        strokeLinejoin: "round" 
                    })
                ])
            ])
        ])
    ]);
}
