/**
 * @module taskCards
 */

import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";
import { patchTaskUpdate } from "../../js/tasksApiService.js";
import { openTaskModal } from "../addTask/addTask.js";

let currentDraggedElement;

/**
 * Adds a new task category based on the given status.
 * If the window width is greater than 1400 pixels, it opens a task modal.
 * Otherwise, it redirects to the addTask.html page with the status as a URL parameter.
 *
 * @param {string} status - The status of the task category to be added.
 */
export function addNewTaskCategory(status) {
  if (window.innerWidth > 1400) {
    openTaskModal(status);
  } else {
    window.location.href = `addTask.html#param=${status}`;
  }
}
window.addNewTaskCategory = addNewTaskCategory;

/**
 * Renders task cards based on the current and old categories.
 *
 * @param {string} [currentCategory="all"] - The current category to render tasks for.
 * @param {string} [oldCategory="all"] - The previous category to render tasks for.
 * @returns {Promise<void>} A promise that resolves when the tasks have been rendered.
 */
export async function renderTasks(currentCategory = "all", oldCategory = "all") {
  let tasksArray = await getTasksArray();
  if (currentCategory === "all" || oldCategory === "all") {
    renderTodoCards("todo", tasksArray);
    renderTodoCards("inProgress", tasksArray);
    renderTodoCards("awaitFeedback", tasksArray);
    renderTodoCards("done", tasksArray);
  } else if (currentCategory === oldCategory) {
    renderTodoCards(currentCategory, tasksArray);
  } else {
    renderTodoCards(currentCategory, tasksArray);
    renderTodoCards(oldCategory, tasksArray);
  }
}

/**
 * Renders the todo cards for a given status and tasks array.
 *
 * @param {string} currentStatus - The current status of the tasks to be rendered (e.g., 'todo', 'in-progress', 'done').
 * @param {Array} tasksArray - An array of tasks where each task is an array with the task details.
 * @returns {Promise<void>} A promise that resolves when the rendering is complete.
 */
export async function renderTodoCards(currentStatus, tasksArray) {
  const cardsRef = document.getElementById(`${currentStatus}Cards`);
  const cardsMenuRef = document.getElementById(`${currentStatus}Menu`);
  if (cardsMenuRef) cardsMenuRef.innerHTML = renderCardsMenuTemplate(currentStatus);
  if (cardsRef) cardsRef.innerHTML = "";
  const todoTasks = tasksArray.filter((task) => task[1].status === `${currentStatus}`);
  if (todoTasks.length > 0) {
    for (const task of todoTasks) {
      const assignedUsers = await getAssignedUsers(task[1]);
      if (cardsRef) cardsRef.innerHTML += renderCardsTemplate(task[1], assignedUsers);
    }
  } else {
    if (cardsRef) cardsRef.innerHTML += renderCardsFallbackTemplate(currentStatus);
  }
  if (cardsRef) cardsRef.innerHTML += /*html*/ `<div class="draggableIndicator"></div>`;
}

/**
 * Retrieves the HTML string of user initials for the assigned users of a task.
 *
 * This function filters out the placeholder from the assigned users, fetches the users array,
 * and matches the assigned users with the users array. It then generates an HTML string of
 * user initials for the first four matched users. Slice the first four users to display initials
 * for a maximum of four users.
 *
 * @param {Object} task - The task object containing assigned user IDs.
 * @returns {Promise<string>} - A promise that resolves to the HTML string of user initials.
 */
async function getAssignedUsers(task) {
  const filteredTask = Object.keys(task.assignedTo).filter((id) => id !== "placeholder");
  let usersArray = await getUsersArray();
  const matchedUsers = usersArray.filter((user) => filteredTask.includes(user[1].id));
  let initialsHTML = "";
  matchedUsers.slice(0, 4).forEach((user) => {
    initialsHTML += /*html*/ `
        <span class="initials" style="background-color: ${user[1].user_color}">${user[1].profile.initials}</span>     
    `;
  });
  return initialsHTML;
}

/**
 * Translates a given task status from its internal representation to a more user-friendly format.
 *
 * @param {string} currentStatus - The current status of the task. Expected values are "todo", "inProgress", "awaitFeedback", or "done".
 * @returns {string} The translated status. If the input status does not match any of the expected values, it returns the input status unchanged.
 */
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

/**
 * Renders the HTML template for the cards menu based on the current status.
 *
 * @param {string} currentStatus - The current status of the task (e.g., "done", "in-progress").
 * @returns {string} The HTML template for the cards menu.
 */
function renderCardsMenuTemplate(currentStatus) {
  let newCurrentStatus = translatedStatus(currentStatus);
  return /*html*/ `
    <div class="categoryMenu">
      <span class="title">${newCurrentStatus}</span>
      ${currentStatus !== "done" ? `<button onclick="addNewTaskCategory('${currentStatus}')" class="addTask" >${returnIcon("plus")}</button>` : ""}
    </div>
  `;
}

/**
 * Renders the HTML template for a task card.
 *
 * @param {Object} task - The task object containing details about the task.
 * @param {string} task.id - The unique identifier for the task.
 * @param {string} task.category - The category of the task.
 * @param {string} task.categoryColor - The color associated with the task's category.
 * @param {string} task.status - The current status of the task (e.g., "todo", "inProgress", "awaitFeedback", "done").
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - The description of the task.
 * @param {Object} task.subtasks - An object containing the subtasks of the task.
 * @param {number} task.progress - The progress percentage of the task.
 * @param {Object} task.assignedTo - An object containing the users assigned to the task.
 * @param {string} task.priority - The priority level of the task (e.g., "High", "Medium", "Low").
 * @param {string} assignedUsers - The HTML string representing the assigned users.
 * @returns {string} The HTML template string for the task card.
 */
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
            ${assignedUsers} <span>${Object.values(task.assignedTo).length > 4 ? `<p>+${Object.values(task.assignedTo).length - 4}</p>` : ""}</span>
            </div>
            <div class="priority">
                ${returnIcon(`${task.priority.toLowerCase()}`, `${task.priority.toLowerCase()}Icon`)}
            </div>
        </div> 
    </div>    
  </div>
    `;
}

/**
 * Renders a fallback template for task cards when there are no tasks in the given status.
 *
 * @param {string} currentStatus - The current status of the tasks.
 * @returns {string} The HTML string for the fallback template.
 */
function renderCardsFallbackTemplate(currentStatus) {
  let newCurrentStatus = translatedStatus(currentStatus);
  return /*html*/ `
    <div class="cardsContainer">
        <div class="cardsFallback">
            <span class="fallbackText">No tasks ${newCurrentStatus}</span>
        </div>
    </div>
`;
}

/**
 * Toggles the visibility of a mobile menu by adding or removing the "d_none" class.
 * Stops the propagation of the event to prevent it from bubbling up the DOM tree.
 *
 * @param {Event} event - The event object associated with the click event.
 * @param {string} id - The unique identifier for the mobile menu element.
 */
function toggleMobileMenu(event, id) {
  const mobileMenuRef = document.getElementById(`mobileMenu${id}`);
  mobileMenuRef.classList.toggle("d_none");
  event.stopPropagation();
}
window.toggleMobileMenu = toggleMobileMenu;

//! Drag and Drop Functionality for Task Cards

/**
 * Initiates the dragging process for a specified element by its ID.
 *
 * @param {string} id - The ID of the element to be dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
  const draggedElement = document.getElementById(id);
  draggedElement.style.transform = "rotate(5deg)";
}
window.startDragging = startDragging;

/**
 * Allows an element to be dropped by preventing the default handling of the event.
 *
 * @param {Event} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();
}
window.allowDrop = allowDrop;

/**
 * Moves a task to a specified category on mobile devices.
 *
 * @param {Event} event - The event object.
 * @param {string} category - The category to move the task to.
 * @param {number} id - The ID of the task to be moved.
 */
function moveToCategoryMobile(event, category, id) {
  event.stopPropagation();
  moveToCategory(category, id);
}
window.moveToCategoryMobile = moveToCategoryMobile;

/**
 * Moves a task to a specified category.
 *
 * @param {string} category - The category to move the task to.
 * @param {number} [id=0] - The ID of the task to move. Defaults to 0.
 * @returns {Promise<void>} - A promise that resolves when the task has been moved.
 */
async function moveToCategory(category, id = 0) {
  if (id !== 0) currentDraggedElement = id;
  const tasksArray = await getTasksArray();
  const task = tasksArray.find((task) => task[1].id === currentDraggedElement);
  let oldCategory = task[1].status;
  task[1].status = category;
  patchTaskUpdate(task[1], currentDraggedElement, oldCategory);
}
window.moveToCategory = moveToCategory;

/**
 * Adds highlight category to all elements with the class "draggableIndicator".
 * This function selects all elements with the class "draggableIndicator" and adds the class "targetSlot" to each.
 * It also attaches event listeners for "dragenter" and "dragleave" events to add and remove background highlights.
 */
function addHighlightCategory() {
  const slotsRef = document.querySelectorAll(".draggableIndicator");
  slotsRef.forEach((slot) => {
    slot.classList.add("targetSlot");
    slot.addEventListener("dragenter", addHighlightCategoryBG);
    slot.addEventListener("dragleave", removeHighlightCategoryBG);
  });
}
window.addHighlightCategory = addHighlightCategory;

/**
 * Adds a highlight background color to the target element of the event.
 *
 * @param {Event} event - The event object containing the target element.
 */
function addHighlightCategoryBG(event) {
  event.target.style.backgroundColor = "rgb(136, 136, 136, 0.1)";
}

/**
 * Removes the background color highlight from the category element.
 *
 * @param {Event} event - The event object containing the target element.
 */
function removeHighlightCategoryBG(event) {
  event.target.style.backgroundColor = "";
}

/**
 * Removes the "targetSlot" class from all elements with the class "draggableIndicator".
 * This function is typically used to remove visual highlighting from draggable slots.
 */
function removeHighlightCategory() {
  const slotsRef = document.querySelectorAll(".draggableIndicator");
  slotsRef.forEach((slot) => {
    slot.classList.remove("targetSlot");
  });
}
window.removeHighlightCategory = removeHighlightCategory;

/**
 * Adds a wheel event listener to horizontally scroll specified containers
 * when the mouse wheel is used within their boundaries.
 *
 * - Targets scrollable containers by their IDs.
 * - Checks if a container can scroll horizontally.
 * - Prevents default vertical scroll and applies horizontal scroll to the container.
 *
 * @listens wheel
 * @param {WheelEvent} evt - The wheel event triggered by scrolling.
 * @property {string[]} scrollContainers - IDs of containers intended for horizontal scrolling.
 * @returns {void}
 */
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
          scrollContainer.scrollLeft += evt.deltaY * 4;
        }
      }
    });
  },
  { passive: false }
);
