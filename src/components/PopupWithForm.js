import Popup from './Popup.js';

class PopupWithForm extends Popup{
  constructor(popupSelector, renderer){
    super(popupSelector);
    this.popupSelector = document.querySelector(popupSelector);
    this._renderer = renderer;
    this._popupForm = this.popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  closePopup(){
    this._popupForm.reset();
    super.closePopup();
  }

  setEventListeners(){
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._renderer(this._getInputValues());
    });
  }

}

export default PopupWithForm;
