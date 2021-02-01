let getRandomInteger = function (beginNumber, endNumber) {
  if ((typeof beginNumber !== 'number') || typeof endNumber !== 'number') {
    return 'Входные значения должны быть числами';
  }

  if (!Number.isInteger(beginNumber ) || !Number.isInteger(endNumber )) {
    return 'Числа должны быть целыми';
  }

  if (beginNumber > endNumber) {
    return 'Первый аргумент должен быть меньше или равен второму';
  }

  return  Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;
}

getRandomInteger(1, 10);

let getRandomFloat = function (beginNumber, endNumber, numbersAfterPoint) {
  if ((typeof beginNumber !== 'number') || typeof endNumber !== 'number' || typeof numbersAfterPoint !== 'number') {
    return 'Входные значения должны быть числами';
  }

  if (!Number.isInteger(numbersAfterPoint) || numbersAfterPoint < 0) {
    return 'Количество знаков после запятой должно быть целым положительным числом';
  }

  if (beginNumber > endNumber) {
    return 'Первый аргумент должен быть меньше или равен второму';
  }

  return  (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);
}

getRandomFloat(1.1, 1.1, 3);
