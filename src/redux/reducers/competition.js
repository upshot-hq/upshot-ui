import * as types from '../constants/actionTypes';

const initialState = {
  competitions: [],
  errors: {
    message: '',
    errors: [],
  },
  isLoading: false,
};

const competition = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPETITIONS:
      return { ...state, isLoading: true };

    case types.GET_COMPETITIONS_SUCCESS:
      return {
        ...state,
        competitions: action.competitionsData.competitions,
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

export default competition;
