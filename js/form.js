import {TYPES} from "./data.js";

const TYPES_MIN_PRICES = {
  palace : 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

const accomodationType = document.querySelector('#type');
const accomodationPrice = document.querySelector('#price');

const accomodationTypeSelectHandler = function () {
  for (let key in TYPES) {
    if (accomodationType.value === key) {
      accomodationPrice.setAttribute('min', TYPES_MIN_PRICES[key]);
    }
  }
}

//Предварительная проверка установленного по-умолчанию значения типа жилья
accomodationTypeSelectHandler();
//Подписка на событие выбора типа жилья
accomodationType.addEventListener('change', accomodationTypeSelectHandler);
