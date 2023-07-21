// initializing variables
const cityName = document.querySelector(".city-name");
const currentTime = document.querySelector(".current-time");
const temp = document.querySelector(".temp");
const weatherImg = document.getElementById("weather-img");
const weatherCondition = document.querySelector(".weather-condition");
const celsiusBtn = document.querySelector(".celsius-btn");
const fahrenheitBtn = document.querySelector(".fahrenheit-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const todayForecastTemplateCard = document.querySelector(
  ".today-forecast-template-card"
);
const todayForecastCardsbBox = document.querySelector(
  ".today-forecast-cards-box"
);
const feelsLike = document.querySelector(".feels-like");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const uvIndex = document.querySelector(".uv-index");
const ozone = document.getElementById("ozone");
const sulphurDioxide = document.getElementById("sulphurDio");
const nitrogenDioxide = document.getElementById("nitroDio");
const pressure = document.getElementById("crnt-pressure");
const visibility = document.getElementById("crnt-visibility");
const sunrise = document.getElementById("crnt-sunrise");
const sunset = document.getElementById("crnt-sunset");
const moonrise = document.getElementById("crnt-moonrise");
const moonset = document.getElementById("crnt-moonset");
const moonphase = document.getElementById("crnt-moonphase");

const url = "https://api.weatherapi.com/v1/forecast.json?q=";
const api_key = "1363b05c50fc4e28a5e105056231307";

window.addEventListener("load", fetchWeather("janakpur"));

async function fetchWeather(query) {
  const res = await fetch(
    `${url}${query}&days=1&alerts=yes&aqi=yes&key=${api_key}`
  );
  const data = await res.json();
  console.log(data);
  weatherData(data);
}

function weatherData(data) {
  cityName.innerHTML = data.location.name;
  currentTime.innerHTML = data.location.localtime;
  temp.innerHTML = data.current.temp_c + "&deg;";
  weatherImg.src = data.current.condition.icon;
  weatherCondition.innerHTML = data.current.condition.text;

  celsiusBtn.addEventListener("click", () => {
    temp.innerHTML = data.current.temp_c + "&deg;";
  });
  fahrenheitBtn.addEventListener("click", () => {
    temp.innerHTML = data.current.temp_f + " &deg;";
  });

  feelsLike.innerHTML = data.current.feelslike_c + " &deg;";
  windSpeed.innerHTML = data.current.wind_kph + " km/h";
  humidity.innerHTML = data.current.humidity + " %";
  uvIndex.innerHTML = data.current.uv;

  const o3 = data.current.air_quality.o3;
  const ozo = Math.floor(o3);
  const so2 = data.current.air_quality.so2;
  const sulphurDiox = Math.floor(so2);
  const no2 = data.current.air_quality.no2;
  const nitroDiox = Math.floor(no2);

  ozone.innerHTML = ozo;
  sulphurDioxide.innerHTML = sulphurDiox + " %";
  nitrogenDioxide.innerHTML = nitroDiox + " %";

  pressure.innerHTML = data.current.pressure_mb + " millibar";
  visibility.innerHTML = data.current.vis_km + " km";
  sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
  sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
  moonrise.innerHTML = data.forecast.forecastday[0].astro.moonrise;
  moonset.innerHTML = data.forecast.forecastday[0].astro.moonset;
  moonphase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;

  const hoursData = data.forecast.forecastday[0].hour;
  hoursData.forEach((hourData) => {
    const todayForecastCardClone =
      todayForecastTemplateCard.content.cloneNode(true);
    fillDataInTodayForecastCard(hourData, todayForecastCardClone);
    todayForecastCardsbBox.appendChild(todayForecastCardClone);
  });
}

function fillDataInTodayForecastCard(hourData, todayForecastCardClone) {
  const todayForecastTime = todayForecastCardClone.querySelector(
    ".today-forecast-time"
  );
  const todayForecastImg = todayForecastCardClone.querySelector(
    "#today-forecast-img"
  );
  const todayForecastTemp = todayForecastCardClone.querySelector(
    ".today-forecast-temp"
  );

  const dateString = hourData.time;
  const timeString = dateString.split(" ")[1];

  todayForecastTime.innerHTML = timeString;
  todayForecastImg.src = hourData.condition.icon;
  todayForecastTemp.innerHTML = hourData.temp_c + "&deg;";
}

// search bar
searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  if (!query) return;
  fetchWeather(query);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value;
    if (!query) return;
    fetchWeather(query);
  }
});
