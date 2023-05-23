import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  photoGrid,
  config,
  profileEditLink,
  addPhotoCardtLink,
  userName,
  userStatus,
  initialCards,
} from '../utils/constants.js';

//валидация
const profileEditValidator = new FormValidator(config, '#popupFormEditProfile');
profileEditValidator.enableValidation();

const addPhotoValidator = new FormValidator(config, '#popupFormAddPhoto');
addPhotoValidator.enableValidation();

//отрисовка карточек
const renderCard = (cardData) => {
  const createCard = new Card({ photoData:cardData, handleCardClick: (cardData) => {popupWithImage.openPopup(cardData)} }, '#photo-card-template');
  const cardElement = createCard.generateCard();
  section.addItem(cardElement);
}

const section = new Section ({ items:initialCards, renderer: renderCard}, photoGrid);
section.renderItems();

//класс попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_type_view-photo');
popupWithImage.setEventListeners();

//классы форм
const popupAddPhoto = new PopupWithForm('.popup_type_add-photo', renderCard);
popupAddPhoto.setEventListeners();
popupAddPhoto.addPhotoCardFormSubmit();

const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit',  () => {
  userInfo.setUserInfo();
  popupProfileEdit.closePopup();
});
popupProfileEdit.setEventListeners();
popupProfileEdit.profileEditFormSubmit();

//информация о пользователе
const userInfo = new UserInfo({userName:userName , userStatus: userStatus});

//установка слушателей для кнопок
profileEditLink.addEventListener('click', () => {
  popupProfileEdit.openPopup();
  userInfo.getUserInfo();
  profileEditValidator.toggleButtonState();
  profileEditValidator.hideInputsError();
});

addPhotoCardtLink.addEventListener('click', () => {popupAddPhoto.openPopup()});


