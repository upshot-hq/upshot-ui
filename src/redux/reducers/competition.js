import * as types from '../constants/actionTypes';

const initialState = {
  competitions: [],
  errors: {
    message: '',
    errors: [],
  },
  isLoading: false,
};

const competitions = (state = initialState, action) => {
  console.log('action: ', action);
  switch (action.type) {
    case types.GET_COMPETITIONS:
      return { ...state, isLoading: true };

    case types.GET_COMPETITIONS_SUCCESS:
      return {
        ...state,
        competitions: action.data,
        isLoading: false,
        errors: {
          message: '',
          errors: [],
        },
      };

    case types.GET_COMPETITIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: {
          message: action.message,
          errors: [],
        },
      };

    default:
      return state;
  }
};

export default competitions;
