import LineChartTemplate from '../templatemanager/templates/lineChartTemplate/lineChartTemplate';
import BarChartTemplate from '../templatemanager/templates/barChartTemplate/barChartTemplate';
import PieChartTemplate from '../templatemanager/templates/pieChartTemplate/pieChartTemplate';

/**
 *  Graph template plugin class
 *
 * @decorator Class
 */
class GraphTemplatesPlugin {
    name = 'GraphTemplatesPlugin';
    config = {
        graphLib: "d3" // or google
    };
    hostInstance: any;
    constructor(config:any) {
        config=config ||{};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance=me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle:any) => {
            me.onInit();
        });
       
    }
    onInit() {
        let me = this;
        me.installPickerTemplates();
    }
    /**
     * To install the pickers templates
     */
    installPickerTemplates(){
        let me=this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new LineChartTemplate());
		templateManager.installTemplate(new BarChartTemplate());
		templateManager.installTemplate(new PieChartTemplate());
    }
    
}
export default GraphTemplatesPlugin;
