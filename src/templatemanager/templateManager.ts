import MessageTemplate from './templates/message/message';
import QuickRepliesTemplate from './templates/quickReplies/quickReplies';

class TemplateManager {
	hostInstance: any;
	templates: any[];
	chatInitialize: any;
	helpers: any;
	constructor(hostInstance:any){
		this.hostInstance = hostInstance;
		this.templates = [];
		if (hostInstance.config.UI.version == 'v3') {
			this.installDefaultTemplates();
		}
	}

	installTemplate  (template: any) {
		this.templates.unshift(template);
		template.hostInstance = this.hostInstance;
	};

	installDefaultTemplates() {
		this.installTemplate(new MessageTemplate());
		this.installTemplate(new QuickRepliesTemplate());
	}

	renderMessage  (msgData: any) {
		var messageHtml = '';
		var me = this;
		var templatesIndex = 0;

		if (me.templates.length) {
			while (!messageHtml && templatesIndex < me.templates.length) {
				var template = me.templates[templatesIndex]
				if (template.renderMessage) {
					messageHtml = template.renderMessage.call(template, msgData);
				}
				templatesIndex++
			}
			if (messageHtml) {
				console.log('Msg HTML: ', messageHtml);
				return messageHtml;
			}
		}

		return messageHtml;
	}

}

export default TemplateManager;
