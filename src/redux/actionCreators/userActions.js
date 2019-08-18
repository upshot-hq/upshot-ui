import * as types from '../constants/actionTypes';

export const authenticateUser = (userData) => ({
  type: types.AUTHENTICATE_USER,
  userData,
});

export const authenticateUserSuccess = (userData) => ({
  type: types.AUTHENTICATE_USER_SUCCESS,
  userData,
});

export const authenticateUserFailure = (error) => ({
  type: types.AUTHENTICATE_USER_FAILURE,
  error,
});
