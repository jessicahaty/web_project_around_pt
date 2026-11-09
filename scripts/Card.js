export default class Card {
  constructor(
    { _id, name, link, isLiked, canDelete },
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._id = _id;
    this._name = name || "Lugar sem nome";
    this._link = link || "./images/placeholder.jpg";
    this._isLiked = isLiked;
    this._canDelete = canDelete;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return this._template.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
    this._likeButton.addEventListener("click", this._handleLikeButton);
    if (this._canDelete) {
      this._deleteButton.addEventListener("click", this._handleDeleteCard);
    }
  }

  _handleLikeButton = async (evt) => {
    const likeButton = evt.currentTarget;
    likeButton.disabled = true;

    try {
      const card = await this._handleLikeClick(this._id, this._isLiked);
      this._isLiked = card.isLiked;
      likeButton.classList.toggle(
        "card__like-button_is-active",
        this._isLiked,
      );
    } catch (error) {
      console.error("Não foi possível atualizar a curtida do cartão.", error);
    } finally {
      likeButton.disabled = false;
    }
  };

  _handleDeleteCard = () => {
    this._handleDeleteClick(this._id, () => this._cardElement.remove());
  };

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._deleteButton.hidden = !this._canDelete;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked,
    );
    this._setEventListeners();
    return this._cardElement;
  }
}
