class UserInfo {
  constructor({ userName,userStatus }){
    this._userName = userName;
    this._userStatus = userStatus;
    this._userNameInput = document.querySelector('#userName');
    this._userStatusInput = document.querySelector('#userStatus');
  }

  getUserInfo(){
    this._userNameInput.value = this._userName.textContent;
    this._userStatusInput.value = this._userStatus.textContent;
  }
  setUserInfo(){
    this._userName.textContent = this._userNameInput.value;
    this._userStatus.textContent = this._userStatusInput.value;
  }
}

export default UserInfo;
