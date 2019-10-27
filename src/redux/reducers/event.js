import * as types from '../constants/actionTypes';
import { handleEventReaction } from '../../helpers/utils';
import { reactions } from '../../helpers/defaults';

const initialState = {
  event: {},
  newEvent: {},
  errors: {
    message: '',
    errors: {},
  },
  isLoading: false,
  isLoadingEvent: false,
  success: false,
};

const event = (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_EVENT:
    return { ...state, newEvent: {}, isLoading: true };

  case types.CREATE_EVENT_SUCCESS:
    return {
      ...state,
      newEvent: action.eventData.event,
      isLoading: false,
      errors: {
        message: '',
        errors: {},
      },
      success: true,
    };

  case types.CREATE_EVENT_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.errorObject.message || 'An error occured',
        errors: action.errorObject.errors,
      },
      success: false,
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
  case types.PIN_EVENT:
    return {
      ...state,
      event: action.eventId === state.event.id
        ? handleEventReaction(reactions.pin, state.event, action.pin) : state.event,
    };

  default:
    return state;
  }
};

export default event;
