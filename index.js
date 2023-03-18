const editLink=document.querySelector('.profile__edit-button-link');
const profileEditPopup=document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton=profileEditPopup.querySelector('.popup__close');
const popupUserName=profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus=profileEditPopup.querySelector('.popup__input_type_user-status');
const popupSaveButton=profileEditPopup.querySelector('.popup__button_type_submit');
const profileEditPopupForm=profileEditPopup.querySelector('.popup__form');
const userName=document.querySelector('.profile__name');
const userStatus=document.querySelector('.profile__status');


function editLinkClick(){
  profileEditPopup.classList.add('popup_open');
  popupUserName.value=userName.textContent;
  popupUserStatus.value=userStatus.textContent;
};

function editLinkClickRemove(){
  profileEditPopup.classList.remove('popup_open')
};


function profileEditPopupFormSubmit(event){
  event.preventDefault();
  const name = popupUserName.value;
  const status= popupUserStatus.value;
  userName.textContent = name;
  userStatus.textContent = status;
};



editLink.addEventListener('click', editLinkClick)
profileEditPopupCloseButton.addEventListener('click', editLinkClickRemove)
profileEditPopupForm.addEventListener('submit', profileEditPopupFormSubmit)



console.log(editLink);
console.log(profileEditPopup);
console.log(profileEditPopupCloseButton);


