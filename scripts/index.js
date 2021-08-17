import { initialCards, validatorConfig, popupEditConfig, popupAddConfig, popupImageConfig, formEditProfile, popupEdit, popupAdd, formAdd, popupPicture} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//создание одного экземпляра FormValidator
const editProfileFormValidator = new FormValidator(validatorConfig, formEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validatorConfig, formAdd);
addCardFormValidator.enableValidation();

function openEditProfilePopup() {
  editProfileFormValidator.removeInputErrors();
  popupEditConfig.inputName.value = popupEditConfig.profileName.textContent;
  popupEditConfig.inputjob.value = popupEditConfig.profileDescription.textContent;

  openPopup(popupEdit);
};

function openAddCardPopup() {
  formAdd.reset();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.removeInputErrors();

  openPopup(popupAdd);
};

// открытие popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    
    document.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
}
//  закрытие popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);

}
//закрыие popup на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}
//закрытие popup на overlay
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// внесение изменений в профиль с последующим закрыием popupEdit
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                         
    // Вставьте новые значения с помощью textContent
    popupEditConfig.profileName.textContent = popupEditConfig.inputName.value;
    popupEditConfig.profileDescription.textContent = popupEditConfig.inputjob.value;
    closePopup(popupEdit);
}

function openPopupImage(link, name) {
  openPopup(popupPicture);
  popupImageConfig.popupImage.src = link;
  popupImageConfig.popupImage.alt = name;
  popupImageConfig.popupDescription.textContent = name;

}
// создание экземпляра класса Card    
function renderCard(item) {
  const card = new Card(item, openPopupImage, '.template-element');
  const cardElement = card.generateCard();

  document.querySelector('.elements').prepend(cardElement);
}

// вызывает   каждый елемент из массива
initialCards.forEach(item => {
  renderCard(item);
});

// Обработчик «отправки» формы Add, хотя пока
// она никуда отправляться не будет
function formAddCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  renderCard({   
    name: popupAddConfig.inputFormTitle.value,
    link: popupAddConfig.inputFormLink.value
  });
  formAdd.reset();
  closePopup(popupAdd);//закрытие popupAdd
}

//функция удаления ошибок при вводе
// function removeErrorsInput(formElement, frameObj) {
//   const inputList = Array.from(formElement.querySelectorAll('.form__info'));
//   formElement.reset();
//   inputList.forEach(inputList => {
//     if (!inputList.validity.valid) {
//       hideInputError(formElement, inputList, frameObj); //скрывать ошибку ввода
//     }
//   });
// }

//слушатель
popupEditConfig.editButton.addEventListener('click', () => {
  removeErrorsInput(popupEditConfig.formEditProfile, validatorConfig);
  popupEditConfig.inputName.value = popupEditConfig.profileName.textContent;
  popupEditConfig.inputjob.value = popupEditConfig.profileDescription.textContent;
  
});


// открытие / закрытие editProfilePopup
popupEditConfig.editButton.addEventListener('click', openEditProfilePopup);
popupEditConfig.editProfileCloseBtn.addEventListener('click', () => closePopup(popupEdit));
popupEditConfig.editProfileForm.addEventListener('submit', formEditProfileSubmitHandler);

// открытие / закрытие addCardPopup
popupAddConfig.openAddPopupButton.addEventListener('click', openAddCardPopup);
popupAddConfig.closeAddPopupButton.addEventListener('click', () => closePopup(popupAddConfig.popupAdd));
formAdd.addEventListener('submit', formAddCardSubmitHandler);

//закрытие ,слушатель popupPicture
popupImageConfig.popupPictureTypeClose.addEventListener('click', () => closePopup(popupPicture));