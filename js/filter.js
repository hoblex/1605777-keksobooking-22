import {addDeleteOneElementClass, changeDisabledState} from './util-functions.js';
import {markers, map} from './map.js';

export const adFilter = document.querySelector('.map__filters');

//функция изменения состояния активности фильтра
export const changeFilterActiveState = function () {
  const mapFilter = document.querySelector('.map__filters');
  addDeleteOneElementClass(mapFilter, 'map__filters--disabled');
  const mapFilterSelects = mapFilter.querySelectorAll('select');
  const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
  changeDisabledState(mapFilterSelects);
  changeDisabledState(mapFilterFieldsets);
}
// changeFilterActiveState();

const housingType = adFilter.querySelector('#housing-type');


const ADVERTISEMENTS_MAX_COUNT = 9;
//функция обработки фильтра по типу жилья
const housingTypeHandler = function (evt) {
  markers.forEach(function(element) {
    map.removeLayer(element);
  });

  // fetch('https://22.javascript.pages.academy/keksobooking/data')
  //   .then((response) => response.json())
  //   .then((list) => console.log(list));
  // getData(getBookingPoints, showAlert, ADVERTISEMENTS_MAX_COUNT);
}
housingType.addEventListener('change', housingTypeHandler);
