// SELECT NECESSARY ELEMENTS

const tempValue = document.querySelector('#temperature');
const locationEl = document.querySelectorAll('.location');
const time = document.querySelector('#time p');
const weatherIcon = document.querySelector('#weather-img');
const weatherDescription = document.querySelector('#description p');
const humidityEl = document.querySelector('#humidity')
const feelsLike = document.querySelector('#feels-like')
const windEl = document.querySelector('#wind')
const lonEl = document.querySelector('#lon')
const latEl = document.querySelector('#lat')

// GET USER INPUT

const form = document.querySelector('form#w-form');
const input = document.querySelector('input#city');

// FETCH DATA FROM OPENWEATHERAPI
const apiKey = 'cb73d54fd3c69e4f08d471af29d67fa5';
const weather = {};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const kelvin = 273;
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`
    async function getData() {
        const res = await fetch(api);
        let data = await res.json();
        weather.locate = `${data.name}, ${data.sys.country}`;
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

        const { humidity, feels_like, wind, lon, lat, locate, temperature, main, description, icon } = weather;

        tempValue.innerHTML = temperature
        locationEl.forEach(el => el.innerHTML = locate);
        weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
        weatherDescription.innerHTML = description;
        humidityEl.innerHTML = humidity;
        lonEl.innerHTML = lon;
        latEl.innerHTML = lat;
        windEl.innerHTML = wind;
        feelsLike.innerHTML = feels_like;

    }
    getData()
})
