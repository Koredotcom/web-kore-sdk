function WeatherCard(msgData) {
    const testMe = () => {
        alert("hello");
    }

    return (
        <>
            {<div style={{ background: "#c1c172" }}>
                <div>
                    <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" />
                    <h1>Temp {msgData.message[0].component.payload.temparature}</h1>
                    <p>weather-template works!{msgData.messageId}</p>
                    <button onClick={testMe}>Test</button>
                </div>
            </div>}
        </>
    )

}

export default WeatherCard;