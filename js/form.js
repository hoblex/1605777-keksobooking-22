import {TYPES} from './data.js';
import {sendData} from './api.js';
import {setDefaultAddress, MAP_CENTER, mainPinMarker} from './map.js';
import {adFilter} from "./filter.js";

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
  } else if (+valuePrice < +adPrice.getAttribute('min')) {
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
  for (let element of elementsList) {
    element.disabled = !element.disabled ;
  }
}

//функции добавления/удаления селектора у элемента
const addDeleteOneElementClass = function (element, selector) {
  element.classList.toggle(selector) ;
}

const adForm = document.querySelector('.ad-form');

//функция изменения состояния активности страницы формы
export const changePageActiveState = function () {
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
const capacityOptions = capacity.querySelectorAll('option');

let roomNumberValue = document.querySelector('#room_number').value;
let capacityValue = document.querySelector('#capacity').value;


const validateRoomNumber = function (roomN, capacityN) {
  if (roomN === '100') {
    capacityOptions[capacityOptions.length - 1].disabled = false;
    for (let key = 0; key < capacityOptions.length - 1; key++) {
      capacityOptions[key].disabled = true;
    }
    if (capacityN !== '0') {
      capacity.setCustomValidity('Доступен только пункт "Не для гостей"');
    } else {
      capacity.setCustomValidity('');
    }
  } else {
    capacityOptions[capacityOptions.length - 1].disabled = true;
    for (let key = 0; key < capacityOptions.length - 1; key++) {
      capacityOptions[key].disabled = (roomN < capacityOptions[key].value);
    }
    if (capacityN === '0') {
      capacity.setCustomValidity('Данный пункт доступен только при количестве комнат 100');
    } else if  (capacityN > roomN){
      roomNumber.setCustomValidity('Число комнат необходимо увеличить');
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  }
  capacity.reportValidity();
  roomNumber.reportValidity();
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

//функция обработки закрытия окна по ESC
const escKeydownHandler = function (evt, target) {
  const handler = function (event) {
    if (event.keyCode === 27) {
      target.remove();
    }
    document.removeEventListener(evt, handler);
  }
  return handler;
}

//функция обработки закрытия окна по нажатию кнопки мыши
const mouseClickHandler = function (evt, target) {
  const handler = function () {
    target.remove();
    document.removeEventListener(evt, handler);
  }
  return handler;
}

//функция сброса введенных в форму значений в значения по-умолчанию
//главный маркер возвращается в исходное состояние
const resetForm = function () {
  adForm.reset();
  adFilter.reset();
  mainPinMarker.setLatLng(MAP_CENTER);
  setDefaultAddress(mainPinMarker);
}

//функция обработки успешной отправки формы
const doSuccessSentForm = function () {
  const modalSuccess = document.querySelector(('#success')).content.querySelector('.success').cloneNode(true);
  adForm.appendChild(modalSuccess);
  modalSuccess.style.zIndex = 1100;
  resetForm();
  //закрытие модального окна по нажатию на ESC
  document.addEventListener('keydown', escKeydownHandler('keydown', modalSuccess));
  document.addEventListener('click', mouseClickHandler('click', modalSuccess));
}


//обработка кнопки сброса формы в начальное состояние
const resetFormButton = adForm.querySelector('.ad-form__reset');
resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})

//функция обработки сбоя при отправке формы
const doErrorSentForm = function () {
  const modalError = document.querySelector(('#error')).content.querySelector('.error').cloneNode(true);
  adForm.appendChild(modalError);
  modalError.style.zIndex = 1100;
  document.addEventListener('keydown', escKeydownHandler('keydown', modalError));
  document.addEventListener('click', mouseClickHandler('click', modalError));
}

//подписывание на отправку формы
adForm.addEventListener('submit', (evt) => {
  //отменить действие кнопки отправки формы по-умолчанию
  evt.preventDefault();

  sendData(
    doSuccessSentForm,
    doErrorSentForm,
    new FormData(evt.target),
  );
});
