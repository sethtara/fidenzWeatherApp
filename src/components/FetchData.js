import * as CONST from "../utils/constants";

const promiseCache = {};

// function that returns weather data for a given city ID and also caches the data for 5 minutes
async function FetchData(cityId) {
  const cacheKey = `weatherData-${cityId}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData !== null) {
    const { data, timeStamp } = JSON.parse(cachedData);
    if (cityId === "1248991") {
      if (CONST.DateNow - 30 * 1000 <= timeStamp) {
        return data;
      }
    } else {
      if (CONST.DateNow - 1 * 60 * 1000 <= timeStamp) {
        return data;
      }
    }
  }

  if (promiseCache[cityId]) {
    return promiseCache[cityId];
  }

  const promise = (async () => {
    try {
      const response = await fetch(CONST.apiUrl(cityId));
      const data = await response.json();
      const timeStamp = CONST.DateNow;

      localStorage.setItem(cacheKey, JSON.stringify({ data, timeStamp }));

      delete promiseCache[cityId];

      return data;
    } catch (error) {
      console.error(error);
    }
  })();

  promiseCache[cityId] = promise;

  return promise;
}

export default FetchData;
