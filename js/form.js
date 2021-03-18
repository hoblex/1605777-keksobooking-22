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

//функция добавления/удаления элементам коллекции атрибута disabled
const changeDisabledState = function (elementsList) {
  for (let key of elementsList) {
    key.disabled ? key.disabled = false : key.disabled = true;
  }
}

//функции добавления/удаления селектора у элемента
const addDeleteOneElementClass = function (element, selector) {
  element.classList.contains(selector) ? element.classList.remove(selector) : element.classList.add(selector);
}

//функция изменения состояния активности страницы формы
export const changePageActiveState = function () {
  const adForm = document.querySelector('.ad-form');
  addDeleteOneElementClass(adForm, 'ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  changeDisabledState(adFormFieldsets);

  const mapFilter = document.querySelector('.map__filters');
  addDeleteOneElementClass(mapFilter, 'map__filters--disabled');

  const mapFilterSelects = mapFilter.querySelectorAll('select');
  const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
  changeDisabledState(mapFilterSelects);
  changeDisabledState(mapFilterFieldsets);
};

changePageActiveState();

//адреса для заполнения координатами
export const adFormAddress = document.querySelector('#address');

//запрет ввода данных в строку адреса с клавиатуры
adFormAddress.setAttribute('readonly',true);

//функция установка значения по-умолчанию в пола ввода адреса
export const setDefaultAddress = function (element, value) {
  element.value = value;
}

