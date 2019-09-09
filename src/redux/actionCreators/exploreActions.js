import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';
import lang from '../../helpers/en.default';

const { allTab } = lang.explorePage.tabs;

export const fetchExploreContent = ({
  limit = defaultFetchLimit, offset = defaultOffset, filter = allTab, isNewTab = false,
}) => ({
  type: types.FETCH_EXPLORE_CONTENT,
  exploreQueries: {
    limit, offset, filter, isNewTab,
  },
});

export const fetchExploreContentSuccess = (responseData) => ({
  type: types.FETCH_EXPLORE_CONTENT_SUCCESS,
  exploreData: responseData,
});

export const fetchExploreContentFailure = (errorObject) => ({
  type: types.FETCH_EXPLORE_CONTENT_FAILURE,
  errorObject,
});
