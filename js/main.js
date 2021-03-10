import { IMG_ADDRESS } from './data.js';
import { OBJECTS_COUNT } from './data.js';
import { TITLES } from './data.js';
import { TYPES } from './data.js';
import { CHECKIN_TIMES } from './data.js';
import { CHECKOUT_TIMES } from './data.js';
import { FEATURES } from './data.js';
import { DESCRIPTION } from './data.js';
import { PHOTOS } from './data.js';

const getRandomInteger = (beginNumber, endNumber) => Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;
const getRandomFloat = (beginNumber, endNumber, numbersAfterPoint) => (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);

getRandomInteger(1, 10);
getRandomFloat(1.1, 1.2, 4);

const getRandomAvatar = (imgAddressArray) => {
  return {
    avatar: imgAddressArray + '0' + getRandomInteger(1, 9) + '.png',
  };
}

const getRandomObjectLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  }
};

const getRandomSentence = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomArray = (array) => {
  return array.slice(0, getRandomInteger(1, array.length - 1));
}

const getRandomOffer = () => {
  return {
    title: getRandomSentence(TITLES),
    address: Object.values(getRandomObjectLocation()).join(', '),
    price: getRandomInteger(100, 1000) + '$',
    type: getRandomSentence(TYPES),
    rooms: getRandomInteger(1, 6),
    get guests() {
      return this.rooms + 2;
    },
    set guests(value) {
      this.guests = value;
    },
    checkin: getRandomSentence(CHECKIN_TIMES),
    checkout: getRandomSentence(CHECKOUT_TIMES),
    features: getRandomArray(FEATURES),
    description: getRandomSentence(DESCRIPTION),
    photos: getRandomArray(PHOTOS),
  }
}

const getNewBookingObject = () => {
  return {
    author: getRandomAvatar(IMG_ADDRESS),
    offer: getRandomOffer(),
    objectLocation: getRandomObjectLocation(),
  };
};

const bookingObjectsList = new Array(OBJECTS_COUNT).fill(null).map(() => getNewBookingObject());

//Метод вызывается для тогог, чтобы ESlint не ругался
bookingObjectsList.forEach(value => {
  return value;
});
