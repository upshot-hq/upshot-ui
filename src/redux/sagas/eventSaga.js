import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import EventAPI from '../../services/EventAPI';
import { notifyError, notifySuccess } from '../../helpers/notify';

import {
  createEvent,
  createEventSuccess,
  createEventFailure,
} from '../actionCreators/eventActions';

export function* watchCreateEventSagaAsync() {
  yield takeLatest(createEvent().type, createEventSagaAsync);
}

export function* createEventSagaAsync(action) {
  try {
    const response = yield call(EventAPI.getEvents, action.eventData);
    yield put(createEventSuccess(response.data));
    notifySuccess('Event created successfully');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createEventFailure({
      errors: error.response.data.error,
      message: errorMessage,
    }));
    notifyError(errorMessage);
  }
}
