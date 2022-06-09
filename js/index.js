const WEATHER_API_KEY = config.wheatherApi;

const favoriteBtn = document.getElementsByClassName('btn')[0];
const selecetBox = document.getElementById('favoriteCities');

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
};

favoriteBtn.addEventListener('click', () => {
  addFavoriteCities(searchedCity);
});

// get city data from google
let searchedCity;
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

async function onPlaceChanged() {
  let place = autocomplete.getPlace();

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
      // console.log('success', searchedCity);
      weatherInfo.getWeatherInfo(googleChosenCity.name);
      return searchedCity;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
}
