import config from '../apikey.js';
import { weatherInfo } from './hoursAndDays.js';

const WEATHER_API_KEY = config.wheatherApi;
const btn = document.getElementsByClassName('btn')[0];
const selecetBox = document.getElementById('favoriteCities');

//favorite star toggle
const getFavoriteStatus = (selectedCity) => {
  const favoriteCont = document.getElementById('favorite');
  if (localStorage.getItem(selectedCity)) {
    btn.src = 'starColored' + '.png';
    favoriteCont.btn;
  } else {
    btn.src = 'star' + '.png';
    favoriteCont.btn;
  }
};

//add favorite city data in localStrage and selectbox
const addFavoriteCities = (selectedCity) => {
  if (localStorage.getItem(selectedCity) !== null) {
    localStorage.removeItem(selectedCity, selectedCity);
    for (let i = 0; i < selecetBox.length; i++) {
      if (selecetBox.options[i].value == selectedCity) {
        selecetBox.remove(i);
      }
    }
  } else {
    if (selectedCity !== undefined) {
      localStorage.setItem(selectedCity, selectedCity);
      const option = document.createElement('option');
      option.value = selectedCity;
      option.text = selectedCity;
      selecetBox.add(option);
    }
  }
  getFavoriteStatus(selectedCity);
};

btn.addEventListener('click', () => {
  addFavoriteCities(searchedCity);
});

// get lat and lng
let searchedCity = 'Vancouver';
let autocomplete;
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
  let place = autocomplete.getPlace();

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
      searchedCity = place.name;
      getFavoriteStatus(searchedCity);
      weatherInfo.getWeatherInfo(googleChosenCity.name);
//////////// current location ////////////
       var weatherLocation = document.getElementById('date');
       console.log(weatherLocation)
       weatherLocation.innerText = googleChosenCity.name; 
    /// description
       var description = document.getElementById('description');
       console.log(weatherLocation)
       description.innerText = googleChosenCity.weather[0].main;
     /// temperature 
       var temperature = document.getElementById('temperature');
       console.log(weatherLocation)
       temperature.innerText = googleChosenCity.main.temp;

    let icon = googleChosenCity.weather[0].icon;
    let iconImgPath = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let createImg = document.createElement('img')
    console.log(iconImgPath, icon);
    createImg.src = iconImgPath;
    let container = document.getElementById('weather-itme');
      container.appendChild(createImg)
    } catch (err) {
      console.log('err', err);
      return err;
    }

//////// weather icon
    //     let weatherLocation = {
    //   // Done: const WEATHER_API_KEY = config.wheatherApi;
    //   fetchWeather: function (city) {
    //   fetch('http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.myKey}')

    // }
  }
  
}
getFavoriteStatus(searchedCity);
weatherInfo.getWeatherInfo(weatherInfo.defaultCity);

export { selecetBox };
