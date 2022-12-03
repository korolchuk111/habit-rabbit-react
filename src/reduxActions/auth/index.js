import * as types from "./types";

export const logout = () => ({
    type: types.LOGOUT
  })

export const setAccess = (token) => ({
    type: types.SET_ACCESS,
    payload: token
  })