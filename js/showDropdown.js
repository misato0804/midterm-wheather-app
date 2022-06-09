//showing favorite cities dropdown
const showDropdown = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'weblioObjFlg') {
      const option = document.createElement('option');
      option.value = localStorage.key(i);
      option.text = localStorage.key(i);
      selecetBox.add(option);
    }
  }
};

showDropdown();
