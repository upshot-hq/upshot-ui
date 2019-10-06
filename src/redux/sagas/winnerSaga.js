import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import WinnerAPI from '../../services/WinnerAPI';
import { notifyError } from '../../helpers/notify';

import {
  generateWinners,
  generateWinnersSuccess,
  generateWinnersFailure,
  getWinners,
  getWinnersSuccess,
  getWinnersFailure,
} from '../actionCreators/winnerActions';

export function* watchGenerateWinnersSagaAsync() {
  yield takeLatest(generateWinners().type, generateWinnersSagaAsync);
}

export function* generateWinnersSagaAsync(action) {
  try {
    const response = yield call(WinnerAPI.generateWinner, action.eventId);
    yield put(generateWinnersSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(generateWinnersFailure(errorMessage));
    notifyError(errorMessage);
  }
}

export function* watchGetWinnersSagaAsync() {
  yield takeLatest(getWinners().type, getWinnersSagaAsync);
}

export function* getWinnersSagaAsync(action) {
  try {
    const response = yield call(WinnerAPI.getWinner, action.eventId);
    yield put(getWinnersSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getWinnersFailure(errorMessage));
    notifyError(errorMessage);
  }
}
