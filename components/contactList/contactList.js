/**
 * @module "contactList.js"
 */

/**
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

/**
 * Imports the function to retrieve an icon element for use in the user interface.
 *
 * @module icons
 * @function returnIcon - Generates and returns an HTML element representing the specified icon.
 * @param {string} iconName - The name or identifier of the icon to retrieve.
 * @returns {HTMLElement} - The HTML element representing the requested icon.
 */
import { returnIcon } from "../icons.js";

/**
 * Sorts an array of users by their first names in ascending order.
 *
 * This function retrieves an array of users, converts it to an array of values,
 * and sorts the users alphabetically by their first names using localeCompare.
 *
 * @returns {Promise<Array>} A promise that resolves to the sorted array of users.
 *
 * @see {@link https://www.w3schools.com/jsref/jsref_object_values.asp|Object.values}
 * @see {@link https://www.w3schools.com/js/js_array_sort.asp|Array.prototype.sort}
 * @see {@link https://www.w3schools.com/jsref/jsref_localecompare.asp|String.prototype.localeCompare}
 */
async function sortUsers() {
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
 * Groups users by the first letter of their first name after sorting and filtering them.
 *
 * This function first sorts the users using the `sortUsers` function, then filters out users
 * whose password is an empty string. It then groups the users by the first letter of their
 * first name (case-insensitive) and returns an object where the keys are the first letters
 * and the values are arrays of users.
 *
 * @returns {Promise<Object>} A promise that resolves to an object where keys are the first
 * letters of users' first names and values are arrays of users.
 */
async function groupedUsers() {
  let sortedUsersArray = await sortUsers();
  sortedUsersArray = sortedUsersArray.filter((user) => user[1].password === "");
  let groupedUsersObjekt = {};
  sortedUsersArray.forEach((user) => {
    const firstLetter = user[1].profile.first_name.toUpperCase().charAt(0);
    if (!groupedUsersObjekt[firstLetter]) groupedUsersObjekt[firstLetter] = [];
    groupedUsersObjekt[firstLetter].push(user);
  });
  return groupedUsersObjekt;
}

/**
 * Activates the new contact button by changing its background color and displaying the add new user dialog.
 *
 * This function targets two elements:
 * 1. An element with the ID "newContactButtonMobile" and changes its background color to "#29abe2".
 * 2. An element with the class "newContactButton" and changes its background color to "#091931".
 *
 * After updating the styles, it calls the `showAddNewUserDialog` function to display the dialog for adding a new user.
 */
export function aktivNewContactButton() {
  const newContactButtonMobileRef = document.getElementById("newContactButtonMobile");
  const newContactButtonRef = document.querySelector(".newContactButton");
  if (newContactButtonMobileRef) newContactButtonMobileRef.style.backgroundColor = "#29abe2";
  if (newContactButtonRef) newContactButtonRef.style.backgroundColor = "#091931";
  showAddNewUserDialog();
}

/**
 * Changes the background color of elements with IDs "newContactButtonMobile" and
 * class "newContactButton" to "#2a3647" after a delay of 500 milliseconds.
 *
 * This function is typically used to reset the appearance of contact buttons
 * to their default state.
 */
export function removeAktivContactButton() {
  setTimeout(() => {
    const newContactButtonMobileRef = document.getElementById("newContactButtonMobile");
    const newContactButtonRef = document.querySelector(".newContactButton");
    if (newContactButtonMobileRef) newContactButtonMobileRef.style.backgroundColor = "#2a3647";
    if (newContactButtonRef) newContactButtonRef.style.backgroundColor = "#2a3647";
  }, 500);
}

/**
 * Renders the contact list by grouping users alphabetically and updating the DOM.
 *
 * This function fetches grouped users, constructs the HTML for the contact list,
 * and updates the inner HTML of the element with the ID "contactList".
 *
 * @async
 * @function renderContactList
 * @returns {Promise<void>} A promise that resolves when the contact list has been rendered.
 */
export async function renderContactList() {
  const contactListRef = document.getElementById("contactList");
  let groupedUsersObj = await groupedUsers();
  let renderList = "";
  renderList += renderContactListHeader();
  Object.keys(groupedUsersObj).forEach((letter) => {
    renderList += renderContactListContent(letter);
    groupedUsersObj[letter].forEach((user) => {
      renderList += renderContactListUsers(user);
    });
    renderList += /*html*/ `</ul></div> `;
  });
  renderList += renderContactListButtonMobile();
  if (contactListRef) contactListRef.innerHTML = renderList;
}

window.renderContactList = renderContactList;

/**
 * Renders the header for the contact list, including a button to add a new contact.
 *
 * @returns {string} The HTML string for the contact list header.
 */
function renderContactListHeader() {
  return /*html*/ `
      <div class="contactListHeader" >
        <button class="newContactButton" onclick="aktivNewContactButton()">Add new Contact 
            ${returnIcon("person")}
        </button>
      </div>
  `;
}

/**
 * Generates the HTML content for a contact list section based on the provided letter.
 *
 * @param {string} letter - The letter representing the section of the contact list.
 * @returns {string} The HTML string for the contact list section.
 */
function renderContactListContent(letter) {
  return /*html*/ `
      <div class="contactListContent">                  
      <span class="alphabetSection">${letter}</span>
      <hr class="horizontalLine">
      <ul>
  `;
}

/**
 * Renders a contact list item for a given user.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.id - The unique identifier for the user.
 * @param {string} user.user_color - The background color associated with the user.
 * @param {Object} user.profile - The profile object containing user profile details.
 * @param {string} user.profile.first_name - The first name of the user.
 * @param {string} user.profile.last_name - The last name of the user.
 * @param {string} user.profile.email - The email address of the user.
 * @returns {string} - The HTML string representing a contact list item.
 */
function renderContactListUsers(user) {
  return /*html*/ `
    <li onclick="selectedUser('${user[1].id}')" class="userListItem" id="${user[1].id}">
        <span class="userInitials" style="background-color: ${user[1].user_color};" >
          ${user[1].profile.first_name.toUpperCase().charAt(0)}  ${user[1].profile.last_name.toUpperCase().charAt(0)}
        </span>
        <div class="userProfile">
            <span class="userName">
                ${user[1].profile.first_name} ${user[1].profile.last_name}
            </span>             
            <a class="usersMail">${user[1].profile.email}</a>
        </div>
    </li>
  `;
}

/**
 * Renders the mobile contact list button.
 *
 * This function returns an HTML string that represents a button for adding a new contact on mobile devices.
 * The button includes an icon and an `onclick` event handler that triggers the `aktivNewContactButton` function.
 *
 * @returns {string} The HTML string for the mobile contact list button.
 */
function renderContactListButtonMobile() {
  return /*html*/ `
    <span id="newContactButtonMobile" class="newContactButtonMobile" onclick="aktivNewContactButton()">
        ${returnIcon("person")}
    </span>
  `;
}
