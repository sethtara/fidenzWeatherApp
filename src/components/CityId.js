import weatherData from "../data/cities.json"

function CityIds() {

  return weatherData.List.map(city => city.CityCode);

}

export default CityIds