import Popup from './Popup.js';

class PopupWithForm extends Popup{
  constructor(popupSelector, renderer){
    super(popupSelector);
    this.popupSelector = document.querySelector(popupSelector);
    this._renderer = renderer;

  }

  _getInputValues = () => {
    const inputValues = {
      name: this.popupSelector.querySelector('#placeName').value,
      link: this.popupSelector.querySelector('#pictureUrl').value,
    }

    return inputValues;
  }

  closePopup(){
    this._popupForm = this.popupSelector.querySelector('.popup__form');
    this._popupForm.reset();
    super.closePopup();
  }

  addPhotoCardFormSubmit(){
    this.popupSelector.querySelector('#popupFormAddPhoto').addEventListener('submit', (event) => {
      event.preventDefault();
      this._inputValues = this._getInputValues();

      this._renderer(this._inputValues);
      this.closePopup();
    });
  }

  profileEditFormSubmit(){
    this.popupSelector.querySelector('#popupFormEditProfile').addEventListener('submit', (event) => {
      event.preventDefault();
      this._renderer();
    });
  }

  setEventListeners(){
    super.setEventListeners();
  }

}

export default PopupWithForm;
