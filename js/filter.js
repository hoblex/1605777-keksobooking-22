import {getBookingPoints, removeMarkers} from './map.js';

export const adFilter = document.querySelector('.map__filters');
export const housingType = adFilter.querySelector('#housing-type');
export const housingPrice = adFilter.querySelector('#housing-price');
export const housingRooms = adFilter.querySelector('#housing-rooms');
export const housingGuests = adFilter.querySelector('#housing-guests');
export const housingFeaturesContainer = adFilter.querySelector('#housing-features');

const mapFilter = document.querySelector('.map__filters');
const mapFilterSelects = mapFilter.querySelectorAll('select');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

const LOW_FILTER_PRICE = 10000;
const HIGH_FILTER_PRICE = 50000;

export const RERENDER_DELAY = 500;

//объект для хранения выбранных в фильтре свойств. по-умолчанию значения не выбраны
export const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  selectedFeatures: {
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
  },
}

export const disableFilterActiveState = function () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterSelects.forEach((element) => element.disabled = true)
  mapFilterFieldsets.forEach((element) => element.disabled = true)
}
disableFilterActiveState();

export const enableFilterActiveState = function () {
  mapFilter.classList.remove('map__filters--disabled');
  for (let element of mapFilterSelects) {
    element.disabled = false;
  }
  for (let element of mapFilterFieldsets) {
    element.disabled = false;
  }
}


//функция складывания всех значений selectedFeatures
const getSelectedFeaturesSumma = function (list) {
  let summa = Boolean(false);
  for (let i = 0; i < list.length; i++) {
    summa = summa || list[i];
  }
  return summa;
}

//функция преобразования поля цены из текстового значения в цифровой
const doPriceConvert = function (alias, price) {
  switch (alias) {
    case 'low' :
      if (price < LOW_FILTER_PRICE)
        return true;
      break;
    case 'middle' :
      if (price >= LOW_FILTER_PRICE && price < HIGH_FILTER_PRICE)
        return true;
      break;
    case 'high' :
      if (price >= HIGH_FILTER_PRICE)
        return true;
      break;
  }
}

//функция подбора объявлений по features
const compareFeatures = function (featuresList, adFeaturesArray) {
  let featuresExist = Boolean(true);
  if (adFeaturesArray.length === 0) {
    featuresExist = false;
  }
  for (let i = 0; i < featuresList.length; i++) {
    if (featuresList[i]) {
      featuresExist = featuresExist && adFeaturesArray.some((element) => `${featuresList[i]}` === element);
    }
  }
  return featuresExist;
}

//функция обработки фильтра
const filterBookingPoints = function (evt, objectsList, storageValues, prop) {
  removeMarkers();

  if (prop !== 'features') {
    storageValues[prop] = evt.target.value;
  } else {
    storageValues.selectedFeatures[evt.target.value] = evt.target.checked;
  }

  getBookingPoints(objectsList
    .filter(function (element) {
      return (storageValues['type'] !== 'any') ? (`${element.offer['type']}` === `${storageValues['type']}`) : true;
    })
    .filter(function (element) {
      return (storageValues['price'] !== 'any') ? (doPriceConvert(storageValues['price'], element.offer['price'])) : true;
    })
    .filter(function (element) {
      return (storageValues['rooms'] !== 'any') ? (`${element.offer['rooms']}` === `${storageValues['rooms']}`) : true;
    })
    .filter(function (element) {
      return (storageValues['guests'] !== 'any') ? (`${element.offer['guests']}` === `${storageValues['guests']}`) : true;
    })
    .filter(function (element) {
      return (getSelectedFeaturesSumma(storageValues.selectedFeatures)) ? (compareFeatures(storageValues.selectedFeatures, element.offer.features)) : true;
    }));
}

//функция обработки фильтра по типу жилья
export const housingFilterHandler = function (event, objectsList, storageObject, prop) {
  return function (event) {
    //функция фильтрации получаемых с сервера данных
    filterBookingPoints(event, objectsList, storageObject, prop);
  }
};
