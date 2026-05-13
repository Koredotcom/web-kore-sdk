import './filtersComponent.scss';
import { useState } from 'preact/hooks';
import { SingleSelectDropdown } from './singleSelectDropdown';
import { MultiSelectDropdown } from './multiSelectDropdown';
import React from 'preact/compat';
import { h } from 'preact';
import { ImageCarouselSvgIcons } from '../../imagePreviewTemplate/imageCarouselSvgIcons';

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
        <div className="sa-answer-filters-content kwsdk-w-100 kwsdk-d-flex kwsdk-flex-column kwsdk-overflow-hidden kwsdk-h-100">
            <div className="sa-answer-filters-header kwsdk-w-100 kwsdk-d-flex kwsdk-justify-content-between kwsdk-align-items-center kwsdk-p-4">
                <h2 className="sa-answer-filters-title kwsdk-text-sm semibold kwsdk-text-truncate">Filter Results</h2>
                <button className="sa-answer-close-button kwsdk-btn-link" onClick={onClose}>
                    <ImageCarouselSvgIcons type="close-button" />
                </button>
            </div>

            <div className="sa-answer-filters-sections kwsdk-flex-grow-1 kwsdk-overflow-y-auto kwsdk-p-4 kwsdk-pt-0 kwsdk-d-flex kwsdk-flex-column kwsdk-gap-2">
                {facets.map((facet) => {
                    if (!facet.buckets?.length) return null;

                    const options = getFacetOptions(facet);
                    const currentValue = filters[facet.fieldName];
                    const isExpanded = expandedSections[facet.fieldName];
                    const placeholder = `Select ${facet.name.toLowerCase()}`;

                    return (
                        <div key={facet.fieldName} className="sa-answer-filter-section kwsdk-d-flex kwsdk-flex-column kwsdk-w-100">
                            <div className="sa-answer-filter-section-header kwsdk-border-bottom kwsdk-pt-3 kwsdk-pb-3" onClick={() => toggleSection(facet.fieldName)}>
                                <div className="sa-answer-filter-title-row kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-between kwsdk-w-100">
                                    <h3 className="sa-answer-filter-section-title kwsdk-text-sm semibold kwsdk-text-truncate kwsdk-flex-grow-1 kwsdk-text-truncate kwsdk-w-100 kwsdk-m-0">{facet.name}</h3>
                                    <div className={`sa-answer-chevron-down kwsdk-flex-shrink-0 kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center ${isExpanded ? 'sa-answer-expanded' : ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {isExpanded && (
                                    <div className="sa-answer-filter-expanded-content">
                                        <div className="sa-answer-filter-description kwsdk-mb-1 kwsdk-text-xs medium">Select {facet.name.toLowerCase()} to filter by</div>
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

            <div className="sa-answer-filters-footer kwsdk-p-4 kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-end kwsdk-gap-2">
                <button className="kr-button-secondary kwsdk-w-auto" onClick={handleClearAll}>
                    Clear
                </button>
                <button className="kr-button-primary kwsdk-w-auto" onClick={handleApplyFilters}>
                    Apply
                </button>
            </div>
        </div>
    );
}
