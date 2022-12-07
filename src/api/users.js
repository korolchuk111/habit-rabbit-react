import instance from "./configurations/configurations";
import { USER_URL } from "../constants/api/urls";

export default class usersService {
  static getUser() {
    return instance.get(USER_URL);
  }
}
