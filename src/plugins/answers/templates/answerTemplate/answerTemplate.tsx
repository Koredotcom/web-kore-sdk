import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import './answerTemplate.scss';
import { h, Fragment, render  } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {CarouselImagePopupTemplate} from '../carouselImagePopupTemplate/carouselImagePopupTemplate';
import KoreHelpers from '../../../../utils/helpers';
import FeedbackTemplate from '../feedbackTemplate/feedbackTemplate';
import ImageCarouselSvgIcons from '../carouselImagePopupTemplate/imageCarouselSvgIcons';

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
    const [selectedIndex, setSelectedIndex] = useState(0);

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
        data?.forEach((item: any) => {
            const isExist = sources_data.find((source: any) => source.id === item?.sources[0]?.doc_id);
            if (!isExist) sources_data.push({ "title": item?.sources[0]?.title, "id": item?.sources[0]?.doc_id, "url": item?.sources[0]?.url, "image_url": item?.sources[0]?.image_url||[] });
        });
        data?.forEach((answer: any) => {
            const index = sources_data.findIndex((source: any) => source.id === answer?.sources[0]?.doc_id);
            answer_fragment.push({ "title": answer?.answer_fragment, "id": index });
        });
        setAnswersObj((prevState: any) => ({ ...prevState, "generative": { "answerFragment": answer_fragment,  "sources": sources_data} }));
    }

    //redirect to specific url
    const redirectToURL=(url:string)=>{
        window.open(url, '_blank'); 
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


      const renderAnswerResult=(answer:any)=>{
        const hasSource= answersObj?.generative?.sources?.[answer?.id]?.title || answersObj?.generative?.sources?.[answer?.id]?.url

        return   <span className={`sa-answer-result-heading ${(selectedIndex===answer?.id +1 && hasSource) &&'sa-answer-result-heading-selected'}`} onMouseOver={()=>setSelectedIndex(answer?.id + 1)} onMouseOut={()=>setSelectedIndex(0)}>
                    <span dangerouslySetInnerHTML={{__html:helpers.convertMDtoHTML(answer?.title, "bot") }}></span>
                    <div className={`sa-tooltip-container ${selectedIndex === answer?.id + 1 && 'position-class'} `}>
                           { 
                            
                            hasSource ? <Fragment>
                                            <span className={` sa-answer-list-item ${selectedIndex === answer?.id + 1 && 'sa-answer-list-item-selected'}`} onClick={()=>redirectToURL(answersObj?.generative?.sources?.[answer?.id]?.url)}>
                                                {answer?.id + 1}
                                            </span> 
                                            {selectedIndex === answer?.id + 1 && (
                                                <div class="sa-tooltip">{answersObj?.generative?.sources?.[selectedIndex - 1]?.title || answersObj?.generative?.sources?.[selectedIndex - 1]?.url}</div>
                                            )}
                                         </Fragment> 
                                    : null
                            }
                    </div>
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

                                            <div className={`sa-answer-result-footer  ${(selectedIndex===index+1)&&'selected'}`} 
                                                    onMouseOver={() => setSelectedIndex(index+1)}
                                                    onMouseOut={() => setSelectedIndex(0)}>
                                            <span onClick={()=>redirectToURL(source?.url)}>{index + 1}. <span>{ extractShortDomainOrFile(source?.title || source?.url)}</span></span>
                                                    {(source?.image_url?.length > 0)&&
                                                    <Fragment>
                                                        <div className="sa-answer-file-url-block" onClick={()=>showFileUrl(source?.image_url,source?.title || source?.url)} >
                                                                <span className="sa-answer-file-url-icon" >i</span> 
                                                        </div>
                                                    </Fragment>
                                                    }
                                             </div>
                                             {selectedIndex === index + 1 && (
                                                <div class="sa-tooltip">{source?.title || source?.url}</div>
                                             )}

                                        </div>
                                        ))
                                    }
                            </div>
                            {
                                (!isPlatform && hostInstance['saFeedback']?.enable) && <FeedbackTemplate data={hostInstance} searchRequestId={messageObj?.msgData?.message[0]?.component?.payload?.searchRequestId}/>
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
            props.msgData = updateMsgData(props.msgData)
        return (
            <Answers {...props} />
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

