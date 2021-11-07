import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, buttonConfirm, { handleDeleteCard }) {
    super(popupSelector);
    this._buttonConfirm = buttonConfirm;
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleDeleteCard(this._card);
  }

  open(card) {
    this._card = card;
    super.open();
  }
}