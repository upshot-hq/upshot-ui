import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';
import * as competitionSaga from './competitionSaga';
import * as searchSaga from './searchSaga';
import * as eventPostSaga from './eventPostSaga';
import * as eventSaga from './eventSaga';
import * as exploreSaga from './exploreSaga';
import * as winnerSaga from './winnerSaga';
import * as notificationSaga from './notificationSaga';

function* rootSaga() {
  yield all([
    // please arrange in alphabetical order
    competitionSaga.watchFetchCompetitionsSagaAsync(),
    eventPostSaga.watchBookmarkPostSagaAsync(),
    eventPostSaga.watchDislikePostEventSagaAsync(),
    eventPostSaga.watchGetEventPostsSagaAsync(),
    eventPostSaga.watchGetPinnedEventsPostsSagaAsync(),
    eventPostSaga.watchLikePostEventSagaAsync(),
    eventPostSaga.watchPostToEventSagaAsync(),
    eventSaga.watchCreateEventSagaAsync(),
    eventSaga.watchGetEventSagaAsync(),
    eventSaga.watchPinEventSagaAsync(),
    exploreSaga.watchFetchExploreSagaAsync(),
    exploreSaga.watchFetchUpcomingExploreSagaAsync(),
    notificationSaga.watchGetNotificationsSagaAsync(),
    notificationSaga.watchGetUnreadNotificationCountSagaAsync(),
    notificationSaga.watchNewNotifcationSagaAsync(),
    notificationSaga.watchUpdateNotificationStatusSagaAsync(),
    searchSaga.watchSearchSagaAsync(),
    userSaga.watchAuthenticateUserSagaAsync(),
    userSaga.watchGetUserBookmarksSagaAsync(),
    userSaga.watchGetUserEventsSagaAsync(),
    userSaga.watchGetUserInfoSagaAsync(),
    userSaga.watchGetUserPostsSagaAsync(),
    userSaga.watchUpdateUserProfileSagaAsync(),
    winnerSaga.watchGenerateWinnersSagaAsync(),
    winnerSaga.watchGetWinnersSagaAsync(),
  ]);
}

export default rootSaga;
