
import { put, takeLatest, call } from 'redux-saga/effects';

import { getUserDetails, apiErrorHandler, history } from '../../helpers/utils';
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
    history.push('/home');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);

    yield put(authenticateUserFailure(errorMessage));
  }
}
