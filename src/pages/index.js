import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

import {
  photoGrid,
  config,
  profileEditLink,
  addPhotoCardtLink,
  userName,
  userStatus,
  initialCards,
  userNameInput,
  userStatusInput,
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
const popupAddPhoto = new PopupWithForm('.popup_type_add-photo', (data) => {
  renderCard(data);
  popupAddPhoto.closePopup();
});
popupAddPhoto.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit',  (data) => {
  userInfo.setUserInfo(data);
  popupProfileEdit.closePopup();
});
popupProfileEdit.setEventListeners();

//информация о пользователе
const userInfo = new UserInfo({userName:userName , userStatus: userStatus});

//установка слушателей для кнопок
profileEditLink.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  userNameInput.value = currentUserInfo.userName;
  userStatusInput.value = currentUserInfo.userStatus;
  profileEditValidator.toggleButtonState();
  profileEditValidator.hideInputsError();
  popupProfileEdit.openPopup();
});

addPhotoCardtLink.addEventListener('click', () => {
  popupAddPhoto.openPopup();
  addPhotoValidator.toggleButtonState();
  addPhotoValidator.hideInputsError();
});


