const editLink=document.querySelector('.profile__edit-button');
const profileEditPopup=document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton=profileEditPopup.querySelector('.popup__close');
const popupUserName=profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus=profileEditPopup.querySelector('.popup__input_type_user-status');
const popupSaveButton=profileEditPopup.querySelector('.popup__button_type_submit');
const profileEditPopupForm=profileEditPopup.querySelector('.popup__form');
const userName=document.querySelector('.profile__name');
const userStatus=document.querySelector('.profile__status');

const openPopup = (popup) => {
  popup.classList.add('popup_open');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
};

function profileFormSubmit(event){
  event.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  closePopup (profileEditPopup);
};

editLink.addEventListener('click', () => {
  openPopup(profileEditPopup);
});

profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

profileEditPopupForm.addEventListener('submit', profileFormSubmit);

const photoCardTemplate = document.getElementById('photo-card-template')
const photoGrid = document.querySelector('.elements__list')

const createPhotoCard = (photoData) => {
  const photoElement = photoCardTemplate.content.querySelector('.photo-card').cloneNode(true);
  const photoName = photoElement.querySelector('.photo-card__text');
  const photoImage= photoElement.querySelector('.photo-card__image');
  const likeButton = photoElement.querySelector('.photo-card__like');
  const deleteButton = photoElement.querySelector('.photo-card__delete');

  const handleDelete = () => {
    photoElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle('photo-card__like_active')
  };

  deleteButton.addEventListener('click', (handleDelete));

  likeButton.addEventListener('click', (handleLike));

  photoName.textContent = photoData.name;
  photoImage.src = photoData.link;
  photoImage.alt = photoData.name;

  return photoElement;
}

const renderPhotoElement = (photoElement) => {
  photoGrid.prepend(photoElement);
}

initialCards.forEach((initialCards) => {
  renderPhotoElement(createPhotoCard(initialCards));
});
