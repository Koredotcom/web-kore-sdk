class KoreDesktopNotificationPlugin {
    name: string = 'KoreDesktopNotificationPlugin ';
    config: any = {};
    isTabActive: boolean = true;

    notificationSound = "/assets/plugins/KoredesktopNotifications/desktopNotificationAudio/notification.mp3";
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
            // debugger
            // console.log(me.notificationSound)
            console.log(this.notificationSound)
            if (event.messageData?.message?.type === 'agent_connected') {
                console.log(this.notificationSound)
                var snd = new Audio(me.notificationSound);
                console.log('lay')
                snd.play();
            }

            if (event.messageData?.type === 'bot_response' && event.messageData?.message[0]?.component?.payload?.payload?.template_type === 'live_agent' && event.messageData?.message[0]?.component?.payload?.payload?.text) {
                if (Notification.permission !== "granted") return;

                const text = event.messageData?.message[0]?.component?.payload?.payload?.text;
                const options = {
                    body: text,
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