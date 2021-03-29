/* global _:readonly */
import './popup.js';
import './map.js';
import './form.js';
import './previews.js'
import {getData} from './api.js';
import {showAlert} from './util-functions.js';
import {ADVERTISEMENTS_MAX_COUNT, getBookingPoints} from './map.js';
import {enableFilterActiveState, housingGuests, housingRooms, housingPrice, housingType, housingFeaturesContainer, FilterValues, RERENDER_DELAY, housingFilterHandler} from './filter.js';

const adObjectsList = [];

export const handleData = function (adList) {
  adList.forEach((add) => adObjectsList.push(add));
  getBookingPoints(adList);
  enableFilterActiveState();
}


getData(handleData, showAlert, ADVERTISEMENTS_MAX_COUNT);


housingType.addEventListener('change', _.debounce(housingFilterHandler('change', adObjectsList, FilterValues, 'type'), RERENDER_DELAY));
housingPrice.addEventListener('change', _.debounce(housingFilterHandler('change', adObjectsList, FilterValues, 'price'), RERENDER_DELAY));
housingRooms.addEventListener('change', _.debounce(housingFilterHandler('change', adObjectsList, FilterValues, 'rooms'), RERENDER_DELAY));
housingGuests.addEventListener('change', _.debounce(housingFilterHandler('change', adObjectsList, FilterValues, 'guests'), RERENDER_DELAY));
housingFeaturesContainer.addEventListener('change', _.debounce(housingFilterHandler('change', adObjectsList, FilterValues, 'features'), RERENDER_DELAY));

