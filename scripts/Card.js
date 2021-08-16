export default class Card {
    constructor(data, handleCardClick, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }
    

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._elementImage = this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__title');

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle.textContent = this._name;
    
        return this._element;
      }

      _setEventListeners() {
          this._buttonDelete = this._element.querySelector('.element__button_type_delete');
          this._elementButtonLike = this._element.querySelector('.element__like');
          this._elementImage = this._element.querySelector('.element__image');

          this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
          this._elementButtonLike.addEventListener('click', () => this._handleLikeCard());
          this._elementImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
      }
      _handleDeleteCard() {
        this._element.remove()
      }

      _handleLikeCard() {
        this._elementButtonLike.classList.toggle('element__button_type_active');
      }

    }