export const Types = {
  PALACE : 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
};

const POPUP_FEATURE_BLOCK_CLASS = 'popup__feature';

//Создание шаблона карточки объявления
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//заполнение карточки объявления данными из сгенерированного массива объектов
export const getNewBookingObjectCard = function (bookingObjectsListItem) {
  const offerCard = cardTemplate.cloneNode(true);
  offerCard.querySelector('.popup__title').textContent = bookingObjectsListItem.offer.title;
  offerCard.querySelector('.popup__text--address').textContent = bookingObjectsListItem.offer.address;
  offerCard.querySelector('.popup__text--price').textContent = `${bookingObjectsListItem.offer.price} ₽/ночь`;

  offerCard.querySelector('.popup__type').textContent = Types[bookingObjectsListItem.offer.type.toUpperCase()];

  offerCard.querySelector('.popup__text--capacity').textContent = `${bookingObjectsListItem.offer.rooms} комнаты для ${bookingObjectsListItem.offer.guests} гостей`;
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${bookingObjectsListItem.offer.checkin}, выезд до ${bookingObjectsListItem.offer.checkout}`;

  const offerCardFeaturesList = offerCard.querySelector('.popup__features');
  offerCardFeaturesList.innerHTML = '';

  bookingObjectsListItem.offer.features.forEach(value => {
    const featureItem = document.createElement('li');
    const featureItemNewClass = `${POPUP_FEATURE_BLOCK_CLASS}--${value}`;
    featureItem.classList.add(POPUP_FEATURE_BLOCK_CLASS);
    featureItem.classList.add(featureItemNewClass);
    offerCardFeaturesList.appendChild(featureItem);
  });

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

//создание массива из сгенерированных карточек (разметки) объявлений
export const getBookingObjectsCardList = function (list) {
  return list.map((element) => getNewBookingObjectCard(element));
}

