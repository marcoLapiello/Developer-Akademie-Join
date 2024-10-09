import { renderContactList } from "../components/contactList/contactList.js";
renderContactList();

import { renderDetails } from "../components/contactDetails/contactDetails.js";
renderDetails();
window.renderDetails = renderDetails;

import { renderSidebar } from "../components/sidebar/sidebar.js";
renderSidebar();

import { showAddNewUserDialog, hideAddNewUserDialog } from "../components/contactModal/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;

import { addContact, deleteChosenUser, loadUsers } from "../js/apiService.js";
window.addContact = addContact;
window.deleteChosenUser = deleteChosenUser;

export let addContactNameInputRef = document.getElementById("addContactNameInput");
export let addContactEmailInputRef = document.getElementById("addContactEmailInput");
export let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");

export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}

// später diese Funktion in eine "onload init Funktion packen"
getUsersArray();
