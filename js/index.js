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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const googleChosenCity = await response.json();
      //////////// current location ////////////
      let weatherLocation = document.getElementById('date');
      weatherLocation.innerText = googleChosenCity.name;
      /// description
      let description = document.getElementById('description');
      description.innerText = googleChosenCity.weather[0].main;
      /// temperature
      let temperature = document.getElementById('temperature');
      temperature.innerText = googleChosenCity.main.temp;

      let icon = googleChosenCity.weather[0].icon;
      let iconImgPath = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let createImg = document.createElement('img');

      createImg.src = iconImgPath;
      let container = document.getElementById('weather-itme');
      container.appendChild(createImg);

      searchedCity = place.name;
      getFavoriteStatus(searchedCity);
      weatherInfo.getWeatherInfo(googleChosenCity.name);
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
}
getFavoriteStatus(searchedCity);
weatherInfo.getWeatherInfo(weatherInfo.defaultCity);
