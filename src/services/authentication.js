import authenticationService from "../api/authentication";
// import {successMessage, errorMessage} from "./alerts";
// import {authenticationMessages} from "../constants/messages/authentication";
// import {generalMessages} from "../constants/messages/general";
// import { statusCode } from "../constants/statusCodes";
import { store } from "../store";
import {setAccess, logout} from "../reduxActions/auth"
// import { userRoles } from '../constants/userRoles';
import tokenService from "./tokens"

export function register(values, history) {
  const model = {
    name: values.name,
    surname: values.surname,
    email: values.email,
    password: values.password
  };

  authenticationService
    .register(model)
    .then(
      (response) => {
        // successMessage(authenticationMessages.SUCCESSFUL_REGISTRATION);
        store.dispatch(setAccess(response.data));
        console.log(history.authReducer.isAuthUser)
        history.push("/dashboard/app");
      },
      () => {
        // err.response.status === statusCode.BAD_REQUEST
        //   ? errorMessage(
        //     authenticationMessages.REGISTRATION_FAILED,
        //     authenticationMessages.REGISTRATION_FAILED_USER_ALREADY_EXIST
        //   )
        //   : errorMessage(
        //     authenticationMessages.REGISTRATION_FAILED,
        //     generalMessages.SOMETHING_WENT_WRONG
        //   );
      }
    )
    .catch(() => {
      // errorMessage(
      //   authenticationMessages.REGISTRATION_FAILED,
      //   generalMessages.SOMETHING_WENT_WRONG
      // );
    });
}

export function login(values, history) {
  const model = {
    email: values.email,
    password: values.password
  };

  authenticationService
    .login(model)
    .then(
      (response) => {
        store.dispatch(setAccess(response.data));
        store.dispatch(history.authReducer.isAuthUser)
        history.push("/dashboard/app");

        // const {role} = store.getState().authReducer;

        // switch (role) {
        //   case userRoles.USER:
        //     history.push("/main");
        //     break;
        //   case userRoles.LOGIST:
        //     history.push("/users");
        //     break;
        //   default:
        //     errorMessage(
        //       authenticationMessages.LOGIN_FAILED,
        //       generalMessages.SOMETHING_WENT_WRONG
        //     );
        //     break;
        // }
      },
      () => {
        // err.response.status === statusCode.BAD_REQUEST
        //   ? errorMessage(
        //     authenticationMessages.LOGIN_FAILED,
        //     authenticationMessages.LOGIN_FAILED_USER_ALREADY_EXIST
        //   )
        //   : errorMessage(
        //     authenticationMessages.LOGIN_FAILED,
        //     generalMessages.SOMETHING_WENT_WRONG
        //   );
      }
    )
    .catch(() => {
      // errorMessage(
      //   authenticationMessages.LOGIN_FAILED,
      //   generalMessages.SOMETHING_WENT_WRONG
      // );
    });
}

export function logoutUser() {
  const model = {
    refreshToken: tokenService.getLocalRefreshToken()
  };

  authenticationService
    .logout(model)
    .then(
      () => {
        store.dispatch(logout());
      },
      () => {
        // errorMessage(
        //   authenticationMessages.LOGOUT_FAILED,
        //   generalMessages.SOMETHING_WENT_WRONG
        // );
      }
    )
    .catch(() => {
      // errorMessage(
      //   authenticationMessages.LOGOUT_FAILED,
      //   generalMessages.SOMETHING_WENT_WRONG
      // );
    });
}