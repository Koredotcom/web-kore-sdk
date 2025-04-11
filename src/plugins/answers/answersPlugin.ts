import TemplateAnswers from './templates/answerTemplate/answerTemplate'

/**
 *  Solutions template plugin class
 *
 * @decorator Class
 */
class AnswersTemplatesPlugin {

    name = 'AnswersTemplatesPlugin';
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
        cwInstance.on('jwtGrantSuccess', (e:any) => {
            me.getFeedbackSettings();
         })
    }


    getFeedbackSettings(){
        let me:any = this;
        let cwInstance = me.hostInstance;
        const feedback = {
            enable:false,
            }
            me.getFeedbackSettingsAPICall().then(function (res: any) {
                cwInstance.config["feedback"] = {...feedback,...res?.feedback};
                cwInstance.on('beforeWSSendMessage', (msg:any) => {
                    msg.messageToBot['isFeedbackEnabled'] =  cwInstance.config["feedback"]?.["enable"];
                })
            }, function (errRes: any) {
            });
    }

    getFeedbackSettingsAPICall(callback: any): Promise<any> {
        let me: any = this;
        let $ = me.hostInstance.$;
        return $.ajax({
            url: me.hostInstance.config?.botOptions?.koreAPIUrl + "searchsdk/" + me.hostInstance.config?.botOptions?.botInfo?.taskBotId + "/settings",
            type: "GET",
            headers: {
                // "auth": me.hostInstance.config?.botOptions?.assertion,
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
}
export default AnswersTemplatesPlugin;