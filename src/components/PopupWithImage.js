import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this.popupSelector = document.querySelector(popupSelector);
  }

  _getImage(){
    const image = this.popupSelector.querySelector('.popup__image');
    return image;
  }

  openPopup(cardData){
    this._image = this._getImage();
    this._caption = this.popupSelector.querySelector('.popup__caption');

    this._image.src = cardData.target.src;
    this._image.alt = cardData.target.alt;
    this._caption.textContent = this._image.alt;

    super.openPopup();
  }

}

export default PopupWithImage;
