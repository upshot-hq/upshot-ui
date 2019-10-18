
import {
  put, takeLatest, call, takeEvery,
} from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import NotificationAPI from '../../services/NotificationAPI';
import {
  handleNewNotification, handleNewNotificationSuccess,
  handleNewNotificationFailure, getNotifications,
  getNotificationsSuccess, getNotificationsFailure,
  getUnreadNotificationCount, getUnreadNotificationCountFailure,
  getUnreadNotificationCountSuccess,
  updateNotificationStatus, updateNotificationStatusSuccess,
  updateNotificationStatusFailure,
} from '../actionCreators/notificationActions';

export function* watchNewNotifcationSagaAsync() {
  yield takeEvery(handleNewNotification().type, handleNewNotificationSagaAsync);
}

export function* handleNewNotificationSagaAsync(action) {
  try {
    const { data, userId } = action;
    const response = yield call(NotificationAPI.getNotificationRecipient, data.id);
    const { notification } = response.data;
    if (notification.recipient_id) {
      yield put(handleNewNotificationSuccess(notification, userId));
    }
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
    yield put(getNotificationsSuccess(response.data, action.isNewFetch));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getNotificationsFailure(errorMessage));
  }
}

export function* watchGetUnreadNotificationCountSagaAsync() {
  yield takeLatest(getUnreadNotificationCount({}).type, getUnreadNotificationCountSagaAsync);
}

export function* getUnreadNotificationCountSagaAsync() {
  try {
    const response = yield call(NotificationAPI.getUnreadNotificationCount);
    yield put(getUnreadNotificationCountSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUnreadNotificationCountFailure(errorMessage));
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
