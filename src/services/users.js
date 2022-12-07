import usersService from "../api/users"

export function getUserInfo() {
  return usersService
    .getUser()
    .then(
      (response) => response.data,
      () => {
        // errorMessage(
        //   userMessages.GET_USER_INFO_FAILED,
        //   generalMessages.SOMETHING_WENT_WRONG
        // );
      }
    )
    .catch(() => {
      // errorMessage(
      //   userMessages.GET_USER_INFO_FAILED,
      //   generalMessages.SOMETHING_WENT_WRONG
      // );
    });
}
