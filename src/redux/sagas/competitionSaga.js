import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import CompetitionAPI from '../../services/CompetitionAPI';
import {
  fetchAllCompetitions,
  fetchAllCompetitionsSuccess,
  fetchAllCompetitionsFailure,
} from '../actionCreators/competitionActions';

export function* watchFetchCompetitionsSagaAsync() {
  yield takeLatest(fetchAllCompetitions().type, fetchCompetitionsSagaAsync);
}

export function* fetchCompetitionsSagaAsync(action) {
  try {
    const response = yield call(CompetitionAPI.authenticateUser, action.userData);
    yield put(fetchAllCompetitionsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAllCompetitionsFailure(errorMessage));
  }
}
