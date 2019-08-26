import { all } from 'redux-saga/effects';

import { watchAuthenticateUserSagaAsync, watchUpdateUserProfileSagaAsync } from './userSaga';
import { watchUploadImageSagaAsync } from './imageUploadSaga';

function* rootSaga() {
  yield all([
    watchAuthenticateUserSagaAsync(),
    watchUpdateUserProfileSagaAsync(),
    watchUploadImageSagaAsync(),
  ]);
}

export default rootSaga;
