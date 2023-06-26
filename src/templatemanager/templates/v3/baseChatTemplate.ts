import { getHTML } from "../../base/domManager";

class BaseChatTemplate {

    getHTMLFromPreact(Component: any, msgData: any, hostInstance: any) {
        return getHTML(Component, msgData, hostInstance)
    }
}

export default BaseChatTemplate;