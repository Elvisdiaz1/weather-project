let inputCityEl = document.getElementById("input-city");
let inputCountryEl = document.getElementById("input-country");
let button = document.getElementById("search-button");
let futureWeatherList = document.getElementById("weather-list");
let currentWeatherList = document.getElementById("current-weather-list");
let cityListEl = document.getElementById("city-list");
let cityButton = document.querySelectorAll(".city-button");

let cityName = document.getElementById("city");
let currentTemp = document.getElementById("current-temp");
let currentHumidity = document.getElementById("current-humidity");
let currentWind = document.getElementById("current-wind");
let date = document.getElementById("date");
let futureTemp = document.getElementById("future-temp");
let futureHumidity = document.getElementById("future-humidity");
let futureWind = document.getElementById("future-wind");

let Cityvalue = inputCityEl.value;
let Countryvalue = inputCountryEl.value;

let today = dayjs();

function getApi(lat, lon, city) {
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b8228c83264e4447e4bd0157e1a7f01f`;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let listItems = document.createElement("li");
      let cityName = document.createElement("p");
      let temperatureItem = document.createElement("p");
      let humidityItem = document.createElement("p");
      let windItem = document.createElement("p");
      currentWeatherList.appendChild(listItems);
      listItems.appendChild(cityName);
      listItems.appendChild(temperatureItem);
      listItems.appendChild(humidityItem);
      listItems.appendChild(windItem);
      listItems.classList.add("col");
      cityName.textContent = data.city.name + "" + today.format("(M/D/YYYY)");
      cityName.id = "city";
      localStorage.setItem("city", JSON.stringify(data.city.name));
      temperatureItem.textContent =
        "Temp: " + convertKtoF(data.list[0].main.temp) + " F";
      temperatureItem.id = "current-temp";
      localStorage.setItem(
        "current-temp",
        JSON.stringify(convertKtoF(data.list[0].main.temp) + " F")
      );
      humidityItem.textContent =
        "Humidity: " + data.list[0].main.humidity + " %";
      humidityItem.id = "current-humidity";

      localStorage.setItem(
        "current-humidity",
        data.list[0].main.humidity + " %"
      );
      windItem.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
      windItem.id = "current-wind";
      localStorage.setItem("current-wind", data.list[0].wind.speed + " MPH");
      for (let index = 0; index < 35; index++) {
        if (data.list[index].dt_txt.includes("12:00:00")) {
          let listItems = document.createElement("li");
          let date = document.createElement("p");
          let temperatureItem = document.createElement("p");
          let humidityItem = document.createElement("p");
          let windItem = document.createElement("p");
          futureWeatherList.appendChild(listItems);
          listItems.appendChild(date);
          listItems.appendChild(temperatureItem);
          listItems.appendChild(humidityItem);
          listItems.appendChild(windItem);
          listItems.classList.add("col");
          date.textContent = data.list[index].dt_txt;
          date.id = "date";
          localStorage.setItem("date", JSON.stringify(data.list[index].dt_txt));
          temperatureItem.textContent =
            "Temp: " + convertKtoF(data.list[index].main.temp) + " F";
          temperatureItem.id = "future-temp";
          localStorage.setItem(
            "future-temp",
            JSON.stringify(convertKtoF(data.list[index].main.temp) + " F")
          );
          humidityItem.textContent =
            "Humidity: " + data.list[index].main.humidity + " %";
          humidityItem.id = "future-humidity";
          localStorage.setItem(
            "future-humidity",
            data.list[index].main.humidity + " %"
          );
          windItem.textContent =
            "Wind: " + data.list[index].wind.speed + " MPH";
          windItem.id = "future-wind";
          localStorage.setItem(
            "future-wind",
            data.list[index].wind.speed + " MPH"
          );
        }
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
      let lat = data[0].lat;
      let lon = data[0].lon;
      let input = `${city}`;
      console.log(input);
      getApi(lat, lon, input);
    });
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  getLocation(inputCityEl.value, inputCountryEl.value);
  let cityItems = document.createElement("li");
  let cities = document.createElement("button");
  cities.id = "city-button";
  cities.textContent = inputCityEl.value;
  cityItems.appendChild(cities);
  cityListEl.appendChild(cityItems);
});

document
  .querySelector(".city-button")
  .addEventListener("click", function (event) {
    console.log("here");
    console.log(event.target);
    city = JSON.parse(localStorage.getItem("city"));
    currentTemp = JSON.parse(localStorage.getItem("currentTemp"));
    currentHumidity = JSON.parse(localStorage.getItem("currentHumidity"));
    currentWind = JSON.parse(localStorage.getItem("currentWind"));
    date = JSON.parse(localStorage.getItem("date"));
    futureTemp = JSON.parse(localStorage.getItem("futureTemp"));
    futureHumidity = JSON.parse(localStorage.getItem("futureHumidity"));
    futureWind = JSON.parse(localStorage.getItem("futureWind"));
  });

function convertKtoF(temp) {
  let result = Math.floor((temp - 273.15) * (9 / 5) + 32);
  return result;
}
