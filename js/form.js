import {getData, sendData} from './api.js';
import {setDefaultAddress, MapCenter, mainPinMarker, ADVERTISEMENTS_MAX_COUNT} from './map.js';
import {handleData} from './main.js';
import {adFilter} from './filter.js';
import {addDeleteOneElementClass, changeDisabledState, showAlert} from './util-functions.js';
import {Types} from './popup.js';
import {resetFileAvatarChooser, resetFileAccomodationChooser} from './previews.js';

//Объект для хранения минимальной стоимости жилья
const TypesMinPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
}

const TYPES_MAX_PRICE = '1000000';

const AdTitleLength = {
  MIN: '30',
  MAX: '100',
}

//Поиск элемента выбора типа жилья из формы
const adType = document.querySelector('#type');
//Поиск элемента стоимости жилья из формы
const adPrice = document.querySelector('#price');

//Предварительная проверка установленного по-умолчанию значения типа жилья
const setDefaultAdType = function () {
  for (let key in Types) {
    if (adType.value === key) {
      adPrice.setAttribute('min', TypesMinPrices[key]);
    }
  }
}
setDefaultAdType();
//Подписка на событие выбора типа жилья
adType.addEventListener('change', function (evt) {
  adPrice.setAttribute('min', TypesMinPrices[evt.target.value.toUpperCase()]);
  adPrice.placeholder = TypesMinPrices[evt.target.value.toUpperCase()];
});


//установка максимального значения стоимости жилья всех типов
adPrice.setAttribute('max', TYPES_MAX_PRICE);
//валидация цены при вводе значения в соответствующее поле
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


const adForm = document.querySelector('.ad-form');

//функция изменения состояния активности страницы формы
export const changePageActiveState = function () {
  addDeleteOneElementClass(adForm, 'ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  changeDisabledState(adFormFieldsets);
};
changePageActiveState();

//адреса для заполнения координатами
export const adFormAddress = document.querySelector('#address');

//запрет ввода данных в строку адреса с клавиатуры
adFormAddress.setAttribute('readonly','true');

//валидация заголовка в форме ввода данных объявления
const adTitle = document.querySelector('#title');
adTitle.setAttribute('minlength', AdTitleLength.MIN)
adTitle.setAttribute('maxlength', AdTitleLength.MAX)

adTitle.addEventListener('input', function(evt) {
  const valueLength = evt.target.value.length;
  if (valueLength < AdTitleLength.MIN) {
    adTitle.setCustomValidity(`Минимальная длина поля 30 симв. Введите еще ${AdTitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > AdTitleLength.MAX) {
    adTitle.setCustomValidity(`Максимальная длина поля 100 симв. Удалите лишние ${valueLength - AdTitleLength.MAX} симв.`)
  } else {
    adTitle.setCustomValidity('')
  }
  adTitle.reportValidity();
});

//валидация ввода данных при отправке формы объявления
adTitle.addEventListener('invalid', function (evt) {
  const valueLength = evt.target.value.length;
  if (valueLength === 0) {
    adTitle.setCustomValidity(`Минимальная длина поля 30 симв. Введите еще ${AdTitleLength.MIN - valueLength} симв.`);
  }
});

//валидация пункта выбора количества комнат
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');

let roomNumberValue = document.querySelector('#room_number').value;
let capacityValue = document.querySelector('#capacity').value;


const validateRoomNumber = function (roomCount, capacityCount) {
  if (roomCount === '100') {
    capacityOptions[capacityOptions.length - 1].disabled = false;
    for (let key = 0; key < capacityOptions.length - 1; key++) {
      capacityOptions[key].disabled = true;
    }
    if (capacityCount !== '0') {
      capacity.setCustomValidity('Доступен только пункт "Не для гостей"');
    } else {
      capacity.setCustomValidity('');
    }
  } else {
    capacityOptions[capacityOptions.length - 1].disabled = true;
    for (let key = 0; key < capacityOptions.length - 1; key++) {
      capacityOptions[key].disabled = (roomCount < capacityOptions[key].value);
    }
    if (capacityCount === '0') {
      capacity.setCustomValidity('Данный пункт доступен только при количестве комнат 100');
    } else if  (capacityCount > roomCount){
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
  mainPinMarker.setLatLng(MapCenter);
  setDefaultAddress(mainPinMarker);
  getData(handleData, showAlert, ADVERTISEMENTS_MAX_COUNT);
  resetFileAvatarChooser();
  resetFileAccomodationChooser();
}

//функция обработки успешной отправки формы
const doSuccessSentForm = function () {
  const modalSuccess = document.querySelector(('#success')).content.querySelector('.success').cloneNode(true);
  adForm.appendChild(modalSuccess);
  modalSuccess.style.zIndex = '1100';
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
  const modalErrorButton = modalError.querySelector('.error__button');
  adForm.appendChild(modalError);
  modalError.style.zIndex = '1100';
  document.addEventListener('keydown', escKeydownHandler('keydown', modalError));
  document.addEventListener('click', mouseClickHandler('click', modalError));
  modalErrorButton.addEventListener('click', mouseClickHandler('click', modalError));
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
