import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';
import * as competitionSaga from './competitionSaga';
import * as searchSaga from './searchSaga';
import * as eventPostSaga from './eventPostSaga';
import * as eventSaga from './eventSaga';

function* rootSaga() {
  yield all([
    competitionSaga.watchFetchCompetitionsSagaAsync(),
    eventPostSaga.watchPostToEventSagaAsync(),
    searchSaga.watchSearchSagaAsync(),
    userSaga.watchAuthenticateUserSagaAsync(),
    userSaga.watchUpdateUserProfileSagaAsync(),
    eventSaga.watchCreateEventSagaAsync(),
  ]);
}

export default rootSaga;
