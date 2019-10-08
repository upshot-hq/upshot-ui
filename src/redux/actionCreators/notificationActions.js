import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset, booleanStrings } from '../../helpers/defaults';

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

export const getNotifications = ({
  limit = defaultFetchLimit, offset = defaultOffset, readAll = booleanStrings.true,
}) => ({
  type: types.GET_NOTIFICATIONS,
  notificationQueries: { limit, offset, readAll },
});

export const getNotificationsSuccess = (responseData) => ({
  type: types.GET_NOTIFICATIONS_SUCCESS,
  notificationsData: responseData,
});
export const getNotificationsFailure = (errorMessage) => ({
  type: types.GET_NOTIFICATIONS_FAILURE,
  errorMessage,
});
