/**
 * @module "contactDetails.js"
 */

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
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

/**
 * Imports the function to render the contact list.
 *
 * @module contactList
 * @function renderContactList - Renders the contact list on the user interface.
 */
import { renderContactList } from "../contactList/contactList.js";

/**
 * A reference to the contact details element in the DOM.
 *
 * @type {HTMLElement}
 */
const contactDetailsRef = document.getElementById("contactDetails");

/**
 * A reference to the contact list element in the DOM.
 *
 * @type {HTMLElement}
 */
const contactListRef = document.getElementById("contactList");

/**
 * A variable to store the ID of the selected user.
 *
 * @type {number|null}
 */
let selectedUserId = null;

/**
 * A flag indicating whether a process is currently running.
 *
 * @type {boolean}
 */
let isProcessing = false;

/**
 * Handles the selection of a user by their ID. If the user is already selected and reload is false,
 * it deselects the user. Otherwise, it selects the user and processes the selection.
 *
 * @param {number} id - The ID of the user to be selected.
 * @param {boolean} [reload=false] - Optional parameter to force reload the user selection.
 */
export function selectedUser(id, reload = false) {
  if (isProcessing) return;
  if (selectedUserId === id && !reload) {
    noneSelectedUser();
    isProcessing = true;
  } else {
    isUserSelected(id, reload);
    isProcessing = true;
  }
  setTimeout(() => {
    isProcessing = false;
  }, 600);
}

/**
 * Handles the selection of a user by their ID and updates the UI accordingly.
 *
 * @param {number|string} id - The ID of the user to be selected.
 * @param {boolean} reload - A flag indicating whether to reload the contact list.
 *
 * @returns {void}
 */
export function isUserSelected(id, reload) {
  if (reload) renderContactList();
  setTimeout(() => {
    highlightedSelectedUser(id);
  }, 100);
  switchMobile();
  renderContactDetails(id);
  if (!reload) scrollToUser(id);
  userPanelVisibility();
  selectedUserId = id;
}

/**
 * Handles the scenario when no user is selected.
 *
 * This function performs the following actions:
 * 1. Toggles the visibility of the user panel.
 * 2. Highlights the selected user.
 * 3. After a delay of 500ms, renders the contact details and resets the selected user ID to null.
 */
function noneSelectedUser() {
  userPanelVisibility();
  highlightedSelectedUser();
  setTimeout(() => {
    renderContactDetails();
    selectedUserId = null;
  }, 500);
}

/**
 * Highlights the selected user by adding a CSS class to the corresponding element.
 *
 * @param {string} id - The ID of the user to be highlighted.
 * @param {boolean} reload - A flag indicating whether the function should reload. If true, the function returns immediately.
 */
function highlightedSelectedUser(id, reload) {
  if (reload) return;
  const selectedUserButton = document.querySelectorAll(".userListItem");
  selectedUserButton.forEach((button) => {
    button.classList.remove("selectedUser");
  });
  if (!id) return;
  const selectedUserRef = document.getElementById(id);
  selectedUserRef.classList.add("selectedUser");
}

/**
 * Toggles the visibility of the user detail panel after a delay.
 *
 * This function waits for 250 milliseconds before toggling the "visible" class
 * on the element with the ID "userDetailPanel". If the element is found, its
 * visibility is toggled.
 */
function userPanelVisibility() {
  setTimeout(() => {
    const contactDetailsBoxRef = document.getElementById("userDetailPanel");
    if (contactDetailsBoxRef) contactDetailsBoxRef.classList.toggle("visible");
  }, 250);
}

/**
 *
 * Scrolls the page smoothly to the user element with the specified ID.
 *
 * @param {string} id - The ID of the user element to scroll to.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView} for more information.
 */
function scrollToUser(id) {
  const selectedUserElement = document.getElementById(id);
  if (selectedUserElement) selectedUserElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

/**
 * Toggles the display of contact details and contact list elements based on their current display styles.
 * If the contact details element is currently hidden, it will be shown and the contact list will be hidden.
 * If the contact list element is currently hidden, it will be shown and the contact details will be hidden.
 * Additionally, highlights the selected user when the contact details are shown.
 */
export function switchMobile() {
  const contactDetailsComputedStyle = window.getComputedStyle(contactDetailsRef);
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (contactDetailsComputedStyle.display === "none") {
    contactDetailsRef.style.display = "flex";
    contactListRef.style.display = "none";
    highlightedSelectedUser();
  } else if (contactListComputedStyle.display === "none") {
    contactDetailsRef.style.display = "none";
    contactListRef.style.display = "flex";
  }
}

/**
 * Updates the display style of contact details and contact list elements based on the window's inner width.
 *
 * - If the window width is 1401 pixels or more and both `contactDetailsRef` and `contactListRef` are defined:
 *   - If `contactListRef` is displayed as "flex", `contactDetailsRef` will also be displayed as "flex".
 * - If the window width is 1400 pixels or less and both `contactDetailsRef` and `contactListRef` are defined:
 *   - If `contactListRef` is displayed as "flex", `contactDetailsRef` will be hidden.
 * - If the window width matches the screen width and both `contactDetailsRef` and `contactListRef` are defined, and the screen width is greater than 1400 pixels:
 *   - Both `contactDetailsRef` and `contactListRef` will be displayed as "flex".
 *
 * @see {@link https://www.w3schools.com/jsref/prop_win_innerwidth.asp} for more information.
 */
function updateWidth() {
  const width = window.innerWidth;
  if (width >= 1401 && contactDetailsRef && contactListRef) {
    if (contactListRef.style.display === "flex") contactDetailsRef.style.display = "flex";
  } else if (width <= 1400 && contactDetailsRef && contactListRef) {
    if (contactListRef.style.display === "flex") contactDetailsRef.style.display = "none";
  }
  if (width == screen.width && contactDetailsRef && contactListRef && screen.width > 1400) {
    contactDetailsRef.style.display = "flex";
    contactListRef.style.display = "flex";
  }
}

/**
 * Event listener for the "resize" event on the window object.
 * Calls the `updateWidth` function whenever the window is resized.
 *
 * @event resize
 * @listens window#resize
 * @function updateWidth - The function that executes when the window is resized
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event} for more information.
 */
window.addEventListener("resize", updateWidth);

/**
 * Toggles the display of user profile buttons for mobile view.
 *
 * This function checks the current display style of the user profile buttons.
 * If the buttons are not displayed, it sets their display style to "flex" and
 * changes the background color of the mobile user profile buttons.
 * @see {@link https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp} for more information.
 */
export function userProfileButtonsMobile() {
  const userProfileButtonsRef = document.getElementById("userProfileButtons");
  const userProfileButtonsStyle = window.getComputedStyle(userProfileButtonsRef);
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (userProfileButtonsStyle.display === "none") {
    userProfileButtonsRef.style.display = "flex";
    userProfileButtonsMobileRef.style.backgroundColor = "#29abe2";
  }
}

/**
 * Adds a click event listener to the document to control the behavior of the mobile
 * user profile button (`userProfileButtonsMobile`). When the contact list is hidden,
 * this function hides the main profile buttons if the click is outside certain elements.
 * It also changes the background color of the mobile button with a delay.
 *
 * @event click - Triggered when any area within the document is clicked.
 * @param {Event} event - The click event object containing event-related details.
 */
document.addEventListener("click", (event) => {
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (!userProfileButtonsMobileRef) return;
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (contactListComputedStyle.display === "none") {
    if (event.target.id != "userProfileButtonsMobile" && event.target.id != "userProfileButtonsMobileImg") {
      const userProfileButtonsRef = document.getElementById("userProfileButtons");
      userProfileButtonsRef.style.display = "none";
      setTimeout(() => {
        userProfileButtonsMobileRef.style.backgroundColor = "#2a3647";
      }, 500);
    }
  }
});

/**
 * Renders the contact details for a given user ID.
 *
 * If no ID is provided and `contactDetailsRef` is available, it renders a fallback template.
 * Otherwise, it fetches the users array, finds the user by ID, and renders the user's details.
 *
 * @param {string} id - The ID of the user whose details are to be rendered.
 * @returns {Promise<void>} A promise that resolves when the contact details have been rendered.
 */
export async function renderContactDetails(id) {
  if (!id && contactDetailsRef) {
    contactDetailsRef.innerHTML = renderDetailsTemplateFallback();
    return;
  }
  let usersArray = await getUsersArray();
  let user = usersArray.find((user) => user[0] === id);
  if (contactDetailsRef) contactDetailsRef.innerHTML = renderDetailsTemplate(user);
}

/**
 * Renders the contact details and updates the contact list after deleting a user.
 *
 * @param {number} userId - The ID of the user to be deleted.
 */
export function renderAfterDelete(userId) {
  deleteChosenUser(userId);
  renderContactDetails();
  setTimeout(() => {
    renderContactList();
  }, 100);
}

/**
 * Generates the HTML template for rendering user contact details.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.user_color - The background color for the user's initials.
 * @param {Object} user.profile - The profile object containing user information.
 * @param {string} user.profile.first_name - The first name of the user.
 * @param {string} user.profile.last_name - The last name of the user.
 * @param {string} user.profile.email - The email address of the user.
 * @param {string} user.profile.phone - The phone number of the user.
 * @param {string} user.id - The unique identifier of the user.
 * @returns {string} The HTML template string for the user contact details.
 */
function renderDetailsTemplate(user) {
  return /*html*/ `   
    <div class="contactDetailsBox">
      <div class="headings" >
          <span class="heading">Contacts</span>
          <span class="subHeading" >Better with a team</span>
          <div id="switchMobileButton" class="switchMobileButton" onclick="switchMobile()">${returnIcon("arrowLeft")}</div>            
      </div>  
        <div id="userDetailPanel" class="userDetailPanel">
        <div class="userQuickInfo">
            <div class="userInitials" style="background-color: ${user[1].user_color};" >
            ${user[1].profile.first_name.toUpperCase().charAt(0)}  ${user[1].profile.last_name.toUpperCase().charAt(0)}
            </div>
            <div class="userActions">
                <div class="userName">
                ${user[1].profile.first_name} ${user[1].profile.last_name}
                </div>
                <div id="userProfileButtons" class="userProfileButtons">
                    <button class="editButton" 
                    onclick="showEditChosenUserDialog('${user[1].id}')">${returnIcon("edit")}Edit</button>
                    <button class="deleteButton" onclick="showConfirmDeleteUserDialog('${user[1].id}')">${returnIcon("delete")}Delete</button>
                </div>                
            </div>
        </div>
        <div class="contactInfo">
            <div class="heading">Contact Information</div>                    
        <div class="contactEmail">
            <div class="type">Email</div>
            <a href="mailto:${user[1].profile.email}">${user[1].profile.email}</a>            
        </div>
        <div class="contactPhone">
        <div class="type">Phone</div>
            <a href="tel:${user[1].profile.phone}">${user[1].profile.phone}</a>
        </div>
        </div>  
        <button onclick="userProfileButtonsMobile()" id="userProfileButtonsMobile" class="userProfileButtonsMobile">
          <img id="userProfileButtonsMobileImg" class="userProfileButtonsMobileImg" onclick="userProfileButtonsMobile()" src="./assets/icons/more_vert.png" alt="">
        </button>        
      </div>
    </div> 
  `;
}

/**
 * Generates the fallback HTML template for the contact details section.
 *
 * @returns {string} The HTML string for the contact details fallback template.
 */
function renderDetailsTemplateFallback() {
  return /*html*/ `
    <div class="contactDetailsBox" >
      <div class="headings" >
          <span class="heading">Contacts</span>
          <span class="subHeading" >Better with a team</span>
          <div id="switchMobileButton" class="switchMobileButton"  onclick="switchMobile()">${returnIcon("arrowLeft")}</div>
      </div>
    </div>
  `;
}
