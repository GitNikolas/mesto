class FormValidator {

  constructor(config, formElement){
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.disabledButtonClass = config.disabledButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorMessageClass = config.errorMessageClass;
    this.formElement = document.querySelector(formElement);
  }

  _enabledButton () {
    this._submitButton = this.formElement.querySelector(this.submitButtonSelector);
    this._submitButton.removeAttribute('disabled', true);
    this._submitButton.classList.remove(this.disabledButtonClass);
  }

  _disabledButton() {
    this._submitButton = this.formElement.querySelector(this.submitButtonSelector);
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this.disabledButtonClass);
  }

  toggleButtonState () {

    if(this.formElement.checkValidity()){
      this._enabledButton();
    }
    else{
      this._disabledButton();
    }
  }

  hideInputsError = () =>  {
    const _inputsArray = this.formElement.querySelectorAll(this.inputSelector);

    _inputsArray.forEach((input) => {
      this._setInputValidState(input);
    });
  }

  _setInputValidState = (input) => {
    const errorElement = document.querySelector(`#error-${input.id}`);
    input.classList.remove(this.inputErrorClass);
    errorElement.textContent = '';
  }

  _setInputInvalidState = (input) => {
    const errorElement = document.querySelector(`#error-${input.id}`);
    input.classList.add(this.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _checkInputValidity (input) {
    if(input.checkValidity()){
      this._setInputValidState(input);
    }
    else {
      this._setInputInvalidState(input);
    }
  }

  _setEventListeners() {

    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      this.toggleButtonState();
    });

    this.inputsArray = Array.from(this.formElement.querySelectorAll(this.inputSelector));

    this.inputsArray.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    })




  }

  enableValidation(){
    this._setEventListeners();

  }

}

export default FormValidator;
