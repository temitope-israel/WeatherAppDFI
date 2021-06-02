const apiKey = 'cb73d54fd3c69e4f08d471af29d67fa5';

function getWeatherData() {
// CHECK IF NAVIGATOR (BROWSER) SUPPORTS GEOLOCATION
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, (err) => console.error(err))

        const getWeather = (latitude, longitude) => {
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            async function getLocalWeather(){
                let res = await fetch(api)
                let data = await res.json();
                addWeatherProps(data)
            }
            getLocalWeather()
        }

        function setPosition({ coords }){
            let latitude = coords.latitude;
            let longitude = coords.longitude;
        
            getWeather(latitude, longitude)
        }
    }else{
        getData(city)
        console.log('fetch last city')
    }
}

// FETCH DATA USING CITY INSTEAD OF GEOLOCATION
async function getData(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res = await fetch(api);
    let data = await res.json();
    addWeatherProps(data)
}