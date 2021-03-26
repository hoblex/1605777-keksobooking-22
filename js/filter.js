/* global _:readonly */
import {adObjectsList, getBookingPoints, map, markers} from './map.js';

export const adFilter = document.querySelector('.map__filters');
const housingType = adFilter.querySelector('#housing-type');
const housingPrice = adFilter.querySelector('#housing-price');
const housingRooms = adFilter.querySelector('#housing-rooms');
const housingGuests = adFilter.querySelector('#housing-guests');
const housingFeaturesContainer = adFilter.querySelector('#housing-features');

const mapFilter = document.querySelector('.map__filters');
const mapFilterSelects = mapFilter.querySelectorAll('select');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

export const disableFilterActiveState = function () {
  mapFilter.classList.add('map__filters--disabled');
  for (let element of mapFilterSelects) {
    element.disabled = true;
  }
  for (let element of mapFilterFieldsets) {
    element.disabled = true;
  }
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
// enableFilterActiveState();
// changeFilterActiveState();

//объект для хранения выбранных в фильтре свойств. по-умолчанию значения не выбраны
const filterValues = {
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

//функция складывания всех значений selectedFeatures
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
      if (price < 10000)
        return true;
      break;
    case 'middle' :
      if (price >= 10000 && price < 50000)
        return true;
      break;
    case 'high' :
      if (price >= 50000)
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
  for (let item in featuresList) {
    if (featuresList[item]) {
      featuresExist = featuresExist && adFeaturesArray.some((element) => `${item}` === element);
    }
  }
  return featuresExist;
}

//функция обработки фильтра
const filterBookingPoints = function (evt, storageValues, prop) {
  markers.forEach(function (element) {
    map.removeLayer(element);
  });

  if (prop !== 'features') {
    storageValues[prop] = evt.target.value;
  } else {
    storageValues.selectedFeatures[evt.target.value] = evt.target.checked;
  }

  getBookingPoints(adObjectsList
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
      return (getSelectedFeaturesSumma(storageValues.selectedFeatures)) ? (compareFeatures(storageValues.selectedFeatures, element.offer.features)) : true
    }));
}

const RERENDER_DELAY = 500;
//функция обработки фильтра по типу жилья
const housingFilterHandler = function (event, storageObject, prop) {
  return function (event) {
    //функция фильтрации получаемых с сервера данных
    filterBookingPoints(event, storageObject, prop);
  }
};

housingType.addEventListener('change', _.debounce(housingFilterHandler('change', filterValues, 'type'), RERENDER_DELAY));
housingPrice.addEventListener('change', _.debounce(housingFilterHandler('change', filterValues, 'price'), RERENDER_DELAY));
housingRooms.addEventListener('change', _.debounce(housingFilterHandler('change', filterValues, 'rooms'), RERENDER_DELAY));
housingGuests.addEventListener('change', _.debounce(housingFilterHandler('change', filterValues, 'guests'), RERENDER_DELAY));
housingFeaturesContainer.addEventListener('change', _.debounce(housingFilterHandler('change', filterValues, 'features'), RERENDER_DELAY));

