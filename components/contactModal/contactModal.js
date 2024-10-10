import { addContactNameInputRef, addContactEmailInputRef, addContactPhoneInputRef } from "../../js/script.js";

import { getUsersArray } from "../../js/script.js";

let userColors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

let users;

function getRandomUserColor() {
  let randomIndex = Math.floor(Math.random() * userColors.length);
  let randomColor = userColors[randomIndex];
  return randomColor;
}

export function getNewUser() {
  let fullName = addContactNameInputRef.value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let userInitials = name.charAt(0) + surname.charAt(0);
  let id = userInitials + Date.now();
  let email = addContactEmailInputRef.value;
  let phoneNumber = addContactPhoneInputRef.value;
  let user = {
    id: id,
    password: "",
    user_color: getRandomUserColor(),
    profile: {
      first_name: name,
      last_name: surname,
      initials: userInitials,
      email: email,
      phone: phoneNumber,
    },
  };
  return user;
}

export function showAddNewUserDialog() {
  document.getElementById("contactModal").classList.remove("d_none");
  setTimeout(() => {
    executeOpenAnimation();
  }, 100);
}

export function hideAddNewUserDialog() {
  // document.getElementById("contactModal").classList.add("d_none");
  executeClosingAnimation();
  setTimeout(() => {
    document.getElementById("contactModal").classList.add("d_none");
  }, 500);
}

export function editChosenUser(id) {
  document.getElementById("editContactModal").classList.remove("d_none");
}

export function hideEditChosenUserDialog() {
  document.getElementById("editContactModal").classList.add("d_none");
  executeClosingAnimation();
  setTimeout(() => {
    document.getElementById("editContactModal").classList.add("d_none");
  }, 500);
}

function getModalCoordinates() {
  let modalElement = document.getElementById("addContactContainer");
  if (modalElement) {
    let rect = modalElement.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }
  return null;
}

function executeOpenAnimation() {
  getModalCoordinates();
  let modalElement = document.getElementById("addContactContainer");
  modalElement.style.left = "50%";
}

function executeClosingAnimation() {
  getModalCoordinates();
  let modalElement = document.getElementById("addContactContainer");
  modalElement.style.left = "150%";
}
