import './filtersComponent.scss';
import { useState } from 'preact/hooks';
import { SingleSelectDropdown } from './singleSelectDropdown';
import { MultiSelectDropdown } from './multiSelectDropdown';
import React from 'preact/compat';
import { h } from 'preact';

interface FiltersComponentProps {
    onClose: () => void;
    onApplyFilters: (filters: DynamicFilterState) => void;
    facets?: Facet[];
    initialFilters?: DynamicFilterState;
}

interface Facet {
    fieldName: string;
    multiselect: boolean;
    name: string;
    subtype: string;
    buckets: FacetBucket[];
}

interface FacetBucket {
    key: string;
    chunk_count: number;
    doc_count: number;
}

interface DynamicFilterState {
    [key: string]: string | string[];
}

// ─── Pure helpers ─────────────────────────────────────────────────────────────

/** Builds the default (cleared) filter state from facet definitions. */
const buildDefaultFilters = (facets: Facet[]): DynamicFilterState =>
    Object.fromEntries(facets.map(facet => [facet.fieldName, facet.multiselect ? [] : '']));

/** Converts a facet's buckets into dropdown option objects. */
const getFacetOptions = (facet: Facet) =>
    facet.buckets.map(bucket => ({ id: bucket.key, label: bucket.key, value: bucket.key }));

// ─── Component ────────────────────────────────────────────────────────────────

export function FiltersComponent(props: FiltersComponentProps): any {
    const { onClose, onApplyFilters, facets = [], initialFilters } = props;

    const [filters, setFilters] = useState<DynamicFilterState>(() => ({
        ...buildDefaultFilters(facets),
        ...initialFilters
    }));

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(() =>
        Object.fromEntries(facets.map(facet => [facet.fieldName, false]))
    );

    const toggleSection = (sectionKey: string) =>
        setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));

    const handleFilterChange = (field: string, value: string | string[]) =>
        setFilters(prev => ({ ...prev, [field]: value }));

    const handleApplyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleClearAll = () => setFilters(buildDefaultFilters(facets));

    return (
        <div className="filters-content">
            <div className="filters-header">
                <div className="header-left">
                    <h2 className="filters-title">Filter Results</h2>
                </div>
                <button className="close-button" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5L15 15" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="filters-sections">
                {facets.map((facet) => {
                    if (!facet.buckets?.length) return null;

                    const options = getFacetOptions(facet);
                    const currentValue = filters[facet.fieldName];
                    const isExpanded = expandedSections[facet.fieldName];
                    const placeholder = `Select ${facet.name.toLowerCase()}`;

                    return (
                        <div key={facet.fieldName} className="filter-section">
                            <div
                                className="filter-section-header"
                                onClick={() => toggleSection(facet.fieldName)}
                            >
                                <div className="filter-title-row">
                                    <h3 className="filter-section-title">{facet.name}</h3>
                                    <div className={`chevron-down ${isExpanded ? 'expanded' : ''}`}>
                                        <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
                                            <path d="M1 1L6 5L11 1" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                {isExpanded && (
                                    <div className="filter-expanded-content">
                                        <span className="filter-description">Select {facet.name.toLowerCase()} to filter by</span>
                                        {facet.multiselect ? (
                                            <MultiSelectDropdown
                                                options={options}
                                                selectedValues={Array.isArray(currentValue) ? currentValue : []}
                                                onSelectionChange={(values) => handleFilterChange(facet.fieldName, values)}
                                                placeholder={placeholder}
                                            />
                                        ) : (
                                            <SingleSelectDropdown
                                                options={options}
                                                selectedValue={typeof currentValue === 'string' ? currentValue : ''}
                                                onSelectionChange={(value) => handleFilterChange(facet.fieldName, value)}
                                                placeholder={placeholder}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="filters-footer">
                <div className="action-buttons">
                    <button className="cancel-button" onClick={handleClearAll}>
                        Clear
                    </button>
                    <button className="apply-button" onClick={handleApplyFilters}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
