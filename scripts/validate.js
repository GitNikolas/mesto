// работа с инпутами

export const setInputValidState = (input, { inputErrorClass }) => {
  const errorElement = document.querySelector(`#error-${input.id}`);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const setInputInvalidState = (input, { inputErrorClass }) => {
  const errorElement = document.querySelector(`#error-${input.id}`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

export const hideInputsError = (popup, { inputSelector, ...rest }) => {
  const inputsArray = popup.querySelectorAll(inputSelector);

  inputsArray.forEach((input) => {
    setInputValidState(input, rest);
  });
};

const checkInputValidity = (input, rest) => {
  if(input.checkValidity()){
    setInputValidState(input, rest);
  }
  else {
    setInputInvalidState(input, rest);
  }
};

// работа с кнопками

const disabledButton = (button, { disabledButtonClass }) => {
  button.setAttribute('disabled', true);
  button.classList.add(disabledButtonClass);
};

const enabledButton = (button, { disabledButtonClass }) => {
  button.removeAttribute('disabled', true);
  button.classList.remove(disabledButtonClass);
};

export const toggleButtonState = (formElement, { submitButtonSelector, ...rest }) => {
  const submitButton = formElement.querySelector(submitButtonSelector);

  if(formElement.checkValidity()){
    enabledButton(submitButton, rest);
  }
  else{
    disabledButton(submitButton, rest);
  }
};

// обработчик события submit

const setSubmitListener = (formElement, rest) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    toggleButtonState(formElement, rest);
   });
}

// обработчик события input

const setInputListener = (formElement, inputSelector, rest) => {
  const inputs = formElement.querySelectorAll(inputSelector);
  const inputsArray = Array.from(inputs);

  inputsArray.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      toggleButtonState(formElement, rest);
    });
  });
};

// функция валидации форм

const enableValidation = ({ formSelector,  inputSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((formElement) => {
    toggleButtonState(formElement, rest);

    setSubmitListener(formElement, rest);

    setInputListener(formElement, inputSelector, rest);
  });
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMessageClass:'popup__error-message',
}

enableValidation(config);
