import './relevantResults.scss';
import { h, Fragment, render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { FiltersComponent } from './filtersComponent/filtersComponent';
import { ImageCarouselSvgIcons } from '../imagePreviewTemplate/imageCarouselSvgIcons';
import { ImagePreviewTemplate } from '../imagePreviewTemplate/imagePreviewTemplate';
import { RelevantResultsSvgIcons, RenderFileIcons } from './relevantResultsSvgIcons';
import React from 'preact/compat';
import { TableContentBlock } from '../tablePreviewTemplate/tablePreviewUtils';

interface SearchResultsSliderProps {
    msgData?: any;
    hostInstance?: any;
}

interface ResultCard {
    id: string;
    text: string;
    fileInfo: {
        type: string;
        name: string;
        resultCount?: number;
        fileType?: string;
        recordUrl?: string;
        imageUrls?: Array<string>;
    };
    relatedResults?: ResultCard[];
    isExpanded?: boolean;
}

interface FilterState {
    [key: string]: string | string[];
}

// ─── Pure helpers (no component state dependency) ────────────────────────────

const getImageUrls = (chunkMeta: any): string[] => {
    if (!chunkMeta || chunkMeta.imageUrl === undefined) return [];
    return Array.isArray(chunkMeta.imageUrl) ? chunkMeta.imageUrl : [chunkMeta.imageUrl];
};

const buildChunkDataMap = (chunkResult: Record<string, any[]> | any[]): { [key: string]: any } => {
    const map: { [key: string]: any } = {};
    const items: any[] = Array.isArray(chunkResult)
        ? chunkResult
        : Object.values(chunkResult).flat();
    items?.forEach((chunk: any) => {
        if (chunk.additionalInfo?.chunkId) {
            map[chunk.additionalInfo.chunkId] = chunk;
        }
    });
    return map;
};

const getSelectedSourceData = (results: any, sourceId: string): any[] => {
    if (sourceId === 'all') {
        return Object.values(results).reduce(
            (acc: any[], source: any) => (source?.data ? [...acc, ...source.data] : acc),
            []
        );
    }
    return results[sourceId]?.data || [];
};

const buildResultCard = (item: any, chunkDataMap: { [key: string]: any }): ResultCard => {
    const firstChunk = chunkDataMap[item.chunkResults[0]] || {};
    const toArray = (val: any): string[] => {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
      };
    const relatedResults = item.chunkResults.slice(1).map((chunkId: string, chunkIndex: number) => {
        const chunk = chunkDataMap[chunkId] || {};
          const imageUrls = toArray(chunk.page_image_url ?? chunk.chunkMeta?.imageUrl ?? chunk.image_url);
        return {
            id: `${item.docId}-${chunkIndex}`,
            text: chunk.chunkText || 'No text available',
            fileInfo: {
                type: chunk.sourceType,
                name: item.recordTitle,
                imageUrls: imageUrls,
                fileType: chunk.sys_file_type || chunk.additionalInfo?.sys_file_type || chunk?.fileType,
                recordUrl: chunk.recordUrl
            }
        };
    });
    const firstImgUrls = toArray(firstChunk.page_image_url ?? firstChunk.chunkMeta?.imageUrl ?? firstChunk.image_url);
    return {
        id: item.docId,
        text: firstChunk.chunkText || 'No text available',
        fileInfo: {
            type: firstChunk.sourceType,
            name: item.recordTitle,
            resultCount: item.chunkResults.length,
            imageUrls: firstImgUrls,
            fileType: firstChunk.sys_file_type || firstChunk.additionalInfo?.sys_file_type || firstChunk?.fileType,
            recordUrl: firstChunk.recordUrl
        },
        relatedResults,
        isExpanded: false
    };
};

// ─── Exported render helpers ──────────────────────────────────────────────────

export const showFileUrl = (image_urls: any, title: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.id = 'sa-img-carousel-popup-container';
    document.body.appendChild(tempDiv);
    const urls = Array.isArray(image_urls) ? image_urls : [image_urls];
    render(<ImagePreviewTemplate data={{ image_urls: urls, title }} />, tempDiv);
};

export const renderImageWithZoom = (src: string, title: string, onClick: () => void) => (
    <div className="sa-answer-image-thumbnail-wrapper kwsdk-rounded-1 kwsdk-overflow-hidden kwsdk-position-relative kwsdk-flex-shrink-1" onClick={onClick}>
        <img className="sa-answer-result-text-image-img kwsdk-rounded-1 kwsdk-d-block kwsdk-w-100 kwsdk-h-100" src={src} alt="Result" />
        <div className="sa-answer-image-zoom-overlay kwsdk-rounded-1 kwsdk-position-absolute kwsdk-z-10 kwsdk-pe-none kwsdk-top-50 kwsdk-start-50 kwsdk-flex kwsdk-align-items-center kwsdk-justify-content-center">
            <RelevantResultsSvgIcons type="zoom-icon" />
        </div>
    </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const SEARCH_RESULTS_DATA: ResultCard[] = [];

export function RelevantResults(props: SearchResultsSliderProps): any {
    const { msgData } = props?.msgData;
    const [resultsData, setResultsData] = useState<ResultCard[]>(SEARCH_RESULTS_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedTexts, setExpandedTexts] = useState<{ [key: string]: boolean }>({});
    const [showSourceDropdown, setShowSourceDropdown] = useState(false);
    const [selectedSource, setSelectedSource] = useState({ id: 'all', label: 'All Sources', icon: 'document' });
    const [activeFilters, setActiveFilters] = useState<FilterState>({});
    const [isLoading, setIsLoading] = useState(true);

    const sourceDropdownRef = useRef<HTMLDivElement>(null);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const isSearchLoadingRef = useRef(false);
    const pendingFilterResultsRef = useRef<ResultCard[] | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(e.target as Node)) {
                setShowSourceDropdown(false);
            }
        };
        if (showSourceDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSourceDropdown]);
    // Re-map results whenever the selected source or message data changes
    useEffect(() => {
        if (msgData?.template) {
            setIsLoading(true);
            setTimeout(() => {
                setResultsData(filterResultsByFacets(activeFilters));
                setIsLoading(false);
            }, 0);
        }
    }, [selectedSource, msgData]);

    // Clear loading after the debounced searchQuery state value is applied
    useEffect(() => {
        if (!isSearchLoadingRef.current) return;
        isSearchLoadingRef.current = false;
        setIsLoading(false);
    }, [searchQuery]);

    const getTotalResultCount = (filtered: ResultCard[]): number => {
        const hasSearchQuery = searchQuery.trim().length > 0;
        const hasActiveFilters = Object.values(activeFilters).some(v =>
            Array.isArray(v) ? v.length > 0 : v && v !== '' && v !== 'all'
        );

        if (hasSearchQuery || hasActiveFilters) {
            return filtered.reduce(
                (total, card) => total + 1 + (card.relatedResults?.length || 0), 0
            );
        }

        if (!msgData?.template?.results) return 0;
        if (selectedSource.id === 'all') {
            return Object.values(msgData.template.results).reduce(
                (total: number, source: any) => total + (source?.doc_count || 0), 0
            );
        }
        return msgData.template.results[selectedSource.id]?.doc_count || 0;
    };

    const getIcon = (type: string): string => {
        switch (type) {
            case 'all': return 'all-sources-icon';
            case 'file': return 'pdf';
            default: return type;
        }
    };

    const getSourceOptions = () => {
        let tabFacets = msgData.template.tabFacet;
        if(Array.isArray(tabFacets)){
            tabFacets = tabFacets[0];
        }
        const sourceOptions = tabFacets.buckets.map((tab: any) => ({
            id: tab.key,
            label: tab.name,
            icon: getIcon(tab.key)
        }));
        sourceOptions.unshift({ id: 'all', label: 'All Sources', icon: 'all-sources-icon' });
        return sourceOptions;
    };

    const handleClose = () => {
        if (props.hostInstance?.chatEle) {
            props.hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.classList?.add('close-bottom-slide');
            setTimeout(() => {
                props.hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.remove();
            }, 150);
        }
    };

    const handleSearch = (e: any) => {
        const value = e.target.value;
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        isSearchLoadingRef.current = true;
        setIsLoading(true);
        searchDebounceRef.current = setTimeout(() => setSearchQuery(value), 300);
    };

    const getFilteredResultsData = (): ResultCard[] => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return resultsData;
        return resultsData.filter(card => {
            if (card.text?.toLowerCase().includes(query) || card.fileInfo?.name?.toLowerCase().includes(query)) return true;
            return card.relatedResults?.some(
                related => related.text?.toLowerCase().includes(query) || related.fileInfo?.name?.toLowerCase().includes(query)
            ) ?? false;
        });
    };

    const handleSourceFilter = () => setShowSourceDropdown(prev => !prev);

    const handleSourceSelect = (source: { id: string; label: string; icon: string }) => {
        setIsLoading(true);
        setSelectedSource(source);
        setShowSourceDropdown(false);
    };

    const handleMoreFilters = () => setShowFilters(true);
    const handleCloseFilters = () => {
        if (pendingFilterResultsRef.current !== null) {
            const results = pendingFilterResultsRef.current;
            pendingFilterResultsRef.current = null;
            // Show spinner in main view first, then apply results
            setIsLoading(true);
            setShowFilters(false);
            setTimeout(() => {
                setResultsData(results);
                setIsLoading(false);
            }, 0);
        } else {
            setShowFilters(false);
        }
    };

    const filterResultsByFacets = (filters: FilterState): ResultCard[] => {
        if (!msgData?.template?.chunk_result) return [];
        const chunkDataMap = buildChunkDataMap(msgData.template.chunk_result || {});
        const sourceData = getSelectedSourceData(msgData.template.results, selectedSource.id);

        const filteredData = sourceData.filter((item: any) =>
            item.chunkResults.some((chunkId: string) => {
                const chunkData = chunkDataMap[chunkId];
                if (!chunkData) return false;
                return Object.entries(filters).every(([fieldName, filterValue]) => {
                    if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return true;
                    const chunkFieldValue = chunkData[fieldName] || chunkData['additionalInfo'][fieldName];
                    if (chunkFieldValue === undefined) return false;
                    return Array.isArray(filterValue)
                        ? filterValue.includes(chunkFieldValue)
                        : chunkFieldValue === filterValue;
                });
            })
        );

        return filteredData.map((item: any) => buildResultCard(item, chunkDataMap));
    };

    const handleApplyFilters = (filters: FilterState) => {
        setActiveFilters(filters);
        if (msgData?.template) {
            pendingFilterResultsRef.current = filterResultsByFacets(filters);
        }
    };

    const handleClearFilters = () => {
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        isSearchLoadingRef.current = false;
        pendingFilterResultsRef.current = null;
        if (searchInputRef.current) searchInputRef.current.value = '';
        setSearchQuery('');
        setIsLoading(true);
        setActiveFilters({});
        setSelectedSource({ id: 'all', label: 'All Sources', icon: 'document' });
    };

    const handleViewRelatedResults = (cardId: string) => {
        setResultsData(prev => prev.map(card => card.id === cardId ? { ...card, isExpanded: true } : card));
    };

    const handleHideRelatedResults = (cardId: string) => {
        setResultsData(prev => prev.map(card => card.id === cardId ? { ...card, isExpanded: false } : card));
    };

    const handleTextToggle = (cardId: string) => {
        setExpandedTexts(prev => ({ ...prev, [cardId]: !prev[cardId] }));
    };

    const renderTextToggle = (cardId: string, isExpanded: boolean) => (
        isExpanded
            ? <button className="sa-answer-see-less-link kwsdk-text-xs kwsdk-p-0 kwsdk-border-0 kwsdk-outline-none kwsdk-bg-transparent kwsdk-p-0" onClick={() => handleTextToggle(cardId)}>see less</button>
            : <button className="sa-answer-see-more-link kwsdk-text-xs kwsdk-position-absolute kwsdk-bg-white kwsdk-z-1 kwsdk-p-0 kwsdk-border-0 kwsdk-outline-none kwsdk-p-0" onClick={() => handleTextToggle(cardId)}>...see more</button>
    );

    // Shared renderer for both main card and related card text sections
    const renderTextContent = (
        cardId: string,
        text: string,
        imageUrls: string[] | undefined,
        name: string,
        isExpanded: boolean,
        shouldShowBadge: boolean
    ) => {
        const hasInlineImage = !isExpanded && !!imageUrls?.length && !!imageUrls[0];
        const isSingleImage = hasInlineImage && imageUrls!.length === 1;

        const inlineImgEl = hasInlineImage
            ? renderImageWithZoom(imageUrls![0], name, () => showFileUrl(imageUrls![0], name))
            : null;

        const moreImagesEl = imageUrls?.length
            ? (
                <div className="sa-answer-more-images-block">
                    {imageUrls.map((image, i) =>
                        renderImageWithZoom(image, name, () => showFileUrl(imageUrls![i], name))
                    )}
                </div>
            )
            : null;

        return (
            <div className={`sa-answer-text-container kwsdk-position-relative ${isSingleImage ? 'sa-answer-image-with-text' : ''}`}>
                {/* TableContentBlock splits text at the first markdown table so text
                    and table are always in separate DOM elements — no DOM manipulation
                    needed, so lineClamp on the text div works correctly and the table
                    scroll wrapper is never clipped by overflow:hidden. */}
                <TableContentBlock
                    text={text}
                    title={name}
                    textClassName="sa-answer-result-text kwsdk-line-clamp-3 kwsdk-text-xs"
                    isExpanded={isExpanded}
                    className="sa-answer-result-text-image"
                    extraChildren={inlineImgEl}
                    inlineChildren={moreImagesEl}
                />
                {shouldShowBadge && renderTextToggle(cardId, isExpanded)}
            </div>
        );
    };

    const renderSourceDropdown = () => {
        if (!showSourceDropdown) return null;
        return (
            <div className="sa-answer-source-dropdown kwsdk-position-absolute kwsdk-top-100 kwsdk-left-0 kwsdk-z-1 kwsdk-bg-white kwsdk-rounded-2 kwsdk-border kwsdk-p-1">
                {getSourceOptions().map((option: any) => (
                    <button role="button" tabIndex={0} key={option.id} className="sa-answer-dropdown-item kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-p-2 kwsdk-w-100 kwsdk-text-left kwsdk-bg-white kwsdk-border-0 kwsdk-outline-none kwsdk-bg-transparent" onClick={() => handleSourceSelect(option)}>
                        <div className="sa-answer-dropdown-item-icon kwsdk-flex-shrink-0 kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center">
                            <RenderFileIcons type={option.icon} hostInstance={props.hostInstance} />
                        </div>
                        <span className={`sa-answer-dropdown-item-text kwsdk-text-sm medium kwsdk-text-truncate`}>
                            {option.label}
                        </span>
                    </button>
                ))}
            </div>
        );
    };

    const openUrl = (url: string) => { if (url) window.open(url, '_blank'); };

    const renderResultCard = (card: ResultCard) => {
        const isTextExpanded = expandedTexts[card.id] || false;
        const shouldShowBadge = card.text.length > 80;

        return (
            <div key={card.id} className={`sa-answer-result-card kwsdk-w-100 kwsdk-bg-white kwsdk-rounded-2 kwsdk-border ${card.isExpanded ? 'sa-answer-with-related' : ''}`}>
                <div className="sa-answer-result-header kwsdk-gap-2 kwsdk-d-flex kwsdk-align-items-center kwsdk-w-100">
                    <div className="sa-answer-file-info-wrapper kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-flex-grow-1 kwsdk-w-100 kwsdk-overflow-hidden">
                        <div className={`sa-answer-file-icon kwsdk-flex-shrink-0 kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center ${card.fileInfo.type}`}>
                            <RenderFileIcons type={card.fileInfo.fileType || card.fileInfo.type} hostInstance={props.hostInstance} />
                        </div>
                        <span className="sa-answer-file-name-wrapper kwsdk-text-xs medium kwsdk-text-truncate kwsdk-overflow-hidden kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2">
                            <span className="sa-answer-file-name kwsdk-text-truncate kwsdk-mw-100" onClick={() => openUrl(card?.fileInfo?.recordUrl || '')}>
                                {card.fileInfo.name}
                            </span>
                            <button className="sa-answer-link-icon-hover kwsdk-p-0 kwsdk-border-0 kwsdk-outline-none kwsdk-bg-transparent kwsdk-flex-shrink-0 kwsdk-p-0 kwsdk-d-flex">
                                <RenderFileIcons type="link-icon" />
                            </button>
                        </span>
                    </div>
                    {card?.fileInfo?.resultCount && card.fileInfo.resultCount > 1 && (
                        <button
                            className="sa-answer-view-button kwsdk-flex-shrink-0 kwsdk-text-xs medium kwsdk-p-0 kwsdk-border-0 kwsdk-outline-none kwsdk-bg-transparent kwsdk-p-0"
                            onClick={() => card.isExpanded
                                ? handleHideRelatedResults(card.id)
                                : handleViewRelatedResults(card.id)
                            }
                        >
                            {card.isExpanded ? 'Show less' : 'Show all results'}
                            {!card.isExpanded && (
                                <span className="sa-answer-result-count">({card.fileInfo.resultCount})</span>
                            )}
                        </button>
                    )}
                </div>
                <div className="sa-answer-result-content kwsdk-w-100 kwsdk-bg-white kwsdk-rounded-2 kwsdk-position-relative">
                    <div className="sa-answer-result-text-section">
                        {renderTextContent(card.id, card.text, card.fileInfo.imageUrls, card.fileInfo.name, isTextExpanded, shouldShowBadge)}
                    </div>
                    {card.relatedResults && card.isExpanded && (
                        <div className="sa-answer-related-results">
                            {card.relatedResults.map((relatedCard, index) => {
                                const relatedId = `${card.id}-${relatedCard.id}`;
                                return (
                                    <Fragment key={relatedCard.id}>
                                        <div className="sa-answer-divider kwsdk-mb-1 kwsdk-mt-1"></div>
                                        <div className="sa-answer-related-item">
                                            {renderTextContent(
                                                relatedId,
                                                relatedCard.text,
                                                relatedCard.fileInfo.imageUrls,
                                                relatedCard.fileInfo.name,
                                                expandedTexts[relatedId] || false,
                                                relatedCard.text.length > 80
                                            )}
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const getActiveFiltersCount = (): number =>
        Object.values(activeFilters).reduce((count: number, value) => {
            if (Array.isArray(value)) return count + value.length;
            return value && value !== '' && value !== 'all' ? count + 1 : count;
        }, 0);

    if (showFilters) {
        return (
            <div className="sa-answer-filters-container-wrapper kwsdk-h-100">
                <FiltersComponent
                    onClose={handleCloseFilters}
                    onApplyFilters={handleApplyFilters}
                    facets={msgData?.template?.facets}
                    initialFilters={activeFilters}
                />
            </div>
        );
    }

    const filteredResults = getFilteredResultsData();

    return (
        <div className="sa-answer-search-results-slider kwsdk-w-100 kwsdk-d-flex kwsdk-flex-column kwsdk-overflow-hidden kwsdk-h-100">
            {/* Header */}
            <div className="sa-answer-slider-header kwsdk-w-100 kwsdk-d-flex kwsdk-justify-content-between kwsdk-align-items-center kwsdk-p-4">
                <h3 className="sa-answer-header-title kwsdk-text-sm semibold kwsdk-text-truncate">Relevant Results ({getTotalResultCount(filteredResults)})</h3>
                <button className="sa-answer-close-button kwsdk-btn-link" onClick={handleClose}>
                    <ImageCarouselSvgIcons type="close-button" />
                </button>
            </div>

            {/* Search and Filters */}
            <div className="sa-answer-search-filters-section kwsdk-p-4 kwsdk-pt-0 kwsdk-d-flex kwsdk-flex-column kwsdk-gap-2">
                <div className="sa-answer-search-input kwsdk-position-relative kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2">
                    <ImageCarouselSvgIcons type="search-icon" className="sa-answer-search-icon" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search"
                        className="sa-answer-search-field kwsdk-w-100 kwsdk-text-sm medium kwsdk-border kwsdk-rounded-1"
                        onInput={handleSearch}
                    />
                </div>
                <div className="sa-answer-filters-container kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-2 kwsdk-justify-content-between" style={{ display: 'none' }}>
                    <div className="sa-answer-filter-badge-wrapper kwsdk-position-relative" ref={sourceDropdownRef}>
                        <button className="sa-answer-filter-badge sa-answer-primary kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-1 kwsdk-rounded-pill kwsdk-border kwsdk-bg-white" onClick={handleSourceFilter}>
                            <span className={`sa-answer-selected-source-text kwsdk-text-sm medium kwsdk-text-truncate`}>
                                {selectedSource.label}
                            </span>
                            <ImageCarouselSvgIcons type="chevron-down" className="kwsdk-flex-shrink-0" />
                        </button>
                        {renderSourceDropdown()}
                    </div>
                    <div className="sa-answer-filter-badge-wrapper kwsdk-position-relative">
                        <button className="sa-answer-filter-badge sa-answer-secondary kwsdk-text-sm medium kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-1 kwsdk-rounded-pill kwsdk-border kwsdk-bg-white" onClick={handleMoreFilters}>
                            <div className="sa-answer-filter-icon-wrapper kwsdk-d-flex kwsdk-align-items-center kwsdk-gap-1">
                                <ImageCarouselSvgIcons type="filter-icon" className="kwsdk-flex-shrink-0" />
                                {getActiveFiltersCount() > 0 && (
                                    <div className="sa-answer-filter-indicator">
                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="sa-answer-dot-icon">
                                            <circle cx="3" cy="3" r="3" fill="#F04438" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <span>More Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Results List */}
            <div className="sa-answer-results-container kwsdk-p-4 kwsdk-pt-0 kwsdk-flex-grow-1 kwsdk-overflow-y-auto kwsdk-d-flex kwsdk-flex-column kwsdk-gap-2">
                {isLoading ? (
                    <div className="sa-answer-results-loading-container kwsdk-d-flex kwsdk-flex-column kwsdk-align-items-center kwsdk-justify-content-center kwsdk-gap-2 kwsdk-h-100 kwsdk-w-100">
                        <div className="sa-answer-spinner-ring"/>
                        <p className="sa-answer-results-loading-text kwsdk-text-sm medium kwsdk-text-capitalize">Loading results…</p>
                    </div>
                ) : filteredResults.length === 0 ? (
                    <div className="sa-answer-no-results-container kwsdk-d-flex kwsdk-flex-column kwsdk-align-items-center kwsdk-justify-content-center kwsdk-gap-2 kwsdk-h-100 kwsdk-w-100">
                        <div className="sa-answer-no-results-icon kwsdk-d-flex kwsdk-align-items-center kwsdk-justify-content-center kwsdk-rounded-2 kwsdk-border">
                            <ImageCarouselSvgIcons type="search-lg" className="sa-answer-search-icon" />
                        </div>
                        <h3 className="sa-answer-no-results-title kwsdk-text-sm semibold kwsdk-text-center">No results found</h3>
                        <p className="sa-answer-no-results-subtitle kwsdk-text-xs kwsdk-text-center">Your search did not match any results. Please clear filters and try again</p>
                        <button className="kr-button-secondary kwsdk-w-auto" onClick={handleClearFilters}>
                            Clear Filters
                        </button>  
                    </div>
                ) : (
                    filteredResults.map(renderResultCard)
                )}
            </div>
        </div>
    );
}

export default RelevantResults;
