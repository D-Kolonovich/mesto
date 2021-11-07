export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this.closeButton = this._popup.querySelector('.popup__button');
      this._submitbutton = this._popup.querySelector('.form__button-submit');
    }
  
    // открытие popup
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        
}
//  закрытие popup
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
}

    _handleEscClose = (evt) => { 
      if (evt.key === 'Escape') { 
        this.close(); 
      } 
    } 

    //закрытие popup на overlay
    _closePopupOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        this.close();
    }
  }

    setEventListeners() {
      
      this.closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', this._closePopupOverlay);
      
    }

    renderLoading(isLoading, buttoneText) {
      if (isLoading) {
        this._submitbutton.textContent = buttoneText
      } else {
        this._submitbutton.textContent = buttoneText
      }
    }

  }