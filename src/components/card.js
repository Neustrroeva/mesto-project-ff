function createCard(cardTemplate, name, link, handleDelete, handleLike, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", handleLike);
  deleteButton.addEventListener("click", () => handleDelete(cardElement));
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, toggleLike, deleteCard };
