import "./styles/index.css";
import "./components/card.js";
import "./components/modal.js";

import { initialCards } from "./cards.js";
import { createCard, toggleLike, deleteCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup_type_image");
const popupPicture = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const addCardForm = document.querySelector('form[name="new-place"]');
const titleInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

editProfileButton.addEventListener("click", openEditPopup);
addCardButton.addEventListener("click", () => openPopup(newCardPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(editPopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = titleInput.value;
  const link = linkInput.value;
  const newCard = createCard(cardTemplate, name, link, deleteCard, toggleLike, openImagePopup);

  cardsList.prepend(newCard);
  addCardForm.reset();

  closePopup(newCardPopup);
}

function openImagePopup(name, link) {
  popupPicture.src = link;
  popupPicture.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

initialCards.forEach(({ name, link }) => {
  const card = createCard(cardTemplate, name, link, deleteCard, toggleLike, openImagePopup);
  cardsList.append(card);
});
