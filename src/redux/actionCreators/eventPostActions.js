import * as types from '../constants/actionTypes';

export const postToEvent = (eventId, payload) => ({
  type: types.POST_TO_EVENT,
  eventId,
  payload,
});

export const postToEventSuccess = ({ message, eventPost }) => ({
  type: types.POST_TO_EVENT_SUCCESS,
  response: { message, eventPost },
});

export const postToEventFailure = (error) => ({
  type: types.POST_TO_EVENT_FAILURE,
  error,
});

export const getPinnedEventsPosts = (limit, offset) => ({
  type: types.GET_PINNED_EVENT_POSTS,
  limit,
  offset,
});

export const getPinnedEventsPostsSuccess = (response) => ({
  type: types.GET_PINNED_EVENT_POSTS_SUCCESS,
  response,
});

export const getPinnedEventsPostsFailed = (error) => ({
  type: types.GET_PINNED_EVENT_POSTS_FAILURE,
  error,
});

export const likePost = (postId, like) => ({
  type: types.LIKE_POST,
  postId,
  like,
});

export const likePostSuccess = () => ({
  type: types.LIKE_POST_SUCCESS,
});

export const likePostFailed = () => ({
  type: types.LIKE_POST_FAILURE,
});

export const dislikePost = (postId, dislike) => ({
  type: types.DISLIKE_POST,
  postId,
  dislike,
});

export const dislikePostSuccess = () => ({
  type: types.DISLIKE_POST_SUCCESS,
});

export const dislikePostFailed = () => ({
  type: types.DISLIKE_POST_FAILURE,
});
