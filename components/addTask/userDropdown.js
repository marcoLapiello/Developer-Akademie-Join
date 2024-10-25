import { getUsersArray } from "../../js/script.js";

export let selectedUsers = [];
let globalUserArray = [];

export function clearSelectedUsers() {
  selectedUsers = [];
  renderUserDropdownList();
  renderCurrentAssignation();
}

export function overwriteSelectedUsers(usersArray) {
  selectedUsers = usersArray;
}

export function removeUsersSearchFieldValue() {
  if (document.getElementById("searchUserToAssign").value.length > 0) {
    document.getElementById("searchUserToAssign").value = "";
    renderUserDropdownList();
  }
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
      
      <input id="userCheckbox${userArray[index][1].id}" onchange="selectUser('${userArray[index][1].id}'); removeUsersSearchFieldValue()" type="checkBox" ${
    isInputChecked ? "checked" : ""
  }>
    </div>
  `;
}

export function filterUsersByName() {
  let filterLetters = document.getElementById("searchUserToAssign").value.toLowerCase();
  let usersListArray = Array.from(document.getElementById("contactsToAssign").querySelectorAll(".userListItem"));
  usersListArray.forEach((user) => {
    let userName = user.childNodes[1].lastElementChild.innerText.toLowerCase();
    if (!userName.includes(filterLetters)) {
      user.classList.add("d_none");
    } else {
      user.classList.remove("d_none");
    }
  });
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
  if (document.getElementById(content).classList.contains("d_none")) {
    openUsersDropdownList(arrow, content);
  } else {
    closeUsersDropdownList(arrow, content);
  }
}

export function openUsersDropdownList(arrow, content) {
  document.getElementById(arrow).classList.add("rotatedArrow");
  document.getElementById(content).classList.remove("d_none");
  if (content == "contactsToAssign") {
    document.getElementById("assignedToDropdown").style.borderColor = "#29abe2";
  }
  if (content == "categorySelectionContainer") {
    document.getElementById("categoryDropdown").style.borderColor = "#29abe2";
  }
}

export async function openUserDropdownFromUserInput() {
  if (document.getElementById("contactsToAssign").classList.contains("d_none")) {
    await renderUserDropdownList();
    openUsersDropdownList("assignedToDropdownArrow", "contactsToAssign");
  } else {
    return;
  }
}

export function closeUsersDropdownList(arrow, content) {
  document.getElementById(arrow).classList.remove("rotatedArrow");
  document.getElementById(content).classList.add("d_none");
  if (content == "contactsToAssign") {
    document.getElementById("assignedToDropdown").style.borderColor = "#d1d1d1";
  }
  if (content == "categorySelectionContainer") {
    document.getElementById("categoryDropdown").style.borderColor = "#d1d1d1";
  }
  removeUsersSearchFieldValue();
}

export function closeDropdownFromWindow(event, content) {
  let isDropdownVisible = !document.getElementById(content).classList.contains("d_none");
  let isCategoryDropVisible = !document.getElementById("categorySelectionContainer").classList.contains("d_none");
  let isSubtaskContainer = event.target.id == "subtaskContainer";
  let isAddTaskContainer = event.target.id == "addTaskContainer";
  let isAddTaskMiddleLeft = event.target.id == "addTaskMiddleLeft";
  let isAddTaskMiddleRight = event.target.id == "addTaskMiddleRight";
  if (isDropdownVisible) {
    if (isSubtaskContainer || isAddTaskContainer || isAddTaskMiddleLeft || isAddTaskMiddleRight) {
      openCloseDropdown("assignedToDropdownArrow", "contactsToAssign");
    }
  }
  if (isCategoryDropVisible) {
    if (isSubtaskContainer || isAddTaskContainer || isAddTaskMiddleLeft || isAddTaskMiddleRight) {
      openCloseDropdown("categoryDropdownArrow", "categorySelectionContainer");
    }
  }
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
