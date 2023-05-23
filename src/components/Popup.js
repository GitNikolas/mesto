
class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  openPopup(){
    this._popupSelector.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup(){
    this._popupSelector.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if(event.code === 'Escape') {
      this.closePopup();
      };
  }

  _closeOnOverlay = (event) => {
    if(event.currentTarget === event.target){
      this.closePopup();
    }
  }

  setEventListeners(){
    this._popupSelector.querySelector('.popup__close').addEventListener('click', this.closePopup.bind(this));
    this._popupSelector.querySelector('.popup__overlay').addEventListener('click', this._closeOnOverlay);
  }
}

export default Popup;
