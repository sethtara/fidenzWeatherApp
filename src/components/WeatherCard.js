import React, { useEffect, useState } from "react";
import FetchData from "./FetchData";

//weather card component
function WeatherCard(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchData(props.cityId).then((result) => {
            setData(result);
        }).catch((error)=>{
            console.log(error);
        });
    }, [props.cityId]);

    const { name, sys, main, wind, weather } = data;
    const timezoneOffset = data?.timezone;
    const dt = data?.dt;
    
    // Convert the timestamp to a date object and extract the date and time strings
    const currentZoneOffset = new Date().getTimezoneOffset()*60;
    const now = new Date((dt + timezoneOffset + currentZoneOffset) * 1000);
    
    const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});    
    const sunrise = new Date(sys?.sunrise * 1000);
    const sunrise_time = sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    const sunset = new Date(sys?.sunset * 1000);
    const sunset_time = sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return (
        //updates the HTML document with weather data and a background color
        <div class="card">
            <div class="card_up" style={{ backgroundColor:`${props.bgColor}` }}>
                <div className="rec_up">
                    <div id="city_name">
                        {name}, {sys?.country}
                    </div>
                    <div id="time_date">{time},{date}</div>
                    <div id="description">
                        {weather && weather[0] && (
                            <>
                                <img src={`https://openweathermap.org/img/w/${weather[0]?.icon}.png`} alt="" />
                                {weather[0]?.description}
                            </>
                        )}
                    </div>              
          </div>
            <div className="rec_up temp_r">
                <div id="temp">{main?.temp.toFixed(0)}&#176;c</div>
                <div id="min_temp">Temp min : {main?.temp_min.toFixed(1)}&#176;c</div>
                <div id="max_temp">Temp max : {main?.temp_max.toFixed(1)}&#176;c</div>
            </div>
            </div>
            <div className="card_down">
            <div className="rec_down">
                <div id="pressure"><b>Pressure: </b>{main?.pressure}Hpa</div>
                <div id="humidity"><b>Humidity: </b> {main?.humidity}%</div>
                <div id="visibility"><b>Visibility: </b> {data?.visibility / 1000}km</div>
            </div>
                <div className="rec_down" style={{ borderLeft: "1px solid #5d606d", borderRight: "1px solid #5d606d", textAlign: "center" }}>        <div id="windicon">
                    <svg style={{ transform: `rotate(${140 +wind?.deg}deg)` }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z" fill="#ffffff" />
                        </g>
                    </svg>
                </div>
                    <div id="wind">
                        {wind?.speed}m/s {wind?.deg}&#176;
                    </div>
                </div>
                <div class="rec_down">
                <div id="sunrise"><b>Sunrise: </b> {sunrise_time}</div>
                <div id="sunset"><b>Sunset: </b> {sunset_time}</div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
