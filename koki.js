const GOOGLE_API_KEY = config.googleApikey;
const WEATHER_API_KEY = config.wheatherApi;

// get lat and lng
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

// get placeInfo;
let localData;
let data;
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
      test = await response.json();
      console.log('success', test);

      // return json;
    } catch (err) {
      console.log('err', err);
      return err;
    }

    let wheather;
    let test = `http://openweathermap.org/img/wn/${wheather}@2x.png`;

    const addButton = document.createElement('button');
    addButton.classList.add('favoriteBtn');
    addButton.value = `${place.name}`;
    addButton.textContent = 'favorite';
    document.body.appendChild(addButton);
    const favorite = document.getElementsByClassName('favoriteBtn');
    const chosenCityData = favorite[0];

    //add favorite city data in localstrage
    chosenCityData.addEventListener('click', () => {
      if (localStorage.getItem(chosenCityData.value) !== null) {
        localStorage.removeItem(chosenCityData.value, chosenCityData.value);
      } else {
        localStorage.setItem(chosenCityData.value, chosenCityData.value);
      }

      addedCity = localStorage.getItem(localStorage.value);
      console.log(addedCity);
    });
  }
}
//add favorite city data in selecetbox
if (localStorage) {
  const selecetBox = document.getElementById('favoriteCities');

  for (var i = 0; i < localStorage.length; i++) {
    const option = document.createElement('option');
    option.text = localStorage.key(i);
    selecetBox.add(option);
    // console.log(option);
  }
}
console.log(localStorage);
