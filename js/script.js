import { renderContactList } from "../components/contactList/contactList.js";
renderContactList();

import { renderContactDetails, renderAfterDelete, selectedUser, switchMobile } from "../components/contactDetails/contactDetails.js";
renderContactDetails();
window.renderContactDetails = renderContactDetails;
window.renderAfterDelete = renderAfterDelete;
window.selectedUser = selectedUser;
window.switchMobile = switchMobile;

import { renderSidebar } from "../components/sidebar/sidebar.js";
renderSidebar();

import {
  showAddNewUserDialog,
  hideAddNewUserDialog,
  showEditChosenUserDialog,
  hideEditChosenUserDialog,
  hideConfirmDeleteUserDialog,
  showConfirmDeleteUserDialog,
} from "../components/contactModal/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;
window.showEditChosenUserDialog = showEditChosenUserDialog;
window.hideEditChosenUserDialog = hideEditChosenUserDialog;
window.hideConfirmDeleteUserDialog = hideConfirmDeleteUserDialog;
window.showConfirmDeleteUserDialog = showConfirmDeleteUserDialog;

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
export let confirmDeleteUserModalRef = document.getElementById("confirmDeleteUserModal");

export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}

// später diese Funktion in eine "onload init Funktion packen"
getUsersArray();
