import * as types from '../constants/actionTypes';

const initialState = {
  posts: [],
  success: false,
  message: '',
  error: {
    message: '',
    errors: [],
  },
  isLoading: false,
};

const eventPost = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_TO_EVENT:
      return { ...state, isLoading: true, success: false };
    case types.POST_TO_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.response.message,
        posts: [...state.posts, action.response.eventPost],
        error: initialState.error,
      };
    case types.POST_TO_EVENT_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: { ...initialState.error, message: action.error },
      };
    default:
      return state;
  }
};

export default eventPost;
