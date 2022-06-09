// here is current whether

const getSelectedData = () => {
  let element = document.getElementById('favoriteCities');
  let cityName = element.options[element.selectedIndex].text;
  // console.log(cityName);
  return cityName;
};

selecetBox.onchange = () => {
  getSelectedData();
};

// console.log(searchedCity);
