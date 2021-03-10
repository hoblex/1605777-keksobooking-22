// import {IMG_ADDRESS} from './data.js';
import {getRandomAvatar} from '../js/random-functions.js';
import {getRandomOffer} from '../js/random-functions.js';
import {getRandomObjectLocation} from '../js/random-functions.js';

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

