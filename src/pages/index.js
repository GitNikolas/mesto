import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';
import {
  photoGrid,
  config,
  profileEditLink,
  addPhotoCardtLink,
  userName,
  userStatus,
  userNameInput,
  userStatusInput,
  profileAvatar,
} from '../utils/constants.js';

//валидация
const profileEditValidator = new FormValidator(config, '#popupFormEditProfile');
profileEditValidator.enableValidation();

const addPhotoValidator = new FormValidator(config, '#popupFormAddPhoto');
addPhotoValidator.enableValidation();

const changeAvatarValidator = new FormValidator(config, '#popupFormChangeAvatar');
changeAvatarValidator.enableValidation();

//отрисовка карточек
function renderCard(cardData) {
  const createCard = new Card({
    photoData:cardData,
    handleCardClick: (cardData) => {popupWithImage.openPopup(cardData)},
    handleLikeClick: (likeElement, cardId) => {
      if(likeElement.classList.contains('photo-card__like_active')){
        api.deleteLike(cardId)
        .then( res => createCard.handleLike(res.likes.length) )
      } else {
        api.handleLike(cardId)
        .then( res => createCard.handleLike(res.likes.length) )
      }
    },
    handleDeleteClick: ({ card, cardId }) => {
      popupDeleteCard.openPopup({ card,cardId });
    }
  }, '#photo-card-template');

  return createCard.generateCard();
}

const section = new Section ({ renderer: renderCard }, photoGrid);

//класс попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_type_view-photo');
popupWithImage.setEventListeners();

//класс попапа удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_type_confirmation' , ({ card, cardId }) => {

  api.deleteCard(cardId)
  .then( () => {
    card.handleDelete();
  })
  .finally(() => popupDeleteCard.setDefaultText())

})
popupDeleteCard.setEventListeners();

//классы форм
const popupAddPhoto = new PopupWithForm('.popup_type_add-photo', (data) => {

    Promise.all([api.getUserInformation(data), api.setInitialCard(data)])
    .then( ([dataUser, dataCard]) => {
    dataCard.myId = dataUser._id;
    section.addItemPrepend(renderCard(dataCard));
    })
    .finally( () => popupAddPhoto.setDefaultText())

  popupAddPhoto.closePopup();
});

popupAddPhoto.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit',  (data) => {
  api.setUserInformation(data)
  .then( res => userInfo.setUserInfo({userName: res.name, userStatus: res.about, avatar: res.avatar}))
  .finally( () => popupProfileEdit.setDefaultText())

  popupProfileEdit.closePopup();
});
popupProfileEdit.setEventListeners();

const popupAvatarChange = new PopupWithForm('.popup_type_avatar-update', (data) => {

  api.setUserAvatar(data)
  .then(res => userInfo.setUserInfo({userName: res.name, userStatus: res.about, avatar: res.avatar}))
  .finally( () => popupAvatarChange.setDefaultText())

  popupAvatarChange.closePopup();
});
popupAvatarChange.setEventListeners();

//информация о пользователе
const userInfo = new UserInfo({userName:userName , userStatus: userStatus, avatar: profileAvatar });

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

profileAvatar.addEventListener('click', () => {
  popupAvatarChange.openPopup();
  changeAvatarValidator.toggleButtonState();
  changeAvatarValidator.hideInputsError();
});

// Работа с Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '0df34ace-d52b-4f1d-b3b4-2e595c2517c9',
    'Content-Type': 'application/json'
  },
});

Promise.all([ api.getInitialCards(), api.getUserInformation()])
  .then(([dataCards, dataUser]) => {

    dataCards.forEach(item => item.myId = dataUser._id)
    userInfo.setUserInfo({ userName:dataUser.name, userStatus:dataUser.about, avatar:dataUser.avatar })
    dataCards.forEach((item) => {
      renderCard(item)
      section.addItemAppend(renderCard(item))
    })
  })
