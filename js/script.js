let currentWeatherEl = document.getElementById("current-weather");
let futureWeatherEl = document.getElementById("future-weather");
let inputEl = document.getElementById("input");
let button = document.getElementById("search-button");
let weatherList = document.getElementById("weather-list");

let currentWeather = document.createElement("p");
let futureWeather = document.createElement("p");

currentWeatherEl.appendChild(currentWeather);
futureWeatherEl.appendChild(futureWeather);

let value = inputEl.value;

function getApi(lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentWeather.textContent = data.list[0].weather[0].description;
      for (let index = 0; index < data.list.length; index++) {
        let listItems = document.createElement("li");
      }
    });
}

function getLocation() {
  let cityLocator = `http://api.openweathermap.org/geo/1.0/direct?q=brooklyn&limit=5&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(cityLocator)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   console.log(data[0].lat);
      //   console.log(data[0].lon);
      let lat = data[0].lat;
      let lon = data[0].lon;
      getApi(lat, lon);
    });
}

getLocation(inputEl.value);

button.addEventListener("click", clickButton);
function clickButton() {
  console.log(inputEl.value);
  console.log("1");
}
