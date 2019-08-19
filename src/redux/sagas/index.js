import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync } from './userSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
  ]);
}

export default rootSaga;
