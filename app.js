// INIT storage.js
const storage = new Storage()
let city = storage.getLastLocation().city
console.log(city)

// FETCH CURRENT LOCATION WEATHER DATA ON LOAD
document.addEventListener('DOMContentLoaded', getWeatherData)

// GET USER INPUT
const form = document.querySelector('form#w-form');
const input = document.querySelector('input#city');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    city = input.value;
    
    getData(city)

    // MAKE THE MODAL CLOSE ON SAVE CHANGES(WHEN THE FORM IS SUBMITTED) with jquery.
    $('#exampleModal').modal('hide')

    // STORE LAST CITY TO LOCAL STORAGE
    storage.setLastLocation(city);
})
