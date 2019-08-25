import * as types from '../constants/actionTypes';

const initialState = {
  image: {},
  errors: {
    message: '',
    errors: [],
  },
  isUploading: false,
};

const image = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_IMAGE:
      return { ...state, isUploading: true };
    case types.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        image: action.imageData,
        errors: initialState.errors,
      };
    case types.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        user: {},
        isUploading: false,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default image;
