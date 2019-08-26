
import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
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
  try {
    const response = yield call(CloudinaryAPI.upload, action.imageFile);
    yield put(uploadImageSuccess(response));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(uploadImageFailure(errorMessage));
  }
}
