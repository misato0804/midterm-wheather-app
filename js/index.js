import config from '../apikey.js';
import { getFavoriteStatus } from './getFavoriteStatus.js';
import { addFavoriteCities } from './addFavoriteCities.js';
import { weatherInfo } from './hoursAndDays.js';
import { showDropdown } from './showDropdown.js';

const WEATHER_API_KEY = config.wheatherApi;
const btn = document.getElementsByClassName('btn')[0];
let searchedCity = 'Vancouver';
let autocomplete;

showDropdown();

btn.addEventListener('click', () => {
  addFavoriteCities(searchedCity);
});

// get lat and lng
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
    }
  );
  autocomplete.addListener('place_changed', onPlaceChanged);
}
initAutocomplete();

//after getting geo data, returing the city data user searched
async function onPlaceChanged() {
  const place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById('autocomplete').placeholder = 'Enter';
  } else {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
      );
      const googleChosenCity = await response.json();
      searchedCity = place.name;
      getFavoriteStatus(searchedCity);
      weatherInfo.getWeatherInfo(googleChosenCity.name);
      // console.log('success', searchedCity);
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
}
getFavoriteStatus(searchedCity);
weatherInfo.getWeatherInfo(weatherInfo.defaultCity);
