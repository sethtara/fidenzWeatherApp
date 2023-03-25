//function that returns weather data for a given city ID and also chache the data for 5 mins
async function FetchData(cityId) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    
    const cacheKey = `weatherData-${cityId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData !== null) {
      const { data, timestamp } = JSON.parse(cachedData);
      const fiveMinutes = 5 * 60 * 1000;
      if (Date.now() - timestamp <= fiveMinutes) {
        return data;
      }
    }
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const timestamp = Date.now();
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp }));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

export default FetchData