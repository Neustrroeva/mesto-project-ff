import { deleteCard as apiDeleteCard, likeCard, unlikeCard } from "./api.js";

function createCard(cardData, userId, onOpenImagePopup) {
  const template = document.querySelector("#card-template");
  if (!template) throw new Error("Не найден шаблон карточки");

  const cardTemplate = template.content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      apiDeleteCard(cardData._id)
        .then(() => cardElement.remove())
        .catch(err => console.log(err));
    });
  } else {
    deleteButton.remove();
  }

  const isLiked = cardData.likes.some(like => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    const liked = likeButton.classList.contains("card__like-button_is-active");
    const request = liked ? unlikeCard : likeCard;

    request(cardData._id)
      .then(updatedCard => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch(err => console.log(err));
  });

  cardImage.addEventListener("click", () => {
    onOpenImagePopup(cardData);
  });

  return cardElement;
}

export { createCard };