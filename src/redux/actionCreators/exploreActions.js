import * as types from '../constants/actionTypes';

export const fetchExploreContent = ({ limit, offset, filter }) => ({
  type: types.FETCH_EXPLORE_CONTENT,
  exploreQueries: { limit, offset, filter },
});

export const fetchExploreContentSuccess = (exploreData) => ({
  type: types.FETCH_EXPLORE_CONTENT_SUCCESS,
  exploreData,
});

export const fetchExploreContentFailure = (errorObject) => ({
  type: types.FETCH_EXPLORE_CONTENT_FAILURE,
  errorObject,
});
