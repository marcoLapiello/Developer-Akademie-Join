import { renderContactList } from "../components/contactList/contactList.js";
renderContactList();

import { showAddNewUserDialog, hideAddNewUserDialog } from "../components/contactModal/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;

import { addContact, deleteChoosenUser, loadUsers } from "../js/apiService.js";
window.addContact = addContact;
window.deleteChoosenUser = deleteChoosenUser;

export let addContactNameInputRef = document.getElementById("addContactNameInput");
export let addContactEmailInputRef = document.getElementById("addContactEmailInput");
export let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");

export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}

// später diese funktion in eine "onload init funktion packen"
getUsersArray();
