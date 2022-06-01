// import * as emojione  from 'emojione';

class EmojiPlugin {
    constructor() {
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });

    }
    onInit() {
        let me = this;
        console.log('hello im emoji');
        console.log(emojione);
    }
}
export default EmojiPlugin;