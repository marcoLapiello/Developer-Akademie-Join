import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";

export function renderTasks() {
  renderTodoCards("todo");
  renderTodoCards("inProgress");
  renderTodoCards("awaitFeedback");
  renderTodoCards("done");
}

export async function renderTodoCards(currentStatus) {
  const cardsRef = document.getElementById(`${currentStatus}Cards`);
  const tasksArray = await getTasksArray();
  if (cardsRef) cardsRef.innerHTML = "";
  const todoTasks = tasksArray.filter((task) => task[1].status === `${currentStatus}`);
  if (todoTasks.length > 0) {
    for (const task of todoTasks) {
      const assignedUsers = await getAssignedUsers(task[1]); // Await the async function to get
      if (cardsRef) cardsRef.innerHTML += renderCardsTemplate(task[1], assignedUsers); // Pass task and assignedUsers if needed
    }
  } else {
    if (cardsRef) cardsRef.innerHTML = renderCardsFallbackTemplate(); // Fallback if no tasks
  }
}

async function getAssignedUsers(task) {
  const filteredTask = Object.keys(task.assignedTo).filter((id) => id !== "placeholder");
  let usersArray = await getUsersArray();
  const matchedUsers = usersArray.filter((user) => filteredTask.includes(user[1].id));
  let initialsHTML = "";
  matchedUsers.forEach((user) => {
    initialsHTML += /*html*/ `
        <span class="initials" style="background-color: ${user[1].user_color}">${user[1].profile.initials}</span>        
    `;
  });
  return initialsHTML;
}

function renderCardsTemplate(task, assignedUsers) {
  return /*html*/ `
  <div class="cardsContainer">
    <div onclick="renderTaskDetailView('${task.id}')" draggable="true" id="${task.id}" class="card"> 
        <div class="category" style="background-color: ${task.categoryColor}">${task.category}</div>
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
                ${returnIcon("medium", "mediumIcon")}
            </div>
        </div> 
    </div>    
  </div>
    `;
}

function renderCardsFallbackTemplate() {
  return /*html*/ `
    <div class="cardsContainer">
        <div class="cardsFallback">
            <span class="fallbackText">No tasks To do</span>
        </div>
    </div>
`;
}
