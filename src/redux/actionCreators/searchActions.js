import * as types from '../constants/actionTypes';

export const search = ({ scope, searchQuery }) => ({
  type: types.SEARCH,
  payload: { scope, searchQuery },
});

export const searchSuccess = ({ message, search: searchResult }) => ({
  type: types.SEARCH_SUCCESS,
  response: { message, search: searchResult },
});

export const searchFailure = (error) => ({
  type: types.SEARCH_FAILURE,
  error,
});
