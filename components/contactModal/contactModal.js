import {
  getUsersArray,
  addContactNameInputRef,
  addContactEmailInputRef,
  addContactPhoneInputRef,
  editContactNameInputRef,
  editContactEmailInputRef,
  editContactPhoneInputRef,
  editNewUserLogoRef,
  saveEditedUserButtonRef,
  addedUserFeedbackRef,
  editUserFeedbackRef,
  confirmDeleteUserModalRef,
  deleteChosenUserBtnRef,
  sureToDeleteContactBtnRef,
  addNameWarningRef,
  addEmailWarningRef,
  addPhoneWarningRef,
  editNameWarningRef,
  editEmailWarningRef,
  editPhoneWarningRef,
  contactModalRef,
} from "../../js/script.js";

import { editExistingUser } from "../../js/apiService.js";

import { removeAktivContactButton } from "../contactList/contactList.js";

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

function validateNameInput(inputRef, warningRef) {
  if (!inputRef.value) {
    warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  if (inputRef.value) {
    let namePartsCount = inputRef.value.split(" ").length;
    if (namePartsCount != 2) {
      warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
      inputRef.style.borderColor = "rgb(255, 0, 0)";
      return false;
    }
  }
  return true;
}

function validateEmailInput(inputRef, warningRef) {
  if (!inputRef.value || inputRef.value.length < 6) {
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    warningRef.innerHTML = "Enter a valid email address.";
    return false;
  }
  if (inputRef.value) {
    let emailInput = inputRef.value;
    let mailPartAfterAt = emailInput.split("@")[1];
    let atCounter = emailInput.split("@").length;
    if (!emailInput.includes("@") || !mailPartAfterAt.includes(".") || atCounter > 2 || /[äöüß]/.test(emailInput)) {
      inputRef.style.borderColor = "rgb(255, 0, 0)";
      warningRef.innerHTML = "Enter a valid email address.";
      return false;
    }
  }
  return true;
}

function validatePhoneNumberInput(inputRef, warningRef) {
  if (!inputRef.value) {
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    warningRef.innerHTML = "Enter a valid phone number with country code.";
    return false;
  }
  if (inputRef.value) {
    let phoneNumber = inputRef.value;
    if (phoneNumber.length < 8 || phoneNumber[0] != "+") {
      inputRef.style.borderColor = "rgb(255, 0, 0)";
      warningRef.innerHTML = "Enter a valid phone number with country code.";
      return false;
    }
  }
  return true;
}

export function validateAllInputs(type) {
  if (type == "add") {
    return validateAllAddInputs();
  }
  if (type == "edit") {
    return validateAllEditInputs();
  }
}

function validateAllAddInputs() {
  clearAddErrorAlerts();
  let validName = validateNameInput(addContactNameInputRef, addNameWarningRef);
  let validEmail = validateEmailInput(addContactEmailInputRef, addEmailWarningRef);
  let validPhoneNumber = validatePhoneNumberInput(addContactPhoneInputRef, addPhoneWarningRef);
  if (validName && validEmail && validPhoneNumber) {
    return true;
  }
  return false;
}

function validateAllEditInputs() {
  clearEditErrorAlerts();
  let validName = validateNameInput(editContactNameInputRef, editNameWarningRef);
  let validEmail = validateEmailInput(editContactEmailInputRef, editEmailWarningRef);
  let validPhoneNumber = validatePhoneNumberInput(editContactPhoneInputRef, editPhoneWarningRef);
  if (validName && validEmail && validPhoneNumber) {
    return true;
  }
  return false;
}

function clearAddErrorAlerts() {
  addContactNameInputRef.style.borderColor = "#d1d1d1";
  addContactEmailInputRef.style.borderColor = "#d1d1d1";
  addContactPhoneInputRef.style.borderColor = "#d1d1d1";
  addNameWarningRef.innerHTML = "";
  addEmailWarningRef.innerHTML = "";
  addPhoneWarningRef.innerHTML = "";
}

function clearEditErrorAlerts() {
  editContactNameInputRef.style.borderColor = "#d1d1d1";
  editContactEmailInputRef.style.borderColor = "#d1d1d1";
  editContactPhoneInputRef.style.borderColor = "#d1d1d1";
  editNameWarningRef.innerHTML = "";
  editEmailWarningRef.innerHTML = "";
  editPhoneWarningRef.innerHTML = "";
}

export function validateNewPhonenumber() {
  let number = addContactPhoneInputRef.value;
  if (number[0] == "0") {
    let addedNumber = number.replace("0", "+49 ");
    addContactPhoneInputRef.value = addedNumber;
  }
}

export function validateEditPhonenumber() {
  let number = editContactPhoneInputRef.value;
  if (number[0] == "0") {
    let addedNumber = number.replace("0", "+49 ");
    editContactPhoneInputRef.value = addedNumber;
  }
}

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

export function getEditUserObject(user) {
  let fullName = editContactNameInputRef.value;
  let email = editContactEmailInputRef.value;
  let phoneNumber = editContactPhoneInputRef.value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let userInitials = name.charAt(0) + surname.charAt(0);
  let editUserProfile = {
    first_name: name,
    last_name: surname,
    initials: userInitials,
    email: email,
    phone: phoneNumber,
  };
  return editUserProfile;
}

export function showAddNewUserDialog() {
  document.getElementById("contactModal").classList.remove("d_none");
  clearAddErrorAlerts();
  setTimeout(() => {
    document.getElementById("addContactContainer").style.left = "50%";
  }, 50);
}

export function hideAddNewUserDialog() {
  document.getElementById("addContactContainer").style.left = "150%";
  removeAktivContactButton();
  setTimeout(() => {
    document.getElementById("contactModal").classList.add("d_none");
    clearAddInputFields();
  }, 550);
}

export function hideAddNewUserDialogFromBG(event) {
  if (event.target.id == "contactModal") {
    hideAddNewUserDialog();
  } else {
    return;
  }
}

export function clearAddInputFields() {
  addContactNameInputRef.value = "";
  addContactEmailInputRef.value = "";
  addContactPhoneInputRef.value = "";
}

export function newUserFeedback() {
  addedUserFeedbackRef.classList.remove("d_none");

  setTimeout(() => {
    if (window.innerWidth < 1400) {
      addedUserFeedbackRef.style.left = "calc(50% - 163px)";
    } else {
      addedUserFeedbackRef.style.left = "746px";
    }
  }, 500);
  setTimeout(() => {
    addedUserFeedbackRef.style.left = "100%";
  }, 3000);
  setTimeout(() => {
    addedUserFeedbackRef.classList.add("d_none");
  }, 4000);
}

export async function showEditChosenUserDialog(id) {
  let usersArray = await getUsersArray();
  let user = usersArray.find((element) => element[0] == id);
  editContactNameInputRef.value = user[1].profile.first_name + " " + user[1].profile.last_name;
  editContactEmailInputRef.value = user[1].profile.email;
  editContactPhoneInputRef.value = user[1].profile.phone;
  editNewUserLogoRef.style.backgroundColor = user[1].user_color;
  editNewUserLogoRef.innerHTML = `<span>${user[1].profile.initials}</span>`;
  saveEditedUserButtonRef.addEventListener("click", () => {
    editExistingUser(id, user);
  });
  deleteChosenUserBtnRef.addEventListener("click", () => {
    showConfirmDeleteUserDialog(id);
  });
  document.getElementById("editContactModal").classList.remove("d_none");
  clearEditErrorAlerts();
  setTimeout(() => {
    document.getElementById("editContactContainer").style.left = "50%";
  }, 50);
}

export function editUserFeedback() {
  editUserFeedbackRef.classList.remove("d_none");

  setTimeout(() => {
    if (window.innerWidth < 1400) {
      editUserFeedbackRef.style.left = "calc(50% - 163px)";
    } else {
      editUserFeedbackRef.style.left = "746px";
    }
  }, 500);
  setTimeout(() => {
    editUserFeedbackRef.style.left = "100%";
  }, 3000);
  setTimeout(() => {
    editUserFeedbackRef.classList.add("d_none");
  }, 4000);
}

export function hideEditChosenUserDialog() {
  document.getElementById("editContactContainer").style.left = "150%";
  setTimeout(() => {
    document.getElementById("editContactModal").classList.add("d_none");
  }, 550);
}

export function hideEditChosenUserDialogFromBG(event) {
  if (event.target.id == "editContactModal") {
    hideEditChosenUserDialog();
  } else {
    return;
  }
}

export function showConfirmDeleteUserDialog(id) {
  confirmDeleteUserModalRef.classList.remove("d_none");
  sureToDeleteContactBtnRef.addEventListener("click", () => {
    deleteChosenUser(id);
  });
}

export function hideConfirmDeleteUserDialog() {
  document.getElementById("confirmDeleteUserModal").classList.add("d_none");
}

export function hideConfirmDeleteUserDialogFromBG(event) {
  if (event.target.id == "confirmDeleteUserModal") {
    hideConfirmDeleteUserDialog();
  } else {
    return;
  }
}
