import BaseSTT from "../BaseSTT";


class GoogleSTT extends BaseSTT {
    name = 'GoogleSTT';
    // gapi: any = this.gapi || {};
    config = {
    };
    constructor(mainconfig: any) {
        // config = config || {};
        // this.config = {
        //     ...this.config,
        // }
        super();
        this.config = {
            ...this.config,
            ...mainconfig
        }
       
    }
    onHostCreate() {
        let me:any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });

    }
    onInit() {
        let me = this;
        me.installSpeechToTextTemplate();
    }
    
    testMethod(){
        
    }
}
export default GoogleSTT;
