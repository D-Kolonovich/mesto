import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({link, name}) {
    const popupImage = this._popup.querySelector('.popup__image');
    const popupDescription = this._popup.querySelector('.popup__description');

    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;

    super.open();  
    }
}