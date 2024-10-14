import { renderContactList, aktivNewContactButton, removeAktivContactButton } from "../components/contactList/contactList.js";
renderContactList();
window.aktivNewContactButton = aktivNewContactButton;
window.removeAktivContactButton = removeAktivContactButton;

import { renderContactDetails, renderAfterDelete, selectedUser, switchMobile, userProfileButtonsMobile } from "../components/contactDetails/contactDetails.js";
renderContactDetails();
window.renderContactDetails = renderContactDetails;
window.renderAfterDelete = renderAfterDelete;
window.selectedUser = selectedUser;
window.switchMobile = switchMobile;
window.userProfileButtonsMobile = userProfileButtonsMobile;

import { renderSidebar } from "../components/sidebar/sidebar.js";
renderSidebar();

import { toggle_d_None, renderHeader } from "../components/header/header.js";
window.toggle_d_None = toggle_d_None;
renderHeader();

import {
  showAddNewUserDialog,
  hideAddNewUserDialog,
  showEditChosenUserDialog,
  hideEditChosenUserDialog,
  hideConfirmDeleteUserDialog,
  showConfirmDeleteUserDialog,
  validateNewPhonenumber,
  validateEditPhonenumber,
  hideAddNewUserDialogFromBG,
  hideConfirmDeleteUserDialogFromBG,
} from "../components/contactModal/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;
window.showEditChosenUserDialog = showEditChosenUserDialog;
window.hideEditChosenUserDialog = hideEditChosenUserDialog;
window.hideConfirmDeleteUserDialog = hideConfirmDeleteUserDialog;
window.showConfirmDeleteUserDialog = showConfirmDeleteUserDialog;
window.validateNewPhonenumber = validateNewPhonenumber;
window.validateEditPhonenumber = validateEditPhonenumber;
window.hideAddNewUserDialogFromBG = hideAddNewUserDialogFromBG;
window.hideConfirmDeleteUserDialogFromBG = hideConfirmDeleteUserDialogFromBG;

import { addContact, deleteChosenUser, loadUsers } from "../js/apiService.js";
window.addContact = addContact;
window.deleteChosenUser = deleteChosenUser;

export let addContactNameInputRef = document.getElementById("addContactNameInput");
export let addContactEmailInputRef = document.getElementById("addContactEmailInput");
export let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");

export let editContactNameInputRef = document.getElementById("editContactNameInput");
export let editContactEmailInputRef = document.getElementById("editContactEmailInput");
export let editContactPhoneInputRef = document.getElementById("editContactPhoneInput");
export let editNewUserLogoRef = document.getElementById("editNewUserLogo");
export let saveEditedUserButtonRef = document.getElementById("saveEditedUserButton");
export let deleteChosenUserBtnRef = document.getElementById("deleteChosenUserBtn");

export let addedUserFeedbackRef = document.getElementById("addedUserFeedback");
export let editUserFeedbackRef = document.getElementById("editUserFeedback");
export let confirmDeleteUserModalRef = document.getElementById("confirmDeleteUserModal");
export let sureToDeleteContactBtnRef = document.getElementById("sureToDeleteContactBtn");

export let contactModalRef = document.getElementById("contactModal");

export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}

// später diese Funktion in eine "onload init Funktion packen"
getUsersArray();
