import * as types from '../constants/actionTypes';

const initialState = {
  user: {},
  errors: {
    message: '',
    errors: [],
  },
  isLoading: false,
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
      return { ...state, isLoading: true };
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.updatedData,
        errors: initialState.errors,
      };
    case types.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default user;
