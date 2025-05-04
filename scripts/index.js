const cardsList = document.querySelector('.places__list');

function createCard(name, link, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle= cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = link;
    cardTitle.alt = name;
    cardTitle.textContent = name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}

initialCards.forEach(({name, link}) => {
   cardsList.append(createCard(name, link, deleteCard));
});

function deleteCard(cardElement) {
    cardElement.remove();
}