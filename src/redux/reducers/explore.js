import * as types from '../constants/actionTypes';

const initialState = {
  content: [],
  errors: {
    message: '',
    errors: {},
  },
  isLoading: false,
};

const explore = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EXPLORE_CONTENT:
      return { ...state, isLoading: true };

    case types.FETCH_EXPLORE_CONTENT_SUCCESS:
      return {
        ...state,
        content: [...state.content, ...action.exploreData.content],
        isLoading: false,
        errors: initialState.errors,
      };

    case types.FETCH_EXPLORE_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: {
          message: action.errorObject.message || 'failed to fetch',
          errors: action.errorObject.errors,
        },
      };

    default:
      return state;
  }
};

export default explore;
