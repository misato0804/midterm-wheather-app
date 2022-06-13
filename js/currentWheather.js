import { getFavoriteStatus } from './getFavoriteStatus.js';

let weatherLocation = document.getElementById('date');
let description = document.getElementById('description');
let temperature = document.getElementById('temperature');
let iconContainer = document.getElementById('weather-itme');

function showDefault(data) {
  weatherLocation.innerText = data.name;
  description.innerText = data.weather[0].main;
  temperature.innerText = data.main.temp;
  let icon = data.weather[0].icon;
  let iconImgPath = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  iconContainer.src = iconImgPath;
  iconContainer.style.visibility = 'visible';
  getFavoriteStatus(data.name);
}

export { showDefault };
