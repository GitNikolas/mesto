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
  profileAvatar,
} from '../utils/constants.js';

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

    userInfo.setUserInfo({ userName:dataUser.name, userStatus:dataUser.about, avatar:dataUser.avatar, userId:dataUser._id});
    dataCards.forEach((item) => {
      section.addItemAppend(renderCard(item))
    })
  })
  .catch((err) => {
    console.error(err)
  })

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
    myId: userInfo.userId,
    handleCardClick: (cardData) => {popupWithImage.openPopup(cardData)},
    handleLikeClick: (likeElement, cardId) => {
      if(likeElement.classList.contains('photo-card__like_active')){
        api.deleteLike(cardId)
        .then( res => createCard.handleLike(res.likes.length) )
        .catch((err) => {
          console.error(err)
        })
      } else {
        api.handleLike(cardId)
        .then( res => createCard.handleLike(res.likes.length) )
        .catch((err) => {
          console.error(err)
        })
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
  .catch((err) => {
    console.error(err)
  })
  .finally(() => popupDeleteCard.setDefaultText())

})
popupDeleteCard.setEventListeners();

//классы форм
const popupAddPhoto = new PopupWithForm('.popup_type_add-photo', (data) => {

    api.setInitialCard(data)
    .then((dataCard) => {
    section.addItemPrepend(renderCard(dataCard));
    popupAddPhoto.closePopup();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => popupAddPhoto.setDefaultText())
});

popupAddPhoto.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_type_profile-edit',  (data) => {
  api.setUserInformation(data)
  .then( res => {
    userInfo.setUserInfo({userName: res.name, userStatus: res.about, avatar: res.avatar});
    popupProfileEdit.closePopup();
  })
  .catch((err) => {
    console.error(err)
  })
  .finally( () => popupProfileEdit.setDefaultText())

});
popupProfileEdit.setEventListeners();

const popupAvatarChange = new PopupWithForm('.popup_type_avatar-update', (data) => {

  api.setUserAvatar(data)
  .then(res => {
  userInfo.setUserInfo({userName: res.name, userStatus: res.about, avatar: res.avatar});
  popupAvatarChange.closePopup();
  })
  .catch((err) => {
    console.error(err)
  })
  .finally( () => popupAvatarChange.setDefaultText())

});
popupAvatarChange.setEventListeners();

//информация о пользователе
const userInfo = new UserInfo({userName:userName , userStatus: userStatus, avatar: profileAvatar});

//установка слушателей для кнопок
profileEditLink.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(currentUserInfo);
  profileEditValidator.toggleButtonState();
  profileEditValidator.hideInputsError();
  popupProfileEdit.openPopup();
});

addPhotoCardtLink.addEventListener('click', () => {
  addPhotoValidator.toggleButtonState();
  addPhotoValidator.hideInputsError();
  popupAddPhoto.openPopup();
});

profileAvatar.addEventListener('click', () => {
  changeAvatarValidator.toggleButtonState();
  changeAvatarValidator.hideInputsError();
  popupAvatarChange.openPopup();
});
