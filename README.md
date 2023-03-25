# Fidenz Technologies - Front-end Assignment
![screenshot](/public/assets/img/assignmentScreenshot.png "weather app screenshot")
## Introduction
The assignment is to read the cities.json file and extract the 'CityCode' codes from it. Using CityCode as reference then you will call openweathermap.org weather APIs to get the latest weather information and present it as a provided UI design.
## Tools in will use
- Node.js
- Reactjs 
- npm
- docker
- openweather API already provided incase you want to change, it is .env


## Installations
- Clone the repository
  
```console
$ git clone https://github.com/sethtara/fidenzWeatherApp.git
```

- For manual installation

    Make sure you have npm installed [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
   
   Inside the /fidenzWeatherApp in terminal run

```console
$ npm install
$ npm start
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Using docker
  [install docker](https://docs.docker.com/get-docker/)
  Inside the /fidenzWeatherApp in terminal run
  this will build an image
```console
$ docker build -t image_name path
```
runnig docker
```console
$  docker run -p [port] [path_to_image or name] 
```

- go to the browser and open http://localhost:3000/ 
  

 
