import config from '../apikey.js';
const WEATHER_API_KEY = config.wheatherApi;

let data;
let weatherInfo = {
  myKey: WEATHER_API_KEY,
  defaultCity: 'Vancouver',
  inputCity: function () {
    let inputCity = document.getElementById('autocomplete');
    return inputCity;
  },
  getWeatherInfo: async function (city) {
    data = await this.getData(city);
    this.showData(data);
    this.showTimezone(data);
    this.change3HoursDsiplay(data);
  },
  getData: async function (city) {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.myKey}`
    );
    const data = await res.json();

    return data;
  },
  getCurrentData: async function (city) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.myKey}`
    );
    const currentData = await res.json();
    return currentData;
  },
  showData: function (data) {
    const { list } = data;
    let next5DaysData = this.dayCalculator(list);

    this.every3HoursList(list);
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
      let input = document.getElementById('autocomplete').value;
      if (input.length !== 0 && i === 0) {
        let newList = [...container.children].filter((children) => {
          return children.getElementsByTagName('li');
        });
        this.removeChildren(newList);
      }
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
      let input = document.getElementById('autocomplete').value;
      if (input.length !== 0 && i === 0) {
        let newList = [...container.children].filter((children) => {
          return children.getElementsByTagName('li');
        });
        this.removeChildren(newList);
      }
      let li = document.createElement('li');
      li.setAttribute('class', 'next5days_card');
      li.setAttribute('id', `${day}`);
      li.insertAdjacentHTML('beforeend', innerItem);
      container.appendChild(li);
    }
  },
  removeChildren: function (children) {
    for (let i = 0; i < children.length; i++) {
      children[i].remove();
    }
  },
  innerContent5Days: function (day, icon, temp, min, max) {
    let innerItem = `
        <div class='item_container'>
            <p>${day}</p>
            <img src=${icon}>
            <p>${temp}℃</p>
            <p><span>${min}℃</span>/<span>${max}℃</span></p>
        </div>
        `;
    return innerItem;
  },
  showTimezone: function (data) {
    let timezone = document.getElementById('time-zone');
    let countryName = document.getElementById('country');
    const { city } = data;
    let cityName = city.name;
    let country = city.country;
    timezone.innerText = `${cityName}`;
    countryName.innerText = `${country}`;
  },
  change3HoursDsiplay: function (data) {
    const { list } = data;
    const options = document.querySelectorAll('.next5days_card');
    const changeData = document.getElementById('every_3hours');
    const clickedItem = (elm) => {
      const parent = elm.parentNode;
      const child_nodes_count = parent.childElementCount;
      for (var i = 0; i < child_nodes_count; i++) {
        const item = parent.children[i];
        item.classList.remove('active_data_js');
      }
      elm.classList.add('active_data_js');
    };
    let abstractData = (list, date) => {
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].dt_txt.includes(date)) {
          newList.push(list[i]);
        }
      }
      return newList;
    };
    let newChild = (list) => this.every3HoursList(list);
    options.forEach(function (elm) {
      elm.addEventListener('click', function () {
        clickedItem(this);
        let day = elm.id;
        let newList = abstractData(list, day);
        changeData.childNodes.forEach(function (item) {
          item.style.display = 'none';
        });
        newChild(newList);
      });
    });
  },
  dayCalculator: function (list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
      if (i % 8 === 0) {
        newList.push(list[i]);
      }
    }
    return newList;
  },
};

export { weatherInfo };
