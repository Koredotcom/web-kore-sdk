import { useState, useEffect, useRef } from 'preact/hooks';
import './multiSelectDropdown.scss';
import React from 'preact/compat';
import { h, Fragment } from 'preact';

interface MultiSelectOption {
    id: string;
    label: string;
    value: string;
}

interface MultiSelectDropdownProps {
    options: MultiSelectOption[];
    selectedValues: string[];
    onSelectionChange: (selectedValues: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
}

export function MultiSelectDropdown(props: MultiSelectDropdownProps): any {
    const { 
        options, 
        selectedValues, 
        onSelectionChange, 
        placeholder = "Select options",
        searchPlaceholder = "Search for.."
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
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
        setSearchTerm(e.target.value);
    };

    const handleSelectAll = () => {
        const allValues = options.map(option => option.value);
        onSelectionChange(allValues);
    };

    const handleClearAll = () => {
        onSelectionChange([]);
    };

    const handleOptionToggle = (optionValue: string) => {
        const newSelectedValues = selectedValues.includes(optionValue)
            ? selectedValues.filter(value => value !== optionValue)
            : [...selectedValues, optionValue];
        onSelectionChange(newSelectedValues);
    };

    const handleRemoveTag = (optionValue: string) => {
        const newSelectedValues = selectedValues.filter(value => value !== optionValue);
        onSelectionChange(newSelectedValues);
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Get selected options for display
    const selectedOptions = options.filter(option => selectedValues.includes(option.value));
    
    // Show only first 4 tags by default, rest will be hidden
    const visibleTags = showAllTags ? selectedOptions : selectedOptions.slice(0, 4);
    const hiddenTagsCount = selectedOptions.length - 4;

    return (
        <div className="sa-answer-multi-select-dropdown-wrapper" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            {/* Main dropdown button */}
            <div 
                className={`sa-answer-multi-select-dropdown ${isOpen ? 'sa-answer-open' : ''}`}
                onClick={handleToggle}
            >
                <div className="sa-answer-dropdown-content">
                    <span className="sa-answer-dropdown-text">
                    {`${placeholder}`}
                    </span>
                    <div className="sa-answer-chevron-icon">
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

            {/* Selected Tags Display */}
            {selectedOptions.length > 0 && (
                <div className="sa-answer-selected-tags-container">
                    <div className="sa-answer-tags-wrapper">
                        {visibleTags.map(option => (
                            <div key={option.id} className="sa-answer-selected-tag">
                                <span className={`sa-answer-tag-text ${option.label.length > 15 ? 'sa-answer-truncated' : ''}`}>
                                    {option.label}
                                </span>
                                <button 
                                    className="sa-answer-tag-remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveTag(option.value);
                                    }}
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* Show/Hide and Clear All Actions */}
                    <div className="sa-answer-tags-actions">
                        {hiddenTagsCount > 0 && (
                            <button 
                                className="sa-answer-show-hide-btn"
                                onClick={() => setShowAllTags(!showAllTags)}
                            >
                                <svg 
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 12 12" 
                                    fill="none"
                                    className={showAllTags ? 'sa-answer-rotated' : ''}
                                >
                                    <path 
                                        d="M3 4.5L6 7.5L9 4.5" 
                                        stroke="#667085" 
                                        strokeWidth="1" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                    />
                                </svg>
                                <span>{showAllTags ? 'Hide' : `Show all (${selectedOptions.length})`}</span>
                            </button>
                        )}
                        {!hiddenTagsCount && <span />}
                        <button
                            className="sa-answer-clear-all-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClearAll();
                            }}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            {/* Dropdown menu */}
            {isOpen && (
                <div className="sa-answer-dropdown-menu">
                    {/* Search input */}
                    <div className="sa-answer-search-section">
                        <div className="sa-answer-search-input">
                            <div className="sa-answer-search-icon">
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
                                className="sa-answer-search-field"
                            />
                        </div>
                    </div>

                    {/* Select All / Clear buttons */}
                    <div className="sa-answer-action-buttons">
                        <button 
                            className="sa-answer-select-all-btn"
                            onClick={handleSelectAll}
                        >
                            Select all
                        </button>
                        <button 
                            className="sa-answer-clear-btn"
                            onClick={handleClearAll}
                        >
                            Clear
                        </button>
                    </div>

                    {/* Options list */}
                    <div className="sa-answer-options-list">
                        {filteredOptions.map(option => (
                            <div 
                                key={option.id}
                                className={`sa-answer-option-item ${selectedValues.includes(option.value) ? 'sa-answer-selected' : ''}`}
                                onClick={() => handleOptionToggle(option.value)}
                            >
                                <div className="sa-answer-checkbox">
                                    {selectedValues.includes(option.value) && (
                                        <svg 
                                            width="12" 
                                            height="12" 
                                            viewBox="0 0 12 12" 
                                            fill="none"
                                        >
                                            <path 
                                                d="M10 3L4.5 8.5L2 6" 
                                                stroke="#FFFFFF" 
                                                strokeWidth="1.67" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span className={`sa-answer-option-label ${option.label.length > 20 ? 'sa-answer-truncated' : ''}`}>
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Footer buttons */}
                    <div className="sa-answer-footer-buttons">
                        <button 
                            className="sa-answer-cancel-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className="sa-answer-apply-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
