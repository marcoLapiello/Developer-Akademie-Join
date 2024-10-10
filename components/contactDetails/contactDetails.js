import { returnIcon } from "../icons.js";
import { getUsersArray } from "../../js/script.js";

export function selectedUser(id) {
  switchMobile();
  renderContactDetails(id);
}

export function switchMobile() {
  const contactDetailsRef = document.getElementById("contactDetails");
  const contactListRef = document.getElementById("contactList");
  const contactDetailsComputedStyle = window.getComputedStyle(contactDetailsRef);
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (contactDetailsComputedStyle.display === "none") {
    contactDetailsRef.style.display = "flex";
    contactListRef.style.display = "none";
  } else if (contactListComputedStyle.display === "none") {
    contactDetailsRef.style.display = "none";
    contactListRef.style.display = "flex";
  }
}

function updateWidth() {
  const width = window.innerWidth; // https://www.w3schools.com/jsref/prop_win_innerwidth.asp
  if (width >= 1401) {
    const contactDetailsRef = document.getElementById("contactDetails");
    const contactListRef = document.getElementById("contactList");
    if (contactListRef.style.display === "flex") {
      contactDetailsRef.style.display = "flex";
    }
  } else if (width <= 1400) {
    const contactDetailsRef = document.getElementById("contactDetails");
    const contactListRef = document.getElementById("contactList");
    if (contactListRef.style.display === "flex") {
      contactDetailsRef.style.display = "none";
    }
  }
}
window.addEventListener("resize", updateWidth); // https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event

export function userProfileButtonsMobile() {
  const userProfileButtonsRef = document.getElementById("userProfileButtons");
  const userProfileButtonsStyle = window.getComputedStyle(userProfileButtonsRef);
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (userProfileButtonsStyle.display === "none") {
    userProfileButtonsRef.style.display = "flex";
    userProfileButtonsMobileRef.style.display = "none";
  }
}

document.addEventListener("click", (event) => {
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (!userProfileButtonsMobileRef) return;
  const userProfileButtonsMobileStyle = window.getComputedStyle(userProfileButtonsMobileRef);
  const contactListRef = document.getElementById("contactList");
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (userProfileButtonsMobileStyle.display === "none" && contactListComputedStyle.display === "none") {
    if (event.target.id != "userProfileButtonsMobile" && event.target.id != "userProfileButtonsMobileImg") {
      const userProfileButtonsRef = document.getElementById("userProfileButtons");
      userProfileButtonsRef.style.display = "none";
      userProfileButtonsMobileRef.style.display = "block";
    }
  }
});

export async function renderContactDetails(id) {
  const contactDetailsRef = document.getElementById("contactDetails");
  if (!id && contactDetailsRef) {
    contactDetailsRef.innerHTML = renderDetailsTemplateFallback();
    return;
  }
  let usersArray = await getUsersArray();
  let user = usersArray.find((user) => user[0] === id);
  if (contactDetailsRef) contactDetailsRef.innerHTML = renderDetailsTemplate(user);
}

export function renderAfterDelete(userId) {
  deleteChosenUser(userId);
  renderContactDetails();
  setInterval(() => {
    renderContactList();
  }, 100);
}

function renderDetailsTemplate(user) {
  return /*html*/ `
      <div class="contactDetailsBox" >
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
            <div class="switchMobileButton" onclick="switchMobile()">${returnIcon("arrowLeft")}</div>            
        </div>        
        <div class="userQuickInfo">
            <div class="userInitials" >
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
          <img id="userProfileButtonsMobileImg" class="userProfileButtonsMobileImg" onclick="userProfileButtonsMobile()" src="../../assets/icons/more_vert.png" alt="">
        </button>
      </div>
    `;
}

function renderDetailsTemplateFallback() {
  return /*html*/ `
      <div class="contactDetailsBox" >
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
            <div class="switchMobileButton" onclick="switchMobile()">${returnIcon("arrowLeft")}</div>
        </div>
      </div>
    `;
}
