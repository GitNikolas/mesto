class Api {
  constructor(options) {
    this.options = options;
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _handleResponse(res){
    if(res.ok){
      return res.json()
    } else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  setInitialCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  setUserInformation(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userStatus,
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  handleLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.error(err)
    })
  }
}

export default Api;
