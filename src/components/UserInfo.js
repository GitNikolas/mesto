class UserInfo {
  constructor({ userName,userStatus,avatar }){
    this._userName = userName;
    this._userStatus = userStatus;
    this._profileAvatar = avatar;
  }

  getUserInfo(){
    const getUserInfo = {
      userName: this._userName.textContent,
      userStatus: this._userStatus.textContent,
      profileAvatar: this._profileAvatar,
    }

    return getUserInfo;
  }
  setUserInfo({userName, userStatus, avatar}){
    const setUserInfo = {
      profileAvatar: this._profileAvatar.style.backgroundImage = `url(${avatar})`,
      userName: this._userName.textContent = userName,
      userStatus: this._userStatus.textContent = userStatus,
    }
    return setUserInfo;
  }
}

export default UserInfo;
