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

export const getEvent = (eventId) => ({
  type: types.GET_EVENT,
  eventId,
});

export const getEventSuccess = (eventData) => ({
  type: types.GET_EVENT_SUCCESS,
  eventData,
});

export const getEventFailure = (errorObject) => ({
  type: types.GET_EVENT_FAILURE,
  errorObject,
});

export const pinEvent = (eventId, pin) => ({
  type: types.PIN_EVENT,
  eventId,
  pin,
});
