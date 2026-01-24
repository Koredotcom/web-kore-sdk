import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import './googleDrivePreviewTemplate.scss';
import ImageCarouselSvgIcons from '../carouselImagePopupTemplate/imageCarouselSvgIcons';

// Google Drive style preview template
export function GoogleDrivePreviewTemplate(props: any): any {
    const propsData = props.data;
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const [imageObj, setImageObj] = useState<any>({
        url: propsData?.image_urls?.[0] || '',
        index: 0,
        scale: 1
    });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    // Handle scroll to change header background - only when sa-preview-body scrollbar is visible
    useEffect(() => {
        const checkPreviewBodyScrollbar = () => {
            const previewBody = document.querySelector('.sa-preview-body') as HTMLElement;
            if (previewBody) {
                const hasScrollbar = previewBody.scrollHeight > previewBody.clientHeight;
                setIsHeaderScrolled(hasScrollbar);
            }
        };

        let observer: MutationObserver | null = null;
        let cleanup: (() => void) | null = null;

        const timer = setTimeout(() => {
            const previewBody = document.querySelector('.sa-preview-body') as HTMLElement;
            if (previewBody) {
                checkPreviewBodyScrollbar();
                window.addEventListener('resize', checkPreviewBodyScrollbar, { passive: true });
                
                observer = new MutationObserver(checkPreviewBodyScrollbar);
                observer.observe(previewBody, { 
                    childList: true, 
                    subtree: true, 
                    attributes: true 
                });
                
                cleanup = () => {
                    window.removeEventListener('resize', checkPreviewBodyScrollbar);
                    if (observer) {
                        observer.disconnect();
                    }
                };
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (cleanup) {
                cleanup();
            }
        };
    }, []);

    const closePopup = () => {
        document.getElementById('sa-img-carousel-popup-container')?.remove();
    };

    // Zoom in / Zoom out click events
    const setZoomInOut = (isZoomIn: Boolean) => {
        if (isZoomIn) {
            setImageObj((prevState: any) => ({ 
                ...prevState, 
                scale: Math.min(imageObj?.scale + 0.5, 5) 
            }));
        } else if (Math.round(imageObj?.scale * 100) !== 25) {
            setImageObj((prevState: any) => ({ 
                ...prevState, 
                scale: Math.max(imageObj?.scale - 0.5, 0.25) 
            }));
        }
        if (imageObj?.scale <= 1.2) {
            setPosition({ x: 0, y: 0 });
        }
    };

    // Reset zoom to 100%
    const resetZoom = () => {
        setImageObj((prevState: any) => ({ 
            ...prevState, 
            scale: 1 
        }));
        setPosition({ x: 0, y: 0 });
    };

    // Carousel next / previous buttons click events
    const movePreNext = (type: string, value: number = 0) => {
        let carousel_index = imageObj.index;
        if ((propsData.image_urls?.length - 1) >= carousel_index) {
            if (type === 'previous') {
                if (carousel_index > 0) carousel_index--;
            } else if (type === 'next') {
                if ((propsData.image_urls?.length - 1) !== carousel_index) carousel_index++;
            } else if (type === 'selectIndex') {
                carousel_index = value;
            }
            setImageObj((prevState: any) => ({ 
                ...prevState, 
                url: propsData?.image_urls[carousel_index], 
                index: carousel_index, 
                scale: 1 
            }));
        }
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
    };

    // Mouse handle events - only for dragging when zoomed
    const handleMouseEvent = (e: any, type: string) => {
        if (imageObj?.scale <= 1) {
            return;
        }

        if (type == 'down') {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        } else if (type == 'move') {
            if (!isDragging) return;
            e.preventDefault();
            e.stopPropagation();
            const newX = e.clientX - startPos.x;
            const newY = e.clientY - startPos.y;
            setPosition({ x: newX, y: newY });
        } else if (type === 'up' || type === 'leave') {
            setIsDragging(false);
        }
    };

    // Get file extension from filename or URL
    const getFileExtension = (filename: string): string => {
        if (!filename) return '';
        const match = filename.match(/\.([^.]+)$/);
        return match ? match[1].toLowerCase() : '';
    };

    // Get file icon path from fileUploadTypes
    const getFileIconType = (filename: string): string | null => {
        const extension = getFileExtension(filename);
        if (!extension) return null;
        
        // Map extensions to icon types
        const iconMap: { [key: string]: string } = {
            'pdf': 'file-pdf',
            'doc': 'file-doc',
            'docx': 'file-docx',
            'xls': 'file-xlsx',
            'xlsx': 'file-xlsx',
            'ppt': 'file-ppt',
            'pptx': 'file-pptx',
            'csv': 'file-csv',
            'txt': 'file-txt',
            'html': 'file-html',
            'json': 'file-json',
            'jpg': 'file-img',
            'jpeg': 'file-img',
            'png': 'file-img',
            'gif': 'file-img',
            'bmp': 'file-img',
            'webp': 'file-img',
            'svg': 'file-img',
            'url': 'file-url'
        };

        return iconMap[extension] || null;
    };

    // Render file icon in header
    const renderFileIcon = () => {
        const fileName = propsData?.title || '';
        const iconType = getFileIconType(fileName);
        
        if (!iconType) return null;

        return <ImageCarouselSvgIcons type={iconType} />;
    };

    // Get filename from title or URL
    const getFileName = (): string => {
        if (propsData?.title) {
            return propsData.title;
        }
        if (propsData?.image_urls?.[imageObj?.index]) {
            const url = propsData.image_urls[imageObj.index];
            const parts = url.split('/');
            return parts[parts.length - 1] || 'Image';
        }
        return 'Image';
    };

    // Render zoom controls
    const renderZoomControls = () => {
        const zoomPercentage = Math.round(imageObj?.scale * 100);
        return (
            <div className="sa-zoom-controls">
                <div className="sa-zoom-controls-inner">
                    <div className="sa-zoom-btn" onClick={() => setZoomInOut(false)}>
                        <ImageCarouselSvgIcons type={'zoom-out'} />
                    </div>
                    <div className="sa-zoom-percentage" onClick={resetZoom} title="Click to reset zoom">{zoomPercentage}%</div>
                    <div className="sa-zoom-btn" onClick={() => setZoomInOut(true)}>
                        <ImageCarouselSvgIcons type={'zoom-in'} />
                    </div>
                </div>
            </div>
        );
    };

    // Render header
    const renderHeader = () => {
        const fileName = getFileName();
        const headerClasses = `sa-preview-header${isHeaderScrolled ? ' sa-header-scrolled' : ''}`;
        const iconType = getFileIconType(fileName);
        
        return (
            <div className={headerClasses}>
                <div className="sa-header-content">
                    <div className="sa-header-left">
                        <div className="sa-back-btn" onClick={closePopup}>
                            <ImageCarouselSvgIcons type={'back-arrow'} />
                        </div>
                        {iconType && (
                            <div className="sa-file-icon">
                                {renderFileIcon()}
                            </div>
                        )}
                        <div className="sa-filename">{fileName}</div>
                    </div>
                    <div className="sa-header-right">
                    </div>
                </div>
            </div>
        );
    };

    // Main template
    const previewTemplate = (
        <div className="sa-google-drive-preview" ref={containerRef}>
            {renderHeader()}
            {propsData?.image_urls?.length > 1 && (
                <div className="sa-carousel-btn sa-carousel-btn-left" onClick={() => movePreNext('previous')}>
                    <ImageCarouselSvgIcons type={'left-btn-arrow'} />
                </div>
            )}
            <div className={`sa-preview-body ${propsData?.image_urls?.length === 1 ? 'sa-single-image' : ''}`}>
                <div 
                    className="sa-preview-image-container" 
                    style={{ transform: `scale(${imageObj.scale})`, transformOrigin: 'top center' }}
                >
                    <div className="sa-image-wrapper">
                        <div 
                            className="sa-image-content" 
                            style={{ 
                                transform: `translate(${position.x}px, ${position.y}px)`, 
                                transition: isDragging ? 'none' : 'transform 0.3s ease' 
                            }}
                            ref={imageRef}
                            onMouseDown={(e: any) => {
                                if (imageObj?.scale > 1) {
                                    handleMouseEvent(e, 'down');
                                }
                            }}
                            onMouseMove={(e: any) => {
                                if (imageObj?.scale > 1 && isDragging) {
                                    handleMouseEvent(e, 'move');
                                }
                            }}
                            onMouseUp={(e: any) => handleMouseEvent(e, 'up')}
                            onMouseLeave={(e: any) => handleMouseEvent(e, 'leave')}
                        >
                            <img 
                                id="sa-preview-img" 
                                className="sa-preview-img" 
                                src={imageObj?.url} 
                                style={{ cursor: imageObj.scale > 1 ? 'grab' : 'default' }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {propsData?.image_urls?.length > 1 && (
                <div className="sa-carousel-btn sa-carousel-btn-right" onClick={() => movePreNext('next')}>
                    <ImageCarouselSvgIcons type={'right-btn-arrow'} />
                </div>
            )}
            <div className="sa-preview-bottom-controls">
                {renderZoomControls()}
                {propsData?.image_urls?.length > 1 && (
                    <div className="sa-preview-footer">
                        {propsData?.image_urls?.map((imgUrl: any, index: number) => (
                            <div 
                                key={index}
                                className={`sa-preview-thumbnail ${index === imageObj?.index ? 'sa-thumbnail-active' : ''}`}
                                onClick={() => movePreNext('selectIndex', index)}
                            >
                                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return previewTemplate;
}

export default GoogleDrivePreviewTemplate;

