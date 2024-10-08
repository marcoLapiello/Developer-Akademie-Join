const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

import { getNewUser } from "../components/contactModal/contactModal.js";

// export let usersArray = [];

export async function addContact() {
  await patchNewUser();
  await loadUsers();
}

async function patchNewUser() {
  let newUser = getNewUser();
  let id = newUser.id;
  let response = await fetch(baseUrl + "/user/" + id + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
}

export async function loadUsers() {
  let response = await fetch(baseUrl + ".json");
  let responseAsJson = await response.json();
  let users = Object.entries(responseAsJson.user);
  return users;
}
