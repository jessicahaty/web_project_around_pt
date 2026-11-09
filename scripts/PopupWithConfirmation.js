import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button");
    this._handleConfirm = () => {};
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", async () => {
      this._confirmButton.disabled = true;
      try {
        await this._handleConfirm();
      } finally {
        this._confirmButton.disabled = false;
      }
    });
  }
}
