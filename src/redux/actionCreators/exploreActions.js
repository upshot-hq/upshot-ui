import * as types from '../constants/actionTypes';
import * as defaults from '../../helpers/defaults';
import lang from '../../helpers/en.default';

const { allTab } = lang.explorePage.tabs;

export const fetchExploreContent = ({
  limit = defaults.defaultFetchLimit, offset = defaults.defaultOffset,
  filter = allTab, eventFilter = '', isNewTab = false,
}) => ({
  type: types.FETCH_EXPLORE_CONTENT,
  exploreQueries: {
    limit,
    offset,
    filter,
    eventFilter,
    isNewTab,
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

export const fetchUpcomingExploreContent = ({
  limit = defaults.defaultFetchLimit, offset = defaults.defaultOffset,
}) => ({
  type: types.FETCH_UPCOMING_EXPLORE_CONTENT,
  exploreQueries: {
    limit,
    offset,
    filter: defaults.resources.event,
    eventFilter: defaults.eventFilter.upcoming,
  },
});

export const fetchUpcomingExploreContentSuccess = (responseData) => ({
  type: types.FETCH_UPCOMING_EXPLORE_CONTENT_SUCCESS,
  exploreData: responseData,
});

export const fetchUpcomingExploreContentFailure = (errorObject) => ({
  type: types.FETCH_UPCOMING_EXPLORE_CONTENT_FAILURE,
  errorObject,
});
