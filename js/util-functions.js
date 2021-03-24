const ALERT_SHOW_TIME = 10000;

export const getRandomInteger = (beginNumber, endNumber) => Math.round(Math.random() * (endNumber - beginNumber)) + beginNumber;

export const getRandomFloat = (beginNumber, endNumber, numbersAfterPoint) => (Math.random() * (endNumber - beginNumber) + beginNumber).toFixed(numbersAfterPoint);

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
