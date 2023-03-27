import * as CONST from './constants';

//function that returns weather data for a given city ID and also chache the data for 5 mins
async function FetchData(cityId) {
    const cacheKey = `weatherData-${cityId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData !== null) {
      const { data, timeStamp } = JSON.parse(cachedData);
      if (CONST.DateNow - timeStamp <= CONST.cacheTime) {
        return data;
      }
    }
    try {
      const response = await fetch(CONST.apiUrl(cityId));
      const data = await response.json();
      const timeStamp = CONST.DateNow;
      localStorage.setItem(cacheKey, JSON.stringify({ data, timeStamp }));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

export default FetchData