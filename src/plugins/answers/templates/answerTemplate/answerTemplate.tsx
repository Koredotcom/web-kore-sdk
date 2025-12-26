import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import './answerTemplate.scss';
import { h, Fragment, render  } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {CarouselImagePopupTemplate} from '../carouselImagePopupTemplate/carouselImagePopupTemplate';
import KoreHelpers from '../../../../utils/helpers';
import FeedbackTemplate from '../feedbackTemplate/feedbackTemplate';
import ImageCarouselSvgIcons from '../carouselImagePopupTemplate/imageCarouselSvgIcons';
import { StreamingAnswersTemplate } from '../streamingAnswerTemplate/streamingAnswerTemplate';

// Streaming wrapper that handles routing between streaming and final template
export function StreamingAnswers(props: any) {
    const msgData = props.msgData;

    // Check if streaming mode is active and if streaming is complete
    const isStreaming = msgData?.sM === true;
    const isStreamingComplete = msgData?.endChunk === true;
    
    // If streaming is complete, render the final Answers component
    if (!isStreaming || isStreamingComplete) {
        return <Answers {...props} />;
    }

    // Otherwise, render the simplified streaming template
    return <StreamingAnswersTemplate {...props} />;
}

export function Answers(props: any) {
    const hostInstance = props.hostInstance;
    const isPlatform = hostInstance?.config?.isPlatform;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const helpers = KoreHelpers.helpers;
    const [answersObj, setAnswersObj]: any = useState({ "generative": { "answerFragments": [], "sources": [] }});
    const [modelType, setModelType] = useState('');
    const [selectedIndex, setSelectedIndex] = useState<any>([]);
    const [exactMatch, setExactMatch] = useState<boolean>(false);

    useEffect(() => {
        const results = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.snippet_content;
        const templateType = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0].snippet_type;
        setModelType(templateType);
        setAnswersObj((prevState: any) => ({ ...prevState}));
        updateGenerativePayload(results);
    }, [msgData])
   
    //generative template payload update
    const updateGenerativePayload = (data: any) => {
        let answer_fragment: Array<Object> = [];
        let sources_data: Array<Object> = [];
        // Process all sources from all items
        data?.forEach((item: any) => {
            item?.sources?.forEach((source: any) => {
                const isExist = sources_data.find((existingSource: any) => existingSource.url === source?.url);
                if (!isExist) {
                    sources_data.push({ 
                        "title": source?.title, 
                        "id": source?.doc_id, 
                        "url": source?.url, 
                        "image_url": source?.image_url || [] 
                    });
                }
            });
        });
        
        // Process answer fragments and map them to all relevant sources
        data?.forEach((answer: any) => {
            let indexes:any = [];
            answer?.sources?.forEach((source: any) => {
                const index = sources_data.findIndex((existingSource: any) => existingSource.url === source?.url);
                if (index !== -1) {
                    indexes.push(index);
                }
            });

            answer_fragment.push({ "title": answer?.answer_fragment, "indexes": indexes });
        });
        setAnswersObj((prevState: any) => ({ ...prevState, "generative": { "answerFragment": answer_fragment,  "sources": sources_data} }));
    }

    //redirect to specific url
    const redirectToURL=(url:string)=>{
        if (typeof url === 'string' && url.trim() !== '' && url !== undefined) {
            window.open(url, '_blank');
        }
    }

    const showFileUrl = (image_urls: any, title:string) => {
            // Create a div element to hold the dynamic content
            const tempDiv = document.createElement('div');
            tempDiv.id = 'sa-img-carousel-popup-container';
            // Append to the body
            document.body.appendChild(tempDiv);
            const sourceData = {"image_urls":Array.isArray(image_urls) ? image_urls : [image_urls],"title":title}
            render(<CarouselImagePopupTemplate data={sourceData}/>,tempDiv);
    }

    const  extractShortDomainOrFile=(link:string) =>{
        // Remove protocol (http://, https://, etc.) and "www." if present
        let strippedLink = link.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
        
        // Check if the link has a file extension
        const hasFileExtension = strippedLink.match(/\.[^\/]+$/);
      
        if (hasFileExtension) {
          // Split by '/' to get the last segment, which should be the file
          const pathSegments = strippedLink.split('/');
          const fileName = pathSegments[pathSegments.length - 1];
      
          // Split filename and extension
          const [name, extension] = fileName.split('.');
      
          // Take the first three characters of the filename and concatenate with the extension
          const shortenedFile = name.slice(0, 3) + '...' + extension;
      
          return shortenedFile;
        } else {
          // Extract domain and TLD (stop at first '/')
          const domainAndTld = strippedLink.split('/')[0]; // Take only the part before the first '/'
          
          // Split into domain and TLD
          const [domain, tld] = domainAndTld.split('.').slice(-2);
      
          // Take first three characters of domain and concatenate with TLD
          const shortenedDomain = tld ? domain.slice(0, 3) + '...' + tld : domain.slice(0, 8) + '...';
      
          return shortenedDomain;
        }
      }

        const renderCitationList=(sourceIndex:any,hasSource:any,isSelected:any)=>
            {

            
            
            return <div className={`sa-tooltip-container ${isSelected && 'position-class'} `}>
                { 
                
                hasSource ? <Fragment>
                                <span className={` sa-answer-list-item ${isSelected && 'sa-answer-list-item-selected'} ${!answersObj?.generative?.sources?.[sourceIndex]?.url && 'pointer-events-none'}`} onClick={()=>redirectToURL(answersObj?.generative?.sources?.[sourceIndex]?.url)}>
                                    {sourceIndex + 1}
                                </span> 
                                {selectedIndex.includes(sourceIndex) && (
                                    <div class="sa-tooltip">{answersObj?.generative?.sources?.[sourceIndex]?.title || answersObj?.generative?.sources?.[sourceIndex]?.url}</div>
                                )}
                            </Fragment> 
                        : null
                }
            </div>
}
      const renderAnswerResult=(answer:any)=>{
        let hasSource:any = answer?.indexes?.some((index:any)=>answersObj?.generative?.sources?.[index]?.title || answersObj?.generative?.sources?.[index]?.url)
        let isEqual:any = false;
        if(exactMatch){
            isEqual = selectedIndex?.length === answer?.indexes?.length && answer?.indexes.every((val:any, i:any) =>  selectedIndex?.includes(val));         
        }else{
            isEqual = answer?.indexes.some((val:any, i:any) =>  selectedIndex?.includes(val));         
        }
        const isSelected= hasSource && isEqual;
        return   <span className={`sa-answer-result-heading ${(isSelected) &&'sa-answer-result-heading-selected'}`} onMouseOver={()=>{setSelectedIndex(answer?.indexes);setExactMatch(true)}} onMouseOut={()=>{setSelectedIndex([]);setExactMatch(false)}}>
                    {
                        /<[^>]+>/.test(answer?.title)
                        ? <span dangerouslySetInnerHTML={{__html: answer?.title}}></span>
                        : <span dangerouslySetInnerHTML={{__html: helpers.convertMDtoHTML(answer?.title, "bot")}}></span>
                    }
                   {answer?.indexes?.map((index:any)=>renderCitationList(index,hasSource,exactMatch ? isSelected : selectedIndex.includes(index)))}
                </span>
      }
    
    return (
        <div class="sa-answer-block"  data-cw-msg-id={messageObj?.msgData?.messageId}>
            {
                (modelType === 'generative_model'  || modelType === 'extractive_model') ? (
                    <Fragment>
                        <div class="sa-answer-result-block">

                            <div className="sa-answer-header-block">
                                <div className="sa-answer-left">
                                {modelType === 'generative_model'&& <Fragment>
                                    <div className="sa-answer-img">
                                        <ImageCarouselSvgIcons type="answer-icon" />
                                    </div>
                                    <div className="sa-answer-text">Answered by AI</div>
                                    </Fragment>}
                                </div>
                            </div>

                            <div class="sa-answer-result-sub-block">
                                {answersObj.generative?.answerFragment?.map(renderAnswerResult)}                                
                            </div>
                            <div className="sa-answer-gen-footer">
                                    {
                                        answersObj?.generative?.sources?.filter((source: any) => source?.title?.length > 0)?.map((source: any, index: number) => (
                                            <div className='sa-tooltip-container'>

                                            <div className={`sa-answer-result-footer  ${(selectedIndex.includes(index))&&'selected'} ${!source?.url && 'pointer-events-none'}`} 
                                                    onMouseOver={() => setSelectedIndex([index])}
                                                    onMouseOut={() => setSelectedIndex([])}>
                                            <span onClick={()=>redirectToURL(source?.url)}>{index + 1}. <span>{ extractShortDomainOrFile(source?.title || source?.url)}</span></span>
                                                    {(source?.image_url?.length > 0)&&
                                                    <Fragment>
                                                        <div className="sa-answer-file-url-block" onClick={()=>showFileUrl(source?.image_url,source?.title || source?.url)} >
                                                                <span className="sa-answer-file-url-icon" >i</span> 
                                                        </div>
                                                    </Fragment>
                                                    }
                                             </div>
                                             {selectedIndex.includes(index) && (
                                                <div class="sa-tooltip">{source?.title || source?.url}</div>
                                             )}

                                        </div>
                                        ))
                                    }
                            </div>
                            {
                                (!isPlatform && hostInstance['saFeedback']?.enable && !messageObj?.msgData?.fromHistory && !messageObj?.msgData?.fromHistorySync) && <FeedbackTemplate data={hostInstance} searchRequestId={messageObj?.msgData?.message[0]?.component?.payload?.searchRequestId}/>
                            }
                            
                        </div>

                    </Fragment>
                ) : (
                    <Fragment>
                        <div class="sa-answer-result-block">
                            <div class="sa-answer-result-heading">{answersObj?.extractive?.snippet_title}</div>
                            <div class="sa-answer-result-desc">{answersObj?.extractive?.snippet_content}</div>

                            <div class="sa-answer-result-footer">1. {answersObj?.extractive?.source}</div>
                        </div>
                    </Fragment>
                )
            }


        </div>
    );
}
    const updateMsgData = (msgData:any)=>{
        const updatedMsgData = {...msgData};
        if(updatedMsgData?.message?.length && updatedMsgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.type == 'extractive_model'){
            updatedMsgData.message[0].component.payload.answer_payload = {
              "center_panel": {
                  "data": [
                      {
                          "isPresentedAnswer": true,
                          "message": "Presented Answer",
                          "score": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.score||'',
                          "snippet_content": [
                              {
                                  "answer_fragment": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.snippet_content,
                                  "sources": [
                                      {
                                          "chunk_id": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.chunk_id,
                                          "doc_id": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.doc_id||'',
                                          "image_url": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.image_url||[],
                                          "source_id": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.source_id||'',
                                          "source_type": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.source_name||'',
                                          "title": msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.source||'',
                                          "url":msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.url||''
                                      }
                                  ]
                              }
                          ],
                          "snippet_title": "",
                          "snippet_type": "extractive_model"
                      }
                  ],
                  "type": "citation_snippet"
              }
    
            }
          }
        return updatedMsgData
    }

export function answerTemplateCheck(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData; 
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'answerTemplate') {
        props.msgData = updateMsgData(props.msgData);
        
        // Check if streaming mode is active (sM: true at root level)
        const isStreaming = msgData?.sM === true;
        const isStreamingComplete = msgData?.endChunk === true;
        
        return (
            (isStreaming && !isStreamingComplete) ? <StreamingAnswers {...props} /> : <Answers {...props} />
        )
    }   
}

class TemplateAnswers extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(answerTemplateCheck, msgData, this.hostInstance);
    }
}



export default TemplateAnswers;

