import {addDeleteOneElementClass, changeDisabledState} from './util-functions.js';

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
changeFilterActiveState();
