import './index.css';
import { validatorConfig, popupEditConfig, popupAddConfig, popupImageConfig, formEditProfile, popupEditSelector, popupAddSelector, popupPictureSelector, popupEditElement, popupAddElement, formAdd, popupPictureElement, PopupAvatarEditConfig, deleteConfirmConfig, loaderConfig} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';


let userId = {};

const userInfo = new UserInfo({ 
  name: popupEditConfig.profileName, 
  job: popupEditConfig.profileDescription, 
  avatar: PopupAvatarEditConfig.profileAvatar});

/* -получение данных с сервера- */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: 'ecbecbbb-b4a0-4b1b-af51-a815ff361299',
    'Content-Type': 'application/json'
  }
});

// cardList.renderItems();

Promise.all([api.getUserInfo(), api.getInitialCards()
])
  .then(([userData, cards]) => {
    userId = userData._id;
    cards.reverse()
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.error(err))
  // .finally(() => renderLoading(false));

  const cardList = new Section({
    renderer: (item) => {
      cardList.addItem(createCard(item));
    }
  }, '.elements'
  );

//создание одного экземпляра FormValidator
const editProfileFormValidator = new FormValidator(validatorConfig, formEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validatorConfig, formAdd);
addCardFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validatorConfig, PopupAvatarEditConfig.avatarEditForm);
avatarEditFormValidator.enableValidation();

const popupPicture = new PopupWithImage(popupPictureSelector);

// попап с формой редактирования данных пользователя
const popupEdit = new PopupWithForm(popupEditSelector, {
  handlerFormSubmit: (data) => {
    popupEdit.renderLoading(true, ('Сохранение...'));
    api.setUserInfo(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEdit.renderLoading(false, 'Сохранить'));
  }
});

// попап с формой редактирования аватара
const PopupAvatarEdit = new PopupWithForm(PopupAvatarEditConfig.PopupAvatarEdit, {
  handlerFormSubmit: (data) => {
    PopupAvatarEdit.renderLoading(true, ('Сохранение...'));
    api.setAvatar(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        PopupAvatarEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => PopupAvatarEdit.renderLoading(false, 'Сохранить'));
  }
});

// попап с формой добавления новой карточки
const popupAdd = new PopupWithForm(popupAddConfig.popupAdd, {
  handlerFormSubmit: (data) => {
    popupAdd.renderLoading(true, ('Создание...'));
    api.addCard(data)
      .then((result) => {
        cardList.renderItems([result]);
        popupAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAdd.renderLoading(false, 'создать'));
  }
});

// попап с запросом на удаление карточки
const PopupConfirmDelete = new PopupWithConfirmation(deleteConfirmConfig.PopupConfirmDelete, deleteConfirmConfig.deleteConfirmBtn, {
  handleDeleteCard: (card) => {
    api.deleteCard(card.getCardId())
        .then(() => {
          card.handleDeleteCard();
          PopupConfirmDelete.close()
        })
        .catch((err) => console.log(err));
  }
});

function createCard(item) {
  const card = new Card(item, '.template-element', userId, {
    handleCardClick: () => {
      popupPicture.open({
        name: item.name,
        link: item.link
      });
    },
    handleDeleteCard: () => {
      PopupConfirmDelete.open(card);
    },
    handleLikeCard: () => {
      const actualUserLikedCard =  card.checkLikeStatus();

      const demandedApi = actualUserLikedCard
        ? api.removeLikeCard(card.getCardId())
        : api.setLikeCard(card.getCardId());

        demandedApi.then((item) => {
        card.setLikes(item.likes);
        card.handleLikeCard();
      })
      .catch((err) => console.log(err));
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function openEditProfilePopup(userData) {
  editProfileFormValidator.removeInputErrors();
  popupEditConfig.inputName.value = userData.name;
  popupEditConfig.inputjob.value = userData.job;
};

function openAvatarEditPopup() {
  avatarEditFormValidator.toggleButtonState();
  avatarEditFormValidator.removeInputErrors();
  PopupAvatarEdit.open();
}

function openAddPopup() {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.removeInputErrors();
  popupAdd.open();
}

// открытие editProfilePopup
popupEditConfig.editButton.addEventListener('click', () => { openEditProfilePopup(userInfo.getUserInfo()); popupEdit.open()}
);

// открытие addCardPopup
popupAddConfig.openAddPopupButton.addEventListener('click', openAddPopup);

PopupAvatarEditConfig.PopupOpenAvatarEditBtn.addEventListener('click', () => openAvatarEditPopup());