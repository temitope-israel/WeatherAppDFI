// INIT storage.js
const storage = new Storage()
let city = storage.getLastLocation().city
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

// FETCH DATA FROM API
const apiKey = 'cb73d54fd3c69e4f08d471af29d67fa5';
const kelvin = 273;
const weather = {};
// TURN COUNTRY CODES TO THEIR NAMES
let regionNames = new Intl.DisplayNames(['en'], { type: 'region'});

const addWeatherProps = (data) => {
    let country = regionNames.of(data.sys.country)
    weather.locate = `${data.name}, ${country}`;
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

function populateUi() {
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

async function getData(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res = await fetch(api);
    let data = await res.json();
    addWeatherProps(data)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    city = input.value;
    
    getData(city)

    // MAKE THE MODAL CLOSE ON SAVE CHANGES(WHEN THE FORM IS SUBMITTED) with jquery.
    $('#exampleModal').modal('hide')

    // STORE LAST CITY TO LOCAL STORAGE
    storage.setLastLocation(city);
})

// FETCH CURRENT LOCATION WEATHER DATA ON LOAD
// CHECK IF NAVIGATOR (BROWSER) SUPPORTS GEOLOCATION

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    getData(city)
}

const getWeather = (latitude, longitude) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    async function getLocalWeather(){
        let res = await fetch(api)
        let data = await res.json();
        addWeatherProps(data)
    }
    getLocalWeather()
}

function showError(error) {
    console.error(error)
}

function setPosition({ coords }){
    let latitude = coords.latitude;
    let longitude = coords.longitude;

    getWeather(latitude, longitude)
}
// IF IT SUPPORTS IT CALL THE API USING LAT & LON


// 