import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  currentUser: {},
  errors: {
    message: '',
    errors: [],
    state: false,
  },
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isLoading: true };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.userData,
        errors: initialState.errors,
      };
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        currentUser: {},
        isLoading: false,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default user;
