import { h, render } from 'preact';

class DomManager {
  component: any;
  componentRenderMessage: any;
  hostInstance: any;
  constructor(component: any, host: any) {
    this.component = component;
    this.hostInstance = host;
  }

  renderMessage(msgData: any) {
    let self = this;
    let hostInstance = self.hostInstance;
    const domContainer = document.createElement('div');

    render(
      h(this.component, {
        hostInstance: hostInstance,
        msgData: msgData
      }),
      domContainer
    );
    return domContainer;
  }
}

export function getHTML(comp: any, msgData: any, hostInstance: any) {
  const krDomManager = new DomManager(comp, hostInstance);
  const html = krDomManager.renderMessage(msgData);
  return html;
}
export default DomManager;