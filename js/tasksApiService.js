const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

export async function loadTasks() {
  let response = await fetch(baseUrl + "tasks" + ".json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let responseAsJson = await response.json();
  let tasks = Object.entries(responseAsJson);
  return tasks;
}
