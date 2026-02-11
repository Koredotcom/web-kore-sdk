import TemplateAnswers from './templates/answerTemplate/answerTemplate'
import KoreHelpers from '../../utils/helpers';

/**
 *  Solutions template plugin class
 *
 * @decorator Class
 */
class AnswersTemplatesPlugin {

    name = 'AnswersTemplatesPlugin';
    config = {};
    hostInstance: any;
    streamingMessages: Map<string, { text: string; msgData: any }> = new Map();
    
    constructor(config: any) {
        config = config || {};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
        cwInstance.on("jwtGrantSuccess", (response: any) => {
            me.getFeedbackSettings();
        });
    }


    getFeedbackSettings(){
        let me:any = this;
        let cwInstance = me.hostInstance;
        const saFeedback = {
            enable:false,
            }
            me.getFeedbackSettingsAPICall().then(function (res: any) {
                cwInstance["saFeedback"] = {...saFeedback,...res?.feedback};
            }, function (errRes: any) {
            });
    }

    getFeedbackSettingsAPICall(callback: any): Promise<any> {
        let me: any = this;
        let $ = me.hostInstance.$;
        return $.ajax({
            url: me.hostInstance.config?.botOptions?.koreAPIUrl?.replace(/\/?$/, "/") + "searchsdk/" + me.hostInstance.config?.botOptions?.botInfo?.taskBotId + "/settings",
            type: "GET",
            headers: {
                "Authorization": "bearer " + me.hostInstance.config?.botOptions?.accessToken
            },
            data: {},

            success: function (data: any) {
                if (callback) callback(null, data);
            },
            error: function (err:any) {
            }
        }) as any;
    }

    onInit() {
        let me = this;
        let $ = me.hostInstance.$;
        me.installPickerTemplates();
    }
    
    /**
     * To install the solutions templates
     */

    installPickerTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new TemplateAnswers());
    }

    /**
     * Handles streaming messages for answer template
     */
    handleStreamingMessage(msgData: any) {
        const me: any = this;
        const cwInstance = me.hostInstance;
        const messageId = msgData.messageId;
        
        // Extract text chunk - ensure we only get string values
        let newChunkText = msgData.message?.[0]?.component?.payload?.payload?.answer || 
                          msgData.message?.[0]?.component?.payload?.text || 
                          msgData.message?.[0]?.cInfo?.body || 
                          '';
        
        // Ensure newChunkText is a string, not an object
        if (typeof newChunkText === 'object') {
            newChunkText = '';
        }

        let streamState = me.streamingMessages.get(messageId);

        if (!streamState) {
            // First chunk - initialize streaming state
            cwInstance.hideTypingIndicator();
            me.streamingMessages.set(messageId, {
                text: newChunkText,
                msgData: msgData
            });

            const messageHtml = cwInstance.generateMessageDOM(msgData);
            if (!messageHtml) return;

            let chatWindowEvent = { stopFurtherExecution: false };
            cwInstance.emit(cwInstance.EVENTS.BEFORE_RENDER_MSG, {
                messageHtml: messageHtml,
                msgData: msgData,
                chatWindowEvent: chatWindowEvent
            });

            if (chatWindowEvent.stopFurtherExecution) {
                me.streamingMessages.delete(messageId);
                return;
            }

            const chatContainer = cwInstance.chatEle.querySelector('.chat-widget-body-wrapper');
            if (chatContainer && messageHtml) {
                chatContainer.appendChild(messageHtml);
            }
            cwInstance.scrollToBottom();
        } else {
            // Subsequent chunks - accumulate text
            // If this is the final chunk with complete answer_payload, replace entire msgData
            if (msgData.endChunk && msgData.message?.[0]?.component?.payload?.answer_payload) {
                streamState.text += newChunkText;
                streamState.msgData = msgData;
                streamState.msgData.message[0].cInfo.body = streamState.text;
                if (streamState.msgData.message[0].component?.payload?.payload?.answer !== undefined) {
                    streamState.msgData.message[0].component.payload.payload.answer = streamState.text;
                }
            } else if (newChunkText) {
                // Regular chunk - just accumulate text
                streamState.text += newChunkText;
                streamState.msgData.message[0].cInfo.body = streamState.text;
                if (streamState.msgData.message[0].component?.payload?.text) {
                    streamState.msgData.message[0].component.payload.text = streamState.text;
                }
                if (streamState.msgData.message[0].component?.payload?.payload?.answer !== undefined) {
                    streamState.msgData.message[0].component.payload.payload.answer = streamState.text;
                }
                me.updateStreamingMessage(messageId, streamState.text);
            }
        }

        if (msgData.endChunk) {
            me.stopStreamingMessage(messageId);
        }
    }

    /**
     * Updates the streaming message in the DOM with accumulated text
     */
    updateStreamingMessage(messageId: string, fullText: string) {
        const me: any = this;
        const cwInstance = me.hostInstance;
        const helpers = KoreHelpers.helpers;

        // Check for answerTemplate streaming element
        const answerElement = cwInstance.chatEle.querySelector(
            `[data-cw-msg-id="${messageId}"] .sa-answer-result-heading`
        );

        if (answerElement) {
            const htmlContent = helpers.convertMDtoHTML(fullText, "bot", {});
            answerElement.innerHTML = htmlContent;
            cwInstance.scrollToBottom();
            return;
        }
    }

    /**
     * Finalizes streaming and replaces with full answer template
     */
    stopStreamingMessage(messageId: string) {
        const me: any = this;
        const cwInstance = me.hostInstance;
        const streamState = me.streamingMessages.get(messageId);

        if (!streamState) return;

        streamState.msgData.message[0].cInfo.body = streamState.text;
        if (streamState.msgData.message[0].component?.payload?.text) {
            streamState.msgData.message[0].component.payload.text = streamState.text;
        }
        if (streamState.msgData.message[0].component?.payload?.payload?.answer !== undefined) {
            streamState.msgData.message[0].component.payload.payload.answer = streamState.text;
        }

        // Mark streaming as complete to trigger full template render
        streamState.msgData.endChunk = true;

        // Check if this is an answerTemplate - if so, replace streaming template with full template
        const isAnswerTemplate = streamState.msgData.message?.[0]?.component?.payload?.template_type === 'answerTemplate';
        let domElement = cwInstance.chatEle.querySelector(`[data-cw-msg-id="${messageId}"]`);

        if (isAnswerTemplate && domElement) {
            const newMessageHtml = cwInstance.generateMessageDOM(streamState.msgData);
            if (newMessageHtml && domElement.parentNode) {
                domElement.parentNode.replaceChild(newMessageHtml, domElement);
                domElement = newMessageHtml;
                cwInstance.scrollToBottom();
            }
        }
        cwInstance.scrollToBottom();

        cwInstance.emit(cwInstance.EVENTS.AFTER_RENDER_MSG, {
            messageHtml: domElement,
            msgData: streamState.msgData
        });

        me.streamingMessages.delete(messageId);
    }
}
export default AnswersTemplatesPlugin;