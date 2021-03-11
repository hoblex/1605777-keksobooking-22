import {getRandomAvatar} from './random-functions.js';
import {getRandomOffer} from './random-functions.js';
import {getRandomObjectLocation} from './random-functions.js';

const IMG_ADDRESS = 'img/avatars/user';
const getNewBookingObject = () => {
  return {
    author: getRandomAvatar(IMG_ADDRESS),
    offer: getRandomOffer(),
    objectLocation: getRandomObjectLocation(),
  };
};


const OBJECTS_COUNT = 10;
const bookingObjectsList = new Array(OBJECTS_COUNT).fill(null).map(() => getNewBookingObject());

// Метод вызывается для того, чтобы ESLint не ругался
bookingObjectsList.forEach(value => {
  return value;
});

console.log(bookingObjectsList);
