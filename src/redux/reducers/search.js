import * as types from '../constants/actionTypes';

const initialState = {
  result: [],
  success: false,
  message: '',
  error: {
    message: '',
    errors: [],
  },
  isLoading: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH:
      return { ...state, success: false, isLoading: true };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        result: action.response.search,
        error: initialState.error,
      };
    case types.SEARCH_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default search;
