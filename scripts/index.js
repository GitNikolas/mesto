import { initialCards } from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMessageClass:'popup__error-message',
}

// карточки

const photoGrid = document.querySelector('.elements__list');

const addPhotoCard = (photoData, templateSelector) => {
  const card = new Card (photoData, templateSelector);
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement);
}

initialCards.forEach((item) => {
  addPhotoCard(item, '#photo-card-template');
});

// Валидация

const profileEditValidator = new FormValidator(config, '#popupFormEditProfile');
profileEditValidator.enableValidation();

const addPhotoValidator = new FormValidator(config, '#popupFormAddPhoto');
addPhotoValidator.enableValidation();

const editLink = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const popupUserName = profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus = profileEditPopup.querySelector('.popup__input_type_user-status');
const profileEditPopupForm = profileEditPopup.querySelector('.popup__form');
const userName = document.querySelector('.profile__name');
const userStatus = document.querySelector('.profile__status');

const openPopup = (popup) => {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupKeydown);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupKeydown);
};

function submitProfileForm(event){
  event.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  closePopup(profileEditPopup);
};

editLink.addEventListener('click', () => {
  openPopup(profileEditPopup);
  popupUserName.value = userName.textContent ;
  popupUserStatus.value = userStatus.textContent;
  profileEditValidator.toggleButtonState();
  profileEditValidator.hideInputsError();
});

profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

profileEditPopupForm.addEventListener('submit', submitProfileForm);

const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addButton = document.querySelector('.profile__add-button');
const closeaddPhotoPopupButton = addPhotoPopup.querySelector('.popup__close');
const addPhotoPopupForm = addPhotoPopup.querySelector('.popup__form');
const placeNameInput = addPhotoPopupForm.querySelector('.popup__input_type_place-name');
const placeUrlInput = addPhotoPopupForm.querySelector('.popup__input_type_picture-url');

const submitPhotoPopup = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeUrlInput.value;
  const photoData = {
    name,
    link,
  };

  addPhotoCard(photoData, '#photo-card-template');

  addPhotoPopupForm.reset();

  closePopup(addPhotoPopup);
};

addButton.addEventListener('click', () => {
  openPopup(addPhotoPopup);
  addPhotoValidator.toggleButtonState();
})

closeaddPhotoPopupButton.addEventListener('click', ()=>{
  closePopup(addPhotoPopup);
})

addPhotoPopupForm.addEventListener('submit', submitPhotoPopup);

// Реализация закрытия на overlay и escape

const popups = document.querySelectorAll('.popup');

const closeByOverlay = () => {
  popups.forEach((popup) => {
    const popupOverlay = popup.querySelector('.popup__overlay');

    popupOverlay.addEventListener('click', (event) =>{
      if(event.currentTarget === event.target){
        closePopup(popup);
      }
    });
  });
}

closeByOverlay();

const closePopupKeydown = (event) => {
  const popupOpened = document.querySelector('.popup_open');
    if(event.code === 'Escape') {
      closePopup(popupOpened);
    };
};

