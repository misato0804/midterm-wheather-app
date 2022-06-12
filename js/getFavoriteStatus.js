//favorite star toggle
const getFavoriteStatus = (selectedCity) => {
  const btn = document.getElementsByClassName('btn')[0];
  const favoriteCont = document.getElementById('favorite');
  if (localStorage.getItem(selectedCity)) {
    btn.src = './images/starColored' + '.png';
    favoriteCont.btn;
  } else {
    btn.src = './images/star' + '.png';
    favoriteCont.btn;
  }
};

export { getFavoriteStatus };
