import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { LOG_OUT } from '../constants/actionTypes';
import auth from './user';
import competition from './competition';
import search from './search';
import eventPost from './eventPost';
import event from './event';

const appReducers = combineReducers({
// please arrange in alphabetical order
  auth,
  competition,
  event,
  eventPost,
  router: routerReducer,
  search,
});


const rootReducer = (state, action) => {
  let updatedState = { ...state };

  if (action.type === LOG_OUT) {
    updatedState = undefined;
  }

  return appReducers(updatedState, action);
};

export default rootReducer;
