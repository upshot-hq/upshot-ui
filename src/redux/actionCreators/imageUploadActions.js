import * as types from '../constants/actionTypes';

export const uploadImage = (imageFile) => ({
  type: types.UPLOAD_IMAGE,
  imageFile,
});

export const uploadImageSuccess = (imageData) => ({
  type: types.UPLOAD_IMAGE_SUCCESS,
  imageData,
});

export const uploadImageFailure = (error) => ({
  type: types.UPLOAD_IMAGE_FAILURE,
  error,
});
