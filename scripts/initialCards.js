const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
