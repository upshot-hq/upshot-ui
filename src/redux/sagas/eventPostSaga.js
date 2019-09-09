import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import { notifySuccess, notifyError } from '../../helpers/notify';
import EventAPI from '../../services/EventAPI';
import {
  postToEvent,
  postToEventSuccess,
  postToEventFailure,
  getPinnedEventsPosts,
  getPinnedEventsPostsSuccess,
  getPinnedEventsPostsFailed,
} from '../actionCreators/eventPostActions';

export function* watchPostToEventSagaAsync() {
  yield takeLatest(postToEvent('', {}).type, postToEventSagaAsync);
}

export function* postToEventSagaAsync(action) {
  try {
    const { eventId, payload } = action;
    const response = yield call(EventAPI.postToAnEvent, { eventId, payload });
    yield put(postToEventSuccess(response.data));
    notifySuccess('post to event successful');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postToEventFailure(errorMessage));
    notifyError(errorMessage);
  }
}

export function* watchGetPinnedEventsPostsSagaAsync() {
  yield takeLatest(getPinnedEventsPosts('', '').type, getPinnedEventsPostsSagaAsync);
}

export function* getPinnedEventsPostsSagaAsync(action) {
  try {
    const { limit, offset } = action;
    const response = yield call(EventAPI.getPinnedEventsPosts, { limit, offset });
    yield put(getPinnedEventsPostsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getPinnedEventsPostsFailed(errorMessage));
    notifyError(errorMessage);
  }
}
