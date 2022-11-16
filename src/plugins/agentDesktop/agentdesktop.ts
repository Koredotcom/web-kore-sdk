import { AgentDesktopPluginScript } from './agentdesktop-script';


class AgentDesktopPlugin {
    name: any = 'AgentDesktopPlugin';
    config: any = {};
    agentDesktopInfo :any;
    constructor(config?: any) {
        this.config = {
            ...this.config,
            ...config
        }

    }
    onHostCreate() {
        let me:any = this;
        let cwInstance = me.hostInstance;

        cwInstance.on("jwtGrantSuccess", (response:any) => {
            if (!this.agentDesktopInfo) {
                me.onInit();
                this.config=me.extend(me,response)
                //me.AgentDesktop(response.userInfo.userId, response);
                this.agentDesktopInfo = new AgentDesktopPluginScript(this.config);
            }
        });

    }
    onInit() {
        // let me = this;
        this.appendVideoAudioElemnts()
        // this.koreCoBrowse = me.koreCoBrowseInit({});
        // this.rrweb = me.rrwebInit({});
    }

    appendVideoAudioElemnts(){
        let me:any = this;
        let cwInstance = me.hostInstance;
        let chatEle = cwInstance.chatEle;
        let localVideoElement ='<video id="kore_local_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        let remoteVideoElement ='<video id="kore_remote_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        chatEle.append(localVideoElement);
        chatEle.append(remoteVideoElement);
    }

    extend(target:any, source:any) {
        let me:any=this;
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (target[prop] && typeof source[prop] === 'object') {
                    me.extend(target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
      }
}
export default AgentDesktopPlugin;
