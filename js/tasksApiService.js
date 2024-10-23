const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

import { getNewTaskTemplate, validateNewTaskInputs } from "../components/addTask/addTask.js";

import { renderTasks } from "../components/taskCards/taskCards.js";

import { hideConfirmDeleteUserDialog } from "../components/contactModal/contactModal.js";

export async function loadTasks() {
  let response = await fetch(baseUrl + "tasks" + ".json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let responseAsJson = await response.json();
  let tasks = Object.entries(responseAsJson);
  return tasks;
}

export async function patchNewTask() {
  let newTask = getNewTaskTemplate();
  if (newTask) {
    let id = newTask.id;
    let response = await fetch(baseUrl + "/tasks/" + id + ".json", {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await renderTasks();
    return id;
  } else {
    return;
  }
}

export async function deleteExistungTask(status, taskID) {
  let response = await fetch(baseUrl + "/tasks/" + taskID + ".json", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  toggleTaskDetailView();
  hideConfirmDeleteUserDialog();
  await renderTasks(status, status);
}

export async function delteSingleSubtaskDatabase() {}

export async function patchUpdateSingleSubtaskDatabase(taskID, subtaskID, isChecked) {
  let response = await fetch(baseUrl + "/tasks/" + taskID + "/subtasks/" + subtaskID + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: isChecked }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export async function patchUpdateSubtasksProgress(taskID, currentProgress) {
  let response = await fetch(baseUrl + "/tasks/" + taskID + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ progress: currentProgress }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
