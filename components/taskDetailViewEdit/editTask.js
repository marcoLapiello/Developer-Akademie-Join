import { getTasksArray } from "../../js/script.js";
import { patchUpdateSingleSubtaskDatabase } from "../../js/tasksApiService.js";

export async function updateProgress(taskID, checkboxId, isChecked) {
  patchUpdateSingleSubtaskDatabase(taskID, checkboxId, isChecked);
  let tasksArray = await getTasksArray();
  console.log(tasksArray);
}

// updateProgress();
