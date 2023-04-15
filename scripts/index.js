const editLink = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const popupUserName = profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus = profileEditPopup.querySelector('.popup__input_type_user-status');
const popupSaveButton = profileEditPopup.querySelector('.popup__submit-button');
const profileEditPopupForm = profileEditPopup.querySelector('.popup__form');
const userName = document.querySelector('.profile__name');
const userStatus = document.querySelector('.profile__status');
const placeName = document.querySelector('.popup__input_type_place-name');
const link = document.querySelector('.popup__input_type_picture-url')

const openPopup = (popup) => {
  popup.classList.add('popup_open');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
};

function submitProfileForm(event){
  event.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  closePopup (profileEditPopup);
};

editLink.addEventListener('click', () => {
  openPopup(profileEditPopup);
  popupUserName.value = userName.textContent ;
  popupUserStatus.value = userStatus.textContent;
});

profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

profileEditPopupForm.addEventListener('submit', submitProfileForm);

// реализация создания новой карточки

const photoCardTemplate = document.getElementById('photo-card-template');
const photoGrid = document.querySelector('.elements__list');
const photoViewPopup = document.querySelector('.popup_type_view-photo');
const photoViewPopupCloseButton = photoViewPopup.querySelector('.popup__close');

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

  photoImage.addEventListener('click', () => {
    openPopup(photoViewPopup);
    const openedPhoto=photoViewPopup.querySelector('.popup__image')
    const subtitlePhoto = photoViewPopup.querySelector('.popup__caption');
    openedPhoto.src=photoImage.src;
    subtitlePhoto.textContent=photoImage.alt;
  });

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

  photoName.textContent = photoData.name;
  photoImage.src = photoData.link;
  photoImage.alt = photoData.name;

  return photoElement;
}

photoViewPopupCloseButton.addEventListener('click', () => {
  closePopup(photoViewPopup);
});

const renderPhotoElement = (photoElement) => {
  photoGrid.prepend(photoElement);
}

initialCards.forEach((initialCards) => {
  renderPhotoElement(createPhotoCard(initialCards));
});

// реализация попапа добавления новой карточки

const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addButton = document.querySelector('.profile__add-button');
const closeaddPhotoPopupButton = addPhotoPopup.querySelector('.popup__close');
const submitPhotoPopupButton = addPhotoPopup.querySelector('.popup__submit-button');
const addPhotoPopupForm = addPhotoPopup.querySelector('.popup__form');
const placeNameInput = addPhotoPopupForm.querySelector('.popup__input_type_place-name');
const placeUrlInput = addPhotoPopupForm.querySelector('.popup__input_type_picture-url');
const placeTitle = document.querySelector('.photo-card__text');
const placeImage = document.querySelector('.photo-card__image');

submitPhotoPopup = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeUrlInput.value;
  const photoData = {
    name,
    link,
  };

  addPhotoPopupForm.reset();
  renderPhotoElement(createPhotoCard(photoData));
  closePopup(addPhotoPopup);
};

addButton.addEventListener('click', () => {
  openPopup(addPhotoPopup);
})

closeaddPhotoPopupButton.addEventListener('click', ()=>{
  closePopup(addPhotoPopup);
})

addPhotoPopupForm.addEventListener('submit', submitPhotoPopup);

// Реализация валидации

function disabledButton(button) {
  button.setAttribute('disabled', true);
};

function enabledButton(button) {
  button.removeAttribute('disabled');
};

function toggleButtonValidity(popupForm) {
  popupForm.forEach((form) => {
    const submitButton = form.querySelector('.popup__submit-button');
    if(form.checkValidity()){
      enabledButton(submitButton);
    } else {
      disabledButton(submitButton);
    }
  });
}

function setInputValidState(input, errorMessage) {
  input.classList.remove('popup__input_invalid');
  errorMessage.textContent = '';
};

function setInputInvalidState(input, errorMessage) {
  input.classList.add('popup__input_invalid');
  errorMessage.textContent = input.validationMessage;
};

function checkInputValidity(input) {
  const errorMessage = document.querySelector(`#error-${input.id}`);

  if(input.checkValidity()) {
    setInputValidState(input, errorMessage);
  } else {
    setInputInvalidState(input, errorMessage);
  }


};

function enableValidation () {
  const popupForm = document.querySelectorAll('.popup__form');

  popupForm.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
    });
  });

  const inputs = document.querySelectorAll('.popup__input');
  const inputsArray = Array.from(inputs);

  inputsArray.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleButtonValidity(popupForm);
    });
  });
};

enableValidation ()


