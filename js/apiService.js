let users = [];

const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

import { getNewUser } from "../components/contactModal/contactModal.js";

export async function addContact() {
  let user = getNewUser();
  let id = user.id;

  let response = await fetch(baseUrl + "/user/" + id + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log(user, id);
}

async function loadContent() {
  let response = await fetch(baseUrl + ".json");
  let responseAsJson = await response.json();
  console.log(responseAsJson);
  users = Object.entries(responseAsJson.user);
  console.log(users);

  for (let index = 0; index < users.length; index++) {
    document.getElementById("content").innerHTML += /*html*/ `
    <div id="user">
      <p>${users[index][1].Name}</p>
      <p>${users[index][1].Surname}</p>
      <p id="initials">${users[index][1].UserInitials}</p>
    </div>
      
    `;
  }
}
