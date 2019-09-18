import * as types from '../constants/actionTypes';
import { handlePostReactionInPosts, determineResult } from '../../helpers/utils';
import { reactions } from '../../helpers/defaults';

const initialState = {
  posts: [],
  success: false,
  message: '',
  error: {
    message: '',
    errors: [],
  },
  isLoading: false,
  pagination: {},
};

const eventPost = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_TO_EVENT:
      return { ...state, isLoading: true, success: false };
    case types.POST_TO_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        posts: [...state.posts, action.response.eventPost],
        error: initialState.error,
      };
    case types.POST_TO_EVENT_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: { ...initialState.error, message: action.error },
      };
    case types.GET_PINNED_EVENT_POSTS:
      return { ...state, isLoading: true, success: false };
    case types.GET_PINNED_EVENT_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        posts: determineResult(
          [...state.posts, ...action.response.posts],
          action.response.posts,
          action.isNewRequest,
        ),
        error: initialState.error,
        pagination: action.response.pagination,
      };
    case types.GET_PINNED_EVENT_POSTS_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: { ...initialState.error, message: action.error },
      };
    case types.LIKE_POST:
      return {
        ...state,
        posts: handlePostReactionInPosts(reactions.like,
          state.posts, action.postId, action.like),
      };
    case types.DISLIKE_POST:
      return {
        ...state,
        posts: handlePostReactionInPosts(reactions.dislike,
          state.posts, action.postId, action.dislike),
      };
    case types.GET_EVENT_POSTS:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: initialState.error,
        posts: determineResult(state.posts, initialState.posts, action.eventData.isNewFilter),
      };
    case types.GET_EVENT_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        posts: [...state.posts, ...action.response.posts],
        error: initialState.error,
        pagination: action.response.pagination,
      };
    case types.GET_EVENT_POSTS_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: { ...initialState.error, message: action.error },
      };
    case types.BOOKMARK_POST:
      return {
        ...state,
        posts: handlePostReactionInPosts(reactions.bookmark,
          state.posts, action.postId, action.bookmark),
      };
    default:
      return state;
  }
};

export default eventPost;
