function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openImagePopup(name, link) {
  const imagePopup = document.querySelector(".popup_type_image");
  const image = imagePopup.querySelector(".popup__image");
  const caption = imagePopup.querySelector(".popup__caption");

  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openPopup(imagePopup);
}

export { openPopup, closePopup, handleEscClose, openImagePopup };
