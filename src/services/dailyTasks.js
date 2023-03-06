import dailyTasksService from "../api/dailyTasks";

export function getAllTasksByDate(model) {
  return dailyTasksService.getTasksForDate(model)
    .then((response) => response.data)
}
