class Storage {
    constructor() {
        this.city;
        this.defaultCity = 'lagos'
    };

    getLastLocation() {
        if(localStorage.getItem('city') === null) {
            this.city = this.defaultCity;
        }
        else {
            this.city = localStorage.getItem('city')
        }
        return {city: this.city}
    }
    setLastLocation(city) {
        localStorage.setItem('city', city)
    }
}