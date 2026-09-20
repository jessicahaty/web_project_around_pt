let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },

  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const profileForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileSubmitButton = profileForm.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector("#new-card-form");
const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const newCardSubmitButton = newCardForm.querySelector(".popup__button");
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup_is-opened").forEach(closeModal);
  }
}

function getErrorElement(form, input) {
  const type = [...input.classList]
    .find((className) => className.startsWith("popup__input_type_"))
    .replace("popup__input_type_", "");
  return form.querySelector(`.popup__input-error_type_${type}`);
}

function showInputError(form, input, errorMessage) {
  input.classList.add("popup__input_invalid");
  getErrorElement(form, input).textContent = errorMessage;
}

function hideInputError(form, input) {
  input.classList.remove("popup__input_invalid");
  getErrorElement(form, input).textContent = "";
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(form, button) {
  button.disabled = !form.checkValidity();
}

function resetValidation(form, button) {
  form.querySelectorAll(".popup__input").forEach((input) => hideInputError(form, input));
  toggleButtonState(form, button);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(profileForm, editProfileSubmitButton);
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!profileForm.checkValidity()) {
    profileForm.querySelectorAll(".popup__input").forEach((input) =>
      checkInputValidity(profileForm, input),
    );
    return;
  }
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

editProfileButton.addEventListener("click", handleOpenEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);

profileForm.querySelectorAll(".popup__input").forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(profileForm, input);
    toggleButtonState(profileForm, editProfileSubmitButton);
  });
});

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function getCardElement({
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", handleOpenImageModal);
  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleOpenImageModal(evt) {
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
  openModal(imageModal);
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function renderCard(name, link, container) {
  container.prepend(getCardElement({ name, link }));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (!newCardForm.checkValidity()) {
    newCardForm.querySelectorAll(".popup__input").forEach((input) =>
      checkInputValidity(newCardForm, input),
    );
    return;
  }
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  newCardForm.reset();
  resetValidation(newCardForm, newCardSubmitButton);
  closeModal(newCardModal);
}

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  resetValidation(newCardForm, newCardSubmitButton);
  openModal(newCardModal);
});

newCardForm.querySelectorAll(".popup__input").forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(newCardForm, newCardSubmitButton);
  });
});

newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClose);
});

document.addEventListener("keydown", handleEscapeClose);

newCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});
