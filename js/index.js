let WEATHER_API_KEY = config.wheatherApi;

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

let weatherInfo = {
  myKey: WEATHER_API_KEY,
  getWeatherInfo: async function (city) {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.myKey}`
    );
    const data = await res.json();
    console.log(data);
    this.showData(data);
  },
  showData: function (data) {
    const { country } = data.city;
    const { list } = data;
    console.log(list);
    let next5DaysData = [list[8], list[16], list[24], list[32], list[39]];
    console.log(next5DaysData);
    //3hoursList
    this.every3HoursList(list);
    //next5days
    this.next5daysList(next5DaysData);
  },
  every3HoursList: function (list) {
    let container = document.getElementById('every_3hours');
    for (let i = 0; i < list.length; i++) {
      let day = this.datemodifiyer(list[i].dt_txt)[0];
      let time = this.datemodifiyer(list[i].dt_txt)[1];
      let icon = list[i].weather[0].icon;
      let iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let temp = list[i].main.temp;
      let innerItem = this.innerContent(day, time, iconImg, temp);
      let li = document.createElement('li');
      li.insertAdjacentHTML('afterbegin', innerItem);
      container.appendChild(li);
    }
  },
  datemodifiyer: function (date) {
    let newDateStr = date.substr(5, 11);
    let newDate = newDateStr.split(' ');
    return newDate;
  },
  innerContent: function (day, time, icon, temp) {
    let innerElem = `
        <div class="el_container">
            <p>${day}</p>
            <p>${time}</p>
            <p class="my_icon"><img src=${icon}></p>
            <p class="my_temp">${temp}°C</p>
        </div>
        `;
    return innerElem;
  },
  next5daysList: function (list) {
    let container = document.getElementById('next_5days');
    for (let i = 0; i < list.length; i++) {
      let day = this.datemodifiyer(list[i].dt_txt)[0];
      // let time = this.datemodifiyer(list[i].dt_txt)[1];
      let icon = list[i].weather[0].icon;
      let iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let temp = list[i].main.temp;
      let minTemp = list[i].main.temp_min;
      let maxTemp = list[i].main.temp_max;
      let innerItem = this.innerContent5Days(
        day,
        iconImg,
        temp,
        minTemp,
        maxTemp
      );
      let li = document.createElement('li');
      li.insertAdjacentHTML('afterbegin', innerItem);
      container.appendChild(li);
    }
  },
  innerContent5Days: function (day, icon, temp, min, max) {
    let innerItem = `
        <div class='item_container'>
            <h4>${day}</h4>
            <img src=${icon}>
            <h4>${temp}</h4>
            <h4><span>${min}℃</span>/<span>${max}℃</span></h4>
        </div>
        `;
    return innerItem;
  },
};
weatherInfo.getWeatherInfo('Burnaby');

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
