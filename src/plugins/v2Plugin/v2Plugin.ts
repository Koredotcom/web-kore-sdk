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

class V2Plugin {
    name = 'V2Plugin';
    config = {};
    hostInstance: any;
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
    }

    onInit() {
        let me = this;
        let $ = me.hostInstance.$;
        if (me.hostInstance.config.UI.version == 'v2') {
            me.installPickerTemplates();
        }
    }

    installPickerTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new ButtonTemplate());
        templateManager.installTemplate(new ListTemplate());
        templateManager.installTemplate(new QuickReplyTemplate());
        templateManager.installTemplate(new TemplateAttachment());
        templateManager.installTemplate(new TableChartTemplate());
        templateManager.installTemplate(new CheckBoxesTemplate());
        templateManager.installTemplate(new DropdownTemplate());
        templateManager.installTemplate(new LikeDislikeTemplate());
        templateManager.installTemplate(new FormTemplate());
        templateManager.installTemplate(new AdvancedMultiSelectTemplate());
        templateManager.installTemplate(new TableListTemplate());
        templateManager.installTemplate(new ListWidgetTemplate());
        templateManager.installTemplate(new CarouselTemplate());
        templateManager.installTemplate(new MiniTableChartTemplate());
        templateManager.installTemplate(new ListViewTemplate());
        templateManager.installTemplate(new SystemTemplate());
        templateManager.installTemplate(new AdvancedListTemplate());
        templateManager.installTemplate(new CardTemplate());
        templateManager.installTemplate(new IframeTemplate());
    }
}
export default V2Plugin;