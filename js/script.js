let currentWeatherEl = document.getElementById("current-weather");
let futureWeatherEl = document.getElementById("future-weather");

let currentWeather = document.createElement("p");
let futureWeather = document.createElement("p");

currentWeatherEl.appendChild(currentWeather);
futureWeatherEl.appendChild(futureWeather);
function getApi() {
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getLocation() {
  let cityLocator =
    "http://api.openweathermap.org/geo/1.0/direct?q=brooklyn,New-York,US&limit=5&appid=b8228c83264e4447e4bd0157e1a7f01f";
  fetch(cityLocator)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
    });
}
getApi();
getLocation();
