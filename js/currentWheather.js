// here is current whether
import { selecetBox } from './index.js';

const getSelectedData = () => {
  let element = document.getElementById('favoriteCities');
  let cityName = element.options[element.selectedIndex].text;
  return cityName;
};

selecetBox.onchange = () => {
  getSelectedData();
};
