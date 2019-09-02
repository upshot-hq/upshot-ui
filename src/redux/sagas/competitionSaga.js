import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import CompetitionAPI from '../../services/CompetitionAPI';
import { notifyError } from '../../helpers/notify';

import {
  getCompetitions,
  getCompetitionsSuccess,
  getCompetitionsFailure,
} from '../actionCreators/competitionActions';

export function* watchGetCompetitionsSagaAsync() {
  yield takeLatest(getCompetitions().type, GetCompetitionsSagaAsync);
}

export function* GetCompetitionsSagaAsync() {
  try {
    const response = yield call(CompetitionAPI.getCompetitions);
    yield put(getCompetitionsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getCompetitionsFailure(errorMessage));
    notifyError(errorMessage);
  }
}
