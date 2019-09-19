
import { put, takeLatest, call } from 'redux-saga/effects';

import { getUserDetails, apiErrorHandler, history } from '../../helpers/utils';
import { notifyError } from '../../helpers/notify';
import UserAPI from '../../services/UserAPI';

import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserFailure,
  updateUserProfile,
  updateUserProfileFailure,
  updateUserProfileSuccess,
  getUserEvents,
  getUserEventsSuccess,
  getUserEventsFailure,
  getUserPosts,
  getUserPostsSuccess,
  getUserPostsFailure,
} from '../actionCreators/userActions';
import { jwtKey } from '../../helpers/defaults';

export function* watchAuthenticateUserSagaAsync() {
  yield takeLatest(authenticateUser().type, authenticateUserSagaAsync);
}

export function* authenticateUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.authenticateUser, action.userData);
    const userData = yield getUserDetails(response.data.token);
    yield put(authenticateUserSuccess(userData));
    history.push('/home');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(authenticateUserFailure(errorMessage));
  }
}

export function* watchUpdateUserProfileSagaAsync() {
  yield takeLatest(updateUserProfile().type, updateUserProfileSagaAsync);
}

export function* updateUserProfileSagaAsync(action) {
  try {
    const response = yield call(UserAPI.updateUserProfile, action.userData);
    const userData = yield getUserDetails(response.data.token);
    localStorage.setItem(jwtKey, response.data.token);
    yield put(updateUserProfileSuccess(userData));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateUserProfileFailure(errorMessage));
    notifyError(errorMessage);
  }
}

export function* watchGetUserEventsSagaAsync() {
  yield takeLatest(getUserEvents({}).type, getUserEventsSagaAsync);
}

export function* getUserEventsSagaAsync(action) {
  try {
    const response = yield call(UserAPI.getUserEvents, action.eventQueries);
    yield put(getUserEventsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserEventsFailure({
      errors: error.response.data.error,
      message: errorMessage,
    }));
  }
}

export function* watchGetUserPostsSagaAsync() {
  yield takeLatest(getUserPosts({}).type, getUserPostsSagaAsync);
}

export function* getUserPostsSagaAsync(action) {
  try {
    const response = yield call(UserAPI.getUserPosts, action.postQueries);
    yield put(getUserPostsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserPostsFailure({
      errors: error.response.data.error || {},
      message: errorMessage,
    }));
  }
}
