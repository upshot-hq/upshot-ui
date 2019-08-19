
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import axios from 'axios';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { jwtKey } from '../../helpers/defaults';
import { history } from '../../helpers/utils';

const sagaMiddleware = createSagaMiddleware();
const reduxRouterMiddleware = routerMiddleware(history);
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware, reduxRouterMiddleware));
const store = createStore(rootReducer, middleware);

const token = localStorage.getItem(jwtKey);

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

sagaMiddleware.run(rootSaga);

export default store;
