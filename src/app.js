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

  let cityTemp = Math.round(response.data.main.temp);
  let newCityTemp = document.querySelector(".large-temp");
  newCityTemp.innerHTML = `${cityTemp}°C`;

  let cityHumidity = response.data.main.humidity;
  let newCityHumidity = document.querySelector("#humidity");
  newCityHumidity.innerHTML = `${cityHumidity}% Humidity`;
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