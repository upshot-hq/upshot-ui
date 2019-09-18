import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';
import { handleRemoveUserEvent } from '../../helpers/utils';

const initialState = {
  user: {},
  events: [],
  errors: {
    message: '',
    errors: {},
  },
  updateSuccess: false,
  isLoading: false,
  pagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 6,
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_USER:
      return { ...state, isLoading: true };
    case types.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.userData,
        errors: initialState.errors,
      };
    case types.AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        user: {},
        isLoading: false,
        errors: action.error,
      };
    case types.UPDATE_USER_PROFILE:
      return { ...state, isLoading: true, updateSuccess: false };
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateSuccess: true,
        user: action.updatedData,
        errors: initialState.errors,
      };
    case types.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        updateSuccess: false,
        errors: action.error,
      };
    case types.GET_USER_EVENTS:
      return { ...state, isLoading: true };
    case types.GET_USER_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...state.events, ...action.responseData.events],
        pagination: action.responseData.pagination,
        errors: initialState.errors,
      };
    case types.GET_USER_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };
    case types.REMOVE_USER_EVENT:
      return {
        ...state,
        ...handleRemoveUserEvent(state, action),
      };
    default:
      return state;
  }
};

export default user;
