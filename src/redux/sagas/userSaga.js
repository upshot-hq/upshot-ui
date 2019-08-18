
import { put, takeLatest, call } from 'redux-saga/effects';

import { getUserDetails, apiErrorHandler } from '../../helpers/utils';
// import * as NavigationService from '../../services/NavigationService';
import UserAPI from '../../services/UserAPI';

import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserFailure,
} from '../actionCreators/userActions';

export function* watchAuthenticateUserSagaAsync() {
  yield takeLatest(authenticateUser().type, authenticateUserSagaAsync);
}

export function* authenticateUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.authenticateUser, action.userData);
    const userData = yield getUserDetails(response.data.token);
    yield put(authenticateUserSuccess(userData));
    // NavigationService.navigate(ideaFeedsScreenName);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);

    yield put(authenticateUserFailure(errorMessage));
  }
}
