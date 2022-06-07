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
      const googleChosenCity = await response.json();
      console.log('success', googleChosenCity);

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

      return googleChosenCity;
    } catch (err) {
      console.log('err', err);
      return err;
    }

    //////////////To Cybil
    // - to get wheather data and put it in the proper position from variable of googleChosenCity
    // - to make star button
    console.log(googleChosenCity);
    //////////////////////////////////
  }
}

//add favorite city data in selecetbox
// console.log(localStorage);
if (localStorage) {
  const selecetBox = document.getElementById('favoriteCities');

  for (let i = 0; i < localStorage.length; i++) {
    const option = document.createElement('option');
    option.text = localStorage.key(i);
    selecetBox.add(option);
    // console.log(localStorage[key(i)]);
    // console.log(option);
  }
}
// console.log(localStorage);

///////////////////////Cybil's code//////////////////////////////////
// // GET All Values
// var button = document.querySelector('.button');
// const inputTxt = document.querySelector('.inputTxt');
// const showData = document.querySelector('.showData');

// // const icon = document.querySelector('.weather.icon');

// /* API KEY by OpenWeather.org */
// const API_KEY = '64d0314083df655f782bcd486a05f7b0';

// /* GET Current weather */
// button.addEventListener('click', () => {
//   //InPut Value
//   const inputTxt = inputTxt.value;

//   //Fetch Through Get API
//   fetch(
//     'https://api.openweathermap.org/data/2.5/weather?q=${inputTxt}&units=metric&APPID=${API_KEY}'
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       //console.log(data);

//       // Fill Input Field Then Clear Input Field
//       inputTxt.value = ' ';

//       // Show All Data Value
//       showData.innerHTML =
//         ' <ul> <li class="desc">${data.weather[0].description} </li>  <li class=""></li></ul>';
//     });
// });
