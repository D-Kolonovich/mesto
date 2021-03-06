export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this.closeButton = this._popup.querySelector('.popup__button');
    }
  
    // открытие popup
    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
        
}
//  закрытие popup
    close(popup) {
        this._popup.classList.remove('popup_opened');
        this._removeEventListener();

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

    _setEventListeners() {
      
      this.closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', this._closePopupOverlay);
      document.addEventListener('keydown', this._handleEscClose);
    }

    _removeEventListener() {
      this.closeButton.removeEventListener('click', () => this.close());
      this._popup.removeEventListener('click', this._closePopupOverlay);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }