import instance from "./configurations/configurations";
import { DAILY_TASKS_URLS } from "../constants/api/urls";

export default class dailyTasksService {
  static getTasksForDate(model) {
    return instance.post(DAILY_TASKS_URLS.GET_BY_DATE, model);
  }
}
