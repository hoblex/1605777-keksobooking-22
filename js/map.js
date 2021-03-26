/* global L:readonly */
import {adFormAddress, changePageActiveState} from './form.js';
import {getBookingObjectsCardList} from './popup.js';
import {showAlert} from './util-functions.js';

export const MAP_CENTER = {
  lat: 35.6895,
  lng: 139.69171,
}

const ADVERTISEMENTS_MAX_COUNT = 10;

//добавление карты в канвас с указанием координат цента по-умолчанию
const map = L.map('map-canvas')
  .on('load', () => {
    changePageActiveState();
  })
  .setView(MAP_CENTER, 10);


//добавление описания карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//функция описания и создания главного маркера на карте
const createMainPinMarker = function (coordinates) {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const newMarker = L.marker(
    coordinates,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  return newMarker;
}
export const mainPinMarker = createMainPinMarker(MAP_CENTER);

//добавление маркера на карту
export const addMainPinMarkerToMap = function (marker) {
  marker.addTo(map);
};
addMainPinMarkerToMap(mainPinMarker);

//обработка координат хвоста маркера
mainPinMarker.on('drag', (evt) => {
  //добавление автоматического заполнения адреса  в объявлении координатами главной метки
  adFormAddress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

//функция установка значения по-умолчанию в пола ввода адреса
export const setDefaultAddress = function (marker) {
  adFormAddress.value = marker.getLatLng().lat.toFixed(5) + ', ' + marker.getLatLng().lng.toFixed(5);
}
setDefaultAddress(mainPinMarker);

//Удаление маркера
// mainPinMarker.remove();

//функция генерации точек для объявлений
const getBookingPoints = function (adObjectsList) {
  const bookingObjectsCardList = getBookingObjectsCardList(adObjectsList);

  const points = adObjectsList.map(function (element) {
    return new Object({lat: element.location.lat, lng: element.location.lng});
  });

  points.forEach(({lat, lng}, index) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(bookingObjectsCardList[index], { keepInView: true});
  });
};

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adObjectsList) => { getBookingPoints(adObjectsList.slice(0, ADVERTISEMENTS_MAX_COUNT)) })
  .catch(() => showAlert('Ошибка загрузки данных с сервера'));
