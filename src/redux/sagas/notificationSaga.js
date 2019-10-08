
import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import NotificationAPI from '../../services/NotificationAPI';
import {
  handleNewNotification, handleNewNotificationSuccess,
  handleNewNotificationFailure, getNotifications,
  getNotificationsSuccess, getNotificationsFailure,
  updateNotificationStatus, updateNotificationStatusSuccess,
  updateNotificationStatusFailure,
} from '../actionCreators/notificationActions';

export function* watchNewNotifcationSagaAsync() {
  yield takeLatest(handleNewNotification().type, handleNewNotificationSagaAsync);
}

export function* handleNewNotificationSagaAsync(action) {
  try {
    yield put(handleNewNotificationSuccess(action.data, action.userId));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    handleNewNotificationFailure(errorMessage);
  }
}

export function* watchGetNotificationsSagaAsync() {
  yield takeLatest(getNotifications({}).type, getNotificationsSagaAsync);
}

export function* getNotificationsSagaAsync(action) {
  try {
    const response = yield call(NotificationAPI.getNotifications, action.notificationQueries);
    yield put(getNotificationsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getNotificationsFailure(errorMessage));
  }
}

export function* watchUpdateNotificationStatusSagaAsync() {
  yield takeLatest(updateNotificationStatus({}).type, updateNotificationStatusSagaAsync);
}

export function* updateNotificationStatusSagaAsync(action) {
  try {
    const response = yield call(NotificationAPI.updateNotificationStatus, action.data);
    yield put(updateNotificationStatusSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateNotificationStatusFailure(errorMessage));
  }
}
