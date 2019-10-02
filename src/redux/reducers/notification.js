import * as types from '../constants/actionTypes';
import { handleNotificationsUpdate } from '../../helpers/utils';

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
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_NOTIFICATION_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
        ...handleNotificationsUpdate(state, action),
      };
    default:
      return state;
  }
};

export default notification;
