//Day and time live update
let h2 = document.querySelector("#day-time");
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();

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

//search engine
let cityInput = document.querySelector("#city-input");
let city = cityInput.value.trim();
let apiKey = "8e38e8204be405dd999881c7e6509a30";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCityTemperatureInfo);

function displayCityTemperatureInfo(response) {
  console.log(response);

  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  let cityTemp = document.querySelector(".large-temp");
  cityTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}KM/H`;

  let cityHumidity = document.querySelector("h3, #humidity");
  cityHumidity.innerHTML = `Humidity ${response.data.main.humidity}%`;

  let cityDescription = document.querySelector("#description");
  cityDescription.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault(event);
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  let city = cityInput.value.trim();
  h1.innerHTML = city;

  apiKey = "8e38e8204be405dd999881c7e6509a30";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperatureInfo);
}

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
  console.log(position);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// this will convert Celcius to Farenheit - cant get it to work yet -

function displayFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9)/5 + 32;
  let temperatureElement = document.querySelector(".large-temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".large-temp");
  temperatureElement.innerHTML = celciusTemperature;
}

let celciusTemperature = response.data.main.temp;

let bigFarenheit = document.querySelector("#click-f");
bigFarenheit.addEventListener("click", displayFarenheit);

let bigCelcius = document.querySelector("#click-c");
bigCelcius.addEventListener("click", displayCelcius);

// update weather icon

