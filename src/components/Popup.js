
class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup(){
    this._popupSelector.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup(){
    this._popupSelector.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if(event.code === 'Escape') {
      this.closePopup();
      };
  }

  setEventListeners(){
    this._popupSelector.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close')) {
          this.closePopup();
      }
  });
  }
}

export default Popup;
