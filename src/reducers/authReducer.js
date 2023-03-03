// import { userRoles } from '../constants/userRoles';
// import jwt from 'jwt-decode';
import * as types from '../reduxActions/auth/types';
import tokenService from "../services/tokens";
// import { errorMessage } from '../services/alerts';
// import { authenticationMessages } from '../constants/messages/authentication';

const initialState = {
  // role: userRoles.GUEST,
  isAuthUser: false
}

// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ACCESS: {

      const { accessToken, refreshToken } = action.payload;

      // const decodedAccessToken = jwt(accessToken);
      // const {role} = decodedAccessToken;

      tokenService.setLocalAccessToken(accessToken);
      tokenService.setLocalRefreshToken(refreshToken);

      return {
        ...state,
        isAuthUser: true
      }

      // errorMessage(
      //   authenticationMessages.LOGIN_FAILED,                    // because we set a role only after login
      //   authenticationMessages.LOGIN_FAILED_USER_ALREADY_EXIST
      // );

      // break;
    }

    case types.LOGOUT: {

      tokenService.deleteTokens();

      return {
        ...state,
        // role: userRoles.GUEST,
        isAuthUser: false
      }
    }

    default: {
      return state;
    }
  }
}

export default authReducer;
