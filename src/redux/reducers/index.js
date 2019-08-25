import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './user';
import image from './image';
import { LOG_OUT } from '../constants/actionTypes';

const appReducers = combineReducers({
  auth,
  image,
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
