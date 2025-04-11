import MessageTemplate from './templates/message/message';
import DigitalFormTemplate from './templates/digitalForm/digitalForm';
import TemplateButton from './templates/button/button';
import cardTemplate from './templates/cardTemplate/cardTemplate';
import Carousel from './templates/carouselTemplate/carouselTemplate';
import QuickRepliesTemplate from './templates/quickReplies/quickReplies';
import TableTemplate from './templates/table/table';
import TemplateTableList from './templates/tableList/tableList';
import RadioOptionsTemplate from './templates/radioOptions/radioOptions';
import MiniTableTemplate from './templates/miniTable/miniTable';
import TemplateListView from './templates/listView/listView';
import TemplateList from './templates/list/list';
import TemplateDropdown from './templates/dropdown/dropdown';
import TemplateCheckBoxes from './templates/checkBoxes/checkBoxes';
import TemplateAdvancedMultiSelect from './templates/advancedMutliSelect/advancedMultiSelect';
import TemplateAdvancedList from './templates/advancedList/advancedList';
import TemplateForm from './templates/formTemplate/formTemplate';
import TemplateDatePicker from './templates/datePicker/datePicker';
import TemplatePieChart from './templates/pieChart/pieChart';
import TemplateBarChart from './templates/barChart/barChart';
import TemplateLineChart from './templates/lineChart/lineChart';
import TemplateLikeDislike from './templates/likeDislike/likeDislike';
import TemplateFeedback from './templates/feedback/feedback';
import TemplateDateRange from './templates/dateRange/dateRange';
import TemplateClockPicker from './templates/clockPicker/clockPicker';
import TemplateSystem from './templates/system/system';
import TemplateAttachmentV3 from './templates/templateAttachment/templateAttachment';
import TemplateListWidget from './templates/listWidget/listWidget';
import AdvancedMultiListTemplate from './templates/advancedMulitList/advancedMultiList';
import InlineFormTemplate from './templates/inlineForm/inlineForm';
import ArticleTemplate from './templates/articleTemplate/article';
import OTPTemplate from './templates/otp/otp';
import ResetPinTemplate from './templates/resetPin/resetPin';
import CheckListTemplate from './templates/checkList/checkList';
import TemplateAnswers from '../plugins/answers/templates/answerTemplate/answerTemplate';
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
		if (hostInstance.config.UI.version == 'v3') {
			this.installDefaultTemplates();
		}
	}

	installTemplate  (template: any) {
		this.templates.unshift(template);
		template.hostInstance = this.hostInstance;
	};

	installDefaultTemplates() {
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
		this.installTemplate(new TemplateListWidget());
		this.installTemplate(new AdvancedMultiListTemplate());
		this.installTemplate(new InlineFormTemplate());
		this.installTemplate(new ArticleTemplate());
		this.installTemplate(new OTPTemplate());
		this.installTemplate(new ResetPinTemplate());
		this.installTemplate(new CheckListTemplate());
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