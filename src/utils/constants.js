//Constants used in the app

export const apiUrl=(cityId)=> `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;


export const colors = ["#388EE7", "#8B49CC", "#3C882C", "#C63F3F", "#6249CC", "#1B127B", "#D847DB", "#138E78"];

export const cacheTime = 5 * 60 * 1000; //five minutes
export const degCelcius="ºc";

export const formatTime=(value)=>value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
export const formatDate=(value)=>value.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

export const DateNow = Date.now();
export const newDateInMs=(value)=> new Date(value * 1000); 

export const getSunTime=(Value)=> formatTime(newDateInMs(Value)); //returns the formated time values

export const currentZoneOffset = new Date().getTimezoneOffset()*60;
export const getUnixValueNow=(dateTime,timezone)=>newDateInMs(dateTime+timezone+currentZoneOffset);


    