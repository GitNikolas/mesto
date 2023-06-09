class UserInfo {
  constructor({ userName,userStatus,avatar, userId}){
    this._userName = userName;
    this._userStatus = userStatus;
    this._profileAvatar = avatar;
    this.userId = userId;
  }

  getUserInfo(){
    const getUserInfo = {
      userName: this._userName.textContent,
      userStatus: this._userStatus.textContent,
      profileAvatar: this._profileAvatar,
      userId: this.userId,
    }

    return getUserInfo;
  }
  setUserInfo({userName, userStatus, avatar, userId}){
    const setUserInfo = {
      profileAvatar: this._profileAvatar.style.backgroundImage = `url(${avatar})`,
      userName: this._userName.textContent = userName,
      userStatus: this._userStatus.textContent = userStatus,
      userId: this.userId = userId,
    }
    return setUserInfo;
  }
}

export default UserInfo;
