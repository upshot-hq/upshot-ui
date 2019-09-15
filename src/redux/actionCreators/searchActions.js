import * as types from '../constants/actionTypes';

export const search = ({
  scope, searchQuery, strict, isSearchPage,
}) => ({
  type: types.SEARCH,
  payload: {
    scope,
    searchQuery,
    strict,
    isSearchPage: isSearchPage || false,
  },
});

export const searchSuccess = ({ message, search: searchResult }, isSearchPage = false) => ({
  type: types.SEARCH_SUCCESS,
  isSearchPage,
  response: { message, search: searchResult },
});

export const searchFailure = (error) => ({
  type: types.SEARCH_FAILURE,
  error,
});
