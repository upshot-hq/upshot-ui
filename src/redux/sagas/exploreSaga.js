import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import ExploreAPI from '../../services/ExploreAPI';
import {
  fetchExploreContent,
  fetchExploreContentFailure,
  fetchExploreContentSuccess,
} from '../actionCreators/exploreActions';

export function* watchFetchExploreSagaAsync() {
  yield takeLatest(fetchExploreContent({}).type, fetchExploreSagaAsync);
}

export function* fetchExploreSagaAsync(action) {
  try {
    const response = yield call(ExploreAPI.getExploreContent, action.exploreQueries);
    yield put(fetchExploreContentSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchExploreContentFailure({
      errors: error.response.data.error,
      message: errorMessage,
    }));
  }
}
