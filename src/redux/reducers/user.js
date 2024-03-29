import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';
import {
  handleRemoveUserEvent, handleRemoveUserBookmark,
} from '../../helpers/utils';

const initialState = {
  user: {},
  events: [],
  posts: [],
  stats: { totalUserEvents: 0, totalUserPosts: 0 },
  bookmarks: [],
  errors: {
    message: '',
    errors: {},
  },
  userInfoError: '',
  updateSuccess: false,
  isLoading: false,
  userInfoIsLoading: false,
  bookmarksIsLoading: false,
  eventsPagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
  postsPagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
  pagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
  bookmarksPagination: {
    limit: defaultFetchLimit,
    offset: defaultOffset,
    totalCount: 0,
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case types.AUTHENTICATE_USER:
    return { ...state, isLoading: true };
  case types.AUTHENTICATE_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      user: action.userData,
      errors: initialState.errors,
    };
  case types.AUTHENTICATE_USER_FAILURE:
    return {
      ...state,
      user: {},
      isLoading: false,
      errors: action.error,
    };
  case types.UPDATE_USER_PROFILE:
    return { ...state, isLoading: true, updateSuccess: false };
  case types.UPDATE_USER_PROFILE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      updateSuccess: true,
      user: {
        ...state.user,
        userData: {
          ...state.user.userData,
          ...action.updatedData.user,
        },
      },
      errors: initialState.errors,
    };
  case types.UPDATE_USER_PROFILE_FAILURE:
    return {
      ...state,
      isLoading: false,
      updateSuccess: false,
      errors: action.error,
    };
  case types.GET_USER_EVENTS:
    return {
      ...state,
      isLoading: true,
      events: action.eventQueries.isNewFetch
        ? initialState.events
        : state.events,
    };
  case types.GET_USER_EVENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      events: [...state.events, ...action.responseData.events],
      eventsPagination: action.responseData.pagination,
      errors: initialState.errors,
    };
  case types.GET_USER_EVENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  case types.GET_USER_POSTS:
    return { ...state, isLoading: true };
  case types.GET_USER_POSTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      posts: [...state.posts, ...action.responseData.posts],
      postsPagination: action.responseData.pagination,
      errors: initialState.errors,
    };
  case types.GET_USER_POSTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  case types.REMOVE_USER_EVENT:
    return {
      ...state,
      ...handleRemoveUserEvent(state, action),
    };
  case types.GET_USER_INFO:
    return { ...state, userInfoIsLoading: true };
  case types.GET_USER_INFO_SUCCESS:
    return {
      ...state,
      stats: { ...state.stats, ...action.responseData.user.stats },
      user: {
        ...state.user,
        userData: {
          ...state.user.userData,
          ...action.responseData.user,
        },
      },
      userInfoIsLoading: false,
      userInfoError: initialState.userInfoError,
    };
  case types.GET_USER_INFO_FAILURE:
    return {
      ...state,
      userInfoIsLoading: false,
      userInfoError: action.error,
    };
  case types.CREATE_EVENT_SUCCESS:
    return {
      ...state,
      stats: { ...state.stats, totalUserEvents: state.stats.totalUserEvents + 1 },
    };
  case types.POST_TO_EVENT_SUCCESS:
    return {
      ...state,
      stats: { ...state.stats, totalUserPosts: state.stats.totalUserPosts + 1 },
    };
  case types.GET_USER_BOOKMARKS:
    return {
      ...state,
      bookmarksIsLoading: true,
    };
  case types.GET_USER_BOOKMARKS_SUCCESS:
    return {
      ...state,
      bookmarks: [...state.bookmarks, ...action.bookmarks],
      bookmarksIsLoading: false,
      bookmarksPagination: action.pagination,
    };
  case types.GET_USER_BOOKMARKS_FAILURE:
    return {
      ...state,
      bookmarksIsLoading: false,
    };
  case types.REMOVE_USER_BOOKMARK:
    return {
      ...state,
      ...handleRemoveUserBookmark(state, action),
    };
  default:
    return state;
  }
};

export default user;
