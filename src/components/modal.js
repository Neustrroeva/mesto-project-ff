function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.style.display = "flex";

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
    popup.classList.remove("popup_is-animated");
  }, 10);

  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", handleEscClose);

  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 300);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup, handleEscClose };
