import weatherData from "../data/cities.json"

function CityIds() {

    const cityCodes = [];

    // Loop in the array of cities and extract the CityCode property for each city
    for (const element of weatherData.List) {
      const city = element;
      cityCodes.push(city.CityCode);

}
//returns all the city codes in the cities.json file 
return cityCodes

}

export default CityIds