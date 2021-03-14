import {getNewBookingObject} from './data.js';
import {TYPES} from './data.js';

//Создание массива из сгенерированных объектов-объявлений
const OBJECTS_COUNT = 10;
const bookingObjectsList = new Array(OBJECTS_COUNT).fill(null).map(() => getNewBookingObject());

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//заполнение карточки объявления данными из сгенерированного массива объектов
const getBookingObjectListItem = function (bookingObjectsListItem) {
  const offerCard = cardTemplate.cloneNode(true);
  offerCard.querySelector('.popup__title').textContent = bookingObjectsListItem.offer.title;
  offerCard.querySelector('.popup__text--address').textContent = bookingObjectsListItem.offer.address;
  offerCard.querySelector('.popup__text--price').textContent = `${bookingObjectsListItem.offer.price} ₽/ночь`;

  offerCard.querySelector('.popup__type').textContent = TYPES[bookingObjectsListItem.offer.type];

  offerCard.querySelector('.popup__text--capacity').textContent = `${bookingObjectsListItem.offer.rooms} комнаты для ${bookingObjectsListItem.offer.guests} гостей`;
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${bookingObjectsListItem.offer.checkin}, выезд до ${bookingObjectsListItem.offer.checkout}`;

  const offerCardFeaturesList = offerCard.querySelector('.popup__features');
  const offerCardFeaturesItemWifi = offerCardFeaturesList.querySelector('.popup__feature--wifi');
  const offerCardFeaturesItemDishwasher = offerCardFeaturesList.querySelector('.popup__feature--dishwasher');
  const offerCardFeaturesItemParking = offerCardFeaturesList.querySelector('.popup__feature--parking');
  const offerCardFeaturesItemWasher = offerCardFeaturesList.querySelector('.popup__feature--washer');
  const offerCardFeaturesItemElevator = offerCardFeaturesList.querySelector('.popup__feature--elevator');
  const offerCardFeaturesItemConditioner = offerCardFeaturesList.querySelector('.popup__feature--conditioner');
  offerCardFeaturesList.innerHTML = '';

  for (let i = 0; i < bookingObjectsListItem.offer.features.length; i++) {
    i++;
  }

  if (bookingObjectsListItem.offer.features.includes('wifi')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemWifi);
  }

  if (bookingObjectsListItem.offer.features.includes('dishwasher')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemDishwasher);
  }

  if (bookingObjectsListItem.offer.features.includes('parking')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemParking);
  }

  if (bookingObjectsListItem.offer.features.includes('washer')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemWasher);
  }

  if (bookingObjectsListItem.offer.features.includes('elevator')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemElevator);
  }

  if (bookingObjectsListItem.offer.features.includes('conditioner')) {
    offerCardFeaturesList.appendChild(offerCardFeaturesItemConditioner);
  }

  offerCard.querySelector('.popup__description').textContent = bookingObjectsListItem.offer.description;

  //генерирование массива фотографий объявления
  const offerCardPhotosList = offerCard.querySelector('.popup__photos');
  const offerCardPhotosFragment = document.createDocumentFragment();

  //заполнение фрагмента-контейнера для списка фотографий
  bookingObjectsListItem.offer.photos.forEach(item => {
    const offerCardPhotosItemTemplate = offerCardPhotosList.querySelector('.popup__photo').cloneNode(true);
    offerCardPhotosItemTemplate.src = item;
    offerCardPhotosFragment.appendChild(offerCardPhotosItemTemplate);
  });

  //удаление первой шаблонной строки из списка фотографий
  offerCardPhotosList.removeChild(offerCardPhotosList.querySelector('.popup__photo'));
  offerCardPhotosList.appendChild(offerCardPhotosFragment);

  //замена источника фотографии для аватарки
  const offerCardAvatar = offerCard.querySelector('.popup__avatar');
  offerCardAvatar.src = bookingObjectsListItem.author.avatar;

  return offerCard;
}

bookingObjectsList.forEach(getBookingObjectListItem);

//*********Временный код для вставки первого объявления в map-canvas
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(getBookingObjectListItem(bookingObjectsList[0]));
//*********Временный код для вставки первого объявления в map-canvas

