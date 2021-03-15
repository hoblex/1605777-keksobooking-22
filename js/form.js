import {TYPES} from "./data.js";
import {CHECKIN_TIMES} from "./data.js";
import {CHECKOUT_TIMES} from "./data.js";

//Объект для хранения минимальной стоимости жилья
const TYPES_MIN_PRICES = {
  palace : 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

//Поиск элементов выбора типа жилья из формы
const accomodationType = document.querySelector('#type');
//Поиск элементов стоимости жилья из формы
const accomodationPrice = document.querySelector('#price');

//Функция-обработчик события 'выбор жилья'
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

//Поиск элементов установки времени заезда
const checkinTime = document.querySelector('#timein')
//Поиск элементов установки времени выезда
const checkoutTime = document.querySelector('#timeout')

//Функция-обработчик события установки времени заезда-выезда
const checkinSelectHandler = function () {

}

console.log(checkinTime.attributes);
