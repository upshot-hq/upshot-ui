import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';
import * as competitionSaga from './competitionSaga';
import * as searchSaga from './searchSaga';
import * as eventPostSaga from './eventPostSaga';
import * as eventSaga from './eventSaga';
import * as exploreSaga from './exploreSaga';

function* rootSaga() {
  yield all([
    // please arrange in alphabetical order
    eventPostSaga.watchBookmarkPostSagaAsync(),
    eventPostSaga.watchDislikePostEventSagaAsync(),
    competitionSaga.watchFetchCompetitionsSagaAsync(),
    eventPostSaga.watchGetEventPostsSagaAsync(),
    eventPostSaga.watchGetPinnedEventsPostsSagaAsync(),
    eventPostSaga.watchLikePostEventSagaAsync(),
    eventPostSaga.watchPostToEventSagaAsync(),
    eventSaga.watchCreateEventSagaAsync(),
    eventSaga.watchGetEventSagaAsync(),
    eventSaga.watchPinEventSagaAsync(),
    exploreSaga.watchFetchExploreSagaAsync(),
    searchSaga.watchSearchSagaAsync(),
    userSaga.watchAuthenticateUserSagaAsync(),
    userSaga.watchGetUserEventsSagaAsync(),
    userSaga.watchGetUserPostsSagaAsync(),
    userSaga.watchUpdateUserProfileSagaAsync(),
  ]);
}

export default rootSaga;
