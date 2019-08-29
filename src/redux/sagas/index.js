import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync, watchUpdateUserProfileSagaAsync } from './userSaga';
import { watchGetCompetitionsSagaAsync } from './competitionSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
    watchUpdateUserProfileSagaAsync(),
    watchGetCompetitionsSagaAsync(),
  ]);
}

export default rootSaga;
