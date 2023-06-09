import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this.popupSelector = document.querySelector(popupSelector);
    this._image = this.popupSelector.querySelector('.popup__image');
    this._caption = this.popupSelector.querySelector('.popup__caption');
  }

  openPopup(cardData){
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._caption.textContent = this._image.alt;

    super.openPopup();
  }

}

export default PopupWithImage;
