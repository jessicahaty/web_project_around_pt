import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import initialCards from "./initialCards.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const profileForm = editProfileModal.querySelector("#edit-profile-form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(".popup__input_type_description");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = newCardModal.querySelector("#new-card-form");
const imagePopup = new PopupWithImage("#image-popup");
const cardTemplate = document.querySelector("#card-template");
const handleCardClick = (imageSrc, imageCaption) => imagePopup.open(imageSrc, imageCaption);
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_invalid",
  inputTypeClassPrefix: "popup__input_type_",
  errorSelectorPrefix: ".popup__input-error_type_",
};
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) =>
      cardsSection.addItem(
        new Card(item, cardTemplate, handleCardClick).getView(),
      ),
  },
  ".cards__list",
);

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({ name: inputValues.name, job: inputValues.description });
  editProfilePopup.close();
});
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  cardsSection.addItem(
    new Card(
      { name: inputValues["place-name"], link: inputValues.link },
      cardTemplate,
      handleCardClick,
    ).getView(),
  );
  newCardValidator.resetValidation();
  newCardPopup.close();
});

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.job;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});
editProfileValidator.setEventListeners();
editProfilePopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  newCardPopup.open();
});
newCardValidator.setEventListeners();
newCardPopup.setEventListeners();

imagePopup.setEventListeners();

cardsSection.renderItems();
