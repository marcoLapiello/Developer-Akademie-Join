import { renderContactList } from "../components/contactList/contactList.js";
renderContactList();

import { showAddNewUserDialog, hideAddNewUserDialog } from "../components/contactModal.js";
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;
