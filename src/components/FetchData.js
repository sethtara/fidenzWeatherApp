import * as CONST from './constants';
import LRU from 'lru-cache'; 

// create a cache with a maximum size of 10 items
const cache = new LRU({ max: 100 });

//function that returns weather data for a given city ID and also caches the data for 5 mins
async function FetchData(cityId) {
  const cacheKey = `weatherData-${cityId}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    if (cityId === '1248991') {
      const { data, timestamp } = cachedData;
      if (CONST.DateNow - timestamp <= 30 * 1000) {
        return data;
      }
    } else {
      const { data, timestamp } = cachedData;
      if (CONST.DateNow - timestamp <= 1 * 60 * 1000) {
        return data;
      }
    }
  }

  try {
    const response = await fetch(CONST.apiUrl(cityId));
    const data = await response.json();
    const timestamp = CONST.DateNow;

    // add the data to the cache
    cache.set(cacheKey, { data, timestamp });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default FetchData;
