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

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

editProfileButton.addEventListener("click", handleOpenEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);

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
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  newCardForm.reset();
  closeModal(newCardModal);
}

addCardButton.addEventListener("click", () => {
  openModal(newCardModal);
});

newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});
