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

export const logoutUser = () => ({
  type: types.LOG_OUT,
});

export const updateUserProfile = (userData) => ({
  type: types.UPDATE_USER_PROFILE,
  userData,
});

export const updateUserProfileSuccess = (updatedData) => ({
  type: types.UPDATE_USER_PROFILE_SUCCESS,
  updatedData,
});

export const updateUserProfileFailure = (error) => ({
  type: types.UPDATE_USER_PROFILE_FAILURE,
  error,
});
