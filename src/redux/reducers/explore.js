import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset, reactions } from '../../helpers/defaults';
import { handlesEventReactionInEvents } from '../../helpers/utils';

const initialState = {
  content: [],
  errors: {
    message: '',
    errors: {},
  },
  isLoading: false,
  pagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
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
          message: action.errorObject.message || 'failed to fetch',
          errors: action.errorObject.errors,
        },
      };

    case types.PIN_EVENT:
      return {
        ...state,
        content: handlesEventReactionInEvents(
          reactions.pin, state.content, action.eventId, action.pin,
        ),
      };

    default:
      return state;
  }
};

export default explore;
