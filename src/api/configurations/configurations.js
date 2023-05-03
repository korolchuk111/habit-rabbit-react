import axios from "axios";
import { AUTHENTICATION_URLS, SERVER_URL } from "../../constants/api/urls";
import { statusCode } from "../../constants/statusCodes";
import authenticationService from "../authentication";
import { logout } from "../../reduxActions/auth";
import { store } from "../../store";
import tokenService from "../../services/tokens";
import { AUTHORIZATION_TYPE } from "../../constants/api/others";

const instance = axios.create({
  baseURL: SERVER_URL
});

instance.interceptors.request.use(
  (configuration) => {
    const accessToken = tokenService.getLocalAccessToken();

    if (accessToken) {
      configuration.headers.Authorization = `${AUTHORIZATION_TYPE} ${accessToken}`;
    }

    return configuration;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === statusCode.UNAUTHORIZED) {
      try {
        const accessToken = tokenService.getLocalAccessToken();
        const refreshToken = tokenService.getLocalRefreshToken();

        const model = {
          accessToken,
          refreshToken
        };

        const result = await authenticationService.refreshTokens(model);

        const newAccessToken = result.data.accessToken;
        const newRefreshToken = result.data.refreshToken;

        tokenService.setLocalAccessToken(newAccessToken);
        tokenService.setLocalRefreshToken(newRefreshToken);

        return instance(error.config);
      }
      catch (internalError) {
        return Promise.reject(internalError);
      }
    }

    if (
      (error.response.status === statusCode.NOT_FOUND ||
        error.response.status === statusCode.INTERNAL_SERVER_ERROR) &&
      error.config.url === AUTHENTICATION_URLS.REFRESH_TOKEN
    ) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default instance;
