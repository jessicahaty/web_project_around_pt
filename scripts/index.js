import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  closeModal,
  handleEscapeClose,
  handleOverlayClose,
  openModal,
} from "./utils.js";

const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const profileForm = editProfileModal.querySelector("#edit-profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(".popup__input_type_description");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector("#new-card-form");
const cardNameInput = newCardModal.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_invalid",
  inputTypeClassPrefix: "popup__input_type_",
  errorSelectorPrefix: ".popup__input-error_type_",
};
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

function renderCard(name, link, container) {
  container.prepend(new Card({ name, link }, cardTemplate).getView());
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  editProfileValidator.resetValidation();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!profileForm.checkValidity()) return;
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (!newCardForm.checkValidity()) return;
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  newCardForm.reset();
  newCardValidator.resetValidation();
  closeModal(newCardModal);
}

editProfileButton.addEventListener("click", handleOpenEditModal);
editProfileCloseButton.addEventListener("click", () => closeModal(editProfileModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);
editProfileValidator.setEventListeners();

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  openModal(newCardModal);
});
newCardCloseButton.addEventListener("click", () => closeModal(newCardModal));
newCardForm.addEventListener("submit", handleCardFormSubmit);
newCardValidator.setEventListeners();

imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClose);
});
document.addEventListener("keydown", handleEscapeClose);

initialCards.forEach(({ name, link }) => renderCard(name, link, cardsContainer));
