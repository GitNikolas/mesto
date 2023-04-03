const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addButton = document.querySelector('.profile__add-button');
const closeButton = addPhotoPopup.querySelector('.popup__close');
const submitPhotoPopupButton = addPhotoPopup.querySelector('.popup__submit-button');
const addPhotoPopupForm = addPhotoPopup.querySelector('.popup__form');
const placeNameInput = addPhotoPopupForm.querySelector('.popup__input_type_place-name');
const placeUrlInput = addPhotoPopupForm.querySelector('.popup__input_type_picture-url');
const placeTitle = document.querySelector('.photo-card__text');
const placeImage = document.querySelector('.photo-card__image')

closePhotoPopup = () => {
  addPhotoPopup.classList.remove('popup_open');
};

submitPhotoPopup = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeUrlInput.value;
  const photoData = {
    name,
    link,
  };

  renderPhotoElement(createPhotoCard(photoData));
  closePhotoPopup();
};



addButton.addEventListener('click', () => {
  openPopup(addPhotoPopup)
})

closeButton.addEventListener('click', ()=>{
  closePopup(addPhotoPopup);
})

addPhotoPopupForm.addEventListener('submit', submitPhotoPopup);

