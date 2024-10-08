let users = [];

const baseUrl ="https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

async function postData(path = "", data = {}) {
  let response = await fetch(baseUrl + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseAsJson = await response.json());
}

async function addContact() {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  
  let userInitials = name.charAt(0) + surname.charAt(0);

  let id = userInitials + Date.now();
  let user = {
    Name: name,
    Surname: surname,
    Id: id,
    UserInitials: userInitials,
  };

  let response = await fetch(baseUrl + "/user/" + id + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  return (responseAsJson = await response.json());
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
