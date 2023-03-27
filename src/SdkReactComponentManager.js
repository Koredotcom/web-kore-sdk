import React from "react";
import ReactDOM from 'react-dom/client';

import WeatherCard from "./WeatherCard";

class SDKReactComponentManager {
    constructor(){
    }
    renderMessage(msgData) {
        const e = React.createElement;
        const domContainer = document.createElement('div');
        const root = ReactDOM.createRoot(domContainer);
        if (msgData && msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type === 'custom_weather_template') {
            root.render(e(WeatherCard, msgData));
            return domContainer;
        }else{
            return false;
        }
    }
}

export default SDKReactComponentManager;