/**
 * @module "editTask.js"
 */

import { getTasksArray } from "../../js/script.js";
import { patchUpdateSingleSubtaskDatabase, patchUpdateSubtasksProgress } from "../../js/tasksApiService.js";
import { renderTasks } from "../taskCards/taskCards.js";

/**
 * Calculates the current progress of a task based on its subtasks.
 *
 * @param {Array} taskArray - An array of tasks where each task is represented as an array with the first element being the task ID and the second element being the task details.
 * @param {number} taskID - The ID of the task for which to calculate the progress.
 * @returns {number} - The progress of the task as a percentage (0-100).
 */
function calculateCurrentProgress(taskArray, taskID) {
  let currentTask = taskArray.find((task) => task[0] == taskID);
  let subtasksArray = Object.entries(currentTask[1].subtasks);
  let countOfSubtasks = subtasksArray.length - 1;
  let countOfIsDoneSubtasks = subtasksArray.filter((subtask) => subtask[1].isDone == true).length;
  let progress = (countOfIsDoneSubtasks * 100) / countOfSubtasks;
  return progress;
}

/**
 * Updates the progress of a task based on the status of a subtask.
 *
 * @param {string} taskID - The ID of the task to update.
 * @param {string} subtaskId - The ID of the subtask that was checked or unchecked.
 * @param {boolean} isChecked - The new checked status of the subtask.
 * @param {string} currentTaskStatus - The current status of the task.
 * @returns {Promise<void>} A promise that resolves when the task progress has been updated.
 */
export async function updateProgress(taskID, subtaskId, isChecked, currentTaskStatus) {
  await patchUpdateSingleSubtaskDatabase(taskID, subtaskId, isChecked);
  let tasksArray = await getTasksArray();
  let currentProgress = calculateCurrentProgress(tasksArray, taskID, subtaskId);
  await patchUpdateSubtasksProgress(taskID, currentProgress);
  renderTasks(`${currentTaskStatus}`, `${currentTaskStatus}`);
}
