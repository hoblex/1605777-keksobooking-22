const ALERT_SHOW_TIME = 10000;

export const showAlert = function () {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Сбой загрузки данных с сервера';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

//функция добавления/удаления элементам коллекции атрибута disabled
export const changeDisabledState = function (elementsList) {
  for (let element of elementsList) {
    element.disabled = !element.disabled ;
  }
}

//функции добавления/удаления селектора у элемента
export const addDeleteOneElementClass = function (element, selector) {
  element.classList.toggle(selector) ;
}
