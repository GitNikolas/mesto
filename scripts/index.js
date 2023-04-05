const editLink=document.querySelector('.profile__edit-button');
const profileEditPopup=document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton=profileEditPopup.querySelector('.popup__close');
const popupUserName=profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus=profileEditPopup.querySelector('.popup__input_type_user-status');
const popupSaveButton=profileEditPopup.querySelector('.popup__submit-button');
const profileEditPopupForm=profileEditPopup.querySelector('.popup__form');
const userName=document.querySelector('.profile__name');
const userStatus=document.querySelector('.profile__status');
const placeName = document.querySelector('.popup__input_type_place-name');
const link = document.querySelector('.popup__input_type_picture-url')

const openPopup = (popup) => {
  popup.classList.add('popup_open');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
};

const disabledButton = () => {
  if (placeNameInput.value.length === 0 || placeUrlInput.value.length === 0){
    submitPhotoPopupButton.setAttribute('disabled', true);
  } else {
    submitPhotoPopupButton.removeAttribute('disabled');
  }
};

function profileFormSubmit(event){
  event.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  closePopup (profileEditPopup);
};

editLink.addEventListener('click', () => {
  openPopup(profileEditPopup);
  popupUserName.value = userName.textContent ;
  popupUserStatus.value = userStatus.textContent
});

profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

profileEditPopupForm.addEventListener('submit', profileFormSubmit);

// реализация создания новой карточки

const photoCardTemplate = document.getElementById('photo-card-template');
const photoGrid = document.querySelector('.elements__list');

const createPhotoCard = (photoData) => {
  const photoElement = photoCardTemplate.content.querySelector('.photo-card').cloneNode(true);
  const photoViewPopup = document.querySelector('.popup_type_view-photo');
  const photoName = photoElement.querySelector('.photo-card__text');
  const photoImage= photoElement.querySelector('.photo-card__image');
  const likeButton = photoElement.querySelector('.photo-card__like');
  const deleteButton = photoElement.querySelector('.photo-card__delete');
  const photoViewPopupCloseButton = photoViewPopup.querySelector('.popup__close');

  const handleDelete = () => {
    photoElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle('photo-card__like_active')
  };

  photoImage.addEventListener('click', () => {
    openPopup(photoViewPopup);
    const openedPhoto=photoViewPopup.querySelector('.photo__image')
    const subtitlePhoto = photoViewPopup.querySelector('.photo__caption');
    openedPhoto.src=photoImage.src;
    subtitlePhoto.innerHTML=photoImage.alt;
  });

  photoViewPopupCloseButton.addEventListener('click', () =>{
    closePopup(photoViewPopup);
  });

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

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

// реализация попапа добавления новой карточки

const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addButton = document.querySelector('.profile__add-button');
const closeButton = addPhotoPopup.querySelector('.popup__close');
const submitPhotoPopupButton = addPhotoPopup.querySelector('.popup__submit-button');
const addPhotoPopupForm = addPhotoPopup.querySelector('.popup__form');
const placeNameInput = addPhotoPopupForm.querySelector('.popup__input_type_place-name');
const placeUrlInput = addPhotoPopupForm.querySelector('.popup__input_type_picture-url');
const placeTitle = document.querySelector('.photo-card__text');
const placeImage = document.querySelector('.photo-card__image');

placeNameInput.addEventListener('input' , disabledButton);
placeUrlInput.addEventListener('input' , disabledButton);

submitPhotoPopup = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeUrlInput.value;
  const photoData = {
    name,
    link,
  };

  renderPhotoElement(createPhotoCard(photoData));
  closePopup(addPhotoPopup);
};

addButton.addEventListener('click', () => {
  disabledButton();
  openPopup(addPhotoPopup);
})

closeButton.addEventListener('click', ()=>{
  closePopup(addPhotoPopup);
})

addPhotoPopupForm.addEventListener('submit', submitPhotoPopup);
