import Card from "./Card.js";
import Api from "./Api.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const profileForm = editProfileModal.querySelector("#edit-profile-form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(".popup__input_type_description");
const profileImage = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const avatarForm = document.querySelector("#avatar-form");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = newCardModal.querySelector("#new-card-form");
const imagePopup = new PopupWithImage("#image-popup");
const cardTemplate = document.querySelector("#card-template");
const handleCardClick = (imageSrc, imageCaption) => imagePopup.open(imageSrc, imageCaption);
const handleLikeClick = (cardId, isLiked) =>
  api.changeLikeCardStatus(cardId, isLiked);
const deleteCardPopup = new PopupWithConfirmation("#delete-popup");
const handleDeleteClick = (cardId, removeCard) => {
  deleteCardPopup.setSubmitAction(async () => {
    try {
      await api.deleteCard(cardId);
      removeCard();
      deleteCardPopup.close();
    } catch (error) {
      console.error("Não foi possível excluir o cartão.", error);
    }
  });
  deleteCardPopup.open();
};
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

let currentUserId = null;
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_invalid",
  inputTypeClassPrefix: "popup__input_type_",
  errorSelectorPrefix: ".popup__input-error_type_",
};
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) =>
      cardsSection.addItem(
        new Card(
          item,
          cardTemplate,
          handleCardClick,
          handleLikeClick,
          handleDeleteClick,
        ).getView(),
      ),
  },
  ".cards__list",
);

api
  .getAppData()
  .then(([userData, cards]) => {
    if (!Array.isArray(cards)) {
      throw new Error("A resposta do servidor não contém uma lista de cartões.");
    }

    currentUserId = userData._id;
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    profileImage.src = userData.avatar;
    profileImage.alt = `Avatar de ${userData.name}`;

    cardsSection.renderItems(
      cards.map((card) => ({
        ...card,
        canDelete: card.owner === userData._id,
      })),
    );
  })
  .catch((error) => {
    console.error("Não foi possível carregar os dados iniciais.", error);
  });

const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
  try {
    const userData = await api.editUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    });

    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    editProfilePopup.close();
  } catch (error) {
    console.error("Não foi possível salvar as informações do perfil.", error);
  }
});
const avatarPopup = new PopupWithForm("#avatar-popup", async (inputValues) => {
  try {
    const userData = await api.editAvatar(inputValues.avatar);
    profileImage.src = userData.avatar;
    avatarPopup.close();
  } catch (error) {
    console.error("Não foi possível atualizar a foto do perfil.", error);
  }
});
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
  try {
    const card = await api.addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    });

    cardsSection.addItem(
      new Card(
        { ...card, canDelete: card.owner === currentUserId },
        cardTemplate,
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
      ).getView(),
    );
    newCardValidator.resetValidation();
    newCardPopup.close();
  } catch (error) {
    console.error("Não foi possível adicionar o cartão.", error);
  }
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
avatarValidator.setEventListeners();
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarPopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  newCardPopup.open();
});
newCardValidator.setEventListeners();
newCardPopup.setEventListeners();

imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
