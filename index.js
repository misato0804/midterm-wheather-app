// GET All Values
var button = document.querySelector('.button')
const inputTxt = document.querySelector('.inputTxt');
const showData = document.querySelector('.showData');

// const icon = document.querySelector('.weather.icon');

/* API KEY by OpenWeather.org */
const API_KEY = "64d0314083df655f782bcd486a05f7b0";

/* GET Current weather */
button.addEventListener('click', () => {
  
  //InPut Value
  const inputTxt = inputTxt.value;

  //Fetch Through Get API
  fetch('https://api.openweathermap.org/data/2.5/weather?q=${inputTxt}&units=metric&APPID=${API_KEY}')
  .then (response => response.json())
  .then (data => {
    //console.log(data);

    // Fill Input Field Then Clear Input Field
    inputTxt.value = " ";

    // Show All Data Value
    showData.innerHTML = ' <ul> <li class="desc">${data.weather[0].description} </li>  <li class=""></li></ul>';
  });

});

