import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, {handlerFormSubmit}) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector('.form');
    // console.log(this._submitbutton)
  }

  _getInputValues() {
    const inputValues = {};
    const inputSelector = [...this._form.querySelectorAll('.form__info')];
    inputSelector.forEach(input => {
        inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handlerFormSubmit(this._getInputValues());
    // this.close();
  }


  close() {
    super.close();
    this._form.reset();
    // this._submitbutton.setAttribute('disabled', true);
    // this._submitbutton.classList.add('form__button_disabled');
  }

  
}