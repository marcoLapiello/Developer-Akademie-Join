// import { renderContactList } from "../components/contactList/contactList.js";
// renderContactList();

import { showAddNewUserDialog, hideAddNewUserDialog } from "../components/contactModal/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;

import { addContact } from "../js/apiService.js";
window.addContact = addContact;

export let addContactNameInputRef = document.getElementById("addContactNameInput");
export let addContactEmailInputRef = document.getElementById("addContactEmailInput");
export let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");
