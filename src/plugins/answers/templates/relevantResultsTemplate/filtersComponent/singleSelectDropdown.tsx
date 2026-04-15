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
        <div className="single-select-dropdown-wrapper" onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
            {/* Main dropdown button */}
            <div 
                className={`single-select-dropdown ${isOpen ? 'open' : ''}`}
                onClick={handleToggle}
            >
                <div className="dropdown-content">
                    <span className={`dropdown-text`}>
                         {placeholder}
                    </span>
                    <div className="chevron-icon">
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none"
                        >
                            <path 
                                d="M4 6L8 10L12 6" 
                                stroke="#98A2B3" 
                                strokeWidth="1.4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="dropdown-menu">
                    {/* Search input */}
                    <div className="search-section">
                        <div className="search-input">
                            <div className="search-icon">
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
                                className="search-field"
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <div className="options-list">
                        {filteredOptions.map(option => (
                            <div 
                                key={option.id}
                                className={`option-item ${selectedValue === option.value ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(option.value)}
                            >
                                <div className="option-content">
                                    <span className={`option-label ${option.label.length > 20 ? 'truncated' : ''}`}>
                                        {option.label}
                                    </span>
                                </div>
                                {selectedValue === option.value && (
                                    <div className="check-icon">
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