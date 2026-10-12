export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

export function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) closeModal(evt.currentTarget);
}

export function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup_is-opened").forEach(closeModal);
  }
}

export function handleOpenImageModal(evt) {
  const imageModal = document.querySelector("#image-popup");
  const modalImage = imageModal.querySelector(".popup__image");
  const modalCaption = imageModal.querySelector(".popup__caption");
  modalImage.src = evt.currentTarget.src;
  modalImage.alt = evt.currentTarget.alt;
  modalCaption.textContent = evt.currentTarget.alt;
  openModal(imageModal);
}
