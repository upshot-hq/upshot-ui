import * as types from '../constants/actionTypes';
import { fillSearchResults } from '../../helpers/utils';

const initialState = {
  result: [],
  searchPageResult: [],
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
        result: fillSearchResults(
          action.response.search,
          state.result,
          action.isSearchPage,
        ),
        searchPageResult: fillSearchResults(
          state.searchPageResult,
          action.response.search,
          action.isSearchPage,
        ),
        error: initialState.error,
      };
    case types.SEARCH_FAILURE:
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

export default search;
