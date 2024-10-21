import { getTasksArray } from "../../js/script.js";
import { patchUpdateSingleSubtaskDatabase } from "../../js/tasksApiService.js";

export async function updateProgress(taskID, subtaskId, isChecked) {
  await patchUpdateSingleSubtaskDatabase(taskID, subtaskId, isChecked);
  let tasksArray = await getTasksArray();

  function calculateCurrentProgress(taskArray, taskID, subtaskId) {
    let currentTask = taskArray.find((task) => task[0] == taskID);
    let subtasksArray = Object.entries(currentTask[1].subtasks);
    let countOfSubtasks = subtasksArray.length - 1;
    let isDoneSubtasks = subtasksArray.filter((subtask) => subtask[1].isDone == true).length;

    console.log(countOfSubtasks);
    console.log(isDoneSubtasks);
  }
  calculateCurrentProgress(tasksArray, taskID, subtaskId);
}
