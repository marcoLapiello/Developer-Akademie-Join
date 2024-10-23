import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";
import { updateProgress } from "../taskDetailViewEdit/editTask.js"; // added by Richard 21.10. 08:30

// The function below is a placeholder until we have the real data structure
// and can fetch the data from the database to render the task detail view.
export async function renderTaskDetailView(taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array
  let assignedUsers = await renderAssignedUser(taskID, tasksArray); // Fetch assigned users for the task and render them
  let subtasks = await renderSubtasks(taskID, tasksArray); // Fetch subtasks for the task and render them
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  if (taskDetailViewRef && taskData) taskDetailViewRef.innerHTML = renderTaskDetailViewTemplate(taskData, assignedUsers, subtasks); // Render the task detail view template with the task data, assigned users and subtasks
  toggleTaskDetailView();
}

// The function find the assigned users for a task and returns the user data
// for each user assigned to the task.
export async function getAssignedUsersData(taskID, tasksArray) {
  let usersArray = await getUsersArray(); // Fetch users array
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const assignedTo = Object.values(taskData.assignedTo); // Get the assigned users for the task
  const assignedUsers = [];
  assignedTo.forEach((userId) => {
    // Find the user data for each user assigned to the task and push it to the assignedUsers array
    const user = usersArray.find((usersGroup) => usersGroup[1].id === userId);
    if (user) assignedUsers.push(user[1]);
  });
  return assignedUsers;
}

// The function toggles the task detail view on and off
export function toggleTaskDetailView() {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.classList.toggle("d_none");
}

document.addEventListener("click", (event) => {
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  if (event.target.id == "taskDetailView") {
    // If the click target is the task detail view element toggle the task detail view
    taskDetailViewRef.classList.toggle("d_none");
  }
});

// The function renders the assigned users for a task and returns the user data as HTML
async function renderAssignedUser(taskID, tasksArray) {
  let assignedUsers = await getAssignedUsersData(taskID, tasksArray); // Fetch assigned users for the task and render them
  let userListHTML = "";
  assignedUsers.forEach((user) => {
    if (user) {
      userListHTML += /*html*/ `
        <li class="userName">
          <span class="userInitials" style="background-color: ${user.user_color}">
            ${user.profile.initials}
          </span>
          ${user.profile.first_name} ${user.profile.last_name}
        </li>
      `;
    }
  });
  return userListHTML;
}

// The function renders the subtasks for a task and returns the subtasks as HTML
async function renderSubtasks(taskID, tasksArray) {
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const subtasks = Object.values(taskData.subtasks); // Get the subtasks for the task
  let subtasksListHTML = "";
  if (subtasks.length > 1) subtasksListHTML += /*html*/ ` <span>Subtasks</span> `;
  subtasks.forEach((subtask) => {
    // Render the subtasks the id is not a placeholder and push the subtask to the subtasksListHTML
    if (subtask && subtask !== "placeholder") {
      subtasksListHTML += /*html*/ `
        <li class="subtask" id="subtasksID${subtask.id}">
          <input 
            onchange="checkedSubtask(event,'${taskID}','${taskData.status}')" 
            type="checkbox" 
            name="${subtask.id}" 
            id="${subtask.id}" 
            class="checkboxSubtask" 
            ${subtask.isDone ? "checked" : ""}>
          ${subtask.task}
        </li>
      `;
    }
  });
  return subtasksListHTML;
}

// The function checks a subtask and updates the task data with the new subtask status
// and returns the updated task data
export async function checkedSubtask(event, taskID, currentTaskStatus) {
  let tasksArray = await getTasksArray(); // Fetch tasks array to get the task data for the task ID
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  let checkboxId = event.target.id; // Get the checkbox ID the checkbox is the subtask ID
  let isChecked = event.target.checked; // Get the status of the checkbox
  const foundSubtask = taskData.subtasks[checkboxId]; // Find the subtask in the task data with the subtask ID
  if (foundSubtask) foundSubtask.isDone = isChecked; // Update the subtask status with the new status
  // #####################################################################################
  // added by Richard 21.10. 08:30
  updateProgress(taskID, checkboxId, isChecked, currentTaskStatus);
  // #####################################################################################
}

// The function renders the task detail view template with the subtasks and assigned users data
function renderTaskDetailViewTemplate(currentTask, assignedUsers, subtasks) {
  return /*html*/ `
    <div id="taskDetailViewCard" class="taskDetailViewCard">
        <div class="header"> 
            <div class="category" style="background-color: ${currentTask.categoryColor}">${currentTask.category}</div>
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>
        <div class="title">${currentTask.title}</div>
        <div class="description">${currentTask.description}</div>
        <div class="dueDate"><span>Due date:</span><p>${currentTask.dueDate}</p></div>
        <div class="priority"><span>Priority:</span><p>${currentTask.priority}</p>${returnIcon(`${currentTask.priority}`, `${currentTask.priority}Icon`)}</div>
        <div class="assignedTo">
        <span>Assigned To:</span>
        <ul class="userNames">
            ${assignedUsers}
        </ul>
        <div class="subtasks">
          <ul>
              ${subtasks}
          </ul>
        </div>
        <div class="buttons">
            <button class="deleteButton">${returnIcon("delete")}Delete</button>                  
            <button onclick="deleteExistungTask('${currentTask.status}', '${currentTask.id}')" class="deleteButton">${returnIcon("delete")}Delete</button>  
            <button onclick="renderTaskDetailViewEdit('${currentTask.id}')" class="editButton">${returnIcon("edit")}Edit</button>  
            </div>
        </div>
    </div>  
    `;
}
