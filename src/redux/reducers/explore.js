import * as types from '../constants/actionTypes';
import {
  defaultFetchLimit, defaultOffset, reactions, failedToFetch,
} from '../../helpers/defaults';
import {
  handlesEventReactionInEvents,
  handleEventsUpdateInUpcomingContent,
} from '../../helpers/utils';

const initialState = {
  content: [],
  isLoading: false,
  pagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
  errors: {
    message: '',
    errors: {},
  },
  upcoming: {
    content: [],
    isLoading: false,
    pagination: {
      limit: defaultFetchLimit,
      offset: defaultOffset,
      totalCount: 0,
    },
    errors: {
      message: '',
      errors: {},
    },
  },
};

const explore = (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_EXPLORE_CONTENT:
    return {
      ...state,
      isLoading: true,
      content: action.exploreQueries.isNewTab
        ? initialState.content
        : state.content,
    };

  case types.FETCH_EXPLORE_CONTENT_SUCCESS:
    return {
      ...state,
      content: [...state.content, ...action.exploreData.content],
      pagination: action.exploreData.pagination,
      isLoading: false,
      errors: initialState.errors,
    };

  case types.FETCH_EXPLORE_CONTENT_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.errorObject.message || failedToFetch,
        errors: action.errorObject.errors,
      },
    };
  case types.FETCH_UPCOMING_EXPLORE_CONTENT:
    return {
      ...state,
      upcoming: {
        ...state.upcoming,
        isLoading: true,
      },
    };

  case types.FETCH_UPCOMING_EXPLORE_CONTENT_SUCCESS:
    return {
      ...state,
      upcoming: {
        ...state.upcoming,
        content: [...state.upcoming.content, ...action.exploreData.content],
        isLoading: false,
        pagination: action.exploreData.pagination,
        errors: initialState.upcoming.errors,
      },
    };

  case types.FETCH_UPCOMING_EXPLORE_CONTENT_FAILURE:
    return {
      ...state,
      upcoming: {
        ...state.upcoming,
        content: [...state.upcoming.content, ...action.exploreData.content],
        isLoading: false,
        pagination: action.exploreData.pagination,
        errors: {
          message: action.errorObject.message || failedToFetch,
          errors: action.errorObject.errors,
        },
      },
    };
  case types.PIN_EVENT:
    return {
      ...state,
      content: handlesEventReactionInEvents(
        reactions.pin, state.content, action.eventId, action.pin,
      ),
      upcoming: {
        ...state.upcoming,
        content: handlesEventReactionInEvents(
          reactions.pin, state.upcoming.content, action.eventId, action.pin,
        ),
      },
    };
  case types.UPDATE_UPCOMING_EVENT:
    return {
      ...state,
      upcoming: {
        ...state.upcoming,
        content: handleEventsUpdateInUpcomingContent(state.upcoming.content, action.eventUpdate),
      },
    };
  default:
    return state;
  }
};

export default explore;
