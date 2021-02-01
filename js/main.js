const getRandomInteger = (beginNumber, endNumber) => Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;

getRandomInteger(1, 10);


const getRandomFloat = (beginNumber, endNumber, numbersAfterPoint) => (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);

getRandomFloat(1.1, 1.2, 4);

