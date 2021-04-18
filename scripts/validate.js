const reviewFrame = {
formSelector: '.form',
  inputSelector: '.form__info',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__info_type_error',
  errorClass: 'form__input-error_active'
}

// функция показывает ошибку(текст ошибки) ввода (добавляет класс с ошибкой)
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(reviewFrame.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(reviewFrame.errorClass);
};

// функция(текст ошибки ввода) удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(reviewFrame.inputErrorClass);
    errorElement.classList.remove(reviewFrame.errorClass);
    errorElement.textContent = '';
  };

// функция проверки валидности ввода поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

// установление слушателей событий всем полям формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(reviewFrame.inputSelector));
    const buttonElement = formElement.querySelector(reviewFrame.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //функция проверка на недопустимый ввод
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
//функция переключение состояние кнопки
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      // сделай кнопку неактивной
      buttonElement.classList.add(reviewFrame.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      // иначе сделай кнопку активной
      buttonElement.classList.remove(reviewFrame.inactiveButtonClass);
    }
  };

// Функция запуска проверки
const enableValidation = (frameObj) => {
    const formList = Array.from(document.querySelectorAll(frameObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement);
      
    });
    
  };
  enableValidation(reviewFrame);