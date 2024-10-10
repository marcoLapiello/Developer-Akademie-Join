import { returnIcon } from "../icons.js";
import { getUsersArray } from "../../js/script.js";

export async function renderContactDetails(id) {
  const contactDetailsRef = document.getElementById("contactDetails");
  if (!id && contactDetailsRef) {
    contactDetailsRef.innerHTML = renderDetailsTemplateFallback();
    return;
  }
  let usersArray = await getUsersArray();
  // let userId = id;
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
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
        </div>
        <div class="userQuickInfo">
            <div class="userInitials" >
            ${user[1].profile.initials}
            </div>
            <div class="userActions">
                <div class="userName">
                ${user[1].profile.first_name} ${user[1].profile.last_name}
                </div>
                <div class="userProfileButtons">
                    <button class="editButton" 
                    onclick="showEditChosenUserDialog('${user[1].id}')">${returnIcon("edit")}Edit</button>
                    <button class="deleteButton" onclick="renderAfterDelete('${user[1].id}')">${returnIcon("delete")}Delete</button>
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
    `;
}

function renderDetailsTemplateFallback() {
  return /*html*/ `
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
        </div>
    `;
}
