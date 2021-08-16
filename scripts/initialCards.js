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

    const popupEdit = document.querySelector('.popup_type_edit-profile');
    const formEditProfile = popupEdit.querySelector('.form');

    const popupEditConfig = {
  popupEdit : popupEdit,
  editButton : document.querySelector('.profile__button_type_edit'),
  editProfileCloseBtn : popupEdit.querySelector('.popup__button'),
  profileName : document.querySelector('.profile__name'),
  profileDescription : document.querySelector('.profile__description'),
  editProfileForm : document.querySelector('.form-edit'),
  inputName : formEditProfile.querySelector('.form__info_type_name'),
  inputjob : formEditProfile.querySelector('.form__info_type_job')
};

const popupAdd = document.querySelector('.popup_type_add-card');
const formAdd = document.querySelector('.form-add');

const popupAddConfig = {
  popupAdd : popupAdd,  // попап добавить 
  openAddPopupButton : document.querySelector('.profile__button_type_add'), // кнопка открытия popupAdd
  closeAddPopupButton : popupAdd.querySelector('.popup__button'), // кнопка закрытия popupAdd
  formAdd : formAdd, // форма
  inputFormTitle : formAdd.querySelector('.form__info_type_title'),
  inputFormLink : formAdd.querySelector('.form__info_type_link')
};

const popupPicture = document.querySelector('.popup_type_picture');
const popupContainer = popupPicture.querySelector('.popup__container');

const popupImageConfig = {
  // эелементы(карточка с изображением и текстом)
  containerElements : document.querySelector('.elements'),
  elementTemplate : document.querySelector('.template-element').content.querySelector('.element'),
//
popupPicture : popupPicture,
// изображение на весь экран(popup)
popupImage : document.querySelector('.popup__image'), //изображение
popupDescription : document.querySelector('.popup__description'),//описание к изображению
//
popupContainer : popupContainer,
popupPictureTypeClose : popupContainer.querySelector('.popup__button_type_close')
};

export { initialCards, validatorConfig, popupEditConfig, popupAddConfig, popupImageConfig, formEditProfile, popupEdit, popupAdd, formAdd, popupPicture, popupContainer};