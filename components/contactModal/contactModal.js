import { addContactNameInputRef, addContactEmailInputRef, addContactPhoneInputRef } from "../../js/script.js";

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
    user_color: "",
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
}

export function hideAddNewUserDialog() {
  document.getElementById("contactModal").classList.add("d_none");
  console.log(addContactNameInputRef.value);
}
