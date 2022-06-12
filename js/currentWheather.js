// here is current whether
const selecetBox = document.getElementById('favoriteCities');

const getSelectedData = () => {
  let element = document.getElementById('favoriteCities');
  let cityName = element.options[element.selectedIndex].text;
  return cityName;
};

selecetBox.onchange = () => {
  getSelectedData();
};

export {  };
