import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync, watchUpdateUserProfileSagaAsync } from './userSaga';
import { watchGetCompetitionsSagaAsync } from './competitionSaga';
import { watchCreateEventSagaAsync } from './eventSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
    watchUpdateUserProfileSagaAsync(),
    watchGetCompetitionsSagaAsync(),
    watchCreateEventSagaAsync(),
  ]);
}

export default rootSaga;
