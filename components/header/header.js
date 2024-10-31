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
 * Generates the HTML template for the header section of the Kanban Project Management Tool.
 *
 * The header includes:
 * - A title section with the text "Kanban Project Management Tool".
 * - A right-side section with:
 *   - A help icon linking to the help page.
 *   - A user profile initials section that toggles a dropdown menu.
 *
 * The dropdown menu includes links to:
 * - Help page
 * - Legal Notice page
 * - Privacy Policy page
 * - Log out page
 *
 * @returns {string} The HTML template for the header section.
 */

function hideSidebarFromUnLogged() {
  let loggedInData = localStorage.getItem("loggedInUserId");
  if (!loggedInData) {
    return false;
  } else {
    return true;
  }
}

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
