import ButtonTemplate from './templates/button/buttonTemplate';
import ListTemplate from './templates/listTemplate/listTemplate';
import QuickReplyTemplate from './templates/quickReplyTemplate/quickReplyTemplate';
import TemplateAttachment from './templates/templateAttachment/templateAttachment';
import TableChartTemplate from './templates/tableTemplate/tableTemplate';
import CheckBoxesTemplate from './templates/checkBoxesTemplate/checkBoxesTemplate';
import DropdownTemplate from './templates/dropdownTemplate/dropdownTemplate';
import LikeDislikeTemplate from './templates/likeDislikeTemplate/likeDislikeTemplate';
import FormTemplate from './templates/formTemplate/formTemplate';
import AdvancedMultiSelectTemplate from './templates/advancedMultiSelect/advancedMultiSelect';
import TableListTemplate from './templates/tableListTemplate/tableListTemplate';
import RatingTemplate from './templates/ratingTemplate/ratingTemplate';
import ListWidgetTemplate from './templates/listWidgetTemplate/listWidgetTemplate';
import MiniTableChartTemplate from './templates/miniTableTemplate/miniTableTemplate';
import CarouselTemplate from './templates/carouselTemplate/carouselTemplate';
import ListViewTemplate from './templates/listViewTemplate/listViewTemplate';
import IframeTemplate from './templates/iframeTemplate/iframeTemplate';
import SystemTemplate from './templates/systemTemplate/systemTemplate';
import AdvancedListTemplate from './templates/advancedListTemplate/advancedListTemplate';
import CardTemplate from './templates/cardTemplate/cardTemplate';
import CheckListTemplate from './templates/checkListTemplate/checkList';

// import './customTemplate.css';
// import '../../../libs/purejscarousel.css';
//(function($){

class TemplateManager {
	hostInstance: any;
	templates: any[];
	chatInitialize: any;
	helpers: any;
	constructor(hostInstance:any){
		this.hostInstance = hostInstance;//chatwindowInstance|SearchSDK Instance|WidgetSDK Instanse
		// this.helpers = null;
		// this.extension = null;
		this.templates = [];
		this.installDefaultTemplates();
	}

	installTemplate  (template: any) {
		this.templates.unshift(template);
		template.hostInstance = this.hostInstance;
	};
	installDefaultTemplates() {
		
	this.installTemplate(new ButtonTemplate());
	this.installTemplate(new ListTemplate());
	this.installTemplate(new QuickReplyTemplate());
	this.installTemplate(new TemplateAttachment());
	this.installTemplate(new TableChartTemplate());
	this.installTemplate(new CheckBoxesTemplate());
	this.installTemplate(new DropdownTemplate());
	this.installTemplate(new LikeDislikeTemplate());
	this.installTemplate(new FormTemplate());
	this.installTemplate(new AdvancedMultiSelectTemplate());
	this.installTemplate(new TableListTemplate());
	this.installTemplate(new RatingTemplate());
	this.installTemplate(new ListWidgetTemplate());
	this.installTemplate(new CarouselTemplate());
	this.installTemplate(new MiniTableChartTemplate());
	this.installTemplate(new ListViewTemplate());
	// this.installTemplate(new SystemTemplate());
	this.installTemplate(new AdvancedListTemplate());
	this.installTemplate(new CardTemplate());


	this.installTemplate(new IframeTemplate());
	this.installTemplate(new CheckListTemplate());

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
				return messageHtml;
			}
		}

		return messageHtml;
	}

}

export default TemplateManager;