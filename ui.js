// SELECT NECESSARY ELEMENTS

const tempValue = document.querySelector('#temperature');
const locationEl = document.querySelectorAll('.location');
const time = document.querySelector('#time p');
const weatherIcon = document.querySelector('#weather-img');
const weatherDescription = document.querySelector('#description p');
const humidityEl = document.querySelector('#humidity')
const feelsLike = document.querySelector('#feels-like')
const windEl = document.querySelector('#wind');
const lonEl = document.querySelector('#lon');
const latEl = document.querySelector('#lat');

const kelvin = 273;
const weather = {};
// GET COUNTRY NAMES FROM THEIR CODES
let regionNames = new Intl.DisplayNames(['en'], { type: 'region'});

const populateUi = () => {
    const { humidity, feels_like, wind, lon, lat, locate, temperature, main, description, icon } = weather;

        tempValue.innerHTML = temperature
        locationEl.forEach(el => el.innerHTML = locate);
        weatherIcon.setAttribute('src', `icons/${icon}.png`);
        weatherDescription.innerHTML = description;
        humidityEl.innerHTML = humidity;
        lonEl.innerHTML = lon;
        latEl.innerHTML = lat;
        windEl.innerHTML = wind;
        feelsLike.innerHTML = feels_like;
}

const addWeatherProps = (data) => {
    let countryName = regionNames.of(data.sys.country)
    weather.locate = `${data.name}, ${countryName}`;
    weather.temperature = Math.floor(data.main.temp - kelvin);
    weather.humidity = data.main.humidity;
    weather.feels_like = Math.floor(data.main.feels_like - kelvin);
    weather.wind = data.wind.speed;
    weather.lon = Math.floor(data.coord.lon);
    weather.lat = Math.floor(data.coord.lat);
    weather.main = data.weather[0].main
    weather.description = data.weather[0].description
    weather.icon = data.weather[0].icon;

      // POPULATE THE UI WITH THE DATA RETURNED
      populateUi()
}