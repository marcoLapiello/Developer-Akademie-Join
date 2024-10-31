/**
 * @module "header.js"
 */

/**
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

/**
 * Toggles the "d_none" class on the element with the ID "dropDown".
 * This function is used to show or hide the user menu.
 */
export function openCloseUserMenu(event) {
  const userMenuRef = document.getElementById("dropDown");
  event.stopPropagation();
  if (userMenuRef.classList.contains("d_none")) {
    userMenuRef.classList.remove("d_none");
    document.addEventListener("click", closeMenuOnOutsideClick);
    userMenuRef.addEventListener("click", (element) => element.stopPropagation());
  } else {
    userMenuRef.classList.add("d_none");
    document.removeEventListener("click", closeMenuOnOutsideClick);
  }
}

/**
 * Closes the user menu if a click is detected outside of it.
 *
 * @param {Event} event - The click event that triggers the function.
 */
function closeMenuOnOutsideClick(event) {
  const userMenuRef = document.getElementById("dropDown");
  if (!userMenuRef.contains(event.target)) {
    userMenuRef.classList.add("d_none");
    document.removeEventListener("click", closeMenuOnOutsideClick);
  }
}

/**
 * Renders the header by fetching the logged-in user's initials and updating the header element.
 *
 * This function retrieves the logged-in user's ID from local storage, fetches the user data,
 * and updates the header element with the user's initials.
 *
 * @async
 * @function renderHeader
 * @returns {Promise<void>} A promise that resolves when the header is rendered.
 */
export async function renderHeader() {
  const headerRef = document.getElementById("header");
  const loggedInUserIdJson = localStorage.getItem("loggedInUserId");
  const loggedInUserId = JSON.parse(loggedInUserIdJson);
  let initials;
  if (loggedInUserIdJson && loggedInUserId.userID) {
    const currentUser = loggedInUserId.userID;
    const userArray = await getUsersArray();
    const user = userArray.find(([user]) => user === currentUser)[1];
    initials = user.profile.initials;
  }
  if (headerRef) headerRef.innerHTML += renderHeaderTemplate(initials);
}

/**
 * Checks if a user is logged in by verifying the presence of a user ID in local storage.
 *
 * @returns {boolean} - Returns `true` if a user is logged in, otherwise `false`.
 */
function hideSidebarFromUnLogged() {
  let loggedInData = localStorage.getItem("loggedInUserId");
  if (!loggedInData) {
    return false;
  } else {
    return true;
  }
}

/**
 * Renders the header template for the Kanban Project Management Tool.
 *
 * @param {string} initials - The initials of the user to be displayed in the header. If not provided, defaults to "G".
 * @returns {string} The HTML string for the header template.
 */
function renderHeaderTemplate(initials) {
  return /*html*/ `
      <div class = "headerText">
      <span>Kanban Project Management Tool</span>
      </div>
      <div class="header-rightSide ${hideSidebarFromUnLogged() ? "" : "d_none"}">
        <a href="./help.html">
          <img src="./assets/icons/questionMark_small.png" alt="Help" />
        </a>
        <div onclick="openCloseUserMenu(event)" id="user_Profile_Initials" class="user-Profile-Initials">
          <span>${initials ? initials.toUpperCase() : "G"}</span>
          <div class="dropDown d_none" id="dropDown">
          <div class="help">
            <a href="./help.html">Help</a>
          </div>
          <div class="legalNotice">
            <a href="./legalNotice.html">Legal Notice</a>
          </div>
          <div class="privacyPolicy">
            <a href="./privacyPolicy.html">Privacy Policy</a>
          </div>
          <div class="logOut">
            <a onclick="userLogOut()">Log out</a>
          </div>
        </div>
      </div>
    `;
}
