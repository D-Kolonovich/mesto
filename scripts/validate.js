const reviewFrame = {
formSelector: '.form',
  inputSelector: '.form__info',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__info_type_error',
  errorClass: 'form__input-error_active'
}

// функция показывает ошибку(текст ошибки) ввода (добавляет класс с ошибкой)
const showInputError = (formElement, inputElement, errorMessage, frameObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(frameObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(frameObj.errorClass);
};

// функция(текст ошибки ввода) удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, frameObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(frameObj.inputErrorClass);
    errorElement.classList.remove(frameObj.errorClass);
    errorElement.textContent = '';
  };

// функция проверки валидности ввода поля
const checkInputValidity = (formElement, inputElement, frameObj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, frameObj);
    } else {
      hideInputError(formElement, inputElement, frameObj);
    }
  };

// установление слушателей событий всем полям формы
const setEventListeners = (formElement, frameObj) => {
    const inputList = Array.from(formElement.querySelectorAll(frameObj.inputSelector));
    const buttonElement = formElement.querySelector(frameObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, frameObj);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, frameObj);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, frameObj);
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
const toggleButtonState = (inputList, buttonElement, frameObj) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {                             ////////////////////
      buttonElement.setAttribute('disabled', true);
      // сделай кнопку неактивной
      buttonElement.classList.add(frameObj.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      // иначе сделай кнопку активной
      buttonElement.classList.remove(frameObj.inactiveButtonClass);
    }
  };

// Функция запуска проверки
const enableValidation = (frameObj) => {
    const formList = Array.from(document.querySelectorAll(frameObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement, frameObj);
      
    });
    
  };
  enableValidation(reviewFrame);