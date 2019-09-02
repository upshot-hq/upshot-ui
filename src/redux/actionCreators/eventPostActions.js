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
