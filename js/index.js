import config from '../apikey.js';
import { getFavoriteStatus } from './getFavoriteStatus.js';
import { addFavoriteCities } from './addFavoriteCities.js';
import { weatherInfo } from './hoursAndDays.js';
import { showDropdown } from './showDropdown.js';
import { showDefault} from './currentWheather.js';

const WEATHER_API_KEY = config.wheatherApi;
const btn = document.getElementsByClassName('btn')[0];
let searchedCity = 'Vancouver';
let favoriteCityItems = document.querySelector('[name="favoriteCities"]');
let selectedCity;
let  newDate =  await weatherInfo.getCurrentData(searchedCity);
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
      showDefault(googleChosenCity);
      weatherInfo.getWeatherInfo(googleChosenCity.name)
      searchedCity = place.name;
      getFavoriteStatus(searchedCity);


    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
}

function showFavCity() {
  favoriteCityItems.onchange = async function() {
    selectedCity = favoriteCityItems.value;
    let favoriteCityData = await  weatherInfo.getCurrentData(selectedCity);
    let favoriteCityEachData = await  weatherInfo.getData(selectedCity);
    let removeParent = document.getElementById('next_5days');
    let removeParent2 = document.getElementById('every_3hours');
    removeParent.innerHTML = "";
    removeParent2.innerHTML ="";
    showDefault(favoriteCityData);
    weatherInfo.showData(favoriteCityEachData);
    weatherInfo.showTimezone(favoriteCityEachData);
  }
}



getFavoriteStatus(searchedCity);
showDefault(newDate);
weatherInfo.getWeatherInfo(searchedCity);
showFavCity();
