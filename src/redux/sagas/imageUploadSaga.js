
import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { apiErrorHandler } from '../../helpers/utils';
import { jwtKey } from '../../helpers/defaults';
import CloudinaryAPI from '../../services/CloudinaryAPI';

import {
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
} from '../actionCreators/imageUploadActions';

export function* watchUploadImageSagaAsync() {
  yield takeLatest(uploadImage().type, uploadImageSagaAsync);
}

export function* uploadImageSagaAsync(action) {
  const token = localStorage.getItem(jwtKey);
  try {
    const response = yield call(CloudinaryAPI.upload, action.imageFile);
    yield put(uploadImageSuccess(response));
    axios.defaults.headers.common.authorization = `${token}`;
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(uploadImageFailure(errorMessage));
    axios.defaults.headers.common.authorization = `${token}`;
  }
}
