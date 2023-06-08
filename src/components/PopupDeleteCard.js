import Popup from './Popup.js';

class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector('#popupFormConfirmation')
    this._closeButton = this._popupSelector.querySelector('.popup__close')
    this._submitCallback = submitCallback;
    this._submitButton = this._popupSelector.querySelector('.popup__submit-button');
    this._defaultSubmitButton = this._submitButton.textContent;
  }

  setDefaultText(){
    this._submitButton.textContent = this._defaultSubmitButton;
  }

  openPopup({ card, cardId }){
    super.openPopup();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners(){
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback({ card: this._card, cardId: this._cardId });
      this.closePopup();
    });

  }
}

export default PopupDeleteCard;
