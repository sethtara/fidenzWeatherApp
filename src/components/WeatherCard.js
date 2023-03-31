import React, { useEffect, useState } from "react";
import FetchData from "./FetchData";
import * as CONST from './constants';

//weather card component
function WeatherCard(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await FetchData(props.cityId);
            setData(result);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
        const interval = setInterval(fetchData, 20 * 1000);
        return () => clearInterval(interval);

      }, [props.cityId]);

    const { name, sys, main, wind, weather } = data;

    return (
        //updates the HTML document with weather data and a background color
        <div class="card">
            <div class="card_up" style={{ backgroundColor: `${props.bgColor}` }}>
                <div className="rec_up">
                    <div id="city_name">
                        {name}, {sys?.country}
                    </div>
                    <div id="time_date">
                        {CONST.formatTime(CONST.getUnixValueNow(data?.dt, data?.timezone))}, 
                        {CONST.formatDate(CONST.getUnixValueNow(data?.dt, data?.timezone))}
                    </div>
                    <div id="description">
                        {weather && weather[0] && (
                            <div>
                                <img src={`assets/img/weatherIcons/${weather[0]?.icon}.png`} alt="" />
                                {weather[0]?.description}
                            </div>
                        )}
                    </div>
                </div>
                <div className="rec_up temp_r">
                    <div id="temp">{main?.temp.toFixed(0)}{CONST.degCelcius}</div>
                    <div id="min_temp">Temp min : {main?.temp_min.toFixed(0)}{CONST.degCelcius}</div>
                    <div id="max_temp">Temp max : {main?.temp_max.toFixed(0)}{CONST.degCelcius}</div>
                </div>
            </div>
            <div className="card_down">
                <div className="rec_down">
                    <div id="pressure"><b>Pressure:</b>{main?.pressure}hPa</div>
                    <div id="humidity"><b>Humidity: </b> {main?.humidity}%</div>
                    <div id="visibility"><b>Visibility: </b> {data?.visibility / 1000}km</div>
                </div>
                <div className="rec_down" style={{ borderLeft: "1px solid #5d606d", borderRight: "1px solid #5d606d", textAlign: "center" }}>
                    <div id="windicon" style={{ transform: `rotate(${140 + wind?.deg}deg)` }}>
                        <img src="assets/img/windIcon.png" alt="" />
                    </div>
                    <div id="wind">
                        {wind?.speed.toFixed(0)}m/s {wind?.deg}&#176;
                    </div>
                </div>
                <div class="rec_down">
                    <div id="sunrise"><b>Sunrise: </b> {CONST.getSunTime(sys?.sunrise)}</div>
                    <div id="sunset"><b>Sunset: </b> {CONST.getSunTime(sys?.sunset)}</div>
                </div>
            </div>
        </div>

    );
}

export default WeatherCard;
