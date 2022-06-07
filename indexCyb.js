// var button = document.querySelector('.button');
// var inputValue = document.querySelector('.inputValue');
// var icon = document.querySelector('.icon');

// console.log(name);
// /* GET Current weather */
// button.addEventListener('click', function () {
//   fetch(
//     'https:api.openweathermap.org/data/2.5/weather?q=' +
//       inputValue.value +
//       '&appid=64d0314083df655f782bcd486a05f7b0'
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const nameValue = data['name'];
//       var tempValue = data['main']['temp'];
//       var descValue = data['weather'][0]['description'];
//       var iconValue = date['icon'];
//       console.log(iconValue);
//       console.log(nameValue);
//       const name = document.querySelector('.name');
//       var desc = document.querySelector('.desc');
//       var temp = document.querySelector('.temp');
//       var icon = document.querySelector('.icon');
//       name.innerHTML = nameValue;
//       temp.innerHTML = tempValue;
//       desc.innerHTML = descValue;
//     })

//     .catch((err) => alert('Wrong city name!'));
// });
