import { useEffect, useRef, useState } from 'preact/hooks';
import './singleSelectDropdown.scss';
import {h, Fragment} from 'preact';
import React from 'preact/compat';

interface SingleSelectOption {
    id: string;
    label: string;
    value: string;
}

interface SingleSelectDropdownProps {
    options: SingleSelectOption[];
    selectedValue?: string;
    onSelectionChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
}

export function SingleSelectDropdown(props: SingleSelectDropdownProps): any {
    const { 
        options, 
        selectedValue, 
        onSelectionChange, 
        placeholder = "Select option",
        searchPlaceholder = "Search for.."
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        if (isOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e: any) => {   
        const value = e?.target?.value?.trim();
        if(value) setSearchTerm(value);
        else setSearchTerm('');
    };

    const handleOptionSelect = (optionValue: string) => {
        onSelectionChange(optionValue);
        setIsOpen(false);
        setSearchTerm('');
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(option => option.value === selectedValue);

    return (
        <div className="sa-answer-single-select-dropdown-wrapper kwsdk-w-100 kwsdk-position-relative" onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
            {/* Main dropdown button */}
            <button role={'button'} className={`sa-answer-single-select-dropdown kwsdk-w-100 kwsdk-d-flex kwsdk-align-items-center kwsdk-rounded kwsdk-border kwsdk-bg-white ${isOpen ? 'sa-answer-open' : ''}`}
                onClick={handleToggle}
            >
                <div className="sa-answer-dropdown-content kwsdk-flex-grow-1 kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-justify-content-between kwsdk-overflow-hidden">
                    <span className="kwsdk-text-sm kwsdk-text-truncate kwsdk-w-100">
                         {selectedOption?.label || placeholder}
                    </span>
                    <div className="sa-answer-chevron-icon kwsdk-flex-shrink-0 kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M1 1L7 7L13 1" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="sa-answer-dropdown-menu kwsdk-rounded kwsdk-border kwsdk-bg-white kwsdk-w-100 kwsdk-position-absolute kwsdk-top-100 kwsdk-left-0 kwsdk-right-0 kwsdk-mt-2 kwsdk-p-4 kwsdk-z-1000">
                    {/* Search input */}
                    <div className="sa-answer-search-section kwsdk-mb-2">
                        <div className="sa-answer-search-input kwsdk-w-100 kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-rounded kwsdk-border">
                            <div className="sa-answer-search-icon kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center kwsdk-flex-shrink-0">
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 16 16" 
                                    fill="none"
                                >
                                    <path 
                                        d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7967 10.7967 13.3333 7.66667 13.3333C4.53667 13.3333 2 10.7967 2 7.66667C2 4.53667 4.53667 2 7.66667 2C10.7967 2 13.3333 4.53667 13.3333 7.66667Z" 
                                        stroke="#667085" 
                                        strokeWidth="1.4" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onInput={handleSearchChange}
                                className="sa-answer-search-field kwsdk-flex-grow-1 kwsdk-border-0 kwsdk-bg-transparent kwsdk-text-sm"
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <div className="sa-answer-options-list kwsdk-overflow-y-auto">
                        {filteredOptions.map(option => (
                            <div 
                                key={option.id}
                                className={`sa-answer-option-item kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-justify-content-between kwsdk-py-2 kwsdk-px-3 kwsdk-rounded-1 ${selectedValue === option.value ? 'sa-answer-selected' : ''}`}
                                onClick={() => handleOptionSelect(option.value)}
                            >
                                <div className={`kwsdk-flex-grow-1 sa-answer-option-label kwsdk-text-sm kwsdk-text-truncate kwsdk-fw-normal ${option.label.length > 20 ? 'sa-answer-truncated' : ''}`}>
                                    {option.label}
                                </div>
                                {selectedValue === option.value && (
                                    <div className="sa-answer-check-icon kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center kwsdk-flex-shrink-0">
                                        <svg 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 20 20" 
                                            fill="none"
                                        >
                                            <path 
                                                d="M16.6667 5L7.5 14.1667L3.33333 10" 
                                                stroke="#079455" 
                                                strokeWidth="1.67" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
