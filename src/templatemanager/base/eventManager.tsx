class EventManager {
    eventMapper: any[] = [];
    hostInstance: any;
    constructor(host: any) {
        this.hostInstance = host;
    }

    addEventListener(querySelector: any, event: any, cb: any) {
        if (this.eventMapper.filter((el: any) => el.querySelector === querySelector && el.event == event).length) {
            console.log('An event already registered with the class');
            return;
        }
        this.eventMapper.push({ querySelector, event, cb });
        this.hostInstance.chatEle.querySelector(querySelector)?.addEventListener(event, cb);
    }

    removeEventListener(querySelector: any, event: any) {
        const ele = this.eventMapper.filter((el: any) => el.querySelector == querySelector && el.event == event);
        this.hostInstance.chatEle.querySelector(querySelector)?.removeEventListener(event, ele[0]?.cb);
        this.eventMapper.splice(this.eventMapper.findIndex((el: any) => el.querySelector == querySelector && el.event == event), 1);
    }
}

export default EventManager;