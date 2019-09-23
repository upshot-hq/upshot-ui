
import { put, takeLatest, call } from 'redux-saga/effects';

import { getUserDetails, apiErrorHandler } from '../../helpers/utils';
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
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  getUserBookmarks,
  getUserBookmarksSuccess,
  getUserBookmarksFailure,
} from '../actionCreators/userActions';

export function* watchAuthenticateUserSagaAsync() {
  yield takeLatest(authenticateUser().type, authenticateUserSagaAsync);
}

export function* authenticateUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.authenticateUser, action.userData);
    const userData = yield getUserDetails(response.data.token);
    yield put(authenticateUserSuccess(userData));
    // eslint-disable-next-line
    window.location.replace('/home');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(authenticateUserFailure({
      errors: error.response && error.response.data ? error.response.data.error : {},
      message: errorMessage,
    }));
    notifyError(errorMessage);
  }
}

export function* watchUpdateUserProfileSagaAsync() {
  yield takeLatest(updateUserProfile().type, updateUserProfileSagaAsync);
}

export function* updateUserProfileSagaAsync(action) {
  try {
    const response = yield call(UserAPI.updateUserProfile, action.userData);
    yield put(updateUserProfileSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateUserProfileFailure({
      errors: error.response.data.error || {},
      message: errorMessage,
    }));
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
      errors: error.response.data.error || {},
      message: errorMessage,
    }));
  }
}

export function* watchGetUserInfoSagaAsync() {
  yield takeLatest(getUserInfo().type, getUserInfoSagaAsync);
}

export function* getUserInfoSagaAsync() {
  try {
    const response = yield call(UserAPI.getUserInfo);
    yield put(getUserInfoSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserInfoFailure({
      errors: error.response.data.error || {},
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

export function* watchGetUserBookmarksSagaAsync() {
  yield takeLatest(getUserBookmarks({}).type, getUserBookmarksSagaAsync);
}

export function* getUserBookmarksSagaAsync(action) {
  try {
    const response = yield call(UserAPI.getUserBookmarks, action);
    yield put(getUserBookmarksSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserBookmarksFailure());
    notifyError(errorMessage);
  }
}
