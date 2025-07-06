import "./styles/index.css";

import "./components/card.js";
import "./components/modal.js";


import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  editProfile,
  addCard,
  updateAvatar
} from "./components/api.js";

const cardsList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__image-edit-button");

const closeButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_edit-avatar"); 
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup_type_image");
const photoPopupImage = imagePopup.querySelector(".popup__image");
const captionPopupImage = imagePopup.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const addCardForm = document.querySelector('form[name="new-place"]');
const titleInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

const avatarForm = document.querySelector('form[name="edit-avatar"]');
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar-link");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function openImagePopup(cardData) {
  photoPopupImage.src = cardData.link;
  photoPopupImage.alt = cardData.name;
  captionPopupImage.textContent = cardData.name;
  openPopup(imagePopup);
};

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    for (let i = cards.length - 1; i >= 0; i--) {
      const cardElement = createCard(cards[i], userId, openImagePopup);
      cardsList.append(cardElement);
    }
  })
  .catch((err) => console.log('Ошибка загрузки данных:',err));

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openPopup(newCardPopup);
});

editAvatarButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const form = evt.target;
  const saveButton = evt.submitter || form.querySelector('[type="submit"]');
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  editProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
});

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const saveButton = addCardForm.querySelector(".popup__button");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  addCard(titleInput.value, linkInput.value)
    .then((newCard) => {
      const cardElement = createCard(newCard, userId, openImagePopup);
      cardsList.prepend(cardElement);
      closePopup(newCardPopup);
      addCardForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector(".popup__button");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  updateAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveButton.textContent = originalText;
    });
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);