// popupEdit
const popupEdit = document.querySelector('.popup_type_edit-profile');
const editButton = document.querySelector('.profile__button_type_edit');
const editProfileCloseBtn = popupEdit.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = popupEdit.querySelector('.form');
const inputName = formEditProfile.querySelector('.form__info_type_name');
const inputjob = formEditProfile.querySelector('.form__info_type_job');

//popupAdd

const popupAdd = document.querySelector('.popup_type_add-card');  // попап добавить 
const openAddPopupButton = document.querySelector('.profile__button_type_add'); // кнопка открытия popupAdd
const closeAddPopupButton = popupAdd.querySelector('.popup__button'); // кнопка закрытия popupAdd
const formAdd = document.querySelector('.form-add'); // форма
const inputFormTitle = formAdd.querySelector('.form__info_type_title');
const inputFormLink = formAdd.querySelector('.form__info_type_link');

// эелементы(карточка с изображением и текстом)
const containerElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template-element').content.querySelector('.element');
//
const popupPicture = document.querySelector('.popup_type_picture');
// изображение на весь экран(popup)
const popupImage = document.querySelector('.popup__image'); //изображение
const popupDescription = document.querySelector('.popup__description');//описание к изображению
//
const popupContainer = popupPicture.querySelector('.popup__container');
const popupPictureTypeClose = popupContainer.querySelector('.popup__button_type_close');
 
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
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                         
    // Вставьте новые значения с помощью textContent
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputjob.value;
    closePopup(popupEdit);
}

    

//функция создания одного элемента
function createElement(item) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementButtonLike = element.querySelector('.element__like');
  const buttonDelete = element.querySelector('.element__button_type_delete');

  // заполнение элементов массива
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;
    
  // обработчики карточки
  elementImage.addEventListener('click', () => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupDescription.textContent = item.name;

    openPopup(popupPicture);
  });
  elementButtonLike.addEventListener('click', () => elementButtonLike.classList.toggle('element__button_type_active'));                          //в скобках то что надо удалить при кнопке
  buttonDelete.addEventListener('click', (item) => element.remove(item));
    
  return element;
}

//дабовляет карточки
function renderCard(item) {
    containerElements.prepend(createElement(item));//функция создания одного элемента
  }

// массив    каждый елемент
initialCards.forEach(item => {
  renderCard(item);
});

// Обработчик «отправки» формы Add, хотя пока
// она никуда отправляться не будет
function formAddCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const inputList = Array.from(formAdd.querySelectorAll(reviewFrame.inputSelector));
  const buttonElement = formAdd.querySelector(reviewFrame.submitButtonSelector);                     
  // 
  renderCard({   
    name: inputFormTitle.value,
    link: inputFormLink.value
  });
  formAdd.reset();
  toggleButtonState(inputList,buttonElement);
  closePopup(popupAdd);//закрытие popupAdd
}

//функция удаления ошибок при вводе
function removeErrorsInput(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__info'));

  inputList.forEach(inputList => {
    if (!inputList.validity.valid) {
      hideInputError(formElement, inputList); //скрывать ошибку ввода
    }
  });
}

//слушатель
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  removeErrorsInput(formEditProfile);
  inputName.value = profileName.textContent;
  inputjob.value = profileDescription.textContent;
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

editProfileCloseBtn.addEventListener('click', () => closePopup(popupEdit));

//слушатель открыть popupAdd
openAddPopupButton.addEventListener('click', () => {
  openPopup(popupAdd);
  removeErrorsInput(formAdd);
});
//слушатель закрыть popupAdd добавление карточки
closeAddPopupButton.addEventListener('click', () => {
  formAdd.reset();
  closePopup(popupAdd);
});
//
formAdd.addEventListener('submit', formAddCardSubmitHandler);


//слушатель popupPicture, закрытие
popupPictureTypeClose.addEventListener('click', () => closePopup(popupPicture));