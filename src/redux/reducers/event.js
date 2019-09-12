import * as types from '../constants/actionTypes';

const initialState = {
  event: {},
  newEvent: {},
  errors: {
    message: '',
    errors: {},
  },
  isLoading: false,
  isLoadingEvent: false,
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return { ...state, newEvent: {}, isLoading: true };

    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.eventData.newEvent,
        isLoading: false,
        errors: {
          message: '',
          errors: {},
        },
      };

    case types.CREATE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: {
          message: action.errorObject.message || 'An error occured',
          errors: action.errorObject.errors,
        },
      };

    case types.GET_EVENT:
      return { ...state, event: initialState.event, isLoadingEvent: true };

    case types.GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.eventData.event,
        isLoadingEvent: false,
        errors: initialState.errors,
      };

    case types.GET_EVENT_FAILURE:
      return {
        ...state,
        isLoadingEvent: false,
        event: initialState.event,
        errors: {
          message: action.errorObject.message || 'An error occured',
          errors: action.errorObject.errors || {},
        },
      };

    default:
      return state;
  }
};

export default event;
