import Popup from './Popup.js';

class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this.popupSelector = document.querySelector(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this.popupSelector.querySelector('.popup__form');
    this._submitButton = this._popupSelector.querySelector('.popup__submit-button');
    this._defaultSubmitButton = this._submitButton.textContent;
  }

  setDefaultText(){
    this._submitButton.textContent = this._defaultSubmitButton;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(data){
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
      input.value = data[input.name];
      });
  }

  closePopup(){
    this._popupForm.reset();
    super.closePopup();
  }

  setEventListeners(){
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback(this._getInputValues());
    });
  }
}

export default PopupWithForm;
