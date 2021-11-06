export default class Card {
    constructor(data, cardSelector, userId, { handleCardClick, handleDeleteCard, handleLikeCard }) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this._likes = data.likes;
        this._handleCardLike = handleLikeCard;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
    }
    //получить шаблон
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }
    
    //создать карту
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._showUserLikes();
        this._removeDeleteButton();
        
        this._likeCounter = this._element.querySelector('.element__like-number')
        this._elementImage = this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__title');

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle.textContent = this._name;
        this._likeCounter.textContent = this._likes.length;
    
        return this._element;
      }
      //установить слушателей событий
      _setEventListeners() {
          this._buttonDelete = this._element.querySelector('.element__button_type_delete');
          this._elementButtonLike = this._element.querySelector('.element__like');
          this._elementImage = this._element.querySelector('.element__image');

          this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
          this._elementButtonLike.addEventListener('click', () => this._handleCardLike());
          this._elementImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
      }

      //обрабатывать удаление карты (был приватным)
      handleDeleteCard() {
        this._element.remove();
        // this._element = null;

      }
      //обработать лайки карточки , был _
      handleLikeCard() {
        this._elementButtonLike.classList.toggle('element__button_type_active');
        this._likeCounter.textContent = this._likes.length;
      }
      //получить идентификатор карты
      getCardId() {
        return this._cardId;
      }

      setLikes(data) {
        this._likes = data;
      }
      //проверить статус лайка
      checkLikeStatus() {
        const activeLike = this._elementButtonLike.classList.contains('element__button_type_active');
        return activeLike;
      }
      //показать лайки пользователей
      _showUserLikes() {
        const newLikes = this._likes.some(like => like._id === this._userId);
    
        if (newLikes) {
          this._elementButtonLike.classList.add('element__button_type_active');
        }
      }
      //удалить кнопку удаления
      _removeDeleteButton() {
        if (this._ownerId !== this._userId) {
          this._buttonDelete.remove();
        }
      }
    }