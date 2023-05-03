export const SERVER_URL = "https://localhost:7130/api";
export const AUTHENTICATION_URL = "/Authentication";
export const USER_URL = "/User";
export const DAILY_TASKS_URL = "/DailyTask";

export const AUTHENTICATION_URLS = {
  REGISTRATION: `${AUTHENTICATION_URL  }/register`,
  LOGIN: `${AUTHENTICATION_URL  }/login`,
  LOGOUT: `${AUTHENTICATION_URL  }/logout`,
  REFRESH_TOKEN: `${AUTHENTICATION_URL  }/refresh-token`,
};

export const DAILY_TASKS_URLS = {
  GET_BY_DATE: `${DAILY_TASKS_URL }/by-date`
};
