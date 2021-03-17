import {TYPES} from './data.js';

//Объект для хранения минимальной стоимости жилья
const TYPES_MIN_PRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

//Поиск элементов выбора типа жилья из формы
const accomodationType = document.querySelector('#type');
//Поиск элементов стоимости жилья из формы
const accomodationPrice = document.querySelector('#price');

//Предварительная проверка установленного по-умолчанию значения типа жилья
const setDefaultAccomodationType = function () {
  for (let key in TYPES) {
    if (accomodationType.value === key) {
      accomodationPrice.setAttribute('min', TYPES_MIN_PRICES[key]);
    }
  }
}
setDefaultAccomodationType();
//Подписка на событие выбора типа жилья
accomodationType.addEventListener('change', function (evt) {
  accomodationPrice.setAttribute('min', TYPES_MIN_PRICES[evt.target.value]);
});

//Поиск элементов установки времени заезда
const checkinTime = document.querySelector('#timein')
//Поиск элементов установки времени выезда
const checkoutTime = document.querySelector('#timeout')

//Функция-обработчик события установки времени заезда-выезда
const checkTimeSelectHandler = function (evt) {
  this.value = evt.target.value;
}

checkinTime.addEventListener('change', checkTimeSelectHandler.bind(checkoutTime));
checkoutTime.addEventListener('change', checkTimeSelectHandler.bind(checkinTime));

