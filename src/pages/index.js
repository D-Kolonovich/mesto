import './index.css';
import { initialCards, validatorConfig, popupEditConfig, popupAddConfig, popupImageConfig, formEditProfile, popupEditSelector, popupAddSelector, popupPictureSelector, popupEditElement, popupAddElement, formAdd, popupPictureElement} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';

//создание одного экземпляра FormValidator
const editProfileFormValidator = new FormValidator(validatorConfig, formEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validatorConfig, formAdd);
addCardFormValidator.enableValidation();

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }}, '.elements'
);

cardList.renderItems();

const userInfo = new UserInfo({
  name: popupEditConfig.profileName,
  job: popupEditConfig.profileDescription
});

const popupEdit = new PopupWithForm({ popupSelector: popupEditSelector, handlerFormSubmit: (data) => {
  userInfo.setUserInfo(data);
  // popupEdit.close();
}
});

const popupAdd = new PopupWithForm ({ popupSelector: popupAddSelector, 
  handlerFormSubmit: (data) => {
    const card = createCard(data);
    cardList.addItem(card);
    // popupAdd.close();
  }
});

const popupPicture = new PopupWithImage(popupPictureSelector);

// создание экземпляра класса Card 
function createCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link
  }, {
    handleCardClick: () => {
      popupPicture.open({
        name: item.name,
        link: item.link
      });
    }
  }, '.template-element');
  const cardElement = card.generateCard();
  return cardElement;
}

function openAddPopup() {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.removeInputErrors();
  popupAdd.open();
}

function openEditProfilePopup(userData) {
  editProfileFormValidator.removeInputErrors();
  popupEditConfig.inputName.value = userData.name;
  popupEditConfig.inputjob.value = userData.job;
};

// открытие editProfilePopup
popupEditConfig.editButton.addEventListener('click', () => {
  openEditProfilePopup(userInfo.getUserInfo());
  popupEdit.open()});

// открытие addCardPopup
popupAddConfig.openAddPopupButton.addEventListener('click', openAddPopup);