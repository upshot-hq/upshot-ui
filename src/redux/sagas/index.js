import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync } from './userSaga';
import { watchUploadImageSagaAsync } from './imageUploadSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
    watchUploadImageSagaAsync(),
  ]);
}

export default rootSaga;
