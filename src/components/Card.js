class Card {
  constructor({ photoData, myId, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector) {
    this._name = photoData.name;
    this._link = photoData.link;
    this._myId = myId;
    this._cardId = photoData._id;
    this._likes = photoData.likes;
    this._likesLength = photoData.likes.length;
    this._owner = photoData.owner;
    this._ownerId = photoData.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._element = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-card')
    .cloneNode(true);
    this._counter =  this._element.querySelector('.photo-card__like-counter');
    this._image = this._element.querySelector('.photo-card__image');
    this._likeButton = this._element.querySelector('.photo-card__like');
    this._trashIcon = this._element.querySelector('.photo-card__delete');
    this._popupConfirmation = document.querySelector('.popup_type_confirmation');
  }

  generateCard() {
    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._name;
    this._counter.textContent = this._likesLength;
    this._element.myId = this._myId;

    this._visibleDeleteIcon();
    this._checkLikeStatus();

    this._element.querySelector('.photo-card__text').textContent = this._name;
    return this._element;
  }

  _visibleDeleteIcon() {
    if(this._myId === this._ownerId){
      this._element.querySelector('.photo-card__delete').style.display = 'block';
    } else {
      this._element.querySelector('.photo-card__delete').style.display = 'none';
    }
  }

  _checkLikeStatus() {
    this._likes.forEach((item) => {
      if(item._id === this._myId){
        this._likeButton.classList.add('photo-card__like_active');
        return
      }
    })
  }

  handleDelete() {
    this._element.remove();
  }

  handleLike(data){
    this._likeButton.classList.toggle('photo-card__like_active');
    this._counter.textContent = data;
  }

  _setEventListeners() {

    this._trashIcon.addEventListener('click', () => {
      this._handleDeleteClick({ card:this, cardId:this._cardId });
    });

    this._likeButton.addEventListener('click',  () => {
      this._handleLikeClick(this._likeButton, this._cardId);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick({  name: this._name, link: this._link})
    });
  }
}

export default Card;
