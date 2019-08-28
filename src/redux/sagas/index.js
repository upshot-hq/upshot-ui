import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync, watchUpdateUserProfileSagaAsync } from './userSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
    watchUpdateUserProfileSagaAsync(),
  ]);
}

export default rootSaga;
