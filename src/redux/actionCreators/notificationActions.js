import * as types from '../constants/actionTypes';

export const handleNewNotification = (data, userId = 0) => ({
  type: types.NEW_NOTIFICATION,
  data,
  userId,
});

export const handleNewNotificationSuccess = (data, userId) => ({
  type: types.NEW_NOTIFICATION_SUCCESS,
  notificationData: data,
  userId,
});

export const handleNewNotificationFailure = (errorMessage) => ({
  type: types.NEW_NOTIFICATION_FAILURE,
  errorMessage,
});
