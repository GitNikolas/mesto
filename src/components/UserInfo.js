class UserInfo {
  constructor({ userName,userStatus }){
    this._userName = userName;
    this._userStatus = userStatus;
  }

  getUserInfo(){
    const getUserInfo = {
      userName: this._userName.textContent,
      userStatus: this._userStatus.textContent,
    }

    return getUserInfo;
  }
  setUserInfo(data){
    const setUserInfo = {
      userName: this._userName.textContent = data.userName,
      userStatus: this._userStatus.textContent = data.userStatus,
    }

    return setUserInfo;
  }
}

export default UserInfo;
