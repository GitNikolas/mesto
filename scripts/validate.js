const config = {
  formSelector: 'popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMessageClass:'popup__error-message',
};

function disabledButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add(config.disabledButtonClass);
};

function enabledButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove(config.disabledButtonClass);
};

function toggleButtonValidity(popupForm) {
  popupForm.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    if(form.checkValidity()){
      enabledButton(submitButton);
    } else {
      disabledButton(submitButton);
    }
  });
}

function setInputValidState(input, errorMessage) {
  input.classList.remove(config.inputErrorClass);
  errorMessage.textContent = '';
};

function setInputInvalidState(input, errorMessage) {
  input.classList.add(config.inputErrorClass);
  errorMessage.textContent = input.validationMessage;
};

function checkInputValidity(input) {
  const errorMessage = document.querySelector(`#error-${input.id}`);

  if(input.checkValidity()) {
    setInputValidState(input, errorMessage);
  } else {
    setInputInvalidState(input, errorMessage);
  }
};

function enableValidation (config) {
  const popupForm = document.querySelectorAll('.popup__form');

  popupForm.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      form.reset();
      toggleButtonValidity(popupForm);
    });

  });

  toggleButtonValidity(popupForm);

  const inputs = document.querySelectorAll('.popup__input');
  const inputsArray = Array.from(inputs);

  inputsArray.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleButtonValidity(popupForm);
    });
  });
};

enableValidation(config);
