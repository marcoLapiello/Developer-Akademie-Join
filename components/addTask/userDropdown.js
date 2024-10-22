import { getUsersArray } from "../../js/script.js";

export let selectedUsers = [];
let globalUserArray = [];

export function clearSelectedUsers() {
  selectedUsers = [];
  renderUserDropdownList();
  renderCurrentAssignation();
}

function getUserListItem(userArray, index, isInputChecked) {
  return /*html*/ `
    <div id="${userArray[index][1].id}" class="userListItem">
      <div class="initialsNameWrapper">
        <div id="initialsBox${index}" class="initialsBox" style="background-color: ${userArray[index][1].user_color}">
          <span id="initials${index}" class="initials">${userArray[index][1].profile.initials}</span>
        </div>
        <p>${userArray[index][1].profile.first_name} ${userArray[index][1].profile.last_name}</p>
      </div>
      
      <input id="userCheckbox${userArray[index][1].id}" onchange="selectUser('${userArray[index][1].id}')" type="checkBox" ${isInputChecked ? "checked" : ""}>
    </div>
  `;
}

export async function renderUserDropdownList() {
  document.getElementById("contactsToAssign").innerHTML = "";
  let userArray = await getUsersArray();
  globalUserArray = userArray;
  for (let index = 0; index < userArray.length; index++) {
    let currentUserId = userArray[index][1].id;
    let isInputChecked = false;
    if (selectedUsers.length > 0) {
      for (let id = 0; id < selectedUsers.length; id++) {
        if (selectedUsers[id] == currentUserId) {
          isInputChecked = true;
        }
      }
    }
    document.getElementById("contactsToAssign").insertAdjacentHTML("beforeend", getUserListItem(userArray, index, isInputChecked));
  }
  renderCurrentAssignation();
}

export function openCloseDropdown(arrow, content) {
  document.getElementById(arrow).classList.toggle("rotatedArrow");
  document.getElementById(content).classList.toggle("d_none");
}

export function selectUser(userId) {
  if (selectedUsers.includes(userId)) {
    let index = selectedUsers.indexOf(userId);
    selectedUsers.splice(index, 1);
  } else {
    selectedUsers.push(userId);
  }
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
