function showSearchConditions(response) {
  console.log(response)
  document.querySelector(".chosen-city-value").innerHTML = response.data.name;
  document.querySelector(".current-temperature #temperature-value").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#description-value").innerHTML = response.data.weather[0].main;

  document.querySelector(".current-amplitude .min-temp #temperature-value").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector(".current-amplitude .max-temp #temperature-value").innerHTML = Math.round(response.data.main.temp_max);

  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#clouds").innerHTML = Math.round(response.data.clouds.all);
  document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);

}
 
  let apiKey = "ea67ab160a3ae4295e1811dfc7396fd1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`; 
  
  axios.get(apiUrl).then(showSearchConditions);

