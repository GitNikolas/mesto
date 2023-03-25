const editLink=document.querySelector('.profile__edit-button');
const profileEditPopup=document.querySelector('.popup_type_profile-edit');
const profileEditPopupCloseButton=profileEditPopup.querySelector('.popup__close');
const popupUserName=profileEditPopup.querySelector('.popup__input_type_user-name');
const popupUserStatus=profileEditPopup.querySelector('.popup__input_type_user-status');
const popupSaveButton=profileEditPopup.querySelector('.popup__button_type_submit');
const profileEditPopupForm=profileEditPopup.querySelector('.popup__form');
const userName=document.querySelector('.profile__name');
const userStatus=document.querySelector('.profile__status');

function openPopup(){
  profileEditPopup.classList.add('popup_open');
  popupUserName.value=userName.textContent;
  popupUserStatus.value=userStatus.textContent;
};

function closePopup(){
  profileEditPopup.classList.remove('popup_open')
};


function profileFormSubmit(event){
  event.preventDefault();
  userName.textContent = popupUserName.value;
  userStatus.textContent = popupUserStatus.value;
  profileEditPopup.classList.remove('popup_open');
};

editLink.addEventListener('click', openPopup);
profileEditPopupCloseButton.addEventListener('click', closePopup);
profileEditPopupForm.addEventListener('submit', profileFormSubmit);
