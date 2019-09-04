import * as types from '../constants/actionTypes';

const initialState = {
  competitions: [],
  success: false,
  message: '',
  error: {
    message: '',
    errors: [],
  },
  isLoading: false,
};

const competition = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_COMPETITIONS:
      return { ...state, isLoading: true, success: false };
    case types.FETCH_ALL_COMPETITIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        competitions: action.response.competitions,
        error: initialState.error,
      };
    case types.FETCH_ALL_COMPETITIONS_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: { ...initialState.error, message: action.error },
      };
    default:
      return state;
  }
};

export default competition;
