import {CHECKIN_TIMES, CHECKOUT_TIMES, DESCRIPTION, FEATURES, PHOTOS, TITLES, TYPES} from './data.js';

const getRandomInteger = (beginNumber, endNumber) => Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;

const getRandomFloat = (beginNumber, endNumber, numbersAfterPoint) => (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);

const getRandomSentence = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomArray = (array) => {
  return array.slice(0, getRandomInteger(1, array.length - 1));
};

export const getRandomAvatar = (imgAddressArray) => {
  return {
    avatar: imgAddressArray + '0' + getRandomInteger(1, 9) + '.png',
  };
};

export const getRandomObjectLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  }
};

export const getRandomOffer = () => {
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
};
