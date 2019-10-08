import * as types from '../constants/actionTypes';
import { handleNotificationsUpdate, handleNotificationStatusUpdate } from '../../helpers/utils';
import { failedToFetch, defaultFetchLimit, defaultOffset } from '../../helpers/defaults';

const initialState = {
  notifications: [],
  unreadNotificationsCount: 0,
  success: false,
  message: '',
  error: {
    message: '',
    errors: [],
  },
  isLoading: false,
  pagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
};

const notification = (state = initialState, action) => {
  switch (action.type) {
  case types.NEW_NOTIFICATION_SUCCESS:
    return {
      ...state,
      success: true,
      isLoading: false,
      ...handleNotificationsUpdate(state, action),
    };
  case types.GET_NOTIFICATIONS:
    return { ...state, isLoading: true };
  case types.GET_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      success: true,
      notifications: [...state.notifications, ...action.notificationsData.notifications],
      pagination: action.notificationsData.pagination,
      isLoading: false,
      errors: initialState.errors,
    };
  case types.GET_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.errorMessage || failedToFetch,
      },
    };
  case types.UPDATE_NOTIFICATION_STATUS_SUCCESS:
    return {
      ...state,
      success: true,
      isLoading: false,
      ...handleNotificationStatusUpdate(state, action),
    };
  default:
    return state;
  }
};

export default notification;
