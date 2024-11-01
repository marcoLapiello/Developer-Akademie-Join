/**
 * @module "userDropdown.js"
 */

/**
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

/**
 * An array to store the selected users.
 *
 * @type {Array}
 */
export let selectedUsers = [];

/**
 * A global array to store user data.
 *
 * @type {Array}
 */
let globalUserArray = [];

/**
 * Clears the list of selected users and updates the user dropdown list and current assignation display.
 *
 * This function resets the `selectedUsers` array to an empty state, then calls
 * `renderUserDropdownList` to refresh the user dropdown list and `renderCurrentAssignation`
 * to update the current assignation display.
 */
export function clearSelectedUsers() {
  selectedUsers = [];
  renderUserDropdownList();
  renderCurrentAssignation();
}

/**
 * Overwrites the currently selected users with a new array of users.
 *
 * @param {Array} usersArray - An array of user objects to set as the selected users.
 */
export function overwriteSelectedUsers(usersArray) {
  selectedUsers = usersArray;
}

/**
 * Clears the value of the user search field and re-renders the user dropdown list.
 *
 * This function checks if the search field with the ID "searchUserToAssign" has a value.
 * If it does, the value is cleared and the user dropdown list is re-rendered.
 */
export function removeUsersSearchFieldValue() {
  if (document.getElementById("searchUserToAssign").value.length > 0) {
    document.getElementById("searchUserToAssign").value = "";
    renderUserDropdownList();
  }
}

/**
 * Generates an HTML string for a user list item.
 *
 * @param {Array} userArray - An array of user objects.
 * @param {number} index - The index of the user in the array.
 * @param {boolean} isInputChecked - A flag indicating whether the checkbox should be checked.
 * @returns {string} The HTML string for the user list item.
 */
function getUserListItem(userArray, index, isInputChecked) {
  return /*html*/ `
    <div onclick="selectUser('${userArray[index][1].id}')" 
    id="${userArray[index][1].id}" 
    class="userListItem ${isInputChecked ? "checked" : ""}">
      <div class="initialsNameWrapper">
        <div id="initialsBox${index}" class="initialsBox" style="background-color: ${userArray[index][1].user_color}">
          <span id="initials${index}" class="initials">${userArray[index][1].profile.initials}</span>
        </div>
          <p>${userArray[index][1].profile.first_name} ${userArray[index][1].profile.last_name}</p>
        </div>      
      <input class="userCheckbox" id="userCheckbox${userArray[index][1].id}" onchange="selectUser('${
    userArray[index][1].id
  }'); removeUsersSearchFieldValue()" type="checkBox" 
      ${isInputChecked ? "checked" : ""}>
    </div>
  `;
}

/**
 * Filters the list of users by the name entered in the search input field.
 *
 * This function retrieves the value from the input field with the ID "searchUserToAssign",
 * converts it to lowercase, and then filters the user list items in the element with the ID "contactsToAssign".
 * If a user's name does not include the entered search string, the user is hidden by adding the "d_none" class.
 * Otherwise, the "d_none" class is removed to make the user visible.
 */
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

/**
 * Asynchronously sorts an array of users by their first names in alphabetical order.
 *
 * @async
 * @function sortUsersArray
 * @returns {Promise<Array>} A promise that resolves to a sorted array of users.
 */
async function sortUsersArray() {
  let usersArray = await getUsersArray();
  let sortedUsersArray = Object.values(usersArray);
  sortedUsersArray.sort((userA, userB) => {
    const firstNameA = userA[1].profile.first_name.toLowerCase();
    const firstNameB = userB[1].profile.first_name.toLowerCase();
    return firstNameA.localeCompare(firstNameB, "de");
  });
  return sortedUsersArray;
}

/**
 * Renders the user dropdown list by fetching the users array, filtering out users with passwords,
 * and inserting the user list items into the dropdown.
 *
 * @async
 * @function renderUserDropdownList
 */
export async function renderUserDropdownList() {
  document.getElementById("contactsToAssign").innerHTML = "";
  let userArray = await sortUsersArray();
  globalUserArray = userArray;
  userArray = userArray.filter((user) => user[1].password === "");
  for (let index = 0; index < userArray.length; index++) {
    let currentUserId = userArray[index][1].id;
    let isInputChecked = false;
    if (selectedUsers.length > 0) {
      for (let id = 0; id < selectedUsers.length; id++) {
        if (selectedUsers[id] == currentUserId) isInputChecked = true;
      }
    }
    document.getElementById("contactsToAssign").insertAdjacentHTML("beforeend", getUserListItem(userArray, index, isInputChecked));
  }
  renderCurrentAssignation();
}

/**
 * Toggles the visibility of a dropdown menu by opening it if it is currently closed,
 * or closing it if it is currently open.
 *
 * @param {string} arrow - The identifier for the arrow element associated with the dropdown.
 * @param {string} content - The identifier for the content element of the dropdown.
 */
export function openCloseDropdown(arrow, content) {
  if (document.getElementById(content).classList.contains("d_none")) {
    openUsersDropdownList(arrow, content);
  } else {
    closeUsersDropdownList(arrow, content);
  }
}

/**
 * Opens a dropdown list by adding and removing specific CSS classes and styles.
 *
 * @param {string} arrow - The ID of the arrow element to rotate.
 * @param {string} content - The ID of the content element to display.
 *
 * The function performs the following actions:
 * 1. Adds the "rotatedArrow" class to the element with the specified arrow ID.
 * 2. Removes the "d_none" class from the element with the specified content ID.
 * 3. If the content ID is "contactsToAssign", it changes the border color of the "assignedToDropdown" element to "#29abe2".
 * 4. If the content ID is "categorySelectionContainer", it changes the border color of the "categoryDropdown" element to "#29abe2".
 */
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

/**
 * Opens the user dropdown from the user input if it is currently hidden.
 * If the dropdown is already visible, the function will return without doing anything.
 *
 * @async
 * @function openUserDropdownFromUserInput
 * @returns {Promise<void>} A promise that resolves when the dropdown is opened.
 */
export async function openUserDropdownFromUserInput() {
  if (document.getElementById("contactsToAssign").classList.contains("d_none")) {
    await renderUserDropdownList();
    openUsersDropdownList("assignedToDropdownArrow", "contactsToAssign");
  } else {
    return;
  }
}

/**
 * Closes the dropdown list for users and updates the UI accordingly.
 *
 * @param {string} arrow - The ID of the arrow element to be rotated.
 * @param {string} content - The ID of the content element to be hidden.
 */
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

/**
 * Closes dropdowns from the window based on the event target and content visibility.
 *
 * @param {Event} event - The event object triggered by the window click.
 * @param {string} content - The ID of the dropdown content to check visibility.
 */
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

/**
 * Toggles the selection of a user by their userId.
 * Updates the checkbox state and the visual representation of the user item.
 * Adds or removes the userId from the selectedUsers array.
 * Calls renderCurrentAssignation to update the UI with the current selection.
 *
 * @param {string} userId - The ID of the user to be selected or deselected.
 */
export function selectUser(userId) {
  const checkbox = document.getElementById(`userCheckbox${userId}`);
  const userItem = document.getElementById(userId);
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    userItem.classList.add("checked");
    if (!selectedUsers.includes(userId)) selectedUsers.push(userId);
  } else {
    userItem.classList.remove("checked");
    const index = selectedUsers.indexOf(userId);
    if (index > -1) selectedUsers.splice(index, 1);
  }
  renderCurrentAssignation();
}

/**
 * Renders the current assignation of users by updating the inner HTML of the element with the ID "currentAssignation".
 * It iterates through the `selectedUsers` array and finds the corresponding user in the `globalUserArray`.
 * For each selected user, it appends the result of `getCurrentAssignationTemplate` to the "currentAssignation" element.
 *
 * @function
 */
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

/**
 * Generates the HTML template for the current user's assignation.
 *
 * @param {number} userId - The unique identifier for the user.
 * @param {number} currentUserIndex - The index of the current user in the globalUserArray.
 * @returns {string} The HTML template string for the user's assignation.
 */
function getCurrentAssignationTemplate(userId, currentUserIndex) {
  return /*html*/ `
    <div id="initialsBox${userId}" class="initialsBox" style="background-color: ${globalUserArray[currentUserIndex][1].user_color}">
        <span id="initials${userId}" class="initials">${globalUserArray[currentUserIndex][1].profile.initials}</span>
    </div>
  `;
}
