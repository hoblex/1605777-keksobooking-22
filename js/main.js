const getRandomInteger = (beginNumber, endNumber) => Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;
const getRandomFloat = (beginNumber, endNumber, numbersAfterPoint) => (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);

getRandomInteger(1, 10);
getRandomFloat(1.1, 1.2, 4);

const IMG_ADDRESS = 'img/avatars/user';
const OBJECTS_COUNT = 10;
const TITLES = [
  'У нас вы забудете обо всем на свете!',
  'Отдохнете - мама родная не узнает!',
  'Одиссей, тебе сюда от жены от детей!',
  'Приезжай, торопись! Отдыхай - не скупись!',
  'Отдохнете лучше, чем сын маминой подруги!',
  'Клюет лучше, чем на черных камнях!',
  'Приехал, заплатил, отдохнул!',
  'Сколько волка не корми, а он все равно у нас отдыхать любит!',
  'Семь раз отмерь, а отдохни у нас!',
  'Хоромы царские, перины мягкие!',
];

const TYPES = [ 'palace', 'flat', 'house', 'bungalow' ];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00' ];

const CHECKOUT_TIMES = ['12:00', '13:00', '14:00' ];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner' ];

const DESCRIPTION = [
  'Тепло, сухо, уютно',
  'Красиво, уютно, чисто',
  'Есть всё',
  'Светло, тепло, уютно',
  'Много пространства для отдыха',
  'Есть вся необходимая техника',
  'Скромно, но со вкусом',
  'Окна с видом на море',
  'Тихие соседи и их собаки',
  'Уютное, теплое помещение. Почти как у Гарри',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

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
console.log(bookingObjectsList);
