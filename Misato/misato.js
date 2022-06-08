import WEATHER_API_KEY from '../apikey.js';

let weatherInfo = {
    myKey: WEATHER_API_KEY,
    getWeatherInfo: async function (city) {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.myKey}`);
        const data = await res.json();
        console.log(data);
        this.showData(data);
    },
    showData: function (data) {
        const { country } = data.city;
        const { list } = data;
        console.log(list);
        let next5DaysData = [list[8],list[16], list[24],list[32],list[39]];
        console.log(next5DaysData);
        //3hoursList
        this.every3HoursList(list);
        //next5days
        this.next5daysList(next5DaysData);
    },
    every3HoursList: function (list) {
        let container = document.getElementById("every_3hours");
        for (let i = 0; i < list.length; i++) {
            let day = this.datemodifiyer(list[i].dt_txt)[0];
            let time = this.datemodifiyer(list[i].dt_txt)[1];
            let icon = list[i].weather[0].icon;
            let iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`
            let temp = list[i].main.temp;
            let innerItem = this.innerContent(day,time,iconImg,temp) 
            let li = document.createElement('li');
            li.insertAdjacentHTML("afterbegin", innerItem);
            container.appendChild(li);
        }
    },
    datemodifiyer: function(date){
        let newDateStr = date.substr(5, 11)
        let newDate = newDateStr.split(' ');
        return newDate;
    },
    innerContent: function(day, time, icon, temp) {
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
    next5daysList: function(list) {
        let container = document.getElementById("next_5days");
        for(let i = 0; i< list.length; i++) {
            let day = this.datemodifiyer(list[i].dt_txt)[0];
            // let time = this.datemodifiyer(list[i].dt_txt)[1];
            let icon = list[i].weather[0].icon;
            let iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            let temp = list[i].main.temp;
            let minTemp = list[i].main.temp_min;
            let maxTemp = list[i].main.temp_max;
            let innerItem = this.innerContent5Days(day, iconImg, temp,minTemp,maxTemp);
            let li = document.createElement('li');
            li.insertAdjacentHTML("afterbegin", innerItem);
            container.appendChild(li);
        }
    },
    innerContent5Days: function(day, icon, temp, min, max) {
        let innerItem = 
        `
        <div class='item_container'>
            <h4>${day}</h4>
            <img src=${icon}>
            <h4>${temp}</h4>
            <h4><span>${min}℃</span>/<span>${max}℃</span></h4>
        </div>
        `
        return innerItem;
    }
}
weatherInfo.getWeatherInfo('Burnaby');