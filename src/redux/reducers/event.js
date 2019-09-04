import * as types from '../constants/actionTypes';

const initialState = {
  event: {},
  errors: {
    message: '',
    errors: {},
  },
  isLoading: false,
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return { ...state, event: {}, isLoading: true };

    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.eventData.event,
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

    default:
      return state;
  }
};

export default event;
