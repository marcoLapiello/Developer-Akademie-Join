import { getUsersArray } from "../../js/script.js";

let selectedUsers = [];
let globalUserArray = [];

function getUserListItem(userArray, index) {
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
  globalUserArray = userArray;
  for (let index = 0; index < userArray.length; index++) {
    document.getElementById("contactsToAssign").innerHTML += getUserListItem(userArray, index);
  }
}










export function openCloseDropdown(arrow, content) {
  document.getElementById(arrow).classList.toggle("rotatedArrow");
  document.getElementById(content).classList.toggle("d_none");
}












export function selectUser(userId) {
  if (selectedUsers.includes(userId)) {
    selectedUsers.pop(userId);
  } else {
    selectedUsers.push(userId);
  }
  console.log(selectedUsers);
  console.log(globalUserArray);
  
  
  renderCurrentAssignation();
}

export function renderCurrentAssignation() {
  document.getElementById("currentAssignation").innerHTML = "";
  for (let index = 0; index < selectedUsers.length; index++) {
    let currentUserIndex = "";
    for (let id = 0; id < globalUserArray.length; id++) {
      const element = globalUserArray[id];
      if (element[0] == selectedUsers[index]) {
        currentUserIndex = id;
        console.log(currentUserIndex);
      }
    }
    document.getElementById("currentAssignation").innerHTML += getCurrentAssignationTemplate(selectedUsers[index], currentUserIndex);
  }
}

function getCurrentAssignationTemplate(userId, currentUserIndex) {
  return /*html*/ `
    <div id="initialsBox${userId}" class="initialsBox" style="background-color: ${globalUserArray[currentUserIndex][1].user_color}">
          <span id="initials${userId}" class="initials">${globalUserArray[currentUserIndex][1].profile.initials}</span>
        </div>
  `;
}
