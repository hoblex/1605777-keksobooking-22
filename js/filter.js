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
export const FilterValues = {
  TYPE: 'any',
  PRICE: 'any',
  ROOMS: 'any',
  GUESTS: 'any',
  SelectedFeatures: {
    WIFI: false,
    DISHWASHER: false,
    PARKING: false,
    WASHER: false,
    ELEVATOR: false,
    CONDITIONER: false,
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
  mapFilterSelects.forEach((element) => element.disabled = false)
  mapFilterFieldsets.forEach((element) => element.disabled = false)
}


//функция складывания всех значений SelectedFeatures
const getSelectedFeaturesSumma = function (list) {
  let summa = Boolean(false);
  for (let item in list) {
    summa = summa || list[item];
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
    return false;
  }
  for (let item in featuresList) {
    if (featuresList[item]) {
      featuresExist = featuresExist && adFeaturesArray.some((element) => item === element.toUpperCase());
    }
  }
  return featuresExist;
}

//функция обработки фильтра
const filterBookingPoints = function (evt, objectsList, storageValues, prop) {
  removeMarkers();

  if (prop !== 'features') {
    storageValues[prop.toUpperCase()] = evt.target.value;
  } else {
    storageValues.SelectedFeatures[evt.target.value.toUpperCase()] = evt.target.checked;
  }

  getBookingPoints(objectsList
    .filter(function (element) {
      return (storageValues['TYPE'] !== 'any') ? (`${element.offer['type']}` === `${storageValues['TYPE']}`) : true;
    })
    .filter(function (element) {
      return (storageValues['PRICE'] !== 'any') ? (doPriceConvert(storageValues['price'], element.offer['PRICE'])) : true;
    })
    .filter(function (element) {
      return (storageValues['ROOMS'] !== 'any') ? (`${element.offer['rooms']}` === `${storageValues['ROOMS']}`) : true;
    })
    .filter(function (element) {
      return (storageValues['GUESTS'] !== 'any') ? (`${element.offer['guests']}` === `${storageValues['GUESTS']}`) : true;
    })
    .filter(function (element) {
      return (getSelectedFeaturesSumma(storageValues.SelectedFeatures)) ? (compareFeatures(storageValues.SelectedFeatures, element.offer.features)) : true;
    }));
}

//функция обработки фильтра по типу жилья
export const housingFilterHandler = function (event, objectsList, storageObject, prop) {
  return function (event) {
    //функция фильтрации получаемых с сервера данных
    filterBookingPoints(event, objectsList, storageObject, prop);
  }
};
