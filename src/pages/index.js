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

const renderList = new Section ({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
    // const card = renderCard(item);
    // renderList.addItem(card);
  }}, '.elements'
);

renderList.renderItems();

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
    renderCard(data);
    // renderList.addItem(card);
    // popupAdd.close();
  }
});

const popupPicture = new PopupWithImage(popupPictureSelector);

// создание экземпляра класса Card 
function renderCard(item) {
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
  renderList.addItem(cardElement);
}

// открытие editProfilePopup
popupEditConfig.editButton.addEventListener('click', () => popupEdit.open());

// открытие addCardPopup
popupAddConfig.openAddPopupButton.addEventListener('click', () => popupAdd.open());