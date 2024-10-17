async function returnTempCards() {
  const tempCards = {
    TASK3757435747: {
      id: "TASK3757435747",
      title: "Implement Search Functionality",
      description: "Develop the search functionality to filter tasks on the board.",
      assignedTo: { CK1728938463133: "CK1728938463133", MH1729079944158: "MH1729079944158", MS1728938311249: "MS1728938311249" },
      dueDate: "2024-10-30",
      creationDate: "8657363623",
      creatorId: "AS4577547547",
      priority: "Urgent",
      category: "Technical Task",
      categoryColor: "#0038ff",
      progress: 50,
      status: "In Progress",
      subtasks: {
        SUBTASK3757435747: {
          id: "SUBTASK3757435747",
          task: "Create search input",
          isDone: true,
          creationDate: "8657363676",
          creatorId: "AS4577547547",
        },
        SUBTASK3794346851: {
          id: "SUBTASK3794346851",
          task: "Connect search to database",
          isDone: false,
          creationDate: "8657363644",
          creatorId: "AS4577547547",
        },
      },
    },
  };
  return tempCards;
}

import { returnIcon } from "../icons.js";
import { getUsersArray } from "../../js/script.js";

// The function below is a placeholder until we have the real data structure
// and can fetch the data from the database to render the task detail view.
export async function renderTaskDetailView() {
  let taskID = "TASK3757435747";
  let tasksArray = await returnTempCards(); // Placeholder until we have the real data structure
  let assignedUsers = await renderAssignedUser(taskID, tasksArray);
  let subtasks = await renderSubtasks(taskID, tasksArray);
  const taskDetailViewRef = document.getElementById("taskDetailView");
  if (taskDetailViewRef) taskDetailViewRef.innerHTML = renderTaskDetailViewTemplate(tasksArray[taskID], assignedUsers, subtasks);
}

// The function find the assigned users for a task and returns the user data
// for each user assigned to the task.
export async function getAssignedUsersData(taskID, tasksArray) {
  let usersArray = await getUsersArray();
  const assignedTo = Object.values(tasksArray[taskID].assignedTo); // Change: Extract values from the assignedTo object
  const assignedUsers = [];
  const users = Object.values(usersArray).flat();
  assignedTo.forEach((userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) assignedUsers.push(user);
  });
  return assignedUsers;
}

// The function toggles the task detail view on and off
export function toggleTaskDetailView() {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.classList.toggle("d_none");
}

// The function renders the assigned users for a task and returns the user data as HTML
async function renderAssignedUser(taskID, tasksArray) {
  let assignedUsers = await getAssignedUsersData(taskID, tasksArray);
  let userListHTML = "";
  assignedUsers.forEach((user) => {
    if (user) {
      userListHTML += /*html*/ `    
        <li class="userName"><span class="userInitials" style="background-color: ${user.user_color}">${user.profile.initials}</span>${user.profile.first_name} ${user.profile.last_name}</li>
      `;
    }
  });
  return userListHTML;
}

// The function renders the subtasks for a task and returns the subtasks as HTML
async function renderSubtasks(taskID, tasksArray) {
  let subtasks = Object.values(tasksArray[taskID].subtasks); // Change: Extract values from the subtasks object
  let subtasksListHTML = "";
  subtasks.forEach((subtask) => {
    if (subtask) {
      subtasksListHTML += /*html*/ `
      <li class="subtask" id="subtasksID${subtask.id}">
        <input onchange="checkedSubtask(event,'${taskID}')" type="checkbox" name="${subtask.id}" id="${subtask.id}" class="checkboxSubtask" ${subtask.isDone ? "checked" : ""}>
        ${subtask.task}
      </li>
      `;
    }
  });
  return subtasksListHTML;
}

export async function checkedSubtask(event, taskID) {
  let tasksArray = await returnTempCards(); // Placeholder until real data structure is available
  let currentTask = tasksArray[taskID]; // Get the current task by taskID
  let checkboxId = event.target.id;
  let isChecked = event.target.checked;
  const foundSubtask = currentTask.subtasks[checkboxId]; // Change: Access subtask by its key in the object
  if (foundSubtask) foundSubtask.isDone = isChecked;
  tasksArray[taskID] = currentTask;
  console.log(tasksArray[taskID]);

  return tasksArray[taskID];
}

// The function renders the task detail view template with the subtasks and assigned users data
function renderTaskDetailViewTemplate(currentTask, assignedUsers, subtasks) {
  return /*html*/ `
    <div class="taskDetailViewCard">
        <div class="header"> 
            <div class="category" style="background-color: ${currentTask.categoryColor}">${currentTask.category}</div>
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>
        <div class="title">${currentTask.title}</div>
        <div class="description">${currentTask.description}</div>
        <div class="dueDate"><span>Due date:</span>${currentTask.dueDate}</div>
        <div class="priority"><span>Priority:</span>${currentTask.priority}</div>
        <div class="assignedTo">
        <span>Assigned To:</span>
        <ul class="userNames">
            ${assignedUsers}
        </ul>
        <div class="subtasks">
        <span>Subtasks</span>
          <ul>
              ${subtasks}
          </ul>
        </div>
        <div class="buttons">
            <button class="deleteButton">${returnIcon("delete")}Delete</button>
            <button class="editButton">${returnIcon("edit")}Edit</button>        
            </div>
        </div>
    </div>  
    `;
}
