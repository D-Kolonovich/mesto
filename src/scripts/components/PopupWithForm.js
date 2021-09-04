import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { popupSelector, handlerFormSubmit } ) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitbutton = this._form.querySelector('.form__button-submit');
  }

  _getInputValues() {
    const inputValues = {};
    const inputSelector = Array.from(this._form.querySelectorAll('.form__info'));
    inputSelector.forEach(input => {
        inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handlerFormSubmit(this._getInputValues());
    this.close();
  }


  close() {
    super.close();
    this._form.reset();
    this._submitbutton.setAttribute('disabled', true);
    this._submitbutton.classList.add('form__button_disabled');
  }
}