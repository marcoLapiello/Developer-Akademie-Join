import { getUsersArray } from "../../js/script.js";

let chosenUsers = [];

function getUserDropdownList() {
  return /*html*/ `
    <div class="userDropdownList"></div>
  `;
}

function getUserListItem(userArray, index) {
  // console.log(userArray[index][1].id);
  
  return /*html*/ `
    <div id="userListItem${index}" class="userListItem">
      <div class="initialsNameWrapper">
        <div id="initialsBox${index}" class="initialsBox" style="background-color: ${userArray[index][1].user_color}">
          <span id="initials${index}" class="initials">${userArray[index][1].profile.initials}</span>
        </div>
        <p>${userArray[index][1].profile.first_name} ${userArray[index][1].profile.last_name}</p>
      </div>
      
      <input onchange="selectUser('${userArray[index][1].id}')" type="checkBox">
    </div>
  `;
}

export async function renderUserDropdownList() {
  let userArray = await getUsersArray();
  
  for (let index = 0; index < userArray.length; index++) {
    document.getElementById("contactsToAssign").innerHTML += getUserListItem(userArray, index);
  }
}

export function openCloseDropdown(arrow, content) {
  document.getElementById(arrow).classList.toggle("rotatedArrow");
  document.getElementById(content).classList.toggle("d_none");
}

export function selectUser(userId){
  if (chosenUsers.includes(userId)) {
    chosenUsers.pop(userId);
  } else {
    chosenUsers.push(userId)
  }
  console.log(chosenUsers);
  
}