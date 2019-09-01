import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';
import * as competitionSaga from './competitionSaga';
import * as searchSaga from './searchSaga';

function* rootSaga() {
  yield all([
    userSaga.watchAuthenticateUserSagaAsync(),
    userSaga.watchUpdateUserProfileSagaAsync(),
    competitionSaga.watchFetchCompetitionsSagaAsync(),
    searchSaga.watchSearchSagaAsync(),
  ]);
}

export default rootSaga;
