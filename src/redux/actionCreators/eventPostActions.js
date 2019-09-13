import * as types from '../constants/actionTypes';
import { defaultFetchLimit, defaultOffset } from '../../helpers/defaults';

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

export const getEventPosts = (
  { eventId, limit = defaultFetchLimit, offset = defaultOffset },
) => ({
  type: types.GET_EVENT_POSTS,
  eventData: { eventId, limit, offset },
});

export const getEventPostsSuccess = (response) => ({
  type: types.GET_EVENT_POSTS_SUCCESS,
  response,
});

export const getEventPostsFailure = (error) => ({
  type: types.GET_EVENT_POSTS_FAILURE,
  error,
});
