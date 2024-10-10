import { getUsersArray } from "../../js/script.js";
import { returnIcon } from "../icons.js";

async function sortUsers() {
  let usersArray = await getUsersArray();
  let sortedUsersArray = Object.values(usersArray); // https://www.w3schools.com/jsref/jsref_object_values.asp
  sortedUsersArray.sort((userA, userB) => {
    // https://www.w3schools.com/js/js_array_sort.asp
    const firstNameA = userA[1].profile.first_name.toLowerCase();
    const firstNameB = userB[1].profile.first_name.toLowerCase();
    return firstNameA.localeCompare(firstNameB, "de"); // https://www.w3schools.com/jsref/jsref_localecompare.asp
  });
  return sortedUsersArray;
}

async function groupedUsers() {
  let sortedUsersArray = await sortUsers();
  let groupedUsersObjekt = {};
  sortedUsersArray.forEach((user) => {
    const firstLetter = user[1].profile.first_name.toUpperCase().charAt(0); // Get the first letter of the last name and convert it to uppercase
    if (!groupedUsersObjekt[firstLetter]) {
      groupedUsersObjekt[firstLetter] = []; // Create an empty array for the first letter if it doesn't exist
    }
    groupedUsersObjekt[firstLetter].push(user); // Add the user to the array for the first letter
  });
  return groupedUsersObjekt;
}

export async function renderContactList() {
  const contactListRef = document.getElementById("contactList");
  let groupedUsersObj = await groupedUsers();
  let renderList = "";
  renderList += /*html*/ `  
                <div class="contactListHeader" >
                <button class="newContactButton" onclick="showAddNewUserDialog()">Add new Contact 
                    ${returnIcon("person")}
                </button>
                </div>
              `;
  Object.keys(groupedUsersObj).forEach((letter) => {
    // Object.keys() method returns an array of a given object's own property names ( A. B , C , D )
    renderList += /*html*/ `                
                <div class="contactListContent">                  
                <span class="alphabetSection">${letter}</span>
                <hr class="horizontalLine">
                <ul>`; // Create a list of users for each letter
    groupedUsersObj[letter].forEach((user) => {
      // Loop through each user in the array for the letter
      renderList += /*html*/ `        
            <li onclick="selectedUser('${user[1].id}')" class="userListItem">
                <span class="userInitials" style="background-color: ${user[1].user_color};" >
                  ${user[1].profile.first_name.toUpperCase().charAt(0)}  ${user[1].profile.last_name.toUpperCase().charAt(0)}
                </span>
                <div class="userProfile">
                    <span class="userName">
                        ${user[1].profile.first_name} ${user[1].profile.last_name}
                    </span>             
                    <a class="usersMail">${user[1].profile.email}</a>
                </div>
            </li>`; // Add the user to the list. Name , Last Name , Email
    });
    renderList += /*html*/ `</ul></div> `; // Close the list for the letter
  });
  if (contactListRef) contactListRef.innerHTML = renderList;
}

window.renderContactList = renderContactList;
