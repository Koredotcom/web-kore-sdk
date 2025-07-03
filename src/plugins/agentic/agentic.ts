import AgenticChartWrapper from './templates/chart-wrapper';

class AgenticPlugin {
    name: string = 'AgenticPlugin';
    constructor() {
        // constructor
    }

    onHostCreate() {
        let me: any = this;
        me.hostInstance.on("onWSMessage", (message: any) => {
            try {
                if (message?.messageData?.type === 'bot_response' && message.messageData?.message?.length > 0) {
                    const messageItem = message.messageData.message[0];
                    if (messageItem?.component?.payload?.text) {
                        const payload = messageItem.component.payload;
                        const text = payload.text;

                        // Regexes for different content types
                        const chartRegex = /```\s*\n?\s*chart\s*([\s\S]*?)\s*```/;
                        const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
                        const codeRegex = /```(?!chart\b|json\b)(\w*)\s*([\s\S]*?)\s*```/;
                        const commonMarkdownRegex = /^(\s*[-*+]\s|#+\s+|\|.*\|)/m; // Lists, headers, tables

                        if (
                            chartRegex.test(text) ||
                            jsonRegex.test(text) ||
                            codeRegex.test(text) ||
                            commonMarkdownRegex.test(text)
                        ) {
                            payload.agentic = true;
                        }
                    }
                }
            } catch (e) {
                console.error("AgenticPlugin: error processing message", e);
            }
        });

        me.hostInstance.on('onChatHistoryResponse', (res: any) => {
            const chartRegex = /```\s*\n?\s*chart\s*([\s\S]*?)\s*```/;
            const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
            const codeRegex = /```(?!chart\b|json\b)(\w*)\s*([\s\S]*?)\s*```/;
            const commonMarkdownRegex = /^(\s*[-*+]\s|#+\s+|\|.*\|)/m; // Lists, headers, tables

            let response = res.historyResponse;

            if (response && response[1] && response[1].messages.length > 0) {
                response[1].messages.forEach((msgData: any) => {
                    if (msgData.type === 'bot_response' && msgData.message?.length > 0) {
                        const messageItem = msgData.message[0];
                        if (messageItem?.type == ' text' && messageItem?.cInfo?.body) {
                            const text = messageItem.cInfo.body;
                            if (chartRegex.test(text) || jsonRegex.test(text) || codeRegex.test(text) || commonMarkdownRegex.test(text)) {
                                messageItem.cInfo.agentic = true;
                            }
                        }
                    }
                });
            }
        });

        me.hostInstance.templateManager.installTemplate(new AgenticChartWrapper());
    }
}

export default AgenticPlugin;
