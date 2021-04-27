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
    hour = `0${hours}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekday = days[date.getDay()];
  let month = months[date.getMonth()];
  return `${weekday}, ${month} ${day}, ${hour}:${minute}`;
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
}

let apiKey = "ea67ab160a3ae4295e1811dfc7396fd1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showSearchConditions);
