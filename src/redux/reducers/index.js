import { combineReducers } from 'redux';

import auth from './user';
import { LOG_OUT } from '../constants/actionsTypes';

const appReducers = combineReducers({
  auth,
});


const rootReducer = (state, action) => {
  let updatedState = { ...state };

  if (action.type === LOG_OUT) {
    updatedState = undefined;
  }

  return appReducers(updatedState, action);
};

export default rootReducer;
