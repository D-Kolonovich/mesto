let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = popup.querySelector('.popup__button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = popup.querySelector('.form');
let inputName = formElement.querySelector('.form__info_type_name');
let inputjob = formElement.querySelector('.form__info_type_job');

// открытие popup
function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputjob.value = profileDescription.textContent;
}
//  закрытие popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                         

    // Вставьте новые значения с помощью textContent
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputjob.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);