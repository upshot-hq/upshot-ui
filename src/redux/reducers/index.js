import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './user';
import competitions from './competition';
import { LOG_OUT } from '../constants/actionTypes';

const appReducers = combineReducers({
  auth,
  competitions,
  router: routerReducer,
});


const rootReducer = (state, action) => {
  let updatedState = { ...state };

  if (action.type === LOG_OUT) {
    updatedState = undefined;
  }

  return appReducers(updatedState, action);
};

export default rootReducer;
