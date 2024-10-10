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
} from "../../js/script.js";

import { editExistingUser } from "../../js/apiService.js";

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

// let users = await getUsersArray();

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

export function getEditUserObject(id, user) {
  let fullName = editContactNameInputRef.value;
  let email = editContactEmailInputRef.value;
  let phoneNumber = editContactPhoneInputRef.value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let editUserProfile = {
    first_name: name,
    last_name: surname,
    initials: user[1].profile.initials,
    email: email,
    phone: phoneNumber,
  };
  console.log(editUserProfile);

  return editUserProfile;
}

export function showAddNewUserDialog() {
  document.getElementById("contactModal").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("addContactContainer").style.left = "50%";
  }, 50);
}

export function hideAddNewUserDialog() {
  document.getElementById("addContactContainer").style.left = "150%";
  setTimeout(() => {
    document.getElementById("contactModal").classList.add("d_none");
  }, 550);
}

export function newUserFeedback() {
  setTimeout(() => {
    document.getElementById("addedUserFeedback").classList.remove("d_none");
  },);
  setTimeout(() => {
    document.getElementById("addedUserFeedback").style.left = "750px";
  }, 650);
  setTimeout(() => {
    document.getElementById("addedUserFeedback").style.left = "150%";
  }, 3000);
  document.getElementById("addedUserFeedback").classList.add("d_none");
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
  document.getElementById("editContactModal").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("editContactContainer").style.left = "50%";
  }, 50);
}

export function hideEditChosenUserDialog() {
  document.getElementById("editContactContainer").style.left = "150%";
  setTimeout(() => {
    document.getElementById("editContactModal").classList.add("d_none");
  }, 550);
}
