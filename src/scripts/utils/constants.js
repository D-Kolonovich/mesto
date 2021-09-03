const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const validatorConfig = {
    formSelector: '.form',
      inputSelector: '.form__info',
      submitButtonSelector: '.form__button-submit',
      inactiveButtonClass: 'form__button_disabled',
      inputErrorClass: 'form__info_type_error',
      errorClass: 'form__input-error_active'
    };

    const popupEditElement = document.querySelector('.popup_type_edit-profile');
    const popupEditSelector = '.popup_type_edit-profile';
    const popupAddSelector = '.popup_type_add-card';
    const popupPictureSelector = '.popup_type_picture';

    const formEditProfile = popupEditElement.querySelector('.form');

    const popupEditConfig = {
  popupEdit : popupEditElement,
  editButton : document.querySelector('.profile__button_type_edit'),
  editProfileCloseBtn : popupEditElement.querySelector('.popup__button'),
  profileName : document.querySelector('.profile__name'),
  profileDescription : document.querySelector('.profile__description'),
  editProfileForm : document.querySelector('.form-edit'),
  inputName : formEditProfile.querySelector('.form__info_type_name'),
  inputjob : formEditProfile.querySelector('.form__info_type_job')
};

const popupAddElement = document.querySelector('.popup_type_add-card');
const formAdd = document.querySelector('.form-add');

const popupAddConfig = {
  popupAdd : popupAddElement,  // попап добавить 
  openAddPopupButton : document.querySelector('.profile__button_type_add'), // кнопка открытия popupAdd
  closeAddPopupButton : popupAddElement.querySelector('.popup__button'), // кнопка закрытия popupAdd
  formAdd : formAdd, // форма
  inputFormTitle : formAdd.querySelector('.form__info_type_title'),
  inputFormLink : formAdd.querySelector('.form__info_type_link')
};

const popupPictureElement = document.querySelector('.popup_type_picture');
const popupContainer = popupPictureElement.querySelector('.popup__container');

const popupImageConfig = {
  // эелементы(карточка с изображением и текстом)
  containerElements : document.querySelector('.elements'),
  elementTemplate : document.querySelector('.template-element').content.querySelector('.element'),
//
popupPicture : popupPictureElement,
// изображение на весь экран(popup)
popupImage : document.querySelector('.popup__image'), //изображение
popupDescription : document.querySelector('.popup__description'),//описание к изображению
//
popupContainer : popupContainer,
popupPictureTypeClose : popupContainer.querySelector('.popup__button_type_close')
};

export { initialCards, validatorConfig, popupEditConfig, popupAddConfig, popupImageConfig, formEditProfile, popupEditElement, popupEditSelector, popupAddSelector, popupPictureSelector, popupAddElement, formAdd, popupPictureElement, popupContainer};