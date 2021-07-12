//Day and time live update
let h2 = document.querySelector("#day-time");
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();

if (minutes < 10) {
  minutes = "0" + today.getMinutes();
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[today.getDay()];

h2.innerHTML = `${day} | ${hours}:${minutes}`;

//formats the day in the 5-7 day forecast
function formatDay(timestamp) {

let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

//global variables
let cityInput = document.querySelector("#city-input");
let city = cityInput.value.trim();
let apiKey = "8e38e8204be405dd999881c7e6509a30";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCityTemperatureInfo);

// displays today forecast
function displayTodayForecast(response) {
 let todayTemp = response.data.daily[0];
 let todayElement = document.querySelector(".today-column");

  todayElement.innerHTML + `
 <p class="today-header">
   Today
 </p>
 <p>
   Morning
   ${todayTemp.feels_like.morn}
 </p>

 <p>
   Noon
   ${todayTemp.feels_like.day}
 </p>

 <p>
   Evening
   ${todayTemp.feels_like.eve}
 </p>

 <p>
   Night
   ${todayTemp.feels_like.night}
 </p>
</div>`;
}


// displays the 5-7 day forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < [6]) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
      alt = ""
      width="51">
      <br />
      <span class="weather-forecast-weekday">${formatDay(forecastDay.dt)}</span>
      <br />
      <span class="weather-forecast-max">${Math.round(forecastDay.temp.max)}°
      </span>/<span class="weather-forcast-min">
      ${Math.round(forecastDay.temp.min)}°
      </span>
  </div>
  `;
    }
  });

 forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML = forecastHTML;
}

//fetch today mini forecast
function getToday(coordinates) {
  let apiKey = "8e38e8204be405dd999881c7e6509a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTodayForecast);
}

//forecast fetch
function getForecast(coordinates){
  let apiKey = "8e38e8204be405dd999881c7e6509a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//displays the temperature and the atmospheric details
function displayCityTemperatureInfo(response) {
  console.log(response);

  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  let cityTemp = document.querySelector("#current-temperature");
  cityTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}KM/H`;

  let cityHumidity = document.querySelector("h3, #humidity");
  cityHumidity.innerHTML = `Humidity ${response.data.main.humidity}%`;

  let cityDescription = document.querySelector("#description");
  cityDescription.innerHTML = response.data.weather[0].description;

  //weather icon change
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
  getToday(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  let city = cityInput.value.trim();
  h1.innerHTML = city;

  apiKey = "8e38e8204be405dd999881c7e6509a30";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperatureInfo);
}

function autoSearch(city) {
  apiKey = "8e38e8204be405dd999881c7e6509a30";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperatureInfo);
}

autoSearch("dubai");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//current button functionality
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  apiKey = "8e38e8204be405dd999881c7e6509a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperatureInfo);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// unit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function convertToCelsuis(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let fahrenheitLinkClick = document.querySelector("#fahrenheit-button");
fahrenheitLinkClick.addEventListener("click", convertToFahrenheit);

let celsiusLinkClick = document.querySelector("#celsius-button");
celsiusLinkClick.addEventListener("click", convertToCelsuis);
