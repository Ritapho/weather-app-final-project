function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Januray",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekday = days[date.getDay()];
  let month = months[date.getMonth()];
  return `${weekday}, ${month} ${day}, ${hour}:${minute}`;
}

function formatWeekDay(timestamp) {
  let weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return weekDays[new Date(timestamp * 1000).getDay()];
}

function formatHour(timestamp) {
  let hour = new Date(timestamp * 1000).getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${hour}:00`;
}

function showForecastConditions(response) {
  let weekForecast = response.data.daily;
  let hourForecast = response.data.hourly;

  let weekForecastHTML = `<div class="row">`;
  weekForecast.forEach(function (weekDay, index) {
    if (index < 7) {
      weekForecastHTML =
        weekForecastHTML +
        `<div class="col">
        <div class="day">${formatWeekDay(weekDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          weekDay.weather[0].icon
        }@2x.png" alt="" width="40"/>
        <div class="day-amplitude">
          <span class="min-temp-value">${Math.round(weekDay.temp.min)}º</span>
          <span class="max-temp-value">${Math.round(weekDay.temp.max)}º</span>
        </div>
      </div>
  `;
    }
  });

  weekForecastHTML = weekForecastHTML + `</div>`;

  let hourForecastHTML = `<div class="row">`;
  hourForecast.forEach(function (hour, index) {
    if (index < 7) {
      hourForecastHTML =
        hourForecastHTML +
        `<div class="col">
        <div class="day">${formatHour(hour.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          hour.weather[0].icon
        }@2x.png" alt="" width="40"/>
        <div>
          <span class="hour-temp-value">${Math.round(hour.temp)}º</span>
        </div>
      </div>
  `;
    }
  });

  hourForecastHTML = hourForecastHTML + `</div>`;

  document.querySelector("#week-forecast").innerHTML = weekForecastHTML;
  document.querySelector("#hour-forecast").innerHTML = hourForecastHTML;
}

function searchForecastLocation(coordinates) {
  let apiKey = "ea67ab160a3ae4295e1811dfc7396fd1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecastConditions);
}

function showSearchConditions(response) {
  document.querySelector(".chosen-city-value").innerHTML = response.data.name;
  document.querySelector(
    ".current-temperature #temperature-value"
  ).innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#description-value").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    ".current-amplitude .min-temp #temperature-value"
  ).innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector(
    ".current-amplitude .max-temp #temperature-value"
  ).innerHTML = Math.round(response.data.main.temp_max);

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#clouds").innerHTML = Math.round(
    response.data.clouds.all
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );

  document.querySelector("#update-value").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  searchForecastLocation(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ea67ab160a3ae4295e1811dfc7396fd1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showSearchConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  searchCity(document.querySelector("#input-city").value);
}

function searchCurrentLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showSearchConditions);
}

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#app-search-engine");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");
