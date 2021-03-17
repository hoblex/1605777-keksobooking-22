import {changePageActiveState} from './form.js';
import {adFormAddress} from "./form.js";
import {setDefaultAddress} from "./form.js";

//добавление карты в канвас с указанием координат цента по-умолчанию
const map = L.map('map-canvas')
  .on('load', () => {
    changePageActiveState();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 10);


//добавление описания карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


//описание иконки маркера
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//описание маркера
const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

//добавление маркера на карту
mainPinMarker.addTo(map);

//обработка координат хвоста маркера
mainPinMarker.on('drag', (evt) => {
  //добавление автоматического заполнения адреса  в объявлении координатами главной метки
  adFormAddress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

setDefaultAddress(adFormAddress, mainPinMarker.getLatLng().lat.toFixed(5) + ', ' + mainPinMarker.getLatLng().lng.toFixed(5));

//Удаление маркера
// mainPinMarker.remove();

