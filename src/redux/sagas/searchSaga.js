import { put, takeLatest, call } from 'redux-saga/effects';

import { apiErrorHandler } from '../../helpers/utils';
import SearchAPI from '../../services/SearchAPI';
import {
  search,
  searchSuccess,
  searchFailure,
} from '../actionCreators/searchActions';

export function* watchSearchSagaAsync() {
  yield takeLatest(search({}).type, searchSagaAsync);
}

export function* searchSagaAsync(action) {
  try {
    const response = yield call(SearchAPI.search, action.payload);
    yield put(searchSuccess(response.data, action.payload.isSearchPage));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(searchFailure(errorMessage));
  }
}
