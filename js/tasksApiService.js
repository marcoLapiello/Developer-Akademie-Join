const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

import { getNewTaskTemplate, validateNewTaskInputs } from "../components/addTask/addTask.js";

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
  let id = newTask.id;

  console.log(newTask);

  // let response = await fetch(baseUrl + "/tasks/" + id + ".json", {
  //   method: "PATCH",
  //   header: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newTask),
  // });
  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }
  // return id;
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
