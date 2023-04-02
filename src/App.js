import React from "react";
import './css/App.css';
import WeatherCard from "./components/WeatherCard"
import * as CONST from './utils/constants';
import weatherData from "./data/cities.json"

function App() {
  const weatherCards = weatherData.List.map((city, index) => (
    <WeatherCard key={city.CityCode} cityId={city.CityCode} bgColor={CONST.colors[index % CONST.colors.length]}/>
    ));

  return (
    <div className="row App weather_cards">
      {weatherCards}
    </div>
  );
}
export default App;