export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _getErrorElement(input) {
    const typeClass = [...input.classList].find((className) =>
      className.startsWith(this._config.inputTypeClassPrefix),
    );
    const type = typeClass.replace(this._config.inputTypeClassPrefix, "");
    return this._form.querySelector(`${this._config.errorSelectorPrefix}${type}`);
  }

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);
    this._getErrorElement(input).textContent = input.validationMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);
    this._getErrorElement(input).textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) this._showInputError(input);
    else this._hideInputError(input);
  }

  _toggleButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
  }

  _handleInput = (evt) => {
    this._checkInputValidity(evt.target);
    this._toggleButtonState();
  };

  _setEventListeners() {
    this._inputs.forEach((input) => input.addEventListener("input", this._handleInput));
    this._form.addEventListener("submit", (evt) => {
      if (!this._form.checkValidity()) {
        evt.preventDefault();
        this._inputs.forEach((input) => this._checkInputValidity(input));
      }
    });
    this._toggleButtonState();
  }

  setEventListeners() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}
