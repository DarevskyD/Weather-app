const api = {
  key:'5bbf9d0b8df218aaffa92c148845ff41',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const searchCity = document.querySelector('.search__city');
searchCity.addEventListener('keypress', (evt) => {
  if(evt.keyCode == 13) {
    getResults(searchCity.value);   
  }
});

function getResults(query) {
  fetch(`${api.base}/weather?q=${query}&units=metric&appid=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather) {   
  let city = document.querySelector('.location .location__city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let dateNow = new Date();
  let date = document.querySelector('.location .location__date');
  date.innerText = dateBuild(dateNow);

  let iconWeather = document.querySelector('.weather .weather__icon');
  iconWeather.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'/>`;

  let weatherTemperature = document.querySelector('.weather__temperature');
  weatherTemperature.innerHTML = `${Math.round(weather.main.temp)}<span>&ordmc</span>`;

  let weatherNow = document.querySelector('.weather__now');
  weatherNow.innerText = `${weather.weather[0].main}`;

  let weatherWind = document.querySelector('.weather__wind');
  weatherWind.innerText = `Wind speed: ${Math.round(weather.wind.speed)}m/s`;
}

function dateBuild(n) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let day = days[n.getDay()];
  let date = n.getDate();
  let month = months[n.getMonth()];
  let year = n.getFullYear();

  return `${day} ${date} - ${month} ${year}`;
}
