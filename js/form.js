import {TYPES} from './data.js';

//Объект для хранения минимальной стоимости жилья
const TYPES_MIN_PRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

const TYPES_MAX_PRICE = '1000000';

const AD_TITLE_LENGTH = {
  min: '30',
  max: '100',
}

//Поиск элемента выбора типа жилья из формы
const adType = document.querySelector('#type');
//Поиск элемента стоимости жилья из формы
const adPrice = document.querySelector('#price');

//Предварительная проверка установленного по-умолчанию значения типа жилья
const setDefaultAdType = function () {
  for (let key in TYPES) {
    if (adType.value === key) {
      adPrice.setAttribute('min', TYPES_MIN_PRICES[key]);
    }
  }
}
setDefaultAdType();
//Подписка на событие выбора типа жилья
adType.addEventListener('change', function (evt) {
  adPrice.setAttribute('min', TYPES_MIN_PRICES[evt.target.value]);
  adPrice.placeholder = TYPES_MIN_PRICES[evt.target.value];
});


//установка максимального значения стоимости жилья всех типов
adPrice.setAttribute('max', TYPES_MAX_PRICE);
//валидация цены при вводе значения в соответсвтующее поле
adPrice.addEventListener('input', function (evt){
  const valuePrice = evt.target.value;

  if (+valuePrice > TYPES_MAX_PRICE) {
    adPrice.setCustomValidity('Максимальная цена жилья 1000000');
  } else if (+valuePrice <= +adPrice.getAttribute('min')) {
    adPrice.setCustomValidity(`Цена должна быть больше или равна ${adPrice.getAttribute('min')}`);
  } else {
    adPrice.setCustomValidity('');
  }
  adPrice.reportValidity();
});

//валидация значения цены при отправке формы
adPrice.addEventListener('invalid', function (evt){
  const valuePrice = evt.target.value;
  if (+valuePrice > TYPES_MAX_PRICE) {
    adPrice.setCustomValidity('Максимальная цена жилья 1000000');
  } else if (valuePrice === '') {
    adPrice.setCustomValidity('Введите значение стоимости жилья за ночь');
  } else if (+valuePrice <= +adPrice.getAttribute('min')) {
    adPrice.setCustomValidity(`Цена должна быть больше или равна ${adPrice.getAttribute('min')}`);
  } else {
    adPrice.setCustomValidity('');
  }
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
adFormAddress.setAttribute('readonly','true');

//функция установка значения по-умолчанию в пола ввода адреса
export const setDefaultAddress = function (element, value) {
  element.value = value;
}

//валидация заголовка в форме ввода данных объявления
const adTitle = document.querySelector('#title');
adTitle.setAttribute('minlength', AD_TITLE_LENGTH.min)
adTitle.setAttribute('maxlength', AD_TITLE_LENGTH.max)

adTitle.addEventListener('input', function(evt) {
  const valueLength = evt.target.value.length;
  if (valueLength < AD_TITLE_LENGTH.min) {
    adTitle.setCustomValidity(`Минимальная длина поля 30 симв. Введите еще ${AD_TITLE_LENGTH.min - valueLength} симв.`);
  } else if (valueLength > AD_TITLE_LENGTH.max) {
    adTitle.setCustomValidity(`Максимальная длина поля 100 симв. Удалите лишние ${valueLength - AD_TITLE_LENGTH.max} симв.`)
  } else {
    adTitle.setCustomValidity('')
  }
  adTitle.reportValidity();
});

//валидация ввода данных при отправке формы объявления
adTitle.addEventListener('invalid', function (evt) {
  const valueLength = evt.target.value.length;
  if (valueLength === 0) {
    adTitle.setCustomValidity(`Минимальная длина поля 30 симв. Введите еще ${AD_TITLE_LENGTH.min - valueLength} симв.`);
  }
});

//валидация пункта выбора количества комнат
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

let roomNumberValue = document.querySelector('#room_number').value;
let capacityValue = document.querySelector('#capacity').value;

const validateRoomNumber = function (roomN, capacityN) {
  if(roomN === '1') {
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
    if (capacityN === '0') {
      capacity.setCustomValidity('Данный пункт доступен только при количестве комнат 100');
    } else if  (capacityN === '2' || capacityN === '3'){
      capacity.setCustomValidity('Число комнат необходимо увеличить');
    } else {
      capacity.setCustomValidity('');
    }
  } else if (roomN === '2') {
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = false;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
    if  (capacityN === '0'){
      capacity.setCustomValidity('Данный пункт доступен только при количестве комнат 100');
    } else if (capacityN === '3') {
      capacity.setCustomValidity('Число комнат необходимо увеличить ');
    } else {
      capacity.setCustomValidity('');
    }
  } else if (roomNumberValue === '3') {
    capacity.options[0].disabled = false;
    capacity.options[1].disabled = false;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
    if  (capacityN === '0'){
      capacity.setCustomValidity('Данный пункт доступен только при количестве комнат 100');
    } else {
      capacity.setCustomValidity('');
    }
  } else if (roomNumberValue === '100') {
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[2].disabled = true;
    capacity.options[3].disabled = false;
    if (capacityValue !== '0') {
      capacity.setCustomValidity('Доступен только пункт "Не для гостей"');
    } else {
      capacity.setCustomValidity('');
    }
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
}
validateRoomNumber(roomNumberValue, capacityValue);

roomNumber.addEventListener('change', function(evt) {
  roomNumberValue = evt.target.value;
  validateRoomNumber(roomNumberValue, capacityValue);
});

capacity.addEventListener('change', function(evt) {
  capacityValue = evt.target.value;
  validateRoomNumber(roomNumberValue, capacityValue);
});


