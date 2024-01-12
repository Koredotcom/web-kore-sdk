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
import MessageTemplate from './templates/v3/message/message';
import DigitalFormTemplate from './templates/v3/digitalForm/digitalForm';
import TemplateButton from './templates/v3/button/button';
import cardTemplate from './templates/v3/cardTemplate/cardTemplate';
import Carousel from './templates/v3/carouselTemplate/carouselTemplate';
import QuickRepliesTemplate from './templates/v3/quickReplies/quickReplies';
import TableTemplate from './templates/v3/table/table';
import TemplateTableList from './templates/v3/tableList/tableList';
import RadioOptionsTemplate from './templates/v3/radioOptions/radioOptions';
import MiniTableTemplate from './templates/v3/miniTable/miniTable';
import TemplateListView from './templates/v3/listView/listView';
import TemplateList from './templates/v3/list/list';
import TemplateDropdown from './templates/v3/dropdown/dropdown';
import TemplateCheckBoxes from './templates/v3/checkBoxes/checkBoxes';
import TemplateAdvancedMultiSelect from './templates/v3/advancedMutliSelect/advancedMultiSelect';
import TemplateAdvancedList from './templates/v3/advancedList/advancedList';
import TemplateForm from './templates/v3/formTemplate/formTemplate';
import TemplateDatePicker from './templates/v3/datePicker/datePicker';
import TemplatePieChart from './templates/v3/pieChart/pieChart';
import TemplateBarChart from './templates/v3/barChart/barChart';
import TemplateLineChart from './templates/v3/lineChart/lineChart';
import TemplateLikeDislike from './templates/v3/likeDislike/likeDislike';
import TemplateFeedback from './templates/v3/feedback/feedback';
import TemplateDateRange from './templates/v3/dateRange/dateRange';
import TemplateClockPicker from './templates/v3/clockPicker/clockPicker';
import TemplateSystem from './templates/v3/system/system';
import TemplateAttachmentV3 from './templates/v3/templateAttachment/templateAttachment';
import TemplateAnswers from '../plugins/answers/answerTemplate';
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
		if (hostInstance.config.UI.version === 'v2') {
		    this.installDefaultTemplates();
		} else {
            this.installDefaultTemplatesV3();
		}

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
	this.installTemplate(new SystemTemplate());
	this.installTemplate(new AdvancedListTemplate());
	this.installTemplate(new CardTemplate());
	this.installTemplate(new IframeTemplate());
	}

	installDefaultTemplatesV3() {
		// this.installTemplate(new MessageTemplate());
		this.installTemplate(new DigitalFormTemplate());
		this.installTemplate(new TemplateButton());
		this.installTemplate(new cardTemplate());
		this.installTemplate(new Carousel());
		this.installTemplate(new QuickRepliesTemplate());
		this.installTemplate(new TableTemplate());
		this.installTemplate(new TemplateTableList());
		this.installTemplate(new RadioOptionsTemplate());
		this.installTemplate(new MiniTableTemplate());
		this.installTemplate(new TemplateListView());
		this.installTemplate(new TemplateList());
		this.installTemplate(new TemplateDropdown());
		this.installTemplate(new TemplateCheckBoxes());
		this.installTemplate(new TemplateAdvancedMultiSelect());
		this.installTemplate(new TemplateAdvancedList());
		this.installTemplate(new TemplateForm());
		this.installTemplate(new TemplateDatePicker());
		this.installTemplate(new TemplatePieChart());
		this.installTemplate(new TemplateBarChart());
		this.installTemplate(new TemplateLineChart());
		this.installTemplate(new TemplateLikeDislike());
		this.installTemplate(new TemplateFeedback());
		this.installTemplate(new TemplateDateRange());
		this.installTemplate(new TemplateClockPicker());
		this.installTemplate(new TemplateSystem());
		this.installTemplate(new TemplateAttachmentV3());
		this.installTemplate(new TemplateAnswers());
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