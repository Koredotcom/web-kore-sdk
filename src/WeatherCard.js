function WeatherCard(msgData) {
    const testMe = () => {
        alert("hello");
    }

    /*
    JSON for the below HTML

    {
        "type": "template",
        "payload": {
            "temparature": "38 C",
            "template_type": "custom_weather_template"
        }
    }
    */

    return (
        <>
            {<div style={{ background: "#c1c172" }}>
                <div>
                    <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" />
                    <h1>Temp {msgData.message[0].component.payload.temparature}</h1>
                    <p>weather-template works! msgId-{msgData.messageId}</p>
                    <button onClick={testMe}>Test</button>
                </div>
            </div>}
        </>
    )

}

export default WeatherCard;