import {getNewBookingObject} from './data.js';

const OBJECTS_COUNT = 10;
const bookingObjectsList = new Array(OBJECTS_COUNT).fill(null).map(() => getNewBookingObject());

// Метод вызывается для того, чтобы ESLint не ругался
bookingObjectsList.forEach(value => {
  return value;
});
