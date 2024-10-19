import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";
let currentDraggedElement; // Placeholder for the current dragged element

export function addNewTaskCategory(currentStatus) {
  console.log("Waiting for the modal to be implemented \n" + "Parameter: " + currentStatus); // Placeholder for the modal to be implemented
  renderTasks();
}
window.addNewTaskCategory = addNewTaskCategory;

export function renderTasks() {
  // Render all the tasks in the different categories
  renderTodoCards("todo");
  renderTodoCards("inProgress");
  renderTodoCards("awaitFeedback");
  renderTodoCards("done");
}

// Render the tasks in the different categories
export async function renderTodoCards(currentStatus) {
  const cardsRef = document.getElementById(`${currentStatus}Cards`);
  const cardsMenuRef = document.getElementById(`${currentStatus}Menu`);
  const tasksArray = await getTasksArray(); // Get the tasks array from the database
  if (cardsMenuRef) cardsMenuRef.innerHTML = renderCardsMenuTemplate(currentStatus); // Render the menu for each category
  if (cardsRef) cardsRef.innerHTML = ""; // Clear the cards for each category
  const todoTasks = tasksArray.filter((task) => task[1].status === `${currentStatus}`);
  if (todoTasks.length > 0) {
    for (const task of todoTasks) {
      const assignedUsers = await getAssignedUsers(task[1]); // Await the async function to get the assigned users ( needed for of loop)
      if (cardsRef) cardsRef.innerHTML += renderCardsTemplate(task[1], assignedUsers); // Render the tasks in the category if there are any tasks in the category (assignedUsers is needed for the initials of the assigned users)
    }
  } else {
    if (cardsRef) cardsRef.innerHTML += renderCardsFallbackTemplate(currentStatus); // Fallback if no tasks in the category
  }
  if (cardsRef) cardsRef.innerHTML += /*html*/ `<div class="draggableIndicator"></div>`; // Add the draggable indicator at the end of the category
}

// get the assigned users for the task
async function getAssignedUsers(task) {
  const filteredTask = Object.keys(task.assignedTo).filter((id) => id !== "placeholder"); // Filter the task to get the assigned users (filter out the placeholder)
  let usersArray = await getUsersArray();
  const matchedUsers = usersArray.filter((user) => filteredTask.includes(user[1].id)); // Match the users with the assigned users of the task (needed for the initials)
  let initialsHTML = "";
  matchedUsers.forEach((user) => {
    // Create the initials for the assigned users
    initialsHTML += /*html*/ `
        <span class="initials" style="background-color: ${user[1].user_color}">${user[1].profile.initials}</span>        
    `;
  });
  return initialsHTML;
}

// Translate the status to a more readable format
function translatedStatus(currentStatus) {
  let translatedStatus;
  if (currentStatus === "todo") {
    translatedStatus = "To do";
  } else if (currentStatus === "inProgress") {
    translatedStatus = "In progress";
  } else if (currentStatus === "awaitFeedback") {
    translatedStatus = "Await feedback";
  } else if (currentStatus === "done") {
    translatedStatus = "Done";
  } else {
    return currentStatus;
  }
  return translatedStatus;
}

// Render the menu for the categories
function renderCardsMenuTemplate(currentStatus) {
  let newCurrentStatus = translatedStatus(currentStatus);
  return /*html*/ `
    <div class="categoryMenu">
      <span class="title">${newCurrentStatus}</span>
      <button onclick="addNewTaskCategory('${currentStatus}')" class="addTask" >${returnIcon("plus")}</button> 
    </div>
  `;
}

// Render the tasks in the category (cards) with the assigned users and the progress bar if there are subtasks
function renderCardsTemplate(task, assignedUsers) {
  return /*html*/ `
  <div class="cardsContainer" id="cardsContainer">
    <div onclick="renderTaskDetailView('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" id="${task.id}" class="card"> 
        <div class="taskHeader">
          <div class="category" style="background-color: ${task.categoryColor}">${task.category}</div>
          <button onclick="toggleMobileMenu(event,'${task.id}')" class="moveToButton">${returnIcon("dots")}</button>
           <div id="mobileMenu${task.id}" class="mobileMenu d_none">
            ${task.status !== "todo" ? `<button onclick="moveToCategoryMobile(event,'todo','${task.id}')" class="mobileMenuButton">To do</button>` : ""}
            ${task.status !== "inProgress" ? `<button onclick="moveToCategoryMobile(event,'inProgress','${task.id}')" class="mobileMenuButton">In Progress</button>` : ""}
            ${task.status !== "awaitFeedback" ? `<button onclick="moveToCategoryMobile(event,'awaitFeedback','${task.id}')" class="mobileMenuButton">Await Feedback</button>` : ""}
            ${task.status !== "done" ? `<button onclick="moveToCategoryMobile(event,'done','${task.id}')" class="mobileMenuButton">Done</button>` : ""}
           </div>          
        </div>
        <div class="titleDescriptionContainer">
            <div class="title">${task.title}</div>
            <div class="description">${task.description}</div>
        </div>
        ${
          Object.keys(task.subtasks).length > 1
            ? `<div class="statusSubtasks">
                    <progress class="progressBar" value="${task.progress}" max="100"></progress>
                    <span class="progressText">${Object.values(task.subtasks).filter((subtask) => subtask.isDone).length}/${Object.keys(task.subtasks).length - 1} Subtasks</span>
                </div>`
            : ""
        }
        <div class="assignedPriority">
            <div class="assignedTo">
            ${assignedUsers}
            </div>
            <div class="priority">
                ${returnIcon(`${task.priority.toLowerCase()}`, `${task.priority.toLowerCase()}Icon`)}
            </div>
        </div> 
    </div>    
  </div>
    `;
}

// Render the fallback if there are no tasks in the category
function renderCardsFallbackTemplate(currentStatus) {
  let newCurrentStatus = translatedStatus(currentStatus); // Translate the status to a more readable format
  return /*html*/ `
    <div class="cardsContainer">
        <div class="cardsFallback">
            <span class="fallbackText">No tasks ${newCurrentStatus}</span>
        </div>
    </div>
`;
}

function toggleMobileMenu(event, id) {
  const mobileMenuRef = document.getElementById(`mobileMenu${id}`);
  mobileMenuRef.classList.toggle("d_none");
  event.stopPropagation(); // Stop the propagation of the event
}
window.toggleMobileMenu = toggleMobileMenu;

//! Drag and Drop Functionality

// Start dragging the element
function startDragging(id) {
  currentDraggedElement = id; // Set the current dragged element
  const draggedElement = document.getElementById(id); // Get the dragged element by the id
  draggedElement.style.transform = "rotate(5deg)"; // Rotate the dragged element for a better visual experience
}
window.startDragging = startDragging;

// Stop dragging the element
function allowDrop(event) {
  event.preventDefault();
}
window.allowDrop = allowDrop;

function moveToCategoryMobile(event, category, id) {
  event.stopPropagation(); // Stop the propagation of the event
  moveToCategory(category, id);
}
window.moveToCategoryMobile = moveToCategoryMobile;

// Drop the element in the category and update the status of the task
async function moveToCategory(category, id = 0) {
  if (id !== 0) currentDraggedElement = id; // Set the current dragged element if the id is not 0
  const tasksArray = await getTasksArray(); // Get the tasks array from the database
  const task = tasksArray.find((task) => task[1].id === currentDraggedElement); // Find the task by the id
  task[1].status = category; // Update the status of the task to the new category
  patchTaskUpdate(task[1], currentDraggedElement); // Patch the task to the database with the new status by using the function patchTaskUpdate
}
window.moveToCategory = moveToCategory;

// add the highlight to the category when dragging starts
function addHighlightCategory() {
  const slotsRef = document.querySelectorAll(".draggableIndicator");
  slotsRef.forEach((slot) => {
    slot.classList.add("targetSlot");
  });
}
window.addHighlightCategory = addHighlightCategory;

// remove the highlight from the category when dragging ends
function removeHighlightCategory() {
  const slotsRef = document.querySelectorAll(".draggableIndicator");
  slotsRef.forEach((slot) => {
    slot.classList.remove("targetSlot");
  });
}
window.removeHighlightCategory = removeHighlightCategory;

const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app"; // Base URL for the database

// Patch the task to the database with the new status by using the fetch API
export async function patchTaskUpdate(updateData, id) {
  let response = await fetch(baseUrl + "/tasks/" + id + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  renderTasks(); // Render the tasks after the patch is successful
}

// Scroll horizontally when the mouse wheel is used in the scrollable containers
document.addEventListener(
  "wheel",
  (evt) => {
    const scrollContainers = ["todoCards", "inProgressCards", "awaitFeedbackCards", "doneCards"];
    scrollContainers.forEach((id) => {
      const scrollContainer = document.getElementById(id);
      if (scrollContainer && scrollContainer.contains(evt.target)) {
        const canScroll = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        if (canScroll) {
          evt.preventDefault();
          scrollContainer.scrollLeft += evt.deltaY * 4; // Scroll the container by the deltaY of the event * 4
        }
      }
    });
  },
  { passive: false } // Set passive to false to prevent the default behavior of the wheel event
);
