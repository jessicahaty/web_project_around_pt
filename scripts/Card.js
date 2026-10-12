import { handleOpenImageModal } from "./utils.js";

export default class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name || "Lugar sem nome";
    this._link = link || "./images/placeholder.jpg";
    this._template = templateSelector;
  }

  _getTemplate() {
    return this._template.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", handleOpenImageModal);
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteCard);
  }

  _handleLikeButton = (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  };

  _handleDeleteCard = (evt) => {
    evt.currentTarget.closest(".card").remove();
  };

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
