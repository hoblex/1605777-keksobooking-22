import {IMG_ADDRESS} from './data.js';
import {getRandomAvatar} from './random-functions';
import {getRandomOffer} from './random-functions';
import {getRandomObjectLocation} from './random-functions';

const getNewBookingObject = () => {
  return {
    author: getRandomAvatar(IMG_ADDRESS),
    offer: getRandomOffer(),
    objectLocation: getRandomObjectLocation(),
  };
};

const OBJECTS_COUNT = 10;
const bookingObjectsList = new Array(OBJECTS_COUNT).fill(null).map(() => getNewBookingObject());

//Метод вызывается для того, чтобы ESLint не ругался
// bookingObjectsList.forEach(value => {
//   return value;
// });
console.log(bookingObjectsList);
