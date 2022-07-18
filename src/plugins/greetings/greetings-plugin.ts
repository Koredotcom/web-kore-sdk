import './greetings-plugin.scss'

class GreatingsPlugin {
    $:any;
    ele:any;
    cwInstance:any;
    constructor() {
    }
    onHostCreate() {
        let me:any = this;
        me.cwInstance = me.hostInstance;
        me.$=me.cwInstance.$;
        // me.cwInstance.on("viewInit", (chatWindowEle:any) => {
        //     me.onInit();

          
        //     me.$(chatWindowEle.chatEle).find('.minimize-btn').off('click').on('click',function(){
        //     alert("test");}
        //     );
          
              
        // });

    }
    onInit() {
        let me:any = this;
        let $=me.hostInstance.$;
        let chatEle = me.cwInstance.chatEle;
        me.ele=$('<div class="greetings-cntr"></div>');
        $(chatEle).find(".kore-header").prepend(me.ele);
        me.generateMessage();
        me.bindEvents()
    }

    generateMessage(){
        let me:any = this;
        let $=me.hostInstance.$;
        let botMessage="{\"type\":\"bot_response\",\"from\":\"bot\",\"message\":[{\"type\":\"text\",\"component\":{\"type\":\"template\",\"payload\":{\"type\":\"template\",\"payload\":{\"text\":\"Pick a color:\",\"template_type\":\"quick_replies\",\"quick_replies\":[{\"content_type\":\"postback\",\"title\":\"Red\",\"payload\":\"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED\",\"image_url\":\"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg\",\"renderMsg\":\"red Render\"},{\"content_type\":\"text\",\"title\":\"Green\",\"payload\":{\"name\":\"green payload\"},\"image_url\":\"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg\"}]}}},\"cInfo\":{\"body\":\"{\\\"type\\\":\\\"template\\\",\\\"payload\\\":{\\\"text\\\":\\\"Pick a color:\\\",\\\"template_type\\\":\\\"quick_replies\\\",\\\"quick_replies\\\":[{\\\"content_type\\\":\\\"postback\\\",\\\"title\\\":\\\"Red\\\",\\\"payload\\\":\\\"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED\\\",\\\"image_url\\\":\\\"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg\\\",\\\"renderMsg\\\":\\\"red Render\\\"},{\\\"content_type\\\":\\\"text\\\",\\\"title\\\":\\\"Green\\\",\\\"payload\\\":{\\\"name\\\":\\\"green payload\\\"},\\\"image_url\\\":\\\"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg\\\"}]}}\"}}],\"messageId\":\"ms-0930318b-aaa2-5b3c-973d-89c34f48816b\",\"botInfo\":{\"chatBot\":\"SDKBot\",\"taskBotId\":\"st-b9889c46-218c-58f7-838f-73ae9203488c\"},\"createdOn\":\"2022-07-11T17:02:38.657Z\",\"icon\":\"https://dlnwzkim0wron.cloudfront.net/f-5e050d52-6c4a-5442-b7e6-2ddbc93e4df7.png\",\"traceId\":\"e844abc31eb6b36f\"}";
        //let botMessage='{"type":"bot_response","from":"bot","message":[{"type":"text","component":{"type":"text","payload":{"text":"Im SDKBot."}},"cInfo":{"body":"Im SDKBot."}}],"messageId":"ms-91a55a36-71f4-5bcc-a556-de465621ab0e","botInfo":{"chatBot":"SDKBot","taskBotId":"st-b9889c46-218c-58f7-838f-73ae9203488c"},"createdOn":"2022-07-11T07:12:02.361Z","icon":"https://dlnwzkim0wron.cloudfront.net/f-5e050d52-6c4a-5442-b7e6-2ddbc93e4df7.png","traceId":"2631d9538d2c5c89"}'
        //let botMessage='{"type":"bot_response","from":"bot","message":[{"type":"text","component":{"type":"template","payload":{"type":"template","payload":{"text":"Pick a color:","template_type":"quick_replies","quick_replies":[{"content_type":"postback","title":"Red","payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED","image_url":"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg","renderMsg":"red Render"},{"content_type":"text","title":"Green","payload":{"name":"green payload"},"image_url":"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg"}]}}},"cInfo":{"body":"{\"type\":\"template\",\"payload\":{\"text\":\"Pick a color:\",\"template_type\":\"quick_replies\",\"quick_replies\":[{\"content_type\":\"postback\",\"title\":\"Red\",\"payload\":\"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED\",\"image_url\":\"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg\",\"renderMsg\":\"red Render\"},{\"content_type\":\"text\",\"title\":\"Green\",\"payload\":{\"name\":\"green payload\"},\"image_url\":\"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg\"}]}}"}}],"messageId":"ms-0e0d95fa-5117-5af3-901d-0e89c7b35654","botInfo":{"chatBot":"SDKBot","taskBotId":"st-b9889c46-218c-58f7-838f-73ae9203488c"},"createdOn":"2022-07-11T16:46:23.543Z","icon":"https://dlnwzkim0wron.cloudfront.net/f-5e050d52-6c4a-5442-b7e6-2ddbc93e4df7.png","traceId":"b5429b1f28d0ea4f"}'
        //let botMessage='{"type":"bot_response","from":"bot","message":[{"type":"text","component":{"type":"template","payload":{"type":"template","payload":{"text":"Pick a color:","template_type":"quick_replies","quick_replies":[{"content_type":"postback","title":"Red","payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED","image_url":"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg","renderMsg":"red Render"},{"content_type":"text","title":"Green","payload":{"name":"green payload"},"image_url":"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg"}]}}},"cInfo":{"body":"{"type":"template","payload":{"text":"Pick a color:","template_type":"quick_replies","quick_replies":[{"content_type":"postback","title":"Red","payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED","image_url":"https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg","renderMsg":"red Render"},{"content_type":"text","title":"Green","payload":{"name":"green payload"},"image_url":"https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg"}]}}"}}],"messageId":"ms-0e0d95fa-5117-5af3-901d-0e89c7b35654","botInfo":{"chatBot":"SDKBot","taskBotId":"st-b9889c46-218c-58f7-838f-73ae9203488c"},"createdOn":"2022-07-11T16:46:23.543Z","icon":"https://dlnwzkim0wron.cloudfront.net/f-5e050d52-6c4a-5442-b7e6-2ddbc93e4df7.png","traceId":"b5429b1f28d0ea4f"}';
        let botParsedMessage=me.hostInstance.parseSocketMessage(botMessage);
        let msgHTML=me.hostInstance.generateMessageHTML(botParsedMessage);
        debugger;
        $(msgHTML).off('click', '.quickReply').on('click', '.quickReply', function(){
            alert("override");
        })
        me.ele.append(msgHTML);

    }
    bindEvents(){
        let me:any=this;
        me.ele.on('click',function(){
            //alert("tsta");
            me.hostInstance.chatEle.find('.minimized').trigger('click');
        })
    }


}
export default GreatingsPlugin;