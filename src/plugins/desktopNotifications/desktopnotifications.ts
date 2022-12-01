import { DesktopNotificationPluginScript } from "../desktopNotifications/desktopnotifications-script";

class KoreDesktopNotificationPlugin {
    name: any = 'KoreDesktopNotificationPlugin ';
    config: any = {};
    isOutTabFocus: boolean = false
    constructor(config?: any) {
        this.config = {
            ...this.config,
            ...config
        }
    }

    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("jwtGrantSuccess", (response: any) => {
            me.onInit();
            this.config = me.extend(me, response)
        });

    }
    onInit() {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
        window.addEventListener("blur", () => {
            me.isOutTabFocus = true
        });
        window.addEventListener("focus", () => {
            me.isOutTabFocus = false
        })

        let me: any = this;
        me.hostInstance.on('onWSMessage', (event: any) => {

            if (event.messageData?.message?.type === 'agent_connected') {
                var snd = new Audio('https://uat.kore.ai/agents/sounds/Basic%20Alert%20High.mp3');
                snd.play();
            }

            if (event.messageData.type === "bot_response" && event.messageData?.message[0]?.component?.payload?.payload?.text) {
                if (Notification.permission !== "granted") return;
                const text = event.messageData?.message[0]?.component?.payload?.payload?.text;
                const title = "Agent is available now";
                const options = {
                    body: text,
                    vibrate: [200, 100, 200],
                    sound: "/home/vishalveerannapet/kore/desktop-notification/web-kore-sdk/src/plugins/desktopNotifications/Desktop Notification sdk.mp3",
                    requireInteraction: false,
                    onclick: (event: any) => {
                        event.target.close();
                    }
                }
                let notification: any
                if (me.isOutTabFocus) {
                    notification = new Notification("You have a new notification ", options);
                    var snd = new Audio('https://uat.kore.ai/agents/sounds/Basic%20Alert%20High.mp3');
                    snd.play();
                }
                if (notification) {
                    notification.onclick = function (event: any) {
                        window.parent.focus();
                        notification.close();
                    };
                }
            }
        });
    }
    extend(target: any, source: any) {
        let me: any = this;
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

export default KoreDesktopNotificationPlugin;