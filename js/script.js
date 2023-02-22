let currentWeatherEl = document.getElementById("current-weather");
let futureWeatherEl = document.getElementById("future-weather");
let inputCityEl = document.getElementById("input-city");
let inputCountryEl = document.getElementById("input-country");
let button = document.getElementById("search-button");
let futureWeatherList = document.getElementById("weather-list");
let currentWeatherList = document.getElementById("current-weather-list");

let currentWeather = document.createElement("p");
let futureWeather = document.createElement("p");

currentWeatherEl.appendChild(currentWeather);
futureWeatherEl.appendChild(futureWeather);

let Cityvalue = inputCityEl.value;
let Countryvalue = inputCountryEl.value;

function getApi(lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let listItems = document.createElement("li");
      let temperatureItem = document.createElement("p");
      let humidityItem = document.createElement("p");
      let windItem = document.createElement("p");
      currentWeatherList.appendChild(listItems);
      listItems.appendChild(temperatureItem);
      listItems.appendChild(humidityItem);
      listItems.appendChild(windItem);
      temperatureItem.textContent =
        "Temp: " + convertKtoF(data.list[0].main.temp) + " F";
      humidityItem.textContent =
        "Humidity: " + data.list[0].main.humidity + " %";
      windItem.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
      for (let index = 1; index < 6; index++) {
        let listItems = document.createElement("li");
        let temperatureItem = document.createElement("p");
        let humidityItem = document.createElement("p");
        let windItem = document.createElement("p");
        futureWeatherList.appendChild(listItems);
        listItems.appendChild(temperatureItem);
        listItems.appendChild(humidityItem);
        listItems.appendChild(windItem);
        temperatureItem.textContent =
          "Temp: " + convertKtoF(data.list[index].main.temp) + " F";
        humidityItem.textContent =
          "Humidity: " + data.list[index].main.humidity + " %";
        windItem.textContent = "Wind: " + data.list[index].wind.speed + " MPH";
      }
    });
}

function getLocation(city, country) {
  let cityLocator = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(cityLocator)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      getApi(lat, lon);
    });
}

button.addEventListener("click", clickButton);
function clickButton() {
  getLocation(inputCityEl.value, inputCountryEl.value);
}

function convertKtoF(temp) {
  let result = Math.floor((temp - 273.15) * (9 / 5) + 32);
  return result;
}
