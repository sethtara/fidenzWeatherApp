import React from "react";
import './css/App.css';
import WeatherCard from "./components/WeatherCard"
import * as CONST from './components/constants';

function App() {
  return (
    //returns Card component
    <div className="row App weather_cards">
      { CONST.cityCodes.map((cityId,index) => (
        <WeatherCard key={cityId} cityId={cityId} bgColor={CONST.colors[index % CONST.colors.length]}/>
      ))}
  
    </div>
  );
}

export default App;