import React from "react";
import './css/App.css';
import WeatherCard from "./components/WeatherCard"
import * as CONST from './utils/constants';

function App() {

  const cityCodes = CONST.cityCodes;

  const weatherCards = cityCodes.map((cityId, index) => (
    <WeatherCard key={cityId} cityId={cityId} bgColor={CONST.colors[index % CONST.colors.length]}/>
  ));

  return (
    <div className="row App weather_cards">
      {weatherCards}
    </div>
  );
}
export default App;