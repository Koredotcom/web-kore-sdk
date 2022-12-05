class KoreDesktopNotificationPlugin {
    name: string = 'KoreDesktopNotificationPlugin ';
    config: any = {};
    isTabActive: boolean = true;

    notificationSound = "/assets/notification.mp3";
    constructor() {}

    onHostCreate() {
        this.onInit();
    }
    onInit() {
        let me: any = this;

        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
              me.isTabActive = true;
            } else {
              me.isTabActive = false;
            }
          });

        me.hostInstance.on('onWSMessage', (event: any) => {

            if (event.messageData?.message?.type === 'agent_connected') {
                var snd = new Audio(this.notificationSound);
                snd.play();
            }

            if (event.messageData?.type === 'bot_response' && event.messageData?.message[0]?.component?.payload?.payload?.template_type === 'live_agent' && event.messageData?.message[0]?.component?.payload?.payload?.text) {
                if (Notification.permission !== "granted") return;

                const text = event.messageData?.message[0]?.component?.payload?.payload?.text;
                const options = {
                    body: text,
                    icon: "/assets/smartassist-logo.png",
                    sound: this.notificationSound,
                    requireInteraction: false,
                    onclick: (event: any) => {
                        event.target.close();
                    }
                }
                let notification: any;
                
                if (!me.isTabActive) {

                    if (event.messageData.author?.firstName) {
                        const agentName = event.messageData.author.firstName + " " + event.messageData.author.lastName;
                        notification = new Notification("New message from " + agentName, options);
                    } else {
                        notification = new Notification("You have a new notification.", options);
                    }
                    
                    var snd = new Audio(this.notificationSound);
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
}

export default KoreDesktopNotificationPlugin;