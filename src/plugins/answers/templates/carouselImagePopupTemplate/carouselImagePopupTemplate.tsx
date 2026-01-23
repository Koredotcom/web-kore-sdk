
import { h, Fragment  } from 'preact';
import { useState, useRef } from 'preact/hooks';
import ImageCarouselSvgIcons from './imageCarouselSvgIcons';
import { Boolean } from 'aws-sdk/clients/apigateway';
import './carouselImagePopupTemplate.scss';
//carousel image popup template
export function CarouselImagePopupTemplate(props: any): any {
    const propsData = props.data;
    const [imageObj, setImageObj] = useState({ url: propsData.image_urls[0], isShow: false, index: 0, scale: 1, isExpand:false, screenZoomVal:100 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const imageRef = useRef(null);
      // Convert scale to percentage for display
  const zoomPercentage = Math.round(imageObj?.scale * 100); 

    const closePopup = () => {
        document.getElementById('sa-img-carousel-popup-container')?.remove();
    }
    const setFullScreen = () => {
        setImageObj((prevState: any) => ({ ...prevState, scale: 1, isExpand:!imageObj?.isExpand}));
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
    }

     //Zoom in /  Zoom out click events
    const setZoomInOut = (isZoomIn: Boolean) => {
        if (isZoomIn) setImageObj((prevState: any) => ({ ...prevState, scale: Math.min(imageObj?.scale + 0.2, 2),isExpand:false }));
        else if(Math.round(imageObj?.scale * 100)!==20) {
            setImageObj((prevState: any) => ({ ...prevState, scale: Math.min(imageObj?.scale - 0.2, 1), isExpand:false }));
        }
        if (imageObj?.scale <= 1.2) {
            setPosition({ x: 0, y: 0 });
        }
    }

    //carousel next / previous buttons click events
    const movePreNext = (type: string,value:number=0) => {
        let carousel_index = imageObj.index;
        if ((propsData.image_urls?.length - 1) >= carousel_index) {
            if (type === 'previous') {
                if (carousel_index > 0) carousel_index--;
            } else if(type === 'next') {
                if ((propsData.image_urls?.length - 1) !== carousel_index) carousel_index++;
            } else if(type=== 'selectIndex') {
                carousel_index = value;
            }
            setImageObj((prevState: any) => ({ ...prevState, url: propsData?.image_urls[carousel_index], index: carousel_index, scale: 1}))
        }
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
    }

    //mouse handle events
    const handleMouseEvent = (e: any,type:string) => {
       if(type=='down'){
        e.preventDefault();
        setIsDragging(imageObj?.scale === 1 ?false:true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
       }else if(type=='move'){
        if (!isDragging) return;
        const newX = e.clientX - startPos.x;
        const newY = e.clientY - startPos.y;
        setPosition({ x: newX, y: newY });
       }else if(type === 'up') setIsDragging(false);
    };

    //render fit screen and zoom controls
    const renderFitScreenAndZoomControls = () => {
        return (
            <div className={`sa-header-rightblock ${!isHovered ? 'sa-hide-controls' : ''}`}>
                <div className="sa-zoom-in-out-block">
                    <div className="sa-display sa-cursor-pointer sa-b-r"><span onClick={()=>setZoomInOut(true)}><ImageCarouselSvgIcons type={'zoom-in'} /> </span></div>
                    <div className="sa-display sa-b-r">{zoomPercentage}%</div>
                    <div className="sa-display sa-cursor-pointer"><span onClick={()=>setZoomInOut(false)}><ImageCarouselSvgIcons type={'zoom-out'} /> </span></div>
                </div>
            </div>
        );
    };

    //image carousel template html
    const imgCarouselTemp = <div className={`sa-carousel-img-popup ${propsData.image_urls?.length===1 && 'sa-remove-carousel'}`}>
                        <div className="sa-img-popup-header-block">
                            <div className="sa-header-leftblock">
                                <div className='sa-back-btn' onClick={closePopup}> <span><ImageCarouselSvgIcons type={'back-arrow'} /> </span></div>
                                <div className="sa-filename">{propsData?.title}</div>
                            </div>
                            
                        </div>
                        {
                        <Fragment>
                            <div className={`sa-carousel-body-container ${imageObj?.isExpand && 'expand-img'}`}>
                                <div className="sa-carousel-btn" onClick={() => movePreNext('previous')}> <span><ImageCarouselSvgIcons type={'left-btn-arrow'} /></span> </div>
                                <div className="sa-file-popup-img-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <div className="sa-file-popup-img">
                                        <div className="image-container" style={{ cursor: isDragging ? 'grabbing' : imageObj?.scale > 1 ? 'grab' : 'default' }}>
                                            <div className="sa-img-child" style={{ transform: `scale(${imageObj.scale}) translate(${position.x}px, ${position.y}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease' }}
                                                ref={imageRef}
                                                onMouseDown={($event) => handleMouseEvent($event, 'down')}
                                                onMouseMove={($event) => handleMouseEvent($event, 'move')}
                                                onMouseUp={($event) => handleMouseEvent($event, 'up')}
                                                onMouseLeave={($event) => handleMouseEvent($event, 'up')}>
                                                <img id="sa-file-img" className="sa-file-img" src={imageObj?.url} style={{ transform: `scale(${imageObj.scale}`, cursor: `${imageObj.scale} > 1 ? 'grab' : 'default')` }} />
                                            </div>
                                        </div>
                                    </div>
                                    {renderFitScreenAndZoomControls()}
                                </div>
                                <div className="sa-carousel-btn" onClick={() => movePreNext('next')}> <span><ImageCarouselSvgIcons type={'right-btn-arrow'} /></span> </div>
                            </div>
                            {propsData?.image_urls?.length && propsData?.image_urls?.length>1 &&
                                <div className="sa-carousel-footer-block">
                                    {
                                        propsData?.image_urls?.map((imgUrl: any, index: number) => (
                                            <div className="sa-display sa-carousel-img-btn-block">
                                                <img className={`sa-carousel-img-btn ${index === imageObj?.index && 'selected-img'}`} src={imgUrl} onClick={() => movePreNext('selectIndex',index)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </Fragment>
                        }
                    </div>
    return imgCarouselTemp;
}

export default CarouselImagePopupTemplate;