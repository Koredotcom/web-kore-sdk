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
    <div className="image-thumbnail-wrapper" onClick={onClick}>
        <img className="result-text-image-img" src={src} alt="Result" />
        <div className="image-zoom-overlay">
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

    const getTotalResultCount = (): number => {
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

    const handleSearch = (e: any) => setSearchQuery(e.target.value);

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
    const handleCloseFilters = () => setShowFilters(false);

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
            setIsLoading(true);
            setTimeout(() => {
                setResultsData(filterResultsByFacets(filters));
                setIsLoading(false);
            }, 0);
        }
    };

    const handleClearFilters = () => {
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
            ? <span className="see-less-link" onClick={() => handleTextToggle(cardId)}>see less</span>
            : <span className="see-more-link" onClick={() => handleTextToggle(cardId)}>see more</span>
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
                <div className="more-images-block">
                    {imageUrls.map((image, i) =>
                        renderImageWithZoom(image, name, () => showFileUrl(imageUrls![i], name))
                    )}
                </div>
            )
            : null;

        return (
            <div className={`text-container ${isSingleImage ? 'image-with-text' : ''}`}>
                {/* TableContentBlock splits text at the first markdown table so text
                    and table are always in separate DOM elements — no DOM manipulation
                    needed, so lineClamp on the text div works correctly and the table
                    scroll wrapper is never clipped by overflow:hidden. */}
                <TableContentBlock
                    text={text}
                    title={name}
                    textClassName="result-text"
                    isExpanded={isExpanded}
                    className="result-text-image"
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
            <div className="source-dropdown">
                <div className="dropdown-menu">
                    {getSourceOptions().map((option: any) => (
                        <div key={option.id} className="dropdown-item" onClick={() => handleSourceSelect(option)}>
                            <div className="dropdown-item-content">
                                <div className="dropdown-item-icon">
                                        <RenderFileIcons type={option.icon} hostInstance={props.hostInstance} />
                                </div>
                                <span className={`dropdown-item-text ${option.label.length > 15 ? 'truncated' : ''}`}>
                                    {option.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const openUrl = (url: string) => { if (url) window.open(url, '_blank'); };

    const renderResultCard = (card: ResultCard) => {
        const isTextExpanded = expandedTexts[card.id] || false;
        const shouldShowBadge = card.text.length > 80;

        return (
            <div key={card.id} className={`result-card ${card.isExpanded ? 'with-related' : ''}`}>
                <div className="result-header">
                    <div className="file-info">
                        <span className="file-info-wrapper">
                            <div className={`file-icon ${card.fileInfo.type}`}>
                                <RenderFileIcons type={card.fileInfo.fileType || card.fileInfo.type} hostInstance={props.hostInstance} />
                            </div>
                            <span className="file-name-wrapper">
                                <span className="file-name" onClick={() => openUrl(card?.fileInfo?.recordUrl || '')}>
                                    {card.fileInfo.name}
                                </span>
                                <span className="link-icon-hover"><RenderFileIcons type="link-icon" /></span>
                            </span>
                        </span>
                        {card?.fileInfo?.resultCount && card.fileInfo.resultCount > 1 && (
                            <button
                                className="view-button"
                                onClick={() => card.isExpanded
                                    ? handleHideRelatedResults(card.id)
                                    : handleViewRelatedResults(card.id)
                                }
                            >
                                {card.isExpanded ? 'Show less' : 'Show all results'}
                                {!card.isExpanded && (
                                    <span className="result-count">({card.fileInfo.resultCount})</span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
                <div className="result-content">
                    <div className="result-text-section">
                        {renderTextContent(card.id, card.text, card.fileInfo.imageUrls, card.fileInfo.name, isTextExpanded, shouldShowBadge)}
                    </div>
                    {card.relatedResults && card.isExpanded && (
                        <div className="related-results">
                            {card.relatedResults.map((relatedCard, index) => {
                                const relatedId = `${card.id}-${relatedCard.id}`;
                                return (
                                    <Fragment key={relatedCard.id}>
                                        <div className="divider"></div>
                                        <div className="related-item">
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
            <div className="filters-container-wrapper">
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
        <div className="search-results-slider">
            {/* Header */}
            <div className="slider-header">
                <div className="header-content">
                    <h3 className="header-title">Relevant Results ({getTotalResultCount()})</h3>
                </div>
                <button className="close-button" onClick={handleClose}>
                    <ImageCarouselSvgIcons type="close-button" />
                </button>
            </div>

            {/* Search and Filters */}
            <div className="search-filters-section">
                <div className="search-input-container">
                    <div className="search-input">
                        <ImageCarouselSvgIcons type="search-icon" className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="search-field"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="filters-container">
                    <div className="filter-badge-wrapper" ref={sourceDropdownRef}>
                        <button className="filter-badge primary" onClick={handleSourceFilter}>
                            <span className={`selected-source-text ${selectedSource.label.length > 15 ? 'truncated' : ''}`}>
                                {selectedSource.label}
                            </span>
                            <ImageCarouselSvgIcons type="chevron-down" />
                        </button>
                        {renderSourceDropdown()}
                    </div>
                    <div className="filter-badge-wrapper">
                        <button className="filter-badge secondary" onClick={handleMoreFilters}>
                            <div className="filter-icon-wrapper">
                                <ImageCarouselSvgIcons type="filter-icon" />
                                {getActiveFiltersCount() > 0 && (
                                    <div className="filter-indicator">
                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="dot-icon">
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
            <div className="results-container">
                {isLoading ? (
                    <div className="results-loading-container">
                        <div className="results-spinner">
                            <div className="spinner-ring" />
                        </div>
                        <p className="results-loading-text">Loading results…</p>
                    </div>
                ) : filteredResults.length === 0 ? (
                    <div className="no-results-container">
                        <div className="no-results-icon">
                            <ImageCarouselSvgIcons type="search-lg" className="search-icon" />
                        </div>
                        <h3 className="no-results-title">No results found</h3>
                        <p className="no-results-subtitle">Your search did not match any results. Please clear filters and try again</p>
                        <button className="clear-filters-button" onClick={handleClearFilters}>
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
