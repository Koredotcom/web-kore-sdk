import { ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { Weather } from 'src/components/weather.component';

export class DOMManager {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }
    renderMessage(msgData: any) {
        if (msgData && msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type === 'custom_weather_template') {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(Weather);
            const componentRef = componentFactory.create(this.injector);

            componentRef.instance.msgData = msgData;

            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

            return domElem;
        } else {
            return false;
        }
    }
}