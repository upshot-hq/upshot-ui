import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import CompetitionAPI from '../../services/CompetitionAPI';

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
    console.log('GetCompetitionsSagaAsync: ');
    const response = yield call(CompetitionAPI.getCompetitions);
    console.log('response: ', response);
    yield put(getCompetitionsSuccess(response.data));
  } catch (error) {
    console.log('error: ', error);
    const errorMessage = apiErrorHandler(error);
    yield put(getCompetitionsFailure(errorMessage));
  }
}
