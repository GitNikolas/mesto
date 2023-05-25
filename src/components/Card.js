class Card {
  constructor({ photoData,handleCardClick }, templateSelector) {
    this._name = photoData.name;
    this._link = photoData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    _setEventListeners() {
    this._element.querySelector('.photo-card__delete').addEventListener('click', this._handleDelete);

    this._element.querySelector('.photo-card__like').addEventListener('click', this._handleLike);

    this._element.querySelector('.photo-card__image').addEventListener('click', this._handleCardClick);


  }
}

export default Card;
