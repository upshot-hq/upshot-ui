import * as types from '../constants/actionTypes';

export const createEvent = (eventData) => ({
  type: types.CREATE_EVENT,
  eventData,
});

export const createEventSuccess = (eventData) => ({
  type: types.CREATE_EVENT_SUCCESS,
  eventData,
});

export const createEventFailure = (errorObject) => ({
  type: types.CREATE_EVENT_FAILURE,
  errorObject,
});
