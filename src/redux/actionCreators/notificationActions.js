import * as types from '../constants/actionTypes';
import {
  defaultFetchLimit, defaultOffset,
  booleanStrings, read,
} from '../../helpers/defaults';

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
  isNewFetch = false,
}) => ({
  type: types.GET_NOTIFICATIONS,
  notificationQueries: { limit, offset, readAll },
  isNewFetch,
});

export const getNotificationsSuccess = (responseData, isNewFetch) => ({
  type: types.GET_NOTIFICATIONS_SUCCESS,
  notificationsData: responseData,
  isNewFetch,
});

export const getNotificationsFailure = (errorMessage) => ({
  type: types.GET_NOTIFICATIONS_FAILURE,
  errorMessage,
});

export const getUnreadNotificationCount = () => ({
  type: types.GET_UNREAD_NOTIFICATION_COUNT,
});

export const getUnreadNotificationCountSuccess = (responseData) => ({
  type: types.GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
  count: responseData.notificationCount,
});

export const getUnreadNotificationCountFailure = (errorMessage) => ({
  type: types.GET_UNREAD_NOTIFICATION_COUNT_FAILURE,
});

export const updateNotificationStatus = ({ id, status = read }) => ({
  type: types.UPDATE_NOTIFICATION_STATUS,
  data: { id, status },
});

export const updateNotificationStatusSuccess = (responseData) => ({
  type: types.UPDATE_NOTIFICATION_STATUS_SUCCESS,
  notificationData: responseData,
});

export const updateNotificationStatusFailure = (errorMessage) => ({
  type: types.UPDATE_NOTIFICATION_STATUS_FAILURE,
  errorMessage,
});
