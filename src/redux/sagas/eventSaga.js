import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import EventAPI from '../../services/EventAPI';
import { notifyError, notifySuccess } from '../../helpers/notify';

import {
  createEvent,
  createEventSuccess,
  createEventFailure,
  getEvent,
  getEventSuccess,
  getEventFailure,
} from '../actionCreators/eventActions';

export function* watchCreateEventSagaAsync() {
  yield takeLatest(createEvent().type, createEventSagaAsync);
}

export function* createEventSagaAsync(action) {
  try {
    const response = yield call(EventAPI.createEvent, action.eventData);
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

export function* watchGetEventSagaAsync() {
  yield takeLatest(getEvent().type, getEventSagaAsync);
}

export function* getEventSagaAsync(action) {
  try {
    const response = yield call(EventAPI.getEvent, action.eventId);
    yield put(getEventSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getEventFailure({ message: errorMessage }));
  }
}
