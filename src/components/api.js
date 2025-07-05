const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'b625eed4-de93-437f-9a1d-8a3962f920aa',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  return res.json().then((data) => {
    if (res.ok) {
      return data;
    }
    return Promise.reject(`Ошибка: ${res.status} - ${data.message || res.statusText}`);
  });
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка getUserInfo:', err);
      throw err;
    });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка getInitialCards:', err);
      throw err;
    });
};

const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка editProfile:', err);
      throw err;
    });
};

const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка addCard:', err);
      throw err;
    });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка deleteCard:', err);
      throw err;
    });
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка likeCard:', err);
      throw err;
    });
};

const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка unlikeCard:', err);
      throw err;
    });
};

const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink })
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Ошибка updateAvatar:', err);
      throw err;
    });
};

export { getUserInfo, getInitialCards, editProfile, addCard, deleteCard, likeCard, unlikeCard, updateAvatar };