import React from "react";
import './css/App.css';
import Card from "./components/WeatherCard"
import CityIds from './components/CityId';


function App() {
  //get the cityCodes from the cityIDs component
  const cityCodes = CityIds();
  let colors = ["#388EE7", "#8B49CC", "#3C882C", "#C63F3F", "#6249CC", "#1B127B", "#D847DB", "#138E78"];

  return (
    //returns Card component
    <div className="row App weather_cards">
      { cityCodes.map((cityId,index) => (
        <Card key={cityId} cityId={cityId} bgColor={colors[index % colors.length]}/>
      ))}
  
    </div>
  );
}

export default App;