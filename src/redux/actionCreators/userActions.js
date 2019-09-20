import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';

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

export const getUserEvents = ({ limit = defaultFetchLimit, offset = defaultOffset }) => ({
  type: types.GET_USER_EVENTS,
  eventQueries: { limit, offset },
});

export const getUserEventsSuccess = (responseData) => ({
  type: types.GET_USER_EVENTS_SUCCESS,
  responseData,
});

export const getUserEventsFailure = (error) => ({
  type: types.GET_USER_EVENTS_FAILURE,
  error,
});

export const getUserPosts = ({ limit = defaultFetchLimit, offset = defaultOffset }) => ({
  type: types.GET_USER_POSTS,
  postQueries: { limit, offset },
});

export const getUserPostsSuccess = (responseData) => ({
  type: types.GET_USER_POSTS_SUCCESS,
  responseData,
});

export const getUserPostsFailure = (error) => ({
  type: types.GET_EVENT_POSTS_FAILURE,
  error,
});

export const getUserInfo = () => ({
  type: types.GET_USER_INFO,
});

export const getUserInfoSuccess = (responseData) => ({
  type: types.GET_USER_INFO_SUCCESS,
  responseData,
});

export const getUserInfoFailure = (error) => ({
  type: types.GET_USER_INFO_FAILURE,
  error,
});

export const removeUserEvent = (userId, eventId) => ({
  type: types.REMOVE_USER_EVENT,
  userId,
  eventId,
});
