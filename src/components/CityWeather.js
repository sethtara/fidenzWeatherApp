import React, { useEffect, useState } from "react";
import * as CONST from "../utils/constants";
import '../css/CityWeather.css';
import { useParams, useHistory } from "react-router-dom";
import windIcon from "../img/windIcon.png";

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }
  
const img = importAll(require.context('../img/weatherIcons', false, /\.(png|jpe?g|svg)$/));
  
function CityWeather() {

  const { cityId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CONST.apiUrl(cityId));
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cityId]);

  const { name, sys, main, wind, weather } = data;
  const history = useHistory();

  const handleClose = () => {

    history.push("/");
    window.location.reload();
  };

  return (

      <div className="city_card">

        <button className="close_button" onClick={handleClose}>&lt;&nbsp;  &nbsp;Back </button>
     
        <div className="city_card_up">
          <div className="city_rec_up">
            <div id="city_city_name">
              {name}, {sys?.country}
            </div>
            <div id="city_time_date">
              {CONST.formatTime(
                CONST.getUnixValueNow(data?.dt, data?.timezone)
              )}
                &nbsp;  &nbsp; 
              {CONST.formatDate(
                CONST.getUnixValueNow(data?.dt, data?.timezone)
              )}
            </div>
            <div id="city_description">
              {weather && weather[0] && (
                <div>
                <img
                 src={img[String(weather[0]?.icon)+".png"]}
                  alt=""
                />
                <div className="city_descr">
                {weather[0]?.description}
                </div>
              </div>
              )}
            </div>
          </div>
          <div className="city_rec_up temp_r">
            <div id="city_temp">
              {main?.temp.toFixed(0)}
              {CONST.degCelcius}
            </div>
            <div id="city_min_temp">
              Temp min : {main?.temp_min.toFixed(0)}
              {CONST.degCelcius}
            </div>
            <div id="city_max_temp">
              Temp max : {main?.temp_max.toFixed(0)}
              {CONST.degCelcius}
            </div>
          </div>
        </div>
        <div className="city_card_down">
          <div className="city_rec_down">
            <div id="city_pressure">
              <b>Pressure: </b>
              {main?.pressure}hPa
            </div>
            <div id="city_humidity">
              <b>Humidity: </b> {main?.humidity}%
            </div>
            <div id="city_visibility">
              <b>Visibility: </b> {data?.visibility / 1000}km
            </div>
          </div>
          <div
            className="city_rec_down"
            style={{
              borderLeft: "1px solid #5d606d",
              borderRight: "1px solid #5d606d",
              textAlign: "center",
            }}
          >
            <div
              id="city_windicon"
              style={{ transform: `rotate(${140 + wind?.deg}deg)` }}
            >
              <img src={windIcon} alt="" />
            </div>
            <div id="city_wind">
              {wind?.speed.toFixed(0)}m/s {wind?.deg}&#176;
            </div>
          </div>
          <div className="city_rec_down">
            <div id="city_sunrise">
              <b>Sunrise: </b> {CONST.getSunTime(sys?.sunrise)}
            </div>
            <div id="city_sunset">
              <b>Sunset: </b> {CONST.getSunTime(sys?.sunset)}
            </div>
          </div>
        </div>
      </div>
 
  );
}

export default CityWeather;
