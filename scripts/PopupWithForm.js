import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._form.querySelectorAll("input").forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      if (this._form.checkValidity()) {
        const submitButtonText = this._submitButton.textContent;
        this._submitButton.textContent = "Salvando...";
        this._submitButton.disabled = true;

        try {
          await this._handleFormSubmit(this._getInputValues());
        } finally {
          this._submitButton.textContent = submitButtonText;
          this._submitButton.disabled = !this._form.checkValidity();
        }
      }
    });
  }
}
