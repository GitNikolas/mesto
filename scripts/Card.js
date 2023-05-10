class Card {

  constructor(photoData, templateSelector) {
    this._name = photoData.name;
    this._link = photoData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-card')
    .cloneNode(true);

    return templateElement;
  }

  _getImageSelector = () => {
    const image = this._element.querySelector('.photo-card__image');
    return image;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._getImageSelector();
    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.photo-card__text').textContent = this._name;

    return this._element;
  }

  _handleDelete = () => {
    this._element.remove();
  }

  _handleLike = () => {
    const _likeButton = this._element.querySelector('.photo-card__like');
    _likeButton.classList.toggle('photo-card__like_active');
  }

  _openPopup = () => {

    this._viewPhotoPopup = document.querySelector('.popup_type_view-photo');
    const popupImage = this._viewPhotoPopup.querySelector('.popup__image');
    const popupCaption = this._viewPhotoPopup.querySelector('.popup__caption');

    popupImage.src = this._link;
    popupCaption.textContent = this._name;
    this._viewPhotoPopup.classList.add('popup_open');

    document.addEventListener('keydown', this._closePopupKeydown);
  }

  _closePopup = () => {
    this._openPopup();
    this._closeButton = this._viewPhotoPopup.querySelector('.popup__close').addEventListener('click', () => {
      this._viewPhotoPopup.classList.remove('popup_open');
    })
  }

  _closePopupKeydown = (event) => {
      if(event.code === 'Escape') {
        this._viewPhotoPopup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._closePopupKeydown);
      };
  };

  _setEventListeners() {

    this._element.querySelector('.photo-card__delete').addEventListener('click', this._handleDelete);

    this._element.querySelector('.photo-card__like').addEventListener('click', this._handleLike);

    this._element.querySelector('.photo-card__image').addEventListener('click', this._openPopup);

    this._element.querySelector('.photo-card__image').addEventListener('click', this._closePopup);

}
}

export default Card;
