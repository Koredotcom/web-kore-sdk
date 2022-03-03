import LineChartTemplate from '../components/custom/templates/lineChartTemplate/lineChartTemplate';
import BarChartTemplate from '../components/custom/templates/barChartTemplate/barChartTemplate';
import PieChartTemplate from '../components/custom/templates/pieChartTemplate/pieChartTemplate';

class GraphTemplatesPlugin {
    name = 'GraphTemplatesPlugin';
    config = {
    };
    constructor(config) {
        config=config ||{};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance=me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });
       
    }
    onInit() {
        let me = this;
        me.installPickerTemplates();
    }
    installPickerTemplates(){
        let me=this;
        let templateManager = me.hostInstance.customTemplateObj;
        templateManager.installTemplate(new LineChartTemplate());
		templateManager.installTemplate(new BarChartTemplate());
		templateManager.installTemplate(new PieChartTemplate());
    }
    
}
export default GraphTemplatesPlugin;
