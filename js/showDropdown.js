// showing favorite cities dropdown
import { selecetBox } from './index.js';

const showDropdown = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage.key(i) !== 'weblioObjFlg' &&
      localStorage.key(i) !== undefined
    ) {
      const option = document.createElement('option');
      option.value = localStorage.key(i);
      option.text = localStorage.key(i);
      selecetBox.add(option);
    }
  }
};

showDropdown();
