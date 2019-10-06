
import { put, takeLatest } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import {
  handleNewNotification, handleNewNotificationSuccess,
  handleNewNotificationFailure,
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
